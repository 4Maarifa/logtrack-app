import keys from './../params.inc';

import ErrorService from './error.service';
import FirebaseService from './firebase.service';

import RoleService from './entities/role.service';
import CompanyService from './entities/company.service';
import EmployeeService from './entities/employee.service';

import { ERoleStatus } from './../classes/Role';

const uuidv4 = require('uuid/v4');

export const ensureFilledFields = (object, fields) => {
    fields.forEach((field) => {
        if(object[field] == null) {
            return false;
        }
    });
    return true;
};

export const migratePrototype = object => {
    return Object.assign({}, object);
};

const DataService = {
    initialize() {
        return DataService.__computeValues();
    },
    __computeValues() {
        return new Promise((resolve, _) => {

            FirebaseService.initialize();

            FirebaseService.getFirebaseObject().auth().onAuthStateChanged((user) => {
                DataService.__endInitialization(user).then(() => {
                    resolve();
                });
            });
        });
    },
    __endInitialization(user) {
        return new Promise((resolve, _) => {
            DataService.computed.user = user;

            if(!!user) {
                EmployeeService.get(this.computed.user.uid)
                    .then(employee => {
                        DataService.computed.employee = employee.data();

                        RoleService.getActiveRoleForEmployeeId(this.computed.user.uid)
                            .then(activeRole => {
                                if(!!activeRole) {
                                    if(activeRole.status !== ERoleStatus.CONFIRMED) {
                                        ErrorService.warning('Your active role was revoked!');
                                        EmployeeService.unactivateRole()
                                            .then(() => DataService.computed.notifyChanges())
                                            .catch(ErrorService.manageError);
                                    }

                                    DataService.computed.activeRole = activeRole;
                                    CompanyService.get(activeRole.companyId)
                                        .then(activeRoleCompany => {
                                            DataService.computed.initialized = true;
                                            DataService.computed.activeRoleCompany = activeRoleCompany.data();
                                            DataService.computed.notifyObservers();
                                            resolve();
                                        }).catch(ErrorService.manageError);
                                } else {
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
            } else {
                DataService.computed.initialized = true;
                DataService.computed.notifyObservers();
                resolve();
            }
        });
    },
    computed: {
        conputeStat(statArray, options) {
            if(!Array.isArray(statArray)) {
                ErrorService.error('The stats passed are not in an array');
                return;
            }
            return new Promise((resolve, reject) => {
                FirebaseService.getFirebaseObject().functions().httpsCallable('computeStat')({types: statArray, ...options})
                    .then(result => resolve(result.data))
                    .catch(e => ErrorService.manageErrorThenReject(e, reject));
            });
        },
        search(searchTypeArray, term, companyId) {
            if(!Array.isArray(searchTypeArray)) {
                ErrorService.error('The search types passed are not in an array');
                return;
            }
            return FirebaseService.getFirebaseObject().functions().httpsCallable('search')({types: searchTypeArray, term: term.toLowerCase(), companyId});
        },
        getWeatherViaAPI(lon, lat) {
            return new Promise((resolve, reject) => {
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${keys.openWeatherMapAPIKey}`)
                    .then(response => response.json())
                    .then(resJson => {
                        resolve(resJson);
                    })
                    .catch(e => ErrorService.manageErrorThenReject(e, reject));
            });
        },
        isConnected() {
            return !!DataService.computed.user;
        },
        notifyChanges() {
            return DataService.__computeValues();
        },
        notifyObservers() {
            Object.keys(DataService.computed.observers).forEach((observerKey) => {
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
        getDefaultComputedValues() {
            return {
                employee: null,
                user: null,
                activeRole: null,
                activeRoleCompany: null,
                observerKey: null,
                initialized: null
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
        initialized: false
    }
};

export default DataService;
