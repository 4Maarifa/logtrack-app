import React, { useEffect, useState } from 'react';
import { faEdit } from '@fortawesome/pro-solid-svg-icons';

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

  const observerKey = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey);
  }, []);

  if(!computed.initialized) { return null; }
  if(!equipment) { return null; }

  
  const equipmentKey = Object.keys(equipment)[0],
    equipmentModelKey = Object.keys(equipmentModel)[0];

  /** 
   * RENDER
   */

  const actions = [];
  if(computed.activeRole.role === ERole.MANAGER && equipment[equipmentKey].companyId === computed.activeRole.companyId) {
    actions.push({title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/equipment-edit/${equipmentKey}`});
  }

  return (
    <div className="Equipment Element-content">
      <div className="Element-base">
        <span className={'Element-badge badge ' + (isPage ? 'badge-inverse' : '')}>{EEquipmentModelSubTypeDetails[equipmentModel[equipmentModelKey].type][equipmentModel[equipmentModelKey].subType].icon}</span>
        <div className="Element-photo">
          <img
            alt={equipmentModel[equipmentModelKey].name} 
            src={equipmentModel[equipmentModelKey].photoUrl} />
        </div>
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.EQUIPMENT} entityId={equipmentKey} entityData={equipment[equipmentKey]} white={isPage} />
          </span>
          <span className="sub">{equipmentModel[equipmentModelKey].name}</span>
        </div>
        <div className="Element-actions">
          <ActionList actions={actions} isFlatten={isPage} />
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
