import React from 'react';
import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../components/Utils/Icon/Icon';

import { ReactComponent as SettingsFullPageLayoutClear } from './../../assets/settings/SETTINGS_FULL_PAGE_LAYOUT__CLEAR.svg';
import { ReactComponent as SettingsFullPageLayoutFull } from './../../assets/settings/SETTINGS_FULL_PAGE_LAYOUT__FULL.svg';
import { ReactComponent as SettingsNavCollapsedCollapsed } from './../../assets/settings/SETTINGS_NAV_COLLAPSED__COLLAPSED.svg';
import { ReactComponent as SettingsNavCollapsedExtended } from './../../assets/settings/SETTINGS_NAV_COLLAPSED__EXTENDED.svg';

const ESettings = {
  SETTINGS_FULL_PAGE_LAYOUT: 'SETTINGS_FULL_PAGE_LAYOUT',
  SETTINGS_NAV_COLLAPSED: 'SETTINGS_NAV_COLLAPSED',
  SETTINGS_DASHBOARD_WEATHER: 'SETTINGS_DASHBOARD_WEATHER'
};

export const ESettingsDetails = {
  [ESettings.SETTINGS_FULL_PAGE_LAYOUT]: {
    title: <h2 className="profile-title">Page Layout</h2>,
    note: <span>
      <Icon source="fa" icon={faInfoCircle} />
      Full layout is forced on smaller devices.
    </span>,
    options: [
      {
        value: 'FULL',
        print: () => {
          return <span>
            <SettingsFullPageLayoutFull />
            <span>Full Page</span>
          </span>;
        }
      },
      {
        value: 'CLEAR',
        print: () => {
          return <span>
            <SettingsFullPageLayoutClear />
            <span>Clear Layout</span>
          </span>;
        }
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
        print: () => {
          return <span>
            <SettingsNavCollapsedExtended />
            <span>Extended Navigation</span>
          </span>;
        }
      },
      {
        value: 'COLLAPSED',
        print: () => {
          return <span>
            <SettingsNavCollapsedCollapsed />
            <span>Collapsed Navigation</span>
          </span>;
        }
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
        print: () => {
          return <span>
            <span>Show Weather</span>
          </span>;
        }
      },
      {
        value: 'OFF',
        print: () => {
          return <span>
            <span>Hide Weather</span>
          </span>;
        }
      }
    ],
    default: 'OFF'
  }
};

export default ESettings;
