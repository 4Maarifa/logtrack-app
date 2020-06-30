import React, { useState, useEffect, Fragment } from 'react';
import { faUser, faRectangleWide, faBars, faMapMarker,
  faArrowAltToRight, faCalendarAlt, faArrowAltFromLeft, faCheck,
  faPalette, faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import DateTimePicker from 'react-datetime-picker';

import DataService from './../../../services/data.service';
import { EPalette, EMediumPaletteDetails } from './../../../services/color.service';
import EmployeeService from './../../../services/entities/employee.service';
import ErrorService from './../../../services/error.service';
import DateService from './../../../services/date.service';
import RT_Service from './../../../services/rt.service';

import Icon from './../../Utils/Icon/Icon';
import Choose from './../../Utils/FormElements/Choose/Choose';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import FormTextarea from './../../Utils/FormElements/FormTextarea/FormTextarea';
import Switch from './../../Utils/FormElements/Switch/Switch';

import RT_userMessage, { ERT_userMessageDetails, ERT_userMessage } from '../../../classes/RT_userMessage';

import { v4 as uuid } from 'uuid';

import './CalendarEventAdd.scss';

/**
 * Component: CalendarEventAdd
 * Form to add or edit calendar events
 * 
 * calendarEventId: calendar event id to edit
 * calendarEvent: calendar event to edit
 * 
 * onFinished: callback on finish
 */
const CalendarEventAdd = ({ calendarEventId: currentCalendarEventId, calendarEvent: currentCalendarEvent, onFinished }) => {

  // Form inputs
  const [title, setTitle] = useState('');
  const [isPunctualEvent, setPunctualEvent] = useState(true);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [location, setLocation] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);

  const [description, setDescription] = useState('');

  // Creator
  const [creator, setCreator] = useState(null);
  const [creatorId, setCreatorId] = useState(null);

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // Form handler
  const handleSubmit = event => {
    event.preventDefault();

    const REVISION = uuid();
    
    // Building metadata
    const RT_METADATA = ERT_userMessageDetails[ERT_userMessage.CALENDAR]
    .buildMetadata(selectedColor,
                    startDateTime ? DateService.getIsoDateString(startDateTime) : null,
                    endDateTime ? DateService.getIsoDateString(endDateTime) : null,
                    description,
                    location);

    // If edit, update current event
    if(currentCalendarEvent) {

      // Build a RT_message with both new form data and current data
      const RT_MESSAGE = new RT_userMessage(
        ERT_userMessage.CALENDAR,
        currentCalendarEvent.creationIsoDate,
        title,
        currentCalendarEvent.creator,
        currentCalendarEvent.users,
        RT_METADATA,
        REVISION
      );

      // Update the RT_message
      RT_Service.user.update(currentCalendarEventId, RT_MESSAGE)
        .then(_ => {
          ErrorService.success('Calendar Event Edited!');

          // Call callback when finished
          onFinished && onFinished();
        })
        .catch(ErrorService.manageError);
    }
    else {
      // Else, add a new one

      // Build a new RT_message with form data and new data
      const RT_MESSAGE = new RT_userMessage(
        ERT_userMessage.CALENDAR,
        DateService.getCurrentIsoDateString(),
        title,
        computed.user.uid,
        { [computed.user.uid]: ERT_userMessageDetails[ERT_userMessage.CALENDAR].buildPublicInfo() },
        RT_METADATA,
        REVISION
      );

      // Create the new RT_MESSAGE
      RT_Service.user.create(RT_MESSAGE)
        .then(_ => {
          ErrorService.success('Calendar Event Created!');

          //call the callback when finished
          onFinished && onFinished();
        })
        .catch(ErrorService.manageError);
    }
  };

  useEffect(() => {
    if(computed.initialized) {

      // On load, if we edit an existing event
      if(currentCalendarEventId && currentCalendarEvent) {

        // setting form inputs
        setTitle(currentCalendarEvent.content);
        setSelectedColor(currentCalendarEvent.metadata.color);
        setStartDateTime(DateService.getDateFromIsoString(currentCalendarEvent.metadata.date));
        setDescription(currentCalendarEvent.metadata.description);
        setLocation(currentCalendarEvent.metadata.location);
  
        if(currentCalendarEvent.metadata.end) {
          setEndDateTime(DateService.getDateFromIsoString(currentCalendarEvent.metadata.end));
          setPunctualEvent(false);
        }
        
        // Get the creator
        EmployeeService.get(currentCalendarEvent.creator)
          .then(employeeDoc => {
            //set creator data
            setCreator(employeeDoc.data());
            setCreatorId(employeeDoc.id);
          })
          .catch(ErrorService.manageError);
      }
      else {
        // else, if we add one, set creator as current user
        setCreatorId(computed.user.uid);
        setCreator(computed.employee);
      }
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);

  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */

  // Build data for Choose component for color selection from ColorService.EPalette
  const POSSIBLE_COLORS = {};
  Object.keys(EPalette).forEach(colorKey => {
    POSSIBLE_COLORS[colorKey] = {
      content: ({ isActive }) => <Fragment>
        <i className="input-color-choice" style={{backgroundColor: EMediumPaletteDetails[colorKey].color}} />
        {isActive ? <Icon source="fa" icon={faCheck} /> : null}
      </Fragment>
    }
  });

  // Set default color
  if(!selectedColor) {
    setSelectedColor(Object.keys(EPalette)[0]);
  }

  return <div className="CalendarEventAdd">
    <h1>{currentCalendarEventId ? 'Edit' : 'Add'} an event</h1>

    {/* CalendarEventAdd form */}
    <form onSubmit={handleSubmit}>
      {/* Title */}
      <FormInput
        value={title}
        inputType="text"
        fieldName="title"
        label={
          <span>
            <Icon source="fa" icon={faRectangleWide} />
            Title
          </span>
        }
        inputRequired
        inputPattern=".{3,}"
        instructions={
          <span>
            The title is required<br/>
            The title must be 3 characters minimum
          </span>
        }
        onValueChange={setTitle} />

      {/* Start Date */}
      <div className="input-container">
        <span className="fake-label">
          <Icon source="fa" icon={faArrowAltFromLeft} />
          Start Date
        </span>
        <DateTimePicker
          onChange={setStartDateTime}
          value={startDateTime}
          clearIcon={null}
          calendarIcon={<Icon source="fa" icon={faCalendarAlt} />}
          minDate={new Date()}
          minDetail="year"
          required
          showLeadingZeros />
      </div>

      {/* Punctual Event ? */}
      <Switch
        value={isPunctualEvent}
        onChange={setPunctualEvent}
        label="Is this event punctual?" />

      {/* End Date */}
      {!isPunctualEvent ? <div className="input-container">
        <span className="fake-label">
          <Icon source="fa" icon={faArrowAltToRight} />
          End Date
        </span>
        <DateTimePicker
          onChange={setEndDateTime}
          value={endDateTime}
          clearIcon={null}
          calendarIcon={<Icon source="fa" icon={faCalendarAlt} />}
          minDate={startDateTime}
          minDetail="year"
          required={!isPunctualEvent}
          showLeadingZeros />
      </div> : null}

      {/* Location */}
      <FormInput
        value={location}
        inputType="text"
        fieldName="location"
        label={
          <span>
            <Icon source="fa" icon={faMapMarker} />
            Location
          </span>
        }
        instructions={
          <span>
            The location is NOT required.
          </span>
        }
        onValueChange={setLocation} />

      {/* Color */}
      <div className="input-color input-container">
        <span className="fake-label">
          <Icon source="fa" icon={faPalette} />
          Color
        </span>
        <Choose
          items={POSSIBLE_COLORS}
          selection={selectedColor}
          fieldName="selectedColor"
          selectionRequired
          onSelectionChange={setSelectedColor} />
        <span className="input-color-info sub">
          <Icon source="fa" icon={faInfoCircle} />
          You can use event's color to sort events or indicate important ones.
        </span>
      </div>

      {/* Description */}
      <FormTextarea
        value={description}
        fieldName="description"
        label={
          <span>
            <Icon source="fa" icon={faBars} />
            Description
          </span>
        }
        instructions={
          <span>
            The description is NOT required.<br/>
            Describe your event details.
          </span>
        }
        onValueChange={setDescription} />

      {/* Creator */}
      <div className="input-container">
        <span className="fake-label">
          <Icon source="fa" icon={faUser} />
          Creator
        </span>
        <PageLink type={PageLinkType.EMPLOYEE} entityId={creatorId} entityData={creator} />
      </div>

      <input type="submit" />
    </form>
  </div>;
};

export default CalendarEventAdd;
