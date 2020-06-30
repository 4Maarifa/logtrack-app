import React, { useEffect, useState, Fragment } from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../services/data.service';
import RT_Service from './../../../services/rt.service';
import ErrorService from './../../../services/error.service';

import { ERT_userMessage, ERT_userMessageDetails } from './../../../classes/RT_userMessage';
import { ERT_companyMessage, ERT_companyMessageDetails } from './../../../classes/RT_companyMessage';

import Icon from './../../Utils/Icon/Icon';

import { v4 as uuid } from 'uuid';

import './MenuBar.scss';

/**
 * Component: MenuBar
 * Used by everyone to have access to Chat, Calendar, Messaged, Alerts, Notifications at all times in the bottom right of the screen
 *  MenuBar is an overlay component. It shows on all views (If ths user is not signed in, there's no content).
 */
const MenuBar = () => {

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // Storing here the activeMenu and the lastActiveMenu
  const [activeMenu, _setActiveMenu] = useState(null);
  // LastActiveMenu permits, on mobile, to recall the lastest active menu when clicking the deploy menubar
  const [lastActiveMenu, _setLastActiveMenu] = useState(ERT_userMessage.CALENDAR);

  // All RT messages, mixed in
  // Sorting them by type on rendering
  const [rtMessages, setRtMessages] = useState({});
  // Storing the update count here to update the view if a RT message was updated
  const [, setRtMessagesUpdateCount] = useState(0);

  useEffect(() => {
    if(computed.user) {
      // Observing RT Messages
      // Async process that permits to load new messages via Firebase Sockets
      RT_Service.observeRTmessages(rt => {
        // On new or updated messages, saving them and incrementing the updateCount to force rerender the view
        setRtMessages(rt);
        setRtMessagesUpdateCount(updateCount => updateCount + 1);
      }, OBSERVER_KEY);
    }
  }, [computed.user]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(computed.initialized && !computed.user) {
    // If user is not signed in, no content
    return null;
  }

  // Function called each time a user clicked on MenuBar icons
  const changeActiveMenu = newMenu => {
    // newMenu can be either part of ERT_userMessage, ERT_userMessage, or be null (if request to be closed)
    if(ERT_userMessage[newMenu] || ERT_companyMessage[newMenu]) {
      // If recognizing a menu, then set the activeMenu to it, or null if it's the actual active menu (to close the menuBar)
      _setActiveMenu(activeMenu === newMenu ? null : newMenu);
      // Set the latestactivemenu to this menu
      _setLastActiveMenu(newMenu);
    }
    else {
      // Otherwise, just close the menubar
      _setActiveMenu(null);
    }
  };

  /**
   * RENDER
   */
  const renderContent = () => {
    // If activeMenu is recognized as RT UserMessage menu, then render it
    if(ERT_userMessage[activeMenu]) {
      return ERT_userMessageDetails[activeMenu].render(SORTED_RT_BY_TYPE[activeMenu]);
    }
    else if (ERT_companyMessage[activeMenu]) {
      // If activeMenu is recognized as RT CompanyMessage menu, then render it
      return ERT_companyMessageDetails[activeMenu].render(SORTED_RT_BY_TYPE[activeMenu]);
    }
    else if(activeMenu) {
      // Otherwise, throw error
      ErrorService.error('Unknown menu : ' + activeMenu);
    }
  };

  // This part is about sorting event by their type
  // BADGE_COUNT_BY_TYPE permits to compute the number that will be shown in the menubar, next to each icon
  const SORTED_RT_BY_TYPE = {}, BADGE_COUNT_BY_TYPE = {};

  // for each user message type
  Object.keys(ERT_userMessage).forEach(rtUserMessageType => {

    // declare the new type
    SORTED_RT_BY_TYPE[rtUserMessageType] = {};

    // Then filter rt messages that are of that type
    Object.keys(rtMessages).filter(rtId => rtMessages[rtId].type === rtUserMessageType).forEach(rtId => {
      SORTED_RT_BY_TYPE[rtUserMessageType][rtId] = rtMessages[rtId];
    });

    // And computed the badge
    BADGE_COUNT_BY_TYPE[rtUserMessageType] = ERT_userMessageDetails[rtUserMessageType].countBadge(SORTED_RT_BY_TYPE[rtUserMessageType]);
  });

  // for each company message type
  Object.keys(ERT_companyMessage).forEach(rtCompanyMessageType => {

    // declare the new type
    SORTED_RT_BY_TYPE[rtCompanyMessageType] = {};

    // Filter rt messages that are of the type rtCompanyMessageType
    Object.keys(rtMessages).filter(rtId => rtMessages[rtId].type === rtCompanyMessageType).forEach(rtId => {
      SORTED_RT_BY_TYPE[rtCompanyMessageType][rtId] = rtMessages[rtId];
    });

    // Compute badge count
    BADGE_COUNT_BY_TYPE[rtCompanyMessageType] = ERT_companyMessageDetails[rtCompanyMessageType].countBadge(SORTED_RT_BY_TYPE[rtCompanyMessageType]);
  });

  // Render the navigation part of the menubar
  const renderMenu = () => (
    <nav>
      {Object.keys(ERT_userMessage).map(ERT_userMessageId => (
        <button key={ERT_userMessageId}
                title={ERT_userMessageDetails[ERT_userMessageId].title}
                className={'MenuBar-item ' + (activeMenu === ERT_userMessageId ? 'MenuBar-item--active' : '')} 
                onClick={() => changeActiveMenu(ERT_userMessageId)}>

          {BADGE_COUNT_BY_TYPE[ERT_userMessageId] && BADGE_COUNT_BY_TYPE[ERT_userMessageId] > 0 ?
            <Fragment>
              <Icon source="fa" icon={ERT_userMessageDetails[ERT_userMessageId].icons.active} />
              <span className="badge badge-inverse">{BADGE_COUNT_BY_TYPE[ERT_userMessageId]}</span>
            </Fragment>
          : <Icon source="fa" icon={ERT_userMessageDetails[ERT_userMessageId].icons.inactive} />}
        </button>
      ))}
      {Object.keys(ERT_companyMessage).map(ERT_companyMessageId => (
        <button key={ERT_companyMessageId}
                title={ERT_companyMessageDetails[ERT_companyMessageId].title}
                className={'MenuBar-item ' + (activeMenu === ERT_companyMessageId ? 'MenuBar-item--active' : '')} 
                onClick={() => changeActiveMenu(ERT_companyMessageId)}>

          {BADGE_COUNT_BY_TYPE[ERT_companyMessageId] && BADGE_COUNT_BY_TYPE[ERT_companyMessageId] > 0 ?
            <Fragment>
              <Icon source="fa" icon={ERT_companyMessageDetails[ERT_companyMessageId].icons.active} />
              <span className="badge badge-inverse">{BADGE_COUNT_BY_TYPE[ERT_companyMessageId]}</span>
            </Fragment>
          : <Icon source="fa" icon={ERT_companyMessageDetails[ERT_companyMessageId].icons.inactive} />}
        </button>
      ))}
      <button className='MenuBar-close' onClick={() => changeActiveMenu(activeMenu ? null : lastActiveMenu)}>
        <Icon source="fa" icon={activeMenu ? faChevronDown : faChevronUp} />
      </button>
    </nav>
  );

  return (
    <div className={'MenuBar ' + (activeMenu ? 'MenuBar--active' : '')}>

      {/* Visible part when closed */}
      {renderMenu()}

      {/* Button to close the MenuBar
        Visible only when deployed on desktop
        Always visible on mobile:
          Close the menubar if deployed
          Open the latest active menu if closed */}
      <button className='MenuBar-close' onClick={() => changeActiveMenu(null)}>
        <Icon source="fa" icon={faChevronDown} />
      </button>

      {/* Render content of the MenuBar (when deployed) */}
      {renderContent()}
    </div>
  );
};

export default MenuBar;
