import React, { useState } from 'react';
import { faCheck, faTimes, faEdit } from '@fortawesome/pro-light-svg-icons';
import { DelayInput } from 'react-delay-input';

import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import { v4 as uuid } from 'uuid';

import './FormDebounceAutoSuggestInput.scss';

/**
 * Component: FormDebounceAutoSuggestInput
 * Form element that suggest values
 * This form element needs the user to select from autosuggest values to be valid
 * Difference from this component and FormAutoSuggestInput is that search input
 *   callback is called if the value of it did not change in the past 1.1 seconds
 * 
 * value: string | input value (the one that search for values)
 * selectedItem: object | value of the selected item
 * selectedItemKey: string | key of the selected item
 * possibleItems: { itemKey: { value: itemData, content: printable html } } | list of autosuggest values
 * fieldName: string | unique identifier of the input. Returned along with values to identify this field
 * inputName: string | identifier of this field
 * label: HTML | label of the input
 * inputAutoComplete: string | tells the browser to autocomplete with a name, email, address...
 * inputRequired: boolean | tells if the fact that the user selects an item is mandatory
 * instructions: HTML | instructions for the user
 * onValueChange: function(value, fieldName) | callback when the search input value is changed
 * onSelectedItemChange: function(itemKey, fieldName, itemData)
 * 
 * Behaviour: 
 * 1. The user enter a search term
 * 2. at each change, the callback onValueChange is called if no modification of it in the past 1.1s
 * 3. YOU have to compute the possibleItems, and set them
 * 4. the item proposes the different items
 * 5. the user selects an item
 * 6. the callback onSelectedItemChange is called with the item data
 * 7. YOU save the value and pass it
 * 8. the form input displays the selected item
 */
const FormDebounceAutoSuggestInput = ({ value,
                                        selectedItem,
                                        selectedItemKey,
                                        possibleItems,
                                        fieldName,
                                        inputName,
                                        label,
                                        isBig,
                                        inputAutoComplete,
                                        inputRequired,
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
    <div className={'FormDebounceAutoSuggestInput '
      + (isBig ? 'FormDebounceAutoSuggestInput--big ' : '')
      + (isValid() ? 'input--valid ' : 'input--invalid ')
      + (fieldName ? 'input-' + fieldName : '')}>

      {/* Input Validator */}
      <input
        className="input-validator"
        type="text"
        required={inputRequired}
        defaultValue={selectedItemKey} />

      {/* If no item is selected, show the search input */}
      {!selectedItemKey ?
        <DelayInput
          id={INPUT_ID}
          delayTimeout={1100}
          className={'input ' + (!value ? 'input--empty' : '')}
          type="text"
          value={value}
          name={inputName}
          autoComplete={inputAutoComplete}
          onChange={e => onChange(e.target.value)} /> : null
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
        className={(!selectedItemKey ? 'input--empty' : '')}
        type="hidden" 
        required={inputRequired} 
        value={selectedItemKey} />

      {/* If no item is selected and some items are proposed, show also the possible items */}
      {!selectedItemKey && possibleItems && Object.keys(possibleItems).length ? 
        <ul className="items">
          {Object.keys(possibleItems).map(key =>
            <li key={key} onClick={() => onItemChange(key)}>
              {possibleItems[key].content}
            </li>
          )}
        </ul> : null
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
      {label ? 
        <label htmlFor={INPUT_ID}>
          {label}
        </label> : null
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

export default FormDebounceAutoSuggestInput;
