import React, { useState, useEffect } from 'react';
import { faUser, faUserTag, faUserPlus, faUserCog } from '@fortawesome/pro-solid-svg-icons';

import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import Icon from './../../Utils/Icon/Icon';
import ActionList from './../../Utils/ActionList/ActionList';

import Role from './../Role/Role';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';

import { ERoleStatus, ERole } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './RoleEmployee.scss';

const RoleEmployee = ({ employee, options, roles }) => {

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderRole = roleId => {
    if(!options.showDraft && roles[roleId].status === ERoleStatus.DRAFT) {
      return null;
    }
    return <Role key={roleId} role={ { [roleId]: roles[roleId] } } options={options} />;
  };

  if(!employee || !Object.keys(roles).length) {
    return null;
  }
  let employeeId = Object.keys(employee)[0];

  if(!options.showDraft && 
      Object.keys(roles).map(roleId => roles[roleId].status).reduce((total, role) => total + (role.status === ERoleStatus.CONFIRMED) ? 1 : 0) === 0) {
      return null;
  }

  const ACTIONS = [
    { title: 'Visit Profile', icon: <Icon source="fa" icon={faUser} />, link: `/employee/${employeeId}` }
  ];

  if(computed.user.uid === employeeId) {
    ACTIONS.push({ title: 'Modify profile', icon: <Icon source="fa" icon={faUserCog} />, link: '/profile' });
    ACTIONS.push({ title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: '/role-add' });
  }
  else {
    if(computed.activeRole.role === ERole.MANAGER) {
      ACTIONS.push({ title: 'Offer a role', icon: <Icon source="fa" icon={faUserPlus} />, link: `/role-offer/${employeeId}` });
    }
  }

  return (
    <div className="RoleEmployee Element-content">
      <div className="Element-base">
        {employee[employeeId] && employee[employeeId].profilePictureUrl ? 
          <div className="Element-photo">
            <img
              alt={employee[employeeId].firstname + ' ' + employee[employeeId].lastname + '\'s profile picture'} 
              src={employee[employeeId].profilePictureUrl} />
          </div>
        : <Icon source="fa" icon={faUser} containerclassname="Element-icon" /> }
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.EMPLOYEE} entityId={employeeId} entityData={employee[employeeId]} noPhoto />
          </span>
          <div className="roles">
            {Object.keys(roles).map(renderRole)}
          </div>
        </div>
        <div className="Element-actions">
          <ActionList actions={ACTIONS} />
        </div>
      </div>
    </div>
  );
};

export const roleEmployeeExTableFSS = {
  sort: {
    role: {
      title: 'Role',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].role, items[key2].role)
      )),
      default: true
    }
  },
  search: (_, itemData, searchTerm) => (
    itemData.role.toLowerCase().includes(searchTerm.toLowerCase())
  )
};

export default RoleEmployee;
