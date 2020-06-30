import React, { useState, useEffect } from 'react';
import { faBuilding, faUserTag, faEdit } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ActionList from './../../Utils/ActionList/ActionList';

import { ERole } from './../../../classes/Role';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';

import { v4 as uuid } from 'uuid';

import './Company.scss';

/**
 * Component: Company
 * Print company details
 */
const Company = ({ company, isPage }) => {
  if(!company) { return null; }
  
  const COMPANY_ID = Object.keys(company)[0];
  const COMPANY_DATA = company[COMPANY_ID];

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  // Computing actions
  const ACTIONS = [
    { title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: `/role-add/${COMPANY_ID}` }
  ];

  // Put edit link if the user has rights to do so
  if(computed.activeRole.role === ERole.MANAGER && computed.activeRole.companyId === COMPANY_ID) {
    ACTIONS.unshift({ title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/company-edit/${COMPANY_ID}` });
  }

  // Don't put the page link if the user is already on page!
  if(!isPage) {
    ACTIONS.unshift({ title: 'View', icon: <Icon source="fa" icon={faBuilding} />, link: `/company/${COMPANY_ID}` });
  }

  return (
    <div className="Company Element-content">
      <div className="Element-base">

        {/* If the company logo is present (nromally it's the case as it's mandatory), print it, otherwise print an icon */}
        {COMPANY_DATA.logoURL ?
          <div className="Element-photo">
            <img
              alt={COMPANY_DATA.name + '\'s logo'} 
              src={COMPANY_DATA.logoURL} />
          </div>
        : <Icon containerclassname="Element-icon" source="fa" icon={faBuilding} /> }
        <div className="Element-data">
          <span className="Element-title">
            {/* Print a pagelink */}
            <PageLink type={PageLinkType.COMPANY} entityId={COMPANY_ID} entityData={COMPANY_DATA} white={isPage} noPhoto />
          </span>
        </div>
        <div className="Element-actions">
          {/* Actions on this company */}
          <ActionList actions={ACTIONS} isFlatten={isPage} />
        </div>
      </div>
    </div>
  );
};

// FSS for companies (used to filter, search and sort companies) => sort on name, and search on name
export const companiesExTableFSS = {
  sort: {
    name: {
      title: 'Name',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].name, items[key2].name)
      )),
      default: true
    }
  },
  search: (_, itemData, searchTerm) => (
    itemData.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
};

export default Company;
