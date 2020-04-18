import React from 'react';
import { faUserTag } from '@fortawesome/pro-solid-svg-icons';

import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import Icon from './../../Utils/Icon/Icon';

import Role from './../Role/Role';

import './RoleCompany.scss';

const RoleCompany = ({ company, roles, options }) => {
  if(!company || !Object.keys(roles).length) { return null; }

  const companyId = Object.keys(company)[0];

  const renderRole = roleKey => (
    <Role key={roleKey} role={ { [roleKey]: roles[roleKey] } } options={options}></Role>
  );

  return (
    <div className="RoleCompany Element-content">
      <div className="Element-base">
        <Icon source="fa" icon={faUserTag} containerclassname="Element-icon" />
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.COMPANY} entityId={companyId} entityData={company[companyId]} />
          </span>
          <div className="roles">
            {Object.keys(roles).map(renderRole)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleCompany;
