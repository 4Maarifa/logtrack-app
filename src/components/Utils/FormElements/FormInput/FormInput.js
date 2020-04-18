import React, { useState } from 'react';
import { faCheck, faTimes } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import { v4 as uuid } from 'uuid';

import './FormInput.scss';

const FormInput = ({ value,
                    fieldName,
                    inputType,
                    inputName,
                    inputAutoComplete,
                    inputRequired,
                    inputPattern,
                    label,
                    instructions,
                    onValueChange }) => {

  const [isHover, setHover] = useState(false);

  const onChange = newValue => onValueChange && onValueChange(newValue, fieldName);

  /**
   * RENDER
   */
  const inputId = uuid();

  return (
    <div className={'FormInput '
        + (fieldName ? 'input-' + fieldName : '')}>

      <input
        id={inputId}
        className={'input ' + (!value ? 'input--empty' : '')}
        type={inputType || "text"}
        value={value}
        name={inputName}
        autoComplete={inputAutoComplete}
        pattern={inputPattern}
        onChange={e => onChange(e.target.value)}
        required={inputRequired} />
      <span className="indicator"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}>

        <Icon containerclassname="valid" source="fa" icon={faCheck} />
        <Icon containerclassname="invalid" source="fa" icon={faTimes} />
      </span>
      {label && 
        <label htmlFor={inputId}>
          {label}
        </label>
      }
      {instructions && <Tooltip 
        show={isHover} 
        label={instructions}
        tooltipPosition={ETooltipPosition.BOTTOM} 
        tooltipTrianglePosition={ETooltipTrianglePosition.END} />}
    </div>
  );
};

export default FormInput;
