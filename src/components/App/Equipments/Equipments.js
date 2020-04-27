import React, { useState, useEffect } from 'react';
import { faTruck, faPlus } from '@fortawesome/pro-solid-svg-icons';

import ActionButton from './../../Utils/ActionButton/ActionButton';
import ExTable from './../../Utils/ExTable/ExTable';
import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import BrandService from './../../../services/entities/brand.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';
import EquipmentService from './../../../services/entities/equipment.service';

import Equipment from './../../Entities/Equipment/Equipment';

import { v4 as uuid } from 'uuid';

import './Equipments.scss';

const Equipments = () => {

  const [equipments, setEquipments] = useState({});
  const [isEquipmentsLoading, setEquipmentsLoading] = useState(true);
  const [equipmentModels, setEquipmentModels] = useState({});
  const [brands, setBrands] = useState({});

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeEquipments = () => {
    BrandService.list()
      .then(setBrands)
      .catch(ErrorService.manageError);

    EquipmentModelService.list()
      .then(setEquipmentModels)
      .catch(ErrorService.manageError);

    if(computed.activeRole) {
      EquipmentService.getAllForCompanyId(computed.activeRole.companyId)
        .then(equipments => {
          setEquipments(equipments);
          setEquipmentsLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  };

  useEffect(() => computeEquipments(), [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);
  
  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderEquipment = (itemKey, itemData) => {
    const equipmentModel = { [itemData.equipmentModelId]: equipmentModels[itemData.equipmentModelId] },
      brand = { [equipmentModel[itemData.equipmentModelId].brand]: brands[equipmentModel[itemData.equipmentModelId].brand] };

    return <Equipment key={itemKey}
      equipment={ {[itemKey]: itemData} }
      brand={brand}
      equipmentModel={equipmentModel}
      options={ {} }
      showDetails />
  };

  return (
    <div className="Equipments">
      <Map />
      <ExTable key="equipments" 
                items={equipments}
                renderItem={renderEquipment}
                header={['Identification', 'Model']}
                loading={isEquipmentsLoading} />
      <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
        {title: 'Add an equipment', icon: <Icon source="fa" icon={faTruck} />, link: `/equipment-add`}
      ]} />
    </div>
  );
};

export default Equipments;
