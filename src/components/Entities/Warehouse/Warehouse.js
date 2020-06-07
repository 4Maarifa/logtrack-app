import React, { useState, useEffect } from 'react';
import { faWarehouseAlt, faWarehouse, faEdit, faEye } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ActionList from './../../Utils/ActionList/ActionList';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';

import { ERole } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './Warehouse.scss';

const Warehouse = ({ warehouse, isPage }) => {

  const observerKey = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey);
  }, []);

  if(!computed.initialized) { return null; }
  if(!warehouse) { return null; }

  const warehouseKey = Object.keys(warehouse)[0];

  const actions = [];
  if(computed.activeRole.role === ERole.MANAGER && warehouse[warehouseKey].companyId === computed.activeRole.companyId) {
    if(!isPage) {
      actions.push({ title: 'View', icon: <Icon source="fa" icon={faEye} />, link: `/warehouse/${warehouseKey}` });
    }
    actions.push({title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/warehouse-edit/${warehouseKey}`});
  }

  return (
    <div className="Warehouse Element-content">
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faWarehouseAlt} />
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.WAREHOUSE} entityId={warehouseKey} white={isPage} entityData={warehouse[warehouseKey]} />
          </span>
          {warehouse[warehouseKey].nbLoadingDocks && <span className={'badge ' + (isPage ? 'badge-inverse' : '')}>
            <Icon source="fa" icon={faWarehouse} />
            {warehouse[warehouseKey].nbLoadingDocks}
          </span>}
        </div>
        <div className="Element-actions">
          <ActionList actions={actions} isFlatten={isPage} />
        </div>
      </div>
    </div>
  );
};

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
