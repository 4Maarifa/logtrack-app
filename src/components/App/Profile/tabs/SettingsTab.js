import React from 'react';

import SettingsService, { ESettings, ESettingsDetails } from './../../../../services/settings.service';

/**
 * Component: SettingsTab
 * Tab of Profile Component
 * 
 * Used to change user's settings about LogTrack
 */
const SettingsTab = () => (
  <div className="tab-content">
    <div className="settings-container">
      {/* For each existing setting, print it */}
      {Object.keys(ESettings).map(settingKey => 
        <div className="setting-container" key={settingKey}>
          {ESettingsDetails[settingKey].title}
          {ESettingsDetails[settingKey].note &&
            <div className="setting-note">{ESettingsDetails[settingKey].note}</div>
          }

          {/* Then print all available options for it */}
          <ul>
            {/* On click of one option, update it using SettingsService */}
            {ESettingsDetails[settingKey].options.map(settingOption =>
              <li key={settingOption.value} className={(SettingsService.getSettingValue(settingKey) === settingOption.value ? 'selected' : '')}
                onClick={() => SettingsService.updateSetting(settingKey, settingOption.value)}>
                {settingOption.print()}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  </div> 
);

export default SettingsTab;
