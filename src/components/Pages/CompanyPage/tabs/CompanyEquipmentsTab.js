import React, { useState, useEffect } from 'react';
import { faTruck } from '@fortawesome/pro-light-svg-icons';

import ErrorService from './../../../../services/error.service';
import BrandService from './../../../../services/entities/brand.service';
import EquipmentModelService from './../../../../services/entities/equipmentModel.service';
import EquipmentService from './../../../../services/entities/equipment.service';

import Icon from './../../../Utils/Icon/Icon';
import ExTable from './../../../Utils/ExTable/ExTable';

import Equipment, { equipmentsExTableFSS } from './../../../Entities/Equipment/Equipment';

/**
 * Component: CompanyEquipmentsTab
 */
const CompanyEquipmentsTab = ({ companyId }) => {

  const [equipments, setEquipments] = useState({});
  const [isEquipmentsLoading, setEquipmentsLoading] = useState(true);
  const [equipmentModels, setEquipmentModels] = useState({});
  const [brands, setBrands] = useState({});

  useEffect(() => {
    BrandService.list()
      .then(setBrands)
      .catch(ErrorService.manageError);

    EquipmentModelService.list()
      .then(setEquipmentModels)
      .catch(ErrorService.manageError);

    if(companyId) {
      EquipmentService.getAllForCompanyId(companyId)
        .then(equipments => {
          setEquipments(equipments);
          setEquipmentsLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  }, [companyId]);

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

  return <ExTable key="equipments"
                  fss={equipmentsExTableFSS}
                  items={equipments}
                  renderItem={renderEquipment}
                  header={<span><Icon source="fa" icon={faTruck} /> Equipments</span>}
                  loading={isEquipmentsLoading}/>;
};

export default CompanyEquipmentsTab;
