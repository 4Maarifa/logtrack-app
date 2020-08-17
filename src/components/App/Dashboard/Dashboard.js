import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { faCog, faClock, faMapMarker, faBuilding, faTag, faChevronRight,
  faTruck, faUsers, faWarehouseAlt, faThermometerHalf, faBullhorn } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import WeatherService, { EWeatherIcons } from './../../../services/weather.service';
import PermissionService from './../../../services/permission.service';
import SettingsService, { ESettings } from './../../../services/settings.service';
import ModalService from './../../../services/modal.service';
import DateService from './../../../services/date.service';

import { ERole, ERoleDetails } from './../../../classes/Role';

import LogTracks from './../LogTracks/LogTracks';
import Map from './../../Utils/Map/Map';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import { v4 as uuid } from 'uuid';

import './Dashboard.scss';
import News from '../News/News';

/**
 * Component: Dashboard
 * Used by everyone to show stats and link to other views
 */
const Dashboard = () => {

  // Prevents most of React updates if component is not mounted anymore
  const [isMounted, setMounted] = useState(false);

  // Save weather
  const [weather, setWeather] = useState(null);

  // Save realtime date
  const [datetime, setDateTime] = useState({date: null, time: null});

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    // If the user selected to view the weather on his dashboard
    if(computed.initialized && SettingsService.getSettingValue(ESettings.SETTINGS_DASHBOARD_WEATHER) === 'ON') {
      // Loading location permission as well as weather when location is loaded
      PermissionService.location.askPermission()
        .then(() => {
          PermissionService.location.getLocation()
            .then(userPosition => {
              WeatherService.getWeather(userPosition.longitude, userPosition.latitude)
                .then(weather => isMounted && setWeather(weather))
                .catch(ErrorService.manageError);
            })
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
  }, [computed]);

  useEffect(() => {
    setMounted(true);
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);

    // Triggering DateService observers to observe real-time date & time
    DateService.addObserver(() => setDateTime({
      date: DateService.getDateString(new Date(), false, false),
      time: DateService.getTimeString(new Date())
    }), OBSERVER_KEY);
    return () => {
      setMounted(false);
      DataService.computed.unobserveComputedValues(OBSERVER_KEY);
      DateService.removeObserver(OBSERVER_KEY);
    }
  }, []);
  
  if(!computed.initialized) { return null; }


  /**
   * RENDER
   */
  // Render dashboard according to role
  const renderRolePart = () => {
    return <div className="role-container">
      <div className="line">
        {!computed.activeRole && <div className="card company-link">
          <NavLink to={`/roles`}>
            <h2>No active role</h2>
            <span>Click here to select or request a role.</span>
          </NavLink>
          <Icon containerclassname="icon-overlay" source="fa" icon={faBuilding} />
        </div>}
        {computed.activeRole && <div className="card card company-link">
          <NavLink className="change-role-link white-link" to={`/roles`}>
            <h2>
              <Icon source="fa" icon={ERoleDetails[computed.activeRole.role].icon} />
              {ERoleDetails[computed.activeRole.role].name}
            </h2>
            <span>Click here to change or request a role.</span>
          </NavLink>
          <h1 className="company-details-name-container">
            <PageLink type={PageLinkType.COMPANY} entityId={computed.activeRole.companyId} entityData={computed.activeRoleCompany} />
          </h1>
          <div className="company-details-stats-container">
            <div className="company-details-stat">
              <span className="company-details-stat-icon">
                <Icon source="fa" icon={faWarehouseAlt} />
              </span>
              <span className="company-details-stat-content">
                <span>Warehouses</span>
                {computed.activeRole.role === ERole.MANAGER && <NavLink className="manage-link" to={`/warehouses`}>
                  Manage
                  <Icon source="fa" icon={faChevronRight} />
                </NavLink>}
              </span>
            </div>
            <div className="company-details-stat">
              <span className="company-details-stat-icon">
                <Icon source="fa" icon={faUsers} />
              </span>
              <span className="company-details-stat-content">
                <span>Employees</span>
                {computed.activeRole.role === ERole.MANAGER && <NavLink className="manage-link" to={`/employees`}>
                  Manage
                  <Icon source="fa" icon={faChevronRight} />
                </NavLink>}
              </span>
            </div>
            <div className="company-details-stat">
              <span className="company-details-stat-icon">
                <Icon source="fa" icon={faTruck} />
              </span>
              <span className="company-details-stat-content">
                <span>Equipments</span>
                {computed.activeRole.role === ERole.MANAGER && <NavLink className="manage-link" to={`/equipments`}>
                  Manage
                  <Icon source="fa" icon={faChevronRight} />
                </NavLink>}
              </span>
            </div>
          </div>
          <Icon containerclassname="icon-overlay" source="fa" icon={faBuilding} />
        </div>}
      </div>
      <div className="line line-small">
        <NavLink className="card card-inverse card-w profile-link" to={`/profile`}>
          <h2>Profile and Settings</h2>
          <Icon containerclassname="icon-overlay" source="fa" icon={faCog} />
        </NavLink>
        {computed.activeRole && computed.activeRole.role === ERole.MANAGER && <NavLink className="card card-w roles-link desktop-only" to={`/roles`}>
          <h2>Requested Roles</h2>
          <span>Roles to confirm</span>
          <Icon containerclassname="icon-overlay" source="fa" icon={faTag} />
        </NavLink>}
        <div className="card card-w hour desktop-only">
          <h2>{datetime.date}</h2>
          <span>{datetime.time}</span>
          <Icon containerclassname="icon-overlay" source="fa" icon={faClock} />
        </div>
        {weather && <div className="card card-w weather desktop-only">
          <h2>Weather</h2>
          <span>
            {weather.main}<br/>
            <Icon source="fa" icon={faThermometerHalf} />
            {Math.floor(weather.temp)}°C
          </span>
          <Icon containerclassname="icon-overlay" source="fa" icon={EWeatherIcons[weather.icon]} />
        </div>}
          {weather && <div className="card card-w location desktop-only">
          <h2>Location</h2>
          <span>
            {weather.name}
          </span>
          <Icon containerclassname="icon-overlay" source="fa" icon={faMapMarker} />
        </div>}
      </div>
      <div className="line line-small mobile-only">
        {computed.activeRole && computed.activeRole.role === ERole.MANAGER && <NavLink className="card card-w roles-link" to={`/roles`}>
          <h2>Requested Roles</h2>
          <span>Roles to confirm</span>
          <Icon containerclassname="icon-overlay" source="fa" icon={faTag} />
        </NavLink>}
        <div className="card card-w hour">
          <h2>{datetime.date}</h2>
          <span>{datetime.time}</span>
          <Icon containerclassname="icon-overlay" source="fa" icon={faClock} />
        </div>
        {weather && <div className="card card-w weather">
          <h2>Weather</h2>
          <span>
            {weather.main}<br/>
            <Icon source="fa" icon={faThermometerHalf} />
            {Math.floor(weather.temp)}°C
          </span>
          <Icon containerclassname="icon-overlay" source="fa" icon={EWeatherIcons[weather.icon]} />
        </div>}
          {weather && <div className="card card-w location">
          <h2>Location</h2>
          <span>
            {weather.name}
          </span>
          <Icon containerclassname="icon-overlay" source="fa" icon={faMapMarker} />
        </div>}
      </div>
      <div className="line line-big">
        <div className="card map">
          <Map />
        </div>
        <div className={'card logtracks ' + (computed.activeRole && computed.activeRole.role !== ERole.MANAGER ? 'logtracks-with-button' : '')}>
          <LogTracks isEmbed />
        </div>
      </div>
    </div>;
  };

  return (
    <div className="Dashboard">
      <button className="Dashboard-news" onClick={() => {
        ModalService.showModal('News', <News />, { actions: [] });
      }}>
        <Icon source="fa" icon={faBullhorn} />
      </button>
      <h1>Welcome back, <PageLink type={PageLinkType.EMPLOYEE} entityId={computed.user.uid} entityData={computed.employee} />!</h1>
      {renderRolePart()}
    </div>
  );
};

export default Dashboard;
