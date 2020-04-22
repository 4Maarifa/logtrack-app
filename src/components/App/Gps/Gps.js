import React, { useState, useEffect, useRef } from 'react';
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';

import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';

import PermissionService from './../../../services/permission.service';
import ErrorService from './../../../services/error.service';

import { v4 as uuid } from 'uuid';

import './Gps.scss';

const Gps = () => {

  const observerKey = uuid();

  const [currentUserPosition, setCurrentUserPosition] = useState(null);
  const map = useRef(null);

  useEffect(() => {
    PermissionService.location.askPermission()
      .then(() => PermissionService.location.addLocationObserver(setCurrentUserPosition, observerKey))
      .catch(ErrorService.manageError);
  }, []);

  return (
    <div className="Gps">
      <div className="gps-content">
        <Map ref={map} gpsMode />
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
