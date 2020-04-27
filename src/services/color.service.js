
import DataService from './data.service';
import SettingsService, { ESettings } from './settings.service';

const { getPaletteFromURL } = require('color-thief-node');

export const DEFAULT_SECOND_COLOR = '#113885';

const ColorService = {
  getMainColorsOfImage: image => getPaletteFromURL(image, 8, 1),

  getSecondColor: () => {
    if(SettingsService.getSettingValue(ESettings.SETTINGS_CUSTOM_COLORS) === 'CUSTOM' && DataService.computed.activeRoleCompany && DataService.computed.activeRoleCompany.color) {
      return DataService.computed.activeRoleCompany.color;
    }
    return DEFAULT_SECOND_COLOR;
  },

  convertHEXtoRGB: colorHEX => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHEX);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
  },
  convertRGBtoHEX: colorRGB => '#' + ((1 << 24) + (colorRGB[0] << 16) + (colorRGB[1] << 8) + colorRGB[2]).toString(16).slice(1),

  isDarkColor: colorRGB => (colorRGB[0] + colorRGB[1] + colorRGB[2]) < (128 * 3),
  isLightColor: colorRGB => (colorRGB[0] + colorRGB[1] + colorRGB[2]) > (128 * 3),
  isMedColor: colorRGB => {
    const colorSum = colorRGB[0] + colorRGB[1] + colorRGB[2];
    return colorSum > (64 * 3) && colorSum < (192 * 3);
  },

  lightenDarkenColor: (colorHEX, amount) => {
    colorHEX = colorHEX.slice(1);
 
    let num = parseInt(colorHEX, 16);
 
    let r = (num >> 16) + amount;
 
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
 
    let b = ((num >> 8) & 0x00FF) + amount;
 
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
 
    let g = (num & 0x0000FF) + amount;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return '#' + (g | (b << 8) | (r << 16)).toString(16);
  }
};

export default ColorService;
