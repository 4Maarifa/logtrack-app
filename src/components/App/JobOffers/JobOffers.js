import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faClipboardUser, faPlus, faCheck } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../services/data.service';
import CompanyService from './../../../services/entities/company.service';
import ErrorService from './../../../services/error.service';

import ExTable from './../../Utils/ExTable/ExTable';
import Icon from './../../Utils/Icon/Icon';
import ActionButton from './../../Utils/ActionButton/ActionButton';
import Tabs from './../../Utils/Tabs/Tabs';

import JobOffer from './../../Entities/JobOffer/JobOffer';

import { ERole } from './../../../classes/Role';
import { EJobOfferStatus } from './../../../classes/Company';

import { v4 as uuid } from 'uuid';

import './JobOffers.scss';

/**
 * Component: JobOffers
 * Used by managers and recruiters to manage job offers and applicants
 */
const JobOffers = () => {

  const [openedJobOffers, setOpenedJobOffers] = useState(null);
  const [closedApplications, setClosedApplications] = useState(null);
  const [isJobOffersLoading, setJobOffersLoading] = useState(true);

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeJobOffers = () => {
    CompanyService.jobOffer.getAllForCompanyId(computed.activeRole.companyId)
      .then(jobOffers => {
        const newOpenedJobOffers = {};
        const newClosedApplications = {};
        Object.keys(jobOffers).forEach(jobOfferKey => {
          if(jobOffers[jobOfferKey].status === EJobOfferStatus.CLOSED) {
            newClosedApplications[jobOfferKey] = jobOffers[jobOfferKey];
          }
          else {
            newOpenedJobOffers[jobOfferKey] = jobOffers[jobOfferKey];
          }
        });
        setOpenedJobOffers(newOpenedJobOffers);
        setClosedApplications(newClosedApplications);
        setJobOffersLoading(false);
      })
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    if(computed.initialized && computed.activeRole) {
      computeJobOffers();
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(!computed.activeRole || 
    !(computed.activeRole.role === ERole.MANAGER || computed.activeRole.role === ERole.RECRUITER)) {

    return <Redirect to={`/dashboard`} />;
  }

  /**
   * RENDER
   */
  const renderJobOffer = (itemKey, itemData) => <JobOffer key={itemKey} jobOffer={ {[itemKey]: itemData} } />;

  return <div className="JobOffers">
    <Tabs default="opened" tabs={{
      opened: {
        name: () => <span>
          <Icon source="fa" icon={faClipboardUser} />
          Opened positions
        </span>,
        content: () => <ExTable key="opened" 
          items={openedJobOffers}
          renderItem={renderJobOffer}
          header={['Title']}
          loading={isJobOffersLoading} />
      },
      closed: {
        name: () => <span>
          <Icon source="fa" icon={faCheck} />
          Closed applications
        </span>,
        content: () => <ExTable key="closed" 
          items={closedApplications}
          renderItem={renderJobOffer}
          header={['Title']}
          loading={isJobOffersLoading} />
      }
    }} />
    <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
      {title: 'Add a job offer', icon: <Icon source="fa" icon={faClipboardUser} />, link: `/joboffer-add`}
    ]} />
  </div>;
};

export default JobOffers;
