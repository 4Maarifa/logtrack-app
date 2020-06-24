import React, { useEffect, useState } from 'react';
import { faEdit } from '@fortawesome/pro-light-svg-icons';

import ActionList from './../../Utils/ActionList/ActionList';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';

import { EEquipmentModelSubTypeDetails } from './../../../classes/EquipmentModel';
import { ERole } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './Equipment.scss';

const Equipment = ({ equipment, equipmentModel, isPage }) => {

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }
  if(!equipment) { return null; }

  
  const EQUIPMENT_ID = Object.keys(equipment)[0],
    EQUIPMENT_DATA = equipment[EQUIPMENT_ID],
    EQUIPMENT_MODEL_DATA = equipmentModel[Object.keys(equipmentModel)[0]];

  /** 
   * RENDER
   */

  const ACTIONS = [];
  if(computed.activeRole.role === ERole.MANAGER && EQUIPMENT_DATA.companyId === computed.activeRole.companyId) {
    ACTIONS.push({title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/equipment-edit/${EQUIPMENT_ID}`});
  }

  return (
    <div className="Equipment Element-content">
      <div className="Element-base">
        <span className={'Element-badge badge ' + (isPage ? 'badge-inverse' : '')}>{EEquipmentModelSubTypeDetails[EQUIPMENT_MODEL_DATA.type][EQUIPMENT_MODEL_DATA.subType].icon}</span>
        <div className="Element-photo">
          <img
            alt={EQUIPMENT_MODEL_DATA.name} 
            src={EQUIPMENT_MODEL_DATA.photoUrl} />
        </div>
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.EQUIPMENT} entityId={EQUIPMENT_ID} entityData={EQUIPMENT_DATA} white={isPage} />
          </span>
          <span className="sub">{EQUIPMENT_MODEL_DATA.name}</span>
        </div>
        <div className="Element-actions">
          <ActionList actions={ACTIONS} isFlatten={isPage} />
        </div>
      </div>
    </div>
  );
};

export const equipmentsExTableFSS = {
  sort: {
    identification: {
      title: 'Identification',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].identification, items[key2].identification)
      )),
      default: true
    }
  },
  search: (_, itemData, searchTerm) => (
    itemData.identification.toLowerCase().includes(searchTerm.toLowerCase())
  )
};

export default Equipment;
