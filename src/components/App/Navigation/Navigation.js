import React from 'react';
import { NavLink } from 'react-router-dom';
import { faTachometerFast, faHome, faSignIn, faUserPlus, faUserCog, faUsers, faTruck, faFileSignature, faTag, faCompass, faAnalytics, faMapPin, faBuilding, faSearch, faWarehouse } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';
import RightService from './../../../services/right.service';

import { RoleIcons } from './../../../classes/enums/ERole';
import ESettings, { ESettingsDetails } from './../../../classes/enums/ESettings';
import ERights from './../../../classes/enums/ERights';

import Icon from './../../Utils/Icon/Icon';

import './Navigation.scss';

class Navigation extends ComponentSafeUpdate {
  constructor() {
    super();
    this.state = Object.assign({}, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setStateSafe(computedValues, this.computeValues);
      })
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  }

  /**
   * RENDER
   */
  renderActiveRole = () => {
    if (this.state.activeRole == null) {
      return (<NavLink activeClassName="nav--active" to={`/roles`} exact={true}>
        <Icon source="fa" icon={faTag} />
        <span className="nav-title">No active role</span>
      </NavLink>);
    }
    return (<NavLink activeClassName="nav--active" to={`/roles`} exact={true}>
      {RoleIcons[this.state.activeRole.role]}
      <span className="nav-title">
        {UtilsService.capitalize(this.state.activeRole.role)} / {this.state.activeRoleCompany.name}
      </span>
    </NavLink>);
  }

  renderProfilePicture = () => {
    if(!!this.state.employee && this.state.employee.profilePictureUrl) {
      return (<img width="20" height="20" src={this.state.employee.profilePictureUrl} alt={this.state.employee.firstname + ' ' + this.state.employee.lastname + '\'s photo'} />);
    }
    return (<div></div>);
  }

  renderUsername = () => {
    if (!!this.state.employee) {
      return (
        <NavLink activeClassName="nav--active" to={`/profile`} exact={true}>
          <Icon source="fa" icon={faUserCog} />
          <span className="nav-title">
            {this.state.employee.firstname + ' ' + this.state.employee.lastname}
          </span>
        </NavLink>
      );
    }
    return (<NavLink activeClassName="nav--active" to={`/profile`} exact={true}>
      <Icon source="fa" icon={faUserCog} />
    </NavLink>);
  }

  getSettingValue = (settingKey) => {
    if (!this.state.employee) {
      return;
    }
    if (!!this.state.employee.settings && !!this.state.employee.settings[settingKey]) {
      return this.state.employee.settings[settingKey];
    }
    return ESettingsDetails[settingKey].default;
  }

  getNavigationTabs = () => {
    const tabs = {
      [ERights.APP_CAN_USE_GPS]: 
        <NavLink key="gps" activeClassName="nav--active" to={`/gps`}>
          <Icon source="fa" icon={faCompass} />
          <span className="nav-title">GPS</span>
        </NavLink>,
      [ERights.APP_CAN_USE_LOGTRACK]: 
        <NavLink key="logtrack" activeClassName="nav--active" to={`/logtrack`}>
          <Icon source="fa" icon={faMapPin} />
          <span className="nav-title">LogTrack</span>
        </NavLink>,
      [ERights.APP_CAN_USE_WAREHOUSE_MANAGEMENT]: 
        <NavLink key="warehouses" activeClassName="nav--active" to={`/warehouses`}>
          <Icon source="fa" icon={faWarehouse} />
          <span className="nav-title">Warehouses</span>
        </NavLink>,
      [ERights.APP_CAN_USE_EMPLOYEE_MANAGEMENT]: 
        <NavLink key="employees" activeClassName="nav--active" to={`/employees`}>
          <Icon source="fa" icon={faUsers} />
          <span className="nav-title">Employees</span>
        </NavLink>,
      [ERights.APP_CAN_USE_EQUIPMENT_MANAGEMENT]: 
        <NavLink key="equipments" activeClassName="nav--active" to={`/equipments`}>
          <Icon source="fa" icon={faTruck} />
          <span className="nav-title">Equipments</span>
        </NavLink>,
      [ERights.APP_CAN_USE_CONTRACT_MANAGEMENT]: 
        <NavLink key="contracts" activeClassName="nav--active" to={`/contracts`}>
          <Icon source="fa" icon={faFileSignature} />
          <span className="nav-title">Contracts</span>
        </NavLink>,
      [ERights.APP_CAN_USE_ANALYTICS]: 
        <NavLink key="analytics" activeClassName="nav--active" to={`/analytics`}>
          <Icon source="fa" icon={faAnalytics} />
          <span className="nav-title">Analytics</span>
        </NavLink>
    };

    return Object.keys(tabs).filter(key => !!RightService.hasAppRight(key)).map(key => tabs[key]);
  }

  render() {
    return (
      <div className={'Navigation ' + (this.getSettingValue(ESettings.SETTINGS_NAV_COLLAPSED) === 'COLLAPSED' ? '' : 'Navigation--deployed')}>
        {!!this.state.user && 
          <nav>
            <NavLink activeClassName="nav--active" to={`/dashboard`}>
              <Icon source="fa" icon={faTachometerFast} />
              <span className="nav-title">Dashboard</span>
            </NavLink>

            {this.getNavigationTabs().map(tab => tab)}
            <span className="nav-clearfix"></span>
            {!!this.state.activeRole &&
              <NavLink activeClassName="nav--active" to={`/search`}>
                <Icon source="fa" icon={faSearch} />
                <span className="nav-title">Search</span>
              </NavLink>
            }
            {!!this.state.activeRole &&
              <NavLink activeClassName="nav--active" to={`/company/${this.state.activeRole.companyId}`}>
                <Icon source="fa" icon={faBuilding} />
                <span className="nav-title">Company</span>
              </NavLink>
            }
            {this.renderActiveRole()}
            {this.renderUsername()}
          </nav>
        }
        {!this.state.user &&
          <nav>
            <NavLink activeClassName="nav--active" to={`/`} exact={true}>
              <Icon source="fa" icon={faHome} />
              <span className="nav-title">Home</span>
            </NavLink>
            <NavLink activeClassName="nav--active" to={`/signin`}>
              <Icon source="fa" icon={faSignIn} />
              <span className="nav-title">Sign in</span>
            </NavLink>
            <NavLink activeClassName="nav--active" to={`/signup`}>
              <Icon source="fa" icon={faUserPlus} />
              <span className="nav-title">Sign up</span>
            </NavLink>
          </nav>
        }
      </div>
    );
  }
}

export default Navigation;
