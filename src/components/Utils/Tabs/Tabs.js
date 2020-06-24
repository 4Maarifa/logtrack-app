import React, { useState, useEffect } from 'react';

import UtilsService from './../../../services/utils.service';

import { v4 as uuid } from 'uuid';

import './Tabs.scss';

const Tabs = ({ default: defaultTab, tabs, horizontalLayout }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const OBSERVER_KEY = uuid();

  const activateTab = newActiveTab => !tabs[newActiveTab].disabled && !tabs[newActiveTab].clearfix && setActiveTab(newActiveTab);

  useEffect(() => {
    UtilsService.addObserver(() => {
      const TAB = UtilsService.getUrlGetParam('tab');
      if(TAB && tabs[TAB]) {
        setActiveTab(TAB);
      }
    }, OBSERVER_KEY);
    return () => UtilsService.removeObserver(OBSERVER_KEY);
  }, []);

  return (
    <div className={'Tabs ' + (horizontalLayout ? 'Tabs--horizontal' : '')}>
      <ul>
        {
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

      {activeTab ? <div className="tab-container">
        {tabs[activeTab].content()}
      </div> : <div className="tab-container" />}
    </div>
  );
};

export default Tabs;
