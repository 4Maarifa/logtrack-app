import React, { Fragment, useState, useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { faRectangleWide, faEdit, faTruck, faUser, faBuilding } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import Choose from './../../Utils/FormElements/Choose/Choose';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';
import EquipmentService from './../../../services/entities/equipment.service';
import EmployeeService from './../../../services/entities/employee.service';
import CompanyService from './../../../services/entities/company.service';

import Equipment from './../../../classes/Equipment';
import { EEquipmentModelTypeDetails, EEquipmentModelSubTypeDetails } from './../../../classes/EquipmentModel';

import { v4 as uuid } from 'uuid';

import './EquipmentAdd.scss';

const EquipmentAdd = ({ match }) => {
  const currentEquipmentId = match.params.equipmentid;

  const [currentEquipment, setCurrentEquipment] = useState(null);

  const [newEquipmentId, setNewEquipmentId] = useState(null);

  const [identification, setIdentification] = useState('');
  const [selectedEquipmentType, setSelectedEquipmentType] = useState('');
  const [selectedEquipmentSubType, setSelectedEquipmentSubType] = useState('');
  const [selectedEquipmentModelId, setSelectedEquipmentModelId] = useState('');

  const [equipmentModels, setEquipmentModels] = useState({});

  const [creatorId, setCreatorId] = useState(null);
  const [creator, setCreator] = useState(null);

  const [companyId, setCompanyId] = useState(null);
  const [company, setCompany] = useState(null);

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeValues = () => {
    if(!computed.activeRole) {
      return;
    }
    EquipmentModelService.list()
      .then(setEquipmentModels)
      .catch(ErrorService.manageError);

    if(currentEquipmentId) {
      EquipmentService.get(currentEquipmentId)
        .then(equipmentDoc => {
          setIdentification(equipmentDoc.data().identification);
          setCurrentEquipment(equipmentDoc.data());

          EmployeeService.get(equipmentDoc.data().creator)
            .then(employeeDoc => {
              setCreatorId(employeeDoc.id);
              setCreator(employeeDoc.data());
            })
            .catch(ErrorService.manageError);

          CompanyService.get(equipmentDoc.data().companyId)
            .then(companyDoc => {
              setCompanyId(companyDoc.id);
              setCompany(companyDoc.data());
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
  };

  const handleSubmit = event => {
    event.preventDefault();

    if(currentEquipmentId) {
      EquipmentService.updateField(currentEquipmentId, {identification})
            .then(() => setNewEquipmentId(currentEquipmentId))
            .catch(ErrorService.manageError);
    }
    else  {
      if(!selectedEquipmentModelId) {
        ErrorService.error('Please pick a model or create one!');
        return;
      }
      
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

  useEffect(() => {
    if(computed.initialized){
      computeValues();
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(!computed.activeRole) {
    ErrorService.warning('Please activate a role to add an equipment!');
    return <Redirect to={`/equipments`} />;
  }

  /**
   * RENDER
   */

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
        <Choose
          selection={selectedEquipmentType}
          items={equipmentTypes} 
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
            <Choose
              items={equipmentSubTypes}
              selection={selectedEquipmentSubType}
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
            <Choose
              selection={selectedEquipmentModelId}
              items={newEquipmentModels}
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
  if(newEquipmentId) {
    ErrorService.success(`Equipment ${currentEquipmentId ? 'updated' : 'created'}!`);
    return <Redirect to={`/equipments`} />;
  }

  return (
    <div className="EquipmentAdd">
      <h1>{currentEquipmentId ? 'Edit' : 'Add'} an equipment</h1>
      <form onSubmit={handleSubmit}>
        {/* Model */}
        {currentEquipmentId && currentEquipment ? 
          <div className="model-selection--done">
            <span className="fake-label">
              <Icon source="fa" icon={faTruck} />
              Model
            </span>
            <div className="Element Element--tile">
              <div className="RoleCompany Element-content">
                <div className="Element-base">
                  <div className="Element-photo">
                    <img src={equipmentModels[currentEquipment.equipmentModelId].photoUrl}
                          alt={equipmentModels[currentEquipment.equipmentModelId].name + '\'s photo'} />
                  </div>
                  <div className="Element-data">
                    <span className="Element-title">{equipmentModels[currentEquipment.equipmentModelId].name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div> : renderModels()}

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
          <PageLink type={PageLinkType.COMPANY} entityId={companyId} entityData={company} />
        </div>

        {/* Creator */}
        <div className="input-creator">
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
}

export default EquipmentAdd;
