import React, { useState, useEffect } from 'react';
import { faWarehouseAlt } from '@fortawesome/pro-light-svg-icons';

import ErrorService from './../../../../services/error.service';
import WarehouseService from './../../../../services/entities/warehouse.service';

import Icon from './../../../Utils/Icon/Icon';
import ExTable from './../../../Utils/ExTable/ExTable';

import Warehouse, { warehousesExTableFSS } from './../../../Entities/Warehouse/Warehouse';

/**
 * Component: CompanyWarehousesTab
 * Tab of CompanyPage
 * 
 * used to get and print company's warehouses
 * you have to pass the company id
 */
const CompanyWarehousesTab = ({ companyId }) => {

  // warehouses of the company
  const [warehouses, setWarehouses] = useState({});
  const [isWarehousesLoading, setWarehousesLoading] = useState(true);

  useEffect(() => {
    if(companyId) {

      // get warehouses of the company
      WarehouseService.getAllForCompanyId(companyId)
        .then(warehouses => {

          // set warehouses
          setWarehouses(warehouses);

          // trigger end of load
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

  // render the warehouses extable
  return <ExTable key="warehouses"
                  fss={warehousesExTableFSS}
                  items={warehouses}
                  renderItem={renderWarehouse}
                  header={<span><Icon source="fa" icon={faWarehouseAlt} /> Warehouses</span>}
                  loading={isWarehousesLoading} />;
};

export default CompanyWarehousesTab;
