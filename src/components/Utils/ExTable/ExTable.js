import React, { useState } from 'react';
import { faThLarge, faAlignJustify } from '@fortawesome/pro-solid-svg-icons';

import Loader from './../Loader/Loader';
import Icon from './../Icon/Icon';

import './ExTable.scss';

const ExTable = ({ header, isLoading, items, renderItem }) => {
  
  const [view, setView] = useState('ITEMS');

  return (
    <div className={'ExTable ' + (view === 'LIST' ? 'ExTable--list' : 'ExTable--items')}>
      <div className="header-container">
        {header && header.length &&
          <div className="header">
            {header.map(headerItem => <span key={headerItem}>{headerItem}</span> )}
          </div>
        }
        <div className="view-switcher">
          <span className={'view ' + (view === 'ITEMS' ? 'view--active' : '')} onClick={() => setView('ITEMS')}>
            <Icon source="fa" icon={faThLarge} />
          </span>
          <span className={'view ' + (view === 'LIST' ? 'view--active' : '')} onClick={() => setView('LIST')}>
            <Icon source="fa" icon={faAlignJustify} />
          </span>
        </div>
      </div>
      <ul>
        {isLoading && <li className="loader">
          <Loader></Loader>
        </li>}
        {!isLoading && Object.keys(items).map(itemKey => 
          <li key={itemKey} className={'Element Element--' + (view === 'LIST' ? 'row' : 'tile')}>
            {renderItem(itemKey, items[itemKey])}
          </li>)
        }
        {!isLoading && !Object.keys(items).length && 
          <li className="no-item">Nothing to show!</li>
        }
      </ul>
    </div>
  );
};

export default ExTable;
