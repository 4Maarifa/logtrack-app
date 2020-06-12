import React, { useRef, useState, useEffect } from 'react';
import { faPlus, faWarehouseAlt } from '@fortawesome/pro-solid-svg-icons';

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

const Warehouses = () => {

  const [warehouses, setWarehouses] = useState({});
  const [isWarehousesLoading, setWarehousesLoading] = useState(true);

  const REF_MAP = useRef(null);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const onSelectedItemChanged = itemId => {
    if(!itemId) {
      REF_MAP.current.centerOnAllMarkers();
      return;
    }
    if(warehouses[itemId].markerId) {
      REF_MAP.current.centerOnMarker(warehouses[itemId].markerId);
      REF_MAP.current.triggerPopup(warehouses[itemId].markerId);
    }
  };

  useEffect(() => {
    if(computed.activeRole) {
      WarehouseService.getAllForCompanyId(computed.activeRole.companyId)
        .then(warehouses => {
          if(REF_MAP.current) {
            Object.keys(warehouses).forEach(warehouseId => {
              warehouses[warehouseId].markerId = REF_MAP.current.addMarker(
                warehouses[warehouseId].latitude,
                warehouses[warehouseId].longitude,
                warehouses[warehouseId].name
              );
            });
            REF_MAP.current.centerOnAllMarkers();
          }
          
          setWarehouses(warehouses);
          setWarehousesLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  }, [computed.activeRole]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
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
      <Map ref={REF_MAP} />
      <ExTable key="warehouses" 
              items={warehouses}
              fss={warehousesExTableFSS}
              renderItem={renderWarehouse}
              header={<span><Icon source="fa" icon={faWarehouseAlt} /> Warehouses</span>}
              onActivateItem={onSelectedItemChanged}
              loading={isWarehousesLoading} />
      <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
        {title: 'Add a warehouse', icon: <Icon source="fa" icon={faWarehouseAlt} />, link: `/warehouse-add`}
      ]} />
    </div>
  );
};

export default Warehouses;
