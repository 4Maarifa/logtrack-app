import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

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

class Icon extends ComponentSafeUpdate {
  icons = {
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

  render() {
    if(this.props.source === 'fa') {
      return (
        <FontAwesomeIcon {...(!!this.props.withLabel ? {title: this.props.icon} : {})} 
          {...this.props}
          icon={this.props.icon} 
          fixedWidth />
      );
    }
    else if(this.props.source === 'custom') {
      const IconTag = this.icons[this.props.icon];
      return (
        <IconTag className="custom-icon">Icon</IconTag>
      );
    }
    else {
      ErrorService.manageError('Icon was requested to render with invalid source', {
        source: this.props.source,
        icon: this.props.icon
      });
      return null;
    }
  }
}

export default Icon;
