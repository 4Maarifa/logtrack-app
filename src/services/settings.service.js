import React from 'react';
import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons';

import DataService from './data.service';
import ErrorService from './error.service';
import EmployeeService from './entities/employee.service';
import ResizeService from './resize.service';

import Icon from './../components/Utils/Icon/Icon';

import { ReactComponent as SettingsFullPageLayoutClear } from './../assets/settings/SETTINGS_FULL_PAGE_LAYOUT__CLEAR.svg';
import { ReactComponent as SettingsFullPageLayoutFull } from './../assets/settings/SETTINGS_FULL_PAGE_LAYOUT__FULL.svg';
import { ReactComponent as SettingsNavCollapsedCollapsed } from './../assets/settings/SETTINGS_NAV_COLLAPSED__COLLAPSED.svg';
import { ReactComponent as SettingsNavCollapsedExtended } from './../assets/settings/SETTINGS_NAV_COLLAPSED__EXTENDED.svg';


/**
 * Service: SettingsService
 * Used to read and write settings from user / employee
 */
const SettingsService = {
  _settingsUpdating: false,
  // Get a specific settings from uers
  getSettingValue: settingKey => {
    if(!DataService.computed.employee) {
      return null;
    }
    if(DataService.computed.employee.settings && DataService.computed.employee.settings[settingKey]) {
      return DataService.computed.employee.settings[settingKey];
    }
    return ESettingsDetails[settingKey].default;
  },
  updateSetting: (settingKey, settingValue) => {
    if(SettingsService._settingsUpdating) {
      ErrorService.warning('Settings are already updating. Please wait and repeat your operation.');
      return;
    }
    SettingsService._settingsUpdating = true;

    let settings = DataService.computed.employee.settings || {};
    settings[settingKey] = settingValue;

    return new Promise((resolve, reject) => {
      EmployeeService.updateField(DataService.computed.user.uid, {settings})
        .then(() => DataService.computed.notifyChanges()
          .then(() => {
            ResizeService.updateObservers();
            resolve();
            SettingsService._settingsUpdating = false;
          }))
        .catch(e => {
          ErrorService.manageErrorThenReject(e, reject);
          SettingsService._settingsUpdating = false;
        });
    });
  }
};

export const ESettings = {
  SETTINGS_CUSTOM_COLORS: 'SETTINGS_CUSTOM_COLORS',
  SETTINGS_FULL_PAGE_LAYOUT: 'SETTINGS_FULL_PAGE_LAYOUT',
  SETTINGS_NAV_COLLAPSED: 'SETTINGS_NAV_COLLAPSED',
  SETTINGS_DASHBOARD_WEATHER: 'SETTINGS_DASHBOARD_WEATHER'
};

export const ESettingsDetails = {
  [ESettings.SETTINGS_CUSTOM_COLORS]: {
    title: <h2 className="profile-title">Company Colors</h2>,
    options: [
      {
        value: 'BASIC',
        print: () => (<span>
            <span>Basic Colors</span>
          </span>)
      },
      {
        value: 'CUSTOM',
        print: () => (<span>
            <span>Company Colors</span>
          </span>)
      }
    ],
    default: 'CUSTOM'
  },
  [ESettings.SETTINGS_FULL_PAGE_LAYOUT]: {
    title: <h2 className="profile-title">Page Layout</h2>,
    note: <span>
      <Icon source="fa" icon={faInfoCircle} />
      Full layout is forced on smaller devices.
    </span>,
    options: [
      {
        value: 'FULL',
        print: () => (<span>
            <SettingsFullPageLayoutFull />
            <span>Full Page</span>
          </span>)
      },
      {
        value: 'CLEAR',
        print: () => (<span>
            <SettingsFullPageLayoutClear />
            <span>Clear Layout</span>
          </span>)
      }
    ],
    default: 'CLEAR'
  },
  [ESettings.SETTINGS_NAV_COLLAPSED]: {
    title: <h2 className="profile-title">Navigation Layout</h2>,
    note: null,
    options: [
      {
        value: 'EXTENDED',
        print: () => (<span>
            <SettingsNavCollapsedExtended />
            <span>Extended Navigation</span>
          </span>)
      },
      {
        value: 'COLLAPSED',
        print: () => (<span>
            <SettingsNavCollapsedCollapsed />
            <span>Collapsed Navigation</span>
          </span>)
      }
    ],
    default: 'EXTENDED'
  },
  [ESettings.SETTINGS_DASHBOARD_WEATHER]: {
    title: <h2 className="profile-title">Dashboard Weather Widget</h2>,
    note: null,
    options: [
      {
        value: 'ON',
        print: () => (<span>
            <span>Show Weather</span>
          </span>)
      },
      {
        value: 'OFF',
        print: () => (<span>
            <span>Hide Weather</span>
          </span>)
      }
    ],
    default: 'OFF'
  }
};


export default SettingsService;
