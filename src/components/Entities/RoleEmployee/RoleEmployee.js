import React, { useState, useEffect } from 'react';
import { faUser, faUserTag, faUserPlus, faUserCog } from '@fortawesome/pro-light-svg-icons';

import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import Icon from './../../Utils/Icon/Icon';
import ActionList from './../../Utils/ActionList/ActionList';

import Role from './../Role/Role';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';

import { ERoleStatus, ERole } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './RoleEmployee.scss';

/**
 * Company: RoleEmployee
 * Details about roles of an Employee
 * 
 * You have to pass a fully loaded Employee as well as fully loaded role list
 */
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
  // Render role util function that render a Role component
  const renderRole = roleId => {
    // If explicit wish to not print draft roles, return null if draft role is encountered
    if(!options.showDraft && roles[roleId].status === ERoleStatus.DRAFT) {
      return null;
    }
    return <Role key={roleId} role={ { [roleId]: roles[roleId] } } options={options} />;
  };

  if(!employee || !Object.keys(roles).length) {
    return null;
  }

  const EMPLOYEE_ID = Object.keys(employee)[0],
    EMPLOYEE_DATA = employee[EMPLOYEE_ID];

  // If we do not want to print draft roles and only draft roles are printed, return null to print nothing
  if(!options.showDraft && 
      Object.keys(roles).map(roleId => roles[roleId].status).reduce((total, role) => total + (role.status !== ERoleStatus.DRAFT) ? 1 : 0) === 0) {
      return null;
  }

  // Compute actions
  const ACTIONS = [
    { title: 'Visit Profile', icon: <Icon source="fa" icon={faUser} />, link: `/employee/${EMPLOYEE_ID}` }
  ];

  if(computed.user.uid === EMPLOYEE_ID) {
    // If current user
    ACTIONS.push({ title: 'Modify profile', icon: <Icon source="fa" icon={faUserCog} />, link: '/profile' });
    ACTIONS.push({ title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: '/role-add' });
  }
  else {
    // Otherwise, if current role is manager, let him offer a role for that employee on active company
    if(computed.activeRole.role === ERole.MANAGER) {
      ACTIONS.push({ title: 'Offer a role', icon: <Icon source="fa" icon={faUserPlus} />, link: `/role-offer/${EMPLOYEE_ID}` });
    }
  }

  return (
    <div className="RoleEmployee Element-content">
      <div className="Element-base">

        {/* Employee profile picture. If he got no one, print icon */}
        {EMPLOYEE_DATA && EMPLOYEE_DATA.profilePictureUrl ? 
          <div className="Element-photo">
            <img
              alt={EMPLOYEE_DATA.firstname + ' ' + EMPLOYEE_DATA.lastname + '\'s profile picture'} 
              src={EMPLOYEE_DATA.profilePictureUrl} />
          </div>
        : <Icon source="fa" icon={faUser} containerclassname="Element-icon" /> }

        {/* Employee and role details */}
        <div className="Element-data">
          <span className="Element-title">
            {/* Employee pagelink */}
            <PageLink type={PageLinkType.EMPLOYEE} entityId={EMPLOYEE_ID} entityData={EMPLOYEE_DATA} noPhoto />
          </span>
          <div className="roles">
            {/* Print a Role component for each role */}
            {Object.keys(roles).map(renderRole)}
          </div>
        </div>
        <div className="Element-actions">
          {/* Actions */}
          <ActionList actions={ACTIONS} />
        </div>
      </div>
    </div>
  );
};

// FSS for RoleEmployee (used to filer, search and sort RoleEmployees) => sort by role, search on role
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
