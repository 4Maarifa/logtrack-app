import React from 'react';
import { faPlus, faWarehouse } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import WarehouseService from './../../../services/entities/warehouse.service';

import Warehouse from './../../Entities/Warehouse/Warehouse';
import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';

import ActionButton from './../../Utils/ActionButton/ActionButton';
import ExTable from './../../Utils/ExTable/ExTable';

import './Warehouses.scss';

class Warehouses extends ComponentSafeUpdate {
  constructor() {
    super();
    this.state = Object.assign({
      warehouses: {},
      warehousesLoading: true}, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setStateSafe(computedValues, this.computeWarehouses);
      })
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  }

  /**
   * WAREHOUSES
   */
  computeWarehouses = () => {
    if(!!this.state.activeRole) {
      WarehouseService.getAllForCompanyId(this.state.activeRole.companyId)
        .then((warehouses) => this.setStateSafe({warehouses: warehouses, warehousesLoading: false}))
        .catch(ErrorService.manageError);
    }
  }

  /**
   * RENDER
   */
  renderWarehouse = (mode, itemKey, itemData) => {
    var warehouse = {};
    warehouse[itemKey] = itemData;

    return <Warehouse key={itemKey}
      warehouse={warehouse}
      options={ {} }
      showDetails={mode === 'active'} />
  }

  render() {
    return (
      <div className="Warehouses">
        <Map></Map>
        <ExTable key="warehouses" items={this.state.warehouses} renderItem={this.renderWarehouse} header={['Name', '']} loading={this.state.warehousesLoading}></ExTable>
        <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
          {title: 'Add a warehouse', icon: <Icon source="fa" icon={faWarehouse} />, link: `/warehouse-add`}
        ]} />
      </div>
    );
  }
}

export default Warehouses;
