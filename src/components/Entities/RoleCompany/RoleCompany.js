import React from 'react';

import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

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
      </div>
    </div>
  );
};

export default RoleCompany;
