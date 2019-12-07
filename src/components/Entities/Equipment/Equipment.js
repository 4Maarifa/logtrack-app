import React from 'react';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import { EEquipmentModelSubTypeDetails } from './../../../classes/EquipmentModel';

import './Equipment.scss';

class Equipment extends ComponentSafeUpdate {

  /**
   * RENDER
   */
  render() {
    if(!this.props.equipment) {
      return (<></>);
    }

    var equipmentKey = Object.keys(this.props.equipment)[0], 
      brandKey = Object.keys(this.props.brand)[0], 
      equipmentModelKey = Object.keys(this.props.equipmentModel)[0];
    
    return (
      <div className="Equipment">
        <div className="base">
          <span>
            {EEquipmentModelSubTypeDetails[this.props.equipmentModel[equipmentModelKey].type][this.props.equipmentModel[equipmentModelKey].subType].icon}
            {this.props.equipment[equipmentKey].identification}
          </span>
          <span>
            {this.props.equipmentModel[equipmentModelKey].name}
          </span>
        </div>
        <div className="details">
          <img width="40" height="20" 
            alt={this.props.brand[brandKey].name + '\'s logo'} 
            src={this.props.brand[brandKey].logoUrl} />

          <img width="100" height="100" 
            alt={this.props.equipmentModel[equipmentModelKey].name} 
            src={this.props.equipmentModel[equipmentModelKey].photoUrl} />
        </div>
      </div>
    );
  }
}

export default Equipment;
