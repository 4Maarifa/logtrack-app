import React, { useState, useEffect } from 'react';
import { faBuilding, faUserTag, faEdit } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ActionList from './../../Utils/ActionList/ActionList';

import { ERole } from './../../../classes/Role';

import DataService from './../../../services/data.service';

import { v4 as uuid } from 'uuid';

import './Company.scss';

const Company = ({ company, isPage }) => {
  if(!company) { return null; }
  
  const companyKey = Object.keys(company)[0];

  const observerKey = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey);
  }, []);

  if(!computed.initialized) { return null; }

  const actions = [
    { title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: `/role-add/${companyKey}` }
  ];

  if(computed.activeRole.role === ERole.MANAGER && computed.activeRole.companyId === companyKey) {
    actions.unshift({ title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/company-edit/${companyKey}` });
  }

  if(!isPage) {
    actions.unshift({ title: 'View', icon: <Icon source="fa" icon={faBuilding} />, link: `/company/${companyKey}` });
  }

  return (
    <div className="Company Element-content">
      <div className="Element-base">
        {company[companyKey] && company[companyKey].logoURL ?
          <div className="Element-photo">
            <img
              alt={company[companyKey].name + '\'s logo'} 
              src={company[companyKey].logoURL} />
          </div>
        : <Icon containerclassname="Element-icon" source="fa" icon={faBuilding} /> }
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.COMPANY} entityId={companyKey} entityData={company[companyKey]} white={isPage} noPhoto />
          </span>
        </div>
        <div className="Element-actions">
          <ActionList actions={actions} isFlatten={isPage} />
        </div>
      </div>
    </div>
  );
};

export default Company;
