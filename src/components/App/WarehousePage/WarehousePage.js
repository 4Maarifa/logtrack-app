import React from 'react';
import { faWarehouse } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import DataService from './../../../services/data.service';
import CompanyService from './../../../services/entities/company.service';
import ErrorService from './../../../services/error.service';
import BrandService from './../../../services/entities/brand.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';
import EquipmentService from './../../../services/entities/equipment.service';
import WarehouseService from './../../../services/entities/warehouse.service';

import Loader from './../../Utils/Loader/Loader';
import Icon from './../../Utils/Icon/Icon';
import ExTable from './../../Utils/ExTable/ExTable';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import Equipment from './../../Entities/Equipment/Equipment';

import Colors from './../../../assets/Colors';

import './WarehousePage.scss';

/**
 * Component: WarehousePage
 * Use by everyone to see details about a warehouse (linked equipments)
 */
class WarehousePage extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      warehouseId: this.props.match.params.warehouseid,
      warehouse: null,
      company: null,
    
      equipments: {},
      equipmentsLoading: true,
      equipmentModels: {},
      brands: {}
    }, DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues(computedValues => {
        this.setState(computedValues, this.computeValues);
      })
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  computeValues() {
    WarehouseService.get(this.state.warehouseId)
      .then(warehouseDoc => this.setState({warehouse: warehouseDoc.data()}, () => {
        // Compute all data
        this.computeCompany();
        this.computeEquipments();
      }))
      .catch(ErrorService.manageError);
  };

  computeCompany = () => {
    if(!!this.state.warehouse) {
      CompanyService.get(this.state.warehouse.companyId)
        .then(companyDoc => this.setState({company: companyDoc.data()}))
        .catch(ErrorService.manageError);
    }
  };

  computeEquipments = () => {
    BrandService.list()
      .then(brands => this.setState({brands}))
      .catch(ErrorService.manageError);

    EquipmentModelService.list()
      .then((equipmentModels => this.setState({equipmentModels})))
      .catch(ErrorService.manageError);

    if(!!this.state.warehouseId) {
      EquipmentService.getAllForWarehouseId(this.state.warehouseId)
        .then(equipments => this.setState({equipments, equipmentsLoading: false}))
        .catch(ErrorService.manageError);
    }
  };

  /**
   * RENDER
   */
  renderEquipment = (itemKey, itemData) => {
    var equipmentModel = { [itemData.equipmentModelId]: this.state.equipmentModels[itemData.equipmentModelId] }, 
      brand = { [equipmentModel[itemData.equipmentModelId].brand]: this.state.brands[equipmentModel[itemData.equipmentModelId].brand] };

    return <Equipment key={itemKey}
      equipment={ {[itemKey]: itemData} }
      brand={brand}
      equipmentModel={equipmentModel}
      options={ {} }
      showDetails={true} />
  };

  render() {
    if(!this.state.warehouse || !this.state.company) {
      return (
        <div className="WarehousePage">
          <Loader></Loader>
        </div>
      );
    }
    return (
      <div className="WarehousePage">
        <div className="warehouse-header" style={{
          backgroundColor: (this.state.company.color || Colors.gray)
        }}>
          <h1>
            <Icon source="fa" icon={faWarehouse} />
            <PageLink type={PageLinkType.WAREHOUSE} entityId={this.state.warehouseId} entityData={this.state.warehouse} white />
          </h1>
          <div className="actions">
            
          </div>
        </div>
        <ExTable items={this.state.equipments} renderItem={this.renderEquipment} header={['Identification', 'Model']} loading={this.state.equipmentsLoading} />
      </div>
    );
  }
}

export default WarehousePage;
