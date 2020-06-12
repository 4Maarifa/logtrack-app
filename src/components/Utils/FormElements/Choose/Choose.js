import React, { useState } from 'react';

import './Choose.scss';

const Choose = ({ selection,
                  items,
                  multiple,
                  isVertical,
                  selectionRequired,
                  onSelectionChange,
                  fieldName }) => {

  const [forceUpdate, setForceUpdate] = useState(0);

  const onValueChange = itemId => {
    if(items[itemId].disabled) {
      return;
    }

    let newSelection = selection ? [...selection] : [];
    if(multiple) {
      if(newSelection.includes(itemId)) {
        if(selectionRequired && newSelection.length <= 1) {
          return;
        }
        newSelection.splice(newSelection.indexOf(itemId), 1);
      }
      else {
        newSelection.push(itemId);
      }
      onSelectionChange && onSelectionChange(newSelection, fieldName);
    }
    else {
      if(selectionRequired && itemId === selection) {
        return;
      }

      if(itemId === selection) {
        onSelectionChange && onSelectionChange(null, fieldName);
      }
      else {
        onSelectionChange && onSelectionChange(itemId, fieldName);
      }
    }
  };

  const isItemActive = itemId => {
    if(multiple) {
      return selection.includes(itemId);
    }
    return selection === itemId;
  };

  return (
    <div className={'Choose ' + (isVertical ? 'Choose--vertical' : '')}>
      <ul role="listbox" tabIndex="0" aria-activedescendant={selection} aria-multiselectable={multiple}>
        {Object.keys(items).map(itemId =>
          <li key={itemId} 
            id={itemId}
            role="option"
            aria-selected={isItemActive(itemId)}
            className={'' + (isItemActive(itemId) ? 'li--active ' : '') + (items[itemId].disabled ? 'li--disabled' : '')} 
            onClick={() => {onValueChange(itemId); setForceUpdate(forceUpdate + 1)}}>
              
            {items[itemId].content}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Choose;
