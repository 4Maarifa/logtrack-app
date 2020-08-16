import React, { useState, useEffect, Fragment } from 'react';
import { faTruck, faArrowLeft, faTachometer, faPlus } from '@fortawesome/pro-solid-svg-icons';
import { Redirect } from 'react-router-dom';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import ColorService from './../../../services/color.service';
import EquipmentService from './../../../services/entities/equipment.service';

import Icon from './../../Utils/Icon/Icon';
import ExTable from './../../Utils/ExTable/ExTable';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import Switch from './../../Utils/FormElements/Switch/Switch';

import Equipment, { equipmentsExTableFSS } from './../../Entities/Equipment/Equipment';

import { EEquipmentModelDetails, EEquipmentPartDetails, EEquipmentPartTypeDetails, EEquipmentModelSubTypeDetails, EEquipmentPartMaintenance } from './../../../classes/enums/EEquipmentModel';
import { EBrandDetails } from './../../../classes/enums/EBrand';

import { v4 as uuid } from 'uuid';

import './Maintenance.scss';
import { faAngleDown } from '@fortawesome/pro-light-svg-icons';

/**
 * component: Maintenance
 * Used by Mechanics for planned maintenance as well as repairs / fixes
 */
const Maintenance = () => {

  const [equipments, setEquipments] = useState({});
  const [isEquipmentsLoading, setEquipmentsLoading] = useState(true);

  const [isImageLowOpacity, setImageLowOpacity] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedPartIndex, setSelectedPartIndex] = useState(null);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    if(computed.initialized && computed.activeRole) {
      EquipmentService.getAllForCompanyId(computed.activeRole.companyId)
        .then(equipments => {
          setEquipments(equipments);
          setEquipmentsLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);
  
  if(!computed.initialized) { return null; }
  if(!computed.activeRole) {
    ErrorService.error('Please activate a role to go to maintenance');
    return <Redirect to={`/dashboard`} />;
  }

  /**
   * RENDER
   */
  const renderEquipment = (itemId, itemData) => {
    const SELECTION = {
      selected: selectedEquipment,
      setSelected: () => setSelectedEquipment(itemId),
      multiple: false
    };
    return <Equipment key={itemId} equipment={ {[itemId]: itemData} } selection={SELECTION} />;
  };

  const SELECTED_EQUIPMENT_DATA = selectedEquipment ? equipments[selectedEquipment] : null,
    SELECTED_EQUIPMENT_MODEL_DATA = selectedEquipment ? EEquipmentModelDetails[SELECTED_EQUIPMENT_DATA.equipmentModelId] : null,
    SelectedEquipmentBrandIconTag = selectedEquipment ? EBrandDetails[SELECTED_EQUIPMENT_MODEL_DATA.brand].icons.symbol ? EBrandDetails[SELECTED_EQUIPMENT_MODEL_DATA.brand].icons.symbol : EBrandDetails[SELECTED_EQUIPMENT_MODEL_DATA.brand].icons.mono : null;

  const SELECTED_PART = SELECTED_EQUIPMENT_MODEL_DATA && selectedPartIndex !== null ? EEquipmentPartDetails[SELECTED_EQUIPMENT_MODEL_DATA.parts[selectedPartIndex].type] : null,
    SELECTED_PART_COLOR = SELECTED_EQUIPMENT_MODEL_DATA && selectedPartIndex !== null ? ColorService.getPaletteForColor(EEquipmentPartTypeDetails[SELECTED_PART.parent].palette).medium.color : null;


  return <div className="Maintenance">
    {selectedEquipment ? <div className={'selected-equipment ' + (selectedPartIndex != null ? 'selected-equipment--part' : '')}>
      <div className="selected-equipment-topbar">
        <button className="btn-previous" onClick={() => {
          setSelectedPartIndex(null);
          setSelectedEquipment(null);
        }}>
          <Icon source="fa" icon={faArrowLeft} />
        </button>
        <button className="btn-more">
          <Icon source="fa" icon={faPlus} />
        </button>
        <div className="equipment-name">
          <PageLink type={PageLinkType.EQUIPMENT} entityId={selectedEquipment} entityData={SELECTED_EQUIPMENT_DATA} />
          <span className="equipment-brand">
            <SelectedEquipmentBrandIconTag
                alt={EBrandDetails[SELECTED_EQUIPMENT_MODEL_DATA.brand].name}
                title={EBrandDetails[SELECTED_EQUIPMENT_MODEL_DATA.brand].name}
                style={{ fill: EBrandDetails[SELECTED_EQUIPMENT_MODEL_DATA.brand].color }} />
            <span className="sub">{SELECTED_EQUIPMENT_MODEL_DATA.name}</span>
          </span>
        </div>
        <div className="equipment-clearfix"></div>
        <div className="equipment-props">
          <span className="sub">{EEquipmentModelSubTypeDetails[SELECTED_EQUIPMENT_MODEL_DATA.type][SELECTED_EQUIPMENT_MODEL_DATA.subType].name}</span>
          <span className="sub">
            <Icon source="fa" icon={faTachometer} />
            <span>Unknown</span>
          </span>
        </div>
        <div className="equipment-icon" title={EEquipmentModelSubTypeDetails[SELECTED_EQUIPMENT_MODEL_DATA.type][SELECTED_EQUIPMENT_MODEL_DATA.subType].name}>
          {EEquipmentModelSubTypeDetails[SELECTED_EQUIPMENT_MODEL_DATA.type][SELECTED_EQUIPMENT_MODEL_DATA.subType].icon}
        </div>
      </div>
      <div className="selected-equipment-image">
        <div className="selected-equipment-image-content">
          <img className={'' + (isImageLowOpacity ? 'img-low-opacity' : '')} src={SELECTED_EQUIPMENT_MODEL_DATA.image} alt={SELECTED_EQUIPMENT_MODEL_DATA.name} />
          <div className="overlay">
            {SELECTED_EQUIPMENT_MODEL_DATA.parts.map((part, index) => {
              const COLOR = ColorService.getPaletteForColor([EEquipmentPartTypeDetails[EEquipmentPartDetails[part.type].parent].palette]).medium.color;

              const MASTER_TYPE = EEquipmentPartTypeDetails[EEquipmentPartDetails[part.type].parent].master;
              const MASTER_NODE = SELECTED_EQUIPMENT_MODEL_DATA.parts.filter(part => part.type === MASTER_TYPE)[0];
              const MASTER_POSITION = MASTER_NODE ? MASTER_NODE.position : null;

              const COORDS_TYPE = (!MASTER_POSITION || 
                (MASTER_POSITION.y > part.position.y && MASTER_POSITION.x > part.position.x) || 
                (MASTER_POSITION.y < part.position.y && MASTER_POSITION.x < part.position.x)) ? 'DESCENT' : 'CLIMB';

              const SVG_HEIGHT = MASTER_POSITION && MASTER_POSITION.y !== part.position.y ? 
                      (MASTER_POSITION.y > part.position.y) ? MASTER_POSITION.y - part.position.y : part.position.y - MASTER_POSITION.y : .4;
              const SVG_WIDTH = MASTER_POSITION && MASTER_POSITION.x !== part.position.x1 ?
                      (MASTER_POSITION.x > part.position.x) ? MASTER_POSITION.x - part.position.x : part.position.x - MASTER_POSITION.x : .4;

              return <Fragment key={index}>
                <span className={'part ' + (selectedPartIndex === index ? 'part--selected' : '')} title={EEquipmentPartDetails[part.type].name} style={{
                  backgroundColor: COLOR,
                  top: `calc(${part.position.y}% - ${selectedPartIndex === index ? '1.5' : '1'}rem)`,
                  left: `calc(${part.position.x}% - ${selectedPartIndex === index ? '1.5' : '1'}rem)`
                }} onClick={() => setSelectedPartIndex(p => p === index ? null : index)}>
                  <Icon source={EEquipmentPartDetails[part.type].iconSource} icon={EEquipmentPartDetails[part.type].icon} />
                </span>

                {(part.type !== MASTER_TYPE && MASTER_POSITION) ? <svg className="link" viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} key={`${MASTER_TYPE} - ${part.type} - ${index}`} style={{
                  top: `${(MASTER_POSITION.y > part.position.y) ? part.position.y : MASTER_POSITION.y}%`,
                  left: `${(MASTER_POSITION.x > part.position.x) ? part.position.x : MASTER_POSITION.x}%`,
                  height: `${SVG_HEIGHT}%`,
                  width: `${SVG_WIDTH}%`
                }}>
                  <line x1="0" y1={COORDS_TYPE === 'CLIMB' ? SVG_HEIGHT : '0'} x2={SVG_WIDTH} y2={COORDS_TYPE === 'CLIMB' ? '0' : SVG_HEIGHT} style={{
                    stroke: COLOR,
                    strokeWidth: .5
                  }}></line>
                </svg> : null}
              </Fragment>
            })}
          </div>
        </div>
        <div className="selected-equipment-image-options">
          <Switch value={isImageLowOpacity} onChange={setImageLowOpacity} label="Low opacity mode" />
        </div>
      </div>
      <div className="selected-equipment-current">

        {selectedPartIndex !== null ? <div className="category">
          <button className="close-current" onClick={() => setSelectedPartIndex(null)} style={{ backgroundColor: SELECTED_PART_COLOR }}>
            <Icon source="fa" icon={faAngleDown} />
          </button>
          <h2 style={{ color: SELECTED_PART_COLOR }}>
            <Icon source={SELECTED_PART.iconSource} icon={SELECTED_PART.icon} />
            <span>{SELECTED_PART.name}</span>
          </h2>
          <ul>
            {Object.keys(EEquipmentPartMaintenance)
              .filter(p => EEquipmentPartMaintenance[p].parent === SELECTED_EQUIPMENT_MODEL_DATA.parts[selectedPartIndex].type)
              .map(p => <li key={p} style={{ borderColor: SELECTED_PART_COLOR }}>
                <span style={{ color: SELECTED_PART_COLOR }}>
                  <Icon source={EEquipmentPartMaintenance[p].mainSource ? EEquipmentPartMaintenance[p].mainSource : SELECTED_PART.iconSource}
                        icon={EEquipmentPartMaintenance[p].mainIcon ? EEquipmentPartMaintenance[p].mainIcon : SELECTED_PART.icon}
                        additionalSource={EEquipmentPartMaintenance[p].subSource ? EEquipmentPartMaintenance[p].subSource : null}
                        additional={EEquipmentPartMaintenance[p].subIcon ? EEquipmentPartMaintenance[p].subIcon : null} />
                </span>
                <span>{EEquipmentPartMaintenance[p].name}</span>
              </li>)}
          </ul>
        </div> : null}
      </div>
    </div> :
      <ExTable key="equipments"
                fss={equipmentsExTableFSS}
                items={equipments}
                renderItem={renderEquipment}
                header={<span><Icon source="fa" icon={faTruck} /> Equipments</span>}
                loading={isEquipmentsLoading} />}
  </div>;
};

export default Maintenance;
