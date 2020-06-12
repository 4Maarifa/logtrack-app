import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ReactComponent as Spring } from './../../../assets/svg-sprites/spring.svg';
import { ReactComponent as Fuel } from './../../../assets/svg-sprites/fuel.svg';
import { ReactComponent as Exhaust } from './../../../assets/svg-sprites/exhaust-pipe.svg';
import { ReactComponent as CarSeat } from './../../../assets/svg-sprites/car-seat.svg';
import { ReactComponent as CarDoor } from './../../../assets/svg-sprites/car-door.svg';
import { ReactComponent as Brake } from './../../../assets/svg-sprites/brake.svg';
import { ReactComponent as Engine } from './../../../assets/svg-sprites/engine.svg';
import { ReactComponent as Gearbox } from './../../../assets/svg-sprites/gearbox.svg';
import { ReactComponent as FifthWheel } from './../../../assets/svg-sprites/fifth-wheel.svg';
import { ReactComponent as ConstructionMaterial } from './../../../assets/svg-sprites/construction.svg';
import { ReactComponent as Rocks } from './../../../assets/svg-sprites/rocks.svg';

import { ReactComponent as EnterKey } from './../../../assets/svg-sprites/enter-key.svg';

import ErrorService from './../../../services/error.service';

import './Icon.scss';

const Icon = ({ source, containerclassname, icon, additional, ...otherProps }) => {
  const CUSTOM_ICONS = {
    Spring,
    Fuel,
    Exhaust,
    CarSeat,
    CarDoor,
    Brake,
    Engine,
    Gearbox,
    FifthWheel,
    ConstructionMaterial,
    Rocks,
    EnterKey
  };

  /**
   * RENDER
   */
  if(source === 'fa') {
    return (
      <div className={'Icon ' + (containerclassname || '')}>
        {icon && <FontAwesomeIcon icon={icon} fixedWidth {...otherProps} />}
        {additional && <div className="icon-2">
          <FontAwesomeIcon icon={additional} fixedWidth />
        </div>}
      </div>
    );
  }
  if(source === 'custom') {
    let IconTag = CUSTOM_ICONS[icon];
    return (
      <div className="Icon">
        <IconTag className="custom-icon">Icon</IconTag>
      </div>
    );
  }
  ErrorService.manageError('Icon was requested to render with invalid source', {
    source: source,
    icon: icon
  });
  return null;
};

export default Icon;
