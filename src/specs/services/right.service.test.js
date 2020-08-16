
import RightService, { ERights } from './../../services/right.service';

jest.mock('./../../services/firebase.service');
jest.mock('./../../services/data.service');

test('Staff role', () => {
  expect(RightService.hasAppRight(ERights.APP_CAN_USE_ADMIN_MANAGEMENT)).toBeFalsy();
});

test('Driver role', () => {
  expect(RightService.hasAppRight(ERights.APP_CAN_USE_GPS)).toBeFalsy();
});

test('Mechanic role', () => {
  expect(RightService.hasAppRight(ERights.APP_CAN_USE_MAINTENANCE)).toBeFalsy();
});

test('Manager role', () => {
  expect(RightService.hasAppRight(ERights.APP_CAN_USE_CONTRACT_MANAGEMENT)).toBeTruthy();
});

test('Default deny', () => {
  expect(RightService.hasAppRight('RIGHT_THAT_DOES_NOT_EXIST')).toBeFalsy();
});
