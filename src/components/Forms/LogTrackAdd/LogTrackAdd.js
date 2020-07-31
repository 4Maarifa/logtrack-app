import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faUser, faBuilding, faSearch, faHandPointer, faCrosshairs } from '@fortawesome/pro-light-svg-icons';

import DataService, { migratePrototype } from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import ColorService from './../../../services/color.service';
import DateService from './../../../services/date.service';
import LogTrackService from './../../../services/entities/logtrack.service';
import EmployeeService from './../../../services/entities/employee.service';

import { ERole } from './../../../classes/Role';
import LogTrack, { ELogTrackCategory, ELogTrackCategoryDetails, ELogTrackActivityDetails, 
  ELogTrackTrackersDetails, ELogTrackTrackerAvailability, ELogTrackActivity, ELogTrackPunctuality } from './../../../classes/LogTrack';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import Choose from './../../Utils/FormElements/Choose/Choose';
import Checkbox from './../../Utils/FormElements/Checkbox/Checkbox';

import { v4 as uuid } from 'uuid';

import './LogTrackAdd.scss';

/**
 * Component: LogTrackAdd
 * Standalone form to add new logtracks (no edit is permitted)
 */
const LogTrackAdd = () => {

  // TODO: LogTrack equipments
  // Concerned equipments by logtrack
  /*const [companyEquipments, setCompanyEquipments] = useState({});*/
  
  // selected category of logtrack, one of enum ELogTrackCategory
  const [selectedCategory, setSelectedCategory] = useState(null);

  // selected activity of logtrack, one of enum ELogTrackActivity and child of selectedCategory
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  // Trackers: selection from ELocTrackTrackers
  const [possibleTrackers, setPossibleTrackers] = useState([]);
  const [selectedTrackers, setSelectedTrackers] = useState([]);
  
  // Is this logtrack punctual?
  // In that case, Logtrack has no duration (stratdate = enddate)
  // Punctual logtracks happen during another logtrack, that stays active afterwards
  // Punctuality can either be chosen by user, or, for some activities, are mandatory punctual or not punctual.
  const [isPunctual, setPunctual] = useState(false);
  
  // creator data
  const [creatorId, setCreatorId] = useState(null);
  const [creator, setCreator] = useState(null);

  // Company owner data
  const [companyId, setCompanyId] = useState(null);
  const [company, setCompany] = useState(null);

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // Handle selection for LogTrackCategory, LogTrackActivity and LogTrackTrackers selection
  const handleSelection = (value, fieldName) => {
    if(fieldName === 'selectedLtActivity') {
      setSelectedActivity(value ? value : '');
    }
    if(fieldName === 'selectedLtCategory') {
      setSelectedCategory(value ? value : '');
      setSelectedActivity('');
    }
    if(fieldName === 'selectedTrackers') {
      setSelectedTrackers(value);
    }
  };

  // Print input form for LogTrackActivity and LogTrackCategory
  const renderActivityType = () => {
    const LT_CATEGORIES = {}, LT_ACTIVITIES = {};

    // build Choose component compatible data for categories
    Object.keys(ELogTrackCategory).forEach(categoryKey => {
      LT_CATEGORIES[categoryKey] = {
        content: ({ isActive }) => <Fragment>
          <Icon source="fa" icon={isActive ? ELogTrackCategoryDetails[categoryKey].iconSolid : ELogTrackCategoryDetails[categoryKey].icon} />
          {ELogTrackCategoryDetails[categoryKey].text}
        </Fragment>,
        color: ColorService.getPaletteForColor(ELogTrackCategoryDetails[categoryKey].color).medium.color
      };
    });

    // If a category is selected, build Choose component compatible data from childs of this category
    if(selectedCategory) {
      ELogTrackCategoryDetails[selectedCategory].activities.forEach(activityKey => {
        LT_ACTIVITIES[activityKey] = {
          content: ({ isActive }) => <Fragment>
            <Icon source="fa" icon={isActive ? ELogTrackActivityDetails[activityKey].iconSolid : ELogTrackActivityDetails[activityKey].icon} additional={ELogTrackActivityDetails[activityKey].additionalIcon} />
            {ELogTrackActivityDetails[activityKey].text}
          </Fragment>,
          color: ColorService.getPaletteForColor(ELogTrackCategoryDetails[selectedCategory].color).medium.color
        };
      });
    }

    // return choose component for category, as well as a choose component for activities if a category is selected
    return <Fragment>
      <div className="input-container">
        <span className="fake-label">
          <Icon source="fa" icon={faSearch} />
          Category
        </span>
        <Choose
          selection={selectedCategory}
          items={LT_CATEGORIES}
          fieldName="selectedLtCategory"
          onSelectionChange={handleSelection} />
      </div>

      {selectedCategory &&
        <div className="input-container">
          <span className="fake-label">
            <Icon source="fa" icon={faHandPointer} />
            Activity
          </span>
          <Choose
            selection={selectedActivity}
            items={LT_ACTIVITIES}
            fieldName="selectedLtActivity"
            onSelectionChange={handleSelection} />
        </div>}
    </Fragment>;

  };

  // reset form
  const resetForm = () => {
    //reset selection for activity and category
    setSelectedActivity(null);
    setSelectedCategory(null);

    // reset punctual switch to default value
    setPunctual(false);

    // set selected trackers to empty
    setSelectedTrackers([]);
  };

  // LogTrack add Form handler
  const handleSubmit = e => {
    e.preventDefault();

    if(!selectedActivity) {
      ErrorService.error('Please select your activity!');
      return;
    }

    // Compute the start date for the new event, that will be the end date of the current event,
    // if the new event is not punctual
    // If the event is punctual, this date will be its start date as well as its end date
    const ISO_DATE_CHANGE = DateService.getCurrentIsoDateString();
    const TIMESTAMP_CHANGE = DateService.getCurrentTimeStampNumber();

    // Create the new logtrack instance with form data
    const LOGTRACK_TO_ADD = new LogTrack(
      ELogTrackActivity[selectedActivity],
      computed.user.uid,
      computed.activeRole.companyId,
      ISO_DATE_CHANGE,
      ISO_DATE_CHANGE,
      TIMESTAMP_CHANGE,
      isPunctual ? ISO_DATE_CHANGE : null,
      isPunctual ? TIMESTAMP_CHANGE : null,
      isPunctual,
      [],
      computed.user.uid
    );

    // Push data to DB
    LogTrackService.create(LOGTRACK_TO_ADD).then(logTrackDoc => {
      if(!isPunctual) {
        // if event is not punctual,
        new Promise((resolve, reject) => {
          if(!computed.employee.currentLogTrack) {
            resolve();
          }
          else {
            // and if user has a current logtrack,
            // update the current logtrack to put the endDate
            LogTrackService.updateField(Object.keys(computed.employee.currentLogTrack)[0], {
              endIsoDate: ISO_DATE_CHANGE,
              endTimestamp: TIMESTAMP_CHANGE
            }).then(resolve).catch(e => ErrorService.manageErrorThenReject(e, reject));
          }
        }).then(() => {
          // And update the currentLogtrack field of the current user to the newly created logtrack
          EmployeeService.updateField(computed.user.uid, {
            currentLogTrack: {[logTrackDoc.id]: migratePrototype(LOGTRACK_TO_ADD)}
          })
          .then(() => {
            // then, reload current user, inform user and reset form
            DataService.computed.notifyChanges().then(() => {
              ErrorService.success('LogTrack updated!');
              resetForm();
            });
          })
        }).catch(ErrorService.manageError);
      }
      else {
        // If event is punctual, everything's done!
        // Just inform user, and reset form
        ErrorService.success('LogTrack updated!');
        resetForm();
      }
    }).catch(ErrorService.manageError);
  };

  useEffect(() => {
    if(selectedActivity) {
      // once the activity is selected, load compatible trackers for this activity,
      // select the ones that are mandatory (from ELogTrackCategoryDetails)
      setPossibleTrackers(ELogTrackCategoryDetails[selectedCategory].trackers);
      setSelectedTrackers(ELogTrackCategoryDetails[selectedCategory].trackers.filter(trackerKey =>
        ELogTrackTrackersDetails[trackerKey].mandatory));

      // as well as set punctuality according to the ones that are compatible with this activity (from ELogTrackCategoryDetails)
      setPunctual(ELogTrackCategoryDetails[selectedCategory].punctuality === ELogTrackPunctuality.MUST);
    }
    else {
      // If no activity is selected, reset tracker selection
      setSelectedTrackers([]);
      setPossibleTrackers([]);
    }
  }, [selectedActivity]);

  useEffect(() => {
    if (computed.initialized) {

      // set creator data
      setCreatorId(computed.user.uid);
      setCreator(computed.employee);

      // set company data
      setCompanyId(computed.activeRole.companyId);
      setCompany(computed.activeRoleCompany);

      // TODO: LogTrack Equipments
      // Fetch company available equipments
      /*EquipmentService.getAllForCompanyId(computed.activeRole.companyId)
        .then(setCompanyEquipments)
        .catch(ErrorService.manageError);*/
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  if(computed.activeRole.role !== ERole.DRIVER &&
      computed.activeRole.role !== ERole.MECHANIC) {

    // If the role is not comptible with logtracking, return to dashboard
    ErrorService.error('LogTrack add is reserved for Drivers and Mechanics!');
    return <Redirect to={`/dashboard`} />;
  }

  // Concert tracker data to Choose component compatible data
  const TRACKER_DETAILS = {};
  possibleTrackers.forEach(trackerKey => {
    TRACKER_DETAILS[trackerKey] = {
      content: () => <Fragment>
        <span>
          <Icon source="fa" icon={ELogTrackTrackersDetails[trackerKey].icon} />
          {ELogTrackTrackersDetails[trackerKey].name}
        </span>
        <span className="sub">
          {ELogTrackTrackersDetails[trackerKey].description}
        </span>
      </Fragment>,

      // disabled unavailable trackers
      disabled: ELogTrackTrackersDetails[trackerKey].availability === ELogTrackTrackerAvailability.NOT_AVAILABLE || 
                ELogTrackTrackersDetails[trackerKey].mandatory
    };
  });

  return <div className="LogTrackAdd">
    <h1>Add a LogTrack</h1>

    {/* LogTrack add form */}
    <form onSubmit={handleSubmit}>

      {/* LT Activity */}
      {renderActivityType()}

      {/* TRACKERS */}
      {selectedActivity ? <div className="input-container">
        <span className="fake-label">
          <Icon source="fa" icon={faCrosshairs} />
          Trackers
        </span>
        <Choose
          selection={selectedTrackers}
          items={TRACKER_DETAILS}
          fieldName="selectedTrackers"
          onSelectionChange={handleSelection}
          isVertical
          multiple />
      </div> : <span>Select an activity before choosing associated trackers.</span>}

      {/* IS PUNCTUAL */}
      {selectedActivity ? <Checkbox
        value={isPunctual}
        fieldName="punctuality"
        inputName="punctuality"
        inputDisabled={ELogTrackCategoryDetails[selectedCategory].punctuality !== ELogTrackPunctuality.CAN_BE}
        label={<span>
          Punctuality<br/>
          <span className="sub">If checked, your current LogTrack will not be replaced by this one.<br/>
          This LogTrack will be added as a step of your current LogTrack.</span>
        </span>}
        onValueChange={setPunctual} /> : null}

      {/* COMPANY */}
      <div className="input-container">
        <span className="fake-label">
          <Icon source="fa" icon={faBuilding} />
          Company
        </span>
        <PageLink type={PageLinkType.COMPANY} entityId={companyId} entityData={company} />
      </div>

      {/* CREATOR */}
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

export default LogTrackAdd;
