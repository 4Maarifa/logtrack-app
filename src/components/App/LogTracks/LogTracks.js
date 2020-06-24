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

const LOGTRACKS_MODE = {
  MANAGE: 'MANAGE',
  USER: 'USER'
};

const LogTracks = ({ isEmbed }) => {

  const LOGTRACKS_MODE_DETAILS = {
    [LOGTRACKS_MODE.MANAGE]: {
      roles: [ERole.MANAGER],
      render: () => <LogTracksForManagers isEmbed={isEmbed} />
    },
    [LOGTRACKS_MODE.USER]: {
      roles: [ERole.DRIVER, ERole.MECHANIC],
      render: () => {
        return <LogTracksForUsers isEmbed={isEmbed} />;
      }
    }
  };
  
  const OBSERVER_KEY = uuid();
  const [mode, setMode] = useState(null);
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    if(computed.initialized && computed.activeRole) {
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
  if(!computed.activeRole) {
    if(isEmbed) {
      return <div className="LogTracks">
        <span className="no-role-warning">Please activate a role to view your LogTracks!</span>
        <Icon containerclassname="icon-overlay" source="fa" icon={faMapPin} />
      </div>;
    }
    else {
      ErrorService.error('You need an active role to access this.');
      return <Redirect to={`/dashboard`} />;
    }
  }
  if(!mode) {
    return <Loader />;
  }

  return LOGTRACKS_MODE_DETAILS[mode].render();
};

export default LogTracks;
