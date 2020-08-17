import React, { useEffect, useState } from 'react';
import { faEdit } from '@fortawesome/pro-light-svg-icons';

import ActionList from './../../Utils/ActionList/ActionList';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import Radio from './../../Utils/FormElements/Radio/Radio';
import Checkbox from './../../Utils/FormElements/Checkbox/Checkbox';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';

import { EEquipmentModelDetails, EEquipmentModelSubTypeDetails } from './../../../classes/enums/EEquipmentModel';
import { ERole } from './../../../classes/Role';
import { EBrandDetails } from './../../../classes/enums/EBrand';

import { v4 as uuid } from 'uuid';

import './Equipment.scss';

/**
 * Component: Equipment
 * Print equipment details
 * 
 * You have to pass the related equipment model, fully popuplated!
 */
const Equipment = ({ equipment, isPage, selection }) => {

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // Parse data
  const EQUIPMENT_ID = Object.keys(equipment)[0],
    EQUIPMENT_DATA = equipment[EQUIPMENT_ID],
    EQUIPMENT_MODEL_DATA = EEquipmentModelDetails[EQUIPMENT_DATA.equipmentModelId];
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }
  if(!equipment) { return null; }

  /** 
   * RENDER
   */

  // Compute actions
  const ACTIONS = [];
  if(computed.activeRole.role === ERole.MANAGER && EQUIPMENT_DATA.companyId === computed.activeRole.companyId) {
    ACTIONS.push({title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/equipment-edit/${EQUIPMENT_ID}`});
  }

  return (
    <div className="Equipment Element-content">
      <div className="Element-base">

        {/* Print badge of the equipment model's type */}
        <span className={'Element-badge badge ' + (isPage ? 'badge-inverse' : '')} title={EEquipmentModelSubTypeDetails[EQUIPMENT_MODEL_DATA.type][EQUIPMENT_MODEL_DATA.subType].name}>
          {EEquipmentModelSubTypeDetails[EQUIPMENT_MODEL_DATA.type][EQUIPMENT_MODEL_DATA.subType].icon}
        </span>

        {selection ?
          <div className="Element-selection">
            {selection.multiple ? 
              <Checkbox
                value={selection.selected === EQUIPMENT_ID}
                fieldName={EQUIPMENT_ID}
                inputName="Equipment"
                onValueChange={selection.setSelected} /> :
              <Radio
                value={selection.selected}
                fieldName={EQUIPMENT_ID}
                inputName="Equipment"
                onValueChange={selection.setSelected} />}
          </div>
        : null}

        <div className="Element-photo">
          {/* Print equipment model picture */}
          <EquipmentModelImage equipmentModelId={EQUIPMENT_DATA.equipmentModelId} />
        </div>

        {/* Equipment details */}
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.EQUIPMENT} entityId={EQUIPMENT_ID} entityData={EQUIPMENT_DATA} white={isPage} />
          </span>
          <span className="sub">
            <EquipmentBrandImage brandId={EQUIPMENT_MODEL_DATA.brand} type="symbol" size="25" />
            {EQUIPMENT_MODEL_DATA.name}
          </span>
        </div>

        {/* Equipment actions */}
        <div className="Element-actions">
          <ActionList actions={ACTIONS} isFlatten={isPage} />
        </div>
      </div>
    </div>
  );
};

// FSS for equipments (used to filter, search and sort equipments) => sort on identification, search on identification
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

// Used to print dynamically an equipment model image
export const EquipmentModelImage = ({ equipmentModelId, className }) => {

  const [equipmentModelImage, setEquipmentModelImage] = useState(null);

  useEffect(() => {
    // at start, import the equipment model image
    import('./../../../assets/equipmentModels/' + EEquipmentModelDetails[equipmentModelId].image)
      .then(image => setEquipmentModelImage(image.default));
  }, []);

  // Then, print it as an <img />
  return <img alt={EEquipmentModelDetails[equipmentModelId].name} className={className} src={equipmentModelImage} />;
};

// Used to print dynamically an equipment brand image
// type is either color, mono or symbol
export const EquipmentBrandImage = ({ brandId, className = '', type, style, size, isDowngradeType = true }) => {

  const [inlineSvg, setInlineSvg] = useState(null);

  if(!EBrandDetails[brandId].icons[type] && isDowngradeType) {
    type = 'color';
  }

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/LogTrack/logtrack-app/master/src/assets/brands/${brandId}/${type}.svg`)
      .then(response => {
        if(!response.ok) {
          console.warn('An equipment brand was requested but does not exist!');
          return '';
        }

        return response.text();
      })
      .then(svg => {
        setInlineSvg(svg);
      });
  }, []);

  return <span className={'equipment-brand ' + className}
                style={{ ...style, maxHeight: `${size}px`, maxWidth: `${size}px`, fill: EBrandDetails[brandId].color }}
                dangerouslySetInnerHTML={{__html: inlineSvg}} />;

};

export default Equipment;
