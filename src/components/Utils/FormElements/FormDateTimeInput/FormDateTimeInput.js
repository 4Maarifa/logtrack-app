import React from 'react';
import DateTimePicker from 'react-datetime-picker';

import './FormDateTimeInput.scss';

const FormDateTimeInput = ({ value, onValueChange: onChange, ...otherProps }) => {

  return <div className="FormDateTimeInput">
    <DateTimePicker value={value} onChange={onChange} {...otherProps} />
  </div>;
};

export default FormDateTimeInput;
