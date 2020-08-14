import React, { useState, useEffect } from 'react';
import { faTruck } from '@fortawesome/pro-light-svg-icons';

import ErrorService from './../../../../services/error.service';
import EquipmentService from './../../../../services/entities/equipment.service';

import Icon from './../../../Utils/Icon/Icon';
import ExTable from './../../../Utils/ExTable/ExTable';

import Equipment, { equipmentsExTableFSS } from './../../../Entities/Equipment/Equipment';

/**
 * Component: CompanyEquipmentsTab
 * Tab of CompanyPage
 * 
 * used to get and show company's equipments
 * You have to pass the company id
 */
const CompanyEquipmentsTab = ({ companyId }) => {

  // company's equipments
  const [equipments, setEquipments] = useState({});
  const [isEquipmentsLoading, setEquipmentsLoading] = useState(true);

  useEffect(() => {
    if(companyId) {
      // get all equipments of company
      EquipmentService.getAllForCompanyId(companyId)
        .then(equipments => {

          // set equipments
          setEquipments(equipments);

          // trigger end of load
          setEquipmentsLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  }, [companyId]);

  /**
   * RENDER
   */
  const renderEquipment = (itemId, itemData) => <Equipment key={itemId} equipment={ {[itemId]: itemData} } options={ {} } showDetails />;

  // render the equipments extable
  return <ExTable key="equipments"
                  fss={equipmentsExTableFSS}
                  items={equipments}
                  renderItem={renderEquipment}
                  header={<span><Icon source="fa" icon={faTruck} /> Equipments</span>}
                  loading={isEquipmentsLoading}/>;
};

export default CompanyEquipmentsTab;
