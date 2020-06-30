import React from 'react';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

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

  // Tells if a setting update is already en-route. Mutex that prevent setting override themselves
  _settingsUpdating: false,

  // Get a specific settings from the user
  getSettingValue: settingKey => {

    // If a user is signedin and his settings could be loaded and contain the setting, return it
    if(DataService.computed.employee && DataService.computed.employee.settings && DataService.computed.employee.settings[settingKey]) {
      return DataService.computed.employee.settings[settingKey];
    }

    // Otehrwise, return the default setting value
    return ESettingsDetails[settingKey].default;
  },

  // Update a specific setting for the user
  updateSetting: (settingKey, settingValue) => {

    // If settings are already updating, tell user and return
    if(SettingsService._settingsUpdating) {
      ErrorService.warning('Settings are already updating. Please wait and repeat your operation.');
      return;
    }

    // Tells that user settings are updating
    SettingsService._settingsUpdating = true;

    // build new settings
    const NEW_SETTINGS = DataService.computed.employee.settings || {};

    // set new value
    NEW_SETTINGS[settingKey] = settingValue;

    return new Promise((resolve, reject) => {

      // Update settings
      EmployeeService.updateField(DataService.computed.user.uid, { settings: NEW_SETTINGS })
        .then(() => 

          // reload user with new settings
          DataService.computed.notifyChanges()
            .then(() => {

              // Tells the settings are updated
              ResizeService.updateObservers();
              resolve();

              // Free the mutext
              SettingsService._settingsUpdating = false;
            }))
          .catch(e => {

            // Else, if there was an error, throw it, reject
            ErrorService.manageErrorThenReject(e, reject);

            // and free the mutex
            SettingsService._settingsUpdating = false;
          });
    });
  }
};


/**
 * Enum: ESettings
 * All the different settings
 */
export const ESettings = {
  SETTINGS_CUSTOM_COLORS: 'SETTINGS_CUSTOM_COLORS',
  SETTINGS_FULL_PAGE_LAYOUT: 'SETTINGS_FULL_PAGE_LAYOUT',
  SETTINGS_NAV_COLLAPSED: 'SETTINGS_NAV_COLLAPSED',
  SETTINGS_DASHBOARD_WEATHER: 'SETTINGS_DASHBOARD_WEATHER'
};


/**
 * Enum: ESettingsDetails
 * Details of the enum ESettings
 * title: HTML | printable setting text
 * options: Array[ { value: string, print: function } ] | different possible values for this setting
 * default: string | default value of the setting
 */
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
    default: 'FULL'
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
    default: 'COLLAPSED'
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
