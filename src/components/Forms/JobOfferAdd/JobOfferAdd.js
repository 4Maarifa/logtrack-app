import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { faClipboardUser, faBars, faTag, faUser, faBuilding } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import CompanyService from './../../../services/entities/company.service';
import EmployeeService from './../../../services/entities/employee.service';
import DateService from './../../../services/date.service';

import Icon from './../../Utils/Icon/Icon';
import Choose from './../../Utils/FormElements/Choose/Choose';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import FormTextarea from './../../Utils/FormElements/FormTextarea/FormTextarea';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import { JobOffer, EJobOfferStatus } from './../../../classes/Company';
import { ERoleDetails } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './JobOfferAdd.scss';

const JobOfferAdd = ({ match }) => {
  const CURRENT_JOB_OFFER_ID = match.params.jobofferid;

  const [currentJobOffer, setCurrentJobOffer] = useState(null);

  const [newJobOfferId, setNewJobOfferId] = useState(null);

  const OBSERVER_KEY = uuid();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [roleType, setRoleType] = useState('');

  const [creatorId, setCreatorId] = useState(null);
  const [creator, setCreator] = useState(null);

  const [companyId, setCompanyId] = useState(null);
  const [company, setCompany] = useState(null);
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const handleSubmit = event => {
    event.preventDefault();

    if(!roleType) {
      ErrorService.warning('You have to select one role');
      return;
    }

    if(CURRENT_JOB_OFFER_ID) {
      CompanyService.jobOffer.updateField(CURRENT_JOB_OFFER_ID, {
        title,
        description
      }).then(() => {
          setNewJobOfferId(CURRENT_JOB_OFFER_ID);
        })
        .catch(ErrorService.manageError);
    }
    else {
      CompanyService.jobOffer.create(
        new JobOffer(title, description, roleType, computed.activeRole.companyId, computed.user.uid, DateService.getCurrentIsoDateString(), EJobOfferStatus.OPENED))
        .then(docRef => {
          setNewJobOfferId(docRef.id);
        })
        .catch(ErrorService.manageError);
    } 
  };

  useEffect(() => {
    if(computed.initialized && computed.activeRole) {
      if(CURRENT_JOB_OFFER_ID) {
        CompanyService.jobOffer.get(CURRENT_JOB_OFFER_ID)
          .then(jobOfferDoc => {
            setTitle(jobOfferDoc.data().title);
            setDescription(jobOfferDoc.data().description);
            setRoleType(jobOfferDoc.data().role);
            setCurrentJobOffer(jobOfferDoc.data());
  
            CompanyService.get(jobOfferDoc.data().companyId)
              .then(companyDoc => {
                setCompanyId(companyDoc.id);
                setCompany(companyDoc.data());
              })
              .catch(ErrorService.manageError);
  
            EmployeeService.get(jobOfferDoc.data().creator)
              .then(employeeDoc => {
                setCreatorId(employeeDoc.id);
                setCreator(employeeDoc.data());
              })
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
      }
      else {
        setCreatorId(computed.user.uid);
        setCreator(computed.employee);
        setCompanyId(computed.activeRole.companyId);
        setCompany(computed.activeRoleCompany);
      }
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(currentJobOffer && currentJobOffer.status === EJobOfferStatus.CLOSED) {
    ErrorService.error('You can\'t edit closed applications');
    return <Redirect to={`/joboffers`} />;
  }

  /**
   * RENDER
   */
  if(newJobOfferId) {
    return <Redirect to={`/joboffers`} />;
  }

  const ROLE_DETAILS = {};
  Object.keys(ERoleDetails).forEach(roleId => {
    ROLE_DETAILS[roleId] = {
      content: <Fragment>
        <Icon source="fa" icon={ERoleDetails[roleId].icon} />
        {ERoleDetails[roleId].name}
      </Fragment>
    }
  });

  return (
    <div className="JobOfferAdd">
      <h1>{CURRENT_JOB_OFFER_ID ? 'Edit' : 'Add'} a Job Offer</h1>
      <form onSubmit={handleSubmit}>

        {/* Title field */}
        <FormInput
          value={title}
          inputType="text"
          fieldName="title"
          label={
            <span>
              <Icon source="fa" icon={faClipboardUser} />
              Title
            </span>
          }
          inputRequired
          inputPattern=".{3,}"
          instructions={
            <span>
              The title is required<br/>
              The title must be 3 characters minimum
            </span>
          }
          onValueChange={setTitle} />

        {/* Description field */}
        <FormTextarea
          value={description}
          fieldName="description"
          label={
            <span>
              <Icon source="fa" icon={faBars} />
              Description
            </span>
          }
          inputRequired
          instructions={
            <span>
              The description is required
            </span>
          }
          onValueChange={setDescription} />

        {/* Role Field */}
        <div className="role-selection">
          <span className="fake-label">
            <Icon source="fa" icon={faTag} />
            Role to request
          </span>
          {CURRENT_JOB_OFFER_ID && currentJobOffer ? 
            <span>
              <Icon source="fa" icon={ERoleDetails[roleType].icon} />
              {ERoleDetails[roleType].name}
            </span>
          : <Choose
              selection={roleType}
              items={ROLE_DETAILS}
              fieldName="roleType"
              onSelectionChange={setRoleType} /> }
        </div>

        {/* Company */}
        <div className="input-container">
          <span className="fake-label">
            <Icon source="fa" icon={faBuilding} />
            Company
          </span>
          <PageLink type={PageLinkType.COMPANY} entityId={companyId} entityData={company} />
        </div>

        {/* Creator */}
        <div className="input-container">
          <span className="fake-label">
            <Icon source="fa" icon={faUser} />
            Creator
          </span>
          <PageLink type={PageLinkType.EMPLOYEE} entityId={creatorId} entityData={creator} />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default JobOfferAdd;
