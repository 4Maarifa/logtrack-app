import React, { useState, useEffect } from 'react';
import { faCheck, faTimes, faEdit } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import './FormAutoSuggestInput.scss';

import { v4 as uuid } from 'uuid';

/**
 * Component: FormAutoSuggestInput
 * Form element that suggest values
 * This form element needs the user to select from autosuggest values to be valid
 * 
 * value: string | input value (the one that search for values)
 * fieldName: string | unique identifier of the input. Returned along with values to identify this field
 * selectedItemKey: string | key of the selected item
 * selectedItem: object | value of the selected item
 * possibleItems: { itemKey: { value: itemData, content: printable html } } | list of autosuggest values
 * inputRequired: boolean | tells if the fact that the user selects an item is mandatory
 * label: HTML | label of the input
 * inputName: string | identifier of this field
 * inputAutoComplete: string | tells the browser to autocomplete with a name, email, address...
 * instructions: HTML | instructions for the user
 * onValueChange: function(value, fieldName) | callback when the search input value is changed
 * onSelectedItemChange: function(itemKey, fieldName, itemData)
 * 
 * Behaviour: 
 * 1. The user enter a search term
 * 2. at each change, the callback onValueChange is called
 * 3. YOU have to compute the possibleItems, and set them
 * 4. the item proposes the different items
 * 5. the user selects an item
 * 6. the callback onSelectedItemChange is called with the item data
 * 7. you save the value and pass it
 * 8. the form input displays the selected item
 * 
 * If an API call is mandatory to search item, it is highly reommended to use FormDebounceAutosuggestInput instead!
 */
const FormAutoSuggestInput = ({ value,
                                fieldName,
                                selectedItemKey,
                                selectedItem,
                                possibleItems,
                                inputRequired,
                                label,
                                inputName,
                                inputAutoComplete,
                                instructions,
                                onValueChange,
                                onSelectedItemChange }) => {

  // used to know if the instructions should be shown or not
  const [isHover, setHover] = useState(false);

  // When the search input value change, call the callback with the new value
  const onChange = newValue => onValueChange && onValueChange(newValue, fieldName);

  // When an item is clicked, clear the search input and call the callback with the selected item
  const onItemChange = itemKey => {
    onChange('');
    onSelectedItemChange && onSelectedItemChange(itemKey, fieldName, possibleItems[itemKey]);
  };

  // When clearing the selected item, clear both the input value and selected item with callback
  const reset = () => {
    onChange('');
    onSelectedItemChange && onSelectedItemChange('', fieldName, null);
  };

  // Tells if the input is valud.
  // If the input is not required, it's always valid. Else, an item must be selected
  // Important: a user that entered some text in the search input without selecting an item is not considered as a value!
  // BUT : If you need this, you can still put this component as not required by passing inputRequired = false,
  // and you have access to the search value wiht the onValueChange callback calls when it is modified.
  const isValid = () => !inputRequired || selectedItem;

  /**
   * RENDER
   */
  const INPUT_ID = uuid();

  return (
    <div className={'FormAutoSuggestInput ' 
      + (isValid() ? 'input--valid ' : 'input--invalid ')
      + (fieldName ? 'input-' + fieldName : '')}>
      
      {/* If no item is selected, show the search input */}
      {!selectedItemKey &&
        <input
          id={INPUT_ID}
          className={'input ' + (!value ? 'input--empty' : '')}
          type="text"
          value={value}
          name={inputName}
          autoComplete={inputAutoComplete}
          onChange={e => onChange(e.target.value)} />
      }

      {/* If an item is selected, show the selected item */}
      {selectedItemKey && selectedItem && 
        <div className="selected-item">
          {selectedItem.content}
          <span className="action" onClick={reset}>
            <Icon source="fa" icon={faEdit} />
          </span>
        </div>
      }

      {/* Generating a hidden input for validation purposes */}
      <input 
        className={(!selectedItem ? 'input--empty' : '')}
        type="hidden" 
        required={inputRequired} 
        value={selectedItemKey} />

      {/* If no item is selected and some items are proposed, show also the possible items */}
      {!selectedItemKey && possibleItems && Object.keys(possibleItems).length && 
        <ul className="items">
          {Object.keys(possibleItems).map(key =>
            <li key={key} onClick={() => onItemChange(key)}>
              {possibleItems[key].content}
            </li>
          )}
        </ul>
      }

      {/* Validation indicator. Used to tell the user if the input is valid or not at all times */}
      {/* Also, save if this indicator is hovered */}
      <span className="indicator"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}>

        <Icon containerclassname="valid" source="fa" icon={faCheck} />
        <Icon containerclassname="invalid" source="fa" icon={faTimes} />
      </span>

      {/* If a label is passed, print it and link it to the search input */}
      {label && 
        <label htmlFor={INPUT_ID}>
          {label}
        </label>
      }

      {/* If instructions are passed, build a tooltip that shows only on hover */}
      {instructions && <Tooltip 
        show={isHover} 
        label={instructions}
        tooltipPosition={ETooltipPosition.BOTTOM} 
        tooltipTrianglePosition={ETooltipTrianglePosition.END} />}
    </div>
  );
};

export default FormAutoSuggestInput;
