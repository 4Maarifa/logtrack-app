import React, { useState } from 'react';
import { faCheck, faTimes } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import { v4 as uuid } from 'uuid';

import './FormTextarea.scss';

const FormTextarea = ({ value,
                        fieldName,
                        inputName,
                        inputAutoComplete,
                        inputRequired,
                        inputDisabled,
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
    <div className={'FormTextarea '
        + (fieldName ? 'input-' + fieldName : '')}>

      <textarea
        id={inputId}
        className={'input ' + (!value ? 'input--empty' : '')}
        value={value}
        name={inputName}
        autoComplete={inputAutoComplete}
        disabled={inputDisabled}
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
      {instructions && !inputDisabled ? <Tooltip 
        show={isHover} 
        label={instructions}
        tooltipPosition={ETooltipPosition.BOTTOM} 
        tooltipTrianglePosition={ETooltipTrianglePosition.END} /> : null}
    </div>
  );
};

export default FormTextarea;
