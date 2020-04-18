import React, { useState, useRef, useEffect } from 'react';
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
                        onValueChange }) => {



  const accept = defaultAccept || '*/*';
  const [fileValues, setFileValues] = useState(null);

  const [isHover, setHover] = useState(false);

  const file = useRef(null);

  useEffect(() => {
    onValueChange && onValueChange(fileValues, fieldName);
  }, [fileValues]);

  const onChange = () => {
    if(file.current.files && file.current.files.length) {
      setFileValues(file.current.files);
    }
  };

  /**
   * RENDER
   */
  const inputId = uuid();

  return (
    <div className="FormInputFile">
      <input
        id={inputId}
        type="file"
        ref={file}
        onChange={onChange}
        accept={accept}
        required={inputRequired} />
      <label htmlFor={inputId}>
        {imagePreview && fileValues && fileValues.length &&
          <img src={URL.createObjectURL(fileValues[0])} alt="Upload Preview" />
        }
        <span className="input-title">
          <Icon source="fa" icon={faUpload} />
          {fileValues ? 'Replace' : 'Upload'}
        </span>
        <span className="indicator"
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}>

          <Icon containerclassname="valid" source="fa" icon={faCheck} />
          <Icon containerclassname="invalid" source="fa" icon={faTimes} />
        </span>
      </label>
      {label && <span className="fake-label">
        {label}
      </span>}
      {instructions && <Tooltip 
        show={isHover} 
        label={instructions}
        tooltipPosition={ETooltipPosition.BOTTOM} 
        tooltipTrianglePosition={ETooltipTrianglePosition.END} />}
    </div>
  );
};

export default FormInputFile;
