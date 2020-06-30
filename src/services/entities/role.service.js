import React from 'react';
import { faCheck, faTimes, faToggleOff, faToggleOn } from '@fortawesome/pro-light-svg-icons';

import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';
import EmployeeService from './employee.service';
import DateService from './../date.service';

import Role from './../../classes/Role';

import { ERole, ERoleStatus } from './../../classes/Role';

import Icon from './../../components/Utils/Icon/Icon';

/**
 * Service: RoleService
 * Service to manage roles
 */
const RoleService = {

  // Observer list: Observing roles
  observers: {},

  // Rights for Role Entities
  rights: {
    [ERights.RIGHT_ROLE_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_ROLE_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_ROLE_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_ROLE_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_ROLE_DELETE]: () => false
  },

  create: role => {

    // Rights
    if(!RoleService.rights[ERights.RIGHT_ROLE_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Role' });
    }

    // Class instance
    if(!role instanceof Role) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Role' });
    }

    // Minimum data
    if(!ensureFilledFields(role, ['employeeId', 'companyId', 'status', 'role'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['employeeId', 'companyId', 'status', 'role'] });
    }

    // Check if role employee is the current user. If the current user is not the employee,
    // It is authorized only if the current user is a manager of the role's company: checking if its active role matches this specific case
    if(role.employeeId !== DataService.computed.user.uid && (!DataService.computed.activeRole || role.companyId !== DataService.computed.activeRole.companyId || DataService.computed.activeRole.role !== ERole.MANAGER)) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // Create
    return FirebaseService.getFirestore().collection('roles').add(migratePrototype(role));
  },
  get: roleId => {

    // Rights
    if(!RoleService.rights[ERights.RIGHT_ROLE_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Role' });
    }

    // get
    return FirebaseService.getFirestore().collection('roles').doc(roleId).get();
  },
  list: () => {
    
    // Rights
    if(!RoleService.rights[ERights.RIGHT_ROLE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Roles' });
    }

    // Get all roles
    const ROLES = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('roles').get()
            .then(querySnapshot => {
              // Assign all roles to the same object, then resolve
              querySnapshot.forEach(roleDoc => ROLES[roleDoc.id] = roleDoc.data());
              resolve(ROLES);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (roleId, role) => {

    // Rigths
    if(!RoleService.rights[ERights.RIGHT_ROLE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Role' });
    }

    // Class instance
    if(!role instanceof Role) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Role' });
    }

    // Minimum data
    if(!ensureFilledFields(role, ['employeeId', 'companyId', 'status', 'role'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['employeeId', 'companyId', 'status', 'role'] });
    }

    // If the role's employee is not the current user, it is forbidden if the current user is not manager of the role's company
    if(role.employeeId !== DataService.computed.user.uid && (!DataService.computed.activeRole || 
      DataService.computed.activeRole.companyId !== role.companyId || DataService.computed.activeRole.role !== ERole.MANAGER )) {
        
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // update
    return FirebaseService.getFirestore().collection('roles').doc(roleId).set(migratePrototype(role));
  },
  updateField: (roleId, roleField) => {

    // Rights
    if(!RoleService.rights[ERights.RIGHT_ROLE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Role' });
    }
    
    // update
    return FirebaseService.getFirestore().collection('roles').doc(roleId).update(roleField);
  },
  delete: roleId => {

    // Rights
    if(!RoleService.rights[ERights.RIGHT_ROLE_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Role' });
    }
    
    // delete
    return FirebaseService.getFirestore().collection('roles').doc(roleId).delete();
  },

  // CUSTOM FUNCTIONS

  // Get the active role of an employee
  getActiveRoleForEmployeeId: employeeId => {

    // Rights
    if(!RoleService.rights[ERights.RIGHT_ROLE_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Role' });
    }

    return new Promise((resolve, reject) => {

      // Get the employee
      EmployeeService.get(employeeId)
        .then(docEmployee => {

          // If the user has no active role, resolve with null
          if(docEmployee.data().activeRoleId != null) {

            // Otherwise, get the active role and resolve its data
            return RoleService.get(docEmployee.data().activeRoleId)
              .then(activeRole => resolve(activeRole.data()))
              .catch(error => ErrorService.manageError(error) && reject());
          }
          return resolve(null);
        }).catch(e => {ErrorService.manageErrorThenReject(e, reject)});
    });
  },

  // get all roles for an employee that matches the statusArray. By default, fetch only confirmed roles
  getRolesForEmployeeId: (employeeId, statusArray = [ERoleStatus.CONFIRMED]) => {

    // Rights
    if(!RoleService.rights[ERights.RIGHT_ROLE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Roles' });
    }

    const ROLES = {};

    // fetch all roles that match the employeeId and statusArray
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('roles')
        .where('employeeId', '==', employeeId)
        .where('status', 'in', statusArray)
        .get()
        .then(querySnapshot => {
          // assign them all to an object, then resolve it
          querySnapshot.forEach(roleDoc => ROLES[roleDoc.id] = roleDoc.data());
          resolve(ROLES);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },

  // Get all roles for a company that matches the statusArray. By default, only fetch confirmed roles
  getRolesForCompanyId: (companyId, statusArray = [ERoleStatus.CONFIRMED]) => {

    // Rights
    if(!RoleService.rights[ERights.RIGHT_ROLE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Roles' });
    }

    const ROLES = {};

    // Get all roles for that companyId and that match the status
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('roles')
        .where('companyId', '==', companyId)
        .where('status', 'in', statusArray)
        .get()
        .then(querySnapshot => {
          // resolve the roles object
          querySnapshot.forEach(roleDoc => ROLES[roleDoc.id] = roleDoc.data());
          resolve(ROLES);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },

  // Get all roles for a companyId and an employeeId and that matches the statusArray. By default, only confirmed roles are returned
  getRolesForEmployeeIdAndCompanyId: (employeeId, companyId, statusArray = [ERoleStatus.CONFIRMED]) => {

    // Rights
    if(!RoleService.rights[ERights.RIGHT_ROLE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Roles' });
    }

    const ROLES = {};

    // Get all roles for this companyId, this employeeId and that match the status
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('roles')
        .where('companyId', '==', companyId)
        .where('employeeId', '==', employeeId)
        .where('status', 'in', statusArray)
        .get()
        .then(querySnapshot => {
          // Resolve the roles object
          querySnapshot.forEach(roleDoc => ROLES[roleDoc.id] = roleDoc.data());
          resolve(ROLES);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },

  // Confirm a role
  // Used by manager to confirm a request a user done to join the company
  confirmRole: roleId => {

    // Rights
    if(!RoleService.rights[ERights.RIGHT_ROLE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Role' });
    }

    // Check if the user has a MANAGER role active. Let Firebase check for the activeRoleCompany (if it matches the role companyId)
    if(!DataService.computed.activeRole || DataService.computed.activeRole.role !== ERole.MANAGER) {
      return ErrorService.manageErrorThenPromiseRejection('You don\'t have right to confirm this role');
    }

    // Update the status of the role as confirmed. Then, notify changes
    return RoleService.updateField(roleId, { status: ERoleStatus.CONFIRMED })
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  },

  // Deny a role
  // Used by manager to deny a request they received from a user that asked to join the company
  denyRole: roleId => {

    // Rights
    if(!RoleService.rights[ERights.RIGHT_ROLE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Role' });
    }

    // Check if the current user has a Manager role. we let Firebase check for the role's companyId
    if(!DataService.computed.activeRole || DataService.computed.activeRole.role !== ERole.MANAGER) {
      return ErrorService.manageErrorThenPromiseRejection('You don\'t have right to confirm this role');
    }

    // Update the role status to deny
    return RoleService.updateField(roleId, { status: ERoleStatus.DENIED })
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  },

  // Revoke a role
  // Used by manager to revoke, ban a user from a company
  revokeRole: roleId => {

    // Rights
    if(!RoleService.rights[ERights.RIGHT_ROLE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Role' });
    }

    // Check if the current user has an activeRole as Manager. Also, a user cannot revoke its activeRole
    if(!DataService.computed.activeRole || DataService.computed.activeRole.role !== ERole.MANAGER || roleId === DataService.computed.employee.activeRoleId) {
      return ErrorService.manageErrorThenPromiseRejection('You don\'t have right to revoke this role');
    }

    // Update the status as revoked and save the revoke dated
    return RoleService.updateField(roleId, { status: ERoleStatus.REVOKED, revokedIsoDate: DateService.getCurrentIsoDateString() })
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  },

  // Observer actions for a role. Each time the active role changes, call the callbacks with the new rights about a role
  observeActions: (role, callback, observerKey) => {

    // add the observer with its role and its callback
    RoleService.observers[observerKey] = {
      role: role,
      callback: callback
    };

    // Call the callback with the current possible actions for the role
    callback(RoleService.getActions(role));
  },

  // Remove observer, passing the same unique observerKey used on observer registration
  unobserveActions: observerKey => delete RoleService.observers[observerKey],

  // Notify all observers, recompute all actions of all observers and call their callback
  notifyObservers: () => Object.keys(RoleService.observers)
      .forEach(observerKey => RoleService.observers[observerKey].callback(RoleService.getActions(RoleService.observers[observerKey].role))),

  // get possible actions for a role
  getActions: role => {
    const ROLE_ID = Object.keys(role)[0], ROLE_DATA = role[ROLE_ID];
    const ACTIONS = [];

    // If the current user is a manager on the role's companyId and the role status is draft, propose to confirm or deny the role
    if(DataService.computed.activeRole && ROLE_DATA.status === ERoleStatus.DRAFT && ROLE_DATA.companyId === DataService.computed.activeRole.companyId && DataService.computed.activeRole.role === ERole.MANAGER) {
      ACTIONS.push(<button key="CONFIRM" title="Confirm?" onClick={() => RoleService.confirmRole(ROLE_ID)}>
        <Icon source="fa" icon={faCheck} />
      </button>);
      ACTIONS.push(<button key="DENY" title="Deny?" onClick={() => RoleService.denyRole(ROLE_ID)}>
      <Icon source="fa" icon={faTimes} />
    </button>);
    }

    // If the current user is manager of the role's company and the role is confirmed (and it's not the current user's active role), we propose him to revoke the role
    if(DataService.computed.activeRole && ROLE_ID !== DataService.computed.employee.activeRoleId && ROLE_DATA.status === ERoleStatus.CONFIRMED && ROLE_DATA.companyId === DataService.computed.activeRole.companyId && DataService.computed.activeRole.role === ERole.MANAGER) {
      ACTIONS.push(<button key="REVOKE" title="Revoke?" onClick={() => RoleService.revokeRole(ROLE_ID)}>
        <Icon source="fa" icon={faTimes} />
      </button>);
    }

    // If the role is confirmed and on the current user,
    if(DataService.computed.user && ROLE_DATA.status === ERoleStatus.CONFIRMED && ROLE_DATA.employeeId === DataService.computed.user.uid) {

      // If the role is his active role, propose him to disable
      if(ROLE_ID === DataService.computed.employee.activeRoleId) {
        ACTIONS.push(<button key="DISABLE" title="Disable?" onClick={EmployeeService.unactivateRole}>
          <Icon source="fa" icon={faToggleOn} />
        </button>);
      }
      else {

        // Otherwise, propose him to enable it
        ACTIONS.push(<button key="ENABLE" title="Enable?" onClick={() => EmployeeService.activateRole(ROLE_ID)}>
          <Icon source="fa" icon={faToggleOff} />
        </button>);
      }
    }

    // Return role actions
    return <div className="Role-actions">{ACTIONS}</div>;
  }
};

export default RoleService;
