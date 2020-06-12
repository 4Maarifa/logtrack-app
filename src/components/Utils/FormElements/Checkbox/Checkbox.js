import React from 'react';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Icon/Icon';

import { v4 as uuid } from 'uuid';

import './Checkbox.scss';

const Checkbox = ({ value,
                    fieldName,
                    inputName,
                    inputDisabled,
                    inputRequired,
                    label,
                    onValueChange }) => {

  const onChange = newValue => onValueChange && onValueChange(newValue, fieldName);

  /**
   * RENDER
   */
  const INPUT_ID = uuid();

  return (
    <div className={'Checkbox '
        + (fieldName ? 'input-' + fieldName : '')}>

      <input
        id={INPUT_ID}
        className="input"
        type="checkbox"
        checked={value}
        name={inputName}
        disabled={inputDisabled}
        required={inputRequired}
        onChange={e => onChange(e.target.checked)} />

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
