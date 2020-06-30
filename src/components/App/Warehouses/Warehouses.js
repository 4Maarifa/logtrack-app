import React, { useRef, useState, useEffect } from 'react';
import { faPlus, faWarehouseAlt } from '@fortawesome/pro-light-svg-icons';

import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';
import ActionButton from './../../Utils/ActionButton/ActionButton';
import ExTable from './../../Utils/ExTable/ExTable';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import WarehouseService from './../../../services/entities/warehouse.service';

import Warehouse, { warehousesExTableFSS } from './../../Entities/Warehouse/Warehouse';

import { v4 as uuid } from 'uuid';

import './Warehouses.scss';

/**
 * Component: Warehouses
 * Used by managers to create and manage warehouses
 */
const Warehouses = () => {

  // Warehouses data
  const [warehouses, setWarehouses] = useState({});
  const [isWarehousesLoading, setWarehousesLoading] = useState(true);

  // Reference to the map
  const REF_MAP = useRef(null);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // When an item is selected on the table
  const onSelectedItemChanged = itemId => {
    if(!itemId) {
      // If it's not a current entity, recenter the map
      REF_MAP.current.centerOnAllMarkers();
      return;
    }
    if(warehouses[itemId].markerId) {
      // else, center on the marker and trigger the popup on the selected warehouse
      REF_MAP.current.centerOnMarker(warehouses[itemId].markerId);
      REF_MAP.current.triggerPopup(warehouses[itemId].markerId);
    }
  };

  useEffect(() => {
    if(computed.activeRole) {

      // Get all warehouses
      WarehouseService.getAllForCompanyId(computed.activeRole.companyId)
        .then(warehouses => {

          // Adding a marker on the map
          if(REF_MAP.current) {
            Object.keys(warehouses).forEach(warehouseId => {
              warehouses[warehouseId].markerId = REF_MAP.current.addMarker(
                warehouses[warehouseId].latitude,
                warehouses[warehouseId].longitude,
                warehouses[warehouseId].name
              );
            });

            // Recenter the map to view all markers
            REF_MAP.current.centerOnAllMarkers();
          }
          
          // Setting data
          setWarehouses(warehouses);

          // Trigger end of load
          setWarehousesLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  }, [computed.activeRole]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);
  
  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderWarehouse = (itemId, itemData) => {
    return <Warehouse key={itemId}
      warehouse={ {[itemId]: itemData} }
      options={{  }}
      showDetails />
  };

  return (
    <div className="Warehouses">

      {/* Map */}
      <Map ref={REF_MAP} />

      {/* Data table */}
      <ExTable key="warehouses" 
              items={warehouses}
              fss={warehousesExTableFSS}
              renderItem={renderWarehouse}
              header={<span><Icon source="fa" icon={faWarehouseAlt} /> Warehouses</span>}
              onActivateItem={onSelectedItemChanged}
              loading={isWarehousesLoading} />

      {/* Action button to add a new warehouse */}
      <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
        {title: 'Add a warehouse', icon: <Icon source="fa" icon={faWarehouseAlt} />, link: `/warehouse-add`}
      ]} />
    </div>
  );
};

export default Warehouses;
