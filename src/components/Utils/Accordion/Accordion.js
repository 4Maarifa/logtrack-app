import React, { useState } from 'react';
import { faChevronUp } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';

import './Accordion.scss';

const Accordion = ({ default: defaultItem, items }) => {
  const [activeItem, setActiveItem] = useState(defaultItem);

  const activateItem = newActiveItem => !items[newActiveItem].disabled && setActiveItem(activeItem === newActiveItem ? null : newActiveItem);

  return (
    <ul className="Accordion">
      {
        Object.keys(items).map(itemId => 
          <li key={itemId} 
              className={'item ' + (itemId === activeItem ? 'item--selected ' : '') + (items[itemId].disabled ? 'item--disabled' : '')} 
              onClick={() => activateItem(itemId)}>

            <span className="item-header">
              {items[itemId].name()}
              <Icon source="fa" icon={faChevronUp} />
            </span>
            <div className="item-data">
              {activeItem === itemId ? items[itemId].content() : null}
            </div>
          </li>
        )
      }
    </ul>
  );
};

export default Accordion;
