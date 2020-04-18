import React, { useState, useEffect } from 'react';
import { faCheck, faTimes, faEdit } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import './FormAutoSuggestInput.scss';

import { v4 as uuid } from 'uuid';

const FormAutoSuggestInput = ({ value,
                                fieldName,
                                selectedItemKey, 
                                selectedItem,
                                possibleItems,
                                inputRequired,
                                label,
                                inputName,
                                inputAutoComplete,
                                instructions,
                                onValueChange,
                                onSelectedItemChange }) => {

  const [isHover, setHover] = useState(false);

  const onChange = newValue => onValueChange && onValueChange(newValue);

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
  const inputId = uuid();

  return (
    <div className={'FormAutoSuggestInput ' 
      + (isValid() ? 'input--valid ' : 'input--invalid ')
      + (fieldName ? 'input-' + fieldName : '')}>
      
      {!selectedItemKey &&
        <input
          id={inputId}
          className={'input ' + (!value ? 'input--empty' : '')}
          type="text"
          value={value}
          name={inputName}
          autoComplete={inputAutoComplete}
          onChange={e => onChange(e.target.value)} />
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
        className={(!selectedItem ? 'input--empty' : '')}
        type="hidden" 
        required={inputRequired} 
        value={selectedItemKey} />

      {!selectedItemKey && possibleItems && Object.keys(possibleItems).length && 
        <ul className="items">
          {Object.keys(possibleItems).map(key =>
            <li key={key} onClick={() => onItemChange(key)}>
              {possibleItems[key].content}
            </li>
          )}
        </ul>
      }

      <span className="indicator"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}>

        <Icon containerclassname="valid" source="fa" icon={faCheck} />
        <Icon containerclassname="invalid" source="fa" icon={faTimes} />
      </span>
      {label && 
        <label htmlFor={inputId}>
          {label}
        </label>
      }
      {instructions && <Tooltip 
        show={isHover} 
        label={instructions}
        tooltipPosition={ETooltipPosition.BOTTOM} 
        tooltipTrianglePosition={ETooltipTrianglePosition.END} />}
    </div>
  );
};

export default FormAutoSuggestInput;
