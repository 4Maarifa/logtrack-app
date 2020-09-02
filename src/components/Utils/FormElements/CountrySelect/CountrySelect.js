import React from 'react';
import { faFlag } from '@fortawesome/pro-light-svg-icons';

import CountryFlags from 'country-flag-icons/react/3x2';
import { hasFlag } from 'country-flag-icons';
import Countries from 'world-countries/dist/countries.json';

import Select from '../Select/Select';
import Icon from '../../Icon/Icon';

import './CountrySelect.scss';

// Get the rendered flag for a country's CCA2
export const getFlag = cca2 => {
  if(hasFlag(cca2) && CountryFlags[cca2]) {
    const CountryFlag = CountryFlags[cca2];
    return <CountryFlag />;
  }
  return null;
};

// Convert the array of countries to an object that contains both the value, and the content with the flag and country name.
const FINAL_COUNTRIES = {};
Countries.forEach(country => {

  // Get the SVG of the country's flag
  const CountryFlag = CountryFlags[country.cca2];

  // Assign the value, the country for further uses (get the CCA2) and the printable content
  FINAL_COUNTRIES[country.name.common] = {
    value: country.cca2,
    country,
    content: <span className="country-item">
      {/* If we find a flag corresponding to the CC2 (ISO-3166-1-alpha-2), get it and print it */}
      {hasFlag(country.cca2) ? <CountryFlag className="country-item-flag" /> : null}

      {/* Country's name */}
      {country.name.common}
    </span>
  };
});

export const countries = FINAL_COUNTRIES;

// Get all the country properties for the CCA2
export const getCountryDetailsFromCCA = cca2 => {
  const FILTERED_COUNTRIES = Object.values(FINAL_COUNTRIES).filter(country => country.country.cca2 === cca2);
  return FILTERED_COUNTRIES.length ? FILTERED_COUNTRIES[0] : null;
};

// Get all the country properties for the country's name
export const getCountryDetailsFromName = name => {
  const FILTERED_COUNTRIES = Object.values(FINAL_COUNTRIES).filter(country => {
    return country.country.name && country.country.name.common === name;
  });
  return FILTERED_COUNTRIES.length ? FILTERED_COUNTRIES[0] : null;
};

// Get country name from the CCA2 code
export const getCountryNameFromCCA = cca2 => {
  const COUNTRY = getCountryDetailsFromCCA(cca2);
  return COUNTRY ? COUNTRY.country.name.common : null;
};

// Get the country CCA2 code from the country's name
export const getCountryCCAFromName = name => {
  const COUNTRY = getCountryDetailsFromName(name);
  return COUNTRY ? COUNTRY.country.cca2 : null;
}

/**
 * Component: CountryInput
 * Form Element to select a country
 * 
 * selectedItemKey: string | key if the selected item
 * selectedItem: object | value of the selected item
 * onSelectedItemChange: function(itemKey, fieldname, itemData) | callback when an item is selected
 * inputRequired: boolean | tells if an item must be selected or not
 * label: HTML | label of the input
 * instructions: HTML | instructions for the user
 * fieldName: string | unique identifier of the input, returned along values in the callback to identiy this field
 * 
 * Behaviour:
 * 1. The user clicks the input
 * 2. The user selects an item
 * 3. At each change, the callback onSelectedItemChange is called
 * 4. YOU have to save the values and pass them back to the input
 * 5. The selected country is displayed
 */
const CountrySelect = ({ selectedItemKey,
                        selectedItem,
                        onSelectedItemChange,
                        inputRequired,
                        label,
                        instructions,
                        fieldName }) => {

  /**
   * RENDER
   */


  return <div className="CountrySelect">
    <Select possibleItems={FINAL_COUNTRIES}
            selectedItemKey={selectedItemKey}
            selectedItem={selectedItem}
            onSelectedItemChange={onSelectedItemChange}
            inputRequired={inputRequired}
            label={label || <span><Icon source="fa" icon={faFlag} />Country</span>}
            searchFn={(key, _, search) => FINAL_COUNTRIES[key].country.name.common.toLowerCase().includes(search.toLowerCase())}
            instructions={instructions}
            fieldName={fieldName} />
  </div>;
};

export default CountrySelect;
