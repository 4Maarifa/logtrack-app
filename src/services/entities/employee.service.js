import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import Employee from './../../classes/Employee';

const EmployeeService = {
  rights: {
    [ERights.RIGHT_EMPLOYEE_CREATE]: () => true,
    [ERights.RIGHT_EMPLOYEE_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EMPLOYEE_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EMPLOYEE_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EMPLOYEE_DELETE]: () => false
  },
  create(employee) {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create an Employee' });
    }

    if(!employee instanceof Employee) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Employee' });
    }

    if(!ensureFilledFields(employee, ['id', 'firstname', 'lastname'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['id', 'firstname', 'lastname'] });
    }

    if(!!DataService.computed.employee && !!DataService.computed.employee.id && employee.id !== DataService.computed.employee.id) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('employees').doc(employee.id).set(migratePrototype(employee));
  },
  get(employeeId) {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get an Employee' });
    }
    return FirebaseService.getDb().collection('employees').doc(employeeId).get();
  },
  list() {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Employees' });
    }

    var employees = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getDb().collection('employees').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((employeeDoc) => employees[employeeDoc.id] = employeeDoc.data());
                resolve(employees);
            })
            .catch((e) => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update(employee) {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Employee' });
    }

    if(!employee instanceof Employee) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Employee' });
    }

    if(!ensureFilledFields(employee, ['id', 'firstname', 'lastname'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['id', 'firstname', 'lastname'] });
    }

    if(employee.id !== DataService.computed.employee.id) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('employees').doc(employee.id).set(migratePrototype(employee));
  },
  updateField(employeeId, employeeField) {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Employee' });
    }

    if(employeeId !== DataService.computed.employee.id) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }
    
    return FirebaseService.getDb().collection('employees').doc(employeeId).update(employeeField);
  },
  delete(employeeId) {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete an Employee' });
    }
    
    return FirebaseService.getDb().collection('employees').doc(employeeId).delete();
  },

  // CUSTOM FUNCTIONS
  getAllForIdList(idList) {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Employees' });
    }

    var promises = [];
    var employees = {};

    return new Promise((resolve, reject) => {
      idList.forEach((employeeId) => promises.push(EmployeeService.get(employeeId)));

      Promise.all(promises)
        .then((employeeDocs) => {
          employeeDocs.forEach((employeeDoc) => employees[employeeDoc.id] = employeeDoc.data())
          resolve(employees);
        })
        .catch((e) => ErrorService.manageErrorThenReject(e, reject));
    });            
  },
  activateRole(roleId) {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Employee' });
    }

    return EmployeeService.updateField(DataService.computed.user.uid, {activeRoleId: roleId})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  },
  unactivateRole() {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Employee' });
    }
    
    return EmployeeService.updateField(DataService.computed.user.uid, {activeRoleId: null})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  },
  searchOnFirstname(term) {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Employees' });
    }

    return FirebaseService.getDb().collection('employees').orderBy('firstname').startAt(term.toUpperCase()).endAt(term.toLowerCase() + "\uf8ff").get();
  },
  searchOnLastname(term) {
    if(!EmployeeService.rights[ERights.RIGHT_EMPLOYEE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Employees' });
    }

    return FirebaseService.getDb().collection('employees').orderBy('lastname').startAt(term.toUpperCase()).endAt(term.toLowerCase() + "\uf8ff").get();
  }
};

export default EmployeeService;
