import React from 'react';
import { faWarehouse } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import DataService from './../../../services/data.service';
import CompanyService from './../../../services/entities/company.service';
import ErrorService from './../../../services/error.service';
import BrandService from './../../../services/entities/brand.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';
import EquipmentService from './../../../services/entities/equipment.service';

import Loader from './../../Utils/Loader/Loader';
import Icon from './../../Utils/Icon/Icon';
import ExTable from './../../Utils/ExTable/ExTable';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import Colors from './../../../assets/Colors';

import './EquipmentPage.scss';
import WarehouseService from './../../../services/entities/warehouse.service';

/**
 * Component: EquipmentPage
 * Use by everyone to see details about an equipment
 */
class EquipmentPage extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      equipmentId: this.props.match.params.equipmentid,
      equipment: null,
      linkedWarehouse: null,
      company: null,

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
    EquipmentService.get(this.state.equipmentId)
      .then(equipmentDoc => this.setState({equipment: equipmentDoc.data()}, () => {
        // Compute all data
        this.computeCompany();
        this.computeLinkedWarehouse();
        this.computeEquipmentModels();
      }))
      .catch(ErrorService.manageError);
  };

  computeCompany = () => {
    if(!!this.state.equipment) {
      CompanyService.get(this.state.equipment.companyId)
        .then(companyDoc => this.setState({company: companyDoc.data()}))
        .catch(ErrorService.manageError);
    }
  };

  computeLinkedWarehouse = () => {
    if(!!this.state.equipment && !!this.state.equipment.warehouseId) {
      WarehouseService.get(this.state.equipment.warehouseId)
        .then(warehouseDoc => this.setState({linkedWarehouse: warehouseDoc.data()}))
        .catch(ErrorService.manageError);
    }
  };

  computeEquipmentModels = () => {
    BrandService.list()
      .then(brands => this.setState({brands}))
      .catch(ErrorService.manageError);

    EquipmentModelService.list()
      .then((equipmentModels => this.setState({equipmentModels})))
      .catch(ErrorService.manageError);
  };

  /**
   * RENDER
   */
  render() {
    if(!this.state.equipment || !this.state.company) {
      return (
        <div className="EquipmentPage">
          <Loader></Loader>
        </div>
      );
    }
    return (
      <div className="EquipmentPage">
        <div className="equipment-header" style={{
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

export default EquipmentPage;
