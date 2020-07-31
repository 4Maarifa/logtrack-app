import toastr from 'toastr';

import ErrorService from './../../services/error.service';

import SpecUtils from './../SpecUtils';

const errorFn = jest.spyOn(toastr, 'error');
const infoFn = jest.spyOn(toastr, 'info');
const warningFn = jest.spyOn(toastr, 'warning');
const successFn = jest.spyOn(toastr, 'success');

const clearFn = jest.spyOn(toastr, 'clear');

// Ignore console errors as we test the error throw here
beforeAll(SpecUtils.mockConsole);
afterAll(SpecUtils.restoreConsole);

test('ErrorService.error', () => {
  ErrorService.error('test', 'test');
  expect(errorFn).toHaveBeenCalledTimes(1);
});

test('ErrorService.info', () => {
  ErrorService.info('test', 'test');
  expect(infoFn).toHaveBeenCalledTimes(1);
});

test('ErrorService.warning', () => {
  ErrorService.warning('test', 'test');
  expect(warningFn).toHaveBeenCalledTimes(1);
});

test('ErrorService.success', () => {
  ErrorService.success('test', 'test');
  expect(successFn).toHaveBeenCalledTimes(1);
});

test('ErrorService.clear', () => {
  ErrorService.clear();
  expect(clearFn).toHaveBeenCalledTimes(1);
});

test('ErrorService.manageError', () => {
  ErrorService.manageError({ code: 'auth/wrong-password' });
  expect(errorFn).toHaveBeenLastCalledWith('Wrong password', undefined);
});

test('ErrorService.manageErrorThenReject', async () => {
  return await expect(new Promise((_, reject) => {
    ErrorService.manageErrorThenReject('error', reject);
  })).rejects.toBe('error');
});

test('ErrorService.manageErrorThemPromiseRejection', async () => {
  return await expect(ErrorService.manageErrorThenPromiseRejection('error')).rejects.toBe('error');
});
