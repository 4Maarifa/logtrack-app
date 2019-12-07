import React from 'react';
import { faTruck, faPlus } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import ActionButton from './../../Utils/ActionButton/ActionButton';
import ExTable from './../../Utils/ExTable/ExTable';
import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import BrandService from './../../../services/entities/brand.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';
import EquipmentService from './../../../services/entities/equipment.service';

import Equipment from './../../Entities/Equipment/Equipment';

import './Equipments.scss';

class Equipments extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({
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

  computeValues = () => {
    this.computeEquipments();
  };

  /**
   * EQUIPMENTS
   */
  computeEquipments = () => {
    BrandService.list()
      .then(brands => this.setState({brands}))
      .catch(ErrorService.manageError);

    EquipmentModelService.list()
      .then((equipmentModels => this.setState({equipmentModels})))
      .catch(ErrorService.manageError);

    if(!!this.state.activeRole) {
      EquipmentService.getAllForCompanyId(this.state.activeRole.companyId)
        .then(equipments => this.setState({equipments, equipmentsLoading: false}))
        .catch(ErrorService.manageError);
    }
  };

  /**
   * RENDER
   */
  renderEquipment = (itemKey, itemData) => {
    const equipmentModel = { [itemData.equipmentModelId]: this.state.equipmentModels[itemData.equipmentModelId] },
      brand = { [equipmentModel[itemData.equipmentModelId].brand]: this.state.brands[equipmentModel[itemData.equipmentModelId].brand] };

    return <Equipment key={itemKey}
      equipment={ {[itemKey]: itemData} }
      brand={brand}
      equipmentModel={equipmentModel}
      options={ {} }
      showDetails={true} />
  };

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
