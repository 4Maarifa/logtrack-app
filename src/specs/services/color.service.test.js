
import ColorService from './../../services/color.service';

jest.mock('./../../services/firebase.service');
jest.mock('./../../services/data.service');

test('ColorService.getThemeColor', () => {
  // Check if the color is corretly loaded from the activeRoleCompany
  expect(ColorService.getThemeColor()).toBe('#999999');
});

test('ColorService.convertHEXtoRGB', () => {
  expect(ColorService.convertHEXtoRGB('#000000')).toEqual([0, 0, 0]);
  expect(ColorService.convertHEXtoRGB('#FFFFFF')).toEqual([255, 255, 255]);
  expect(ColorService.convertHEXtoRGB('#F8E91A')).toEqual([248, 233, 26]);
});

test('ColorService.convertRGBtoHEX', () => {
  expect(ColorService.convertRGBtoHEX([0, 0, 0]).toLowerCase()).toBe('#000000');
  expect(ColorService.convertRGBtoHEX([255, 255, 255]).toLowerCase()).toBe('#ffffff');
  expect(ColorService.convertRGBtoHEX([248, 233, 26]).toLowerCase()).toBe('#f8e91a');
});

test('ColorService.isDarkColor', () => {
  expect(ColorService.isDarkColor([0, 0, 0])).toBeTruthy();
  expect(ColorService.isDarkColor([255, 255, 255])).toBeFalsy();
  expect(ColorService.isDarkColor([248, 233, 26])).toBeFalsy();
});

test('ColorService.isLightColor', () => {
  expect(ColorService.isLightColor([0, 0, 0])).toBeFalsy();
  expect(ColorService.isLightColor([255, 255, 255])).toBeTruthy();
  expect(ColorService.isLightColor([248, 233, 26])).toBeTruthy();
});

test('ColorService.isMedColor', () => {
  expect(ColorService.isMedColor([0, 0, 0])).toBeFalsy();
  expect(ColorService.isMedColor([255, 255, 255])).toBeFalsy();
  expect(ColorService.isMedColor([248, 233, 26])).toBeTruthy();
});

test('ColorService.addOpacityToRGB', () => {
  expect(ColorService.addOpacityToRGB([0, 0, 0], 0)).toBe('rgba(0, 0, 0, 0)');
  expect(ColorService.addOpacityToRGB([0, 0, 0], 0.5)).toBe('rgba(0, 0, 0, 0.5)');
});

test('ColorService.lightenDarkenColor', () => {
  expect(ColorService.lightenDarkenColor('#FFFFFF', 20).toLowerCase()).toBe('#ffffff');
  expect(ColorService.lightenDarkenColor('#F8E91A', 20).toLowerCase()).toBe('#fffd2e');
  expect(ColorService.lightenDarkenColor('#F8E91A', -20).toLowerCase()).toBe('#e4d506');
  expect(ColorService.lightenDarkenColor('#FFFFFF', -1).toLowerCase()).toBe('#fefefe');
});

test('ColorService.buildGradientFromHEX', () => {
  expect(ColorService.buildGradientFromHEX('#101010', 0)).toBe(`linear-gradient(to bottom right, rgb(16, 16, 16), rgb(16, 16, 16))`);
  expect(ColorService.buildGradientFromHEX('#F8E91A', 20)).toBe(`linear-gradient(to bottom right, rgb(248, 233, 26), rgb(255, 253, 46))`);
});

