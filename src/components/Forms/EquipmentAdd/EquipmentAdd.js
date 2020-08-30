import React, { Fragment, useState, useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { faRectangleWide, faEdit, faTruck, faUser, faBuilding } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import Choose from './../../Utils/FormElements/Choose/Choose';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import EquipmentService from './../../../services/entities/equipment.service';
import EmployeeService from './../../../services/entities/employee.service';

import { EquipmentModelImage } from './../../Entities/Equipment/Equipment';

import Equipment from './../../../classes/Equipment';
import EEquipmentModel, { EEquipmentModelTypeDetails, EEquipmentModelSubTypeDetails, 
  EEquipmentModelDetails } from './../../../classes/enums/EEquipmentModel';

import { v4 as uuid } from 'uuid';

import './EquipmentAdd.scss';

/**
 * Component: EquipmentAdd
 * Standalone form to add or edit equipment
 */
const EquipmentAdd = ({ match }) => {
  const CURRENT_EQUIPMENT_ID = match.params.equipmentid;

  // Edition of this entity, fetched on load
  const [currentEquipment, setCurrentEquipment] = useState(null);

  // Save new equipment id here, that will redirect the user
  const [newEquipmentId, setNewEquipmentId] = useState(null);

  // Form values
  const [identification, setIdentification] = useState('');
  const [selectedEquipmentType, setSelectedEquipmentType] = useState('');
  const [selectedEquipmentSubType, setSelectedEquipmentSubType] = useState('');
  const [selectedEquipmentModelId, setSelectedEquipmentModelId] = useState('');

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

    if(CURRENT_EQUIPMENT_ID) {
      // If edition, saving the identification as it's the only field that could be updated
      // Then, set new equipment id to redirect user
      EquipmentService.updateField(CURRENT_EQUIPMENT_ID, { identification })
            .then(() => setNewEquipmentId(CURRENT_EQUIPMENT_ID))
            .catch(ErrorService.manageError);
    }
    else  {
      if(!selectedEquipmentModelId) {
        ErrorService.error('Please pick a model or create one!');
        return;
      }
      
      // Otherwise, create the new equipment
      // Then set the new equipment id to redirect the user
      EquipmentService.create(
        new Equipment(computed.activeRole.companyId,
                      identification,
                      selectedEquipmentModelId,
                      computed.user.uid,
                      DateService.getCurrentIsoDateString()))
          .then(equipmentDoc => setNewEquipmentId(equipmentDoc.id))
          .catch(ErrorService.manageError);
    }
  };

  // Handle selection of models and types
  const handleSelection = (value, fieldName) => {
    if(fieldName === 'selectedEquipmentType') {
      if(!value) {
        setSelectedEquipmentSubType('');
        setSelectedEquipmentModelId('');
      }
      setSelectedEquipmentType(value);
    }
    else if(fieldName === 'selectedEquipmentSubType') {
      if(!value) {
        setSelectedEquipmentModelId('');
      }
      setSelectedEquipmentSubType(value);
    }
    else if(fieldName === 'selectedEquipmentModelId') {
      setSelectedEquipmentModelId(value);
    }
  };

  // Used to filter equipment models according to equipment model type and subtype
  const filterEquipmentModels = (type, subType = null) => {
    let newEquipmentModels = {};

    // If there's no subtype available, filter by type only
    if(!subType) {
      Object.keys(EEquipmentModel)
        .filter(equipmentModelId => EEquipmentModelDetails[equipmentModelId].type === type)
        .forEach(equipmentModelId => newEquipmentModels[equipmentModelId] = EEquipmentModelDetails[equipmentModelId]);
    }
    else {
      // Otherwise, filter by both type and subtype
      Object.keys(EEquipmentModel)
        .filter(equipmentModelId => EEquipmentModelDetails[equipmentModelId].type === type)
        .filter(equipmentModelId => EEquipmentModelDetails[equipmentModelId].subType === subType)
        .forEach(equipmentModelId => newEquipmentModels[equipmentModelId] = EEquipmentModelDetails[equipmentModelId]);
    }
    return newEquipmentModels;
  };

  useEffect(() => {
    if(computed.initialized && computed.activeRole){

      // set company owner
      setCompanyId(computed.activeRole.companyId);
      setCompany(computed.activeRoleCompany);
  
      if(CURRENT_EQUIPMENT_ID) {
        // If edition, fetch the current data
        EquipmentService.get(CURRENT_EQUIPMENT_ID)
          .then(equipmentDoc => {

            // set form values
            setIdentification(equipmentDoc.data().identification);
            setCurrentEquipment(equipmentDoc.data());
  
            // Get creator
            EmployeeService.get(equipmentDoc.data().creator)
              .then(employeeDoc => {
                setCreatorId(employeeDoc.id);
                setCreator(employeeDoc.data());
              })
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
      }
      else {
        // otherwise, set creator as current user
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
    ErrorService.warning('Please activate a role to add an equipment!');
    return <Redirect to={`/equipments`} />;
  }

  /**
   * RENDER
   */

  // used to render choose component as well as selected data
  const renderModels = () => {
    const EQUIPMENT_TYPES = {}, EQUIPMENT_SUB_TYPES = {}, NEW_EQUIPMENT_MODELS = {};

    // Compute equipment types
    Object.keys(EEquipmentModelTypeDetails).forEach(key => {
      EQUIPMENT_TYPES[key] = {
        content: () => <Fragment>
          {EEquipmentModelTypeDetails[key].icon}
          {EEquipmentModelTypeDetails[key].name}
        </Fragment>,
        disabled: !Object.keys(filterEquipmentModels(key)).length
      };
    });

    // If an equipmnet type is selected, compute corresponding subtypes
    if(selectedEquipmentType) {
      Object.keys(EEquipmentModelSubTypeDetails[selectedEquipmentType]).forEach(key => {
        EQUIPMENT_SUB_TYPES[key] = {
          content: () => <Fragment>
            {EEquipmentModelSubTypeDetails[selectedEquipmentType][key].icon}
            {EEquipmentModelSubTypeDetails[selectedEquipmentType][key].name}
          </Fragment>,
          disabled: !Object.keys(filterEquipmentModels(selectedEquipmentType, key)).length
        };
      });

      // If equipment type and subtype are selected, compute equipment models
      if (selectedEquipmentSubType) {
        Object.keys(filterEquipmentModels(selectedEquipmentType, selectedEquipmentSubType)).forEach(key => {
          NEW_EQUIPMENT_MODELS[key] = {
            content: () => <Fragment>
              <EquipmentModelImage equipmentModelId={key} />
              {EEquipmentModelDetails[key].name}
            </Fragment>
          }
        });
      }
    }
    
    // return complete form input for model selection
    return <div className="model-selection">
      <div className="model-result">


        <h3>Equipment Type</h3>
        {!selectedEquipmentType ?
          /* If no equipment type is selected, let the user choose */
          <Choose
            selection={selectedEquipmentType}
            items={EQUIPMENT_TYPES} 
            fieldName="selectedEquipmentType"
            onSelectionChange={handleSelection} /> :
          <Fragment>
            {/* Otherwise, print it with edit link */}
            {EEquipmentModelTypeDetails[selectedEquipmentType].icon}
            {EEquipmentModelTypeDetails[selectedEquipmentType].name}
            <span className="action" onClick={() => handleSelection(null, 'selectedEquipmentType')}>
              <Icon source="fa" icon={faEdit} />
            </span>

            {/* And print equipment subtype section */}
            <div className="model-result">
              <h3>Equipment Sub-type</h3>
              {!selectedEquipmentSubType ?
                /* if no equipment subtype is selected, let the user choose */
                <Choose
                  items={EQUIPMENT_SUB_TYPES}
                  selection={selectedEquipmentSubType}
                  fieldName="selectedEquipmentSubType"
                  onSelectionChange={handleSelection} /> :
                <Fragment>
                  {/* Otherwise, print it with edit link */}
                  {EEquipmentModelSubTypeDetails[selectedEquipmentType][selectedEquipmentSubType].icon}
                  {EEquipmentModelSubTypeDetails[selectedEquipmentType][selectedEquipmentSubType].name}
                  <span className="action" onClick={() => handleSelection(null, 'selectedEquipmentSubType')}>
                    <Icon source="fa" icon={faEdit} />
                  </span>

                  {/* And print equipment model selection */}
                  <div className="model-result">
                    <h3>Equipment Model</h3>
                    {!selectedEquipmentModelId ?
                      /* If no equipment model is selected, let the user choose */
                      <Choose
                        selection={selectedEquipmentModelId}
                        items={NEW_EQUIPMENT_MODELS}
                        fieldName="selectedEquipmentModelId"
                        onSelectionChange={handleSelection} /> :

                      <Fragment>
                        {/* Otherwise, print it with edit link */}
                        <EquipmentModelImage equipmentModelId={selectedEquipmentModelId} />
                        {EEquipmentModelDetails[selectedEquipmentModelId].name}
                        <span className="action" onClick={() => handleSelection(null, 'selectedEquipmentModelId')}>
                          <Icon source="fa" icon={faEdit} />
                        </span>
                      </Fragment>
                    }
                  </div>
                </Fragment>
              }
            </div>
          </Fragment>
        }
      </div>

      <NavLink className="equipment-model-add-link" to={`/equipment-model-add`}>Can't find what you're looking for? Request yours now!</NavLink>

      <span className="fake-label">
        <Icon source="fa" icon={faTruck} />
        Model
      </span>
    </div>;
  }

  if(!computed.employee || !computed.activeRoleCompany) {
    return null;
  }

  // If new equipment id is set (= if equipment was successfully created / edited), redirect user
  if(newEquipmentId) {
    ErrorService.success(`Equipment ${CURRENT_EQUIPMENT_ID ? 'updated' : 'created'}!`);
    return <Redirect to={`/equipments`} />;
  }

  return (
    <div className="EquipmentAdd">
      <h1>{CURRENT_EQUIPMENT_ID ? 'Edit' : 'Add'} an equipment</h1>

      {/* Equipment add form */}
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
          isBig
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

        {/* Model */}
        {CURRENT_EQUIPMENT_ID && currentEquipment ? 
          <div className="model-selection--done">
            {/* On edition, model cannot be edited => print non updatable data */}
            <span className="fake-label">
              <Icon source="fa" icon={faTruck} />
              Model
            </span>
            <div className="Element Element--tile">
              <div className="RoleCompany Element-content">
                <div className="Element-base">
                  <div className="Element-photo">
                    <img src={EEquipmentModelDetails[currentEquipment.equipmentModelId].image}
                          alt={EEquipmentModelDetails[currentEquipment.equipmentModelId].name + '\'s photo'} />
                  </div>
                  <div className="Element-data">
                    <span className="Element-title">{EEquipmentModelDetails[currentEquipment.equipmentModelId].name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div> : renderModels()}

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
    </div>
  );
}

export default EquipmentAdd;
