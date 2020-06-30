import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faUser } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';

import EquipmentModel from './../../../classes/EquipmentModel';

import { v4 as uuid } from 'uuid';

import './EquipmentModelAdd.scss';

/**
 * Component: EquipmentModelAdd
 * Standalone form to add a new equipmnent model
 * 
    // TODO / To be deleted
 * 
 */
const EquipmentModelAdd = () => {

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(!computed.activeRole) {
    ErrorService.warning('Please activate a role to add an equipment!');
    return <Redirect to={`/dashboard`} />;
  }

  const handleSubmit = event => {
    event.preventDefault();

    // TODO / To be deleted
    EquipmentModelService.create(new EquipmentModel());
  };

  if(!computed.employee) { return null; }

  return (
    <div className="EquipmentModelAdd">
      <h1>Add an Equipment Model</h1>
      <form onSubmit={handleSubmit}>

        

        {/* Creator */}
        <div className="input-container">
          <span className="fake-label">
            <Icon source="fa" icon={faUser} />
            Creator
          </span>
          <span>
            {computed.employee.firstname + ' ' + computed.employee.lastname}
          </span>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default EquipmentModelAdd;
