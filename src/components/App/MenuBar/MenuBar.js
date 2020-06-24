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

const MenuBar = () => {

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  const [activeMenu, _setActiveMenu] = useState(null);
  const [lastActiveMenu, _setLastActiveMenu] = useState(ERT_userMessage.CALENDAR);

  const [rtMessages, setRtMessages] = useState({});
  const [rtMessagesUpdateCount, setRtMessagesUpdateCount] = useState(0);

  useEffect(() => {
    if(computed.user) {
      RT_Service.observeRTmessages(rt => {
        setRtMessages(rt);
        setRtMessagesUpdateCount(rtMessagesUpdateCount + 1);
      }, OBSERVER_KEY);
    }
  }, [computed.user]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(computed.initialized && !computed.user) {
    return null;
  }

  const changeActiveMenu = newMenu => {
    if(ERT_userMessage[newMenu] || ERT_companyMessage[newMenu]) {
      _setActiveMenu(activeMenu === newMenu ? null : newMenu);
      _setLastActiveMenu(newMenu);
    }
    else {
      _setActiveMenu(null);
    }
  };

  /**
   * RENDER
   */
  const renderContent = () => {
    if(ERT_userMessage[activeMenu]) {
      return ERT_userMessageDetails[activeMenu].render(SORTED_RT_BY_TYPE[activeMenu]);
    }
    else if (ERT_companyMessage[activeMenu]) {
      return ERT_companyMessageDetails[activeMenu].render(SORTED_RT_BY_TYPE[activeMenu]);
    }
    else if(activeMenu) {
        ErrorService.error('Unknown menu : ' + activeMenu);
    }
  };

  const SORTED_RT_BY_TYPE = {}, BADGE_COUNT_BY_TYPE = {};
  Object.keys(ERT_userMessage).forEach(rtUserMessageType => {
    SORTED_RT_BY_TYPE[rtUserMessageType] = {};
    Object.keys(rtMessages).filter(rtId => rtMessages[rtId].type === rtUserMessageType).forEach(rtId => {
      SORTED_RT_BY_TYPE[rtUserMessageType][rtId] = rtMessages[rtId];
    });
    BADGE_COUNT_BY_TYPE[rtUserMessageType] = ERT_userMessageDetails[rtUserMessageType].countBadge(SORTED_RT_BY_TYPE[rtUserMessageType]);
  });
  Object.keys(ERT_companyMessage).forEach(rtCompanyMessageType => {
    SORTED_RT_BY_TYPE[rtCompanyMessageType] = {};
    Object.keys(rtMessages).filter(rtId => rtMessages[rtId].type === rtCompanyMessageType).forEach(rtId => {
      SORTED_RT_BY_TYPE[rtCompanyMessageType][rtId] = rtMessages[rtId];
    });
    BADGE_COUNT_BY_TYPE[rtCompanyMessageType] = ERT_companyMessageDetails[rtCompanyMessageType].countBadge(SORTED_RT_BY_TYPE[rtCompanyMessageType]);
  });

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
      {renderMenu()}
      <button className='MenuBar-close' onClick={() => changeActiveMenu(null)}>
        <Icon source="fa" icon={faChevronDown} />
      </button>
      {renderContent()}
    </div>
  );
};

export default MenuBar;
