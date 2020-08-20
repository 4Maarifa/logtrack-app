import React, { useState, useEffect } from 'react';
import { faThLarge, faAlignJustify, faSearch, faFilter, faSortCircle,
  faTimes, faThList} from '@fortawesome/pro-light-svg-icons';
import { faSearch as faSearchSolid, faFilter as faFilterSolid } from '@fortawesome/pro-solid-svg-icons'
import { faSortUp, faSortDown } from '@fortawesome/pro-duotone-svg-icons';

import Loader from './../Loader/Loader';
import Icon from './../Icon/Icon';
import FormInput from './../FormElements/FormInput/FormInput';

import './ExTable.scss';

// Possibility for view switcher
export const EXTABLE_VIEWS = {
  ITEMS: 'ITEMS',
  LIST: 'LIST',
  CONDENSED: 'CONDENSED'
};

// Details about EXTABLE_VIEWS
// cssClass: class to apply on ExTable component
// icon: icon of the view in the switcher
// elementClass: class to apply on extable items
export const EXTABLE_VIEWS_DETAILS = {
  [EXTABLE_VIEWS.ITEMS]: {
    name: 'Items',
    cssClass: 'ExTable--items',
    icon: faThLarge,
    elementClass: 'Element--tile'
  },
  [EXTABLE_VIEWS.LIST]: {
    name: 'List',
    cssClass: 'ExTable--list',
    icon: faThList,
    elementClass: 'Element--row'
  },
  [EXTABLE_VIEWS.CONDENSED]: {
    name: 'Condensed',
    cssClass: 'ExTable--condensed',
    icon: faAlignJustify,
    elementClass: 'Element--condensed'
  }
};

// Type of Filter, search and sort
export const EXTABLE_FSS = {
  SEARCH: 'SEARCH',
  SORT: 'SORT',
  FILTER: 'FILTER'
};


// Extable sort direction for sort functionality
export const EXTABLE_SORT_DIRECTION = {
  ASC: 'ASC',
  DESC: 'DESC'
};

/**
 * Component: ExTable
 * Used to print a list of items
 * 
 * header: HTML | header / title of the table
 * loading: boolean | is data loading? prints a loader if that's the case
 * items: { itemKey: itemData } | item list
 * renderItem: function(itemKey, itemData, EXTABLE_VIEWS[view]) | print an item
 * isNoFrame: boolean | remove the frame and shadow of the table, useful when the table is nested
 * fss: Object | used to filter, search and sort items (in that order!).
 * {
 *   filter: {
 *    filterKey: {
 *      title: 'filterName',
 *      // return true if item should be kept or false if item should be hidden
 *      apply: (itemKey, itemData) => true|false
 *    }
 *   },
 *    // return true if item corresponds to the search, false if it should be hidden
 *   search: (itemKey, itemData, searchTerm) => true|false,
 *   sort: {
 *     sortKey: {
 *       title: 'sortName',
 *       // return the keys, sorted according to their content and the sort direction
 *       apply: (keys, items, sortDirection) => keys
 *     }
 *   }
 * }
 * defaultView: EXTABLE_VIEWS | optional, the default view of the table. If not passed, ITEMS is default
 */
const ExTable = ({ header, loading, items, renderItem, isNoFrame, fss, defaultView }) => {
  
  // view of the table
  const [view, setView] = useState(defaultView || EXTABLE_VIEWS.ITEMS);

  // FSS values
  const [activeFilter, setActiveFilter] = useState('');
  const [activeSort, setActiveSort] = useState('');
  const [sortDirection, setSortDirection] = useState(EXTABLE_SORT_DIRECTION.ASC);
  const [searchTerm, setSearchTerm] = useState('');

  // what fss is deployed?
  const [fssDeployed, setFssDeployed] = useState(null);

  // reset the sort for FSS
  const resetSort = () => {

    if(fss && fss.sort) {

      // compute the default sort from FSS config
      let defaultSort = '';
      Object.keys(fss.sort).forEach(sortKey => {
        if(fss.sort[sortKey].default) {
          defaultSort = sortKey;
        }
      });

      // set the default sort as current sort
      setActiveSort(defaultSort);

      // set default sort direction
      setSortDirection(EXTABLE_SORT_DIRECTION.ASC);
    }
  };

  useEffect(resetSort, []);

  // This part is about filtering and sorting keys

  // first, get all item keys
  let filtered_keys = Object.keys(items || {});

  if(fss) {
    // if a filter is active
    if(fss.filter && activeFilter) {

      // filter the keys according to it
      filtered_keys = filtered_keys.filter(key => fss.filter[activeFilter].apply(key, items[key]));
    }

    // if search is active
    if(fss.search && searchTerm) {

      // filter key by removing keys for items that do not match search term
      filtered_keys = filtered_keys.filter(key => fss.search(key, items[key], searchTerm));
    }

    // if a sort is active
    if(fss.sort && activeSort) {

      // sort all keys at once
      filtered_keys = fss.sort[activeSort].apply(filtered_keys, items, sortDirection);
    }
  }

  return (
    <div className={'ExTable ' + (EXTABLE_VIEWS_DETAILS[view].cssClass) + (isNoFrame ? ' ExTable--no-frame ' : '')}>
      <div className="header-container">

        {/* Header / title of the table */}
        {header ? <div className="header">{header}</div> : null}

        {/* FSS controls */}
        {fss ? <div className="ExTable-fss">

          {/* Search */}
          {fss.search ?
            <div className="ExTable-fss-search">

              {/* Search control */}
              <span className={'ExTable-fss-button ' + (searchTerm ? 'ExTable-fss-button--active' : '')}
                    onClick={() => setFssDeployed(fssDeployed => fssDeployed === EXTABLE_FSS.SEARCH ? '' : EXTABLE_FSS.SEARCH)} title="Search">
                
                <Icon source="fa" icon={searchTerm ? faSearchSolid : faSearch} />
              </span>

              {/* Search content */}
              <span className={'ExTable-fss-input ' + (fssDeployed === EXTABLE_FSS.SEARCH ? 'ExTable-fss-input--deployed' : '')}>
                <FormInput
                  value={searchTerm}
                  inputType="text"
                  noValidation
                  label="Search..."
                  fieldName="search"
                  onValueChange={setSearchTerm} />
                <span className="ExTable-fss-input-reset" title="Reset" onClick={() => { setSearchTerm(''); setFssDeployed(null); }}>
                  <Icon source="fa" icon={faTimes} />
                </span>
              </span>
            </div>
          : null}

          {/* Filter */}
          {fss.filter ?
            <div className="ExTable-fss-filter">

              {/* Filter control */}
              <span className={'ExTable-fss-button ' + (activeFilter ? 'ExTable-fss-button--active' : '')}
                    onClick={() => setFssDeployed(fssDeployed => fssDeployed === EXTABLE_FSS.FILTER ? '' : EXTABLE_FSS.FILTER)} title="Filter">

                <Icon source="fa" icon={activeFilter ? faFilterSolid : faFilter} />
              </span>

              {/* Filter content */}
              <span className={'ExTable-fss-input ' + (fssDeployed === EXTABLE_FSS.FILTER ? 'ExTable-fss-input--deployed' : '')}>
                <select value={activeFilter} onChange={e => setActiveFilter(e.target.value)} title="Change Filter">
                  <option value="" disabled>Filter...</option>
                  {Object.keys(fss.filter).map(filterKey => <option key={filterKey} value={filterKey}>{fss.filter[filterKey].title}</option>)}
                </select>
                <span className="ExTable-fss-input-reset" title="Reset" onClick={() => { setActiveFilter(''); setFssDeployed(null); }}>
                  <Icon source="fa" icon={faTimes} />
                </span>
              </span>
            </div>
          : null}

          {/* Sort */}
          {fss.sort ?
            <div className="ExTable-fss-sort">

              {/* Sort control */}
              <span className="ExTable-fss-button"
                    onClick={() => setFssDeployed(fssDeployed => fssDeployed === EXTABLE_FSS.SORT ? '' : EXTABLE_FSS.SORT)} title="Sort">

                <Icon source="fa" icon={faSortCircle} />
              </span>

              {/* Sort content */}
              <span className={'ExTable-fss-input ' + (fssDeployed === EXTABLE_FSS.SORT ? 'ExTable-fss-input--deployed' : '')}>
                <span className="ExTable-fss-input-button"
                      onClick={() => setSortDirection(sortDirection === EXTABLE_SORT_DIRECTION.ASC ? EXTABLE_SORT_DIRECTION.DESC : EXTABLE_SORT_DIRECTION.ASC)}
                      title="Change Sorting Direction">

                  <Icon source="fa" icon={sortDirection === EXTABLE_SORT_DIRECTION.ASC ? faSortUp : faSortDown} />
                </span>
                <select value={activeSort} onChange={e => setActiveSort(e.target.value)}>
                  <option value="" disabled>Sort...</option>
                  {Object.keys(fss.sort).map(sortKey => <option key={sortKey} value={sortKey}>{fss.sort[sortKey].title}</option>)}
                </select>
                <span className="ExTable-fss-input-reset" title="Reset" onClick={() => { resetSort(); setFssDeployed(null);  }}>
                  <Icon source="fa" icon={faTimes} />
                </span>
              </span>
            </div>
          : null}
        </div> : null}

        {/* View switcher, permits the user to switch between view modes */}
        <div className="view-switcher">
          {Object.keys(EXTABLE_VIEWS).map(viewKey => (
            <span key={viewKey}
                  title={EXTABLE_VIEWS_DETAILS[viewKey].name}
                  className={'view ' + (view === viewKey ? 'view--active' : '')}
                  onClick={() => setView(viewKey)}>

              <Icon source="fa" icon={EXTABLE_VIEWS_DETAILS[viewKey].icon} />
            </span>
          ))}
        </div>
      </div>
      <ul>
        {/* If loading, print a loader */}
        {loading ? <li className="loader">
          <Loader />
        </li> : null}

        {/* Else, print items according to view */}
        {!loading && items && filtered_keys.map(itemKey => 
          <li key={itemKey} className={'Element ' + EXTABLE_VIEWS_DETAILS[view].elementClass}>
            {renderItem(itemKey, items[itemKey], EXTABLE_VIEWS[view])}
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
