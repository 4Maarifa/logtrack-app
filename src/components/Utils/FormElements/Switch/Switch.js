import React from 'react';
import { faToggleOn, faToggleOff } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Icon/Icon';

import { v4 as uuid } from 'uuid';

import './Switch.scss';

/**
 * Component: Switch
 * Form element that behaves like a checkbox but looks like a switch or toggle
 * 
 * value: boolean | value of the checkbox
 * onChange: function(value, fieldName) | callback when the toggle value changed
 * fieldName: string | unique identifier
 * label: HTML | printable label of the input
 */
const Switch = ({ value, onChange, fieldName, label }) => {

  const INPUT_ID = uuid();

  return (
    <div className="Switch">

      {/* hidden checkbox value to handle changes */}
      {/* Call the callback when changed */}
      <input type="checkbox"
            id={INPUT_ID}
            checked={value}
            onChange={e => onChange(e.target.checked, fieldName)} />

      {/* Indicator: a on toggle when the value is true and an off toggle when the value is false */}
      <label className="Switch-indicator" htmlFor={INPUT_ID}>
        {value ? <Icon source="fa" icon={faToggleOn} className="icon--on" /> : 
        <Icon source="fa" icon={faToggleOff} className="icon--off" />}

        {/* label */}
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Switch;
