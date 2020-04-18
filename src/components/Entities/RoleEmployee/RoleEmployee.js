import React from 'react';
import { faUser } from '@fortawesome/pro-solid-svg-icons';

import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import Icon from './../../Utils/Icon/Icon';

import Role from './../Role/Role';

import { ERoleStatus } from './../../../classes/Role';

import './RoleEmployee.scss';

const RoleEmployee = ({ employee, options, roles }) => {

  /**
   * RENDER
   */
  const renderRole = roleKey => {
    if(!options.showDraft && roles[roleKey].status === ERoleStatus.DRAFT) {
      return null;
    }
    return <Role key={roleKey} role={ { [roleKey]: roles[roleKey] } } options={options}></Role>;
  };

  if(!employee || !Object.keys(roles).length) {
    return null;
  }
  let employeeId = Object.keys(employee)[0];

  if(!options.showDraft && 
      Object.keys(roles).map((roleKey) => roles[roleKey].status).reduce((total, role) => total + (role.status === ERoleStatus.CONFIRMED) ? 1 : 0) === 0) {
      return null;
  }

  return (
    <div className="RoleEmployee Element-content">
      <div className="Element-base">
        {(employee[employeeId] && employee[employeeId].profilePictureUrl) ? 
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
      </div>
    </div>
  );
};

export default RoleEmployee;
