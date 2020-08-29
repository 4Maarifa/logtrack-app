import React, { useRef, useState, useEffect } from 'react';

import FormDebounceAutoSuggestInput from './../FormDebounceAutoSuggestInput/FormDebounceAutoSuggestInput';
import Map from './../../Map/Map';

import GeoService from './../../../../services/geo.service';
import ErrorService from './../../../../services/error.service';

import './FormLocationInput.scss';

/**
 * Component: FormLocationInput
 * Form Element that permits users to input location
 * This form input depends on FormDebounceAutoSuggestInput. Therefore, it needs to have a selected item to be valid.
 * 
 * selectedItem: object | value of the selected item
 * selectedItemKey: string | Key of the selected item
 * onSelectedItemChange: funciton(itemKey, fieldName, itemData) | This function
 *    call must save values and pass them again in selectedItem and selectedItemKey 
 * fieldName: string | unique identifier of the input. Returned when the callback onSelectedItemChange is called
 * label: HTML | label of the input
 * inputName: string | identifier of the field in the form
 * inputRequired: boolean | tells if the fact that the user selects a location is mandatory
 * instructions | HTML | instructions to the user
 * 
 * Behaviour:
 * 1. The user enters a search term
 * 2. at each change, the possible locations are computed
 * 3. the item proposes the different locations
 * 4. The user selects an item
 * 5. the callback onSelectedItemChange is called with the item data
 * 6. YOU save the values and pass them back
 * 7. The input shows the selected item
 */
const FormLocationInput = ({ selectedItem,
                            selectedItemKey,
                            onSelectedItemChange,
                            fieldName,
                            label,
                            inputName,
                            inputRequired,
                            instructions }) => {

  // Possible locations
  const [possibleLocationsInput, setPossibleLocationsInput] = useState('');
  const [possibleLocations, setPossibleLocations] = useState({});

  // Markerid to reference the map marker
  const [locationMarkerId, setLocationMarkerId] = useState(null);

  // Reference to the Map
  const REF_MAP = useRef(null);

  // Autosuggest location
  const onLocationAutoCompleteChange = inputValue => {

    // save input value
    setPossibleLocationsInput(inputValue);

    // search for places
    GeoService.searchPlaces(inputValue, { addressdetails: 0 })
      .then(values => {

        // parse results
        const NEW_POSSIBLE_LOCATIONS = {};
        values.forEach(value => {

          // parse coordinates
          value.coordinates = GeoService.transformCoordinates([
            parseFloat(value.lon),
            parseFloat(value.lat)
          ]);

          // parse values to be printed into autosuggest input
          NEW_POSSIBLE_LOCATIONS[value.osm_id] = {
            content: <span>
              {value.display_name}
            </span>,
            value: value
          };
        });

        // set data for autosuggest input to print values
        setPossibleLocations(NEW_POSSIBLE_LOCATIONS);
      })
      .catch(ErrorService.manageError);
  };

  // Center on marker
  const centerOnLocationMarker = () => locationMarkerId && REF_MAP.current.centerOnMarker(locationMarkerId);

  useEffect(() => {
    // If map is not initialized yet, return
    if(!REF_MAP || !REF_MAP.current) {
      return;
    }

    if(!selectedItem) {
      if(locationMarkerId) {
        // If location was removed, and marker is present, delete marker and marker reference
        REF_MAP.current.deleteMarker(locationMarkerId);
        setLocationMarkerId(null);
      }
      return;
    }
    // else, if new location is selected

    // If a marker is already present
    if(locationMarkerId) {

      // move the marker to the new place, with new content
      REF_MAP.current.switchMarker(
        locationMarkerId,
        selectedItem.value.coordinates[0],
        selectedItem.value.coordinates[1],
        selectedItem.value.display_name);

      // then center the map on the moved marker
      centerOnLocationMarker();
    }
    else {

      // otherwise, if no marker is present, create a new marker
      // The map will center itself automatically on the newly created marker
      // Then, save the unique marker id for further reference
      setLocationMarkerId(REF_MAP.current.addMarker(
        selectedItem.value.coordinates[0],
        selectedItem.value.coordinates[1],
        selectedItem.value.display_name));
    }
  }, [selectedItemKey, selectedItem]);
  
  // When the marker id is changed, center automatically the map
  useEffect(() => {
    centerOnLocationMarker()
  }, [locationMarkerId]);

  return <div className="FormLocationInput">
    <FormDebounceAutoSuggestInput
      value={possibleLocationsInput}
      label={label}
      inputName={inputName}
      possibleItems={possibleLocations}
      onValueChange={onLocationAutoCompleteChange}
      onSelectedItemChange={onSelectedItemChange}
      inputAutoComplete="off"
      inputRequired={inputRequired}
      fieldName={fieldName}
      selectedItemKey={selectedItemKey}
      selectedItem={selectedItem}
      instructions={instructions} />
    <Map ref={REF_MAP} />
  </div>;
};

export default FormLocationInput;

