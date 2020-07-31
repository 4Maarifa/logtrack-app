
import ObserverService from './../../services/observer.service';

import { v4 as uuid } from 'uuid';

test('ObserverService - observer without options', async () => {
  const OBSERVER_CALLBACK = jest.fn();
  const OBSERVER_ID = uuid();

  const VIRTUAL_SERVICE = {};

  ObserverService.initialize(VIRTUAL_SERVICE, 'TEST', {});

  expect(VIRTUAL_SERVICE).toHaveProperty('addObserver');
  expect(VIRTUAL_SERVICE).toHaveProperty('removeObserver');
  expect(VIRTUAL_SERVICE).toHaveProperty('updateObservers');

  await VIRTUAL_SERVICE.addObserver(OBSERVER_CALLBACK, OBSERVER_ID);

  expect(OBSERVER_CALLBACK).toHaveBeenCalledTimes(1);

  await VIRTUAL_SERVICE.updateObservers();

  expect(OBSERVER_CALLBACK).toHaveBeenCalledTimes(2);

  await VIRTUAL_SERVICE.removeObserver(OBSERVER_ID);
  await VIRTUAL_SERVICE.updateObservers();

  expect(OBSERVER_CALLBACK).toHaveBeenCalledTimes(2);
});

test('ObserverService - observer with options', async () => {
  const OBSERVER_CALLBACK = jest.fn();
  const OBSERVER_ID = uuid();

  const START_WATCHER_CALLBACK = jest.fn();
  const STOP_WATCHER_CALLBACK = jest.fn();
  const COMPUTE_CHANGES_CALLBACK = jest.fn();
  const GET_DATA_CALLBACK = jest.fn();

  const VIRTUAL_SERVICE = {};

  ObserverService.initialize(VIRTUAL_SERVICE, 'TEST', {
    startWatcher: START_WATCHER_CALLBACK,
    stopWatcher: STOP_WATCHER_CALLBACK,
    computeChanges: COMPUTE_CHANGES_CALLBACK,
    getData: GET_DATA_CALLBACK
  });

  expect(VIRTUAL_SERVICE).toHaveProperty('addObserver');
  expect(VIRTUAL_SERVICE).toHaveProperty('removeObserver');
  expect(VIRTUAL_SERVICE).toHaveProperty('updateObservers');

  await VIRTUAL_SERVICE.addObserver(OBSERVER_CALLBACK, OBSERVER_ID);

  expect(OBSERVER_CALLBACK).toHaveBeenCalledTimes(1);
  expect(START_WATCHER_CALLBACK).toHaveBeenCalledTimes(1);
  expect(STOP_WATCHER_CALLBACK).toHaveBeenCalledTimes(0);
  expect(GET_DATA_CALLBACK).toHaveBeenCalledTimes(1);

  await VIRTUAL_SERVICE.updateObservers();

  expect(GET_DATA_CALLBACK).toHaveBeenCalledTimes(2);
  expect(OBSERVER_CALLBACK).toHaveBeenCalledTimes(2);

  await VIRTUAL_SERVICE.notifyChanges();

  expect(OBSERVER_CALLBACK).toHaveBeenCalledTimes(3);
  expect(GET_DATA_CALLBACK).toHaveBeenCalledTimes(3);
  expect(COMPUTE_CHANGES_CALLBACK).toHaveBeenCalledTimes(1);

  await VIRTUAL_SERVICE.removeObserver(OBSERVER_ID);

  expect(STOP_WATCHER_CALLBACK).toHaveBeenCalledTimes(1);
});
