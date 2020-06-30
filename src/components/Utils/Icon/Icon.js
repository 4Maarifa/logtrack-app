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

/**
 * Component: Icon
 * Shows an icon.
 * /!\ Mandatory way to print an icon in the project.
 *     this component contains commom styles for all icons
 *     and ways to handle both custom and FontAwesome icons
 * 
 * source: 'fa'|'custom' | type of the icon
 * containerclassname: string | optional, applies a class to the icon container
 * additional: FA/IconReference | a smaller FA icon to print next to the other icon
 * otherProps: object | other props to be passed to the icon. See FA docs for more
 */
const Icon = ({ source, containerclassname, icon, additional, ...otherProps }) => {

  /* Declaring all custom icons */
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

    /* If source is FontAwesome, render the icon container as well as the inner icon */
    return (
      <div className={'Icon ' + (containerclassname || '')}>
        {icon && <FontAwesomeIcon icon={icon} fixedWidth {...otherProps} />}

        {/* If an additional icon is passed, print it */}
        {additional && <div className="icon-2">
          <FontAwesomeIcon icon={additional} fixedWidth />
        </div>}
      </div>
    );
  }

  if(source === 'custom') {
    /* If source is custom, get the icon */
    const IconTag = CUSTOM_ICONS[icon];

    /* Then render it inside the icon container */
    return (
      <div className={'Icon ' + (containerclassname || '')}>
        <IconTag className="custom-icon">Icon</IconTag>
      </div>
    );
  }

  /* Handler other source */
  ErrorService.manageError('Icon was requested to render with invalid source', {
    source: source,
    icon: icon
  });

  /* And render nothing */
  return null;
};

export default Icon;
