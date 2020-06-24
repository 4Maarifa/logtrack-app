import React, { useEffect, useState } from 'react';
import { faSuitcase, faPortrait } from '@fortawesome/pro-light-svg-icons';
import { faSuitcase as faSuitcaseSolid, faPortrait as faPortraitSolid } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import Tabs from './../../Utils/Tabs/Tabs';

import Company from './../../Entities/Company/Company';

import CompanyService from './../../../services/entities/company.service';
import ErrorService from './../../../services/error.service';

import ProfessionalProfileTab from './tabs/ProfessionalProfileTab';
import JobOffersTab from './tabs/JobOffersTab';

import './Jobs.scss';

const Jobs = ({ match }) => {
  const COMPANY_ID = match.params.companyid;

  const [company, setCompany] = useState(null);

  useEffect(() => {
    if(COMPANY_ID) {
      CompanyService.get(COMPANY_ID)
        .then(companyDoc => setCompany({[companyDoc.id]: companyDoc.data()}))
        .catch(ErrorService.manageError);
    }
  }, []);

  /**
   * RENDER
   */

  return (
    <div className="Jobs">
      {company ? 
        <div className="Element Element--row joboffer-company">
          <Company company={company} />
        </div>
      : null}
      <Tabs default="offers" tabs={{
        offers: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faSuitcaseSolid : faSuitcase} />
            Offers
          </span>,
          content: () => <JobOffersTab companyId={COMPANY_ID} />,
        },
        profile: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faPortraitSolid : faPortrait} />
            Professional Profile
          </span>,
          content: () => <ProfessionalProfileTab />
        }
      }} />
    </div>
  );
};

export default Jobs;
