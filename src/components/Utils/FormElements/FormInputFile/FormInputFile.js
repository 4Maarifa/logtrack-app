import React, { useState, useRef } from 'react';
import { faUpload, faCheck, faTimes } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import { v4 as uuid } from 'uuid';

import './FormInputFile.scss';

/**
 * Component: FormInputFile
 * Form element to select or replace a file
 * 
 * accept: string | Mime type of tile to be accepted (optional)
 * fieldName: string | unique identifier for this form element
 * inputRequired: boolean | tells if the file selection is required or not
 * label: HTML | label of the input
 * instructions: HTML | label of the input
 * imagePreview: boolean | tells if a file preview should be presented to user
 *   /!\ you have to set image accept parameter. If the selected file is not an image and this option is active, it may crash the component
 * value: object | value of the input, following the sturcture: { file, url }
 * onValueChange: function(value, fieldName) | Callback called each time the input value is modified. value is null if file is removed by user
 *   You have to set the value prop with the callback when you receive the onValueChange event
 */
const FormInputFile = ({ accept: defaultAccept, 
                        fieldName,
                        inputRequired,
                        label,
                        instructions,
                        imagePreview,
                        value,
                        onValueChange }) => {

  // Accepted mime type
  const accept = defaultAccept || '*/*';

  // know when the validation indicator is hovered. If that's the case, instructions are shown
  const [isHover, setHover] = useState(false);

  // Reference to the file input
  const REF_FILE = useRef(null);

  // Change handler
  const onChange = () => {
    // If a file is selected
    if(REF_FILE.current.files && REF_FILE.current.files.length) {

      // Call the callback with the new file
      onValueChange({ file: REF_FILE.current.files[0], url: URL.createObjectURL(REF_FILE.current.files[0]) }, fieldName);
    }
    else {

      // Otherwise, file was removed, call the callback with null
      onValueChange && onValueChange(null, fieldName);
    }
  };

  // Remove link => remove the file and trigger callback
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

      {/* Input Validator */}
      <input
        className="input-validator"
        type="text"
        required={inputRequired}
        defaultValue={value? value.url : ''} />

      {/* Input fake label */}
      {label && <span className="fake-label">
        {label}
      </span>}

      {/* Hidden input file */}
      <input
        id={INPUT_ID}
        type="file"
        ref={REF_FILE}
        onChange={onChange}
        accept={accept} />

      {/* input actions */}
      <div className="FormInputFile-actions">

        {/* Show preview */}
        {imagePreview && value && value.url ?
          <img src={value.url} alt="Upload Preview" /> : null
        }

        {/* Validation indicator */}
        {/* set the hover state on hover to trigger instructions */}
        <span className="indicator"
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}>

          <Icon containerclassname="valid" source="fa" icon={faCheck} />
          <Icon containerclassname="invalid" source="fa" icon={faTimes} />
        </span>
        
        {/* real label, with corresponding icons */}
        <label htmlFor={INPUT_ID}>
          <Icon source="fa" icon={faUpload} />
          {value ? 'Replace' : 'Upload'}
        </label>
        {value ? <span className="FormInputFile-remove" onClick={remove}>
          <Icon source="fa" icon={faTimes} />
          Remove
        </span> : null}
      </div>

      {/* Instructions, with the tooltip build, that shows only when hovering the validation indicator */}
      {instructions && <Tooltip 
        show={isHover} 
        label={instructions}
        tooltipPosition={ETooltipPosition.BOTTOM} 
        tooltipTrianglePosition={ETooltipTrianglePosition.END} />}
    </div>
  );
};

export default FormInputFile;
