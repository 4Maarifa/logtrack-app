import React from 'react';
import { faCheck } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Icon/Icon';

import { v4 as uuid } from 'uuid';

import './Radio.scss';

/**
 * Component: Checkbox
 * Form component that can be checked and unchecked
 * 
 * value: string | key of the radio
 * fieldName: string | a specific string that will be passed at each call of the callback onValueChange
 * inputName: string | unique input name (put other Radio components with the same name to have an radio input group)
 * inputDisabled: boolean | Should the input be blocked
 * inputRequired: boolean | if the input must be checked to be valid
 * label: HTML | Printable label for the user
 * onValueChange: function(newValue, fieldName) | Callback called each time the value changes
 */
const Radio = ({ value,
                fieldName,
                inputName,
                inputDisabled,
                inputRequired,
                label,
                onValueChange }) => {

  // at each change, call the callback with the new value and the unique inputName (radio group name)
  const onChange = newValue => !inputDisabled && onValueChange && onValueChange(newValue, inputName);

  /**
   * RENDER
   */
  const INPUT_ID = uuid();

  return (
    <div className={'Radio '
        + (fieldName ? 'input-' + fieldName : '') + (!label ? ' input--nolabel' : '')}>

      {/* Real radio, always hidden */}
      <input
        id={INPUT_ID}
        className="input"
        type="radio"
        checked={value === fieldName}
        name={inputName}
        disabled={inputDisabled}
        required={inputRequired}
        onChange={() => onChange(fieldName)} />

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

export default Radio;
