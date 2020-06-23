import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';
import DateService from './../../../services/date.service';
import ColorService from './../../../services/color.service';

import { LogTrackActivityDetails, LogTrackCategoryDetails } from './../../../classes/LogTrack';
import { ERole } from './../../../classes/Role';

import ActionList from './../../Utils/ActionList/ActionList';

import { v4 as uuid } from 'uuid';
import PageLink, { PageLinkType } from '../../Utils/PageLink/PageLink';

const LogTrack = ({ logtrack, employee, isPage }) => {
  if(!logtrack) { return null; }

  const LOGTRACK_ID = Object.keys(logtrack)[0];
  const LOGTRACK_DATA = logtrack[LOGTRACK_ID];

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }
  if(!computed.activeRole || 
    computed.activeRole.companyId !== LOGTRACK_DATA.companyId || 
    (LOGTRACK_DATA.employeeId !== computed.user.uid && computed.activeRole.role !== ERole.MANAGER)) {
      
    ErrorService.error(`You don't have right to view this!`);
    return <Redirect to={`/dashboard`} />;
  }

  const ACTIONS = [
    
  ];

  const LOGTRACK_ACTIVITY_DETAILS = LogTrackActivityDetails[LOGTRACK_DATA.activity];
  const LOGTRACK_COLOR = ColorService.getPaletteForColor(LogTrackCategoryDetails[LOGTRACK_ACTIVITY_DETAILS.parent].color).medium.color;

  return (
    <div className="Company Element-content">
      <div className="Element-base">
        {LOGTRACK_ACTIVITY_DETAILS.icon('Element-icon', isPage ? {} : { color: LOGTRACK_COLOR })}
        <div className="Element-data">
          <h1 className="Element-title">
            {LOGTRACK_ACTIVITY_DETAILS.text}
          </h1>
          <span>
            {!LOGTRACK_DATA.isPunctual ? 
              LOGTRACK_DATA.endIsoDate ? 
                <Fragment>Ended on {DateService.getDateTimeString(DateService.getDateFromIsoString(LOGTRACK_DATA.endIsoDate), false)}<br/></Fragment>
                : <Fragment>Current<br/></Fragment>
              : null}
            {LOGTRACK_DATA.isPunctual ? 'Done' : 'Started'} on {DateService.getDateTimeString(DateService.getDateFromIsoString(LOGTRACK_DATA.startIsoDate), false)}<br/>
            {employee ? <PageLink type={PageLinkType.EMPLOYEE} entityId={LOGTRACK_DATA.employeeId} entityData={employee[LOGTRACK_DATA.employeeId]} /> : null}
          </span>
        </div>
        <div className="Element-actions">
          <ActionList actions={ACTIONS} />
        </div>
      </div>
    </div>
  );
};

export const logtracksExTableFSS = {
  sort: {
    time: {
      title: 'Time',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? -1 : 1) * UtilsService.compareFn(items[key1].endTimestamp || Number.MAX_VALUE, items[key2].endTimestamp || Number.MAX_VALUE)
      )),
      default: true
    }
  }
};

export default LogTrack;
