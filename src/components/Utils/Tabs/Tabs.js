import React, { useState, useEffect } from 'react';

import './Tabs.scss';

const Tabs = ({ default: defaultTab, tabs }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const activateTab = newActiveTab => !tabs[newActiveTab].disabled && setActiveTab(newActiveTab);

  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get('tab');
    if(tab && tabs[tab]) {
      setActiveTab(tab);
    }
  }, []);

  return (
    <div className="Tabs">
      <ul>
        {
          Object.keys(tabs).map(tabKey => 
            <li key={tabKey} 
                className={'tab ' + (tabKey === activeTab ? 'tab--selected ' : '') + (tabs[tabKey].disabled ? 'tab--disabled' : '')} 
                onClick={() => activateTab(tabKey)}>

              {tabs[tabKey].name()} 
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
