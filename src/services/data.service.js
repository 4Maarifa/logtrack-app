import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/pro-solid-svg-icons';

import ErrorService from './error.service';
import FirebaseService from './firebase.service';

import Employee from './../classes/Employee';
import Company from './../classes/Company';
import Role from './../classes/Role';
import EquipmentModel from '../classes/EquipmentModel';
import Equipment from '../classes/Equipment';
import ERole from '../classes/enums/ERole';
import ERoleStatus from '../classes/enums/ERoleStatus';
import Contract from '../classes/Contract';

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
            DataService.role.notifyObservers();
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
        activeRoleCompany: null,
        employee: null,
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
        getAllForIdList(idList) {
            var promises = [];
            var employees = {};

            return new Promise((resolve, reject) => {
                idList.forEach((employeeId) => promises.push(DataService.employee.get(employeeId)));

                Promise.all(promises)
                    .then((employeeDocs) => {
                        employeeDocs.forEach((employeeDoc) => employees[employeeDoc.id] = employeeDoc.data())
                        resolve(employees);
                    })
                    .catch((e) => ErrorService.manageErrorThenReject(e, reject));
            });            
        },
        updateField(employeeId, employeeField) {
            return FirebaseService.getDb().collection('employees').doc(employeeId).update(employeeField);
        },
        activateRole(roleId) {
            return DataService.employee.updateField(DataService.computed.user.uid, {activeRoleId: roleId})
                .then(DataService.computed.notifyChanges)
                .catch(ErrorService.manageError);
        },
        unactivateRole() {
            return DataService.employee.updateField(DataService.computed.user.uid, {activeRoleId: null})
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
        getAllForIdList(idList) {
            var promises = [];
            var companies = {};

            return new Promise((resolve, reject) => {
                idList.forEach((companyId) => promises.push(DataService.company.get(companyId)));

                Promise.all(promises)
                    .then((companyDocs) => {
                        companyDocs.forEach((companyDoc) => companies[companyDoc.id] = companyDoc.data());
                        resolve(companies);
                    })
                    .catch((e) => ErrorService.manageErrorThenReject(e, reject));
            });            
        },
        search(term) {
            return FirebaseService.getDb().collection('companies').orderBy('name').startAt(term.toUpperCase()).endAt(term.toLowerCase() + "\uf8ff").get();
        }
    },
    contract: {
        get(contractId) {
            return FirebaseService.getDb().collection('contracts').doc(contractId).get();
        },
        getAllForCompanyExecId(companyExecId) {
            var contracts = {};
            return new Promise((resolve, reject) => {
                FirebaseService.getDb().collection('contracts')
                    .where('companyExecId', '==', companyExecId)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((contractDoc) => contracts[contractDoc.id] = contractDoc.data());
                        resolve(contracts);
                    })
                    .catch((e) => ErrorService.manageErrorThenReject(e, reject));
            });
        },
        getAllForCompanyOrderId(companyOrderId) {
            var contracts = {};
            return new Promise((resolve, reject) => {
                FirebaseService.getDb().collection('contracts')
                    .where('companyOrderId', '==', companyOrderId)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((contractDoc) => contracts[contractDoc.id] = contractDoc.data());
                        resolve(contracts);
                    })
                    .catch((e) => ErrorService.manageErrorThenReject(e, reject));
            });
        },
        create(contract){
            if(!contract instanceof Contract) {
                ErrorService.manageError({
                    code: 'entity/prototype-not-match',
                    details: 'Contract'
                });
                return;
            }
            if(!ensureFilledFields(contract, ['contractType', 'companyOrderId', 'companyExecId', 'status'])) {
                ErrorService.manageError({
                    code: 'entity/missing-fields',
                    details: ['contractType', 'companyOrderId', 'companyExecId', 'status']
                });
                return;
            }
            return FirebaseService.getDb().collection('contracts').add(migratePrototype(contract));
        }
    },
    equipment: {
        get(equipmentId) {
            return FirebaseService.getDb().collection('equipments').doc(equipmentId).get();
        },
        getAllForCompanyId(companyId) {
            var equipments = {};
            return new Promise((resolve, reject) => {
                FirebaseService.getDb().collection('equipments')
                .where('companyId', '==', companyId)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((equipmentDoc) => equipments[equipmentDoc.id] = equipmentDoc.data());
                    resolve(equipments);
                })
                .catch((e) => ErrorService.manageErrorThenReject(e, reject));
            });
        },
        countAllForCompanyId(companyId) {
            console.log('COUNT');
            return new Promise((resolve, reject) => {
                FirebaseService.getDb().collection('equipments')
                .where('companyId', '==', companyId)
                .get()
                .then((querySnapshot) => {
                    resolve(querySnapshot.size);
                })
                .catch((e) => ErrorService.manageErrorThenReject(e, reject));
            });
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
                    code: 'entity/missing-fields',
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
            var equipmentModels = {};
            return new Promise((resolve, reject) => {
                FirebaseService.getDb().collection('equipmentModels').get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((equipmentModelDoc) => equipmentModels[equipmentModelDoc.id] = equipmentModelDoc.data());
                        resolve(equipmentModels);
                    })
                    .catch((e) => ErrorService.manageErrorThenReject(e, reject));
            });
        },
        getAllByType() {
            var equipmentModelsByType = {}, type = '';
            return new Promise((resolve, reject) => {
                DataService.equipmentModel.getAll()
                    .then((equipmentModels) => {
                        Object.keys(equipmentModels).forEach((equipmentModelKey) => {
                            type = equipmentModels[equipmentModelKey].type;
                            if(!equipmentModelsByType[type]) {  equipmentModelsByType[type] = {}};

                            equipmentModelsByType[type][equipmentModelKey] = equipmentModels[equipmentModelKey];
                        });
                        resolve(equipmentModelsByType);
                    })
                    .catch((e) => ErrorService.manageErrorThenReject(e, reject));
            });
        }
    },
    brand: {
        get(brandId) {
            return FirebaseService.getDb().collection('brands').doc(brandId).get();
        },
        getAll() {
            var brands = {};
            return new Promise((resolve, reject) => {
                FirebaseService.getDb().collection('brands').get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((brandDoc) => brands[brandDoc.id] = brandDoc.data());
                        resolve(brands);
                    })
                    .catch((e) => ErrorService.manageErrorThenReject(e, reject));
            });
        }
    },
    role: {
        observers: [],
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
                .catch((e) => {ErrorService.manageErrorThenReject(e, reject)});
            });
        },
        getDraftRolesForCompanyId(companyId) {
            var roles = {};
            return new Promise((resolve, reject) => {
                FirebaseService.getDb().collection('roles')
                    .where('companyId', '==', companyId)
                    .where('status', '==', ERoleStatus.DRAFT)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((roleDoc) => roles[roleDoc.id] = roleDoc.data());
                        resolve(roles);
                    })
                    .catch((e) => ErrorService.manageErrorThenReject(e, reject));
            })
        },
        get(roleId) {
            return FirebaseService.getDb().collection('roles').doc(roleId).get();
        },
        getRolesForEmployeeId(employeeId) {
            var roles = {};
            return new Promise((resolve, reject) => {
                FirebaseService.getDb().collection('roles')
                    .where('employeeId', '==', employeeId)
                    .where('status', '==', ERoleStatus.CONFIRMED)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((roleDoc) => roles[roleDoc.id] = roleDoc.data());
                        resolve(roles);
                    })
                    .catch((e) => {ErrorService.manageErrorThenReject(e, reject)});
            });
        },
        getRolesForCompanyId(companyId) {
            var roles = {};
            return new Promise((resolve, reject) => {
                FirebaseService.getDb().collection('roles')
                    .where('companyId', '==', companyId)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((roleDoc) => roles[roleDoc.id] = roleDoc.data());
                        resolve(roles);
                    })
                    .catch((e) => {ErrorService.manageErrorThenReject(e, reject)});
            });
        },
        updateField(roleId, roleField) {
            return FirebaseService.getDb().collection('roles').doc(roleId).update(roleField);
        },
        confirmRole(roleId) {
            return DataService.role.updateField(roleId, {status: ERoleStatus.CONFIRMED})
                .then(DataService.computed.notifyChanges)
                .catch(ErrorService.manageError);
        },
        observeActions(role, observer) {
            DataService.role.observers.push({
                role: role,
                observer: observer
            });
            observer(DataService.role.getActions(role));
        },
        notifyObservers() {
            DataService.role.observers.forEach((observer) => observer.observer(DataService.role.getActions(observer.role)));
        },
        getActions(role) {
            var roleId = Object.keys(role)[0];
            if(!!DataService.computed.activeRole && role[roleId].status === ERoleStatus.DRAFT && role[roleId].companyId === DataService.computed.activeRole.companyId && DataService.computed.activeRole.role === ERole.MANAGER) {
                return <div className="Role-actions">
                    <button onClick={() => DataService.role.confirmRole(roleId)}>
                        <FontAwesomeIcon icon={faCheck} />
                        Confirm ?
                    </button>
                </div>;
            }
            if(!!DataService.computed.user && role[roleId].status === ERoleStatus.CONFIRMED && role[roleId].employeeId === DataService.computed.user.uid) {
                if(roleId === DataService.computed.employee.activeRoleId) {
                    return <div className="Role-actions">
                        <button onClick={() => DataService.employee.unactivateRole()}>
                            <FontAwesomeIcon icon={faTimes} />
                            Disable?
                        </button>
                    </div>;
                }
                return <div className="Role-actions">
                    <button onClick={() => DataService.employee.activateRole(roleId)}>
                        <FontAwesomeIcon icon={faCheck} />
                        Enable?
                    </button>
                </div>;
            }
            return <></>;
        }
    }
};

export default DataService;
