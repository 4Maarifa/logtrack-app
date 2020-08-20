import React, { useState } from 'react';
import { faCheck, faTimes } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import { v4 as uuid } from 'uuid';

import './FormTextarea.scss';

/**
 * Component: TextArea
 * Form element, input with multiple lines, corresponding to an HTML textarea element
 * 
 * value: string | value of the textarea
 * fieldName: string | unique identifier of this form element
 * inputName: string | unique identifier in the form
 * inputAutocomplete: string | browser compatible autocomplete for name, address...
 * inputRequired: boolean | tells if the input must be fulfilled or not
 * inputDisabled: boolean | stop interaction, and avoid modiciation by the user
 * label: HTML | printable label for the input
 * instructions: HTML | printable instructions
 * onValueChange: function(value, fieldName) | callback called when textarea value is modified
 */
const FormTextarea = ({ value,
                        fieldName,
                        inputName,
                        inputAutoComplete,
                        inputRequired,
                        inputDisabled,
                        label,
                        instructions,
                        onValueChange }) => {

  // Save the hover state of the validation indicator, that shows insturctions when true
  const [isHover, setHover] = useState(false);

  // call callback when the value changed
  const onChange = newValue => onValueChange && onValueChange(newValue, fieldName);

  /**
   * RENDER
   */
  const INPUT_ID = uuid();

  return (
    <div className={'FormTextarea '
        + (fieldName ? 'input-' + fieldName : '')}>

      {/* Input validator */}
      <input
        className="input-validator"
        type="text"
        required={inputRequired}
        defaultValue={value ? 'valid' : ''} />

      {/* Text area element */}
      <textarea
        id={INPUT_ID}
        className={'input ' + (!value ? 'input--empty' : '')}
        value={value}
        name={inputName}
        autoComplete={inputAutoComplete}
        disabled={inputDisabled}
        onChange={e => onChange(e.target.value)}
        required={inputRequired} />

      {/* Validation indicator */}
      <span className="indicator"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}>

        <Icon containerclassname="valid" source="fa" icon={faCheck} />
        <Icon containerclassname="invalid" source="fa" icon={faTimes} />
      </span>

      {/* Label */}
      {label && 
        <label htmlFor={INPUT_ID}>
          {label}
        </label>
      }

      {/* Instructions */}
      {instructions && !inputDisabled ? <Tooltip 
        show={isHover} 
        label={instructions}
        tooltipPosition={ETooltipPosition.BOTTOM} 
        tooltipTrianglePosition={ETooltipTrianglePosition.END} /> : null}
    </div>
  );
};

export default FormTextarea;
