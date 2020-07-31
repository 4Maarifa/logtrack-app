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
 *    A punctual event, by definition, has no duration. It happens during another logtrack that was active and stays active afterwards.
 * equipmentIds: number[] | concerned Equipments
 * creator: string | The id of the creator.
 *    Different from employeeId when created by a manager or dispatcher
 */
class LogTrack {
  constructor(activity, employeeId, companyId, creationIsoDate, startIsoDate, startTimestamp,
              endIsoDate, endTimestamp, isPunctual, equipmentIds, creator) {
      this.activity = ELogTrackActivity[activity];
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

/**
 * Enum: ELogTrackCategory
 * Category of the logtrack's activity
 */
export const ELogTrackCategory = {
  // Not moving, pause
  PAUSE: 'PAUSE',

  // Service, maintenance
  SERVICE: 'SERVICE',

  // Not available, outside of work or waiting for something
  NOT_AVAILABLE: 'NOT_AVAILABLE',

  // Operation on equipment or employee that lock the set
  OPERATION: 'OPERATION',

  // Normal 
  DRIVING: 'DRIVING',

  // Problems
  PROBLEMS: 'PROBLEMS'
};

/**
 * Enum: ELogTrackActivity
 * Describes the real activity of the logtrack
 */
export const ELogTrackActivity = {
  // PAUSE
  PARK: 'PARK',
  EAT: 'EAT',
  SLEEP: 'SLEEP',

  // SERVICE
  READY_SERVICE: 'READY_SERVICE',
  FIX: 'FIX',
  MAINTENANCE: 'MAINTENANCE',
  END_SERVICE: 'END_SERVICE',

  // NOT_AVAILABLE
  ABSENT: 'ABSENT',
  WAITING: 'WAITING',

  // OPERATION
  REFUELING: 'REFUELING',
  RECHARGING: 'RECHARGING',
  WASH: 'WASH',
  WEIGHT: 'WEIGHT',
  LOADING: 'LOADING',
  UNLOADING: 'UNLOADING',

  // DRIVING
  TRANSIT: 'TRANSIT',
  COMMUTE: 'COMMUTE',

  // PROBLEMS
  P_BATTERY: 'P_BATTERY',
  P_ACCIDENT: 'P_ACCIDENT',
  P_ENGINE: 'P_ENGINE',
  P_OIL: 'P_OIL',
  P_TEMP: 'P_TEMP',
  P_FLAT: 'P_FLAT',
  P_OUT_OF_FUEL: 'P_OUT_OF_FUEL',
  P_OTHER: 'P_OTHER'
};

/**
 * Enum: ELogTrackTrackers
 * Possible registered trackers to track activity of the set
 */
export const ELogTrackTrackers = {
  // Track by time
  TIME: 'TIME',

  // Track by location
  GPS: 'GPS',

  // Track the temperature
  TEMPERATURE: 'TEMPERATURE'
};

/**
 * Enum: ELogTrackPunctuality
 * Tells if the logtrack activity should, must or must not be punctual
 */
export const ELogTrackPunctuality = {
  MUST_NOT: 'MUST_NOT',
  MUST: 'MUST',
  CAN_BE: 'CAN_BE'
};

/**
 * Enum: ELogTrackTrackerAvailability
 * Describes the availability of the tracker. Mainly used to block employees to track inexistent data
 */
export const ELogTrackTrackerAvailability = {
  AVAILABLE: 'AVAILABLE',
  // Tracker should never be used if not available
  NOT_AVAILABLE: 'NOT_AVAILABLE'
};

/**
 * Enum: ELogTrackCategoryDetails
 * Details about the enum ELogTrackCategory
 * 
 * text: string | Printable text
 * icon: FA/IconDefinition | Icon of the category, light
 * iconSolid: FA/IconDefinition | Icon of the category, solid
 * activities: [ELogTrackActivity] | Related activities for that category
 * color: EPalette | Color of an existing palette
 * trackers: [ELogTrackTrackers] | List of available trackers for that category (Tracking location on punctual or pause events is pointless!)
 * punctuality: ELogTrackPunctuality | Tells if category contains punctual events
 */
export const ELogTrackCategoryDetails = {
  [ELogTrackCategory.PAUSE]: {
    text: 'Pause',
    icon: faPause, 
		iconSolid: faPauseSolid,
    activities: [ELogTrackActivity.EAT, ELogTrackActivity.PARK, ELogTrackActivity.SLEEP],
    color: EPalette.BLUE,
    trackers: [ELogTrackTrackers.TEMPERATURE, ELogTrackTrackers.TIME],
    punctuality: ELogTrackPunctuality.MUST_NOT
  },
  [ELogTrackCategory.SERVICE]: {
    text: 'Service',
    icon: faWrench, 
		iconSolid: faWrenchSolid,
    activities: [ELogTrackActivity.FIX, ELogTrackActivity.READY_SERVICE, ELogTrackActivity.END_SERVICE, 
      ELogTrackActivity.MAINTENANCE],
    color: EPalette.YELLOW,
    trackers: [ELogTrackTrackers.GPS, ELogTrackTrackers.TIME, ELogTrackTrackers.TEMPERATURE],
    punctuality: ELogTrackPunctuality.CAN_BE
  },
  [ELogTrackCategory.NOT_AVAILABLE]: {
    text: 'Not Available',
    icon: faCalendarTimes, 
		iconSolid: faCalendarTimesSolid,
    activities: [ELogTrackActivity.ABSENT, ELogTrackActivity.WAITING],
    color: EPalette.GRAY,
    trackers: [ELogTrackTrackers.TIME],
    punctuality: ELogTrackPunctuality.MUST_NOT
  },
  [ELogTrackCategory.OPERATION]: {
    text: 'Operation',
    icon: faPlay, 
		iconSolid: faPlaySolid,
    activities: [ELogTrackActivity.REFUELING, ELogTrackActivity.RECHARGING, ELogTrackActivity.WASH, 
      ELogTrackActivity.WEIGHT, ELogTrackActivity.LOADING, ELogTrackActivity.UNLOADING],
    color: EPalette.PURPLE,
    trackers: [ELogTrackTrackers.TIME, ELogTrackTrackers.TEMPERATURE],
    punctuality: ELogTrackPunctuality.CAN_BE
  },
  [ELogTrackCategory.DRIVING]: {
    text: 'Driving',
    icon: faSteeringWheel, 
		iconSolid: faSteeringWheelSolid,
    activities: [ELogTrackActivity.TRANSIT, ELogTrackActivity.COMMUTE],
    color: EPalette.GREEN,
    trackers: [ELogTrackTrackers.TIME, ELogTrackTrackers.TEMPERATURE, ELogTrackTrackers.GPS],
    punctuality: ELogTrackPunctuality.MUST_NOT
  },
  [ELogTrackCategory.PROBLEMS]: {
    text: 'Problems',
    icon: faExclamationTriangle, 
		iconSolid: faExclamationTriangleSolid,
    activities: [ELogTrackActivity.P_BATTERY, ELogTrackActivity.P_ACCIDENT, ELogTrackActivity.P_ENGINE, 
      ELogTrackActivity.P_OIL, ELogTrackActivity.P_TEMP, ELogTrackActivity.P_FLAT, ELogTrackActivity.P_OUT_OF_FUEL, 
      ELogTrackActivity.P_OTHER],
    color: EPalette.RED,
    trackers: [ELogTrackTrackers.TIME, ELogTrackTrackers.TEMPERATURE],
    punctuality: ELogTrackPunctuality.MUST
  }
};

/**
 * Enum: ELogTrackActivityDetails
 * Details about the enum ELogTrackActivity
 * 
 * text: string | Printable text
 * icon: FA/IconDefinition | Icon of the activity, light
 * iconSolid: FA/IconDefinition | Icon of the activity, solid
 * roles: [ERole] | List of roles that can create LogTracks with that activity (Drivers must not be able to create maintenance logtracks!)
 * parent: ELogTrackCategory | Parent Category
 */
export const ELogTrackActivityDetails = {
  // PAUSE
  [ELogTrackActivity.PARK]: {
    text: 'Parked',
    icon: faParking, 
		iconSolid: faParkingSolid,
    roles: [ERole.DRIVER],
    parent: ELogTrackCategory.PAUSE
  },
  [ELogTrackActivity.EAT]: {
    text: 'Eating',
    icon: faUtensils, 
		iconSolid: faUtensilsSolid,
    roles: [ERole.DRIVER],
    parent: ELogTrackCategory.PAUSE
  },
  [ELogTrackActivity.SLEEP]: {
    text: 'Sleeping',
    icon: faBed, 
		iconSolid: faBedSolid,
    roles: [ERole.DRIVER],
    parent: ELogTrackCategory.PAUSE
  },

  // SERVICE
  [ELogTrackActivity.FIX]: {
    text: 'Fixing Equipment',
    icon: faWrench, 
		iconSolid: faWrenchSolid,
    roles: [ERole.MECHANIC],
    parent: ELogTrackCategory.SERVICE
  },
  [ELogTrackActivity.READY_SERVICE]: {
    text: 'Ready for Service',
    icon: faArrowAltFromLeft, 
		iconSolid: faArrowAltFromLeftSolid,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: ELogTrackCategory.SERVICE
  },
  [ELogTrackActivity.END_SERVICE]: {
    text: 'Service ended',
    icon: faArrowAltToRight, 
		iconSolid: faArrowAltToRightSolid,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: ELogTrackCategory.SERVICE
  },
  [ELogTrackActivity.MAINTENANCE]: {
    text: 'Maintencance',
    icon: faToolbox, 
		iconSolid: faToolboxSolid,
    roles: [ERole.MECHANIC],
    parent: ELogTrackCategory.SERVICE
  },

  // NOT)AVAILABLE
  [ELogTrackActivity.ABSENT]: {
    text: 'Absent',
    icon: faCalendarTimes, 
		iconSolid: faCalendarTimesSolid,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: ELogTrackCategory.NOT_AVAILABLE
  },
  [ELogTrackActivity.WAITING]: {
    text: 'Waiting',
    icon: faClock, 
		iconSolid: faClockSolid,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: ELogTrackCategory.NOT_AVAILABLE
  },

  // OPERATION
  [ELogTrackActivity.REFUELING]: {
    text: 'Refueling',
    icon: faGasPump, 
		iconSolid: faGasPumpSolid,
    roles: [ERole.DRIVER],
    parent: ELogTrackCategory.OPERATION
  },
  [ELogTrackActivity.RECHARGING]: {
    text: 'Recharging',
    icon: faChargingStation, 
		iconSolid: faChargingStationSolid,
    roles: [ERole.DRIVER],
    parent: ELogTrackCategory.OPERATION
  },
  [ELogTrackActivity.WASH]: {
    text: 'Cleaning Equipment',
    icon: faCarWash, 
		iconSolid: faCarWashSolid,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: ELogTrackCategory.OPERATION
  },
  [ELogTrackActivity.WEIGHT]: {
    text: 'Weighting Equipment',
    icon: faWeight, 
		iconSolid: faWeightSolid,
    roles: [ERole.DRIVER],
    parent: ELogTrackCategory.OPERATION
  },
  [ELogTrackActivity.LOADING]: {
    text: 'Loading',
    icon: faTruck, 
		iconSolid: faTruckSolid,
    additionalSource: 'fa',
    additionalIcon: faShareSolid,
    roles: [ERole.DRIVER],
    parent: ELogTrackCategory.OPERATION
  },
  [ELogTrackActivity.UNLOADING]: {
    text: 'Unloading',
    icon: faTruck, 
    iconSolid: faTruckSolid,
    additionalSource: 'fa',
    additionalIcon: faReplySolid, 
    roles: [ERole.DRIVER],
    parent: ELogTrackCategory.OPERATION
  },

  // DRIVING
  [ELogTrackActivity.TRANSIT]: {
    text: 'Transit',
    icon: faShippingFast, 
		iconSolid: faShippingFastSolid,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: ELogTrackCategory.DRIVING
  },
  [ELogTrackActivity.COMMUTE]: {
    text: 'Commute',
    icon: faShippingTimed, 
		iconSolid: faShippingTimedSolid,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: ELogTrackCategory.DRIVING
  },

  // PROBLEMS
  [ELogTrackActivity.P_BATTERY]: {
    text: 'Battery Problem',
    icon: faCarBattery, 
		iconSolid: faCarBatterySolid,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: ELogTrackCategory.PROBLEMS
  },
  [ELogTrackActivity.P_ACCIDENT]: {
    text: 'Accident',
    icon: faCarCrash, 
		iconSolid: faCarCrashSolid,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: ELogTrackCategory.PROBLEMS
  },
  [ELogTrackActivity.P_ENGINE]: {
    text: 'Engine Problem',
    icon: faEngineWarning, 
		iconSolid: faEngineWarningSolid,
    roles: [ERole.MECHANIC, ERole.DRIVER],
    parent: ELogTrackCategory.PROBLEMS
  },
  [ELogTrackActivity.P_OIL]: {
    text: 'Oil Problem',
    icon: faOilCan, 
		iconSolid: faOilCanSolid,
    roles: [ERole.DRIVER],
    parent: ELogTrackCategory.PROBLEMS
  },
  [ELogTrackActivity.P_TEMP]: {
    text: 'Temperature Problem',
    icon: faOilTemp, 
		iconSolid: faOilTempSolid,
    roles: [ERole.DRIVER],
    parent: ELogTrackCategory.PROBLEMS
  },
  [ELogTrackActivity.P_FLAT]: {
    text: 'Flat Tire',
    icon: faTireFlat, 
		iconSolid: faTireFlatSolid,
    roles: [ERole.DRIVER],
    parent: ELogTrackCategory.PROBLEMS
  },
  [ELogTrackActivity.P_OUT_OF_FUEL]: {
    text: 'Out of Fuel',
    icon: faGasPumpSlash, 
		iconSolid: faGasPumpSlashSolid,
    roles: [ERole.DRIVER],
    parent: ELogTrackCategory.PROBLEMS
  },
  [ELogTrackActivity.P_OTHER]: {
    text: 'Other Problem',
    icon: faTrafficCone, 
		iconSolid: faTrafficConeSolid,
    roles: [ERole.DRIVER, ERole.MECHANIC],
    parent: ELogTrackCategory.PROBLEMS
  }
};

/**
 * Enum: ELogTrackTrackersDetails
 * Details about ELogTrackTrackers
 * 
 * mandatory: boolean | Tells if the tracker is mandatory (if data acquisition must not be disabled by employees)
 * icon: FA/IconDefinition | Icon of the Tracker, light
 * iconSolid: FA/IconDefinition | Icon of the Tracker, solid
 * name: string | Printable name
 * description: string | Printable description
 * availability: ELogTrackTrackerAvailability | Tells if the tracker could be used or not
 */
export const ELogTrackTrackersDetails = {
  [ELogTrackTrackers.TIME]: {
    mandatory: true,
    icon: faClock, 
		iconSolid: faClockSolid,
    name: 'Time Tracker',
    description: 'Time-based statistics, along with other trackers.',
    availability: ELogTrackTrackerAvailability.AVAILABLE
  },
  [ELogTrackTrackers.GPS]: {
    mandatory: false,
    icon: faCrosshairs, 
		iconSolid: faCrosshairsSolid,
    name: 'GPS Tracker',
    description: 'Track your real-time position.',
    availability: ELogTrackTrackerAvailability.NOT_AVAILABLE
  },
  [ELogTrackTrackers.TEMPERATURE]: {
    mandatory: false,
    icon: faThermometerHalf, 
		iconSolid: faThermometerHalfSolid,
    name: 'Temperature Tracker',
    description: 'Track the temperature of your load.',
    availability: ELogTrackTrackerAvailability.NOT_AVAILABLE
  }
};

export default LogTrack;
