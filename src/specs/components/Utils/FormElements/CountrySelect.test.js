import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Countries from 'world-countries/dist/countries.json';

import CountrySelect, { getCountryCCAFromName, getCountryDetailsFromCCA, getCountryDetailsFromName, 
  getCountryNameFromCCA, getFlag } from './../../../../components/Utils/FormElements/CountrySelect/CountrySelect';

test('CountrySelect - other exports', () => {

  // Get a random country to test with
  const RANDOM_COUNTRY = Countries[Math.floor(Math.random() * Countries.length)];

  // Get flag
  expect(getFlag(Countries[0].cca2)).toBeDefined();
  expect(getFlag('ZZ14324Z')).toBeNull();

  // getCountryDetailsFromCCA
  expect(getCountryDetailsFromCCA(RANDOM_COUNTRY.cca2).country).toBe(RANDOM_COUNTRY);
  expect(getCountryDetailsFromCCA('ZZFDGSGA')).toBeNull();

  // getCountryDetailsFromName
  expect(getCountryDetailsFromName(RANDOM_COUNTRY.name.common).country).toBe(RANDOM_COUNTRY);
  expect(getCountryDetailsFromName('ZZFDGSGA')).toBeNull();

  // getCountryCCAFromName
  expect(getCountryCCAFromName(RANDOM_COUNTRY.name.common)).toBe(RANDOM_COUNTRY.cca2);
  expect(getCountryCCAFromName('ZZFDGSGA')).toBeNull();

  // getCountryNameFromCCA
  expect(getCountryNameFromCCA(RANDOM_COUNTRY.cca2)).toBe(RANDOM_COUNTRY.name.common);
  expect(getCountryNameFromCCA('ZZFDGSGA')).toBeNull();
});

test('<CountrySelect /> - invalid', async () => {

  const SELECTED_ITEM_CALLBACK = jest.fn();

  const { container } = render(<form>
    <CountrySelect inputRequired
                    onSelectedItemChange={SELECTED_ITEM_CALLBACK} />
  </form>);

  // Check that form is not valid
  expect(container.querySelector('form').checkValidity()).toBeFalsy();

  // Control that the possible items list is not deployed
  expect(container.querySelector('ul.items')).not.toBeInTheDocument();

  await act(async () => {
    // Focus on the select button (click does not focus the element)
    await fireEvent.focus(screen.getByRole('button'));
  });

  // Check that list is deployed
  expect(container.querySelector('ul.items')).toBeInTheDocument();

  // Compute number of entries
  const initialEntriesCount = container.querySelector('ul.items').children.length;

  // Control that all countries are displayed (+ search item)
  expect(initialEntriesCount).toBe(Countries.length + 1);

  await act(async () => {
    // Enter search term to filter countries
    await fireEvent.change(container.querySelector('.input-search input.input'), { target: { value: 'g' } });
  });

  // Check that number of entries has decreased
  expect(container.querySelector('ul.items').children.length).toBeLessThan(initialEntriesCount);

  // Get first country in the list
  const FIRST_ITEM = container.querySelector('ul.items li:nth-child(2)');
  const FIRST_COUNTRY = FIRST_ITEM[Object.keys(FIRST_ITEM)[0]].key;
  const FIRST_COUNTRY_CCA = getCountryCCAFromName(FIRST_COUNTRY);

  // Verify that callback has not been called yet
  expect(SELECTED_ITEM_CALLBACK).toHaveBeenCalledTimes(0);

  await act(async () => {
    // Click on first country available (pas the search list item)
    await fireEvent.click(container.querySelector('ul.items').children[1]);
  
    // Remove focus on select component
    await fireEvent.blur(screen.getByRole('button'));
  });

  // Control that the possible items list is not deployed
  await waitFor(() => expect(container.querySelector('ul.items')).not.toBeInTheDocument());

  // Check that the callback was called with correct arguments
  expect(SELECTED_ITEM_CALLBACK).toHaveBeenCalledTimes(1);

  // get arguments and verify the selected country
  const MOCK_CALL_ARGUMENT_COUNTRY = SELECTED_ITEM_CALLBACK.mock.calls[0][2].value;
  expect(MOCK_CALL_ARGUMENT_COUNTRY).toBe(FIRST_COUNTRY_CCA);
});

test('<CountrySelect /> - valid', () => {

  const SELECTED_ITEM_CALLBACK = jest.fn();

  const SELECTED_COUNTRY_KEY = Countries[0].name.common;
  const SELECTED_COUNTRY_ITEM = {
    value: 'TEST',
    content: <span>TEST</span>
  };

  const { container } = render(<form>
    <CountrySelect selectedItemKey={SELECTED_COUNTRY_KEY}
                    selectedItem={SELECTED_COUNTRY_ITEM}
                    inputRequired
                    onSelectedItemChange={SELECTED_ITEM_CALLBACK} />
  </form>);

  // Check that the item is printed
  expect(screen.queryByText('TEST')).toBeInTheDocument();

  // Check that the form is valid
  expect(container.querySelector('form').checkValidity()).toBeTruthy();

  // Focus the select button to expand list
  fireEvent.focus(screen.getByRole('button'));

  // Check that list is deployed
  expect(container.querySelector('ul.items')).toBeInTheDocument();

  // Control that all countries are displayed (+ search item)
  expect(container.querySelector('ul.items').children.length).toBe(Countries.length + 1);

  // Verify that the callback has not been called yet
  expect(SELECTED_ITEM_CALLBACK).toHaveBeenCalledTimes(0);

  // Click on the first country printed
  fireEvent.click(container.querySelector('ul.items').children[1]);
  
  // Remove focus on select component
  fireEvent.blur(screen.getByRole('button'));

  // Control that the possible items list is not deployed
  waitFor(() => expect(container.querySelector('ul.items')).not.toBeInTheDocument());

  // Check that the callback was called
  expect(SELECTED_ITEM_CALLBACK).toHaveBeenCalledTimes(1);
});
