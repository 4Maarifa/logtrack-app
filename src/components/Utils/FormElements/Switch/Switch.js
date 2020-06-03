import React from 'react';
import { faToggleOn, faToggleOff } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Icon/Icon';

import { v4 as uuid } from 'uuid';

import './Switch.scss';

const Switch = ({ value, onChange, fieldName, label }) => {
  const inputKey = uuid();

  return (
    <div className="Switch">
      <input type="checkbox"
            id={inputKey}
            checked={value}
            onChange={e => onChange(e.target.checked, fieldName)} />
      <label className="Switch-indicator" htmlFor={inputKey}>
        {value ? <Icon source="fa" icon={faToggleOn} className="icon--on" /> : 
        <Icon source="fa" icon={faToggleOff} className="icon--off" />}
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Switch;
