import React, { useEffect, useState } from 'react';

import './Choose.scss';

const Choose = ({ defaultSelection, items, multiple, selectionRequired, onSelectionChange, fieldName }) => {

  const [selection, setSelection] = useState(defaultSelection || (multiple ? [] : ''));

  useEffect(() => {
    onSelectionChange && onSelectionChange(selection, fieldName);
  }, [selection]);

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
      setSelection(newSelection);
    }
    else {
      if(selectionRequired && itemKey === selection) {
        return;
      }

      if(itemKey === selection) {
        setSelection(null);
      }
      else {
        setSelection(itemKey);
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
