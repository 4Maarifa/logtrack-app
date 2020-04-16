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
      equipmentModelKey = Object.keys(this.props.equipmentModel)[0];
    
    return (
      <div className="Equipment Element-content">
        <div className="Element-base">
          <span className="Element-badge badge">{EEquipmentModelSubTypeDetails[this.props.equipmentModel[equipmentModelKey].type][this.props.equipmentModel[equipmentModelKey].subType].icon}</span>
          <div className="Element-photo">
            <img
              alt={this.props.equipmentModel[equipmentModelKey].name} 
              src={this.props.equipmentModel[equipmentModelKey].photoUrl} />
          </div>
          <div className="Element-data">
            <span className="Element-title">{this.props.equipment[equipmentKey].identification}</span>
            <span className="Element-sub">{this.props.equipmentModel[equipmentModelKey].name}</span>
          </div>
        </div>
        <div className="Element-details">

          
        </div>
      </div>
    );
  }
}

export default Equipment;
