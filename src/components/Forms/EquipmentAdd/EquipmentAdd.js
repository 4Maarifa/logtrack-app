import React, { Fragment, useState, useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { faRectangleWide, faEdit, faTruck, faUser, faBuilding } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import Choose from './../../Utils/Choose/Choose';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';
import EquipmentService from './../../../services/entities/equipment.service';

import Equipment from './../../../classes/Equipment';
import { EEquipmentModelTypeDetails, EEquipmentModelSubTypeDetails } from './../../../classes/EquipmentModel';

import { v4 as uuid } from 'uuid';

import './EquipmentAdd.scss';

const EquipmentAdd = () => {

  const [equipmentId, setEquipmentId] = useState(null);

  const [identification, setIdentification] = useState('');
  const [selectedEquipmentType, setSelectedEquipmentType] = useState(null);
  const [selectedEquipmentSubType, setSelectedEquipmentSubType] = useState(null);
  const [selectedEquipmentModelId, setSelectedEquipmentModelId] = useState(null);

  const [equipmentModels, setEquipmentModels] = useState({});

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeModels = () => {
    EquipmentModelService.list()
      .then(setEquipmentModels)
      .catch(ErrorService.manageError);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if(!selectedEquipmentModelId) {
      ErrorService.error('Please pick a model or create one!');
      return;
    }
    
    EquipmentService.create(new Equipment(computed.activeRole.companyId, identification, selectedEquipmentModelId, DateService.getCurrentIsoDateString()))
      .then(equipmentDoc => setEquipmentId(equipmentDoc.id))
      .catch(ErrorService.manageError);
  };

  const handleSelection = (value, fieldName) => {
    if(fieldName === 'selectedEquipmentType') {
      if(!value) {
        setSelectedEquipmentSubType(null);
        setSelectedEquipmentModelId(null);
      }
      setSelectedEquipmentType(value);
    }
    else if(fieldName === 'selectedEquipmentSubType') {
      if(!value) {
        setSelectedEquipmentModelId(null);
      }
      setSelectedEquipmentSubType(value);
    }
    else if(fieldName === 'selectedEquipmentModelId') {
      setSelectedEquipmentModelId(value);
    }
  };

  const filterEquipmentModels = (type, subType = null) => {
    let newEquipmentModels = {};
    if(!subType) {
      Object.keys(equipmentModels)
        .filter(key => equipmentModels[key].type === type)
        .forEach(key => newEquipmentModels[key] = equipmentModels[key]);
    }
    else {
      Object.keys(equipmentModels)
        .filter(key => equipmentModels[key].type === type)
        .filter(key => equipmentModels[key].subType === subType)
        .forEach(key => newEquipmentModels[key] = equipmentModels[key]);
    }
    return newEquipmentModels;
  };

  useEffect(() => computeModels(), [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(!computed.activeRole) {
    ErrorService.warning('Please activate a role to add an equipment!');
    return <Redirect to={`/equipments`} />;
  }

  const renderModels = () => {
    if(!equipmentModels || !Object.keys(equipmentModels).length) {
      return null;
    }
    let equipmentTypes = {}, equipmentSubTypes = {}, newEquipmentModels = {};

    Object.keys(EEquipmentModelTypeDetails).forEach(key => {
      equipmentTypes[key] = {
        content: <Fragment>
          {EEquipmentModelTypeDetails[key].icon}
          {EEquipmentModelTypeDetails[key].name}
        </Fragment>,
        disabled: !Object.keys(filterEquipmentModels(key)).length
      };
    });

    if(selectedEquipmentType) {
      Object.keys(EEquipmentModelSubTypeDetails[selectedEquipmentType]).forEach(key => {
        equipmentSubTypes[key] = {
          content: <Fragment>
            {EEquipmentModelSubTypeDetails[selectedEquipmentType][key].icon}
            {EEquipmentModelSubTypeDetails[selectedEquipmentType][key].name}
          </Fragment>,
          disabled: !Object.keys(filterEquipmentModels(selectedEquipmentType, key)).length
        };
      });
    }

    if(selectedEquipmentType && selectedEquipmentSubType) {
      Object.keys(filterEquipmentModels(selectedEquipmentType, selectedEquipmentSubType)).forEach(key => {
        newEquipmentModels[key] = {
          content: <Fragment>
            <img src={equipmentModels[key].photoUrl}
              alt={equipmentModels[key].name + '\'s photo'} />
            {equipmentModels[key].name}
          </Fragment>
        }
      });
    }

    return <div className="model-selection">
      <div className="model-result">
        <h3>Equipment Type</h3>
        {selectedEquipmentType &&
          <Fragment>
            {EEquipmentModelTypeDetails[selectedEquipmentType].icon}
            {EEquipmentModelTypeDetails[selectedEquipmentType].name}
            <span className="action" onClick={() => handleSelection(null, 'selectedEquipmentType')}>
              <Icon source="fa" icon={faEdit} />
            </span>
          </Fragment>
        }
      </div>
      
      {!selectedEquipmentType && 
        <Choose items={equipmentTypes} 
          fieldName="selectedEquipmentType"
          onSelectionChange={handleSelection} />
      }
      
      {selectedEquipmentType &&
        <Fragment>
          <div className="model-result">
            <h3>Equipment Sub-type</h3>
            {selectedEquipmentSubType &&
              <Fragment>
                {EEquipmentModelSubTypeDetails[selectedEquipmentType][selectedEquipmentSubType].icon}
                {EEquipmentModelSubTypeDetails[selectedEquipmentType][selectedEquipmentSubType].name}
                <span className="action" onClick={() => handleSelection(null, 'selectedEquipmentSubType')}>
                  <Icon source="fa" icon={faEdit} />
                </span>
              </Fragment>
            }
          </div>
          {!selectedEquipmentSubType &&
            <Choose items={equipmentSubTypes} 
              multiple={false} 
              fieldName="selectedEquipmentSubType"
              onSelectionChange={handleSelection} />
          }
        </Fragment>
      }

      {selectedEquipmentType && selectedEquipmentSubType &&
        <Fragment>
          <div className="model-result">
            <h3>Equipment Model</h3>
            {selectedEquipmentModelId &&
              <Fragment>
                <img src={equipmentModels[selectedEquipmentModelId].photoUrl}
                  alt={equipmentModels[selectedEquipmentModelId].name + '\'s photo'} />
                {equipmentModels[selectedEquipmentModelId].name}
                <span className="action" onClick={() => handleSelection(null, 'selectedEquipmentModelId')}>
                  <Icon source="fa" icon={faEdit} />
                </span>
              </Fragment>
            }
          </div>
          {!selectedEquipmentModelId &&
            <Choose items={newEquipmentModels}
              multiple={false}
              fieldName="selectedEquipmentModelId"
              onSelectionChange={handleSelection} />
          }
        </Fragment>
      }

      <NavLink className="equipment-model-add-link" to={`/equipment-model-add`}>Can't find what you're looking for? Add yours now!</NavLink>

      <span className="fake-label">
        <Icon source="fa" icon={faTruck} />
        Model
      </span>
    </div>;
  }

  if(!computed.employee || !computed.activeRoleCompany) {
    return null;
  }
  if(equipmentId) {
    ErrorService.success('Equipment created!');
    return <Redirect to={`/dashboard`} />;
  }

  return (
    <div className="EquipmentAdd">
      <h1>Add an equipment</h1>
      <form onSubmit={handleSubmit}>
        {/* Model */}
        {renderModels()}

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
              It can be the number plate, serial number...
            </span>
          }
          onValueChange={setIdentification} />

        {/* Company */}
        <div className="input-company">
          <span className="fake-label">
            <Icon source="fa" icon={faBuilding} />
            Company
          </span>
          <span>
            {computed.activeRoleCompany.name}
          </span>
        </div>

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
}

export default EquipmentAdd;
