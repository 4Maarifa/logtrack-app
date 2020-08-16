
import SettingsService, { ESettings } from './../../services/settings.service';

jest.mock('./../../services/firebase.service');
jest.mock('./../../services/data.service');

test('SettingsService.getSettingValue', () => {
  expect(SettingsService.getSettingValue(ESettings.SETTINGS_FULL_PAGE_LAYOUT)).toEqual('CLEAR');

  // Default value
  expect(SettingsService.getSettingValue(ESettings.SETTINGS_NAV_COLLAPSED)).toEqual('COLLAPSED');
});
