import React, { Fragment, useState, useEffect } from 'react';
import { faReply, faUserHeadset, faInfoCircle, faDesktop, faCopy } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import ActionList from './../../Utils/ActionList/ActionList';
import Debug from './../../Utils/Debug/Debug';

import ModalService from './../../../services/modal.service';
import UtilsService from './../../../services/utils.service';
import DateService from './../../../services/date.service';
import UserAgentService from './../../../services/useragent.service';
import DataService from './../../../services/data.service';

import { v4 as uuid } from 'uuid';

import './Support.scss';

const Support = ({ support, isPopup }) => {
  if(!support) { return null; }
  
  const SUPPORT_ID = Object.keys(support)[0];
  const SUPPORT_DATA = support[SUPPORT_ID];

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  const ACTIONS = [
    { title: 'Copy Email', icon: <Icon source="fa" icon={faCopy} />, callback: () => UserAgentService.copyToClipboard(SUPPORT_DATA.metadata.userEmail) }
  ];

  if(computed.employee.staff) {
    ACTIONS.push({ title: 'Answer', icon: <Icon source="fa" icon={faReply} />, pureLink: `mailto:${SUPPORT_DATA.metadata.userEmail}` });
  }
  

  return (
    <div className="Support Element-content">
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faUserHeadset} />
        <div className="Element-data">
          <span className="Element-title">
            {SUPPORT_DATA.metadata.userName} said:
          </span>
          <span>
            {SUPPORT_DATA.message}
          </span>
          <span className="sub">
            Created on {DateService.getDateString(DateService.getDateFromIsoString(SUPPORT_DATA.date), false, false)} - ID: {SUPPORT_ID}
          </span>
          {!isPopup && <button onClick={() => ModalService.showModal(`Support #${SUPPORT_ID}`, <Support support={support} isPopup />, { actions: [] })}>
            Show Additional Information
          </button>}
        </div>
        <div className="Element-actions">
          <ActionList actions={ACTIONS} />
        </div>
      </div>
      {isPopup && <div>
        <span>
          <Icon source="fa" icon={faInfoCircle} /> Additional Information
        </span><br/>
        {Object.keys(SUPPORT_DATA.metadata).map(metadataKey =>
          <Fragment key={metadataKey}>
            <span className="sub">{metadataKey} : {SUPPORT_DATA.metadata[metadataKey]}</span><br/>
          </Fragment>
        )}
        <span>
          <Icon source="fa" icon={faDesktop} /> User Agent
        </span><br/>
        <div className="sub">
          <Debug initialData={SUPPORT_DATA.userAgent} />
        </div>
      </div>}
    </div>
  );
};

export const supportsExTableFSS = {
  sort: {
    date: {
      title: 'Date',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].creationIsoDate, items[key2].creationIsoDate)
      )),
      default: true
    }
  },
  search: (_, itemData, searchTerm) => (
    itemData.metadata.userName.toLowerCase().includes(searchTerm.toLowerCase())
  )
};

export default Support;
