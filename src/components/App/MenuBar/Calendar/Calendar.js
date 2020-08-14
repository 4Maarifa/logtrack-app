import React, { useState, Fragment } from 'react';
import { faCalendarAlt, faClock, faPlus, faAngleLeft, faMapMarker, faBars, faEdit } from '@fortawesome/pro-light-svg-icons';

import ColorService from './../../../../services/color.service';
import DateService from './../../../../services/date.service';
import UtilsService from './../../../../services/utils.service';
import ErrorService from './../../../../services/error.service';

import Icon from './../../../Utils/Icon/Icon';
import Switch from './../../../Utils/FormElements/Switch/Switch';

import CalendarEventAdd from './../../../Forms/CalendarEventAdd/CalendarEventAdd';

import './Calendar.scss';

/**
 * Component: Calendar
 * Used by everyone to plan future events
 */
const Calendar = ({ rt }) => {

  // User can select an event from the list: storing its id here
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Toggle to show or hide past events
  const [isShowPastDaysEvents, setShowPastDaysEvents] = useState(false);

  // User can edit an event. Storing its id here
  const [currentEdit, setCurrentEdit] = useState(null);

  /**
   * RENDER
   */
  // Rendering an event (rtId is the rtMessage Id, rtMessage its content. Computed is pre-computed data for dates and isActive tells if the message is the selected one)
  const Event = ({ rtId, rtMessage, computed, isActive }) => {

    // Here, storing the badges that indicated the user date and duration of events
    let badges = [];

    // computing badges according to computed data
    if(computed.isPast) { badges.push('PAST'); }
    if(computed.totalDays > 1) { badges.push(`DAY ${computed.dayNumber}/${computed.totalDays}`); }

    // getting colors from the palette
    const COLOR_PALETTE = ColorService.getPaletteForColor(rtMessage.metadata.color);

    return <li key={rtId}
              className={'Calendar-event Element Element--tile Element-small Element--full-width' + (isActive ? ' Calendar-event--active' : '')}
              style={{backgroundColor: isActive ? COLOR_PALETTE.medium.color : COLOR_PALETTE.veryLight.color}}
              onClick={() => setSelectedEvent(selectedEvent === rtId ? null : rtId)}>

      <div className="Element-content">
        <div className="Element-base">
          <div className="Element-date Element-date--small">
            {/* Computed separated date parts to apply different styles */}
            <span className="Element-date-day">
              {DateService.getDatePartString(computed.date, { day: 'numeric' })}
            </span>
            <span className="Element-date-month">
              {DateService.getDatePartString(computed.date, { month: 'short' })}
            </span>
          </div>
          <div className="Element-data">
            <div className="Calendar-event-data-top">
              <h3>{rtMessage.content}</h3>
              {/* Showing badges */}
              {badges.map(badge => <span className="badge"
                                          key={badge}
                                          style={{
                                            backgroundColor: COLOR_PALETTE.medium.color,
                                            borderColor: COLOR_PALETTE.veryLight.color
                                          }}>
                                          {badge}
                                        </span>)}
            </div>
            <span className="Calendar-event-sub">
              {computed.printedDate}
            </span>
          </div>
        </div>
      </div>
    </li>;
  };
  
  // sorting events by date. An event can take multiple dates if it lasts more than one day
  const SORTED_EVENTS_BY_ISO_DATE = {};

  // sorting events by relative period of today
  const SORTED_TODAY_EVENTS = {
    past: {},
    now: {},
    future: {}
  };

  // Links an event to a date. Events can be links to multiple dates
  const addEventToDate = (dateString, eventId, event, computed) => {

    // If date does not exist yet, declare it
    if(!SORTED_EVENTS_BY_ISO_DATE[dateString]) {
      SORTED_EVENTS_BY_ISO_DATE[dateString] = {};
    }

    // Adding the event to the date
    SORTED_EVENTS_BY_ISO_DATE[dateString][eventId] = { event, computed };

    // Then adding the event to the relative period of today
    // If the date is today
    if(DateService.isToday(DateService.getDateFromIsoString(dateString))) {

      // computing start and end date
      let eventDate = DateService.getDateFromIsoString(event.metadata.date),
        eventDateEnd = (event.metadata.end ? DateService.getDateFromIsoString(event.metadata.end) : null);
      
      // If event is punctual
      if(!eventDateEnd) {
        // storing the event according to its one and only date
        SORTED_TODAY_EVENTS[DateService.getRelativeDifference(eventDate) < 0 ? 'past' : 'future'][eventId] =  { event, computed };
      }
      else {
        // Otherwise, event has a duration

        // If event is already finished
        if(DateService.getRelativeDifference(eventDateEnd) < 0) {
          SORTED_TODAY_EVENTS['past'][eventId] =  { event, computed };
        }

        // else, if event has not begun yet
        else if(DateService.getRelativeDifference(eventDate) > 0) {
          SORTED_TODAY_EVENTS['future'][eventId] =  { event, computed };
        }

        // Else, event is current
        else {
          SORTED_TODAY_EVENTS['now'][eventId] =  { event, computed };
        }
      }
    }
  };

  // For each rt message received by the componsne
  Object.keys(rt).forEach(rtId => {

    // compute date event
    let eventDate = DateService.getDateFromIsoString(rt[rtId].metadata.date),
      eventDateEnd = (rt[rtId].metadata.end ? DateService.getDateFromIsoString(rt[rtId].metadata.end) : null),
      isPast = false,
      eventResults = [];

    // if event is in the past (event has a duration and end date is past or event is punctual and its start date is passed)
    if((eventDateEnd && DateService.getRelativeDifference(eventDateEnd) < 0) || (!eventDateEnd && DateService.getRelativeDifference(eventDate) < 0)) {

      // if the user selected to hide past events, do not do anything with this
      if(!isShowPastDaysEvents) {
        return;
      }

      // otherwise, continue and mark as past
      isPast = true;
    }

    // COMPUTE PRINTED DATE
    let printedDate = DateService.getTimeString(eventDate), multipleDays = false;

    // If event has a duration
    if(eventDateEnd) {

      // If start date and end date are on the same day, just put the time string
      if((DateService.areDatesTheSameDay(eventDate, eventDateEnd))) {
        printedDate = `${DateService.getDateTimeString(eventDate)} - ${DateService.getTimeString(eventDateEnd)}`;
      }
      else {

        // otherwise, mark the event has on mutliple days and put the date time on all dates
        multipleDays = true;
        printedDate = `${DateService.getDateTimeString(eventDate, false)} - ${DateService.getDateTimeString(eventDateEnd, false)}`;
      }
    }
    
    // ADD EVENT TO DATE

    // This add the first day of the event to a temp array.
    eventResults.push({ isoDate: DateService.getIsoDateString(eventDate),
                        key: rtId,
                        event: rt[rtId],
                        computed: { printedDate, multipleDays, isPast, date: eventDate } });

    // If event has a duration and is on several days, add the other days of the event in the temp array
    if(eventDateEnd && !DateService.areDatesTheSameDay(eventDate, eventDateEnd)) {
      let dateFetch = DateService.cloneDate(eventDate);
      do {
        dateFetch = DateService.addOrRemoveDays(dateFetch, 1);
        eventResults.push({ isoDate: DateService.getIsoDateString(dateFetch),
                            key: rtId,
                            event: rt[rtId],
                            computed: { printedDate, multipleDays, isPast, date: dateFetch } });
      } while (!DateService.areDatesTheSameDay(dateFetch, eventDateEnd));
    }

    // Compute the duration of the event
    let nbDays = eventResults.length;
    eventResults.forEach((val, index) => {
      val.computed.dayNumber = index + 1;
      val.computed.totalDays = nbDays;
    });

    // add all days of the event from temp array calling addEventToDate
    eventResults.map(eventResult => addEventToDate(eventResult.isoDate, eventResult.key, eventResult.event, eventResult.computed));
  });

  // If an event is selected
  let selectedEventDetails = null;
  let selectedEventDetailsPalette = null;
  if(selectedEvent && selectedEvent !== 'ADD' && selectedEvent !== 'EDIT') {

    // getting the event and the palette of the event
    if(SORTED_EVENTS_BY_ISO_DATE[DateService.getIsoDateString(DateService.getDateFromIsoString(rt[selectedEvent].metadata.date))]) {
      selectedEventDetails = SORTED_EVENTS_BY_ISO_DATE[DateService.getIsoDateString(DateService.getDateFromIsoString(rt[selectedEvent].metadata.date))][selectedEvent];
      selectedEventDetailsPalette = ColorService.getPaletteForColor(selectedEventDetails.event.metadata.color);
    }
    else {
      ErrorService.manageError(`Can't load event`);
      setSelectedEvent(null);
    }
  }

  return <div className={'MenuBar-content Calendar ' + (selectedEvent ? 'Calendar--active' : '')}>
    <div className="Calendar-event-list-container">
      <div className="Calendar-header">
        <h2 className="Calendar-header-title">Calendar</h2>

        {/* Add event button */}
        <button className="Calendar-header-add white-button flat" onClick={() => {
          setCurrentEdit(null);
          setSelectedEvent('ADD');
        } }>
          <Icon source="fa" icon={faPlus} />
        </button>

        {/* show past events toggle button */}
        <div className="Calendar-header-showPast">
          <Switch value={isShowPastDaysEvents}
                    onChange={val => {
                      if(!val) {
                        setSelectedEvent(null);
                      }
                      setShowPastDaysEvents(val);
                    }}
                    label="Show past events?" />
        </div>
      </div>

      {/* Event list */}
      <ul className="Calendar-event-list">
        {Object.keys(SORTED_EVENTS_BY_ISO_DATE).sort((date1, date2) => UtilsService.compareFn(date1, date2)).map(isoDate => {

          // If event is today
          if(DateService.isToday(DateService.getDateFromIsoString(isoDate))) {
            return <Fragment key="past">

              {/* Only show past events if user toggled show past events button, even if events are today! */}
              {Object.keys(SORTED_TODAY_EVENTS.past).length ?
                <Fragment>
                  <h4>Today's Past Events</h4>
                  {Object.keys(SORTED_TODAY_EVENTS.past).map(rtId => (
                    <Event key={rtId}
                            rtId={rtId}
                            rtMessage={rt[rtId]}
                            computed={SORTED_TODAY_EVENTS.past[rtId].computed}
                            isActive={selectedEvent === rtId} />
                  ))}
                </Fragment>
              : null}

              {/* Current events for today */}
              {Object.keys(SORTED_TODAY_EVENTS.now).length ?
                <Fragment key="now">
                  <h4>Now</h4>
                  {Object.keys(SORTED_TODAY_EVENTS.now).map(rtId => (
                    <Event key={rtId}
                            rtId={rtId}
                            rtMessage={rt[rtId]}
                            computed={SORTED_TODAY_EVENTS.now[rtId].computed}
                            isActive={selectedEvent === rtId} />
                  ))}
                </Fragment>
              : null}
              
              {/* Future events for today */}
              {Object.keys(SORTED_TODAY_EVENTS.future).length ?
                <Fragment key="future">
                  <h4>Later Today</h4>
                  {Object.keys(SORTED_TODAY_EVENTS.future).map(rtId => (
                    <Event key={rtId}
                            rtId={rtId}
                            rtMessage={rt[rtId]}
                            computed={SORTED_TODAY_EVENTS.future[rtId].computed}
                            isActive={selectedEvent === rtId} />
                  ))}
                </Fragment>
              : <h4>No remaining events for today!</h4>}
              <h4>Future Events</h4>
            </Fragment>;
          }
          else {
            return <Fragment key={isoDate}>
              {/* Other events */}
              {Object.keys(SORTED_EVENTS_BY_ISO_DATE[isoDate]).map(rtId => (
                <Event key={rtId} 
                        rtId={rtId}
                        rtMessage={rt[rtId]}
                        computed={SORTED_EVENTS_BY_ISO_DATE[isoDate][rtId].computed}
                        isActive={selectedEvent === rtId} />
              ))}
            </Fragment>;
          }
        })}
      </ul>
    </div>
    {selectedEvent !== 'ADD' && selectedEvent !== 'EDIT' ? 
      <div className="Calendar-event-details">
        {/* show details of selected events */}
        {!selectedEvent || !selectedEventDetails ? 
          <span className="Calendar-event-no-selection">No event selected!</span>
        : <div className="Calendar-event-selected">
          <div className="Calendar-event-selected-bar">
            <button className="white-button flat Calendar-event-selected-bar-back" onClick={() => setSelectedEvent(null)}>
              <Icon source="fa" icon={faAngleLeft} />
              Back
            </button>
            <button className="white-button flat" onClick={() => {
              setCurrentEdit(selectedEvent);
              setSelectedEvent('EDIT');
            }}>
              <Icon source="fa" icon={faEdit} />
            </button>
          </div>
          <div className="Calendar-event-selected-header" style={{backgroundColor: selectedEventDetailsPalette.medium.color}}>
            <div className="Calendar-event-selected-header-top">
              <h3>
                <Icon source="fa" icon={selectedEventDetails.computed.multipleDays ? faCalendarAlt : faClock} />
                {selectedEventDetails.event.content}
              </h3>
              {selectedEventDetails.computed.isPast ? <span className="badge" style={{
                                                      backgroundColor: selectedEventDetailsPalette.medium.color,
                                                      borderColor: selectedEventDetailsPalette.veryLight.color
                                                      }}>PAST</span> : null}
              {selectedEventDetails.computed.multipleDays ? <span className="badge" style={{
                                                      backgroundColor: selectedEventDetailsPalette.medium.color,
                                                      borderColor: selectedEventDetailsPalette.veryLight.color
                                                      }}>{selectedEventDetails.computed.totalDays} DAYS</span> : null}
            </div>
            <div>
              <Icon source="fa" icon={selectedEventDetails.computed.multipleDays ? faCalendarAlt : faClock} />
              <span>{selectedEventDetails.computed.printedDate}</span>
            </div>
            {selectedEventDetails.event.metadata.location ? 
              <div>
                <Icon source="fa" icon={faMapMarker} />
                <span>{selectedEventDetails.event.metadata.location}</span>
              </div>
            : null}
          </div>
          {selectedEventDetails.event.metadata.description ?
            <div className="Calendar-event-selected-description">
              <h3>
                <Icon source="fa" icon={faBars} />
                Description
              </h3>
              <span>
                {selectedEventDetails.event.metadata.description}
              </span>
            </div>
          : null}
        </div>}
      </div> :
      <div className="Calendar-event-add">
        {/* Show add or edit form */}
        <div className="Calendar-event-selected-bar">
          <button className="white-button flat" onClick={() => setSelectedEvent(null)}>
            <Icon source="fa" icon={faAngleLeft} />
            Back
          </button>
        </div>
        <CalendarEventAdd
          calendarEventId={currentEdit}
          calendarEvent={currentEdit ? rt[currentEdit] : null}
          onFinished={() => {
            setSelectedEvent(null);
            setCurrentEdit(null);
          }} />
      </div>}
  </div>;
};

export default Calendar;
