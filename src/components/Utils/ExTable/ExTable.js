import React, { useState, useEffect } from 'react';
import { faThLarge, faAlignJustify, faSearch, faFilter, faSortCircle,
  faTimes } from '@fortawesome/pro-light-svg-icons';
import { faSearch as faSearchSolid, faFilter as faFilterSolid } from '@fortawesome/pro-solid-svg-icons'

import Loader from './../Loader/Loader';
import Icon from './../Icon/Icon';
import FormInput from './../FormElements/FormInput/FormInput';

import './ExTable.scss';
import { faSortUp, faSortDown } from '@fortawesome/pro-duotone-svg-icons';

/**
 * Component: ExTable
 * Used to print a list of items
 * 
 * fss: Object | used to filter, search and sort items (in that order!).
 * {
 *   filter: {
 *    filterKey: {
 *      title: 'filterName',
 *        // return true if item should be kept or false if item should be hidden
 *      apply: (itemKey, itemData) => true|false
 *    }
 *   },
 *    // return true if item corresponds to the search, false if it should be hidden
 *   search: (itemKey, itemData, searchTerm) => true|false,
 *   sort: {
 *     sortKey: {
 *       title: 'sortName',
 *         // return the keys, sorted according to their content and the sort direction
 *       apply: (keys, items, sortDirection) => keys
 *     }
 *   }
 * }
 */
const ExTable = ({ header, loading, items, renderItem, isNoFrame, isSmallItems, fss }) => {
  
  const [view, setView] = useState('ITEMS');

  const [activeFilter, setActiveFilter] = useState('');
  const [activeSort, setActiveSort] = useState('');
  const [sortDirection, setSortDirection] = useState('ASC');
  const [searchTerm, setSearchTerm] = useState('');

  const [fssDeployed, setFssDeployed] = useState(null);

  const resetSort = () => {
    if(fss && fss.sort) {
      let defaultSort = '';
      Object.keys(fss.sort).forEach(sortKey => {
        if(fss.sort[sortKey].default) {
          defaultSort = sortKey;
        }
      });
      setActiveSort(defaultSort);
      setSortDirection('ASC');
    }
  };

  useEffect(resetSort, []);

  let filtered_keys = Object.keys(items || {});

  if(fss) {
    if(fss.filter && activeFilter) {
      filtered_keys = filtered_keys.filter(key => fss.filter[activeFilter].apply(key, items[key]));
    }

    if(fss.search && searchTerm) {
      filtered_keys = filtered_keys.filter(key => fss.search(key, items[key], searchTerm));
    }

    if(fss.sort && activeSort) {
      filtered_keys = fss.sort[activeSort].apply(filtered_keys, items, sortDirection);
    }
  }

  return (
    <div className={'ExTable ' + (view === 'LIST' ? ' ExTable--list ' : ' ExTable--items ') + (isNoFrame ? ' ExTable--no-frame ' : '')}>
      <div className="header-container">
        {header ? <div className="header">{header}</div> : null}
        {fss ? <div className="ExTable-fss">
          {fss.search ?
            <div className="ExTable-fss-search">
              <span className={'ExTable-fss-button ' + (searchTerm ? 'ExTable-fss-button--active' : '')}
                    onClick={() => setFssDeployed(fssDeployed === 'SEARCH' ? '' : 'SEARCH')} title="Search">
                
                <Icon source="fa" icon={searchTerm ? faSearchSolid : faSearch} />
              </span>
              <span className={'ExTable-fss-input ' + (fssDeployed === 'SEARCH' ? 'ExTable-fss-input--deployed' : '')}>
                <FormInput
                  value={searchTerm}
                  inputType="text"
                  noValidation
                  label="Search..."
                  fieldName="search"
                  onValueChange={setSearchTerm} />
                <span className="ExTable-fss-input-reset" title="Reset" onClick={() => {setSearchTerm(''); setFssDeployed(null)}}>
                  <Icon source="fa" icon={faTimes} />
                </span>
              </span>
            </div>
          : null}
          {fss.filter ?
            <div className="ExTable-fss-filter">
              <span className={'ExTable-fss-button ' + (activeFilter ? 'ExTable-fss-button--active' : '')}
                    onClick={() => setFssDeployed(fssDeployed === 'FILTER' ? '' : 'FILTER')} title="Filter">

                <Icon source="fa" icon={activeFilter ? faFilterSolid : faFilter} />
              </span>
              <span className={'ExTable-fss-input ' + (fssDeployed === 'FILTER' ? 'ExTable-fss-input--deployed' : '')}>
                <select value={activeFilter} onChange={e => setActiveFilter(e.target.value)}>
                  <option value="" disabled>Filter...</option>
                  {Object.keys(fss.filter).map(filterKey => <option key={filterKey} value={filterKey}>{fss.filter[filterKey].title}</option>)}
                </select>
                <span className="ExTable-fss-input-reset" title="Reset" onClick={() => {setActiveFilter(''); setFssDeployed(null)}}>
                  <Icon source="fa" icon={faTimes} />
                </span>
              </span>
            </div>
          : null}
          {fss.sort ?
            <div className="ExTable-fss-sort">
              <span className="ExTable-fss-button"
                    onClick={() => setFssDeployed(fssDeployed === 'SORT' ? '' : 'SORT')} title="Sort">

                <Icon source="fa" icon={faSortCircle} />
              </span>
              <span className={'ExTable-fss-input ' + (fssDeployed === 'SORT' ? 'ExTable-fss-input--deployed' : '')}>
                <span className="ExTable-fss-input-button"
                      onClick={() => setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC')}
                      title="Change Sorting Direction">

                  <Icon source="fa" icon={sortDirection === 'ASC' ? faSortUp : faSortDown} />
                </span>
                <select value={activeSort} onChange={e => setActiveSort(e.target.value)}>
                  <option value="" disabled>Sort...</option>
                  {Object.keys(fss.sort).map(sortKey => <option key={sortKey} value={sortKey}>{fss.sort[sortKey].title}</option>)}
                </select>
                <span className="ExTable-fss-input-reset" title="Reset" onClick={() => {resetSort(); setFssDeployed(null)}}>
                  <Icon source="fa" icon={faTimes} />
                </span>
              </span>
            </div>
          : null}
        </div> : null}
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
        {loading ? <li className="loader">
          <Loader />
        </li> : null}
        {!loading && items && filtered_keys.map(itemKey => 
          <li key={itemKey} className={'Element Element--' + (!isSmallItems && view === 'ITEMS' ? 'tile' : 'row') + (isSmallItems ? ' Element-small' : '')}>
            {renderItem(itemKey, items[itemKey])}
          </li>)
        }
        {!loading && (!items || !Object.keys(items).length) && 
          <li className="no-item">Nothing to show!</li>
        }
      </ul>
    </div>
  );
};

export default ExTable;
