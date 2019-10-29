import React from 'react';
import { NavLink } from 'react-router-dom';
import { faThermometerFull, faMapMarker } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';
import WeatherService from './../../../services/weather.service';
import PermissionService from './../../../services/permission.service';
import SettingsService, { ESettings } from './../../../services/settings.service';

import LogTrack from './../LogTrack/LogTrack';

import Loader from './../../Utils/Loader/Loader';
import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';

import EStat from './../../../classes/enums/EStat';
import EWeatherIcons from './../../../classes/enums/EWeatherIcons';
import { ERole, RoleIcons } from './../../../classes/Role';

import EquipmentImage from './../../../assets/equipment.png';
import EmployeeImage from './../../../assets/employee.png';
import WarehouseImage from './../../../assets/warehouse.png';

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
      warehouseCount: null}, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
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
            .then(location => {
              this.setState({userPosition: location});
              WeatherService.getWeather(location.longitude, location.latitude)
                .then(weather => this.setState({weather: weather}))
                .catch(ErrorService.manageError);
            })
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }

    if(!this.state.activeRole) {return;}
    
    switch(this.state.activeRole.role) {
      case ERole.MANAGER:
        DataService.computed.conputeStat([EStat.equipmentCount, EStat.employeeCount, EStat.warehouseCount], {companyId: this.state.activeRole.companyId})
          .then(statData => {
            if(typeof statData.equipmentCount === 'number') {
              this.setState({equipmentCount: statData.equipmentCount});
            }
            if(typeof statData.employeeCount === 'number') {
              this.setState({employeeCount: statData.employeeCount});
            }
            if(typeof statData.warehouseCount === 'number') {
              this.setState({warehouseCount: statData.warehouseCount});
            }
          })
          .catch(ErrorService.manageError);
        break;
      default: 
        break;
    }
  };

  /**
   * RENDER
   */
  renderRolePart() {
    if(!this.state.activeRole) {return;}

    switch(this.state.activeRole.role) {
      case ERole.MANAGER:
        return <div className="role-container">
          <div className="dash-container">
            <NavLink className="dash dash-33" to={`/warehouses`}>
              <span className="dash-left">
                <img src={WarehouseImage} alt="Warehouse overlay" />
              </span>
              <span className="dash-right dash-bg">
                {typeof this.state.warehouseCount === 'number' && <span className="dash-main">{this.state.warehouseCount}</span>}
                {typeof this.state.warehouseCount !== 'number' && <Loader light={true}></Loader>}
                <span className="dash-title">Warehouses</span>
              </span>
            </NavLink>
            <NavLink className="dash dash-33" to={`/equipments`}>
              <span className="dash-left">
                <img src={EquipmentImage} alt="Equipment overlay" />
              </span>
              <span className="dash-right dash-bg">
                {typeof this.state.equipmentCount === 'number' && <span className="dash-main">{this.state.equipmentCount}</span>}
                {typeof this.state.equipmentCount !== 'number' && <Loader light={true}></Loader>}
                <span className="dash-title">Equipments</span>
              </span>
            </NavLink>
            <NavLink className="dash dash-33" to={`/employees`}>
              <span className="dash-left">
                <img src={EmployeeImage} alt="Employee overlay" />
              </span>
              <span className="dash-right dash-bg">
                {typeof this.state.employeeCount === 'number' && <span className="dash-main">{this.state.employeeCount}</span>}
                {typeof this.state.employeeCount !== 'number' && <Loader light={true}></Loader>}
                <span className="dash-title">Employees</span>
              </span>
            </NavLink>
          </div>
          <div className="role-content">
            <Map></Map>
            <LogTrack></LogTrack>
          </div>
        </div>;
      default:
        return <div></div>;
    }
  }

  render() {
    return (
      <div className="Dashboard">
        {!!this.state.employee && !!this.state.user && <div>
          Welcome back, {this.state.employee.firstname + ' ' + this.state.employee.lastname}!
        </div>}
        <div className="dash-container">
          {!!this.state.activeRole && 
            <NavLink className="dash dash-sm" to={`/roles`}>
              <span className="dash-left dash-bg">
                <span className="dash-text">
                  {RoleIcons[this.state.activeRole.role]}
                  {UtilsService.capitalize(this.state.activeRole.role)}
                </span>
              </span>
              <span className="dash-right">
                <span className="dash-text">
                  <img src={this.state.activeRoleCompany.logoURL} alt={this.state.activeRoleCompany.name + '\'s company'} />
                  <span>{this.state.activeRoleCompany.name}</span>
                </span>
              </span>
            </NavLink>
          }
          {!this.state.activeRole && 
            <NavLink className="dash dash-sm" to={`/roles`}>
              <span className="dash-left dash-bg">
                <span className="dash-text">
                  No active role
                </span>
              </span>
              <span className="dash-right">
                <span className="dash-text">
                  Click to request / change!
                </span>
              </span>
            </NavLink>
          }
          {!!this.state.weather &&
            <div className="dash dash-sm">
              <span className="dash-left">
                <span className="dash-text">
                  <Icon source="fa" icon={faMapMarker} />
                  {this.state.weather.name}
                </span>
              </span>
              <span className="dash-right dash-bg">
                <span className="dash-text">
                  <span>{EWeatherIcons[this.state.weather.icon]}</span>
                  <span className="dash-weather">
                    {this.state.weather.main}<br/>
                    <span>
                      <Icon source="fa" icon={faThermometerFull} />
                      {Math.floor(this.state.weather.temp)}°C
                    </span>
                  </span>
                </span>
              </span>
            </div>
          }
        </div>
        {this.renderRolePart()}
      </div>
    );
  }
}

export default Dashboard;
