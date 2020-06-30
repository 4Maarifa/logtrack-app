import React, { useState } from 'react';

import './Choose.scss';

/**
 * Component: Choose
 * Form element that propose a list of item the user can pick from
 * 
 * selection: [] | string | keys of selected items. If multiple = false, selection is the selected item key
 * items: { itemKey: itemData } | items the user can pick from
 * mutliple: boolean | is multiple selection available
 *    if not, each pick will replace the previous
 * isVertical: boolean | print a vertical list instead of a classic wrapped list
 * selectionRequired: boolean | raise an error if no item is selected
 * onSelectionChange: function (selection, fieldName) | call this callback on selection changed
 * fieldName: string | unique identifier for the input. Returned in the callback for reference
 */
const Choose = ({ selection,
                  items,
                  multiple,
                  isVertical,
                  selectionRequired,
                  onSelectionChange,
                  fieldName }) => {

  // used to force re render the component when the selection changed
  const [forceUpdate, setForceUpdate] = useState(0);

  // When an item is clicked
  const onItemClicked = itemId => {

    // if the item is disabled, ignore
    if(items[itemId].disabled) {
      return;
    }

    // get old selection
    let newSelection = selection ? [...selection] : [];

    // if multiple selection is allowed
    if(multiple) {

      // if selection already included the item
      if(newSelection.includes(itemId)) {

        // if selection is required and only this item is selected, just ignore this event
        if(selectionRequired && newSelection.length <= 1) {
          return;
        }

        // otherwise, remove the item from the selection
        newSelection.splice(newSelection.indexOf(itemId), 1);
      }
      else {

        // If selection did not include the item, add it to selection
        newSelection.push(itemId);
      }

      // call the callback
      onSelectionChange && onSelectionChange(newSelection, fieldName);
    }
    else {
      // If multiple selection is not allowed

      // if the item is the current selection and it is required, ignore
      if(selectionRequired && itemId === selection) {
        return;
      }

      // otherwise, it the selection is the item
      if(itemId === selection) {

        // return no selection
        onSelectionChange && onSelectionChange(null, fieldName);
      }
      else {

        // otherwise, switch the selection to the new item
        onSelectionChange && onSelectionChange(itemId, fieldName);
      }
    }
  };

  // util function that tells if an item is part of the selection or not
  const isItemActive = itemId => {

    // if selection is multiple, controls if the item is in the seleciton array
    if(multiple) {
      return selection.includes(itemId);
    }

    // otherwise, check if the item is the selection
    return selection === itemId;
  };

  // render the item
  const renderItem = itemId => {

    // save if the item is active or not
    const IS_ACTIVE = isItemActive(itemId);

    // compute styles.
    // If the item is not active, outline style
    // Otherwise, full coloured item
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
      onClick={() => {onItemClicked(itemId); setForceUpdate(forceUpdate + 1)}}
      style={styles}>
        
      {items[itemId].content({ isActive: IS_ACTIVE })}
    </li>;
  };

  // render choose component, along with the item list
  return (
    <div className={'Choose ' + (isVertical ? 'Choose--vertical' : '')}>
      <ul role="listbox" tabIndex="0" aria-activedescendant={selection} aria-multiselectable={multiple}>
        {Object.keys(items).map(renderItem)}
      </ul>
    </div>
  );
};

export default Choose;
