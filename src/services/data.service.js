import ErrorService from './error.service';
import FirebaseService from './firebase.service';

import RoleService from './entities/role.service';
import CompanyService from './entities/company.service';
import EmployeeService from './entities/employee.service';
import RT_Service from './rt.service';

import { ERoleStatus } from './../classes/Role';

export const ensureFilledFields = (object, fields) => {
    fields.forEach(field => {
        if(object[field] == null) {
            return false;
        }
    });
    return true;
};

export const migratePrototype = object => Object.assign({}, object);

const DataService = {
    initialize: () => DataService.__computeValues(),
    __computeValues: () => new Promise((resolve, _) => {
            FirebaseService.initialize();
            FirebaseService.getFirebaseObject().auth().onAuthStateChanged(user => DataService.__endInitialization(user).then(resolve));
        }),
    __endInitialization: user => {
        return new Promise((resolve, _) => {
            DataService.computed.user = user;

            if(user) {
                EmployeeService.get(DataService.computed.user.uid)
                    .then(employee => {
                        DataService.computed.employee = employee.data();

                        RoleService.getActiveRoleForEmployeeId(DataService.computed.user.uid)
                            .then(activeRole => {
                                if(activeRole) {
                                    if(activeRole.status !== ERoleStatus.CONFIRMED) {
                                        ErrorService.warning('Your active role was revoked!');
                                        EmployeeService.unactivateRole()
                                            .then(DataService.computed.notifyChanges)
                                            .catch(ErrorService.manageError);
                                        RT_Service.role.resetRole();
                                    }

                                    DataService.computed.activeRole = activeRole;
                                    CompanyService.get(activeRole.companyId)
                                        .then(activeRoleCompany => {
                                            DataService.computed.initialized = true;
                                            DataService.computed.activeRoleCompany = activeRoleCompany.data();
                                            DataService.computed.notifyObservers();
                                            resolve();
                                        }).catch(ErrorService.manageError);
                                }
                                else {
                                    DataService.computed.activeRole = null;
                                    DataService.computed.initialized = true;
                                    DataService.computed.activeRoleCompany = null;
                                    DataService.computed.notifyObservers();
                                    resolve();
                                }
                            })
                            .catch(ErrorService.manageError);
                    })
                    .catch(ErrorService.manageError);
            }
            else {
                DataService.computed.initialized = true;
                DataService.computed.notifyObservers();
                resolve();
            }
        });
    },
    computed: {
        search: (searchTypeArray, term, companyId) => {
            if(!Array.isArray(searchTypeArray)) {
                ErrorService.error('The search types passed are not in an array');
                return;
            }
            return FirebaseService.getFirebaseObject().functions().httpsCallable('search')({types: searchTypeArray, term: term.toLowerCase(), companyId});
        },
        isConnected: () => DataService.computed.user,
        notifyChanges: () => DataService.__computeValues(),
        notifyObservers: () => {
            Object.keys(DataService.computed.observers).forEach(observerKey => {
                if(!DataService.computed.observers[observerKey]) { return; }
                DataService.computed.observers[observerKey]({
                    employee: DataService.computed.employee,
                    user: DataService.computed.user,
                    activeRole: DataService.computed.activeRole,
                    activeRoleCompany: DataService.computed.activeRoleCompany,
                    initialized: DataService.computed.initialized
                });
            });
            RoleService.notifyObservers();
        },
        getDefaultComputedValues: () => ({
            employee: null,
            user: null,
            activeRole: null,
            activeRoleCompany: null,
            initialized: null
        }),
        observeComputedValues: (callback, observerKey) => {
            DataService.computed.observers[observerKey] = callback;
            DataService.computed.notifyObservers();
        },
        unobserveComputedValues: observerKey => delete DataService.computed.observers[observerKey],
        observers: {},

        user: null,
        activeRole: null,
        activeRoleCompany: null,
        employee: null,
        initialized: false
    }
};

export default DataService;
