import DataService from './data.service';
import ErrorService from './error.service';

import ERights from './../classes/enums/ERights';
import ERole from './../classes/enums/ERole';

const RightService = {
  hasAppRight(right) {
    if (!DataService.computed.activeRole) {
      return false;
    }

    if (right === ERights.APP_CAN_USE_GPS ||
        right === ERights.APP_CAN_USE_LOGTRACK) {
      return DataService.computed.activeRole.role === ERole.DRIVER ||
        DataService.computed.activeRole.role === ERole.MECHANIC;
    }
    if (right === ERights.APP_CAN_USE_CONTRACT_MANAGEMENT ||
        right === ERights.APP_CAN_USE_EMPLOYEE_MANAGEMENT ||
        right === ERights.APP_CAN_USE_EQUIPMENT_MANAGEMENT ||
        right === ERights.APP_CAN_USE_WAREHOUSE_MANAGEMENT ||
        right === ERights.APP_CAN_USE_ANALYTICS) {
      return DataService.computed.activeRole.role === ERole.MANAGER;
    }

    ErrorService.error('Right ' + right + ' is unknown');
    return false;
  }
};

export default RightService;
