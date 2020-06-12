import React, { useState, useEffect } from 'react';
import { faTruck } from '@fortawesome/pro-solid-svg-icons'

import DataService from './../../../services/data.service';
import CompanyService from './../../../services/entities/company.service';
import ErrorService from './../../../services/error.service';
import WarehouseService from './../../../services/entities/warehouse.service';

import Loader from './../../Utils/Loader/Loader';
import Icon from './../../Utils/Icon/Icon';
import Tabs from './../../Utils/Tabs/Tabs';

import Warehouse from './../../Entities/Warehouse/Warehouse';
import Company from '../../Entities/Company/Company';

import { v4 as uuid } from 'uuid';

import WarehouseEquipmentsTab from './tabs/WarehouseEquipmentsTab';

import './WarehousePage.scss';

/**
 * Component: WarehousePage
 * Use by everyone to see details about a warehouse (linked equipments)
 */
const WarehousePage = ({ match }) => {
  const WAREHOUSE_ID = match.params.warehouseid;

  const [warehouse, setWarehouse] = useState(null);
  const [company, setCompany] = useState(null);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    if(warehouse) {
      CompanyService.get(warehouse.companyId)
        .then(companyDoc => setCompany(companyDoc.data()))
        .catch(ErrorService.manageError);
    }
  }, [warehouse]);

  useEffect(() => {
    WarehouseService.get(WAREHOUSE_ID)
      .then(warehouseDoc => setWarehouse(warehouseDoc.data()))
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
        <Warehouse key={WAREHOUSE_ID} warehouse={ {[WAREHOUSE_ID]: warehouse} } options={{ }} showDetails isPage />
      </div>
      <div className="Element Element--page warehouse-company">
        <Company company={ {[warehouse.companyId]: company} } isPage />
      </div>
      <Tabs default="equipments" tabs={{
        equipments: {
          name: () => <span>
            <Icon source="fa" icon={faTruck} />
            Equipments
          </span>,
          content: () => <WarehouseEquipmentsTab warehouseId={WAREHOUSE_ID} />
        }
      }} />
    </div>
  );
};

export default WarehousePage;
