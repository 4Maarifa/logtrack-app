import React from 'react';
import { faToggleOn, faToggleOff } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Icon/Icon';

import { v4 as uuid } from 'uuid';

import './Switch.scss';

const Switch = ({ value, onChange, fieldName, label }) => {
  const INPUT_ID = uuid();

  return (
    <div className="Switch">
      <input type="checkbox"
            id={INPUT_ID}
            checked={value}
            onChange={e => onChange(e.target.checked, fieldName)} />
      <label className="Switch-indicator" htmlFor={INPUT_ID}>
        {value ? <Icon source="fa" icon={faToggleOn} className="icon--on" /> : 
        <Icon source="fa" icon={faToggleOff} className="icon--off" />}
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Switch;
