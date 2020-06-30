import React, { useState } from 'react';
import { faChevronUp } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';

import './Accordion.scss';

/**
 * Component: Accordion
 * Collapsible-like component where only one item can be deployed at a time
 * 
 * Accordion is expecting two params:
 * - items: Object
 *    structured like: { key1: { name: function ({ isActive }), content: function(), disabled: boolean } }
 *    The key is a unique key for the collapsible item
 *    The name is a function that returns the item name (the always visible part). 
 *      isActive is a prop that tells if the item is the one that is deployed
 *    The content function returns the defaultly hidden part of the item
 *    The disabled prop is optional (default false). It permits to forbid the expansion of the item
 * - default: string (optional)
 *    Key from items. The item with that key will be expanded by default
 * 
 * Performance: Using functions, it permits to only render the visible part of the active item
 */
const Accordion = ({ default: defaultItem, items }) => {

  // storing the active item here
  const [activeItem, setActiveItem] = useState(defaultItem);

  // activate function. On click on one item, it will activate it.
  // If the activeItem is already the clicked item, it will close it.
  const activateItem = newActiveItem => !items[newActiveItem].disabled && setActiveItem(activeItem === newActiveItem ? null : newActiveItem);

  return (
    <ul className="Accordion">
      {
        /* loop through items */
        Object.keys(items).map(itemId => 
          <li key={itemId} 
              className={'item ' + (itemId === activeItem ? 'item--selected ' : '') + (items[itemId].disabled ? 'item--disabled' : '')} 
              onClick={() => activateItem(itemId)}>

            <span className="item-header">
              {/* Render the name */}
              {items[itemId].name({ isActive: itemId === activeItem })}
              <Icon source="fa" icon={faChevronUp} />
            </span>
            <div className="item-data">
              {/* Render the content if active */}
              {activeItem === itemId ? items[itemId].content() : null}
            </div>
          </li>
        )
      }
    </ul>
  );
};

export default Accordion;
