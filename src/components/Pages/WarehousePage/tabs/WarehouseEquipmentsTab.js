import React, { useState, useEffect } from 'react';
import { faTruck } from '@fortawesome/pro-light-svg-icons'

import DataService from './../../../../services/data.service';
import ErrorService from './../../../../services/error.service';
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

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {    
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
  const renderEquipment = (itemId, itemData) => <Equipment key={itemId} equipment={ {[itemId]: itemData} } options={ {} } showDetails />;

  // equipments list
  return <ExTable items={equipments}
            renderItem={renderEquipment}
            fss={equipmentsExTableFSS}
            header={<span><Icon source="fa" icon={faTruck} /> Equipments</span>}
            loading={isEquipmentsLoading} />;
};

export default WarehouseEquipmentsTab;
