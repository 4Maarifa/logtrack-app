import React, { useState, useEffect } from 'react';
import { faTruck, faPlus } from '@fortawesome/pro-solid-svg-icons';

import ActionButton from './../../Utils/ActionButton/ActionButton';
import ExTable from './../../Utils/ExTable/ExTable';
import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';
import EquipmentService from './../../../services/entities/equipment.service';

import Equipment, { equipmentsExTableFSS } from './../../Entities/Equipment/Equipment';

import { v4 as uuid } from 'uuid';

import './Equipments.scss';

const Equipments = () => {

  const [equipments, setEquipments] = useState({});
  const [isEquipmentsLoading, setEquipmentsLoading] = useState(true);
  const [equipmentModels, setEquipmentModels] = useState({});

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    if(computed.activeRole) {
      EquipmentModelService.list()
        .then(setEquipmentModels)
        .catch(ErrorService.manageError);
        
      EquipmentService.getAllForCompanyId(computed.activeRole.companyId)
        .then(equipments => {
          setEquipments(equipments);
          setEquipmentsLoading(false);
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
  const renderEquipment = (itemId, itemData) => {
    const equipmentModel = { [itemData.equipmentModelId]: equipmentModels[itemData.equipmentModelId] };

    return <Equipment key={itemId}
      equipment={ {[itemId]: itemData} }
      equipmentModel={equipmentModel} />
  };

  return (
    <div className="Equipments">
      <Map />
      <ExTable key="equipments"
                fss={equipmentsExTableFSS}
                items={equipments}
                renderItem={renderEquipment}
                header={<span><Icon source="fa" icon={faTruck} /> Equipments</span>}
                loading={isEquipmentsLoading} />
      <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
        {title: 'Add an equipment', icon: <Icon source="fa" icon={faTruck} />, link: `/equipment-add`}
      ]} />
    </div>
  );
};

export default Equipments;
