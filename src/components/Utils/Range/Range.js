import React from 'react';

import './Range.scss';

const Range = ({ value, min, max, step, onChange, fieldName }) => {

  return (
    <div className="Range">
      <input type="range" 
        min={min}
        max={max}
        step={step || 1}
        value={value}
        onChange={e => onChange(e.target.value)} />
      <span className="Range-value" data-value={value} style={{ left: `calc((100% - 41px) * ${(value - min) / (max - min)})` }}></span>
      <span className="Range-indicators">
        <span>{min}</span>
        <span>{max}</span>
      </span>
    </div>
  );
};

export default Range;
