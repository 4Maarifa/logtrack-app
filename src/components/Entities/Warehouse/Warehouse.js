import React, { useState, useEffect } from 'react';
import { faWarehouseAlt, faWarehouse, faEdit, faEye } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ActionList from './../../Utils/ActionList/ActionList';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';

import { ERole } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './Warehouse.scss';

/**
 * Component: Warehouse
 * Print warehouse details
 */
const Warehouse = ({ warehouse, isPage }) => {

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }
  if(!warehouse) { return null; }

  const WAREHOUSE_ID = Object.keys(warehouse)[0],
    WAREHOUSE_DATA = warehouse[WAREHOUSE_ID];

  // Compute actions
  const ACTIONS = [];

  // If current user is manager on the company, propose him to see details as well as edit the warehouse
  if(computed.activeRole.role === ERole.MANAGER && WAREHOUSE_DATA.companyId === computed.activeRole.companyId) {
    if(!isPage) {
      ACTIONS.push({ title: 'View', icon: <Icon source="fa" icon={faEye} />, link: `/warehouse/${WAREHOUSE_ID}` });
    }
    ACTIONS.push({title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/warehouse-edit/${WAREHOUSE_ID}`});
  }

  return (
    <div className="Warehouse Element-content">
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faWarehouseAlt} />
        <div className="Element-data">
          {/* Warehouse details */}
          <span className="Element-title">
            {/* Warehouse pagelink */}
            <PageLink type={PageLinkType.WAREHOUSE} entityId={WAREHOUSE_ID} white={isPage} entityData={WAREHOUSE_DATA} />
          </span>

          {/* Print nb loading docks */}
          {WAREHOUSE_DATA.nbLoadingDocks && <span className={'badge ' + (isPage ? 'badge-inverse' : '')}>
            <Icon source="fa" icon={faWarehouse} />
            {WAREHOUSE_DATA.nbLoadingDocks}
          </span>}
        </div>
        <div className="Element-actions">
          {/* Actions */}
          <ActionList actions={ACTIONS} isFlatten={isPage} />
        </div>
      </div>
    </div>
  );
};

// FSS for warehouses (used to filter, search and sort warehouses) => sort by name and nbLoading docls, search on name
export const warehousesExTableFSS = {
  sort: {
    name: {
      title: 'Name',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].name, items[key2].name)
      )),
      default: true
    },
    loadingDocks: {
      title: 'Nb Loading Docks',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].nbLoadingDocks, items[key2].nbLoadingDocks)
      ))
    }
  },
  search: (_, itemData, searchTerm) => (
    itemData.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
};

export default Warehouse;
