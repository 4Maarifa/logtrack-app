import React, { useEffect, useState } from 'react';
import { faSuitcase } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../../Utils/Icon/Icon';
import ExTable from './../../../Utils/ExTable/ExTable';

import JobOffer, { jobsExTableFSS } from './../../../Entities/JobOffer/JobOffer';

import CompanyService from './../../../../services/entities/company.service';
import ErrorService from './../../../../services/error.service';

/**
 * Component: JobOffersTab
 * Tab of the Jobs component, used to view opened positions
 */
const JobOffersTab = ({ companyId }) => {

  // Current opened job offers
  const [jobOffers, setJobOffers] = useState([]);
  const [isJobOffersLoading, setJobOffersLoading] = useState(true);

  useEffect(() => {
    if(companyId) {
      // If a companyId is passed, we load only the related job offers
      CompanyService.jobOffer.getOpenedForCompanyId(companyId)
        .then(openedJobOffers => {
          setJobOffers(openedJobOffers);

          // triggering end of load
          setJobOffersLoading(false);
        })
        .catch(ErrorService.manageError);
    }
    else {
      // Else we load all opened positions from everyone
      CompanyService.jobOffer.getAllOpenedPositions()
        .then(openedJobOffers => {
          setJobOffers(openedJobOffers);

          // triggering end of load
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
