import React from 'react';

import { EEquipmentModelSubTypeDetails } from './../../../classes/EquipmentModel';

import './Equipment.scss';

const Equipment = ({ equipment, equipmentModel }) => {
  if(!equipment) { return null; }

  
  const equipmentKey = Object.keys(equipment)[0],
    equipmentModelKey = Object.keys(equipmentModel)[0];

  return (
    <div className="Equipment Element-content">
      <div className="Element-base">
        <span className="Element-badge badge">{EEquipmentModelSubTypeDetails[equipmentModel[equipmentModelKey].type][equipmentModel[equipmentModelKey].subType].icon}</span>
        <div className="Element-photo">
          <img
            alt={equipmentModel[equipmentModelKey].name} 
            src={equipmentModel[equipmentModelKey].photoUrl} />
        </div>
        <div className="Element-data">
          <span className="Element-title">{equipment[equipmentKey].identification}</span>
          <span className="Element-sub">{equipmentModel[equipmentModelKey].name}</span>
        </div>
      </div>
      <div className="Element-details"></div>
    </div>
  );
}

export default Equipment;
