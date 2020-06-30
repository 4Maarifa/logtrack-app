import React, { useState, useEffect } from 'react';

import UtilsService from './../../../services/utils.service';

import { v4 as uuid } from 'uuid';

import './Tabs.scss';

/**
 * Component: Tabs
 * Component that print tabs as well as content of the active tab
 * 
 * default: string | key of the tab opened by default
 * tabs: { tabKey: { name, content, disabled, clearfix } } | tab items.
 *    name: function({ isActive }) | renders the name. isActive is passed if some content must be modified according to tab state
 *    content: function() | prints the content of the tab
 *    disabled: boolean | default false. Disable interaction with the tab
 *    clearfix: boolean | If active, the tab will take all available space. No content and name will be rendered and this tab cannot be activated
 * isHorizontalLayout: boolean | default false. If true, print the list tab vertically, and content of active tab on the right (so horizontally aligned)
 * 
 * Performance: as content is a function, only the active tab is rendered
 */
const Tabs = ({ default: defaultTab, tabs, isHorizontalLayout }) => {

  // key of the active tab is saved here
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // activate tab handler
  // If the tab is not disabled and is not a clearfix, set it as active tab to render its content
  const activateTab = newActiveTab => !tabs[newActiveTab].disabled && !tabs[newActiveTab].clearfix && setActiveTab(newActiveTab);

  const OBSERVER_KEY = uuid();

  useEffect(() => {

    // listend for URL change
    UtilsService.addObserver(() => {

      // If url change, try to get the 'tab' GET param
      const TAB = UtilsService.getUrlGetParam('tab');

      // If there's one and it corresponds to one of the tab items, activate it
      if(TAB && tabs[TAB]) {
        setActiveTab(TAB);
      }
    }, OBSERVER_KEY);

    // Remove observer on delete
    return () => UtilsService.removeObserver(OBSERVER_KEY);
  }, []);

  return (
    <div className={'Tabs ' + (isHorizontalLayout ? 'Tabs--horizontal' : '')}>
      <ul>
        {
          /* loop through tab items */
          Object.keys(tabs).map(tabKey => 
            <li key={tabKey} 
                className={'tab ' + 
                  (tabKey === activeTab ? 'tab--selected ' : '') + 
                  (tabs[tabKey].disabled ? 'tab--disabled ' : '') +
                  (tabs[tabKey].clearfix ? 'tab-clearfix' : '')} 
                onClick={() => activateTab(tabKey)}>

              {!tabs[tabKey].clearfix && tabs[tabKey].name({ isActive: tabKey === activeTab })} 
            </li>
          )
        }
      </ul>

      {/* Render the active tab */}
      {activeTab ? <div className="tab-container">
        {tabs[activeTab].content()}
      </div> : <div className="tab-container" />}
    </div>
  );
};

export default Tabs;
