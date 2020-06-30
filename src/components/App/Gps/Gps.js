import React, { useState, useEffect, useRef } from 'react';
import { faExclamationTriangle } from '@fortawesome/pro-light-svg-icons';

import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';

import PermissionService from './../../../services/permission.service';
import ErrorService from './../../../services/error.service';

import { v4 as uuid } from 'uuid';

import './Gps.scss';

/**
 * Component: GPS
 * Used mainly by Drivers to drive from point a to point b
 */
const Gps = () => {

  const OBSERVER_KEY = uuid();

  // Current location
  const [currentUserPosition, setCurrentUserPosition] = useState(null);

  // Reference to the map component
  const REF_MAP = useRef(null);

  useEffect(() => {
    // Getting the location on load
    PermissionService.location.askPermission()
      .then(() => PermissionService.location.addLocationObserver(setCurrentUserPosition, OBSERVER_KEY))
      .catch(ErrorService.manageError);
  }, []);

  return (
    <div className="Gps">
      <div className="gps-content">
        {/* the gpsMode options permits to activate related functionalities */}
        <Map ref={REF_MAP} gpsMode />
        <div className="indications">
          <div className="active-logtrack">

          </div>
          <div className="gps-indicator">
            
          </div>
        </div>
        <div className="warnings">
          {currentUserPosition && !currentUserPosition.heading &&
            <span className="heading-problem">
              <Icon source="fa" icon={faExclamationTriangle} />
              This device is not compatible with heading.
            </span>
          }
          {currentUserPosition && currentUserPosition.accuracy &&
            <span className={'accuracy ' + (currentUserPosition.accuracy > 150 ? 'accuracy--problem' : '')}>
              Accuracy: {currentUserPosition.accuracy}m
            </span>
          }
        </div>
      </div>
    </div>
  );
};

export default Gps;
