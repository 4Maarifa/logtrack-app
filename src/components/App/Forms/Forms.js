import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faClipboardCheck, faPlus } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import FormService from './../../../services/entities/form.service';

import Form, { formsExTableFSS } from './../../Entities/Form/Form';

import ActionButton from './../../Utils/ActionButton/ActionButton';
import ExTable from './../../Utils/ExTable/ExTable';
import Icon from './../../Utils/Icon/Icon';

import { v4 as uuid } from 'uuid';

import './Forms.scss';

const Forms = () => {
  const [forms, setForms] = useState({});
  const [isFormsLoading, setFormsLoading] = useState(true);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    if(computed.initialized) {
      FormService.getAllForCompanyId(computed.activeRole.companyId)
        .then(forms => {
          setForms(forms);
          setFormsLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  }, [computed.activeRole]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  /**
   * RENDER
   */
  if(!computed.initialized) { return null; }
  if(!computed.activeRole) {
    // If there's no role, redirect to dashboard
    ErrorService.manageError('Activate a role to access forms!');
    return <Redirect to={`/dashboard`} />;
  }

  const renderForm = (itemId, itemData) => {
    return <Form form={{[itemId]: itemData}} />
  };

  return <div className="Forms">
    <ExTable key="FORMS"
            fss={formsExTableFSS}
            items={forms}
            renderItem={renderForm}
            header={<span><Icon source="fa" icon={faClipboardCheck} /> Forms</span>}
            loading={isFormsLoading} />
    <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
      {title: 'Add a form', icon: <Icon source="fa" icon={faClipboardCheck} />, link: `/form-add`}
    ]} />
  </div>;
}

export default Forms;
