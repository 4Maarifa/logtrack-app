import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';
import DateService from './../../../services/date.service';
import ColorService from './../../../services/color.service';

import { ELogTrackActivityDetails, ELogTrackCategoryDetails } from './../../../classes/LogTrack';

import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ActionList from './../../Utils/ActionList/ActionList';
import Icon from './../../Utils/Icon/Icon';

import { v4 as uuid } from 'uuid';

/**
 * Component: LogTrack
 * Pritn LogTrack details
 * 
 * If you want, you can pass:
 * 1. Full Employee data
 * 2. Full company data
 * 
 * Those are optional. If nothing is passed, they will not be printed
 */
const LogTrack = ({ logtrack, employee, company, isPage }) => {
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
  if(!computed.activeRole || (computed.activeRole.companyId !== LOGTRACK_DATA.companyId && LOGTRACK_DATA.employeeId !== computed.user.uid)) {
      
    ErrorService.error(`You don't have right to view this!`);
    return <Redirect to={`/dashboard`} />;
  }

  const ACTIONS = [];

  // Compute details and color
  const LOGTRACK_ACTIVITY_DETAILS = ELogTrackActivityDetails[LOGTRACK_DATA.activity];
  const LOGTRACK_COLOR = ColorService.getPaletteForColor(ELogTrackCategoryDetails[LOGTRACK_ACTIVITY_DETAILS.parent].color).medium.color;

  return (
    <div className="Company Element-content">
      <div className="Element-base">

        {/* Activity icon */}
        <Icon source="fa" 
              containerclassname="Element-icon"
              icon={LOGTRACK_ACTIVITY_DETAILS.icon}
              style={isPage ? {} : { color: LOGTRACK_COLOR }} />

        <div className="Element-data">
          {/* Details */}
          <h1 className="Element-title">{LOGTRACK_ACTIVITY_DETAILS.text}</h1>
          <span>
            {/* If logtrack is not punctual and 
               1. has an end date, print as ended
               2. Has not an end date => print as current */}
            {!LOGTRACK_DATA.isPunctual ? 
              LOGTRACK_DATA.endIsoDate ? 
                <Fragment>Ended {DateService.getDateTimeString(DateService.getDateFromIsoString(LOGTRACK_DATA.endIsoDate), false, false, 'on')}<br/></Fragment>
                : <Fragment>Current<br/></Fragment>
              : null}

            {/* If logtrack is punctual, say it's done (as it's already done when inserted). Otherwise, say it started */}
            {LOGTRACK_DATA.isPunctual ? 'Done' : 'Started'} {DateService.getDateTimeString(DateService.getDateFromIsoString(LOGTRACK_DATA.startIsoDate), false, false, 'on')}<br/>

            {/* If an employee is passed, print his Pagelink */}
            {employee ? <PageLink type={PageLinkType.EMPLOYEE} entityId={LOGTRACK_DATA.employeeId} entityData={employee[LOGTRACK_DATA.employeeId]} /> : null}

            {/* If a company is passed, print its pagelink */}
            {company ? <PageLink type={PageLinkType.COMPANY} entityId={LOGTRACK_DATA.companyId} entityData={company[LOGTRACK_DATA.companyId]} /> : null}
          </span>
        </div>
        <div className="Element-actions">
          {/* Actions */}
          <ActionList actions={ACTIONS} />
        </div>
      </div>
    </div>
  );
};

// FSS for logTracks (used to filter, search and sort logtracks) => sort on time
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
