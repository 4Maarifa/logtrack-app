import React from 'react';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import { EEquipmentModelSubTypeDetails } from './../../../classes/EquipmentModel';

import './Equipment.scss';

class Equipment extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = {
      equipment: props.equipment,
      brand: props.brand,
      equipmentModel: props.equipmentModel,

      options: props.options,
      showDetails: props.showDetails
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  shouldComponentUpdate(nextProps, _) {
    if(!this.state.equipment || nextProps.equipment.equipmentKey !== this.state.equipment.equipmentKey) {
      this.setState({equipment: nextProps.equipment});
    }
    if(!this.state.equipmentModel || nextProps.equipmentModel.equipmentModelKey !== this.state.equipmentModel.equipmentModelKey) {
      this.setState({equipmentModel: nextProps.equipmentModel});
    }
    if(nextProps.showDetails !== this.state.showDetails) {
      this.setState({showDetails: nextProps.showDetails});
    }
    return true;
  };

  /**
   * RENDER
   */
  render() {
    if(!this.state.equipment) {
      return (<></>);
    }

    var equipmentKey = Object.keys(this.state.equipment)[0], 
      brandKey = Object.keys(this.state.brand)[0], 
      equipmentModelKey = Object.keys(this.state.equipmentModel)[0];
    
    return (
      <div className="Equipment">
        <div className="base">
          <span>
            {EEquipmentModelSubTypeDetails[this.state.equipmentModel[equipmentModelKey].type][this.state.equipmentModel[equipmentModelKey].subType].icon}
            {this.state.equipment[equipmentKey].identification}
          </span>
          <span>
            {this.state.equipmentModel[equipmentModelKey].name}
          </span>
        </div>
        {!!this.state.showDetails && <div className="details">
          <img width="40" height="20" 
            alt={this.state.brand[brandKey].name + '\'s logo'} 
            src={this.state.brand[brandKey].logoUrl} />

          <img width="100" height="100" 
            alt={this.state.equipmentModel[equipmentModelKey].name} 
            src={this.state.equipmentModel[equipmentModelKey].photoUrl} />
        </div>}
      </div>
    );
  }
}

export default Equipment;
