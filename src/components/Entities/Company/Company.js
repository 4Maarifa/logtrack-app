import React from 'react';
import { faBuilding } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import './Company.scss';

const Company = ({ company }) => {
  if(!company) { return null; }
  
  const companyKey = Object.keys(company)[0];

  return (
    <div className="Company Element-content">
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faBuilding} />
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.COMPANY} entityId={companyKey} entityData={company[companyKey]} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Company;
