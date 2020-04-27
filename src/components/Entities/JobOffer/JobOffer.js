import React, { useState, useEffect } from 'react';
import { faClipboardUser, faEye, faEdit, faCheck } from '@fortawesome/pro-solid-svg-icons';

import DateService from './../../../services/date.service';
import DataService from './../../../services/data.service';
import CompanyService from './../../../services/entities/company.service';

import ActionList from './../../Utils/ActionList/ActionList';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import { ERole, RoleDetails } from '../../../classes/Role';
import { EJobOfferStatus } from './../../../classes/Company';

import { v4 as uuid } from 'uuid';

const JobOffer = ({ jobOffer, isPage }) => {
  if(!jobOffer) { return null; }

  const jobOfferKey = Object.keys(jobOffer)[0];

  const observerKey = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey);
  }, []);

  if(!computed.initialized) { return null; }

  const actions = [];

  if(!isPage) {
    actions.push({ title: 'View', icon: <Icon source="fa" icon={faEye} />, link: `/joboffer/${jobOfferKey}` });
  }

  if(jobOffer[jobOfferKey].companyId === computed.activeRole.companyId &&
      (computed.activeRole.role === ERole.MANAGER || computed.activeRole.role === ERole.RECRUITER) &&
      jobOffer[jobOfferKey].status === EJobOfferStatus.OPENED) {

    actions.push({title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/joboffer-edit/${jobOfferKey}`});
    actions.push({title: 'Close applications', icon: <Icon source="fa" icon={faCheck} />, callback: () => {
      CompanyService.jobOffer.updateField(jobOfferKey, { status: EJobOfferStatus.CLOSED });
    }});
  }

  /**
   * RENDER
   */
  return (
    <div className="JobOffer Element-content" key={jobOfferKey}>
      <div className="Element-base">
        <Icon source="fa" containerclassname="Element-icon" icon={faClipboardUser} />
        <span className={'Element-badge badge ' + (isPage ? 'badge-inverse' : '')}>
          <Icon source="fa" icon={RoleDetails[jobOffer[jobOfferKey].role].icon} />
          {RoleDetails[jobOffer[jobOfferKey].role].name}
        </span>
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.JOBOFFER} entityId={jobOfferKey} entityData={jobOffer[jobOfferKey]} white={isPage} />
          </span>
          <span className="sub">Created on {DateService.getDateString(DateService.getDateFromIsoString(jobOffer[jobOfferKey].creationIsoDate), false)}</span>
        </div>
        <div className="Element-actions">
          <ActionList actions={actions} isFlatten={isPage} />
        </div>
      </div>
    </div>
  );
};

export default JobOffer;
