import React, { useState, useEffect } from 'react';
import { faWarehouseAlt } from '@fortawesome/pro-solid-svg-icons';

import ErrorService from './../../../../services/error.service';
import WarehouseService from './../../../../services/entities/warehouse.service';

import Icon from './../../../Utils/Icon/Icon';
import ExTable from './../../../Utils/ExTable/ExTable';

import Warehouse, { warehousesExTableFSS } from './../../../Entities/Warehouse/Warehouse';

/**
 * Component: CompanyWarehousesTab
 */
const CompanyWarehousesTab = ({ companyId }) => {  
  const [warehouses, setWarehouses] = useState({});
  const [isWarehousesLoading, setWarehousesLoading] = useState(true);

  useEffect(() => {
    if(companyId) {
      WarehouseService.getAllForCompanyId(companyId)
        .then(warehouses => {
          setWarehouses(warehouses);
          setWarehousesLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  }, [companyId]);

  /**
   * RENDER
   */
  const renderWarehouse = (itemId, itemData) => (
    <Warehouse key={itemId}
      warehouse={ {[itemId]: itemData} }
      options={ {} }
      showDetails />
  );

  return <ExTable key="warehouses"
                  fss={warehousesExTableFSS}
                  items={warehouses}
                  renderItem={renderWarehouse}
                  header={<span><Icon source="fa" icon={faWarehouseAlt} /> Warehouses</span>}
                  loading={isWarehousesLoading} />;
};

export default CompanyWarehousesTab;
