import React, { useState, useEffect, useRef, Fragment } from 'react';
import { faImage, faTimes, faPlus, faTire, faExclamationTriangle, faDownload } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../../Utils/Icon/Icon';
import ActionButton from './../../../Utils/ActionButton/ActionButton';
import FormInputFile from './../../../Utils/FormElements/FormInputFile/FormInputFile';

import ColorService from './../../../../services/color.service';
import FileService from './../../../../services/file.service';

import { EEquipmentPart, EEquipmentPartTypeDetails, EEquipmentPartDetails } from './../../../../classes/enums/EEquipmentModel';
import UtilsService from './../../../../services/utils.service';
import ErrorService from './../../../../services/error.service';
import Tooltip, { ETooltipPosition } from '../../../Utils/Tooltip/Tooltip';
import ModalService from '../../../../services/modal.service';

const AdminEquipmentModelCreationTab = () => {

  const [equipmentModelImage, setEquipmentModelImage] = useState(null);

  const [partTypeSelected, setPartTypeSelected] = useState(null);
  const [partTypes, setPartTypes] = useState([]);

  const [partTooltipActive, setPartTooltipActive] = useState(null);

  const [imageDimensions, setImageDimensions] = useState(null);
  const IMAGE_REF = useRef(null);

  const addPart = e => {
    const POSITION = {
      x: Math.floor((e.nativeEvent.offsetX / IMAGE_REF.current.offsetWidth) * 100),
      y: Math.floor((e.nativeEvent.offsetY / IMAGE_REF.current.offsetHeight) * 100) };

    if(!partTypeSelected) {
      ErrorService.warning('No part selected');
      return;
    }

    setPartTypes(partTypes => {
      const NEW_PARTS = [...partTypes];
      
      NEW_PARTS.push({
        type: partTypeSelected,
        position: POSITION
      });

      return NEW_PARTS;
    });
  };

  const removePart = index => setPartTypes(partTypes => {
    let newParts = [...partTypes];

    newParts.splice(index, 1);

    return newParts;
  });

  useEffect(() => {
    if(equipmentModelImage) {
      FileService.getImageDimensions(equipmentModelImage.file)
        .then(setImageDimensions);
    }
  }, [equipmentModelImage]);
  
  return <div className="AdminEquipmentModelCreationTab">
    {equipmentModelImage ? 
      <div>
        {imageDimensions && imageDimensions.width !== imageDimensions.height ? <div className="Element Element--page">
            <div className="Company Element-content">
              <div className="Element-base">
                <Icon containerclassname="Element-icon" source="fa" icon={faExclamationTriangle} />
                <div className="Element-data">
                  <span className="Element-title">The image is not squared!</span>
                  <span>
                    By selecting a non-squared image, the resulting image might be cropped and / or scaled. Its aspect ratio is also not guaranteed.
                  </span>
                </div>
              </div>
            </div>
          </div> : null}

        <div className="container-image">
          <div>
            <img ref={IMAGE_REF} alt="New equipment model" src={equipmentModelImage.url} />

            <div className="img-overlay" onClick={addPart}></div>

            {partTypes.map((part, index) => {
              const COLOR = ColorService.getPaletteForColor([EEquipmentPartTypeDetails[EEquipmentPartDetails[part.type].parent].palette]).medium.color;

              const MASTER_TYPE = EEquipmentPartTypeDetails[EEquipmentPartDetails[part.type].parent].master;
              const MASTER_NODE = partTypes.filter(part => part.type === MASTER_TYPE)[0];
              const MASTER_POSITION = MASTER_NODE ? MASTER_NODE.position : null;

              const COORDS_TYPE = (!MASTER_POSITION || 
                (MASTER_POSITION.y > part.position.y && MASTER_POSITION.x > part.position.x) || 
                (MASTER_POSITION.y < part.position.y && MASTER_POSITION.x < part.position.x)) ? 'DESCENT' : 'CLIMB';

              const SVG_HEIGHT = MASTER_POSITION && MASTER_POSITION.y !== part.position.y ? 
                      (MASTER_POSITION.y > part.position.y) ? MASTER_POSITION.y - part.position.y : part.position.y - MASTER_POSITION.y : .4;
              const SVG_WIDTH = MASTER_POSITION && MASTER_POSITION.x !== part.position.x1 ?
                      (MASTER_POSITION.x > part.position.x) ? MASTER_POSITION.x - part.position.x : part.position.x - MASTER_POSITION.x : .4;
              
              return <Fragment key={index}>
                <span className="part" title={EEquipmentPartDetails[part.type].name} style={{
                  backgroundColor: COLOR,
                  top: `calc(${part.position.y}% - 1rem)`,
                  left: `calc(${part.position.x}% - 1rem)`
                }} onClick={() => removePart(index)}>
                  <Icon source={EEquipmentPartDetails[part.type].iconSource} icon={EEquipmentPartDetails[part.type].icon} />
                  <Icon containerclassname="delete-icon" source="fa" icon={faTimes} />
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
              </Fragment>;
            })}
          </div>
        </div>

        <div className="part-types">
          {Object.keys(EEquipmentPart)
            .sort((pt1, pt2) => UtilsService.compareFn(EEquipmentPartDetails[pt1].parent, EEquipmentPartDetails[pt2].parent))
            .map(partKey => {

            const COLOR = ColorService.getPaletteForColor([EEquipmentPartTypeDetails[EEquipmentPartDetails[partKey].parent].palette]).medium.color;
            const IS_ACTIVE = partTypeSelected === partKey;
          
            return <span key={partKey} title={EEquipmentPartDetails[partKey].name} style={{
              backgroundColor: IS_ACTIVE ? COLOR : '#FFFFFF',
              borderColor: COLOR,
              color: IS_ACTIVE ? '#FFFFFF' : COLOR
            }} onMouseEnter={() => setPartTooltipActive(partKey)}
              onMouseLeave={() => setPartTooltipActive(null)}
              onClick={() => setPartTypeSelected(IS_ACTIVE ? null : partKey)}>

              <Icon source={EEquipmentPartDetails[partKey].iconSource} icon={EEquipmentPartDetails[partKey].icon} />

              <Tooltip show={partTooltipActive === partKey}
                        tooltipPosition={ETooltipPosition.TOP} 
                        label={<span>{EEquipmentPartDetails[partKey].name}</span>} />
          </span>
        })}
        </div>

        <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
          { title: 'Reset', icon: <Icon source="fa" icon={faTimes} />, callback: () => {
            setEquipmentModelImage(null);
            setImageDimensions(null);
          }},
          { title: 'Remove all parts', icon: <Icon source="fa" icon={faTire} additionalSource="fa" additional={faTimes} />, callback: () => {
            setPartTypes([]);
          }},
          { title: 'Get configuration', icon: <Icon source="fa" icon={faDownload} />, callback: () => {
            ModalService.showModal('Current Configuration', JSON.stringify(partTypes), { actions: [] });
          }}
        ]} />
      </div> : 
      <div>
        <FormInputFile
          onValueChange={setEquipmentModelImage}
          value={equipmentModelImage}
          label={
            <span>
              <Icon source="fa" icon={faImage} />
              Equipment Photo
            </span>
          }
          instructions={
            <span>
              The new Equipment model photo
            </span>
          }
          accept="image/*" />
      </div>}
  </div>;
};

export default AdminEquipmentModelCreationTab;
