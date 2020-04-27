import React, { useState, useEffect } from 'react';
import { faUser, faCommentDots, faUserCog, faUserPlus, faUserTag, faPortrait } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ActionList from './../../Utils/ActionList/ActionList';

import DataService from './../../../services/data.service';

import { ERole } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './Employee.scss';

const Employee = ({ employee, isPage }) => {
  if(!employee) { return null; }

  const employeeKey = Object.keys(employee)[0];

  const observerKey = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey);
  }, []);

  if(!computed.initialized) { return null; }

  const actions = [];

  if(!isPage) {
    actions.push({ title: 'Visit Profile', icon: <Icon source="fa" icon={faUser} />, link: `/employee/${employeeKey}` });
  }

  if(computed.user.uid === employeeKey) {
    actions.push({ title: 'Modify Profile', icon: <Icon source="fa" icon={faUserCog} />, link: '/profile' });
    actions.push({ title: 'Modify Pro Profile', icon: <Icon source="fa" icon={faPortrait} />, link: '/jobs?tab=profile' });
    actions.push({ title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: '/role-add' });
  }
  else {
    actions.push({ title: 'Chat', icon: <Icon source="fa" icon={faCommentDots} />, link: `/chat-create/${employeeKey}` });
    if (computed.activeRole.role === ERole.MANAGER) {
      actions.push({ title: 'Offer a role', icon: <Icon source="fa" icon={faUserPlus} />, link: `/role-offer/${employeeKey}` });
    }
  }

  /**
   * RENDER
   */
  return (
    <div className="Employee Element-content">
      <div className="Element-base">
        {employee[employeeKey] && employee[employeeKey].profilePictureUrl ?
          <div className="Element-photo">
            <img
              alt={employee[employeeKey].firstname + ' ' + employee[employeeKey].lastname + '\'s profile picture'} 
              src={employee[employeeKey].profilePictureUrl} />
          </div>
        : <Icon containerclassname="Element-icon" source="fa" icon={faUser} /> }
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.EMPLOYEE} entityId={employeeKey} entityData={employee[employeeKey]} noPhoto white={isPage} />
          </span>
        </div>
        <div className="Element-actions">
          <ActionList actions={actions} isFlatten={isPage} />
        </div>
      </div>
    </div>
  );
}

export default Employee;
