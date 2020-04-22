import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import Employee from './../../classes/Employee';
import ESearchType from './../../classes/enums/ESearchType';

const EmployeeService = {
  rights: {
    [ERights.RIGHT_EMPLOYEE_CREATE]: () => true,
    [ERights.RIGHT_EMPLOYEE_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EMPLOYEE_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EMPLOYEE_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EMPLOYEE_DELETE]: () => false
  },
  create: (userId, employee) => {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create an Employee' });
    }

    if(!employee instanceof Employee) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Employee' });
    }

    if(!ensureFilledFields(employee, ['firstname', 'lastname'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['firstname', 'lastname'] });
    }

    if(DataService.computed.employee && DataService.computed.employee.id && employee.id !== DataService.computed.employee.id) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('employees').doc(userId).set(migratePrototype(employee));
  },
  get: employeeId => {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get an Employee' });
    }
    return FirebaseService.getDb().collection('employees').doc(employeeId).get();
  },
  list: () => {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Employees' });
    }

    const employees = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getDb().collection('employees').get()
            .then(querySnapshot => {
                querySnapshot.forEach(employeeDoc => employees[employeeDoc.id] = employeeDoc.data());
                resolve(employees);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (employeeId, employee) => {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Employee' });
    }

    if(!employee instanceof Employee) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Employee' });
    }

    if(!ensureFilledFields(employee, ['firstname', 'lastname'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['firstname', 'lastname'] });
    }

    if(employeeId !== DataService.computed.employee.id) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('employees').doc(employeeId).set(migratePrototype(employee));
  },
  updateField: (employeeId, employeeField) => {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Employee' });
    }

    if(employeeId !== DataService.computed.user.uid) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }
    
    return FirebaseService.getDb().collection('employees').doc(employeeId).update(employeeField);
  },
  delete: employeeId => {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete an Employee' });
    }
    
    return FirebaseService.getDb().collection('employees').doc(employeeId).delete();
  },

  // CUSTOM FUNCTIONS
  getAllForIdList: idList => {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Employees' });
    }

    const promises = [];
    const employees = {};

    return new Promise((resolve, reject) => {
      idList.forEach(employeeId => promises.push(EmployeeService.get(employeeId)));

      Promise.all(promises)
        .then(employeeDocs => {
          employeeDocs.forEach(employeeDoc => employees[employeeDoc.id] = employeeDoc.data())
          resolve(employees);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });            
  },
  activateRole: roleId => {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Employee' });
    }

    return EmployeeService.updateField(DataService.computed.user.uid, {activeRoleId: roleId})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  },
  unactivateRole: () => {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Employee' });
    }
    
    return EmployeeService.updateField(DataService.computed.user.uid, {activeRoleId: null})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  },
  search: term => new Promise((resolve, reject) => {
      DataService.computed.search([ESearchType.EMPLOYEES], term, null)
        .then(results => resolve(results.data.employees))
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    })
};

export default EmployeeService;
