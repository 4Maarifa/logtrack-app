import React, { useState } from 'react';
import { faCheck, faTimes } from '@fortawesome/pro-light-svg-icons';
import { DelayInput } from 'react-delay-input';

import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import { v4 as uuid } from 'uuid';

import './FormDebounceInput.scss';

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

  const [isHover, setHover] = useState(false);

  const onChange = newValue => onValueChange && onValueChange(newValue, fieldName);

  /**
   * RENDER
   */
  const INPUT_ID = uuid();

  return (
    <div className={'FormDebounceInput '
      + (fieldName ? 'input-' + fieldName : '')}>

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

      <span className="indicator"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}>

        <Icon containerclassname="valid" source="fa" icon={faCheck} />
        <Icon containerclassname="invalid" source="fa" icon={faTimes} />
      </span>
      {label && 
        <label htmlFor={INPUT_ID}>
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

export default FormDebounceInput;
