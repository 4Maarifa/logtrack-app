
import DataService from './data.service';
import SettingsService, { ESettings } from './settings.service';

const { getPaletteFromURL } = require('color-thief-node');

export const DEFAULT_SECOND_COLOR = '#113885';

const ColorService = {
  getMainColorsOfImage(image) {
    return getPaletteFromURL(image, 8, 1);
  },

  getSecondColor() {
    if(SettingsService.getSettingValue(ESettings.SETTINGS_CUSTOM_COLORS) === 'CUSTOM') {
      if(!!DataService.computed.activeRoleCompany && !!DataService.computed.activeRoleCompany.color) {
        return DataService.computed.activeRoleCompany.color;
      }
    }
    return DEFAULT_SECOND_COLOR;
  },

  convertHEXtoRGB(colorHEX) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHEX);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
  },
  convertRGBtoHEX(colorRGB) {
    return "#" + ((1 << 24) + (colorRGB[0] << 16) + (colorRGB[1] << 8) + colorRGB[2]).toString(16).slice(1);
  },

  isDarkColor(colorRGB) {
    return (colorRGB[0] + colorRGB[1] + colorRGB[2]) < (128 * 3);
  },
  isLightColor(colorRGB) {
    return (colorRGB[0] + colorRGB[1] + colorRGB[2]) > (128 * 3);
  },
  isMedColor(colorRGB) {
    let colorSum = colorRGB[0] + colorRGB[1] + colorRGB[2];
    return colorSum > (64 * 3) && colorSum < (192 * 3);
  }
};

export default ColorService;