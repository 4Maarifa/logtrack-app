import React, { useState } from 'react';
import { faCheck, faTimes, faEdit } from '@fortawesome/pro-light-svg-icons';
import { DelayInput } from 'react-delay-input';

import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import { v4 as uuid } from 'uuid';

import './FormDebounceAutoSuggestInput.scss';

const FormDebounceAutoSuggestInput = ({ value,
                                        selectedItem,
                                        selectedItemKey,
                                        possibleItems,
                                        fieldName,
                                        inputName,
                                        label,
                                        inputAutoComplete,
                                        inputRequired,
                                        instructions,
                                        onValueChange,
                                        onSelectedItemChange }) => {

  const [isHover, setHover] = useState(false);

  const onChange = newValue => onValueChange && onValueChange(newValue, fieldName);

  const onItemChange = itemKey => {
    onChange('');
    onSelectedItemChange && onSelectedItemChange(itemKey, fieldName, possibleItems[itemKey]);
  };

  const reset = () => {
    onChange('');
    onSelectedItemChange && onSelectedItemChange('', fieldName, null);
  };

  const isValid = () => !inputRequired || selectedItem;

  /**
   * RENDER
   */

  const INPUT_ID = uuid();

  return (
    <div className={'FormDebounceAutoSuggestInput '
      + (isValid() ? 'input--valid ' : 'input--invalid ')
      + (fieldName ? 'input-' + fieldName : '')}>

      {!selectedItemKey ?
        <DelayInput
          id={INPUT_ID}
          delayTimeout={1100}
          className={'input ' + (!value ? 'input--empty' : '')}
          type="text"
          value={value}
          name={inputName}
          autoComplete={inputAutoComplete}
          onChange={e => onChange(e.target.value)} /> : null
      }

      {selectedItemKey && selectedItem && 
        <div className="selected-item">
          {selectedItem.content}
          <span className="action" onClick={reset}>
            <Icon source="fa" icon={faEdit} />
          </span>
        </div>
      }

      <input 
        className={(!selectedItemKey ? 'input--empty' : '')}
        type="hidden" 
        required={inputRequired} 
        value={selectedItemKey} />

      {!selectedItemKey && possibleItems && Object.keys(possibleItems).length ? 
        <ul className="items">
          {Object.keys(possibleItems).map(key =>
            <li key={key} onClick={() => onItemChange(key)}>
              {possibleItems[key].content}
            </li>
          )}
        </ul> : null
      }

      <span className="indicator"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}>

        <Icon containerclassname="valid" source="fa" icon={faCheck} />
        <Icon containerclassname="invalid" source="fa" icon={faTimes} />
      </span>
      {label ? 
        <label htmlFor={INPUT_ID}>
          {label}
        </label> : null
      }
      {instructions && <Tooltip 
        show={isHover} 
        label={instructions}
        tooltipPosition={ETooltipPosition.BOTTOM} 
        tooltipTrianglePosition={ETooltipTrianglePosition.END} />}
    </div>
  );
};

export default FormDebounceAutoSuggestInput;
