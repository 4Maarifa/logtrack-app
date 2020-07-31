import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';
import RT_Service from './../rt.service';
import RoleService from './role.service';

import Employee, { AccountActivity } from './../../classes/Employee';
import { ERoleStatus } from './../../classes/Role';
import ESearchType from './../../classes/enums/ESearchType';


/**
 * Service: EmployeeService
 * service to manage employee entities
 * 
 * Employee entity is particular: its id is the same as the user id it is attached with
 */
const EmployeeService = {

  // Rights for the Employee entity
  rights: {
    [ERights.RIGHT_EMPLOYEE_CREATE]: () => true,
    [ERights.RIGHT_EMPLOYEE_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EMPLOYEE_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EMPLOYEE_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EMPLOYEE_DELETE]: () => false
  },

  create: (userId, employee) => {
    // Rights
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create an Employee' });
    }

    // Class instance
    if(!employee instanceof Employee) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Employee' });
    }

    // minimum data
    if(!ensureFilledFields(employee, ['firstname', 'lastname'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['firstname', 'lastname'] });
    }

    // Of the user id is not the same as the signed in user => forbidden
    if(DataService.computed.user.uid !== userId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // create
    return FirebaseService.getFirestore().collection('employees').doc(userId).set(migratePrototype(employee));
  },
  get: employeeId => {
    // Rights
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get an Employee' });
    }

    // get
    return FirebaseService.getFirestore().collection('employees').doc(employeeId).get();
  },
  list: () => {

    // Rights
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Employees' });
    }

    // List employees
    const EMPLOYEES = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('employees').get()
            .then(querySnapshot => {
              // build result, and resolve
              querySnapshot.forEach(employeeDoc => EMPLOYEES[employeeDoc.id] = employeeDoc.data());
              resolve(EMPLOYEES);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (employeeId, employee) => {

    // rights
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Employee' });
    }

    // class instance
    if(!employee instanceof Employee) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Employee' });
    }

    // minimum data
    if(!ensureFilledFields(employee, ['firstname', 'lastname'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['firstname', 'lastname'] });
    }

    // If the employeeId does not correpond to the signedin user => forbidden
    if(employeeId !== DataService.computed.user.uid) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // update
    return FirebaseService.getFirestore().collection('employees').doc(employeeId).set(migratePrototype(employee));
  },
  updateField: (employeeId, employeeField) => {

    // Rights
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Employee' });
    }

    // if the signedin user does not correspond to the employee => forbidden
    if(employeeId !== DataService.computed.user.uid) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }
    
    // update
    return FirebaseService.getFirestore().collection('employees').doc(employeeId).update(employeeField);
  },
  delete: employeeId => {

    // Rights
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete an Employee' });
    }
    
    // delete
    return FirebaseService.getFirestore().collection('employees').doc(employeeId).delete();
  },

  // CUSTOM FUNCTIONS

  // get all employees for a list of ids
  getAllForIdList: idList => {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Employees' });
    }

    const PROMISES = [],
      EMPLOYEES = {};

    return new Promise((resolve, reject) => {
      // convert each id with a promise that fetch the employee
      idList.forEach(employeeId => PROMISES.push(EmployeeService.get(employeeId)));

      Promise.all(PROMISES)
        .then(employeeDocs => {
          // when all promises resolved, build a result object, and resolve
          employeeDocs.forEach(employeeDoc => EMPLOYEES[employeeDoc.id] = employeeDoc.data())
          resolve(EMPLOYEES);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });            
  },

  // activate a role as activeRole for current user
  activateRole: roleId => {

    // Rights
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Employee' });
    }

    return new Promise((resolve, reject) => {

      // get the role
      RoleService.get(roleId)
        .then(roleDoc => {

          // verify role status. If it's not confirmed, it must not be activated
          if(roleDoc.data().status !== ERoleStatus.CONFIRMED) {
            ErrorService.manageErrorThenReject({ code: 'entity/right', details: 'Activate a non-confirmed role' }, reject);
            return;
          }

          // Update the activeRole of the employee linked to the current user
          EmployeeService.updateField(DataService.computed.user.uid, { activeRoleId: roleId })
            .then(() => {

              // Also, change the active role in the RT DB
              RT_Service.role.updateRole(roleDoc.data());

              // Notify the data service that something changed about the current employee
              DataService.computed.notifyChanges();
              resolve();
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));

        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },

  // unactivate the active role of the current user
  unactivateRole: () => {

    // Rights
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Employee' });
    }
    
    // Remove the active role of the employee corresponding to the current user
    return EmployeeService.updateField(DataService.computed.user.uid, { activeRoleId: null })
      .then(() => {

        // Also, remove the role into the RT service
        RT_Service.role.resetRole();

        // and notify that something has changed about the current employee
        DataService.computed.notifyChanges();
      })
      .catch(ErrorService.manageError);
  },

  // search for employees
  search: term => new Promise((resolve, reject) => {

    // call the compute funciton
    DataService.computed.search([ESearchType.EMPLOYEES], term, null)
      .then(results => resolve(results.data.employees))
      .catch(e => ErrorService.manageErrorThenReject(e, reject));
  }),

  // nested account activity
  accountActivity: {

    // Rights for account activity entities
    rights: {
      [ERights.RIGHT_ACCOUNT_ACTIVITY_CREATE]: () => true,
      [ERights.RIGHT_ACCOUNT_ACTIVITY_GET]: () => DataService.computed.isConnected(),
      [ERights.RIGHT_ACCOUNT_ACTIVITY_LIST]: () => DataService.computed.isConnected(),
      [ERights.RIGHT_ACCOUNT_ACTIVITY_UPDATE]: () => false,
      [ERights.RIGHTACCOUNT_ACTIVITY_DELETE]: () => false
    },

    create: accountActivity => {

      // Rights
      if(!EmployeeService.accountActivity.rights[ERights.RIGHT_ACCOUNT_ACTIVITY_CREATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create an Account Activity' });
      }
  
      // Class instance
      if(!accountActivity instanceof AccountActivity) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'AccountActivity' });
      }
  
      // Minimum data
      if(!ensureFilledFields(accountActivity, ['email', 'creationIsoDate'])) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['email', 'creationIsoDate'] });
      }
  
      // create
      return FirebaseService.getFirestore().collection('accountActivity').add(migratePrototype(accountActivity));
    },
    get: accountActivityId => {

      // Rights
      if(!EmployeeService.accountActivity.rights[ERights.RIGHT_ACCOUNT_ACTIVITY_GET]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get an Account Activity' });
      }

      // get
      return FirebaseService.getFirestore().collection('accountActivity').doc(accountActivityId).get();
    },
    list: () => {

      // Rights
      if(!EmployeeService.accountActivity.rights[ERights.RIGHT_ACCOUNT_ACTIVITY_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Account Activities' });
      }
  
      // Build the resultant object
      const ACCOUNT_ACTIVITIES = {};
      return new Promise((resolve, reject) => {
          FirebaseService.getFirestore().collection('accountActivity').get()
              .then(querySnapshot => {
                // once all account activities are listed, build object then resolve
                querySnapshot.forEach(accountActivityDoc => ACCOUNT_ACTIVITIES[accountActivityDoc.id] = accountActivityDoc.data());
                resolve(ACCOUNT_ACTIVITIES);
              })
              .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    update: (accountActivityId, accountActivity) => {

      // Rights
      if(!EmployeeService.accountActivity.rights[ERights.RIGHT_ACCOUNT_ACTIVITY_UPDATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Account Activity' });
      }
  
      // Class instance
      if(!accountActivity instanceof AccountActivity) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Account Activity' });
      }
  
      // Minimum data
      if(!ensureFilledFields(accountActivity, ['email', 'creationIsoDate'])) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['email', 'creationIsoDate'] });
      }
  
      // update
      return FirebaseService.getFirestore().collection('accountActivity').doc(accountActivityId).set(migratePrototype(accountActivity));
    },
    updateField: (accountActivityId, accountActivityField) => {

      // Rights
      if(!EmployeeService.accountActivity.rights[ERights.RIGHT_ACCOUNT_ACTIVITY_UPDATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Account Activity' });
      }
      
      // update
      return FirebaseService.getFirestore().collection('accountActivity').doc(accountActivityId).update(accountActivityField);
    },
    delete: accountActivityId => {

      // Rights
      if(!EmployeeService.accountActivity.rights[ERights.RIGHT_ACCOUNT_ACTIVITY_DELETE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete an Account Activity' });
      }
      
      // delete
      return FirebaseService.getFirestore().collection('accountActivity').doc(accountActivityId).delete();
    },
    // CUSTOM FUNCTIONS

    // Get all account activities for an email
    getAllForCurrentUser: () => {

      // Rights
      if(!EmployeeService.accountActivity.rights[ERights.RIGHT_ACCOUNT_ACTIVITY_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Account Activities' });
      }

      // Control that the user is signed in
      if(!DataService.computed.initialized || !DataService.computed.user) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'You have to be signed in to get your account activities' });
      }

      // Get all account activities for the current user
      const ACCOUNT_ACTIVITIES = {};
      return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('accountActivity')
          .where('email', '==', DataService.computed.user.email)
          .get()
          .then(querySnapshot => {
            // Build response then resolve
            querySnapshot.forEach(accountActivityDoc => ACCOUNT_ACTIVITIES[accountActivityDoc.id] = accountActivityDoc.data());
            resolve(ACCOUNT_ACTIVITIES);
          })
          .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    }
  }
};

export default EmployeeService;
