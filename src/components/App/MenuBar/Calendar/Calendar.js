import React, { useState, Fragment } from 'react';
import { faCalendarAlt, faClock, faPlus, faAngleLeft, faMapMarker, faBars, faEdit } from '@fortawesome/pro-solid-svg-icons';

import { EVeryLightPaletteDetails, EMediumPaletteDetails } from './../../../../services/color.service';
import DateService from './../../../../services/date.service';
import UtilsService from './../../../../services/utils.service';
import ErrorService from './../../../../services/error.service';

import Icon from './../../../Utils/Icon/Icon';
import Switch from './../../../Utils/FormElements/Switch/Switch';

import CalendarEventAdd from './../../../Forms/CalendarEventAdd/CalendarEventAdd';

import './Calendar.scss';

const Calendar = ({ rt }) => {

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isShowPastDaysEvents, setShowPastDaysEvents] = useState(false);

  const [currentEdit, setCurrentEdit] = useState(null);

  /**
   * RENDER
   */
  const Event = ({ rtKey, rtMessage, computed, isActive }) => {

    let badges = [];

    if(computed.isPast) { badges.push('PAST'); }
    if(computed.totalDays > 1) { badges.push(`DAY ${computed.dayNumber}/${computed.totalDays}`); }

    return <li key={rtKey}
              className={'Calendar-event Element Element--tile Element-small Element--full-width' + (isActive ? ' Calendar-event--active' : '')}
              style={{backgroundColor: isActive ? EMediumPaletteDetails[rtMessage.metadata.color].color : EVeryLightPaletteDetails[rtMessage.metadata.color].color}}
              onClick={() => setSelectedEvent(selectedEvent === rtKey ? null : rtKey)}>

      <div className="Element-content">
        <div className="Element-base">
          <div className="Element-date Element-date--small">
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
              {badges.map(badge => <span className="badge"
                                                  key={badge}
                                                  style={{
                                                    backgroundColor: EMediumPaletteDetails[rtMessage.metadata.color].color,
                                                    borderColor: EVeryLightPaletteDetails[rtMessage.metadata.color].color
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
  
  const sortedEventsByIsoDate = {};
  const sortedTodayEvents = {
    past: {},
    now: {},
    future: {}
  };

  const addEventToDate = (dateString, eventKey, event, computed) => {
    if(!sortedEventsByIsoDate[dateString]) {
      sortedEventsByIsoDate[dateString] = {};
    }
    sortedEventsByIsoDate[dateString][eventKey] = { event, computed };

    if(DateService.isToday(DateService.getDateFromIsoString(dateString))) {
      let eventDate = DateService.getDateFromIsoString(event.metadata.date),
        eventDateEnd = (event.metadata.end ? DateService.getDateFromIsoString(event.metadata.end) : null);
      
      if(!eventDateEnd) {
        sortedTodayEvents[DateService.getRelativeDifference(eventDate) < 0 ? 'past' : 'future'][eventKey] =  { event, computed };
      }
      else {
        if(DateService.getRelativeDifference(eventDateEnd) < 0) {
          sortedTodayEvents['past'][eventKey] =  { event, computed };
        }
        else if(DateService.getRelativeDifference(eventDate) > 0) {
          sortedTodayEvents['future'][eventKey] =  { event, computed };
        }
        else {
          sortedTodayEvents['now'][eventKey] =  { event, computed };
        }
      }
    }
  };

  Object.keys(rt).forEach(rtKey => {
    let eventDate = DateService.getDateFromIsoString(rt[rtKey].metadata.date),
      eventDateEnd = (rt[rtKey].metadata.end ? DateService.getDateFromIsoString(rt[rtKey].metadata.end) : null),
      isPast = false,
      eventResults = [];

    if((eventDateEnd && DateService.getRelativeDifference(eventDateEnd) < 0) || (!eventDateEnd && DateService.getRelativeDifference(eventDate) < 0)) {
      if(!isShowPastDaysEvents) {
        return;
      }
      isPast = true;
    }

    // COMPUTE PRINTED DATE
    let printedDate = DateService.getTimeString(eventDate), multipleDays = false;

    if(eventDateEnd) {
      if((DateService.areDatesTheSameDay(eventDate, eventDateEnd))) {
        printedDate = `${DateService.getTimeString(eventDate)} - ${DateService.getTimeString(eventDateEnd)}`;
      }
      else {
        multipleDays = true;
        printedDate = `${DateService.getDateTimeString(eventDate, false)} - ${DateService.getDateTimeString(eventDateEnd, false)}`;
      }
    }
    
    // ADD EVENT TO DATE
    eventResults.push({ isoDate: DateService.getIsoDateString(eventDate),
                        key: rtKey,
                        event: rt[rtKey],
                        computed: { printedDate, multipleDays, isPast, date: eventDate } });

    if(eventDateEnd && !DateService.areDatesTheSameDay(eventDate, eventDateEnd)) {
      let dateFetch = DateService.cloneDate(eventDate);
      do {
        dateFetch = DateService.addOrRemoveDays(dateFetch, 1);
        eventResults.push({ isoDate: DateService.getIsoDateString(dateFetch),
                            key: rtKey,
                            event: rt[rtKey],
                            computed: { printedDate, multipleDays, isPast, date: dateFetch } });
      } while (!DateService.areDatesTheSameDay(dateFetch, eventDateEnd));
    }

    let nbDays = eventResults.length;
    eventResults.forEach((val, index) => {
      val.computed.dayNumber = index + 1;
      val.computed.totalDays = nbDays;
    });

    eventResults.map(eventResult => addEventToDate(eventResult.isoDate, eventResult.key, eventResult.event, eventResult.computed));
  });

  let selectedEventDetails = null;
  if(selectedEvent && selectedEvent !== 'ADD' && selectedEvent !== 'EDIT') {
    if(sortedEventsByIsoDate[DateService.getIsoDateString(DateService.getDateFromIsoString(rt[selectedEvent].metadata.date))]) {
      selectedEventDetails = sortedEventsByIsoDate[DateService.getIsoDateString(DateService.getDateFromIsoString(rt[selectedEvent].metadata.date))][selectedEvent];
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
        <button className="Calendar-header-add white-button flat" onClick={() => {
          setCurrentEdit(null);
          setSelectedEvent('ADD');
        } }>
          <Icon source="fa" icon={faPlus} />
        </button>
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
      <ul className="Calendar-event-list">
        {Object.keys(sortedEventsByIsoDate).sort((date1, date2) => UtilsService.compareFn(date1, date2)).map(isoDate => {
          if(DateService.isToday(DateService.getDateFromIsoString(isoDate))) {
            return <Fragment key="past">
              {Object.keys(sortedTodayEvents.past).length ?
                <Fragment>
                  <h4>Today's Past Events</h4>
                  {Object.keys(sortedTodayEvents.past).map(rtKey => (
                    <Event key={rtKey}
                            rtKey={rtKey}
                            rtMessage={rt[rtKey]}
                            computed={sortedTodayEvents.past[rtKey].computed}
                            isActive={selectedEvent === rtKey} />
                  ))}
                </Fragment>
              : null}

              {Object.keys(sortedTodayEvents.now).length ?
                <Fragment key="now">
                  <h4>Now</h4>
                  {Object.keys(sortedTodayEvents.now).map(rtKey => (
                    <Event key={rtKey}
                            rtKey={rtKey}
                            rtMessage={rt[rtKey]}
                            computed={sortedTodayEvents.now[rtKey].computed}
                            isActive={selectedEvent === rtKey} />
                  ))}
                </Fragment>
              : null}
              
              {Object.keys(sortedTodayEvents.future).length ?
                <Fragment key="future">
                  <h4>Later Today</h4>
                  {Object.keys(sortedTodayEvents.future).map(rtKey => (
                    <Event key={rtKey}
                            rtKey={rtKey}
                            rtMessage={rt[rtKey]}
                            computed={sortedTodayEvents.future[rtKey].computed}
                            isActive={selectedEvent === rtKey} />
                  ))}
                </Fragment>
              : <h4>No remaining events for today!</h4>}
              <h4>Future Events</h4>
            </Fragment>;
          }
          else {
            return <Fragment key={isoDate}>
              {Object.keys(sortedEventsByIsoDate[isoDate]).map(rtKey => (
                <Event key={rtKey} 
                        rtKey={rtKey}
                        rtMessage={rt[rtKey]}
                        computed={sortedEventsByIsoDate[isoDate][rtKey].computed}
                        isActive={selectedEvent === rtKey} />
              ))}
            </Fragment>;
          }
        })}
      </ul>
    </div>
    {selectedEvent !== 'ADD' && selectedEvent !== 'EDIT' ? <div className="Calendar-event-details">
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
        <div className="Calendar-event-selected-header" style={{backgroundColor: EMediumPaletteDetails[selectedEventDetails.event.metadata.color].color}}>
          <div className="Calendar-event-selected-header-top">
            <h3>
              <Icon source="fa" icon={selectedEventDetails.computed.multipleDays ? faCalendarAlt : faClock} />
              {selectedEventDetails.event.content}
            </h3>
            {selectedEventDetails.computed.isPast ? <span className="badge" style={{
                                                    backgroundColor: EMediumPaletteDetails[selectedEventDetails.event.metadata.color].color,
                                                    borderColor: EVeryLightPaletteDetails[selectedEventDetails.event.metadata.color].color
                                                    }}>PAST</span> : null}
            {selectedEventDetails.computed.multipleDays ? <span className="badge" style={{
                                                    backgroundColor: EMediumPaletteDetails[selectedEventDetails.event.metadata.color].color,
                                                    borderColor: EVeryLightPaletteDetails[selectedEventDetails.event.metadata.color].color
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
