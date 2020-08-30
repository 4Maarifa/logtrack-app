import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import FormLocationInput from './../../../../components/Utils/FormElements/FormLocationInput/FormLocationInput';

import GeoService from './../../../../services/geo.service';

jest.mock('./../../../../services/geo.service');
jest.mock('./../../../../components/Utils/Map/Map');

const SELECTED_ITEM = {
  content: <span>Road 1, City 1, None</span>,
  value: {
    address: { road: 'Road 1', city: 'City 1', country: 'None' },
    boundingBox: [ '-2', '-2', '0', '0' ],
    coordinates: [ -1, -1 ],
    display_name: 'Road 1, City 1, None',
    importance: 0.15,
    lat: '-1',
    lon: '-1',
    osm_id: 2,
    osm_type: 'way',
    place_id: 1002,
    type: 'road'
  }
};

test('<FormLocationInput /> - invalid', async () => {

  const LOCATION_ITEM_CHANGED_CALLBACK = jest.fn();
  const ON_VALUE_CHANGED = jest.fn();

  const { container } = render(<form>
    <FormLocationInput inputRequired
                        fieldName="FIELDNAME_TEST"
                        selectedItemKey=''
                        onValueChange={ON_VALUE_CHANGED}
                        onSelectedItemChange={LOCATION_ITEM_CHANGED_CALLBACK} />
  </form>);

  // Check that the form in invalid (there is no selected item)
  expect(container.querySelector('form').checkValidity()).toBeFalsy();

  // Check that the searchPlaces mock function has not been called yet
  expect(GeoService.searchPlaces).toHaveBeenCalledTimes(0);

  // Check that the value changed callback has not been called yet
  expect(ON_VALUE_CHANGED).toHaveBeenCalledTimes(0);

  // Launch timer
  const TIMER_START = +new Date();

  // Change input value
  fireEvent.change(container.querySelector('input.input'), { target: { value: 'test' } });
  
  // Check that the searchPlaces mock function has been called
  await waitFor(() => expect(GeoService.searchPlaces).toHaveBeenCalledTimes(1), { timeout: 5000 });

  // Stop timer
  const TIMER_STOP = +new Date();
  const TIMER_TIME = TIMER_STOP - TIMER_START;

  // Check for debounce time
  expect(TIMER_TIME).toBeGreaterThan(1000);
  expect(TIMER_TIME).toBeLessThan(1500);

  // Check that value changed callback has been called
  expect(ON_VALUE_CHANGED).toHaveBeenCalledTimes(1);
  expect(ON_VALUE_CHANGED).toHaveBeenCalledWith('test', 'FIELDNAME_TEST');

  // Check that places are proposed to the user
  expect(screen.queryByText('Impasse 1, City 1, None')).toBeInTheDocument();
  expect(screen.queryByText('Road 1, City 1, None')).toBeInTheDocument();

  // Check that location callback has not been called yet
  expect(LOCATION_ITEM_CHANGED_CALLBACK).toHaveBeenCalledTimes(0);

  // Click on an item
  await act(async () => {
    await fireEvent.click(screen.getByText('Road 1, City 1, None'));
  });

  // Check that location callback was called with correct arguments
  expect(LOCATION_ITEM_CHANGED_CALLBACK).toHaveBeenCalledTimes(1);
  expect(LOCATION_ITEM_CHANGED_CALLBACK).toHaveBeenCalledWith('2', 'FIELDNAME_TEST', SELECTED_ITEM);
});

test('<FormLocationInput /> - valid', async () => {
  
  const LOCATION_ITEM_CHANGED_CALLBACK = jest.fn();

  const { container } = render(<form>
    <FormLocationInput inputRequired
                        fieldName="FIELDNAME_TEST"
                        selectedItemKey='item2'
                        selectedItem={SELECTED_ITEM}
                        onSelectedItemChange={LOCATION_ITEM_CHANGED_CALLBACK} />
  </form>);

  // Check that the item is printed
  expect(screen.queryByText('Road 1, City 1, None')).toBeInTheDocument();

  // Check that the marker is present
  expect(screen.queryByText('MARKER - lat: -1 - lon: -1 - popup: Road 1, City 1, None')).toBeInTheDocument();

  // Check that the form is valid
  expect(container.querySelector('form').checkValidity()).toBeTruthy();

  // Check that the callback has not been called yet
  expect(LOCATION_ITEM_CHANGED_CALLBACK).toHaveBeenCalledTimes(0);

  // click on reset button
  await act(async () => {
    await fireEvent.click(container.querySelector('.selected-item span.action'));
  });

  // Check that reset button has called the callback
  expect(LOCATION_ITEM_CHANGED_CALLBACK).toHaveBeenCalledTimes(1);
  expect(LOCATION_ITEM_CHANGED_CALLBACK).toHaveBeenCalledWith('', 'FIELDNAME_TEST', null);
});
