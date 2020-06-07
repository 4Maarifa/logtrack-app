import React, { useState, useEffect } from 'react';
import { faTruck } from '@fortawesome/pro-solid-svg-icons';

import ErrorService from './../../../services/error.service';
import EquipmentService from './../../../services/entities/equipment.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';

import Loader from './../../Utils/Loader/Loader';
import Tabs from './../../Utils/Tabs/Tabs';
import Icon from './../../Utils/Icon/Icon';

import Equipment from './../../Entities/Equipment/Equipment';

import './EquipmentPage.scss';

/**
 * Component: EquipmentPage
 * Use by everyone to see details about an equipment
 */
const EquipmentPage = ({ match }) => {
  const equipmentId = match.params.equipmentid;

  const [equipment, setEquipment] = useState(null);
  const [equipmentModel, setEquipmentModel] = useState(null);

  useEffect(() => {
    EquipmentService.get(equipmentId)
      .then(equipmentDoc => {
        setEquipment(equipmentDoc.data());
        
        EquipmentModelService.get(equipmentDoc.data().equipmentModelId)
          .then(equipmentModelDoc => setEquipmentModel(equipmentModelDoc.data()))
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  }, []);

  if(!equipment || !equipmentModel) {
    return (
      <div className="EquipmentPage">
        <Loader />
      </div>
    );
  }
  return (
    <div className="EquipmentPage">
      <div className="Element Element--page">
        <Equipment equipment={{[equipmentId]: equipment}} equipmentModel={{[equipment.equipmentModelId]: equipmentModel}} isPage />
      </div>
      <Tabs default="equipments" tabs={{
        equipments: {
          name: () => <span>
            <Icon source="fa" icon={faTruck} />
            Equipment details
          </span>,
          content: () => null
        }
      }} />
    </div>
  );
};

export default EquipmentPage;
