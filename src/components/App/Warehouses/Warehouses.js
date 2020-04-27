import React, { useRef, useState, useEffect } from 'react';
import { faPlus, faWarehouseAlt } from '@fortawesome/pro-solid-svg-icons';

import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';
import ActionButton from './../../Utils/ActionButton/ActionButton';
import ExTable from './../../Utils/ExTable/ExTable';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import WarehouseService from './../../../services/entities/warehouse.service';

import Warehouse from './../../Entities/Warehouse/Warehouse';

import { v4 as uuid } from 'uuid';

import './Warehouses.scss';

const Warehouses = () => {

  const [warehouses, setWarehouses] = useState({});
  const [isWarehousesLoading, setWarehousesLoading] = useState(true);

  const map = useRef(null);

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  const computeWarehouses = () => {
    if(computed.activeRole) {
      WarehouseService.getAllForCompanyId(computed.activeRole.companyId)
        .then(warehouses => {
          if(map.current) {
            Object.keys(warehouses).forEach(warehouseKey => {
              warehouses[warehouseKey].markerId = map.current.addMarker(
                warehouses[warehouseKey].latitude,
                warehouses[warehouseKey].longitude,
                warehouses[warehouseKey].name
              );
            });
            map.current.centerOnAllMarkers();
          }
          
          setWarehouses(warehouses);
          setWarehousesLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  };

  const onSelectedItemChanged = itemId => {
    if(!itemId) {
      map.current.centerOnAllMarkers();
      return;
    }
    if(warehouses[itemId].markerId) {
      map.current.centerOnMarker(warehouses[itemId].markerId);
      map.current.triggerPopup(warehouses[itemId].markerId);
    }
  };


  useEffect(() => computeWarehouses(), [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);
  
  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderWarehouse = (itemKey, itemData) => {
    return <Warehouse key={itemKey}
      warehouse={ {[itemKey]: itemData} }
      options={{  }}
      showDetails />
  };

  return (
    <div className="Warehouses">
      <Map ref={map} />
      <ExTable key="warehouses" 
              items={warehouses} 
              renderItem={renderWarehouse} 
              header={['Name', '']}
              onActivateItem={onSelectedItemChanged}
              loading={isWarehousesLoading} />
      <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
        {title: 'Add a warehouse', icon: <Icon source="fa" icon={faWarehouseAlt} />, link: `/warehouse-add`}
      ]} />
    </div>
  );
};

export default Warehouses;
