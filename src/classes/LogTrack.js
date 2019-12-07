import React from 'react';
import { faCarWash, faWrench, faWeight, faParking, faUtensils, faBed, faPause, faGasPump, faChargingStation, faCalendarTimes, faReply, faShare, faPlay, faSteeringWheel, faToolbox, faClock, faShippingFast, faShippingTimed, faArrowAltToRight, faArrowAltFromLeft, faTruck } from '@fortawesome/pro-solid-svg-icons';

import { ERole } from './Role';

import Icon from './../components/Utils/Icon/Icon';

/**
 * class LogTrack
 * This class represents the LogTrack
 * 
 * activity: LogTrackActivity | The activity of the LogTrack
 * employeeId: string | The id of the employee
 * companyId: string | The id of the company
 * startDate: date | The start date of the LogTrack
 * endDate: date | The end date of the LogTrack
 */
class LogTrack {
  constructor(activity, employeeId, companyId, startDate, endDate) {
      this.activity = activity;
      this.employeeId = employeeId;
      this.companyId = companyId;
      this.startDate = startDate;
      this.endDate = endDate;
  }
}

export const LogTrackCategory = {
  PAUSE: 'PAUSE',
  SERVICE: 'SERVICE',

  NOT_AVAILABLE: 'NOT_AVAILABLE',

  OPERATION: 'OPERATION',
  DRIVING: 'DRIVING'
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
  COMMUTE: 'COMMUTE'
};

export const LogTrackCategoryDetails = {
  [LogTrackCategory.PAUSE]: {
    text: 'Pause',
    icon: <Icon source="fa" icon={faPause} />,
    activities: [LogTrackActivity.EAT, LogTrackActivity.PARK, LogTrackActivity.SLEEP]
  },
  [LogTrackCategory.SERVICE]: {
    text: 'Service',
    icon: <Icon source="fa" icon={faWrench} />,
    activities: [LogTrackActivity.FIX, LogTrackActivity.READY_SERVICE, LogTrackActivity.END_SERVICE, LogTrackActivity.MAINTENANCE]
  },
  [LogTrackCategory.NOT_AVAILABLE]: {
    text: 'Not Available',
    icon: <Icon source="fa" icon={faCalendarTimes} />,
    activities: [LogTrackActivity.ABSENT, LogTrackActivity.WAITING]
  },
  [LogTrackCategory.OPERATION]: {
    text: 'Operation',
    icon: <Icon source="fa" icon={faPlay} />,
    activities: [LogTrackActivity.REFUELING, LogTrackActivity.RECHARGING, LogTrackActivity.WASH, LogTrackActivity.WEIGHT, LogTrackActivity.LOADING, LogTrackActivity.UNLOADING]
  },
  [LogTrackCategory.DRIVING]: {
    text: 'Driving',
    icon: <Icon source="fa" icon={faSteeringWheel} />,
    activities: [LogTrackActivity.TRANSIT, LogTrackActivity.COMMUTE]
  }
};

export const LogTrackActivityDetails = {
  [LogTrackActivity.PARK]: {
    text: 'Parked',
    icon: <Icon source="fa" icon={faParking} />,
    roles: [ERole.DRIVER]
  },
  [LogTrackActivity.EAT]: {
    text: 'Eating',
    icon: <Icon source="fa" icon={faUtensils} />,
    roles: [ERole.DRIVER]
  },
  [LogTrackActivity.SLEEP]: {
    text: 'Sleeping',
    icon: <Icon source="fa" icon={faBed} />,
    roles: [ERole.DRIVER]
  },

  [LogTrackActivity.FIX]: {
    text: 'Fixing Equipment',
    icon: <Icon source="fa" icon={faWrench} />,
    roles: [ERole.MECHANIC]
  },
  [LogTrackActivity.READY_SERVICE]: {
    text: 'Ready for Service',
    icon: <Icon source="fa" icon={faArrowAltFromLeft} />,
    roles: [ERole.MECHANIC, ERole.DRIVER]
  },
  [LogTrackActivity.END_SERVICE]: {
    text: 'Service ended',
    icon: <Icon source="fa" icon={faArrowAltToRight} />,
    roles: [ERole.DRIVER, ERole.MECHANIC]
  },
  [LogTrackActivity.MAINTENANCE]: {
    text: 'Maintencance',
    icon: <Icon source="fa" icon={faToolbox} />,
    roles: [ERole.MECHANIC]
  },

  [LogTrackActivity.ABSENT]: {
    text: 'Absent',
    icon: <Icon source="fa" icon={faCalendarTimes} />,
    roles: [ERole.MECHANIC, ERole.DRIVER]
  },
  [LogTrackActivity.WAITING]: {
    text: 'Waiting',
    icon: <Icon source="fa" icon={faClock} />,
    roles: [ERole.DRIVER, ERole.MECHANIC]
  },

  [LogTrackActivity.REFUELING]: {
    text: 'Refueling',
    icon: <Icon source="fa" icon={faGasPump} />,
    roles: [ERole.DRIVER]
  },
  [LogTrackActivity.RECHARGING]: {
    text: 'Recharging',
    icon: <Icon source="fa" icon={faChargingStation} />,
    roles: [ERole.DRIVER]
  },
  [LogTrackActivity.WASH]: {
    text: 'Cleaning Equipment',
    icon: <Icon source="fa" icon={faCarWash} />,
    roles: [ERole.DRIVER, ERole.MECHANIC]
  },
  [LogTrackActivity.WEIGHT]: {
    text: 'Weighting Equipment',
    icon: <Icon source="fa" icon={faWeight} />,
    roles: [ERole.DRIVER]
  },
  [LogTrackActivity.LOADING]: {
    text: 'Loading',
    icon: <Icon source="fa" icon={faTruck} additional={faShare} />,
    roles: [ERole.DRIVER]
  },
  [LogTrackActivity.UNLOADING]: {
    text: 'Unloading',
    icon: <Icon source="fa" icon={faTruck} additional={faReply} />,
    roles: [ERole.DRIVER]
  },

  [LogTrackActivity.TRANSIT]: {
    text: 'Transit',
    icon: <Icon source="fa" icon={faShippingFast} />,
    roles: [ERole.DRIVER, ERole.MECHANIC]
  },
  [LogTrackActivity.COMMUTE]: {
    text: 'Commute',
    icon: <Icon source="fa" icon={faShippingTimed} />,
    roles: [ERole.MECHANIC, ERole.DRIVER]
  }
};

export default LogTrack;
