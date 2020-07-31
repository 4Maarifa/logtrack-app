import React, { useState, useEffect } from 'react';
import { faTruck, faPlus } from '@fortawesome/pro-light-svg-icons';

import ActionButton from './../../Utils/ActionButton/ActionButton';
import ExTable from './../../Utils/ExTable/ExTable';
import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import EquipmentService from './../../../services/entities/equipment.service';

import Equipment, { equipmentsExTableFSS } from './../../Entities/Equipment/Equipment';

import { v4 as uuid } from 'uuid';

import './Equipments.scss';

/**
 * Component: Equipments
 * Used by managers to create and manage equipments
 */
const Equipments = () => {

  // Equipments, and their models
  const [equipments, setEquipments] = useState({});
  const [isEquipmentsLoading, setEquipmentsLoading] = useState(true);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    if(computed.activeRole) {        
      // Loading all equipments for the current company
      EquipmentService.getAllForCompanyId(computed.activeRole.companyId)
        .then(equipments => {
          setEquipments(equipments);

          // Triggering end of load
          setEquipmentsLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  }, [computed.activeRole]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderEquipment = (itemId, itemData) => <Equipment key={itemId} equipment={ {[itemId]: itemData} } />;

  return (
    <div className="Equipments">
      <Map />
      <ExTable key="equipments"
                fss={equipmentsExTableFSS}
                items={equipments}
                renderItem={renderEquipment}
                header={<span><Icon source="fa" icon={faTruck} /> Equipments</span>}
                loading={isEquipmentsLoading} />
      <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
        {title: 'Add an equipment', icon: <Icon source="fa" icon={faTruck} />, link: `/equipment-add`}
      ]} />
    </div>
  );
};

export default Equipments;
