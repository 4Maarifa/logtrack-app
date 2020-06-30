
import DataService from './data.service';
import SettingsService, { ESettings } from './settings.service';

import { getPaletteFromURL } from 'color-thief-node';

/**
 * Service: ColorService
 * Operations on colors, and builtin palette
 */
const ColorService = {

  // Compute main colors from an image
  getMainColorsOfImage: image => getPaletteFromURL(image, 8, 1),

  // Get the company color, or the theme color if the user has no active role or if he chose to not personalize the color
  getSecondColor: () => {
    if(SettingsService.getSettingValue(ESettings.SETTINGS_CUSTOM_COLORS) === 'CUSTOM' && DataService.computed.activeRoleCompany && DataService.computed.activeRoleCompany.color) {
      return DataService.computed.activeRoleCompany.color;
    }
    return DEFAULT_SECOND_COLOR;
  },

  // Convert a #HEX color to an array [ R, G, B ]
  convertHEXtoRGB: colorHEX => {
    const RESULT = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHEX);
    return RESULT ? [parseInt(RESULT[1], 16), parseInt(RESULT[2], 16), parseInt(RESULT[3], 16)] : null;
  },

  // convert a [ R, G, G ] array to an #HEX
  convertRGBtoHEX: colorRGB => '#' + ((1 << 24) + (colorRGB[0] << 16) + (colorRGB[1] << 8) + colorRGB[2]).toString(16).slice(1),

  // Tells if the [ R, G, B ] array is a dark color or not
  isDarkColor: colorRGB => (colorRGB[0] + colorRGB[1] + colorRGB[2]) < (128 * 3),

  // Tells if the [ R, G, B ] array is a light color or not
  isLightColor: colorRGB => (colorRGB[0] + colorRGB[1] + colorRGB[2]) > (128 * 3),

  // Tells if the [ R, G, B ] array is a rather not too light and not too dark color
  isMedColor: colorRGB => {
    const COLOR_SUM = colorRGB[0] + colorRGB[1] + colorRGB[2];
    return COLOR_SUM > (64 * 3) && COLOR_SUM < (192 * 3);
  },

  // convert a [ R, G, B ] array to an rgba ready string
  addOpacityToRGB: (colorRGB, opacity) => {
    return `rgba(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]}, ${opacity})`;
  },

  // Lighten or darken (with negative number) a #HEX color
  lightenDarkenColor: (colorHEX, amount) => {

    // remove the # from the hex
    colorHEX = colorHEX.slice(1);
 
    // parse the hex color
    let num = parseInt(colorHEX, 16);
 
    // compute red
    let r = (num >> 16) + amount;
 
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
 
    // compute blue
    let b = ((num >> 8) & 0x00FF) + amount;
 
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
 
    // compute green
    let g = (num & 0x0000FF) + amount;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    // return the new #HEX color
    return '#' + (g | (b << 8) | (r << 16)).toString(16);
  },

  // Build a CSS ready gradient with a lighten / darken secondary color
  buildGradientFromHEX: (hexColor, amount) => {

    // Compute an [ R, G, B ] color from the original color
    const RGB_COLOR = ColorService.convertHEXtoRGB(hexColor);

    // Lighen / darken the color and compute the [ R, G, B ] equivalent color
    const OTHER_RGB_COLOR = ColorService.convertHEXtoRGB(ColorService.lightenDarkenColor(hexColor, amount));

    // return the CSS gradient
    return `linear-gradient(to bottom right, rgb(${RGB_COLOR[0]}, ${RGB_COLOR[1]}, ${RGB_COLOR[2]}),
      rgb(${OTHER_RGB_COLOR[0]}, ${OTHER_RGB_COLOR[1]}, ${OTHER_RGB_COLOR[2]}))`
  },

  // by providing an EPalette color, return full details about it
  getPaletteForColor: color => {

    // get the EPalette instance
    const COLOR = EPalette[color];
    if(!COLOR) { return null; }

    // compute all the colors for that palette
    return {
      dark: EDarkPaletteDetails[COLOR],
      medium: EMediumPaletteDetails[COLOR],
      light: ELightPaletteDetails[COLOR],
      veryLight: EVeryLightPaletteDetails[COLOR]
    }
  }
};

/**
 * Enum: EPalette
 * All available colors
 */
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

/**
 * Details of EPalette for dark colors
 * 
 * cssVariable: string | css varialble that also holds the color
 * name: string | Printable name
 * color: string | hex color
 */
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

/**
 * Details of EPalette for medium colors
 * 
 * cssVariable: string | css varialble that also holds the color
 * name: string | Printable name
 * color: string | hex color
 */
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
/**
 * Details of EPalette for light colors
 * 
 * cssVariable: string | css varialble that also holds the color
 * name: string | Printable name
 * color: string | hex color
 */
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
/**
 * Details of EPalette for very light colors
 * 
 * cssVariable: string | css varialble that also holds the color
 * name: string | Printable name
 * color: string | hex color
 */
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

// default theme color
export const DEFAULT_SECOND_COLOR = '#113885';

export default ColorService;
