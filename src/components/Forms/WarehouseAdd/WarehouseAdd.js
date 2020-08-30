import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faRectangleWide, faMapMarker, faUser, faBuilding, faWarehouse } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import Range from './../../Utils/FormElements/Range/Range';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import FormLocationInput from './../../Utils/FormElements/FormLocationInput/FormLocationInput';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import WarehouseService from './../../../services/entities/warehouse.service';
import EmployeeService from './../../../services/entities/employee.service';

import Warehouse from './../../../classes/Warehouse';

import { v4 as uuid } from 'uuid';

import './WarehouseAdd.scss';

/**
 * Component: WarehouseAdd
 * Standalone form to add new warehouses or edit existing ones
 * 
 * pass an id if you want to edit a warehouse, otherwise the form is add
 */
const WarehouseAdd = ({ match }) => {
  const CURRENT_WAREHOUSE_ID = match.params.warehouseid;

  // Current warehouse to be edited, popuplated on load if an id is passed
  const [currentWarehouse, setCurrentWarehouse] = useState(null);

  // Creator data
  const [creator, setCreator] = useState(null);
  const [creatorId, setCreatorId] = useState(null);

  // new warehouse id, set it to redirect the user once finished
  const [newWarehouseId, setNewWarehouseId] = useState(null);

  // Form values
  const [identification, setIdentification] = useState('');
  const [nbLoadingDocks, setNbLoadingDocks] = useState(0);

  // selected location
  const [selectedLocationKey, setSelectedLocationKey] = useState('');
  const [selectedLocationItem, setSelectedLocationItem] = useState(null);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // When the location item changed
  const onLocationChange = (selectedLocationKey, _, selectedLocationItem) => {
    setSelectedLocationKey(selectedLocationKey);
    setSelectedLocationItem(selectedLocationItem);
  };

  // Form handler
  const handleSubmit = event => {
    event.preventDefault();

    if(!selectedLocationItem) {
      ErrorService.error('Please select a location!');
      return;
    }

    // If edition mode
    if(currentWarehouse) {

      // Update only updatable fields
      // Then, set the warehouse id to redirect user
      WarehouseService.updateField(CURRENT_WAREHOUSE_ID, {
        identification,
        latitude: selectedLocationItem.value.coordinates[0],
        longitude: selectedLocationItem.value.coordinates[1],
        address: selectedLocationItem.value.display_name,
        nbLoadingDocks
      }).then(() => setNewWarehouseId(CURRENT_WAREHOUSE_ID)
      ).catch(ErrorService.manageError);        
    }
    else {
      // Add mode

      // Create the new warehouse with form data
      // Then, set the warehouse id to redirect the user
      WarehouseService.create(
        new Warehouse(
          identification, 
          selectedLocationItem.value.coordinates[0],
          selectedLocationItem.value.coordinates[1],
          selectedLocationItem.value.display_name,
          computed.activeRole.companyId, 
          computed.user.uid, 
          DateService.getCurrentIsoDateString(),
          nbLoadingDocks)
      ).then(warehouseDoc => setNewWarehouseId(warehouseDoc.id)
      ).catch(ErrorService.manageError);
    }
  };

  useEffect(() => {
    if(computed.initialized) {
      
      // If an id is passed
      if(CURRENT_WAREHOUSE_ID) {

        // Load the corresponding warehouse
        WarehouseService.get(CURRENT_WAREHOUSE_ID)
          .then(warehouseDoc => {

            // Then, save it for further uses
            setCurrentWarehouse(warehouseDoc.data());

            // and update form values
            setIdentification(warehouseDoc.data().name);
            setNbLoadingDocks(warehouseDoc.data().nbLoadingDocks);
  
            // Also, save the current location, as well as create the location marker
            onLocationChange('CURRENT', null, {
              content: <span>{warehouseDoc.data().address}</span>,
              value: {
                display_name: warehouseDoc.data().address,
                coordinates: [warehouseDoc.data().latitude, warehouseDoc.data().longitude]
              }
            });
  
            // Get the creator details
            EmployeeService.get(warehouseDoc.data().creator)
              .then(employeeDoc => {

                // save creator
                setCreatorId(employeeDoc.id);
                setCreator(employeeDoc.data());
              })
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
      }
      else {
        // set creator as current user
        setCreatorId(computed.user.uid);
        setCreator(computed.employee);
      }
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);
  
  if(!computed.initialized) { return null; }

  if(!computed.activeRole) {
    ErrorService.warning('Please activate a role to add an equipment!');
    return <Redirect to={`/dashboard`} />;
  }

  if(currentWarehouse && currentWarehouse.companyId !== computed.activeRole.companyId) {
    ErrorService.warning('You don\'t have permission to edit this');
    return <Redirect to={`/dashboard`} />;
  }
  
  /**
   * RENDER
   */
  if(!computed.employee || !computed.activeRoleCompany) {
    return null;
  }

  if(newWarehouseId) {
    // When new id is set, redirect the user
    return <Redirect to={`/dashboard`} />;
  }

  return (
    <div className="WarehouseAdd">
      <h1>{currentWarehouse ? `Edit "${currentWarehouse.name}" warehouse` : 'Add  a Warehouse'}</h1>

      {/* Warehouse add form */}
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
          isBig
          inputPattern=".{3,}"
          instructions={
            <span>
              The identification is required<br/>
              The identification must be 3 characters minimum<br/>
              It can be the location, building info...
            </span>
          }
          onValueChange={setIdentification} />

        {/* Location */}
        <FormLocationInput
          selectedItemKey={selectedLocationKey}
          selectedItem={selectedLocationItem}
          onSelectedItemChange={onLocationChange}
          label={
            <span>
              <Icon source="fa" icon={faMapMarker} />
              Location
            </span>
          }
          inputRequired
          fieldName="location"
          instructions={
            <span>Pick a location</span>
          } />

        {/* Nb Loading Docks */}
        <div className="input-container">
          <span className="fake-label">
            <Icon source="fa" icon={faWarehouse} />
            Number of Loading Docks
          </span>
          <Range min={0} max={100} step={1} value={nbLoadingDocks} fieldName="nbLoadingDocks" onChange={setNbLoadingDocks} />
        </div>

        {/* Company */}
        <div className="input-container">
          <span className="fake-label">
            <Icon source="fa" icon={faBuilding} />
            Company
          </span>
          <PageLink type={PageLinkType.COMPANY} entityId={computed.activeRole.companyId} entityData={computed.activeRoleCompany} />
        </div>

        {/* Creator */}
        <div className="input-container">
          <span className="fake-label">
            <Icon source="fa" icon={faUser} />
            Creator
          </span>
          {/* Employee pagelink */}
          <PageLink type={PageLinkType.EMPLOYEE} entityId={creatorId} entityData={creator} />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default WarehouseAdd;
