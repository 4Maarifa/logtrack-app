import React, { useState } from 'react';

import Loader from './../Loader/Loader';
import Tooltip from './../Tooltip/Tooltip';

import { LogTrackActivityDetails, LogTrackCategoryDetails } from './../../../classes/LogTrack';

import DateService from './../../../services/date.service';
import ColorService from './../../../services/color.service';

import LogTrack from './../../Entities/LogTrack/LogTrack';

import HashedGrayBackground from './../../../assets/patterns/gray-hashed.png';

import './LogTrackTimeline.scss';



const MIN_LENGTH_OF_NON_PUNCTUAL_EVENTS = 15 * 60 * 1000;

/**
 * Component: LogTrackTimeline
 * Used to print last 24h of logtracks linked to an employee or equipment.
 * 
 */
const LogTrackTimeline = ({ logtracks, isLoading }) => {

  const [logTrackHover, setLogTrackHover] = useState(null);
  
  if(isLoading) {
    return <Loader />;
  }

  const MARKER_LOGTRACKS = {};
  const TIME_SLOT_LOGTRACKS = {};

  Object.keys(logtracks).forEach(logTrackKey => {
    if(logtracks[logTrackKey].endTimestamp && (logtracks[logTrackKey].isPunctual || 
          DateService.getTimestampDifference(logtracks[logTrackKey].startTimestamp, logtracks[logTrackKey].endTimestamp) < MIN_LENGTH_OF_NON_PUNCTUAL_EVENTS)) {

      MARKER_LOGTRACKS[logTrackKey] = logtracks[logTrackKey];
    }
    if(!logtracks[logTrackKey].isPunctual) {
      TIME_SLOT_LOGTRACKS[logTrackKey] = logtracks[logTrackKey];
    }
  });

  const DURATION_24H = 24 * 60 * 60 * 1000;

  const END_TIME = DateService.getCurrentTimeStampNumber();
  const START_TIME = END_TIME - DURATION_24H;

  /**
   * RENDER
   */
  const renderTimeSlotLogTrack = (logTrackKey, logTrackData) => {
    const LOGTRACK_ACTIVITY_DETAILS = LogTrackActivityDetails[logTrackData.activity];

    const LOGTRACK_WIDTH = DateService.getTimestampDifference(logTrackData.startTimestamp, logTrackData.endTimestamp || END_TIME) / DURATION_24H;
    const LOGTRACK_POSITION = DateService.getTimestampDifference(START_TIME, logTrackData.startTimestamp) / DURATION_24H;

    const IS_PUNCTUAL = DateService.getTimestampDifference(logTrackData.startTimestamp, logTrackData.endTimestamp) < MIN_LENGTH_OF_NON_PUNCTUAL_EVENTS;

    return <span key={logTrackKey} className="logTrack logTrack-time-slot" title={LOGTRACK_ACTIVITY_DETAILS.text} style={{
      left: LOGTRACK_POSITION * 100 + '%',
      width: LOGTRACK_WIDTH * 100 + '%',
      backgroundColor: ColorService.getPaletteForColor(LogTrackCategoryDetails[LOGTRACK_ACTIVITY_DETAILS.parent].color).medium.color
    }}
      onMouseOver={() => setLogTrackHover(logTrackKey)}
      onMouseOut={() => setLogTrackHover(null)}>

      {IS_PUNCTUAL ? null : LOGTRACK_ACTIVITY_DETAILS.icon(null, {color: 'white'})}
    </span>;
  };

  const renderMarkerLogTrack = (logTrackKey, logTrackData) => {
    const LOGTRACK_ACTIVITY_DETAILS = LogTrackActivityDetails[logTrackData.activity];

    const LOGTRACK_POSITION = DateService.getTimestampDifference(START_TIME, logTrackData.startTimestamp) / DURATION_24H;

    return <span key={logTrackKey} className="logTrack logTrack-marker" title={LOGTRACK_ACTIVITY_DETAILS.text} style={{
      left: `calc(${LOGTRACK_POSITION * 100}% - 1rem)`,
      backgroundColor: ColorService.getPaletteForColor(LogTrackCategoryDetails[LOGTRACK_ACTIVITY_DETAILS.parent].color).medium.color
    }}
      onMouseOver={() => setLogTrackHover(logTrackKey)}
      onMouseOut={() => setLogTrackHover(null)}>

      {LOGTRACK_ACTIVITY_DETAILS.icon(null, {color: 'white'})}
    </span>;
  };

  const CURRENT_LOGTRACK_KEY = Object.keys(logtracks).filter(ltKey => !logtracks[ltKey].endTimestamp)[0];
  const CURRENT_LOGTRACK_ACTIVITY_DETAILS = CURRENT_LOGTRACK_KEY ? LogTrackActivityDetails[logtracks[CURRENT_LOGTRACK_KEY].activity] : null;

  return <div className="LogTrackTimeline">
    <div className="pointers">
      {Object.keys(MARKER_LOGTRACKS).map(logTrackKey => renderMarkerLogTrack(logTrackKey, MARKER_LOGTRACKS[logTrackKey]))}
    </div>
    <div className="timeline" title="No LogTrack available" style={{ backgroundImage: `url(${HashedGrayBackground})` }}>
      <div className="timeline-content">
        {Object.keys(TIME_SLOT_LOGTRACKS).map(logTrackKey => renderTimeSlotLogTrack(logTrackKey, TIME_SLOT_LOGTRACKS[logTrackKey]))}
      </div>
      {CURRENT_LOGTRACK_ACTIVITY_DETAILS ?
          <div className="timeline-current" title={'Current: ' + CURRENT_LOGTRACK_ACTIVITY_DETAILS.text} style={{
            backgroundColor: ColorService.getPaletteForColor(LogTrackCategoryDetails[CURRENT_LOGTRACK_ACTIVITY_DETAILS.parent].color).medium.color
          }}
            onMouseOver={() => setLogTrackHover(CURRENT_LOGTRACK_KEY)}
            onMouseOut={() => setLogTrackHover(null)}>

            {CURRENT_LOGTRACK_ACTIVITY_DETAILS.icon(null, {color: 'white'})}
          </div>
      : <div className="timeline-current"></div>}
    </div>
    <Tooltip
      styles={{
        
      }}
      show={logTrackHover}
      label={logTrackHover ? <div className="Element Element--page" style={{
        backgroundColor: ColorService.getPaletteForColor(
          LogTrackCategoryDetails[LogTrackActivityDetails[logtracks[logTrackHover].activity].parent].color).medium.color
      }}>
        <LogTrack logtrack={{[logTrackHover]: logtracks[logTrackHover]}} isPage />
      </div> : null} />
  </div>;
};

export default LogTrackTimeline;
