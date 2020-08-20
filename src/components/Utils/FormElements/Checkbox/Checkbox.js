import React from 'react';
import { faCheck } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Icon/Icon';

import { v4 as uuid } from 'uuid';

import './Checkbox.scss';

/**
 * Component: Checkbox
 * Form component that can be checked and unchecked
 * 
 * value: boolean | default value of the checkbox
 * fieldName: string | a specific string that will be passed at each call of the callback onValueChange
 * inputName: string | unique input name
 * inputDisabled: boolean | Should the input be blocked
 * inputRequired: boolean | if the input must be checked to be valid
 * label: HTML | Printable label for the user
 * onValueChange: function(newValue, fieldName) | Callback called each time the value changes
 */
const Checkbox = ({ value,
                    fieldName,
                    inputName,
                    inputDisabled,
                    inputRequired,
                    label,
                    onValueChange }) => {

  // at each change, call the callback with the new value and the unique fieldName
  const onChange = newValue => !inputDisabled && onValueChange && onValueChange(newValue, fieldName);

  /**
   * RENDER
   */
  const INPUT_ID = uuid();

  return (
    <div className={'Checkbox '
        + (fieldName ? 'input-' + fieldName : '') + (!label ? ' input--nolabel' : '')}>

      {/* Input validator */}
      <input
        className="input-validator"
        type="text"
        required={inputRequired}
        defaultValue={value ? 'valid' : ''} />

      {/* Real checkbox, always hidden */}
      <input
        id={INPUT_ID}
        className="input"
        type="checkbox"
        checked={value}
        name={inputName}
        disabled={inputDisabled}
        required={inputRequired}
        onChange={e => onChange(e.target.checked)} />

      {/* Input label, with the square and checkmark */}
      <label htmlFor={INPUT_ID}>
        <span className="square">
          <Icon source="fa" containerclassname="check-icon" icon={faCheck} />
        </span>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
