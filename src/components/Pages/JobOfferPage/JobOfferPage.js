import React, { useState, useEffect } from 'react';

import ErrorService from './../../../services/error.service';
import CompanyService from './../../../services/entities/company.service';

import Loader from './../../Utils/Loader/Loader';

import JobOffer from './../../Entities/JobOffer/JobOffer';
import Company from './../../Entities/Company/Company';

import './JobOfferPage.scss';

/**
 * Component: JobOfferPage
 * Use by everyone to see details about a job offer
 * 
 * You have to pass a job offer id
 */
const JobOfferPage = ({ match }) => {
  const JOB_OFFER_ID = match.params.jobofferid;

  // Corresponding job offer, populated on load
  const [jobOffer, setJobOffer] = useState(null);

  // Jon offer's company
  const [company, setCompany] = useState(null);

  useEffect(() => {

    // Get the job offer
    CompanyService.jobOffer.get(JOB_OFFER_ID)
      .then(jobOfferDoc => {

        // save its data
        setJobOffer(jobOfferDoc.data());

        // get and save corresponding company
        CompanyService.get(jobOfferDoc.data().companyId)
          .then(companyDoc => setCompany({[companyDoc.id]: companyDoc.data()}))
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  }, []);

  if(!jobOffer || !company) {
    return (
      <div className="JobOfferPage">
        <Loader />
      </div>
    );
  }

  return (
    <div className="JobOfferPage">
      <div className="Element Element--page">
        <JobOffer jobOffer={{[JOB_OFFER_ID]: jobOffer}} isPage />
      </div>
      <div className="Element Element--row joboffer-company">
        <Company company={company} />
      </div>
      <div className="JobOfferPage-description">
        <span>
          {jobOffer.description}
        </span>
      </div>
    </div>
  );
};

export default JobOfferPage;
