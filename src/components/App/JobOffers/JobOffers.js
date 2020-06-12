import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faClipboardUser, faPlus, faCheck, faPortrait } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../services/data.service';
import CompanyService from './../../../services/entities/company.service';
import ErrorService from './../../../services/error.service';

import ExTable from './../../Utils/ExTable/ExTable';
import Icon from './../../Utils/Icon/Icon';
import ActionButton from './../../Utils/ActionButton/ActionButton';
import Tabs from './../../Utils/Tabs/Tabs';

import JobOffer, { jobsExTableFSS } from './../../Entities/JobOffer/JobOffer';

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

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    if(computed.activeRole) {
      CompanyService.jobOffer.getAllForCompanyId(computed.activeRole.companyId)
        .then(jobOffers => {
          const NEW_OPENED_JOB_OFFERS = {};
          const NEW_CLOSED_JOB_OFFERS = {};
          Object.keys(jobOffers).forEach(jobOfferId => {
            if(jobOffers[jobOfferId].status === EJobOfferStatus.CLOSED) {
              NEW_CLOSED_JOB_OFFERS[jobOfferId] = jobOffers[jobOfferId];
            }
            else {
              NEW_OPENED_JOB_OFFERS[jobOfferId] = jobOffers[jobOfferId];
            }
          });
          setOpenedJobOffers(NEW_OPENED_JOB_OFFERS);
          setClosedApplications(NEW_CLOSED_JOB_OFFERS);
          setJobOffersLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  }, [computed.activeRole]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(!computed.activeRole || 
    !(computed.activeRole.role === ERole.MANAGER || computed.activeRole.role === ERole.RECRUITER)) {

    return <Redirect to={`/dashboard`} />;
  }

  /**
   * RENDER
   */
  return <div className="JobOffers">
    <Tabs default="opened" tabs={{
      opened: {
        name: () => <span>
          <Icon source="fa" icon={faClipboardUser} />
          Opened positions
        </span>,
        content: () => <ExTable key="opened"
                                fss={jobsExTableFSS}
                                items={openedJobOffers}
                                renderItem={(itemId, itemData) => <JobOffer key={itemId} jobOffer={ {[itemId]: itemData} } />}
                                header={<span><Icon source="fa" icon={faPortrait} /> Opened Positions</span>}
                                loading={isJobOffersLoading} />
      },
      closed: {
        name: () => <span>
          <Icon source="fa" icon={faCheck} />
          Closed applications
        </span>,
        content: () => <ExTable key="closed" 
                                fss={jobsExTableFSS}
                                items={closedApplications}
                                renderItem={(itemId, itemData) => <JobOffer key={itemId} jobOffer={ {[itemId]: itemData} } />}
                                header={<span><Icon source="fa" icon={faCheck} /> Closed Applications</span>}
                                loading={isJobOffersLoading} />
      }
    }} />
    <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
      {title: 'Add a job offer', icon: <Icon source="fa" icon={faClipboardUser} />, link: `/joboffer-add`}
    ]} />
  </div>;
};

export default JobOffers;
