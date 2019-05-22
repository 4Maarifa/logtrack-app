import ErrorService from './error.service';
import FirebaseService from './firebase.service';

import Employee from './../classes/Employee';
import Company from './../classes/Company';
import Role from './../classes/Role';
import EquipmentModel from '../classes/EquipmentModel';
import Equipment from '../classes/Equipment';
import ERoleStatus from '../classes/enums/ERoleStatus';

const uuidv4 = require('uuid/v4');

const ensureFilledFields = (object, fields) => {
    fields.forEach((field) => {
        if(object[field] == null) {
            return false;
        }
    });
    return true;
};

const migratePrototype = object => {
    return Object.assign({}, object);
};

const DataService = {
    initialize() {
        console.log('Data service initializing...');
        return DataService.computeValues();
    },
    computeValues() {
        return new Promise((resolve, _) => {

            FirebaseService.initialize();

            FirebaseService.getFirebaseObject().auth().onAuthStateChanged((user) => {
                DataService.endInitialization(user).then(() => {
                    resolve();
                });
            });
        });
    },
    endInitialization(user) {
        return new Promise((resolve, _) => {
            DataService.computed.user = user;

            if(!!user) {
                DataService.employee.get(this.computed.user.uid)
                    .then((employee) => {
                        DataService.computed.employee = employee.data();

                        DataService.role.getActiveRoleForEmployeeId(this.computed.user.uid)
                            .then((activeRole) => {
                                DataService.computed.activeRole = activeRole;
            
                                if(!!activeRole) {
                                    DataService.company.get(activeRole.companyId)
                                        .then((activeRoleCompany) => {
                                            DataService.computed.activeRoleCompany = activeRoleCompany.data();
                                            DataService.computed.notifyObservers();
            
                                            console.log('Data service initialized');
                                            resolve();
                                        }).catch(ErrorService.manageError);
                                } else {
                                    DataService.computed.activeRoleCompany = null;
                                    DataService.computed.notifyObservers();
            
                                    console.log('Data service initialized');
                                    resolve();
                                }
                            })
                            .catch(ErrorService.manageError);
                    })
                    .catch(ErrorService.manageError);
            } else {
                DataService.computed.notifyObservers();
                resolve();
            }
        });
    },
    computed: {
        notifyChanges() {
            DataService.computeValues();
        },
        notifyObservers() {
            Object.keys(DataService.computed.observers).forEach((observerKey) => {
                DataService.computed.observers[observerKey]({
                    employee: DataService.computed.employee,
                    user: DataService.computed.user,
                    activeRole: DataService.computed.activeRole,
                    activeRoleCompany: DataService.computed.activeRoleCompany
                });
            });
        },
        getDefaultComputedValues() {
            return {
                employee: null,
                user: null,
                activeRole: null,
                activeRoleCompany: null,
                observerKey: null
            }
        },
        observeComputedValues(callback) {
            const observerKey = uuidv4();
            DataService.computed.observers[observerKey] = callback;
            DataService.computed.notifyObservers();
            return observerKey;
        },
        unobserveComputedValues(observerKey) {
            if(!observerKey) return;
            delete DataService.computed.observers[observerKey];
        },
        observers: {},

        user: null,
        activeRole: null,
        activeRoleCompany: null
    },
    employee: {
        create(employee) {
            if (!employee instanceof Employee) {
                ErrorService.manageError({
                    code: 'entity/prototype-not-match',
                    details: 'Employee'
                });
                return;
            }
            if (!ensureFilledFields(employee, ['id', 'firstname', 'lastname'])) {
                ErrorService.manageError({
                    code: 'entity/missing-fields',
                    details: ['id', 'firstname', 'lastname']
                });
                return;
            }
            return FirebaseService.getDb().collection('employees').doc(employee.id).set(migratePrototype(employee));
        },
        get(employeeId) {
            return FirebaseService.getDb().collection('employees').doc(employeeId).get();
        },
        updateField(employeeId, employeeField) {
            return FirebaseService.getDb().collection('employees').doc(employeeId).update(employeeField);
        },
        activateRole(roleId) {
            return DataService.employee.updateField(this.state.user.uid, {activeRoleId: roleId})
                .then(DataService.computed.notifyChanges)
                .catch(ErrorService.manageError);
        },
        unactivateRole() {
            return DataService.employee.updateField(this.state.user.uid, {activeRoleId: null})
                .then(DataService.computed.notifyChanges)
                .catch(ErrorService.manageError);
        }
    },
    company: {
        create(company) {
            if (!company instanceof Company) {
                ErrorService.manageError({
                    code: 'entity/prototype-not-match',
                    details: 'Company'
                });
                return;
            }
            if (!ensureFilledFields(company, ['name', 'creator', 'logoURL'])) {
                ErrorService.manageError({
                    code: 'entity/missing-fields',
                    details: ['name', 'creator', 'logoURL']
                });
                return;
            }
            return FirebaseService.getDb().collection('companies').add(migratePrototype(company));
        },
        get(companyId) {
            return FirebaseService.getDb().collection('companies').doc(companyId).get();
        },
        search(term) {
            return FirebaseService.getDb().collection('companies').orderBy('name').startAt(term.toUpperCase()).endAt(term.toLowerCase() + "\uf8ff").get();
        }
    },
    equipment: {
        get(equipmentId) {
            return FirebaseService.getDb().collection('equipments').doc(equipmentId).get();
        },
        getAllForCompanyId(companyId) {
            return FirebaseService.getDb().collection('equipments')
                .where('companyId', '==', companyId)
                .get();
        },
        create(equipment) {
            if(!equipment instanceof Equipment) {
                ErrorService.manageError({
                    code: 'entity/prototype-not-match',
                    details: 'Equipment'
                });
                return;
            }
            if(!ensureFilledFields(equipment, ['companyId', 'identification', 'equipmentModelId'])) {
                ErrorService.manageError({
                    code: 'entity/prototype-not-match',
                    details: ['companyId', 'identification', 'equipmentModelId']
                });
                return;
            }
            return FirebaseService.getDb().collection('equipments').add(migratePrototype(equipment));
        }
    },
    equipmentModel: {
        create(equipmentModel) {
            if (!equipmentModel instanceof EquipmentModel) {
                ErrorService.manageError({
                    code: 'entity/prototype-not-match',
                    details: 'Equipment Model'
                });
                return;
            }
            if (!ensureFilledFields(equipmentModel, ['name', 'creator', 'logoURL'])) {
                ErrorService.manageError({
                    code: 'entity/missing-fields',
                    details: ['name', 'creator', 'logoURL']
                });
                return;
            }
            return FirebaseService.getDb().collection('equipmentModels').add(migratePrototype(equipmentModel));
        },
        get(equipmentModelId) {
            return FirebaseService.getDb().collection('equipmentModels').doc(equipmentModelId).get();
        },
        getAll() {
            return FirebaseService.getDb().collection('equipmentModels').get();
        }
    },
    brand: {
        get(brandId) {
            return FirebaseService.getDb().collection('brands').doc(brandId).get();
        },
        getAll() {
            return FirebaseService.getDb().collection('brands').get();
        }
    },
    role: {
        create(role) {
            if (!role instanceof Role) {
                ErrorService.manageError({
                    code: 'entity/prototype-not-match',
                    details: 'Role'
                });
                return;
            }
            if (!ensureFilledFields(role, ['employeeId', 'companyId', 'status', 'role'])) {
                ErrorService.manageError({
                    code: 'entity/missing-fields',
                    details: ['employeeId', 'companyId', 'status', 'role']
                });
                return;
            }
            return FirebaseService.getDb().collection('roles').add(migratePrototype(role));
        },
        getActiveRoleForEmployeeId(employeeId) {
            return new Promise((resolve, reject) => {
                DataService.employee.get(employeeId)
                .then((docEmployee) => {
                    if(docEmployee.exists) {
                        if (docEmployee.data().activeRoleId != null) {
                            return DataService.role.get(docEmployee.data().activeRoleId)
                                .then((activeRole) => {
                                    if (activeRole.exists) {
                                        resolve(activeRole.data());
                                    } else {
                                        resolve(null);
                                    }
                                })
                                .catch((error) => ErrorService.manageError(error) && reject());
                        }
                        return resolve(null);
                    } else {
                        ErrorService.manageError({code: 'entity/not-found', details: 'Employee #' + employeeId});
                        reject();
                    }
                })
                .catch((error) => ErrorService.manageError(error) && reject());
            });
        },
        getDraftRolesForCompanyId(companyId) {
            return FirebaseService.getDb().collection('roles')
                .where('companyId', '==', companyId)
                .where('status', '==', ERoleStatus.DRAFT)
                .get();
        },
        get(roleId) {
            return FirebaseService.getDb().collection('roles').doc(roleId).get();
        },
        getRolesForEmployeeId(employeeId) {
            return FirebaseService.getDb().collection('roles')
                .where('employeeId', '==', employeeId)
                .get();
        },
        getRolesForCompanyId(companyId) {
            return FirebaseService.getDb().collection('roles')
                .where('companyId', '==', companyId)
                .get();
        },
        updateField(roleId, roleField) {
            return FirebaseService.getDb().collection('roles').doc(roleId).update(roleField);
        },
        confirmRole(roleId) {
            return DataService.role.updateField(roleId, {status: ERoleStatus.CONFIRMED})
                .then(DataService.computed.notifyChanges)
                .catch(ErrorService.manageError);
        }
    }
};

export default DataService;
