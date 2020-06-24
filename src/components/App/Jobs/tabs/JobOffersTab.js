import React, { useEffect, useState } from 'react';
import { faSuitcase } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../../Utils/Icon/Icon';
import ExTable from './../../../Utils/ExTable/ExTable';

import JobOffer, { jobsExTableFSS } from './../../../Entities/JobOffer/JobOffer';

import CompanyService from './../../../../services/entities/company.service';
import ErrorService from './../../../../services/error.service';


const JobOffersTab = ({ companyId }) => {

  const [jobOffers, setJobOffers] = useState([]);
  const [isJobOffersLoading, setJobOffersLoading] = useState(true);

  useEffect(() => {
    if(companyId) {
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
  }, []);
  

  /**
   * RENDER
   */
  const renderJobOffer = (itemId, itemData) => <JobOffer key={itemId} jobOffer={ {[itemId]: itemData} } />;

  return <ExTable key="jobs"
    fss={jobsExTableFSS}
    header={<span><Icon source="fa" icon={faSuitcase} /> Job Offers</span>}
    items={jobOffers}
    renderItem={renderJobOffer}
    loading={isJobOffersLoading} />;
};

export default JobOffersTab;
