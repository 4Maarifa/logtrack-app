import React from 'react';
import { faCheck, faTimes } from '@fortawesome/pro-solid-svg-icons';

import ERights from './../../classes/enums/ERights';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';
import EmployeeService from './employee.service';

import Role from './../../classes/Role';

import ERole from './../../classes/enums/ERole';
import ERoleStatus from './../../classes/enums/ERoleStatus';

import Icon from './../../components/Utils/Icon/Icon';

const RoleService = {
  observers: [],
  rights: {
    [ERights.RIGHT_ROLE_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_ROLE_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_ROLE_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_ROLE_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_ROLE_DELETE]: () => false
  },
  create(role) {
    if (!RoleService.rights[ERights.RIGHT_ROLE_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Role' });
    }

    if (!role instanceof Role) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Role' });
    }

    if (!ensureFilledFields(role, ['employeeId', 'companyId', 'status', 'role'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['employeeId', 'companyId', 'status', 'role'] });
    }

    if (role.employeeId !== DataService.computed.employee.id) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('roles').add(migratePrototype(role));
  },
  get(roleId) {
    if (!RoleService.rights[ERights.RIGHT_ROLE_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Role' });
    }
    return FirebaseService.getDb().collection('roles').doc(roleId).get();
  },
  list() {
    if (!RoleService.rights[ERights.RIGHT_ROLE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Roles' });
    }

    var roles = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getDb().collection('roles').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((roleDoc) => roles[roleDoc.id] = roleDoc.data());
                resolve(roles);
            })
            .catch((e) => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update(role) {
    if (!RoleService.rights[ERights.RIGHT_ROLE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Role' });
    }

    if (!role instanceof Role) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Role' });
    }

    if (!ensureFilledFields(role, ['employeeId', 'companyId', 'status', 'role'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['employeeId', 'companyId', 'status', 'role'] });
    }

    if (role.employeeId !== DataService.computed.employee.id && (
      DataService.computed.activeRole.companyId !== role.companyId || DataService.computed.activeRole.role !== ERole.MANAGER
      )) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('roles').doc(role.id).set(migratePrototype(role));
  },
  updateField(roleId, roleField) {
    if (!RoleService.rights[ERights.RIGHT_ROLE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Role' });
    }
    
    return FirebaseService.getDb().collection('roles').doc(roleId).update(roleField);
  },
  delete(roleId) {
    if (!RoleService.rights[ERights.RIGHT_ROLE_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Role' });
    }
    
    return FirebaseService.getDb().collection('roles').doc(roleId).delete();
  },

  // CUSTOM FUNCTIONS
  getActiveRoleForEmployeeId(employeeId) {
    if (!RoleService.rights[ERights.RIGHT_ROLE_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Role' });
    }

    return new Promise((resolve, reject) => {
      EmployeeService.get(employeeId)
        .then((docEmployee) => {
          if(docEmployee.exists) {
            if (docEmployee.data().activeRoleId != null) {
              return RoleService.get(docEmployee.data().activeRoleId)
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
    if (!RoleService.rights[ERights.RIGHT_ROLE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Roles' });
    }

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
  getRolesForEmployeeId(employeeId) {
    if (!RoleService.rights[ERights.RIGHT_ROLE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Roles' });
    }

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
    if (!RoleService.rights[ERights.RIGHT_ROLE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Roles' });
    }

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
  confirmRole(roleId) {
    if (!RoleService.rights[ERights.RIGHT_ROLE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Role' });
    }

    return RoleService.updateField(roleId, {status: ERoleStatus.CONFIRMED})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  },
  observeActions(role, observer) {
    RoleService.observers.push({
        role: role,
        observer: observer
    });
    observer(RoleService.getActions(role));
  },
  notifyObservers() {
    RoleService.observers.forEach((observer) => observer.observer(RoleService.getActions(observer.role)));
  },
  getActions(role) {
    var roleId = Object.keys(role)[0];
    if(!!DataService.computed.activeRole && role[roleId].status === ERoleStatus.DRAFT && role[roleId].companyId === DataService.computed.activeRole.companyId && DataService.computed.activeRole.role === ERole.MANAGER) {
        return <div className="Role-actions">
            <button onClick={() => RoleService.confirmRole(roleId)}>
                <Icon source="fa" icon={faCheck} />
                Confirm ?
            </button>
        </div>;
    }
    if(!!DataService.computed.user && role[roleId].status === ERoleStatus.CONFIRMED && role[roleId].employeeId === DataService.computed.user.uid) {
        if(roleId === DataService.computed.employee.activeRoleId) {
            return <div className="Role-actions">
                <button onClick={() => EmployeeService.unactivateRole()}>
                    <Icon source="fa" icon={faTimes} />
                    Disable?
                </button>
            </div>;
        }
        return <div className="Role-actions">
            <button onClick={() => EmployeeService.activateRole(roleId)}>
                <Icon source="fa" icon={faCheck} />
                Enable?
            </button>
        </div>;
    }
    return <></>;
  }
};

export default RoleService;
