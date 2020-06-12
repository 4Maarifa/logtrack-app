import React from 'react';
import { faCheck, faTimes, faToggleOff, faToggleOn } from '@fortawesome/pro-solid-svg-icons';

import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';
import EmployeeService from './employee.service';
import DateService from './../date.service';

import Role from './../../classes/Role';

import { ERole, ERoleStatus } from './../../classes/Role';

import Icon from './../../components/Utils/Icon/Icon';

const RoleService = {
  observers: {},
  rights: {
    [ERights.RIGHT_ROLE_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_ROLE_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_ROLE_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_ROLE_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_ROLE_DELETE]: () => false
  },
  create: role => {
    if(!RoleService.rights[ERights.RIGHT_ROLE_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Role' });
    }

    if(!role instanceof Role) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Role' });
    }

    if(!ensureFilledFields(role, ['employeeId', 'companyId', 'status', 'role'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['employeeId', 'companyId', 'status', 'role'] });
    }

    if(role.employeeId !== DataService.computed.user.uid && (!DataService.computed.activeRole || (role.companyId !== DataService.computed.activeRole.companyId || DataService.computed.activeRole.role !== ERole.MANAGER))) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getFirestore().collection('roles').add(migratePrototype(role));
  },
  get: roleId => {
    if(!RoleService.rights[ERights.RIGHT_ROLE_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Role' });
    }
    return FirebaseService.getFirestore().collection('roles').doc(roleId).get();
  },
  list: () => {
    if(!RoleService.rights[ERights.RIGHT_ROLE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Roles' });
    }

    const ROLES = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('roles').get()
            .then(querySnapshot => {
                querySnapshot.forEach(roleDoc => ROLES[roleDoc.id] = roleDoc.data());
                resolve(ROLES);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (roleId, role) => {
    if(!RoleService.rights[ERights.RIGHT_ROLE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Role' });
    }

    if(!role instanceof Role) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Role' });
    }

    if(!ensureFilledFields(role, ['employeeId', 'companyId', 'status', 'role'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['employeeId', 'companyId', 'status', 'role'] });
    }

    if(role.employeeId !== DataService.computed.user.uid && (
      DataService.computed.activeRole.companyId !== role.companyId || DataService.computed.activeRole.role !== ERole.MANAGER )) {
        
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getFirestore().collection('roles').doc(roleId).set(migratePrototype(role));
  },
  updateField: (roleId, roleField) => {
    if(!RoleService.rights[ERights.RIGHT_ROLE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Role' });
    }
    
    return FirebaseService.getFirestore().collection('roles').doc(roleId).update(roleField);
  },
  delete: roleId => {
    if(!RoleService.rights[ERights.RIGHT_ROLE_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Role' });
    }
    
    return FirebaseService.getFirestore().collection('roles').doc(roleId).delete();
  },

  // CUSTOM FUNCTIONS
  getActiveRoleForEmployeeId: employeeId => {
    if(!RoleService.rights[ERights.RIGHT_ROLE_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Role' });
    }

    return new Promise((resolve, reject) => {
      EmployeeService.get(employeeId)
        .then(docEmployee => {
          if(docEmployee.exists) {
            if(docEmployee.data().activeRoleId != null) {
              return RoleService.get(docEmployee.data().activeRoleId)
                .then(activeRole => {
                  if(activeRole.exists) {
                    resolve(activeRole.data());
                  }
                  else {
                    resolve(null);
                  }
                })
                .catch(error => ErrorService.manageError(error) && reject());
            }
            return resolve(null);
          }
          else {
            ErrorService.manageError({code: 'entity/not-found', details: 'Employee #' + employeeId});
            reject();
          }
        })
        .catch(e => {ErrorService.manageErrorThenReject(e, reject)});
    });
  },
  getRolesForEmployeeId: (employeeId, statusArray = [ERoleStatus.CONFIRMED]) => {
    if(!RoleService.rights[ERights.RIGHT_ROLE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Roles' });
    }

    const ROLES = {};

    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('roles')
        .where('employeeId', '==', employeeId)
        .where('status', 'in', statusArray)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(roleDoc => ROLES[roleDoc.id] = roleDoc.data());
          resolve(ROLES);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  getRolesForCompanyId: (companyId, statusArray = [ERoleStatus.CONFIRMED]) => {
    if(!RoleService.rights[ERights.RIGHT_ROLE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Roles' });
    }

    const ROLES = {};

    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('roles')
        .where('companyId', '==', companyId)
        .where('status', 'in', statusArray)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(roleDoc => ROLES[roleDoc.id] = roleDoc.data());
          resolve(ROLES);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  getRolesForEmployeeIdAndCompanyId: (employeeId, companyId, statusArray = [ERoleStatus.CONFIRMED]) => {
    if(!RoleService.rights[ERights.RIGHT_ROLE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Roles' });
    }

    const ROLES = {};

    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('roles')
        .where('companyId', '==', companyId)
        .where('employeeId', '==', employeeId)
        .where('status', 'in', statusArray)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(roleDoc => ROLES[roleDoc.id] = roleDoc.data());
          resolve(ROLES);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  confirmRole: roleId => {
    if(!RoleService.rights[ERights.RIGHT_ROLE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Role' });
    }

    if(!DataService.computed.activeRole || DataService.computed.activeRole.role !== ERole.MANAGER) {
      return ErrorService.manageErrorThenPromiseRejection('You don\'t have right to confirm this role');
    }

    return RoleService.updateField(roleId, {status: ERoleStatus.CONFIRMED})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  },
  denyRole: roleId => {
    if(!RoleService.rights[ERights.RIGHT_ROLE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Role' });
    }

    if(!DataService.computed.activeRole || DataService.computed.activeRole.role !== ERole.MANAGER) {
      return ErrorService.manageErrorThenPromiseRejection('You don\'t have right to confirm this role');
    }

    return RoleService.updateField(roleId, {status: ERoleStatus.DENIED})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  },
  revokeRole: roleId => {
    if(!RoleService.rights[ERights.RIGHT_ROLE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Role' });
    }

    if(!DataService.computed.activeRole || !DataService.computed.employee || DataService.computed.activeRole.role !== ERole.MANAGER || roleId === DataService.computed.employee.activeRoleId) {
      return ErrorService.manageErrorThenPromiseRejection('You don\'t have right to revoke this role');
    }

    return RoleService.updateField(roleId, {status: ERoleStatus.REVOKED, revokedIsoDate: DateService.getCurrentIsoDateString()})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  },
  observeActions: (role, callback, observerKey) => {
    RoleService.observers[observerKey] = {
      role: role,
      callback: callback
    };
    callback(RoleService.getActions(role));
  },
  unobserveActions: observerKey => delete RoleService.observers[observerKey],
  notifyObservers: () => Object.keys(RoleService.observers)
      .forEach(observerKey => RoleService.observers[observerKey].callback(RoleService.getActions(RoleService.observers[observerKey].role))),
  getActions: role => {
    const ROLE_ID = Object.keys(role)[0],
      ROLE_DATA = role[ROLE_ID];
    const ACTIONS = [];

    if(DataService.computed.activeRole && ROLE_DATA.status === ERoleStatus.DRAFT && ROLE_DATA.companyId === DataService.computed.activeRole.companyId && DataService.computed.activeRole.role === ERole.MANAGER) {
      ACTIONS.push(<button key="CONFIRM" title="Confirm?" onClick={() => RoleService.confirmRole(ROLE_ID)}>
        <Icon source="fa" icon={faCheck} />
      </button>);
      ACTIONS.push(<button key="DENY" title="Deny?" onClick={() => RoleService.denyRole(ROLE_ID)}>
      <Icon source="fa" icon={faTimes} />
    </button>);
    }
    if(DataService.computed.activeRole && DataService.computed.employee && ROLE_ID !== DataService.computed.employee.activeRoleId && ROLE_DATA.status === ERoleStatus.CONFIRMED && ROLE_DATA.companyId === DataService.computed.activeRole.companyId && DataService.computed.activeRole.role === ERole.MANAGER) {
      ACTIONS.push(<button key="REVOKE" title="Revoke?" onClick={() => RoleService.revokeRole(ROLE_ID)}>
        <Icon source="fa" icon={faTimes} />
      </button>);
    }
    if(DataService.computed.user && ROLE_DATA.status === ERoleStatus.CONFIRMED && ROLE_DATA.employeeId === DataService.computed.user.uid) {
      if(ROLE_ID === DataService.computed.employee.activeRoleId) {
        ACTIONS.push(<button key="DISABLE" title="Disable?" onClick={EmployeeService.unactivateRole}>
          <Icon source="fa" icon={faToggleOn} />
        </button>);
      }
      else {
        ACTIONS.push(<button key="ENABLE" title="Enable?" onClick={() => EmployeeService.activateRole(ROLE_ID)}>
          <Icon source="fa" icon={faToggleOff} />
        </button>);
      }
    }
    return <div className="Role-actions">
      {ACTIONS}
    </div>;
  }
};

export default RoleService;
