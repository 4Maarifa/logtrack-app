import ErrorService from './error.service';
import FirebaseService from './firebase.service';

import RoleService from './entities/role.service';
import CompanyService from './entities/company.service';
import EmployeeService from './entities/employee.service';
import RT_Service from './rt.service';

import { ERoleStatus } from './../classes/Role';
import ESearchType from '../classes/enums/ESearchType';

// ensure that all fields of the object contains a value
export const ensureFilledFields = (object, fields) => {
    fields.forEach(field => {
        if(object[field] == null) {
            return false;
        }
    });
    return true;
};

// Assign all properties from the object to a new object, without the prototype
// Firebase forbid the use of prototyped objects: you have to migrate the prototype before saving an object.
export const migratePrototype = object => Object.assign({}, object);

/**
 * Service: DataService
 * manage data and data temporary memory
 */
const DataService = {

    // compute values and save them to the temp memory
    // This function compute: current user, current employee, activeRole, activeRoleCompany
    computeValues: () => new Promise((resolve, _) => {

        // Initialize Firebase service & connections
        FirebaseService.initialize();

        // Get the signed in user
        FirebaseService.getFirebaseObject().auth().onAuthStateChanged(user => {

            // Save the user
            DataService.computed.user = user;

            // If a user is signed in
            if(user) {

                // get the corresponding employee as well as active role at the same time for performance
                Promise.all([
                    EmployeeService.get(DataService.computed.user.uid),
                    RoleService.getActiveRoleForEmployeeId(DataService.computed.user.uid)
                ]).then(results => {

                    // save the employee in computed data
                    DataService.computed.employee = results[0].data();

                    // If the user has an active role
                    if(results[1]) {

                        // save active role
                        DataService.computed.activeRole = results[1];

                        // Check for active role status
                        // If it's not confirmed, it means the current role has been revoked by a company's manager
                        if(results[1].status !== ERoleStatus.CONFIRMED) {

                            // Inform user
                            ErrorService.warning('Your active role was revoked!');

                            // update active role in Firestore
                            EmployeeService.unactivateRole()
                                .then(DataService.computed.notifyChanges)
                                .catch(ErrorService.manageError);

                            // update also active role in RT database
                            RT_Service.role.resetRole();
                        }
                        else {

                            // get active role company
                            CompanyService.get(results[1].companyId)
                                .then(activeRoleCompany => {

                                    // save the active role company in computed data
                                    DataService.computed.activeRoleCompany = activeRoleCompany.data();

                                    // mark as initialized
                                    DataService.computed.initialized = true;

                                    // Notify observers that computed data is complete
                                    DataService.computed.notifyObservers();
                                    resolve();
                                }).catch(ErrorService.manageError);
                        }
                    }
                    else {
                        // if user has no active role
                        DataService.computed.activeRole = null;
                        DataService.computed.activeRoleCompany = null;

                        // mark computed data as initialized
                        DataService.computed.initialized = true;
                        
                        // Notify observers that computed data is complete
                        DataService.computed.notifyObservers();
                        resolve();
                    }

                }).catch(ErrorService.manageError);
            }
            else {
                // If no user is signed in, we have finished to load computed values

                // mark the temp memory as initialized
                DataService.computed.initialized = true;

                // and notify observers of temp memory
                DataService.computed.notifyObservers();
                resolve();
            }
        });
    }),
    computed: {

        // search for entities in Firestore using Cloud functions
        // searchTypeArray: ESearchType[] | entities to search for, term: string | searchTerm, companyId: string | companyId of active role
        search: (searchTypeArray, term, companyId) => {

            // Verify searchTypeArray parameter
            if(!Array.isArray(searchTypeArray)) {
                ErrorService.error('The search types passed are not in an array');
                return;
            }
            searchTypeArray.map(searchType => ESearchType[searchType]);

            // Launch search
            return FirebaseService.getFirebaseObject().functions().httpsCallable('search')({ types: searchTypeArray, term: term.toLowerCase(), companyId });
        },

        // return true if a user is currently signed in
        isConnected: () => DataService.computed.user,

        // Notify changes of computed data
        // This function must be called if any of current user, current employee, active role, or active role company is modified
        // It permits to recompute these values and notify all observers that need this new data
        notifyChanges: () => DataService.computeValues(),

        // Notify observers if a change about computed data is made.
        // This function just notify the observeres with the computed data.
        // It does not refresh the data itself, please call notifyChanges instead of the computed data needs to be refreshed
        notifyObservers: () => {

            // Loop through observers
            Object.keys(DataService.computed.observers).forEach(observerKey => {
                if(!DataService.computed.observers[observerKey]) { return; }

                // call each observer with the new computed data
                DataService.computed.observers[observerKey]({
                    employee: DataService.computed.employee,
                    user: DataService.computed.user,
                    activeRole: DataService.computed.activeRole,
                    activeRoleCompany: DataService.computed.activeRoleCompany,
                    initialized: DataService.computed.initialized
                });
            });

            // Notify observers about role changes
            RoleService.notifyObservers();
        },

        // Get the default computed values. This returns just the computed data structure, not the computed data itself
        // It may be used to initialize computed data in components, before calling observerComputeValues
        getDefaultComputedValues: () => ({
            employee: null,
            user: null,
            activeRole: null,
            activeRoleCompany: null,
            initialized: null
        }),

        // add the callback as an observer
        // the callback will be called immediately with current computed data,
        // and each time the computed data changes
        observeComputedValues: (callback, observerKey) => {

            // add the callback as an additional observer
            DataService.computed.observers[observerKey] = callback;

            // notify all observers with the current data
            DataService.computed.notifyObservers();
        },

        // remove the observer
        // You have to pass the same unique observer key you passed when registering a callback
        unobserveComputedValues: observerKey => delete DataService.computed.observers[observerKey],

        // observers are stored here
        observers: {},

        // computed data is stored here
        user: null,
        activeRole: null,
        activeRoleCompany: null,
        employee: null,
        // know whether the data is fully initialized or we still are waiting for results
        initialized: false
    }
};

export default DataService;
