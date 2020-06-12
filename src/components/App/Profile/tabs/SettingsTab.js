import React from 'react';

import SettingsService, { ESettings, ESettingsDetails } from './../../../../services/settings.service';

const SettingsTab = () => (
  <div className="tab-content">
    <div className="settings-container">
      {Object.keys(ESettings).map(settingKey => 
        <div className="setting-container" key={settingKey}>
          {ESettingsDetails[settingKey].title}
          {ESettingsDetails[settingKey].note &&
            <div className="setting-note">{ESettingsDetails[settingKey].note}</div>
          }
          <ul>
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
