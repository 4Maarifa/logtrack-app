import React, { useState } from 'react';
import { faCheck, faTimes } from '@fortawesome/pro-light-svg-icons';
import { DelayInput } from 'react-delay-input';

import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import { v4 as uuid } from 'uuid';

import './FormDebounceInput.scss';

/**
 * Component: FormDebounceInput
 * Form element that renders like an input,
 * but that call callbacks only if value is unchanged for 1.1s
 * 
 * value: string (or according to inputType) | input value
 * fieldName: string | unique identifier of the input that will be passed along with values when callback is triggered
 * inputName: string | identifier of this field
 * inputType: string | input type, as HTML specifications details ( https://www.w3.org/TR/html52/sec-forms.html#sec-states-of-the-type-attribute )
 * inputAutoComplete: string | tells the browser to autocomplete with a name, email, address, ...
 * inputPattern: string | regex for input validation
 * inputRequired: boolean | tells if the input is required or not
 * label: HTML | label of the input
 * instructions: HTML | instructions for the user
 * onValueChange: funciton(value, fieldName) | callback when the input value is modified.
 *    Called when the value has not been modified for 1.1secs
 * 
 * Behaviour:
 * 1. The user enters text
 * 2. the callback onValueChange is triggered with the new value if it has not been modified in the 1.1secs
 * 3. YOU save the value and pass it in the value prop
 * 4. the component save the value for further uses
 */
const FormDebounceInput = ({ value,
                            fieldName,
                            inputName,
                            inputType,
                            inputAutoComplete,
                            inputPattern,
                            inputRequired,
                            label,
                            instructions,
                            onValueChange }) => {

  // used to know if the instructions should be presented or not to the user
  const [isHover, setHover] = useState(false);

  // when the input value changes, calling the callback with the new value and fieldname
  const onChange = newValue => onValueChange && onValueChange(newValue, fieldName);

  /**
   * RENDER
   */
  const INPUT_ID = uuid();

  return (
    <div className={'FormDebounceInput '
      + (fieldName ? 'input-' + fieldName : '')}>

      {/* delay input with 1100 milliseconds delay */}
      <DelayInput
        id={INPUT_ID}
        delayTimeout={1100}
        className={'input ' + (!value ? 'input--empty' : '')}
        type={inputType || 'text'}
        value={value}
        name={inputName}
        autoComplete={inputAutoComplete}
        pattern={inputPattern}
        onChange={e => onChange(e.target.value)}
        required={inputRequired} />

      {/* Validation indicator, that tells the user if the input value is valid or not */}
      {/* In hover, save the state in hover state */}
      <span className="indicator"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}>

        <Icon containerclassname="valid" source="fa" icon={faCheck} />
        <Icon containerclassname="invalid" source="fa" icon={faTimes} />
      </span>

      {/* Label for input */}
      {label && 
        <label htmlFor={INPUT_ID}>
          {label}
        </label>
      }

      {/* If instructions are passed, a tooltip is build */}
      {/* If shows up when the validation indicator is hovered */}
      {instructions && <Tooltip 
        show={isHover} 
        label={instructions}
        tooltipPosition={ETooltipPosition.BOTTOM} 
        tooltipTrianglePosition={ETooltipTrianglePosition.END} />}
    </div>
  );
};

export default FormDebounceInput;
