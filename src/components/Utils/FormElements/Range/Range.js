import React from 'react';

import './Range.scss';

/**
 * Component: range
 * Form element to select a number between a custom minimum and maximum
 * 
 * value: number | value of the input
 * min: | the minimum number the user can select
 * max: number | the maximum number the user can select
 * step: number | optional, the precision a user can select. Default: 1
 * onChange: function*value, fieldName | callback when the range input value is modified
 * fieldName: string | unique identifier of the form element
 */
const Range = ({ value, min, max, step, onChange, fieldName }) => {

  return (
    <div className="Range">

      {/* Range input */}
      <input type="range" 
        min={min}
        max={max}
        step={step || 1}
        value={value}
        onChange={e => onChange(e.target.value, fieldName)} />

      {/* Bubble that hold the value and that is positioned at the value */}
      <span className="Range-value" data-value={value} style={{ left: `calc((100% - 41px) * ${(value - min) / (max - min)})` }}></span>

      {/* Indicators to show the min and max number */}
      <span className="Range-indicators">
        <span>{min}</span>
        <span>{max}</span>
      </span>
    </div>
  );
};

export default Range;
