import React, { useState, useEffect } from 'react';
import { faUser, faUserTag, faUserPlus, faUserCog } from '@fortawesome/pro-solid-svg-icons';

import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import Icon from './../../Utils/Icon/Icon';
import ActionList from './../../Utils/ActionList/ActionList';

import Role from './../Role/Role';

import DataService from './../../../services/data.service';

import { ERoleStatus, ERole } from './../../../classes/Role';
import { v4 as uuid } from 'uuid';

import './RoleEmployee.scss';

const RoleEmployee = ({ employee, options, roles }) => {

  const observerKey = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey);
  }, []);

  if(!computed.initialized) {
    return null;
  }

  /**
   * RENDER
   */
  const renderRole = roleKey => {
    if(!options.showDraft && roles[roleKey].status === ERoleStatus.DRAFT) {
      return null;
    }
    return <Role key={roleKey} role={ { [roleKey]: roles[roleKey] } } options={options} />;
  };

  if(!employee || !Object.keys(roles).length) {
    return null;
  }
  let employeeId = Object.keys(employee)[0];

  if(!options.showDraft && 
      Object.keys(roles).map(roleKey => roles[roleKey].status).reduce((total, role) => total + (role.status === ERoleStatus.CONFIRMED) ? 1 : 0) === 0) {
      return null;
  }

  const actions = [
    { title: 'Visit Profile', icon: <Icon source="fa" icon={faUser} />, link: `/employee/${employeeId}` }
  ];

  if(computed.user.uid === employeeId) {
    actions.push({ title: 'Modify profile', icon: <Icon source="fa" icon={faUserCog} />, link: '/profile' });
    actions.push({ title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: '/role-add' });
  }
  else {
    if(computed.activeRole.role === ERole.MANAGER) {
      actions.push({ title: 'Offer a role', icon: <Icon source="fa" icon={faUserPlus} />, link: `/role-offer/${employeeId}` });
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
          <ActionList actions={actions} />
        </div>
      </div>
    </div>
  );
};

export default RoleEmployee;
