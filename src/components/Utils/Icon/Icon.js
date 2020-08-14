import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ReactComponent as Brake } from './../../../assets/svg-sprites/brake.svg';
import { ReactComponent as BrakeDisk } from './../../../assets/svg-sprites/brake-disk.svg';
import { ReactComponent as BrakeDrum } from './../../../assets/svg-sprites/brake-drum.svg';
import { ReactComponent as BrakePad } from './../../../assets/svg-sprites/brake-pad.svg';
import { ReactComponent as BrakeMasterCylinder } from './../../../assets/svg-sprites/master-cylinder.svg';
import { ReactComponent as CarDoor } from './../../../assets/svg-sprites/car-door.svg';
import { ReactComponent as CarMirror } from './../../../assets/svg-sprites/car-mirror.svg';
import { ReactComponent as CarSeat } from './../../../assets/svg-sprites/car-seat.svg';
import { ReactComponent as CarSideWindow } from './../../../assets/svg-sprites/car-side-window.svg';
import { ReactComponent as Coil } from './../../../assets/svg-sprites/coil.svg';
import { ReactComponent as ColdGaz } from './../../../assets/svg-sprites/cold-gaz.svg';
import { ReactComponent as ConstructionMaterial } from './../../../assets/svg-sprites/construction.svg';
import { ReactComponent as Differential } from './../../../assets/svg-sprites/differential.svg';
import { ReactComponent as DoorClose } from './../../../assets/svg-sprites/door-close.svg';
import { ReactComponent as Doors } from './../../../assets/svg-sprites/doors.svg';
import { ReactComponent as ElectricEngine } from './../../../assets/svg-sprites/electric-engine.svg';
import { ReactComponent as Engine } from './../../../assets/svg-sprites/engine.svg';
import { ReactComponent as Exhaust } from './../../../assets/svg-sprites/exhaust-pipe.svg';
import { ReactComponent as FifthWheel } from './../../../assets/svg-sprites/fifth-wheel.svg';
import { ReactComponent as Fuel } from './../../../assets/svg-sprites/fuel.svg';
import { ReactComponent as FuelPump } from './../../../assets/svg-sprites/fuel-pump.svg';
import { ReactComponent as Fuse } from './../../../assets/svg-sprites/fuse.svg';
import { ReactComponent as Gearbox } from './../../../assets/svg-sprites/gearbox.svg';
import { ReactComponent as GearboxFork } from './../../../assets/svg-sprites/gearbox-fork.svg';
import { ReactComponent as Gimbal } from './../../../assets/svg-sprites/gimbal.svg';
import { ReactComponent as Hinge } from './../../../assets/svg-sprites/hinge.svg';
import { ReactComponent as Hook } from './../../../assets/svg-sprites/hook.svg';
import { ReactComponent as Hose } from './../../../assets/svg-sprites/hose.svg';
import { ReactComponent as Hydraulic } from './../../../assets/svg-sprites/hydraulic.svg';
import { ReactComponent as Injector } from './../../../assets/svg-sprites/injector.svg';
import { ReactComponent as Load } from './../../../assets/svg-sprites/load.svg';
import { ReactComponent as Obd } from './../../../assets/svg-sprites/obd.svg';
import { ReactComponent as Rim } from './../../../assets/svg-sprites/rim.svg';
import { ReactComponent as Rocks } from './../../../assets/svg-sprites/rocks.svg';
import { ReactComponent as Rope } from './../../../assets/svg-sprites/rope.svg';
import { ReactComponent as Sensor } from './../../../assets/svg-sprites/sensor.svg';
import { ReactComponent as Shaft } from './../../../assets/svg-sprites/shaft.svg';
import { ReactComponent as ShockAbsorber } from './../../../assets/svg-sprites/shock-absorber.svg';
import { ReactComponent as SilentBloc } from './../../../assets/svg-sprites/silent-bloc.svg';
import { ReactComponent as Spring } from './../../../assets/svg-sprites/spring.svg';
import { ReactComponent as Support } from './../../../assets/svg-sprites/support.svg';
import { ReactComponent as SuspensionLeaf } from './../../../assets/svg-sprites/suspension-leaf.svg';
import { ReactComponent as SuspensionTriangle } from './../../../assets/svg-sprites/suspension-triangle.svg';
import { ReactComponent as Tire } from './../../../assets/svg-sprites/tire.svg';
import { ReactComponent as TrailerHarness } from './../../../assets/svg-sprites/trailer-harness.svg';
import { ReactComponent as TrailerHook } from './../../../assets/svg-sprites/trailer-hook.svg';
import { ReactComponent as Winch } from './../../../assets/svg-sprites/winch.svg';
import { ReactComponent as Windshield } from './../../../assets/svg-sprites/windshield.svg';

import { ReactComponent as EnterKey } from './../../../assets/svg-sprites/enter-key.svg';
import { ReactComponent as LogTrack } from './../../../assets/svg-sprites/logtrack.svg';
import { ReactComponent as LogTrackAlt } from './../../../assets/svg-sprites/logtrack-alt.svg';
import { ReactComponent as LogTrackAlt2 } from './../../../assets/svg-sprites/logtrack-alt2.svg';

import ErrorService from './../../../services/error.service';

import './Icon.scss';


/* Declaring all custom icons */
export const CUSTOM_ICONS = {
  Brake,
  BrakeDisk,
  BrakeDrum,
  BrakePad,
  BrakeMasterCylinder,
  CarDoor,
  CarMirror,
  CarSeat,
  CarSideWindow,
  Coil,
  ColdGaz,
  ConstructionMaterial,
  Differential,
  DoorClose,
  Doors,
  ElectricEngine,
  Engine,
  Exhaust,
  FifthWheel,
  Fuel,
  FuelPump,
  Fuse,
  Gearbox,
  GearboxFork,
  Gimbal,
  Hinge,
  Hook,
  Hose,
  Hydraulic,
  Injector,
  Load,
  Obd,
  Rim,
  Rocks,
  Rope,
  Sensor,
  Shaft,
  ShockAbsorber,
  SilentBloc,
  Spring,
  Support,
  SuspensionLeaf,
  SuspensionTriangle,
  Tire,
  TrailerHarness,
  TrailerHook,
  Winch,
  Windshield,

  EnterKey,
  LogTrack,
  LogTrackAlt,
  LogTrackAlt2
};


/**
 * Component: Icon
 * Shows an icon.
 * /!\ Mandatory way to print an icon in the project.
 *     this component contains commom styles for all icons
 *     and ways to handle both custom and FontAwesome icons
 * 
 * source: 'fa'|'custom' | type of the icon
 * containerclassname: string | optional, applies a class to the icon container
 * icon: FA/IconReference | string | The icon itself
 * additionalSource: 'fa' | 'custom' | optional, source of additional
 * additional: FA/IconReference | a smaller FA icon to print next to the other icon
 * otherProps: object | other props to be passed to the icon. See FA docs for more
 */
const Icon = ({ source, containerclassname, icon, additionalSource, additional, ...otherProps }) => {

  const printAdditionalIcon = () => {
    if(!additional || !additionalSource) {
      return null;
    }

    if (additionalSource === 'fa') {
      return <div className="icon-2">
        <FontAwesomeIcon icon={additional} fixedWidth />
      </div>;
    }

    if (additionalSource === 'custom') {
      const IconTag = CUSTOM_ICONS[additional];

      if(!IconTag) {
        ErrorService.manageError(`Icon was requested a custom icon as additional one, but none was found with this name: ${additional}`);
        return null;
      }

      return <div className="icon-2">
        <IconTag className="custom-icon">Icon</IconTag>
      </div>;
    }

    ErrorService.manageError('Additional icon was requested to render with invalid source', {
      source: additionalSource,
      icon: additional
    });
    return null;
  };

  /**
   * RENDER
   */
  if(source === 'fa') {

    /* If source is FontAwesome, render the icon container as well as the inner icon */
    return (
      <div className={'Icon ' + (containerclassname || '')} {...otherProps}>
        {icon && <FontAwesomeIcon icon={icon} fixedWidth />}

        {/* If an additional icon is passed, print it */}
        {printAdditionalIcon()}
      </div>
    );
  }

  if(source === 'custom') {
    /* If source is custom, get the icon */
    const IconTag = CUSTOM_ICONS[icon];

    if(!IconTag) {
      ErrorService.manageError(`Icon was requested a custom icon, but none was found with this name: ${icon}`,);
      return null;
    }

    /* Then render it inside the icon container */
    return (
      <div className={'Icon ' + (containerclassname || '')} {...otherProps}>
        <IconTag className="custom-icon">Icon</IconTag>

        {/* If an additional icon is passed, print it */}
        {printAdditionalIcon()}
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
