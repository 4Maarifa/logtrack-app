
import DataService from './data.service';
import SettingsService, { ESettings } from './settings.service';

const { getPaletteFromURL } = require('color-thief-node');

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

  addOpacityToRGB: (colorRGB, opacity) => {
    return `rgba(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]}, ${opacity})`;
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
  },
  buildGradientFromHEX: (hexColor, amount) => {
    const rgbColor = ColorService.convertHEXtoRGB(hexColor);
    const otherRgbColor = ColorService.convertHEXtoRGB(ColorService.lightenDarkenColor(hexColor, amount));
    return `linear-gradient(to bottom right, rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}),
      rgb(${otherRgbColor[0]}, ${otherRgbColor[1]}, ${otherRgbColor[2]}))`
  }
};

export const EPalette = {
  GRAY: 'GRAY',
  BLUE: 'BLUE',
  RED: 'RED',
  YELLOW: 'YELLOW',
  GREEN: 'GREEN',
  PINK: 'PINK',
  PURPLE: 'PURPLE',
  TURQUOISE: 'TURQUOISE'
};

export const EDarkPaletteDetails = {
  [EPalette.GRAY]: {
    cssVariable: '--dark-palette-gray',
    name: 'Gray',
    color: '#6C737E'
  },
  [EPalette.BLUE]: {
    cssVariable: '--dark-palette-blue',
    name: 'Blue',
    color: '#0D5CDD'
  },
  [EPalette.RED]: {
    cssVariable: '--dark-palette-red',
    name: 'Red',
    color: '#C72315'
  },
  [EPalette.YELLOW]: {
    cssVariable: '--dark-palette-yellow',
    name: 'Yellow',
    color: '#C49303'
  },
  [EPalette.GREEN]: {
    cssVariable: '--dark-palette-green',
    name: 'Green',
    color: '#357B49'
  },
  [EPalette.PINK]: {
    cssVariable: '--dark-palette-pink',
    name: 'Pink',
    color: '#F20085'
  },
  [EPalette.PURPLE]: {
    cssVariable: '--dark-palette-purple',
    name: 'Purple',
    color: '#8F1CF3'
  },
  [EPalette.TURQUOISE]: {
    cssVariable: '--dark-palette-turquoise',
    name: 'Turquoise',
    color: '#1999B3'
  }
};

export const EMediumPaletteDetails = {
  [EPalette.GRAY]: {
    cssVariable: '--medium-palette-gray',
    name: 'Gray',
    color: '#949AA3'
  },
  [EPalette.BLUE]: {
    cssVariable: '--medium-palette-blue',
    name: 'Blue',
    color: '#4286F4'
  },
  [EPalette.RED]: {
    cssVariable: '--medium-palette-red',
    name: 'Red',
    color: '#EB4B3D'
  },
  [EPalette.YELLOW]: {
    cssVariable: '--medium-palette-yellow',
    name: 'Yellow',
    color: '#FCC217'
  },
  [EPalette.GREEN]: {
    cssVariable: '--medium-palette-green',
    name: 'Green',
    color: '#4CB168'
  },
  [EPalette.PINK]: {
    cssVariable: '--medium-palette-pink',
    name: 'Pink',
    color: '#FF3FA9'
  },
  [EPalette.PURPLE]: {
    cssVariable: '--medium-palette-purple',
    name: 'Purple',
    color: '#B365F7'
  },
  [EPalette.TURQUOISE]: {
    cssVariable: '--medium-palette-turquoise',
    name: 'Turquoise',
    color: '#35C6E3'
  }
};

export const ELightPaletteDetails = {
  [EPalette.GRAY]: {
    cssVariable: '--light-palette-gray',
    name: 'Gray',
    color: '#BDC1C6'
  },
  [EPalette.BLUE]: {
    cssVariable: '--light-palette-blue',
    name: 'Blue',
    color: '#8AB4F8'
  },
  [EPalette.RED]: {
    cssVariable: '--light-palette-red',
    name: 'Red',
    color: '#F28B82'
  },
  [EPalette.YELLOW]: {
    cssVariable: '--light-palette-yellow',
    name: 'Yellow',
    color: '#FDD663'
  },
  [EPalette.GREEN]: {
    cssVariable: '--light-palette-green',
    name: 'Green',
    color: '#81C995'
  },
  [EPalette.PINK]: {
    cssVariable: '--light-palette-pink',
    name: 'Pink',
    color: '#FF8BCB'
  },
  [EPalette.PURPLE]: {
    cssVariable: '--light-palette-purple',
    name: 'Purple',
    color: '#D7AEFB'
  },
  [EPalette.TURQUOISE]: {
    cssVariable: '--light-palette-turquoise',
    name: 'Turquoise',
    color: '#78D9EC'
  }
};

export const EVeryLightPaletteDetails = {
  [EPalette.GRAY]: {
    cssVariable: '--very-light-palette-gray',
    name: 'Gray',
    color: '#E6E8E9'
  },
  [EPalette.BLUE]: {
    cssVariable: '--very-light-palette-blue',
    name: 'Blue',
    color: '#D2E2FC'
  },
  [EPalette.RED]: {
    cssVariable: '--very-light-palette-red',
    name: 'Red',
    color: '#F9CBC7'
  },
  [EPalette.YELLOW]: {
    cssVariable: '--very-light-palette-yellow',
    name: 'Yellow',
    color: '#FEEAAF'
  },
  [EPalette.GREEN]: {
    cssVariable: '--very-light-palette-green',
    name: 'Green',
    color: '#DBEFE0'
  },
  [EPalette.PINK]: {
    cssVariable: '--very-light-palette-pink',
    name: 'Pink',
    color: '#FFD8ED'
  },
  [EPalette.PURPLE]: {
    cssVariable: '--very-light-palette-purple',
    name: 'Purple',
    color: '#EFDFFD'
  },
  [EPalette.TURQUOISE]: {
    cssVariable: '--very-light-palette-turquoise',
    name: 'Turquoise',
    color: '#D1F2F8'
  }
};

export const DEFAULT_SECOND_COLOR = '#113885';

export default ColorService;
