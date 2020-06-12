import React, { useState, useRef } from 'react';
import { faUpload, faCheck, faTimes } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import { v4 as uuid } from 'uuid';

import './FormInputFile.scss';

const FormInputFile = ({ accept: defaultAccept, 
                        fieldName,
                        inputRequired,
                        label,
                        instructions,
                        imagePreview,
                        value,
                        onValueChange }) => {

  const accept = defaultAccept || '*/*';

  const [isHover, setHover] = useState(false);

  const REF_FILE = useRef(null);

  const onChange = () => {
    if(REF_FILE.current.files && REF_FILE.current.files.length) {
      onValueChange({ file: REF_FILE.current.files[0], url: URL.createObjectURL(REF_FILE.current.files[0]) }, fieldName);
    }
    else {
      onValueChange && onValueChange(null, fieldName);
    }
  };

  const remove = () => {
    REF_FILE.current.value = null;
    onChange();
  };

  /**
   * RENDER
   */
  const INPUT_ID = uuid();

  return (
    <div className="FormInputFile">
      {label && <span className="fake-label">
        {label}
      </span>}
      <input
        id={INPUT_ID}
        type="file"
        ref={REF_FILE}
        onChange={onChange}
        accept={accept}
        required={inputRequired} />
      <div className="FormInputFile-actions">
        {imagePreview && value && value.url ?
          <img src={value.url} alt="Upload Preview" /> : null
        }
        <span className="indicator"
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}>

          <Icon containerclassname="valid" source="fa" icon={faCheck} />
          <Icon containerclassname="invalid" source="fa" icon={faTimes} />
        </span>
        <label htmlFor={INPUT_ID}>
          <Icon source="fa" icon={faUpload} />
          {value ? 'Replace' : 'Upload'}
        </label>
        {value ? <span className="FormInputFile-remove" onClick={remove}>
          <Icon source="fa" icon={faTimes} />
          Remove
        </span> : null}
      </div>
      {instructions && <Tooltip 
        show={isHover} 
        label={instructions}
        tooltipPosition={ETooltipPosition.BOTTOM} 
        tooltipTrianglePosition={ETooltipTrianglePosition.END} />}
    </div>
  );
};

export default FormInputFile;
