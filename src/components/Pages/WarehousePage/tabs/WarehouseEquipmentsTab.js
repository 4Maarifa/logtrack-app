import React, { useState, useEffect } from 'react';
import { faTruck } from '@fortawesome/pro-light-svg-icons'

import DataService from './../../../../services/data.service';
import ErrorService from './../../../../services/error.service';
import BrandService from './../../../../services/entities/brand.service';
import EquipmentModelService from './../../../../services/entities/equipmentModel.service';
import EquipmentService from './../../../../services/entities/equipment.service';

import ExTable from './../../../Utils/ExTable/ExTable';
import Icon from './../../../Utils/Icon/Icon';

import Equipment, { equipmentsExTableFSS } from './../../../Entities/Equipment/Equipment';

import { v4 as uuid } from 'uuid';

/**
 * Component: WarehouseEquipmentsTab
 * Tab of WarehousePage
 */
const WarehouseEquipmentsTab = ({ warehouseId }) => {

  // Related equipments of the warehouse
  const [equipments, setEquipments] = useState({});
  const [isEquipmentsLoading, setEquipmentsLoading] = useState(true);

  // all equipment models
  const [equipmentModels, setEquipmentsModels] = useState({});

  // all brands
  const [brands, setBrands] = useState({});

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    // get all brands
    BrandService.list()
      .then(setBrands)
      .catch(ErrorService.manageError);

    // get all equipment models
    EquipmentModelService.list()
      .then(setEquipmentsModels)
      .catch(ErrorService.manageError);
    
    // get all equipments for this warehouse
    EquipmentService.getAllForWarehouseId(warehouseId)
      .then(equipments => {
        
        // save them
        setEquipments(equipments);

        // then trigger end of load
        setEquipmentsLoading(false);
      })
      .catch(ErrorService.manageError);
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderEquipment = (itemId, itemData) => {
    const EQUIPMENT_MODEL = { [itemData.equipmentModelId]: equipmentModels[itemData.equipmentModelId] }, 
      BRAND = { [EQUIPMENT_MODEL[itemData.equipmentModelId].brand]: brands[EQUIPMENT_MODEL[itemData.equipmentModelId].brand] };

    return <Equipment key={itemId}
      equipment={ {[itemId]: itemData} }
      brand={BRAND}
      equipmentModel={EQUIPMENT_MODEL}
      options={ {} }
      showDetails />
  };

  // equipments list
  return <ExTable items={equipments}
            renderItem={renderEquipment}
            fss={equipmentsExTableFSS}
            header={<span><Icon source="fa" icon={faTruck} /> Equipments</span>}
            loading={isEquipmentsLoading} />;
};

export default WarehouseEquipmentsTab;
