import React, { useEffect, useState, Fragment } from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../services/data.service';
import RT_Service from './../../../services/rt.service';
import ErrorService from './../../../services/error.service';

import { ERT_userMessage, ERT_userMessageDetails } from './../../../classes/RT_userMessage';
import { ERT_companyMessage, ERT_companyMessageDetails } from './../../../classes/RT_companyMessage';

import Icon from './../../Utils/Icon/Icon';

import { v4 as uuid } from 'uuid';

import './MenuBar.scss';

const MenuBar = () => {

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  const [activeMenu, _setActiveMenu] = useState(null);
  const [lastActiveMenu, _setLastActiveMenu] = useState(ERT_userMessage.CALENDAR);

  const [rtMessages, setRtMessages] = useState({});
  const [rtMessagesUpdateCount, setRtMessagesUpdateCount] = useState(0);

  useEffect(() => {
    if(computed.initialized && computed.user) {
      RT_Service.observeRTmessages(rt => {
        setRtMessages(rt);
        setRtMessagesUpdateCount(rtMessagesUpdateCount + 1);
      }, observerKey);
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
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
      return ERT_userMessageDetails[activeMenu].render(sortedRtByType[activeMenu]);
    }
    else if (ERT_companyMessage[activeMenu]) {
      return ERT_companyMessageDetails[activeMenu].render(sortedRtByType[activeMenu]);
    }
    else if(activeMenu) {
        ErrorService.error('Unknown menu : ' + activeMenu);
    }
  };

  const sortedRtByType = {}, badgeCountByType = {};
  Object.keys(ERT_userMessage).forEach(rtUserMessageType => {
    sortedRtByType[rtUserMessageType] = {};
    Object.keys(rtMessages).filter(rtKey => rtMessages[rtKey].type === rtUserMessageType).forEach(rtKey => {
      sortedRtByType[rtUserMessageType][rtKey] = rtMessages[rtKey];
    });
    badgeCountByType[rtUserMessageType] = ERT_userMessageDetails[rtUserMessageType].countBadge(sortedRtByType[rtUserMessageType]);
  });
  Object.keys(ERT_companyMessage).forEach(rtCompanyMessageType => {
    sortedRtByType[rtCompanyMessageType] = {};
    Object.keys(rtMessages).filter(rtKey => rtMessages[rtKey].type === rtCompanyMessageType).forEach(rtKey => {
      sortedRtByType[rtCompanyMessageType][rtKey] = rtMessages[rtKey];
    });
    badgeCountByType[rtCompanyMessageType] = ERT_companyMessageDetails[rtCompanyMessageType].countBadge(sortedRtByType[rtCompanyMessageType]);
  });

  const renderMenu = () => (
    <nav>
      {Object.keys(ERT_userMessage).map(ERT_userMessageKey => (
        <button key={ERT_userMessageKey}
                title={ERT_userMessageDetails[ERT_userMessageKey].title}
                className={'MenuBar-item ' + (activeMenu === ERT_userMessageKey ? 'MenuBar-item--active' : '')} 
                onClick={() => changeActiveMenu(ERT_userMessageKey)}>

          {badgeCountByType[ERT_userMessageKey] && badgeCountByType[ERT_userMessageKey] > 0 ?
            <Fragment>
              <Icon source="fa" icon={ERT_userMessageDetails[ERT_userMessageKey].icons.active} />
              <span className="badge badge-inverse">{badgeCountByType[ERT_userMessageKey]}</span>
            </Fragment>
          : <Icon source="fa" icon={ERT_userMessageDetails[ERT_userMessageKey].icons.inactive} />}
        </button>
      ))}
      {Object.keys(ERT_companyMessage).map(ERT_companyMessageKey => (
        <button key={ERT_companyMessageKey}
                title={ERT_companyMessageDetails[ERT_companyMessageKey].title}
                className={'MenuBar-item ' + (activeMenu === ERT_companyMessageKey ? 'MenuBar-item--active' : '')} 
                onClick={() => changeActiveMenu(ERT_companyMessageKey)}>

          {badgeCountByType[ERT_companyMessageKey] && badgeCountByType[ERT_companyMessageKey] > 0 ?
            <Fragment>
              <Icon source="fa" icon={ERT_companyMessageDetails[ERT_companyMessageKey].icons.active} />
              <span className="badge badge-inverse">{badgeCountByType[ERT_companyMessageKey]}</span>
            </Fragment>
          : <Icon source="fa" icon={ERT_companyMessageDetails[ERT_companyMessageKey].icons.inactive} />}
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
