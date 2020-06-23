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

  const renderItem = itemId => {
    const IS_ACTIVE = isItemActive(itemId);
    let styles = {};
    if(items[itemId].color) {
      styles = IS_ACTIVE ? {
        backgroundColor: items[itemId].color,
        borderColor: items[itemId].color
      } : {
        color: items[itemId].color,
        borderColor: items[itemId].color
      };
    }

    return <li key={itemId} 
      id={itemId}
      role="option"
      aria-selected={IS_ACTIVE}
      className={'' + (IS_ACTIVE ? 'li--active ' : '') + (items[itemId].disabled ? 'li--disabled' : '')} 
      onClick={() => {onValueChange(itemId); setForceUpdate(forceUpdate + 1)}}
      style={styles}>
        
      {items[itemId].content}
    </li>;
  };

  return (
    <div className={'Choose ' + (isVertical ? 'Choose--vertical' : '')}>
      <ul role="listbox" tabIndex="0" aria-activedescendant={selection} aria-multiselectable={multiple}>
        {Object.keys(items).map(renderItem)}
      </ul>
    </div>
  );
};

export default Choose;
