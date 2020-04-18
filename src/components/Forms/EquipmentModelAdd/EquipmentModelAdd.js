import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faUser } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';

import EquipmentModel from './../../../classes/EquipmentModel';

import { v4 as uuid } from 'uuid';

import './EquipmentModelAdd.scss';

const EquipmentModelAdd = () => {

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(!computed.activeRole) {
    ErrorService.warning('Please activate a role to add an equipment!');
    return <Redirect to={`/dashboard`} />;
  }

  const handleSubmit = event => {
    event.preventDefault();

    EquipmentModelService.create(new EquipmentModel());
  };

  if(!computed.employee) { return null; }

  return (
    <div className="EquipmentModelAdd">
      <h1>Add an Equipment Model</h1>
      <form onSubmit={handleSubmit}>

        

        {/* Creator */}
        <div className="input-creator">
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
