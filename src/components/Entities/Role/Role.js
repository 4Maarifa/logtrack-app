import React, { useEffect, useState } from 'react';

import DataService from './../../../services/data.service';
import RoleService from './../../../services/entities/role.service';
import DateService from './../../../services/date.service';

import { RoleDetails } from './../../../classes/Role';

import Icon from './../../Utils/Icon/Icon';

import { v4 as uuid } from 'uuid';

import './Role.scss';


const Role = ({ role }) => {
  if(!role) { return null; }

  const roleKey = Object.keys(role)[0];
  const observerKey = uuid();
  const [actions, setActions] = useState(null);
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    RoleService.observeActions(role, setActions, observerKey);
    return () => {
      DataService.computed.unobserveComputedValues(observerKey);
      RoleService.unobserveActions(observerKey);
    }
  }, []);

  if(!computed.initialized) { return null; }

  return (
    <div
     className={'Role ' + (!!computed.employee && computed.employee.activeRoleId === roleKey ? 'Role--active' : '')} 
     title={'' + (!role[roleKey].revokedIsoDate ? 
      'Requested on ' + DateService.getMonthYearString(DateService.getDateFromIsoString(role[roleKey].creationIsoDate)) : 
      'Revoked on ' + DateService.getMonthYearString(DateService.getDateFromIsoString(role[roleKey].revokedIsoDate))) }
     data-id={roleKey}>

      <span>
        <Icon source="fa" icon={RoleDetails[role[roleKey].role].icon} />
        {RoleDetails[role[roleKey].role].name}
        {!!computed.employee && computed.employee.activeRoleId === roleKey && <span className="badge">active</span> }
      </span>
      {actions}
    </div>
  );
}

export default Role;
