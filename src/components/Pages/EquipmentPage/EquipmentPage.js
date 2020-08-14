import React, { useState, useEffect } from 'react';
import { faTruck } from '@fortawesome/pro-light-svg-icons';
import { faTruck as faTruckSolid } from '@fortawesome/pro-solid-svg-icons';

import ErrorService from './../../../services/error.service';
import EquipmentService from './../../../services/entities/equipment.service';

import Loader from './../../Utils/Loader/Loader';
import Tabs from './../../Utils/Tabs/Tabs';
import Icon from './../../Utils/Icon/Icon';

import Equipment from './../../Entities/Equipment/Equipment';

import './EquipmentPage.scss';

/**
 * Component: EquipmentPage
 * Use by everyone to see details about an equipment
 * 
 * You have to pass an equipment id
 */
const EquipmentPage = ({ match }) => {
  const EQUIPMENT_ID = match.params.equipmentid;

  // equipmnent
  const [equipment, setEquipment] = useState(null);

  useEffect(() => {

    // get the equipment
    EquipmentService.get(EQUIPMENT_ID)
      .then(equipmentDoc => {

        // save the equipment
        setEquipment(equipmentDoc.data());;
      })
      .catch(ErrorService.manageError);
  }, []);

  if(!equipment) {
    return (
      <div className="EquipmentPage">
        <Loader />
      </div>
    );
  }
  return (
    <div className="EquipmentPage">
      <div className="Element Element--page">
        <Equipment equipment={{[EQUIPMENT_ID]: equipment}} isPage />
      </div>
      <Tabs default="equipments" tabs={{
        equipments: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faTruckSolid : faTruck} />
            Equipment details
          </span>,
          content: () => null
        }
      }} />
    </div>
  );
};

export default EquipmentPage;
