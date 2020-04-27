import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { faCog, faClock, faCommentDots, faMapMarker, faBuilding, faTag, faMapPin } from '@fortawesome/pro-light-svg-icons';
import { faChevronRight, faTruck, faUsers, faWarehouseAlt, faThermometerHalf } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import WeatherService, { EWeatherIcons } from './../../../services/weather.service';
import PermissionService from './../../../services/permission.service';
import SettingsService, { ESettings } from './../../../services/settings.service';
import DateService from './../../../services/date.service';

import EStat from './../../../classes/enums/EStat';
import { ERole, RoleDetails } from './../../../classes/Role';

import LogTrack from './../LogTrack/LogTrack';
import Map from './../../Utils/Map/Map';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import { v4 as uuid } from 'uuid';

import './Dashboard.scss';

/**
 * Component: Dashboard
 * Used by everyone to show stats and link to other views
 */
const Dashboard = () => {

  const [isMounted, setMounted] = useState(false);

  const [weather, setWeather] = useState(null);

  const [chatCount, setChatCount] = useState(null);

  const [datetime, setDateTime] = useState({date: null, time: null});

  // MANAGER
  const [equipmentCount, setEquipmentCount] = useState(null);
  const [employeeCount, setEmployeeCount] = useState(null);
  const [warehouseCount, setWarehouseCount] = useState(null);
  const [requestedRolesCount, setRequestedRolesCount] = useState(null);

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeValues = () => {
    if(SettingsService.getSettingValue(ESettings.SETTINGS_DASHBOARD_WEATHER) === 'ON') {
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

    if(!computed.activeRole || !computed.user || !computed.user.uid) { return; }
    
    DataService.computed.conputeStat([EStat.equipmentCount, EStat.employeeCount, EStat.warehouseCount, EStat.chatCount, EStat.requestedRolesCount], {
      companyId: computed.activeRole.companyId,
      userId: computed.user.uid
    }).then(statData => {
        if(typeof statData.equipmentCount === 'number') {
          isMounted && setEquipmentCount(statData.equipmentCount);
        }
        if(typeof statData.employeeCount === 'number') {
          isMounted && setEmployeeCount(statData.employeeCount);
        }
        if(typeof statData.warehouseCount === 'number') {
          isMounted && setWarehouseCount(statData.warehouseCount);
        }
        if(typeof statData.requestedRolesCount === 'number') {
          isMounted && setRequestedRolesCount(statData.requestedRolesCount);
        }
        if(typeof statData.chatCount === 'number') {
          isMounted && setChatCount(statData.chatCount);
        }
      })
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    if(computed.initialized) {
      computeValues();
    }
  }, [computed]);

  useEffect(() => {
    setMounted(true);
    DataService.computed.observeComputedValues(setComputed, observerKey);
    DateService.addObserver(() => setDateTime({
      date: DateService.getDateString(new Date(), false),
      time: DateService.getTimeString(new Date())
    }), observerKey);
    return () => {
      setMounted(false);
      DataService.computed.unobserveComputedValues(observerKey);
      DateService.removeObserver(observerKey);
    }
  }, []);
  
  if(!computed.initialized) { return null; }


  /**
   * RENDER
   */
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
              <Icon source="fa" icon={RoleDetails[computed.activeRole.role].icon} />
              {RoleDetails[computed.activeRole.role].name}
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
                {warehouseCount ? <span className="badge badge-inverse">{warehouseCount}</span> : null}
              </span>
              <span className="company-details-stat-content">
                {warehouseCount ? <span>{warehouseCount} Warehouses</span> : <span>Warehouses</span>}
                {computed.activeRole.role === ERole.MANAGER && <NavLink className="manage-link" to={`/warehouses`}>
                  Manage
                  <Icon source="fa" icon={faChevronRight} />
                </NavLink>}
              </span>
            </div>
            <div className="company-details-stat">
              <span className="company-details-stat-icon">
                <Icon source="fa" icon={faUsers} />
                {employeeCount ? <span className="badge badge-inverse">{employeeCount}</span> : null}
              </span>
              <span className="company-details-stat-content">
                {employeeCount ? <span>{employeeCount} Employees</span> : <span>Employees</span>}
                {computed.activeRole.role === ERole.MANAGER && <NavLink className="manage-link" to={`/employees`}>
                  Manage
                  <Icon source="fa" icon={faChevronRight} />
                </NavLink>}
              </span>
            </div>
            <div className="company-details-stat">
              <span className="company-details-stat-icon">
                <Icon source="fa" icon={faTruck} />
                {equipmentCount ? <span className="badge badge-inverse">{equipmentCount}</span> : null}
              </span>
              <span className="company-details-stat-content">
                {equipmentCount ? <span>{equipmentCount} Equipments</span> : <span>Equipments</span>}
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
        <NavLink className="card chat" to={`/chat`}>
          <h2>Chat</h2>
          {chatCount && <span>{chatCount} active conversations</span>}
          <Icon containerclassname="icon-overlay" source="fa" icon={faCommentDots} />
        </NavLink>
        {computed.activeRole && computed.activeRole.role === ERole.MANAGER && <NavLink className="card card-w roles-link desktop-only" to={`/roles`}>
          <h2>Requested Roles</h2>
          {requestedRolesCount && <span>{requestedRolesCount} to confirm</span>}
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
          {requestedRolesCount && <span>{requestedRolesCount} to confirm</span>}
          <Icon containerclassname="icon-overlay" source="fa" icon={faTag} />
        </NavLink>}
        <div className="card card-w hour">
          <h2>{DateService.getDateString(new Date(), false)}</h2>
          <span>{DateService.getTimeString(new Date())}</span>
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
        <div className={'card card-stick logtrack ' + (computed.activeRole && computed.activeRole.role !== ERole.MANAGER ? 'logtrack-with-button' : '')}>
          <LogTrack />
          <Icon containerclassname="icon-overlay" source="fa" icon={faMapPin} />
        </div>
      </div>
    </div>;
  };

  return (
    <div className="Dashboard">
      {computed.employee && computed.user && <h1>
        Welcome back, <PageLink type={PageLinkType.EMPLOYEE} entityId={computed.user.uid} entityData={computed.employee} />!
      </h1>}
      {renderRolePart()}
    </div>
  );
};

export default Dashboard;
