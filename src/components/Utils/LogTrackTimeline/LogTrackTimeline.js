import React, { useState } from 'react';

import Loader from './../Loader/Loader';
import Tooltip from './../Tooltip/Tooltip';
import Icon from './../Icon/Icon';

import { ELogTrackActivityDetails, ELogTrackCategoryDetails } from './../../../classes/LogTrack';

import DateService from './../../../services/date.service';
import ColorService from './../../../services/color.service';

import LogTrack from './../../Entities/LogTrack/LogTrack';

import HashedGrayBackground from './../../../assets/patterns/gray-hashed.png';

import './LogTrackTimeline.scss';

/**
 * Component: LogTrackTimeline
 * Used to print last 24h of logtracks linked to an employee or equipment.
 * 
 * logtracks: LogTrack[] | list of logtracks to be printed
 * isLoading: boolean | prints a loader during the data loading
 * 
 */
const LogTrackTimeline = ({ logtracks, isLoading }) => {

  // Min length of non punctual events is 15 mins
  // This means that non punctual events that last less than 15 mins print like punctual ones, with a marker
  const MIN_LENGTH_OF_NON_PUNCTUAL_EVENTS = 15 * 60 * 1000;

  // Save the current logtrack key that is hovered, to print details about it
  const [logTrackHover, setLogTrackHover] = useState(null);
  
  if(isLoading) {
    return <Loader />;
  }

  // Saving here Marker logtracks.
  // Marker are printed above the timeline, and represent either punctual events or short non punctual events
  const MARKER_LOGTRACKS = {};

  // Saving here Time slot logtracks.
  // Time slots represent non punctual events
  const TIME_SLOT_LOGTRACKS = {};

  // Sorting logtracks
  Object.keys(logtracks).forEach(logTrackKey => {

    // If logtrack is punctual or is short
    if(logtracks[logTrackKey].endTimestamp && (logtracks[logTrackKey].isPunctual || 
          DateService.getTimestampDifference(logtracks[logTrackKey].startTimestamp, logtracks[logTrackKey].endTimestamp) < MIN_LENGTH_OF_NON_PUNCTUAL_EVENTS)) {

      // put it in marker logtracks
      MARKER_LOGTRACKS[logTrackKey] = logtracks[logTrackKey];
    }

    // putting all non punctual events here
    // Short non punctual events are printed without an icon, as they are printed with a marker too
    if(!logtracks[logTrackKey].isPunctual) {
      TIME_SLOT_LOGTRACKS[logTrackKey] = logtracks[logTrackKey];
    }
  });

  // How many milliseconds are in 24 hours
  // Used as a scale, to have the full length of the timeline
  const DURATION_24H = 24 * 60 * 60 * 1000;

  // Compute end time and start time of the timeline
  const END_TIME = DateService.getCurrentTimeStampNumber();
  const START_TIME = END_TIME - DURATION_24H;

  /**
   * RENDER
   */

   // This function adds the logtrack to the timeline, as a time slot
  const renderTimeSlotLogTrack = (logTrackKey, logTrackData) => {

    // save logtrack activity details
    const LOGTRACK_ACTIVITY_DETAILS = ELogTrackActivityDetails[logTrackData.activity];

    // comppute the width and the position of the logtrack
    const LOGTRACK_WIDTH = DateService.getTimestampDifference(logTrackData.startTimestamp, logTrackData.endTimestamp || END_TIME) / DURATION_24H;
    const LOGTRACK_POSITION = DateService.getTimestampDifference(START_TIME, logTrackData.startTimestamp) / DURATION_24H;

    // Save the fact that this logtrack is also printed as a marker
    const IS_MARKER = DateService.getTimestampDifference(logTrackData.startTimestamp, logTrackData.endTimestamp) < MIN_LENGTH_OF_NON_PUNCTUAL_EVENTS;

    /* Render the logtrack */
    /* Also, when hovering, set the logtrackhover to show details */
    return <span key={logTrackKey} className="logTrack logTrack-time-slot" title={LOGTRACK_ACTIVITY_DETAILS.text} style={{
      left: (LOGTRACK_POSITION < 0 ? 0 : LOGTRACK_POSITION) * 100 + '%',
      width: (LOGTRACK_WIDTH > 1 ? 1 : LOGTRACK_WIDTH) * 100 + '%',
      backgroundColor: ColorService.getPaletteForColor(ELogTrackCategoryDetails[LOGTRACK_ACTIVITY_DETAILS.parent].color).medium.color
    }}
      onMouseOver={() => setLogTrackHover(logTrackKey)}
      onMouseOut={() => setLogTrackHover(null)}>

      {/* If the logtrack is also render as a marker one, don't put an icon in, because it's very short */}
      {/* Otherwise, render the activity icon */}
      {IS_MARKER ? null : <Icon source="fa" icon={LOGTRACK_ACTIVITY_DETAILS.icon} />}
    </span>;
  };

  // This function adds the logtrack to the timeline, as a marker
  const renderMarkerLogTrack = (logTrackKey, logTrackData) => {

    // save logtrack activity details
    const LOGTRACK_ACTIVITY_DETAILS = ELogTrackActivityDetails[logTrackData.activity];

    // Compute marker position
    const LOGTRACK_POSITION = DateService.getTimestampDifference(START_TIME, logTrackData.startTimestamp) / DURATION_24H;

    // render the logtrack, saving when the logtrack is hovered
    return <span key={logTrackKey} className="logTrack logTrack-marker" title={LOGTRACK_ACTIVITY_DETAILS.text} style={{
      left: `calc(${LOGTRACK_POSITION * 100}% - 1rem)`,
      backgroundColor: ColorService.getPaletteForColor(ELogTrackCategoryDetails[LOGTRACK_ACTIVITY_DETAILS.parent].color).medium.color
    }}
      onMouseOver={() => setLogTrackHover(logTrackKey)}
      onMouseOut={() => setLogTrackHover(null)}>
      
      {/* Render the activity icon */}
      <Icon source="fa" icon={LOGTRACK_ACTIVITY_DETAILS.icon} />
    </span>;
  };

  // Save the current logtrack here, if there is one
  const CURRENT_LOGTRACK_KEY = Object.keys(logtracks).filter(ltKey => !logtracks[ltKey].endTimestamp)[0];
  // get the details of it
  const CURRENT_LOGTRACK_ACTIVITY_DETAILS = CURRENT_LOGTRACK_KEY ? ELogTrackActivityDetails[logtracks[CURRENT_LOGTRACK_KEY].activity] : null;

  return <div className="LogTrackTimeline">

    {/* render marker logtracks */}
    <div className="markers">
      {Object.keys(MARKER_LOGTRACKS).map(logTrackKey => renderMarkerLogTrack(logTrackKey, MARKER_LOGTRACKS[logTrackKey]))}
    </div>

    {/* Timeline, with default crossed background */}
    <div className="timeline" title="No LogTrack available" style={{ backgroundImage: `url(${HashedGrayBackground})` }}>

      {/* Render timeslot logtracks */}
      <div className="timeline-content">
        {Object.keys(TIME_SLOT_LOGTRACKS).map(logTrackKey => renderTimeSlotLogTrack(logTrackKey, TIME_SLOT_LOGTRACKS[logTrackKey]))}
      </div>

      {/* render current logtrack */}
      {CURRENT_LOGTRACK_ACTIVITY_DETAILS ?
          <div className="timeline-current" title={'Current: ' + CURRENT_LOGTRACK_ACTIVITY_DETAILS.text} style={{
            backgroundColor: ColorService.getPaletteForColor(ELogTrackCategoryDetails[CURRENT_LOGTRACK_ACTIVITY_DETAILS.parent].color).medium.color
          }}
            onMouseOver={() => setLogTrackHover(CURRENT_LOGTRACK_KEY)}
            onMouseOut={() => setLogTrackHover(null)}>

            <Icon source="fa"
                  icon={CURRENT_LOGTRACK_ACTIVITY_DETAILS.icon} 
                  style={{ color: '#FFFFFF' }}
                  additional={CURRENT_LOGTRACK_ACTIVITY_DETAILS.additionalIcon}
                  additionalSource={CURRENT_LOGTRACK_ACTIVITY_DETAILS.additionalSource} />
          </div>
      : <div className="timeline-current"></div>}
    </div>

    {/* render the tooltip, which print details about the hovered logtrack */}
    <Tooltip
      show={logTrackHover}
      label={logTrackHover ? <div className="Element Element--page" style={{
        backgroundColor: ColorService.getPaletteForColor(
          ELogTrackCategoryDetails[ELogTrackActivityDetails[logtracks[logTrackHover].activity].parent].color).medium.color
      }}>
        <LogTrack logtrack={{[logTrackHover]: logtracks[logTrackHover]}} isPage />
      </div> : null} />
  </div>;
};

export default LogTrackTimeline;
