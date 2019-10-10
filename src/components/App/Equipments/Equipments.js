import React from 'react';
import { faTruck, faPlus } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import BrandService from './../../../services/entities/brand.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';
import EquipmentService from './../../../services/entities/equipment.service';

import Equipment from './../../Entities/Equipment/Equipment';
import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';

import ActionButton from './../../Utils/ActionButton/ActionButton';
import ExTable from './../../Utils/ExTable/ExTable';

import './Equipments.scss';

class Equipments extends ComponentSafeUpdate {
  constructor() {
    super();
    this.state = Object.assign({
      equipments: {},
      equipmentsLoading: true,
      equipmentModels: {},
      brands: {}}, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setStateSafe(computedValues, this.computeValues);
      })
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  }

  computeValues() {
    this.computeEquipments();
  }

  /**
   * EQUIPMENTS
   */
  computeEquipments = () => {
    BrandService.list()
      .then((brands) => this.setStateSafe({brands: brands}))
      .catch(ErrorService.manageError);

    EquipmentModelService.list()
      .then((equipmentModels => this.setStateSafe({equipmentModels: equipmentModels})))
      .catch(ErrorService.manageError);

    if(!!this.state.activeRole) {
      EquipmentService.getAllForCompanyId(this.state.activeRole.companyId)
        .then((equipments) => this.setStateSafe({equipments: equipments, equipmentsLoading: false}))
        .catch(ErrorService.manageError);
    }
  }

  /**
   * RENDER
   */
  renderEquipment = (mode, itemKey, itemData) => {
    var equipmentModel = {}, brand = {}, equipment = {};
    equipmentModel[itemData.equipmentModelId] = this.state.equipmentModels[itemData.equipmentModelId];
    brand[equipmentModel[itemData.equipmentModelId].brand] = this.state.brands[equipmentModel[itemData.equipmentModelId].brand];
    equipment[itemKey] = itemData;

    return <Equipment key={itemKey}
      equipment={equipment}
      brand={brand}
      equipmentModel={equipmentModel}
      options={ {} }
      showDetails={mode === 'active'} />
  }

  render() {
    return (
      <div className="Equipments">
        <Map></Map>
        <ExTable key="equipments" items={this.state.equipments} renderItem={this.renderEquipment} header={['Identification', 'Model']} loading={this.state.equipmentsLoading}></ExTable>
        <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
          {title: 'Add an equipment', icon: <Icon source="fa" icon={faTruck} />, link: `/equipment-add`}
        ]} />
      </div>
    );
  }
}

export default Equipments;
