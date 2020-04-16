import React from 'react';
import { NavLink } from 'react-router-dom';
import { faCog, faClock, faCalendarAlt, faCommentDots, faMapMarker, faBuilding, faTag, faExclamationTriangle } from '@fortawesome/pro-light-svg-icons';
import { faChevronRight, faTruck, faUsers, faWarehouseAlt, faThermometerHalf } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
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

import './Dashboard.scss';

/**
 * Component: Dashboard
 * Used by everyone to show stats and link to other views
 */
class Dashboard extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({

      userPosition: null,
      weather: null,

      //MANAGER
      equipmentCount: null,
      employeeCount: null,
      warehouseCount: null,
      requestedRolesCount: null,
      chatCount: null
    }, DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues(computedValues => {
        this.setState(computedValues, this.computeValues);
      })
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  computeValues() {
    if(SettingsService.getSettingValue(ESettings.SETTINGS_DASHBOARD_WEATHER) === 'ON') {
      PermissionService.location.askPermission()
        .then(() => {
          PermissionService.location.getLocation()
            .then(userPosition => {
              this.setState({userPosition});
              WeatherService.getWeather(userPosition.longitude, userPosition.latitude)
                .then(weather => this.setState({weather}))
                .catch(ErrorService.manageError);
            })
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }

    if(!this.state.activeRole || !this.state.user || !this.state.user.uid) { return; }
    
    DataService.computed.conputeStat([EStat.equipmentCount, EStat.employeeCount, EStat.warehouseCount, EStat.chatCount, EStat.requestedRolesCount], {
      companyId: this.state.activeRole.companyId,
      userId: this.state.user.uid
    })
      .then(statData => {
        let newState = {};
        if(typeof statData.equipmentCount === 'number') {
          newState['equipmentCount'] = statData.equipmentCount;
        }
        if(typeof statData.employeeCount === 'number') {
          newState['employeeCount'] = statData.employeeCount;
        }
        if(typeof statData.warehouseCount === 'number') {
          newState['warehouseCount'] = statData.warehouseCount;
        }
        if(typeof statData.requestedRolesCount === 'number') {
          newState['requestedRolesCount'] = statData.requestedRolesCount;
        }
        if(typeof statData.chatCount === 'number') {
          newState['chatCount'] = statData.chatCount;
        }

        this.setState(newState);
      })
      .catch(ErrorService.manageError);
  };

  /**
   * RENDER
   */
  renderRolePart() {
    return <div className="role-container">
      <div className="line">
        {!this.state.activeRole && <div className="card card company-link">
          <NavLink to={`/roles`}>
            <h2>No active role</h2>
            <span>Click here to select or request a role.</span>
          </NavLink>
          <Icon containerclassname="icon-overlay" source="fa" icon={faBuilding} />
        </div>}
        {!!this.state.activeRole && <div className="card card company-link">
          <NavLink to={`/roles`}>
            <h2>
              {RoleDetails[this.state.activeRole.role].icon}
              {RoleDetails[this.state.activeRole.role].name}
            </h2>
            <span>Click here to change or request a role.</span>
          </NavLink>
          <h1 className="company-details-name-container">
            <PageLink type={PageLinkType.COMPANY} entityId={this.state.activeRole.companyId} entityData={this.state.activeRoleCompany} />
          </h1>
          <div className="company-details-stats-container">
            <div className="company-details-stat">
              <span className="company-details-stat-icon">
                <Icon source="fa" icon={faWarehouseAlt} />
              </span>
              <span className="company-details-stat-content">
                {!!this.state.warehouseCount ? <span>{this.state.warehouseCount} Warehouses</span> : <span>Warehouses</span>}
                {this.state.activeRole.role === ERole.MANAGER && <NavLink className="manage-link" to={`/warehouses`}>
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
                {!!this.state.employeeCount ? <span>{this.state.employeeCount} Employees</span> : <span>Employees</span>}
                {this.state.activeRole.role === ERole.MANAGER && <NavLink className="manage-link" to={`/employees`}>
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
                {!!this.state.equipmentCount ? <span>{this.state.equipmentCount} Equipments</span> : <span>Equipments</span>}
                {this.state.activeRole.role === ERole.MANAGER && <NavLink className="manage-link" to={`/equipments`}>
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
          {!!this.state.chatCount && <span>{this.state.chatCount} active conversations</span>}
          <Icon containerclassname="icon-overlay" source="fa" icon={faCommentDots} />
        </NavLink>
        {!!this.state.activeRole && this.state.activeRole.role === ERole.MANAGER && <NavLink className="card card-inverse card-w alerts" to={`/`}>
          <h2>Alerts</h2>
          <span></span>
          <Icon containerclassname="icon-overlay" source="fa" icon={faExclamationTriangle} />
        </NavLink>}
        {!!this.state.activeRole && this.state.activeRole.role === ERole.MANAGER && <NavLink className="card card-w roles-link desktop-only" to={`/roles`}>
          <h2>Requested Roles</h2>
          {!!this.state.requestedRolesCount && <span>{this.state.requestedRolesCount} to confirm</span>}
          <Icon containerclassname="icon-overlay" source="fa" icon={faTag} />
        </NavLink>}
        <div className="card card-w hour desktop-only">
          <h2>{DateService.getDateString(new Date(), false)}</h2>
          <span>{DateService.getTimeString(new Date())}</span>
          <Icon containerclassname="icon-overlay" source="fa" icon={faClock} />
        </div>
        {!!this.state.weather && <div className="card card-w weather desktop-only">
          <h2>Weather</h2>
          <span>
            {this.state.weather.main}<br/>
            <Icon source="fa" icon={faThermometerHalf} />
            {Math.floor(this.state.weather.temp)}°C
          </span>
          <Icon containerclassname="icon-overlay" source="fa" icon={EWeatherIcons[this.state.weather.icon]} />
        </div>}
          {!!this.state.weather && <div className="card card-w location desktop-only">
          <h2>Location</h2>
          <span>
            {this.state.weather.name}
          </span>
          <Icon containerclassname="icon-overlay" source="fa" icon={faMapMarker} />
        </div>}
      </div>
      <div className="line line-small mobile-only">
        {!!this.state.activeRole && this.state.activeRole.role === ERole.MANAGER && <NavLink className="card card-w roles-link" to={`/roles`}>
          <h2>Requested Roles</h2>
          {!!this.state.requestedRolesCount && <span>{this.state.requestedRolesCount} to confirm</span>}
          <Icon containerclassname="icon-overlay" source="fa" icon={faTag} />
        </NavLink>}
        <div className="card card-w hour">
          <h2>{DateService.getDateString(new Date(), false)}</h2>
          <span>{DateService.getTimeString(new Date())}</span>
          <Icon containerclassname="icon-overlay" source="fa" icon={faClock} />
        </div>
        {!!this.state.weather && <div className="card card-w weather">
          <h2>Weather</h2>
          <span>
            {this.state.weather.main}<br/>
            <Icon source="fa" icon={faThermometerHalf} />
            {Math.floor(this.state.weather.temp)}°C
          </span>
          <Icon containerclassname="icon-overlay" source="fa" icon={EWeatherIcons[this.state.weather.icon]} />
        </div>}
          {!!this.state.weather && <div className="card card-w location">
          <h2>Location</h2>
          <span>
            {this.state.weather.name}
          </span>
          <Icon containerclassname="icon-overlay" source="fa" icon={faMapMarker} />
        </div>}
      </div>
      <div className="line line-big">
        <div className="card map">
          <Map></Map>
        </div>
        <div className={'card card-stick logtrack ' + (!!this.state.activeRole && this.state.activeRole.role !== ERole.MANAGER ? 'logtrack-with-button' : '')}>
          <LogTrack></LogTrack>
          <Icon containerclassname="icon-overlay" source="fa" icon={faCalendarAlt} />
        </div>
      </div>
    </div>;
  }

  render() {
    return (
      <div className="Dashboard">
        {!!this.state.employee && !!this.state.user && <h1>
          Welcome back, <PageLink type={PageLinkType.EMPLOYEE} entityId={this.state.user.uid} entityData={this.state.employee} />!
        </h1>}
        {this.renderRolePart()}
      </div>
    );
  }
}

export default Dashboard;
