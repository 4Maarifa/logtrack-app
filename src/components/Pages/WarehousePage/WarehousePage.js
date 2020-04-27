import React, { useState, useEffect } from 'react';
import { faTruck } from '@fortawesome/pro-solid-svg-icons'

import DataService from '../../../services/data.service';
import CompanyService from '../../../services/entities/company.service';
import ErrorService from '../../../services/error.service';
import BrandService from '../../../services/entities/brand.service';
import EquipmentModelService from '../../../services/entities/equipmentModel.service';
import EquipmentService from '../../../services/entities/equipment.service';
import WarehouseService from '../../../services/entities/warehouse.service';

import Loader from '../../Utils/Loader/Loader';
import ExTable from '../../Utils/ExTable/ExTable';
import Icon from '../../Utils/Icon/Icon';
import Tabs from '../../Utils/Tabs/Tabs';

import Equipment from '../../Entities/Equipment/Equipment';
import Warehouse from '../../Entities/Warehouse/Warehouse';

import { v4 as uuid } from 'uuid';

import './WarehousePage.scss';

/**
 * Component: WarehousePage
 * Use by everyone to see details about a warehouse (linked equipments)
 */
const WarehousePage = ({ match }) => {
  const warehouseId = match.params.warehouseid;

  const [warehouse, setWarehouse] = useState(null);
  const [company, setCompany] = useState(null);

  const [equipments, setEquipments] = useState({});
  const [isEquipmentsLoading, setEquipmentsLoading] = useState(true);
  const [equipmentModels, setEquipmentsModels] = useState({});
  const [brands, setBrands] = useState({});

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeValues = () => {
    WarehouseService.get(warehouseId)
      .then(warehouseDoc => setWarehouse(warehouseDoc.data()))
      .catch(ErrorService.manageError);
  };

  const computeCompany = () => {
    if(warehouse) {
      CompanyService.get(warehouse.companyId)
        .then(companyDoc => setCompany(companyDoc.data()))
        .catch(ErrorService.manageError);
    }
  };

  const computeEquipments = () => {
    BrandService.list()
      .then(setBrands)
      .catch(ErrorService.manageError);

    EquipmentModelService.list()
      .then(setEquipmentsModels)
      .catch(ErrorService.manageError);

    if(warehouseId) {
      EquipmentService.getAllForWarehouseId(warehouseId)
        .then(equipments => {
          setEquipments(equipments);
          setEquipmentsLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  };

  useEffect(() => {
    computeCompany();
    computeEquipments();
  }, [warehouse]);

  useEffect(() => computeValues(), [computed]);

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

  if(!warehouse || !company) {
    return (
      <div className="WarehousePage">
        <Loader />
      </div>
    );
  }
  return (
    <div className="WarehousePage">
      <div className="Element Element--page">
        <Warehouse key={warehouseId} warehouse={ {[warehouseId]: warehouse} } options={{ }} showDetails isPage />
      </div>
      <Tabs default="equipments" tabs={{
        equipments: {
          name: () => <span>
            <Icon source="fa" icon={faTruck} />
            Equipments
          </span>,
          content: () => <ExTable items={equipments}
            renderItem={renderEquipment}
            header={['Identification', 'Model']}
            loading={isEquipmentsLoading} />
        }
      }} />
    </div>
  );
};

export default WarehousePage;
