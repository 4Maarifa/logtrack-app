import React from 'react';
import { faPlus, faWarehouse } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';
import ActionButton from './../../Utils/ActionButton/ActionButton';
import ExTable from './../../Utils/ExTable/ExTable';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import WarehouseService from './../../../services/entities/warehouse.service';

import Warehouse from './../../Entities/Warehouse/Warehouse';


import './Warehouses.scss';

class Warehouses extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      warehouses: {},
      warehousesLoading: true
    }, DataService.computed.getDefaultComputedValues());

    this.map = React.createRef();
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues(computedValues => {
        this.setState(computedValues, this.computeWarehouses);
      })
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  /**
   * WAREHOUSES
   */
  computeWarehouses = () => {
    if(!!this.state.activeRole) {
      WarehouseService.getAllForCompanyId(this.state.activeRole.companyId)
        .then(warehouses => {
          if(!!this.map.current) {
            Object.keys(warehouses).forEach(warehouseKey => {
              warehouses[warehouseKey].markerId = this.map.current.addMarker(
                warehouses[warehouseKey].latitude,
                warehouses[warehouseKey].longitude,
                warehouses[warehouseKey].name
              );
            });
            this.map.current.centerOnAllMarkers();
          }
          
          this.setState({warehouses: warehouses, warehousesLoading: false});
        })
        .catch(ErrorService.manageError);
    }
  };

  onSelectedItemChanged = itemId => {
    if(!itemId) {
      this.map.current.centerOnAllMarkers();
      return;
    }
    if(!!this.state.warehouses[itemId].markerId) {
      this.map.current.centerOnMarker(this.state.warehouses[itemId].markerId);
      this.map.current.triggerPopup(this.state.warehouses[itemId].markerId);
    }
  };

  /**
   * RENDER
   */
  renderWarehouse = (itemKey, itemData) => (
    <Warehouse key={itemKey}
      warehouse={ {[itemKey]: itemData} }
      options={ {} }
      showDetails={true} />
  );

  render() {
    return (
      <div className="Warehouses">
        <Map ref={this.map}></Map>
        <ExTable key="warehouses" 
                items={this.state.warehouses} 
                renderItem={this.renderWarehouse} 
                header={['Name', '']}
                onActivateItem={this.onSelectedItemChanged}
                loading={this.state.warehousesLoading}></ExTable>
        <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
          {title: 'Add a warehouse', icon: <Icon source="fa" icon={faWarehouse} />, link: `/warehouse-add`}
        ]} />
      </div>
    );
  }
}

export default Warehouses;
