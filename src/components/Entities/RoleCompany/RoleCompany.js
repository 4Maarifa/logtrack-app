import React, { useState, useEffect } from 'react';
import { faBuilding, faUserTag, faEdit } from '@fortawesome/pro-light-svg-icons';

import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ActionList from './../../Utils/ActionList/ActionList';
import Icon from './../../Utils/Icon/Icon';

import Role from './../Role/Role';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';

import { ERole } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './RoleCompany.scss';

/**
 * Component: RoleCompany
 * Details about roles on a Company
 * 
 * You have to pass both the fully loaded company, as well as fully loaded roles list
 */
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

  // Render a Role as its body
  const renderRole = roleId => (
    <Role key={roleId} role={ { [roleId]: roles[roleId] } } />
  );

  // Compute actions
  const ACTIONS = [
    { title: 'View', icon: <Icon source="fa" icon={faBuilding} />, link: `/company/${COMPANY_ID}` }
  ];

  // If current user is a manager of that company, put a link to edit the company
  if(computed.activeRole && computed.activeRole.role === ERole.MANAGER && computed.activeRole.companyId === COMPANY_ID) {
    ACTIONS.push({ title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/company-edit/${COMPANY_ID}` });
  }

  // The user can request a role to that company
  ACTIONS.push({ title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: `/role-add/${COMPANY_ID}` });

  return (
    <div className="RoleCompany Element-content">
      <div className="Element-base">
        <div className="Element-photo">
          {/* Company logo */}
          <img
            alt={COMPANY_DATA.name} 
            src={COMPANY_DATA.logoURL} />
        </div>
        <div className="Element-data">
          {/* Details */}
          <span className="Element-title">
            {/* Company pagelink */}
            <PageLink type={PageLinkType.COMPANY} entityId={COMPANY_ID} entityData={COMPANY_DATA} noPhoto />
          </span>
          <div className="roles">
            {/* For each role, print a Role component */}
            {Object.keys(roles).map(renderRole)}
          </div>
        </div>
        <div className="Element-actions">
          {/* Actions on that RoleCompany (not role) */}
          <ActionList actions={ACTIONS} />
        </div>
      </div>
    </div>
  );
};

// FSS for RoleCompany (used to filter, search and sort RoleCompanies) => sort by company name, search on company name
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
