import React, { useState, useEffect } from 'react';
import { faBuilding, faUserTag, faEdit } from '@fortawesome/pro-solid-svg-icons';

import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ActionList from './../../Utils/ActionList/ActionList';
import Icon from './../../Utils/Icon/Icon';

import Role from './../Role/Role';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';

import { ERole } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './RoleCompany.scss';

const RoleCompany = ({ company, roles }) => {
  if(!company || !Object.keys(roles).length) { return null; }

  const COMPANY_ID = Object.keys(company)[0],
    COMPANY_DATA = company[COMPANY_ID];

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
  const renderRole = roleId => (
    <Role key={roleId} role={ { [roleId]: roles[roleId] } } />
  );

  const ACTIONS = [
    { title: 'View', icon: <Icon source="fa" icon={faBuilding} />, link: `/company/${COMPANY_ID}` }
  ];

  if(computed.activeRole && computed.activeRole.role === ERole.MANAGER && computed.activeRole.companyId === COMPANY_ID) {
    ACTIONS.push({ title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/company-edit/${COMPANY_ID}` });
  }

  ACTIONS.push({ title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: `/role-add/${COMPANY_ID}` });

  return (
    <div className="RoleCompany Element-content">
      <div className="Element-base">
        <div className="Element-photo">
          <img
            alt={COMPANY_DATA.name} 
            src={COMPANY_DATA.logoURL} />
        </div>
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.COMPANY} entityId={COMPANY_ID} entityData={COMPANY_DATA} noPhoto />
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

export const roleCompanyExTableFSS = {
  sort: {
    name: {
      title: 'Company',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].name, items[key2].name)
      )),
      default: true
    }
  },
  search: (_, itemData, searchTerm) => (
    itemData.nane.toLowerCase().includes(searchTerm.toLowerCase())
  )
};

export default RoleCompany;
