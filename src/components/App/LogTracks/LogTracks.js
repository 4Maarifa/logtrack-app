import React, { useState, useEffect } from 'react';
import { faMapPin } from '@fortawesome/pro-light-svg-icons';
import { Redirect } from 'react-router-dom';

import Loader from './../../Utils/Loader/Loader';
import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';

import { ERole } from './../../../classes/Role';

import LogTracksForManagers from './pages/LogTracksForManagers';
import LogTracksForUsers from './pages/LogTracksForUsers';

import { v4 as uuid } from 'uuid';

import './LogTracks.scss';

/**
 * Enum: LOGTRACKS_MODE
 * Tells the mode of the component
 */
const LOGTRACKS_MODE = {
  MANAGE: 'MANAGE',
  USER: 'USER'
};

/**
 * Enum: LOGTRACKS_MODE_DETAILS
 * Details of the enum LOGTRACKS_MODE
 * 
 * roles: [ERole] | Roles that trigger a certain mode
 * render: function | Render the LogTracks component body according to its mode
 */
const LOGTRACKS_MODE_DETAILS = {
  [LOGTRACKS_MODE.MANAGE]: {
    roles: [ERole.MANAGER],
    render: ({ isEmbed }) => <LogTracksForManagers isEmbed={isEmbed} />
  },
  [LOGTRACKS_MODE.USER]: {
    roles: [ERole.DRIVER, ERole.MECHANIC],
    render: ({ isEmbed }) => {
      return <LogTracksForUsers isEmbed={isEmbed} />;
    }
  }
};


/**
 * component: LogTracks
 * Used by managers to list company's past logtracks
 * Used by users to list their past logtracks, as well as modify the current one
 * 
 * isEmbed: tells if the component is part of another one or not
 *  If that's the case, we only show the table of logtracks
 */
const LogTracks = ({ isEmbed }) => {
  
  // Current mode of the component (LOGTRACKS_MODE)
  const [mode, setMode] = useState(null);

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    if(computed.initialized && computed.activeRole) {
      // Setting the appropriate mode accoring to the current role
      Object.keys(LOGTRACKS_MODE).forEach(mode => {
        if(LOGTRACKS_MODE_DETAILS[mode].roles.includes(computed.activeRole.role)) {
          setMode(mode);
        }
      });
    }
  }, [computed.initialized, computed.activeRole]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  // If current user has no role
  if(!computed.activeRole) {
    if(isEmbed) {
      // If the component is embed, only show a message that tells him that no data could be loaded due to this
      return <div className="LogTracks">
        <span className="no-role-warning">Please activate a role to view your LogTracks!</span>
        <Icon containerclassname="icon-overlay" source="fa" icon={faMapPin} />
      </div>;
    }
    else {
      // Otherwise, aggressively change page to dashboard
      ErrorService.error('You need an active role to access this.');
      return <Redirect to={`/dashboard`} />;
    }
  }

  // Loading
  if(!mode) {
    return <Loader />;
  }

  // Rendering the component according to its current mode
  return LOGTRACKS_MODE_DETAILS[mode].render({ isEmbed });
};

export default LogTracks;
