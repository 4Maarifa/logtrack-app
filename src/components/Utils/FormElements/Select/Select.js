import React, { useState } from 'react';
import { faCheck, faTimes, faChevronDown } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import './Select.scss';

import { v4 as uuid } from 'uuid';
import FormInput from '../FormInput/FormInput';

/**
 * Component: Select
 * Form Element that render and acts like a select, useful for custom options
 * 
 * possibleItems: { itemKey: { value: itemData, content: printable html } } | list of options
 * selectedItemKey: string | key if the selected item
 * selectedItem: object | value of the selected item
 * onSelectedItemChange: function(itemKey, fieldname, itemData) | callback when an item is selected
 * inputRequired: boolean | tells if an item must be selected or not
 * label: HTML | label of the select
 * searchFn: function(itemKey, itemData, searchTerm) => true|false | Search function
 * instructions: HTML | instructions for the user
 * fieldName: string | unique identifier of the input, returned along values in the callback to identiy this field
 * 
 * Behaviour:
 * 1. The user clicks the select button
 * 2. The user selects an item
 * 3. at each item change, the callback onSelectedItemCahnge is called
 * 4. YOU have to save the values and pass them back in selectedItemKey and selectedItem
 * 5. The selected item is shown
 */
const Select = ({ possibleItems,
                selectedItemKey,
                selectedItem,
                onSelectedItemChange,
                inputRequired,
                label,
                searchFn,
                instructions,
                fieldName }) => {

  // used to know if the instructions should be shown or not
  const [isHover, setHover] = useState(false);

  // used to know if the item list should be visible
  const [isFocused, setFocused] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);

  // Search input value
  const [searchValue, setSearchValue] = useState('');

  // When an item is clicked
  const onItemChange = itemKey => {
    onSelectedItemChange && onSelectedItemChange(itemKey, fieldName, possibleItems[itemKey]);
  };

  // When clearing the selected item
  const reset = () => {
    onSelectedItemChange && onSelectedItemChange('', fieldName, null);
  };

  // Tells if the input is valud.
  // If the input is not required, it's always valid. Else, an item must be selected
  const IS_VALID = () => !inputRequired || selectedItem;

  /**
   * RENDER
   */
  const INPUT_ID = uuid();

  let filtered_keys = Object.keys(possibleItems || {});

  // Apply search
  if(searchFn && searchValue) {
    filtered_keys = filtered_keys.filter(key => searchFn(key, possibleItems[key], searchValue));
  }

  return <div className={'Select ' 
    + (IS_VALID ? 'input--valid ' : 'input--invalid ')
    + (selectedItemKey ? '' : 'input--empty ')
    + (fieldName ? 'input-' + fieldName : '')}>

    {/* Input Validator */}
    <input
      className="input-validator"
      type="text"
      required={inputRequired}
      defaultValue={selectedItemKey} />

    <button className="select-item"
            id={INPUT_ID}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}>
      {selectedItemKey && selectedItem ? selectedItem.content : null}
      <span className="action">
        <Icon source="fa" icon={faChevronDown} />
      </span>
    </button>

    {isFocused || isSearchFocused ? <ul className="items">
      {searchFn ? <li key="search" className="search-item">
        <FormInput
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          value={searchValue}
          noValidation
          fieldName="search"
          label="Search..."
          onValueChange={setSearchValue} />
      </li> : null}
      {!inputRequired && selectedItemKey ? <li key="remove" onClick={reset}>Remove selection</li> : null}
      {filtered_keys.map(key =>
        <li key={key} onClick={() => onItemChange(key)}>
          {possibleItems[key].content}
        </li>
      )}
    </ul> : null}

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

  </div>;
};

export default Select;
