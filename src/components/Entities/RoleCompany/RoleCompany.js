import React, { useState, useEffect } from 'react';
import { faBuilding, faUserTag, faEdit } from '@fortawesome/pro-solid-svg-icons';

import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ActionList from './../../Utils/ActionList/ActionList';
import Icon from './../../Utils/Icon/Icon';

import Role from './../Role/Role';

import DataService from './../../../services/data.service';

import { ERole } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './RoleCompany.scss';

const RoleCompany = ({ company, roles }) => {
  if(!company || !Object.keys(roles).length) { return null; }

  const companyId = Object.keys(company)[0];

  const observerKey = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey);
  }, []);

  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderRole = roleKey => (
    <Role key={roleKey} role={ { [roleKey]: roles[roleKey] } } />
  );

  const actions = [
    { title: 'View', icon: <Icon source="fa" icon={faBuilding} />, link: `/company/${companyId}` }
  ];

  if(computed.activeRole && computed.activeRole.role === ERole.MANAGER && computed.activeRole.companyId === companyId) {
    actions.push({ title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/company-edit/${companyId}` });
  }

  actions.push({ title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: `/role-add/${companyId}` });

  return (
    <div className="RoleCompany Element-content">
      <div className="Element-base">
        <div className="Element-photo">
          <img
            alt={company[companyId].name} 
            src={company[companyId].logoURL} />
        </div>
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.COMPANY} entityId={companyId} entityData={company[companyId]} noPhoto />
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

export default RoleCompany;
