import React, { useState } from 'react';
import { faCheck, faTimes } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import { v4 as uuid } from 'uuid';

import './FormInput.scss';

/**
 * Component: FormInput
 * Form element that render and act like a basic input
 * 
 * value: string (or according to inputType) | input value
 * fieldName: string | unique identifier of the input
 * inputType: string | type of the input, like HTML specifications ( https://www.w3.org/TR/html52/sec-forms.html#sec-states-of-the-type-attribute )
 * inputName: string | identifier of this form element
 * inputAutocomplete: string | tells the browser to autocomplete with a name, email, address...
 * inputRequired: boolean | tells if the input is required or not
 * inputPattern: string | regex for input validation
 * inputDisabled: boolean | If disabled, the input value could not be modified
 * noValidation: boolean | tells to not print the input validation indicator
 * label: HTML | label of the input
 * instructions: HTML | instructions for the user
 * onValueChange: function(value, fieldName) | callback when the input value is modified
 */
const FormInput = ({ value,
                    fieldName,
                    inputType,
                    inputName,
                    inputAutoComplete,
                    inputRequired,
                    inputPattern,
                    inputDisabled,
                    noValidation,
                    label,
                    instructions,
                    onValueChange }) => {

  // used to know if the instructions should be presented or not to the user
  const [isHover, setHover] = useState(false);

  // when the input value changes, calling the callback with the value and fieldname
  const onChange = newValue => onValueChange && onValueChange(newValue, fieldName);

  /**
   * RENDER
   */
  const INPUT_ID = uuid();

  return (
    <div className={'FormInput '
        + (fieldName ? 'input-' + fieldName : '')}>

      {/* Input validator */}
      <input
        className="input-validator"
        type="text"
        required={inputRequired}
        defaultValue={value ? 'valid' : ''} />

      {/* Corresponding input */}
      <input
        id={INPUT_ID}
        className={'input ' + (!value ? 'input--empty ' : '') + (noValidation ? 'input--novalidation ' : '')}
        type={inputType || "text"}
        value={value}
        name={inputName}
        autoComplete={inputAutoComplete}
        pattern={inputPattern}
        disabled={inputDisabled}
        onChange={e => onChange(e.target.value)}
        required={inputRequired} />

      {/* Validation indicator, that indicates if the value is correct or not */}
      {/* save the fact that the indicator is hovered or not in the state */}
      <span className="indicator"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}>

        <Icon containerclassname="valid" source="fa" icon={faCheck} />
        <Icon containerclassname="invalid" source="fa" icon={faTimes} />
      </span>

      {/* Label for the input */}
      {label && 
        <label htmlFor={INPUT_ID}>
          {label}
        </label>
      }

      {/* If instructions are passed and input is not disabled, generating the tooltip */}
      {/* It shows only if the validation indicator is hovered */}
      {instructions && !inputDisabled ? <Tooltip 
        show={isHover} 
        label={instructions}
        tooltipPosition={ETooltipPosition.BOTTOM} 
        tooltipTrianglePosition={ETooltipTrianglePosition.END} /> : null}
    </div>
  );
};

export default FormInput;
