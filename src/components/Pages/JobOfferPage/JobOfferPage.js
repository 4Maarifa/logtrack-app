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
 */
const JobOfferPage = ({ match }) => {
  const jobOfferId = match.params.jobofferid;

  const [jobOffer, setJobOffer] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    CompanyService.jobOffer.get(jobOfferId)
      .then(jobOfferDoc => {
        setJobOffer(jobOfferDoc.data());

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
        <JobOffer jobOffer={{[jobOfferId]: jobOffer}} isPage />
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
