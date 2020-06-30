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
 * Tab of CompanyPage
 * 
 * used to get and show company's equipments
 * You have to pass the company id
 */
const CompanyEquipmentsTab = ({ companyId }) => {

  // company's equipments
  const [equipments, setEquipments] = useState({});
  const [isEquipmentsLoading, setEquipmentsLoading] = useState(true);

  // ALl Equipment models
  const [equipmentModels, setEquipmentModels] = useState({});
  // All Brands
  const [brands, setBrands] = useState({});

  useEffect(() => {

    // get all brands
    BrandService.list()
      .then(setBrands)
      .catch(ErrorService.manageError);

    // get all equipment models
    EquipmentModelService.list()
      .then(setEquipmentModels)
      .catch(ErrorService.manageError);

    if(companyId) {
      // get all equipments of company
      EquipmentService.getAllForCompanyId(companyId)
        .then(equipments => {

          // set equipments
          setEquipments(equipments);

          // trigger end of load
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

  // render the equipments extable
  return <ExTable key="equipments"
                  fss={equipmentsExTableFSS}
                  items={equipments}
                  renderItem={renderEquipment}
                  header={<span><Icon source="fa" icon={faTruck} /> Equipments</span>}
                  loading={isEquipmentsLoading}/>;
};

export default CompanyEquipmentsTab;
