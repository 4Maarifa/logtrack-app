import React from 'react';
import { faCarWash, faWrench, faWeight, faParking, faUtensils, faBed, faPause, faGasPump, faChargingStation, faCalendarTimes, faReply, faShare, faPlay, faSteeringWheel, faToolbox, faClock, faShippingFast, faShippingTimed, faArrowAltToRight, faArrowAltFromLeft, faTruck, faExclamationTriangle, faCarBattery, faCarCrash, faEngineWarning, faOilCan, faOilTemp, faTireFlat, faGasPumpSlash, faTrafficCone, faCrosshairs, faThermometerHalf } from '@fortawesome/pro-solid-svg-icons';

import { ERole } from './Role';

import { EPalette } from './../services/color.service';

import Icon from './../components/Utils/Icon/Icon';

/**
 * class LogTrack
 * This class represents the LogTrack
 * 
 * activity: LogTrackActivity | The activity of the LogTrack
 * employeeId: string | The id of the employee
 * companyId: string | The id of the company
 * creationIsoDate: date | The creation date of the LogTrack.
 *    Different from startIsoDate when created as Future LogTrack
 * startIsoDate: date | The start date of the LogTrack
 * startTimestamp: number | Start date, timestamp-formatted
 * endIsoDate: date | The end date of the LogTrack. Null if LogTrack is current
 * endTimestamp: number | End date, timestamp-formatted. Null if LogTrack is current
 * isPunctual: boolean | If the logtrack did not take time, creator can create it as punctual event.
 *    In that case, startIsoDate = endIsoDate, and isPunctual = true.
 * equipmentIds: number[] | concerned Equipments
 * creator: string | The id of the creator.
 *    Different from employeeId when created by a manager or dispatcher
 */
class LogTrack {
  constructor(activity, employeeId, companyId, creationIsoDate, startIsoDate, startTimestamp,
              endIsoDate, endTimestamp, isPunctual, equipmentIds, creator) {
      this.activity = activity;
      this.employeeId = employeeId;
      this.companyId = companyId;
      this.creationIsoDate =  creationIsoDate;
      this.startIsoDate = startIsoDate;
      this.startTimestamp = startTimestamp;
      this.endIsoDate = endIsoDate;
      this.endTimestamp = endTimestamp;
      this.isPunctual = isPunctual;
      this.equipmentIds = equipmentIds;
      this.creator = creator;
  }
}

export const LogTrackCategory = {
  PAUSE: 'PAUSE',
  SERVICE: 'SERVICE',

  NOT_AVAILABLE: 'NOT_AVAILABLE',

  OPERATION: 'OPERATION',
  DRIVING: 'DRIVING',

  PROBLEMS: 'PROBLEMS'
};


export const LogTrackActivity = {
  PARK: 'PARK',
  EAT: 'EAT',
  SLEEP: 'SLEEP',

  READY_SERVICE: 'READY_SERVICE',
  FIX: 'FIX',
  MAINTENANCE: 'MAINTENANCE',
  END_SERVICE: 'END_SERVICE',

  ABSENT: 'ABSENT',
  WAITING: 'WAITING',

  REFUELING: 'REFUELING',
  RECHARGING: 'RECHARGING',
  WASH: 'WASH',
  WEIGHT: 'WEIGHT',
  LOADING: 'LOADING',
  UNLOADING: 'UNLOADING',

  TRANSIT: 'TRANSIT',
  COMMUTE: 'COMMUTE',

  P_BATTERY: 'P_BATTERY',
  P_ACCIDENT: 'P_ACCIDENT',
  P_ENGINE: 'P_ENGINE',
  P_OIL: 'P_OIL',
  P_TEMP: 'P_TEMP',
  P_FLAT: 'P_FLAT',
  P_OUT_OF_FUEL: 'P_OUT_OF_FUEL',
  P_OTHER: 'P_OTHER'
};

export const LogTrackTrackers = {
  TIME: 'TIME',
  GPS: 'GPS',
  TEMPERATURE: 'TEMPERATURE'
};

export const LogTrackPunctuality = {
  MUST_NOT: 'MUST_NOT',
  MUST: 'MUST',
  CAN_BE: 'CAN_BE'
};

export const LogTrackTrackerAvailability = {
  AVAILABLE: 'AVAILABLE',
  NOT_AVAILABLE: 'NOT_AVAILABLE'
};

export const LogTrackCategoryDetails = {
  [LogTrackCategory.PAUSE]: {
    text: 'Pause',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faPause} />,
    activities: [LogTrackActivity.EAT, LogTrackActivity.PARK, LogTrackActivity.SLEEP],
    color: EPalette.BLUE,
    trackers: [LogTrackTrackers.TEMPERATURE, LogTrackTrackers.TIME],
    punctuality: LogTrackPunctuality.MUST_NOT
  },
  [LogTrackCategory.SERVICE]: {
    text: 'Service',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faWrench} />,
    activities: [LogTrackActivity.FIX, LogTrackActivity.READY_SERVICE, LogTrackActivity.END_SERVICE, 
      LogTrackActivity.MAINTENANCE],
    color: EPalette.YELLOW,
    trackers: [LogTrackTrackers.GPS, LogTrackTrackers.TIME, LogTrackTrackers.TEMPERATURE],
    punctuality: LogTrackPunctuality.CAN_BE
  },
  [LogTrackCategory.NOT_AVAILABLE]: {
    text: 'Not Available',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faCalendarTimes} />,
    activities: [LogTrackActivity.ABSENT, LogTrackActivity.WAITING],
    color: EPalette.GRAY,
    trackers: [LogTrackTrackers.TIME],
    punctuality: LogTrackPunctuality.MUST_NOT
  },
  [LogTrackCategory.OPERATION]: {
    text: 'Operation',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faPlay} />,
    activities: [LogTrackActivity.REFUELING, LogTrackActivity.RECHARGING, LogTrackActivity.WASH, 
      LogTrackActivity.WEIGHT, LogTrackActivity.LOADING, LogTrackActivity.UNLOADING],
    color: EPalette.PURPLE,
    trackers: [LogTrackTrackers.TIME, LogTrackTrackers.TEMPERATURE],
    punctuality: LogTrackPunctuality.CAN_BE
  },
  [LogTrackCategory.DRIVING]: {
    text: 'Driving',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faSteeringWheel} />,
    activities: [LogTrackActivity.TRANSIT, LogTrackActivity.COMMUTE],
    color: EPalette.GREEN,
    trackers: [LogTrackTrackers.TIME, LogTrackTrackers.TEMPERATURE, LogTrackTrackers.GPS],
    punctuality: LogTrackPunctuality.MUST_NOT
  },
  [LogTrackCategory.PROBLEMS]: {
    text: 'Problems',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faExclamationTriangle} />,
    activities: [LogTrackActivity.P_BATTERY, LogTrackActivity.P_ACCIDENT, LogTrackActivity.P_ENGINE, 
      LogTrackActivity.P_OIL, LogTrackActivity.P_TEMP, LogTrackActivity.P_FLAT, LogTrackActivity.P_OUT_OF_FUEL, 
      LogTrackActivity.P_OTHER],
    color: EPalette.RED,
    trackers: [LogTrackTrackers.TIME, LogTrackTrackers.TEMPERATURE],
    punctuality: LogTrackPunctuality.MUST
  }
};

export const LogTrackActivityDetails = {
  [LogTrackActivity.PARK]: {
    text: 'Parked',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faParking} />,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.PAUSE
  },
  [LogTrackActivity.EAT]: {
    text: 'Eating',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faUtensils} />,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.PAUSE
  },
  [LogTrackActivity.SLEEP]: {
    text: 'Sleeping',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faBed} />,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.PAUSE
  },

  [LogTrackActivity.FIX]: {
    text: 'Fixing Equipment',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faWrench} />,
    roles: [ERole.MECHANIC],
    parent: LogTrackCategory.SERVICE
  },
  [LogTrackActivity.READY_SERVICE]: {
    text: 'Ready for Service',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faArrowAltFromLeft} />,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: LogTrackCategory.SERVICE
  },
  [LogTrackActivity.END_SERVICE]: {
    text: 'Service ended',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faArrowAltToRight} />,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: LogTrackCategory.SERVICE
  },
  [LogTrackActivity.MAINTENANCE]: {
    text: 'Maintencance',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faToolbox} />,
    roles: [ERole.MECHANIC],
    parent: LogTrackCategory.SERVICE
  },

  [LogTrackActivity.ABSENT]: {
    text: 'Absent',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faCalendarTimes} />,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: LogTrackCategory.NOT_AVAILABLE
  },
  [LogTrackActivity.WAITING]: {
    text: 'Waiting',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faClock} />,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: LogTrackCategory.NOT_AVAILABLE
  },

  [LogTrackActivity.REFUELING]: {
    text: 'Refueling',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faGasPump} />,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.OPERATION
  },
  [LogTrackActivity.RECHARGING]: {
    text: 'Recharging',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faChargingStation} />,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.OPERATION
  },
  [LogTrackActivity.WASH]: {
    text: 'Cleaning Equipment',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faCarWash} />,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: LogTrackCategory.OPERATION
  },
  [LogTrackActivity.WEIGHT]: {
    text: 'Weighting Equipment',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faWeight} />,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.OPERATION
  },
  [LogTrackActivity.LOADING]: {
    text: 'Loading',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faTruck} additional={faShare} />,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.OPERATION
  },
  [LogTrackActivity.UNLOADING]: {
    text: 'Unloading',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faTruck} additional={faReply} />,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.OPERATION
  },

  [LogTrackActivity.TRANSIT]: {
    text: 'Transit',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faShippingFast} />,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: LogTrackCategory.DRIVING
  },
  [LogTrackActivity.COMMUTE]: {
    text: 'Commute',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faShippingTimed} />,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: LogTrackCategory.DRIVING
  },

  [LogTrackActivity.P_BATTERY]: {
    text: 'Battery Problem',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faCarBattery} />,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: LogTrackCategory.PROBLEMS
  },
  [LogTrackActivity.P_ACCIDENT]: {
    text: 'Accident',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faCarCrash} />,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: LogTrackCategory.PROBLEMS
  },
  [LogTrackActivity.P_ENGINE]: {
    text: 'Engine Problem',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faEngineWarning} />,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: LogTrackCategory.PROBLEMS
  },
  [LogTrackActivity.P_OIL]: {
    text: 'Oil Problem',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faOilCan} />,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.PROBLEMS
  },
  [LogTrackActivity.P_TEMP]: {
    text: 'Temperature Problem',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faOilTemp} />,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.PROBLEMS
  },
  [LogTrackActivity.P_FLAT]: {
    text: 'Flat Tire',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faTireFlat} />,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.PROBLEMS
  },
  [LogTrackActivity.P_OUT_OF_FUEL]: {
    text: 'Out of Fuel',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faGasPumpSlash} />,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.PROBLEMS
  },
  [LogTrackActivity.P_OTHER]: {
    text: 'Other Problem',
    icon: (containerClassName, styles) => <Icon containerclassname={containerClassName} style={styles} source="fa" icon={faTrafficCone} />,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: LogTrackCategory.PROBLEMS
  }
};

export const LogTrackTrackersDetails = {
  [LogTrackTrackers.TIME]: {
    mandatory: true,
    icon: <Icon source="fa" icon={faClock} />,
    name: 'Time Tracker',
    description: 'Time-based statistics, along with other trackers.',
    availability: LogTrackTrackerAvailability.AVAILABLE
  },
  [LogTrackTrackers.GPS]: {
    mandatory: false,
    icon: <Icon source="fa" icon={faCrosshairs} />,
    name: 'GPS Tracker',
    description: 'Track your real-time position.',
    availability: LogTrackTrackerAvailability.NOT_AVAILABLE
  },
  [LogTrackTrackers.TEMPERATURE]: {
    mandatory: false,
    icon: <Icon source="fa" icon={faThermometerHalf} />,
    name: 'Temperature Tracker',
    description: 'Track the temperature of your load.',
    availability: LogTrackTrackerAvailability.NOT_AVAILABLE
  }
};

export default LogTrack;
