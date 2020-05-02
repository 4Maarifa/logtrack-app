import React, { useEffect, useState } from 'react';
import { faSuitcase, faPortrait } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import Tabs from './../../Utils/Tabs/Tabs';
import ExTable from './../../Utils/ExTable/ExTable';

import JobOffer, { jobsExTableFSS } from './../../Entities/JobOffer/JobOffer';
import Company from './../../Entities/Company/Company';

import CompanyService from './../../../services/entities/company.service';
import ErrorService from './../../../services/error.service';

import ProfessionalProfile from './ProfessionalProfile';

import './Jobs.scss';

const Jobs = ({ match }) => {
  const companyId = match.params.companyid;

  const [company, setCompany] = useState(null);

  const [jobOffers, setJobOffers] = useState([]);
  const [isJobOffersLoading, setJobOffersLoading] = useState(true);

  const computeValues = () => {
    if(companyId) {
      CompanyService.get(companyId)
        .then(companyDoc => setCompany({[companyDoc.id]: companyDoc.data()}))
        .catch(ErrorService.manageError);

      CompanyService.jobOffer.getOpenedForCompanyId(companyId)
        .then(openedJobOffers => {
          setJobOffers(openedJobOffers);
          setJobOffersLoading(false);
        })
        .catch(ErrorService.manageError);
    }
    else {
      CompanyService.jobOffer.getAllOpenedPositions()
        .then(openedJobOffers => {
          setJobOffers(openedJobOffers);
          setJobOffersLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  };

  useEffect(() => {
    computeValues();
  }, []);

  /**
   * RENDER
   */
  const renderJobOffer = (itemKey, itemData) => <JobOffer key={itemKey} jobOffer={ {[itemKey]: itemData} } />;

  return (
    <div className="Jobs">
      {company ? 
        <div className="Element Element--row joboffer-company">
          <Company company={company} />
        </div>
      : null}
      <Tabs default="offers" tabs={{
        offers: {
          name: () => <span>
            <Icon source="fa" icon={faSuitcase} />
            Offers
          </span>,
          content: () => <ExTable key="jobs"
                                  fss={jobsExTableFSS}
                                  header={<span><Icon source="fa" icon={faSuitcase} /> Job Offers</span>}
                                  items={jobOffers}
                                  renderItem={renderJobOffer}
                                  loading={isJobOffersLoading} />,
        },
        profile: {
          name: () => <span>
            <Icon source="fa" icon={faPortrait} />
            Professional Profile
          </span>,
          content: () => <ProfessionalProfile />
        }
      }} />
    </div>
  );
};

export default Jobs;
