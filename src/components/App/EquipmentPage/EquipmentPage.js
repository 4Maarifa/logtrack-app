import React, { useState, useEffect } from 'react';

import CompanyService from './../../../services/entities/company.service';
import ErrorService from './../../../services/error.service';
import EquipmentService from './../../../services/entities/equipment.service';

import Loader from './../../Utils/Loader/Loader';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import Colors from './../../../assets/Colors';

import './EquipmentPage.scss';

/**
 * Component: EquipmentPage
 * Use by everyone to see details about an equipment
 */
const EquipmentPage = ({ match }) => {
  const equipmentId = match.params.equipmentid;

  const [equipment, setEquipment] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => computeValues(), []);
  useEffect(() => computeCompany(), [equipment]);

  const computeValues = () => {
    EquipmentService.get(equipmentId)
      .then(equipmentDoc => setEquipment(equipmentDoc.data()))
      .catch(ErrorService.manageError);
  };

  const computeCompany = () => {
    if(equipment) {
      CompanyService.get(equipment.companyId)
        .then(companyDoc => setCompany(companyDoc.data()))
        .catch(ErrorService.manageError);
    }
  };

  if(!equipment || !company) {
    return (
      <div className="EquipmentPage">
        <Loader></Loader>
      </div>
    );
  }
  return (
    <div className="EquipmentPage">
      <div className="equipment-header" style={{
        backgroundColor: (company.color || Colors.gray)
      }}>
        <h1>
          <PageLink type={PageLinkType.EQUIPMENT} entityId={equipmentId} entityData={equipment} white />
        </h1>
        <div className="actions">
          
        </div>
      </div>
    </div>
  );
};

export default EquipmentPage;
