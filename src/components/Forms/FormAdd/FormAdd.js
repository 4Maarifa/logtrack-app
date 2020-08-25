import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faUser, faRectangleWide, faGripLines, faQuestion } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../services/data.service';
import EmployeeService from './../../../services/entities/employee.service';
import ErrorService from './../../../services/error.service';
import FormService from './../../../services/entities/form.service';

import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import FormTextarea from './../../Utils/FormElements/FormTextarea/FormTextarea';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import { v4 as uuid } from 'uuid';

import './FormAdd.scss';
import Form from '../../../classes/Form';
import DateService from '../../../services/date.service';

/**
 * Component: FormAdd
 * 
 * Form to add or edit custom forms
 */
const FormAdd = ({ match }) => {
  const CURRENT_FORM_ID = match.params.formid;

  // Current form, populated on load for edition
  const [, setCurrentForm] = useState(null);

  // Save new form id here, to redirect user
  const [newFormId, setNewFormId] = useState(null);

  // Data
  const [identification, setIdentification] = useState('');
  const [description, setDescription] = useState('');

  // Creator data
  const [creatorId, setCreatorId] = useState(null);
  const [creator, setCreator] = useState(null);

  // Company owner
  const [companyId, setCompanyId] = useState(null);
  const [company, setCompany] = useState(null);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // Form handler
  const handleSubmit = event => {
    event.preventDefault();

    // On eidtion, just update the form with the new identification and description
    // Then set new form id to redirect the user
    if(CURRENT_FORM_ID) {
      FormService.updateField(CURRENT_FORM_ID, { identification, description })
        .then(() => setNewFormId(CURRENT_FORM_ID))
        .catch(ErrorService.manageError);
    }
    else {

      // Otherwise, compute the new form
      FormService.create(new Form(computed.activeRole.companyId,
                                  identification,
                                  description,
                                  computed.user.uid,
                                  DateService.getCurrentIsoDateString(),
                                  []))
        .then(formDoc => setNewFormId(formDoc.id))
        .catch(ErrorService.manageError);
    }
  };

  useEffect(() => {
    if(computed.initialized && computed.activeRole) {

      // set company owner
      setCompanyId(computed.activeRole.companyId);
      setCompany(computed.activeRoleCompany);

      if(CURRENT_FORM_ID) {
        // if edition, fetch current form
        FormService.get(CURRENT_FORM_ID)
          .then(formDoc => {

            // set form values
            setIdentification(formDoc.data().identification);
            setDescription(formDoc.data().description);
            setCurrentForm(formDoc.data());

            // Get creator
            EmployeeService.get(formDoc.data().creator)
              .then(employeeDoc => {
                setCreatorId(employeeDoc.id);
                setCreator(employeeDoc.data());
              })
              .catch(ErrorService.manageError);

          })
          .catch(ErrorService.manageError);
      }
      else {
        // just set the creator
        setCreatorId(computed.user.uid);
        setCreator(computed.employee);
      }
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(!computed.activeRole) {
    ErrorService.warning('Please activate a role to add a form!');
    return <Redirect to={`/forms`} />;
  }

  /**
   * RENDER
   */

  // If new form id is set (= if form was successfully created / edited), redirect user
  if(newFormId) {
    ErrorService.success(`Form ${CURRENT_FORM_ID ? 'updated' : 'created'}!`);
    return <Redirect to={`/forms`} />;
  }
  return <div className="FormAdd">
    <h1>{CURRENT_FORM_ID ? 'Edit' : 'Add'} a form</h1>

    {/* Form add form */}
    <form onSubmit={handleSubmit}>

      {/* Identification */}
      <FormInput
        value={identification}
        inputType="text"
        fieldName="identification"
        label={
          <span>
            <Icon source="fa" icon={faRectangleWide} />
            Identification
          </span>
        }
        inputRequired
        inputPattern=".{3,}"
        instructions={
          <span>
            The identification is required<br/>
            The identification must be 3 characters minimum<br/>
            It can be the form title, process...
          </span>
        }
        onValueChange={setIdentification} />

      {/* Description */}
      <FormTextarea
        value={description}
        fieldName="description"
        label={
          <span>
            <Icon source="fa" icon={faGripLines} />
            Description
          </span>
        }
        inputRequired
        instructions={
          <span>
            Complete description for your form<br/>
            Indicate here how this form should be considered and fulfilled
          </span>
        }
        onValueChange={setDescription} />

        {/* Questions */}
        <div className="input-container">
          <span className="fake-label">
            <Icon source="fa" icon={faQuestion} />
            Questions
          </span>
          
        </div>

      {/* Company */}
      <div className="input-container">
        <span className="fake-label">
          <Icon source="fa" icon={faBuilding} />
          Company
        </span>
        {/* Company pagelink */}
        <PageLink type={PageLinkType.COMPANY} entityId={companyId} entityData={company} />
      </div>

      {/* Creator */}
      <div className="input-container">
        <span className="fake-label">
          <Icon source="fa" icon={faUser} />
          Creator
        </span>
        {/* Creator pagelink */}
        <PageLink type={PageLinkType.EMPLOYEE} entityId={creatorId} entityData={creator} />
      </div>

      <input type="submit" />
    </form>
  </div>;
};

export default FormAdd;
