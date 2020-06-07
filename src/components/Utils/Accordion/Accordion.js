import React, { useState } from 'react';
import { faChevronUp } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';

import './Accordion.scss';

const Accordion = ({ default: defaultItem, items }) => {
  const [activeItem, setActiveItem] = useState(defaultItem);

  const activateItem = newActiveItem => !items[newActiveItem].disabled && setActiveItem(activeItem === newActiveItem ? null : newActiveItem);

  return (
    <ul className="Accordion">
      {
        Object.keys(items).map(itemKey => 
          <li key={itemKey} 
              className={'item ' + (itemKey === activeItem ? 'item--selected ' : '') + (items[itemKey].disabled ? 'item--disabled' : '')} 
              onClick={() => activateItem(itemKey)}>

            <span className="item-header">
              {items[itemKey].name()}
              <Icon source="fa" icon={faChevronUp} />
            </span>
            <div className="item-data">
              {activeItem === itemKey ? items[itemKey].content() : null}
            </div>
          </li>
        )
      }
    </ul>
  );
};

export default Accordion;
