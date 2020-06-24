import { faCarWash, faWrench, faWeight, faParking, faUtensils, faBed, faPause, faGasPump, 
  faChargingStation, faCalendarTimes, faPlay, faSteeringWheel, 
  faToolbox, faClock, faShippingFast, faShippingTimed, faArrowAltToRight, faArrowAltFromLeft, 
  faTruck, faExclamationTriangle, faCarBattery, faCarCrash, faEngineWarning, faOilCan, 
  faOilTemp, faTireFlat, faGasPumpSlash, faTrafficCone, faCrosshairs, faThermometerHalf } from '@fortawesome/pro-light-svg-icons';
import { faReply as faReplySolid, faShare as faShareSolid, faClock as faClockSolid,
  faTireFlat as faTireFlatSolid, faGasPumpSlash as faGasPumpSlashSolid, faThermometerHalf as faThermometerHalfSolid,
  faCrosshairs as faCrosshairsSolid, faOilTemp as faOilTempSolid, faOilCan as faOilCanSolid,
  faTruck as faTruckSolid, faCarBattery as faCarBatterySolid, faCarCrash as faCarCrashSolid,
  faEngineWarning as faEngineWarningSolid, faPause as faPauseSolid, faSteeringWheel as faSteeringWheelSolid,
  faParking as faParkingSolid, faToolbox as faToolboxSolid, faWrench as faWrenchSolid,
  faCalendarTimes as faCalendarTimesSolid, faPlay as faPlaySolid, faExclamationTriangle as faExclamationTriangleSolid,
  faGasPump as faGasPumpSolid, faArrowAltFromLeft as faArrowAltFromLeftSolid, faWeight as faWeightSolid,
  faUtensils as faUtensilsSolid, faBed as faBedSolid, faArrowAltToRight as faArrowAltToRightSolid,
  faChargingStation as faChargingStationSolid, faCarWash as faCarWashSolid, faShippingFast as faShippingFastSolid,
  faShippingTimed as faShippingTimedSolid, faTrafficCone as faTrafficConeSolid } from '@fortawesome/pro-solid-svg-icons';

import { ERole } from './Role';

import { EPalette } from './../services/color.service';

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
    icon: faPause, 
		iconSolid: faPauseSolid,
    activities: [LogTrackActivity.EAT, LogTrackActivity.PARK, LogTrackActivity.SLEEP],
    color: EPalette.BLUE,
    trackers: [LogTrackTrackers.TEMPERATURE, LogTrackTrackers.TIME],
    punctuality: LogTrackPunctuality.MUST_NOT
  },
  [LogTrackCategory.SERVICE]: {
    text: 'Service',
    icon: faWrench, 
		iconSolid: faWrenchSolid,
    activities: [LogTrackActivity.FIX, LogTrackActivity.READY_SERVICE, LogTrackActivity.END_SERVICE, 
      LogTrackActivity.MAINTENANCE],
    color: EPalette.YELLOW,
    trackers: [LogTrackTrackers.GPS, LogTrackTrackers.TIME, LogTrackTrackers.TEMPERATURE],
    punctuality: LogTrackPunctuality.CAN_BE
  },
  [LogTrackCategory.NOT_AVAILABLE]: {
    text: 'Not Available',
    icon: faCalendarTimes, 
		iconSolid: faCalendarTimesSolid,
    activities: [LogTrackActivity.ABSENT, LogTrackActivity.WAITING],
    color: EPalette.GRAY,
    trackers: [LogTrackTrackers.TIME],
    punctuality: LogTrackPunctuality.MUST_NOT
  },
  [LogTrackCategory.OPERATION]: {
    text: 'Operation',
    icon: faPlay, 
		iconSolid: faPlaySolid,
    activities: [LogTrackActivity.REFUELING, LogTrackActivity.RECHARGING, LogTrackActivity.WASH, 
      LogTrackActivity.WEIGHT, LogTrackActivity.LOADING, LogTrackActivity.UNLOADING],
    color: EPalette.PURPLE,
    trackers: [LogTrackTrackers.TIME, LogTrackTrackers.TEMPERATURE],
    punctuality: LogTrackPunctuality.CAN_BE
  },
  [LogTrackCategory.DRIVING]: {
    text: 'Driving',
    icon: faSteeringWheel, 
		iconSolid: faSteeringWheelSolid,
    activities: [LogTrackActivity.TRANSIT, LogTrackActivity.COMMUTE],
    color: EPalette.GREEN,
    trackers: [LogTrackTrackers.TIME, LogTrackTrackers.TEMPERATURE, LogTrackTrackers.GPS],
    punctuality: LogTrackPunctuality.MUST_NOT
  },
  [LogTrackCategory.PROBLEMS]: {
    text: 'Problems',
    icon: faExclamationTriangle, 
		iconSolid: faExclamationTriangleSolid,
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
    icon: faParking, 
		iconSolid: faParkingSolid,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.PAUSE
  },
  [LogTrackActivity.EAT]: {
    text: 'Eating',
    icon: faUtensils, 
		iconSolid: faUtensilsSolid,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.PAUSE
  },
  [LogTrackActivity.SLEEP]: {
    text: 'Sleeping',
    icon: faBed, 
		iconSolid: faBedSolid,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.PAUSE
  },

  [LogTrackActivity.FIX]: {
    text: 'Fixing Equipment',
    icon: faWrench, 
		iconSolid: faWrenchSolid,
    roles: [ERole.MECHANIC],
    parent: LogTrackCategory.SERVICE
  },
  [LogTrackActivity.READY_SERVICE]: {
    text: 'Ready for Service',
    icon: faArrowAltFromLeft, 
		iconSolid: faArrowAltFromLeftSolid,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: LogTrackCategory.SERVICE
  },
  [LogTrackActivity.END_SERVICE]: {
    text: 'Service ended',
    icon: faArrowAltToRight, 
		iconSolid: faArrowAltToRightSolid,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: LogTrackCategory.SERVICE
  },
  [LogTrackActivity.MAINTENANCE]: {
    text: 'Maintencance',
    icon: faToolbox, 
		iconSolid: faToolboxSolid,
    roles: [ERole.MECHANIC],
    parent: LogTrackCategory.SERVICE
  },

  [LogTrackActivity.ABSENT]: {
    text: 'Absent',
    icon: faCalendarTimes, 
		iconSolid: faCalendarTimesSolid,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: LogTrackCategory.NOT_AVAILABLE
  },
  [LogTrackActivity.WAITING]: {
    text: 'Waiting',
    icon: faClock, 
		iconSolid: faClockSolid,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: LogTrackCategory.NOT_AVAILABLE
  },

  [LogTrackActivity.REFUELING]: {
    text: 'Refueling',
    icon: faGasPump, 
		iconSolid: faGasPumpSolid,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.OPERATION
  },
  [LogTrackActivity.RECHARGING]: {
    text: 'Recharging',
    icon: faChargingStation, 
		iconSolid: faChargingStationSolid,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.OPERATION
  },
  [LogTrackActivity.WASH]: {
    text: 'Cleaning Equipment',
    icon: faCarWash, 
		iconSolid: faCarWashSolid,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: LogTrackCategory.OPERATION
  },
  [LogTrackActivity.WEIGHT]: {
    text: 'Weighting Equipment',
    icon: faWeight, 
		iconSolid: faWeightSolid,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.OPERATION
  },
  [LogTrackActivity.LOADING]: {
    text: 'Loading',
    icon: faTruck, 
		iconSolid: faTruckSolid,
    additionalicon: faShareSolid,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.OPERATION
  },
  [LogTrackActivity.UNLOADING]: {
    text: 'Unloading',
    icon: faTruck, 
		iconSolid: faTruckSolid,
    additionalicon: faReplySolid, 
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.OPERATION
  },

  [LogTrackActivity.TRANSIT]: {
    text: 'Transit',
    icon: faShippingFast, 
		iconSolid: faShippingFastSolid,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: LogTrackCategory.DRIVING
  },
  [LogTrackActivity.COMMUTE]: {
    text: 'Commute',
    icon: faShippingTimed, 
		iconSolid: faShippingTimedSolid,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: LogTrackCategory.DRIVING
  },

  [LogTrackActivity.P_BATTERY]: {
    text: 'Battery Problem',
    icon: faCarBattery, 
		iconSolid: faCarBatterySolid,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: LogTrackCategory.PROBLEMS
  },
  [LogTrackActivity.P_ACCIDENT]: {
    text: 'Accident',
    icon: faCarCrash, 
		iconSolid: faCarCrashSolid,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: LogTrackCategory.PROBLEMS
  },
  [LogTrackActivity.P_ENGINE]: {
    text: 'Engine Problem',
    icon: faEngineWarning, 
		iconSolid: faEngineWarningSolid,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: LogTrackCategory.PROBLEMS
  },
  [LogTrackActivity.P_OIL]: {
    text: 'Oil Problem',
    icon: faOilCan, 
		iconSolid: faOilCanSolid,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.PROBLEMS
  },
  [LogTrackActivity.P_TEMP]: {
    text: 'Temperature Problem',
    icon: faOilTemp, 
		iconSolid: faOilTempSolid,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.PROBLEMS
  },
  [LogTrackActivity.P_FLAT]: {
    text: 'Flat Tire',
    icon: faTireFlat, 
		iconSolid: faTireFlatSolid,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.PROBLEMS
  },
  [LogTrackActivity.P_OUT_OF_FUEL]: {
    text: 'Out of Fuel',
    icon: faGasPumpSlash, 
		iconSolid: faGasPumpSlashSolid,
    roles: [ERole.DRIVER],
    parent: LogTrackCategory.PROBLEMS
  },
  [LogTrackActivity.P_OTHER]: {
    text: 'Other Problem',
    icon: faTrafficCone, 
		iconSolid: faTrafficConeSolid,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: LogTrackCategory.PROBLEMS
  }
};

export const LogTrackTrackersDetails = {
  [LogTrackTrackers.TIME]: {
    mandatory: true,
    icon: faClock, 
		iconSolid: faClockSolid,
    name: 'Time Tracker',
    description: 'Time-based statistics, along with other trackers.',
    availability: LogTrackTrackerAvailability.AVAILABLE
  },
  [LogTrackTrackers.GPS]: {
    mandatory: false,
    icon: faCrosshairs, 
		iconSolid: faCrosshairsSolid,
    name: 'GPS Tracker',
    description: 'Track your real-time position.',
    availability: LogTrackTrackerAvailability.NOT_AVAILABLE
  },
  [LogTrackTrackers.TEMPERATURE]: {
    mandatory: false,
    icon: faThermometerHalf, 
		iconSolid: faThermometerHalfSolid,
    name: 'Temperature Tracker',
    description: 'Track the temperature of your load.',
    availability: LogTrackTrackerAvailability.NOT_AVAILABLE
  }
};

export default LogTrack;
