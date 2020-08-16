
import UtilsService from './../../services/utils.service';

jest.mock('./../../services/firebase.service');
jest.mock('./../../services/data.service');

test('UtilsService.capitalize', () => {
  expect(UtilsService.capitalize('hello!')).toEqual('Hello!');
});

test('UtilsService.removeDuplicateFromArray', () => {
  expect(UtilsService.removeDuplicateFromArray(['a', 'b', 'b', 'c'])).toEqual(['a', 'b', 'c']);
});

test('UtilsService.filterKeysOnPropertyValue', () => {
  expect(UtilsService.filterKeysOnPropertyValue({ a: true, b: true, c: false }, val => val)).toEqual(['a', 'b']);
});

test('UtilsService.filterObjectsOnPropertyValue', () => {
  expect(UtilsService.filterObjectsOnPropertyValue({ a: 'a1', b: 'a2', c: 'b' }, val => val.startsWith('a'))).toEqual(['a1', 'a2']);
});

test('UtilsService.filterKeyValueOnPropertyValue', () => {
  expect(UtilsService.filterKeyValueOnPropertyValue({ a: 'a1', b: 'a2', c: 'b' }, val => val.startsWith('a'))).toEqual({ a: 'a1', b: 'a2' });
});

test('UtilsService.mergeObjects', () => {
  expect(UtilsService.mergeObjects({ a: 'a1' }, { b: 'a2' }, { c: 'b' })).toEqual({ a: 'a1', b: 'a2', c: 'b' });
});

test('UtilsService.compareArrays', () => {
  expect(UtilsService.compareArrays(['a', 'b', ['c', 'd'] ], ['a', 'b', ['c', 'd'] ])).toBeTruthy();
  expect(UtilsService.compareArrays(['a', 'b', ['c', 'd'] ], ['a', 'b', ['c', 'd1'] ])).toBeFalsy();
});

test('UtilsService.compareFn', () => {
  expect(UtilsService.compareFn('a', 'b')).toEqual(-1);
  expect(UtilsService.compareFn('a', 'a')).toEqual(0);
  expect(UtilsService.compareFn('b', 'a')).toEqual(1);
});

test('UtilsService.flattenObject', () => {
  expect(UtilsService.flattenObject({ a: 'a', b: { c: 'c' } })).toEqual({ a: 'a', 'b.c': 'c' });
});
