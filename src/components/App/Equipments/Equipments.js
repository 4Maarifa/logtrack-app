import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faPlus } from '@fortawesome/pro-solid-svg-icons';

import DataService from '../../../services/data.service';
import ErrorService from '../../../services/error.service';

import Equipment from '../../Entities/Equipment/Equipment';

import ActionButton from '../../Utils/ActionButton/ActionButton';
import ExTable from '../../Utils/ExTable/ExTable';

import './Equipments.scss';

class Equipments extends Component {
  constructor() {
    super();
    this.state = Object.assign({
      equipments: {},
      equipmentModels: {},
      brands: {}}, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    this.setState({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setState(computedValues, this.computeValues);
      })
    });
  }

  componentWillUnmount = () => {
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  }

  computeValues() {
    this.computeEquipments();
  }

  /**
   * EQUIPMENTS
   */
  computeEquipments = () => {
    DataService.brand.getAll()
      .then((brands) => this.setState({brands: brands}))
      .catch(ErrorService.manageError);

    DataService.equipmentModel.getAll()
      .then((equipmentModels => this.setState({equipmentModels: equipmentModels})))
      .catch(ErrorService.manageError);

    if(!!this.state.activeRole) {
      DataService.equipment.getAllForCompanyId(this.state.activeRole.companyId)
        .then((equipments) => this.setState({equipments: equipments}))
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
      equipmentModel={equipmentModel} />
  }

  render() {
    return (
      <div>
        <ExTable key="equipments" items={this.state.equipments} renderItem={this.renderEquipment}></ExTable>
        <ActionButton icon={<FontAwesomeIcon icon={faPlus} />} actions={[
          {title: 'Add an equipment', icon: <FontAwesomeIcon icon={faTruck} />, link: `/equipment/add`}
        ]} />
      </div>
    );
  }
}

export default Equipments;
