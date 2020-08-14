import React, { useEffect, useState } from 'react';

import DataService from './../../../services/data.service';
import RoleService from './../../../services/entities/role.service';
import DateService from './../../../services/date.service';

import { ERoleDetails } from './../../../classes/Role';

import Icon from './../../Utils/Icon/Icon';

import { v4 as uuid } from 'uuid';

import './Role.scss';

/**
 * Component: role
 * Print details about a role
 * 
 * Pass a fully loaded role
 */
const Role = ({ role }) => {
  if(!role) { return null; }

  const ROLE_ID = Object.keys(role)[0],
    ROLE_DATA = role[ROLE_ID];
  
  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  // Actions available for that role
  // State for them as they may update depending on current role and other things
  const [actions, setActions] = useState(null);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);

    // Observing actions on that particular role
    RoleService.observeActions(role, setActions, OBSERVER_KEY);
    return () => {
      DataService.computed.unobserveComputedValues(OBSERVER_KEY);
      RoleService.unobserveActions(OBSERVER_KEY);
    }
  }, []);

  if(!computed.initialized) { return null; }

  return (
    <div
     className={'Role ' + (computed.employee && computed.employee.activeRoleId === ROLE_ID ? 'Role--active' : '')} 
     title={'' + (!ROLE_DATA.revokedIsoDate ? 
      'Requested on ' + DateService.getMonthYearString(DateService.getDateFromIsoString(ROLE_DATA.creationIsoDate)) : 
      'Revoked on ' + DateService.getMonthYearString(DateService.getDateFromIsoString(ROLE_DATA.revokedIsoDate))) }
     data-id={ROLE_ID}>

      <span>
        {/* Role icon */}
        <Icon source="fa" icon={ERoleDetails[ROLE_DATA.role].icon} />

        {/* Role name */}
        {ERoleDetails[ROLE_DATA.role].name}

        {/* If role is the active role for current user, say it's the one that's active */}
        {computed.employee && computed.employee.activeRoleId === ROLE_ID && <span className="badge">active</span> }
      </span>
      {actions}
    </div>
  );
}

export default Role;
