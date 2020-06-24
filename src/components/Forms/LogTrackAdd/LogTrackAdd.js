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
import LogTrack, { LogTrackCategory, LogTrackCategoryDetails, LogTrackActivityDetails, LogTrackTrackersDetails, LogTrackTrackerAvailability, LogTrackActivity, LogTrackPunctuality } from './../../../classes/LogTrack';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import Choose from './../../Utils/FormElements/Choose/Choose';
import Checkbox from './../../Utils/FormElements/Checkbox/Checkbox';

import { v4 as uuid } from 'uuid';

import './LogTrackAdd.scss';

const LogTrackAdd = () => {

  const [creatorId, setCreatorId] = useState(null);
  const [creator, setCreator] = useState(null);

  const [companyId, setCompanyId] = useState(null);
  const [company, setCompany] = useState(null);
  /*const [companyEquipments, setCompanyEquipments] = useState({});*/

  /*const [equipmentModels, setEquipmentModels] = useState({});*/

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const [possibleTrackers, setPossibleTrackers] = useState([]);
  const [selectedTrackers, setSelectedTrackers] = useState([]);

  const [isPunctual, setPunctual] = useState(false);

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

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

  const renderActivityType = () => {
    const LT_CATEGORIES = {}, LT_ACTIVITIES = {};

    Object.keys(LogTrackCategory).forEach(categoryKey => {
      LT_CATEGORIES[categoryKey] = {
        content: ({ isActive }) => <Fragment>
          <Icon source="fa" icon={isActive ? LogTrackCategoryDetails[categoryKey].iconSolid : LogTrackCategoryDetails[categoryKey].icon} />
          {LogTrackCategoryDetails[categoryKey].text}
        </Fragment>,
        color: ColorService.getPaletteForColor(LogTrackCategoryDetails[categoryKey].color).medium.color
      };
    });

    if(selectedCategory) {
      LogTrackCategoryDetails[selectedCategory].activities.forEach(activityKey => {
        LT_ACTIVITIES[activityKey] = {
          content: ({ isActive }) => <Fragment>
            <Icon source="fa" icon={isActive ? LogTrackActivityDetails[activityKey].iconSolid : LogTrackActivityDetails[activityKey].icon} additional={LogTrackActivityDetails[activityKey].additionalIcon} />
            {LogTrackActivityDetails[activityKey].text}
          </Fragment>,
          color: ColorService.getPaletteForColor(LogTrackCategoryDetails[selectedCategory].color).medium.color
        };
      });
    }

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

  const resetForm = () => {
    setSelectedActivity(null);
    setSelectedCategory(null);
    setPunctual(false);
    setSelectedTrackers([]);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if(!selectedActivity) {
      ErrorService.error('Please select your activity!');
      return;
    }

    const ISO_DATE_CHANGE = DateService.getCurrentIsoDateString();
    const TIMESTAMP_CHANGE = DateService.getCurrentTimeStampNumber();

    const LOGTRACK_TO_ADD = new LogTrack(
      LogTrackActivity[selectedActivity],
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

    LogTrackService.create(LOGTRACK_TO_ADD).then(logTrackDoc => {
      if(!isPunctual) {
        new Promise((resolve, reject) => {
          if(!computed.employee.currentLogTrack) {
            resolve();
          }
          else {
            LogTrackService.updateField(Object.keys(computed.employee.currentLogTrack)[0], {
              endIsoDate: ISO_DATE_CHANGE,
              endTimestamp: TIMESTAMP_CHANGE
            }).then(resolve).catch(e => ErrorService.manageErrorThenReject(e, reject));
          }
        }).then(() => {
          EmployeeService.updateField(computed.user.uid, {
            currentLogTrack: {[logTrackDoc.id]: migratePrototype(LOGTRACK_TO_ADD)}
          })
          .then(() => {
            DataService.computed.notifyChanges().then(() => {
              ErrorService.success('LogTrack updated!');
              resetForm();
            });
          })
        }).catch(ErrorService.manageError);
      }
      else {
        ErrorService.success('LogTrack updated!');
        resetForm();
      }
    }).catch(ErrorService.manageError);
  };

  useEffect(() => {
    if(selectedActivity) {
      setPossibleTrackers(LogTrackCategoryDetails[selectedCategory].trackers);
      setSelectedTrackers(LogTrackCategoryDetails[selectedCategory].trackers.filter(trackerKey =>
        LogTrackTrackersDetails[trackerKey].mandatory));

      setPunctual(LogTrackCategoryDetails[selectedCategory].punctuality === LogTrackPunctuality.MUST);
    }
    else {
      setSelectedTrackers([]);
      setPossibleTrackers([]);
    }
  }, [selectedActivity]);

  useEffect(() => {
    if (computed.initialized) {
      setCreatorId(computed.user.uid);
      setCreator(computed.employee);
      setCompanyId(computed.activeRole.companyId);
      setCompany(computed.activeRoleCompany);

      /*EquipmentService.getAllForCompanyId(computed.activeRole.companyId)
        .then(setCompanyEquipments)
        .catch(ErrorService.manageError);*/
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);

    /*EquipmentModelService.list()
        .then(setEquipmentModels)
        .catch(ErrorService.manageError);*/

    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  if(computed.activeRole.role !== ERole.DRIVER &&
      computed.activeRole.role !== ERole.MECHANIC) {

    ErrorService.error('LogTrack add is reserved for Drivers and Mechanics!');
    return <Redirect to={`/dashboard`} />;
  }

  const TRACKER_DETAILS = {};
  possibleTrackers.forEach(trackerKey => {
    TRACKER_DETAILS[trackerKey] = {
      content: () => <Fragment>
        <span>
          <Icon source="fa" icon={LogTrackTrackersDetails[trackerKey].icon} />
          {LogTrackTrackersDetails[trackerKey].name}
        </span>
        <span className="sub">
          {LogTrackTrackersDetails[trackerKey].description}
        </span>
      </Fragment>,
      disabled: LogTrackTrackersDetails[trackerKey].availability === LogTrackTrackerAvailability.NOT_AVAILABLE || 
                LogTrackTrackersDetails[trackerKey].mandatory
    };
  });

  return <div className="LogTrackAdd">
    <h1>Add a LogTrack</h1>
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
        inputDisabled={LogTrackCategoryDetails[selectedCategory].punctuality !== LogTrackPunctuality.CAN_BE}
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
