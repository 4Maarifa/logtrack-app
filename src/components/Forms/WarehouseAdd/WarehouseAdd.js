import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faRectangleWide, faMapMarker, faUser, faBuilding, faWarehouse } from '@fortawesome/pro-solid-svg-icons';

import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import Range from './../../Utils/FormElements/Range/Range';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import FormDebouceAutoSuggestInput from './../../Utils/FormElements/FormDebounceAutoSuggestInput/FormDebounceAutoSuggestInput';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import WarehouseService from './../../../services/entities/warehouse.service';
import GeoService from './../../../services/geo.service';

import Warehouse from './../../../classes/Warehouse';

import { v4 as uuid } from 'uuid';

import './WarehouseAdd.scss';
import EmployeeService from '../../../services/entities/employee.service';

const WarehouseAdd = ({ match }) => {
  const currentWarehouseId = match.params.warehouseid;

  const [currentWarehouse, setCurrentWarehouse] = useState(null);

  const [creator, setCreator] = useState(null);
  const [creatorId, setCreatorId] = useState(null);

  const [newWarehouseId, setNewWarehouseId] = useState(null);

  const [identification, setIdentification] = useState('');
  const [nbLoadingDocks, setNbLoadingDocks] = useState(0);

  const [possibleLocationsInput, setPossibleLocationsInput] = useState('');
  const [possibleLocations, setPossibleLocations] = useState({});
  const [selectedLocationKey, setSelectedLocationKey] = useState('');
  const [selectedLocationItem, setSelectedLocationItem] = useState(null);

  const [locationMarkerId, setLocationMarkerId] = useState(null);

  const map = useRef(null);

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeValues = () => {
    if(currentWarehouseId) {
      WarehouseService.get(currentWarehouseId)
        .then(warehouseDoc => {
          setCurrentWarehouse(warehouseDoc.data());
          setIdentification(warehouseDoc.data().name);
          setNbLoadingDocks(warehouseDoc.data().nbLoadingDocks);

          onSelectedLocationItem('CURRENT', null, {
            content: <span>{warehouseDoc.data().address}</span>,
            value: {
              display_name: warehouseDoc.data().address,
              coordinates: [warehouseDoc.data().latitude, warehouseDoc.data().longitude]
            }
          });

          EmployeeService.get(warehouseDoc.data().creator)
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
      setCreator(computed.user);
    }
  };

  const onLocationAutoCompleteChange = inputValue => {
    setPossibleLocationsInput(inputValue);

    GeoService.searchPlaces(inputValue, { addressdetails: 0 })
      .then(values => {
        let newPossibleLocations = {};
        values.forEach(value => {
          value.coordinates = GeoService.transformCoordinates([
            parseFloat(value.lon),
            parseFloat(value.lat)
          ]);
          newPossibleLocations[value.osm_id] = {
            content: <span>
              {value.display_name}
            </span>,
            value: value
          };
        });
        setPossibleLocations(newPossibleLocations);
      })
      .catch(ErrorService.manageError);
  };

  const onSelectedLocationItem = (selectedLocationKey, _, selectedLocationItem) => {
    setSelectedLocationKey(selectedLocationKey);
    setSelectedLocationItem(selectedLocationItem);

    if(!selectedLocationItem) {
      map.current.deleteMarker(locationMarkerId);
      setLocationMarkerId(null);
      return;
    }
    if(locationMarkerId) {
      map.current.switchMarker(
        locationMarkerId,
        selectedLocationItem.value.coordinates[0],
        selectedLocationItem.value.coordinates[1],
        selectedLocationItem.value.display_name);
      centerOnLocationMarker();
    }
    else {
      setLocationMarkerId(map.current.addMarker(
        selectedLocationItem.value.coordinates[0],
        selectedLocationItem.value.coordinates[1],
        selectedLocationItem.value.display_name));
    }
  };

  const centerOnLocationMarker = () => locationMarkerId && map.current.centerOnMarker(locationMarkerId);

  const handleSubmit = event => {
    event.preventDefault();

    if(!selectedLocationItem) {
      ErrorService.error('Please select a location!');
      return;
    }

    if(currentWarehouse) {
      WarehouseService.updateField(currentWarehouseId, {
        identification,
        latitude: selectedLocationItem.value.coordinates[0],
        longitude: selectedLocationItem.value.coordinates[1],
        address: selectedLocationItem.value.display_name,
        nbLoadingDocks
      })
        .then(() => setNewWarehouseId(currentWarehouseId))
        .catch(ErrorService.manageError);        
    }
    else {
      WarehouseService.create(
        new Warehouse(
          identification, 
          selectedLocationItem.value.coordinates[0],
          selectedLocationItem.value.coordinates[1],
          selectedLocationItem.value.display_name,
          computed.activeRole.companyId, 
          computed.user.uid, 
          DateService.getCurrentIsoDateString(),
          nbLoadingDocks))
        .then(warehouseDoc => setNewWarehouseId(warehouseDoc.id))
        .catch(ErrorService.manageError);
    }
  };
  
  useEffect(() => {
    centerOnLocationMarker()
  }, [locationMarkerId]);

  useEffect(() => {
    if(computed.initialized) {
      computeValues();
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey);
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
    let dashboardUrl = '/dashboard';
    return <Redirect to={dashboardUrl} />;
  }

  return (
    <div className="WarehouseAdd">
      <h1>{currentWarehouse ? `Edit "${currentWarehouse.name}" warehouse` : 'Add  a Warehouse'}</h1>
      <form onSubmit={handleSubmit}>
        
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
              It can be the location, building info...
            </span>
          }
          onValueChange={setIdentification} />

        <FormDebouceAutoSuggestInput
          value={possibleLocationsInput}
          label={
            <span>
              <Icon source="fa" icon={faMapMarker} />
              Location
            </span>
          }
          possibleItems={possibleLocations}
          onValueChange={onLocationAutoCompleteChange}
          onSelectedItemChange={onSelectedLocationItem}
          inputAutoComplete="off"
          inputRequired
          fieldName="location"
          selectedItemKey={selectedLocationKey}
          selectedItem={selectedLocationItem}
          instructions={
            <span>Pick a location</span>
          } />
        <Map ref={map} />

        {/* Nb Loading Docks */}
        <div className="input-nbloadingdocks">
          <span className="fake-label">
            <Icon source="fa" icon={faWarehouse} />
            Number of Loading Docks
          </span>
          <Range min={0} max={100} step={1} value={nbLoadingDocks} fieldName="nbLoadingDocks" onChange={setNbLoadingDocks} />
        </div>

        {/* Company */}
        <div className="input-company">
          <span className="fake-label">
            <Icon source="fa" icon={faBuilding} />
            Company
          </span>
          <PageLink type={PageLinkType.COMPANY} entityId={computed.activeRole.companyId} entityData={computed.activeRoleCompany} />
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
};

export default WarehouseAdd;
