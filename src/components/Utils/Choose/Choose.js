import React from 'react';

import './Choose.scss';

const Choose = ({ selection,
                  items,
                  multiple,
                  selectionRequired,
                  onSelectionChange,
                  fieldName }) => {

  const onValueChange = itemKey => {
    if(items[itemKey].disabled) {
      return;
    }

    let newSelection = selection;
    if(multiple) {
      if(newSelection.includes(itemKey)) {
        if(selectionRequired && newSelection.length <= 1) {
          return;
        }
        newSelection.splice(newSelection.indexOf(itemKey), 1);
      }
      else {
        newSelection.push(itemKey);
      }
      onSelectionChange && onSelectionChange(newSelection, fieldName);
    }
    else {
      if(selectionRequired && itemKey === selection) {
        return;
      }

      if(itemKey === selection) {
        onSelectionChange && onSelectionChange(null, fieldName);
      }
      else {
        onSelectionChange && onSelectionChange(itemKey, fieldName);
      }
    }

  };

  const isItemActive = itemKey => {
    if(multiple) {
      return selection.includes(itemKey);
    }
    return selection === itemKey;
  };

  return (
    <div className="Choose">
      <ul role="listbox" tabIndex="0" aria-activedescendant={selection} aria-multiselectable={multiple}>
        {Object.keys(items).map(key =>
          <li key={key} 
            id={key}
            role="option"
            aria-selected={isItemActive(key)}
            className={'' + (isItemActive(key) ? 'li--active ' : '') + (items[key].disabled ? 'li--disabled' : '')} 
            onClick={() => onValueChange(key)}>
              
            {items[key].content}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Choose;
