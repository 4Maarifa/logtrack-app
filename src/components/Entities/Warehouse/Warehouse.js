import React from 'react';
import { faWarehouseAlt, faWarehouse } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import './Warehouse.scss';

const Warehouse = ({ warehouse }) => {
  if(!warehouse) { return null; }

  const warehouseKey = Object.keys(warehouse)[0];

  return (
    <div className="Warehouse Element-content">
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faWarehouseAlt} />
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.WAREHOUSE} entityId={warehouseKey} entityData={warehouse[warehouseKey]} />
          </span>
          {warehouse[warehouseKey].nbLoadingDocks && <span className="badge">
            <Icon source="fa" icon={faWarehouse} />
            {warehouse[warehouseKey].nbLoadingDocks}
          </span>}
        </div>
      </div>
    </div>
  );
};

export default Warehouse;
