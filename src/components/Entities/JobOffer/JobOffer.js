import React, { useState, useEffect } from 'react';
import { faClipboardUser, faEye, faEdit, faCheck } from '@fortawesome/pro-light-svg-icons';

import DateService from './../../../services/date.service';
import DataService from './../../../services/data.service';
import CompanyService from './../../../services/entities/company.service';
import UtilsService from './../../../services/utils.service';

import ActionList from './../../Utils/ActionList/ActionList';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import { ERole, ERoleDetails } from './../../../classes/Role';
import { EJobOfferStatus } from './../../../classes/Company';

import { v4 as uuid } from 'uuid';

/**
 * Component: JobOffer
 * Print job offer details
 */
const JobOffer = ({ jobOffer, isPage }) => {
  if(!jobOffer) { return null; }

  // Parse data
  const JOB_OFFER_ID = Object.keys(jobOffer)[0],
    JOB_OFFER_DATA = jobOffer[JOB_OFFER_ID];

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  // Compute actions
  const ACTIONS = [];

  if(!isPage) {
    ACTIONS.push({ title: 'View', icon: <Icon source="fa" icon={faEye} />, link: `/joboffer/${JOB_OFFER_ID}` });
  }

  // If user has right to edit this, then provide related actions
  if(computed.activeRole &&
      JOB_OFFER_DATA.companyId === computed.activeRole.companyId &&
      (computed.activeRole.role === ERole.MANAGER || computed.activeRole.role === ERole.RECRUITER) &&
      JOB_OFFER_DATA.status === EJobOfferStatus.OPENED) {

    ACTIONS.push({title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/joboffer-edit/${JOB_OFFER_ID}`});
    ACTIONS.push({title: 'Close applications', icon: <Icon source="fa" icon={faCheck} />, callback: () => {
      CompanyService.jobOffer.updateField(JOB_OFFER_ID, { status: EJobOfferStatus.CLOSED });
    }});
  }

  /**
   * RENDER
   */
  return (
    <div className="JobOffer Element-content" key={JOB_OFFER_ID}>
      <div className="Element-base">
        <Icon source="fa" containerclassname="Element-icon" icon={faClipboardUser} />

        {/* Render role related badge */}
        <span className={'Element-badge badge ' + (isPage ? 'badge-inverse' : '')}>
          <Icon source="fa" icon={ERoleDetails[JOB_OFFER_DATA.role].icon} />
          {ERoleDetails[JOB_OFFER_DATA.role].name}
        </span>

        {/* Job offer details */}
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.JOBOFFER} entityId={JOB_OFFER_ID} entityData={JOB_OFFER_DATA} white={isPage} />
          </span>
          <span className="sub">Created {DateService.getDateString(DateService.getDateFromIsoString(JOB_OFFER_DATA.creationIsoDate), false, false, 'on')}</span>
        </div>

        {/* Job offer actions */}
        <div className="Element-actions">
          <ActionList actions={ACTIONS} isFlatten={isPage} />
        </div>
      </div>
    </div>
  );
};

// FSS for job offers (used to filter, search and sort job offers) => sort by date, title and role, search on title and role, filter by role
const jobsExTableFSS = {
  sort: {
    date: {
      title: 'Date',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].creationIsoDate, items[key2].creationIsoDate)
      )),
      default: true
    },
    title: {
      title: 'Title',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].title, items[key2].title)
      ))
    },
    role: {
      title: 'Role',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].role, items[key2].role)
      ))
    }
  },
  search: (_, itemData, searchTerm) => (
    itemData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    itemData.role.toLowerCase().includes(searchTerm.toLowerCase())
  ),
  filter: {}
};

// Add to filter part the dynamic roles from ERoleDetails
Object.keys(ERoleDetails).forEach(roleId => {
  jobsExTableFSS.filter[roleId] = {
    title: 'Role - ' + ERoleDetails[roleId].name,
    apply: (_, itemData) => itemData.role === roleId
  }
});

export { jobsExTableFSS };

export default JobOffer;
