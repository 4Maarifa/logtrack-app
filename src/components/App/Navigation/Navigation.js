import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { faTachometerFast, faHome, faSignIn, faUserPlus, faUserCog, faUsers, faTruck, faFileSignature, faTag, faCompass, faAnalytics, faMapPin, faBuilding, faSearch, faWarehouseAlt, faComments, faBars, faTimes } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';
import RightService from './../../../services/right.service';
import SettingsService, { ESettings } from './../../../services/settings.service';
import { ERights } from './../../../services/right.service';

import { RoleDetails } from './../../../classes/Role';

import './Navigation.scss';

const TrackRouteChange = props => {
  const location = useLocation();

  useEffect(() => props.onChange(), [location]);

  return null;
}

class Navigation extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      openedOnMobile: false
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

  /**
   * RENDER
   */
  renderActiveRole = () => {
    if(this.state.activeRole == null) {
      return (<NavLink activeClassName="nav--active" to={`/roles`} exact={true}>
        <Icon source="fa" icon={faTag} />
        <span className="nav-title">No active role</span>
      </NavLink>);
    }
    return (<NavLink activeClassName="nav--active" to={`/roles`} exact={true}>
      {RoleDetails[this.state.activeRole.role].icon}
      <span className="nav-title nav-title-role">
        {UtilsService.capitalize(this.state.activeRole.role)}<br/>
        {this.state.activeRoleCompany.name}
      </span>
    </NavLink>);
  };
  
  renderUsername = () => {
    if(!!this.state.employee) {
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
  };

  renderMobileNavigation = () => {
   return <div className="Navigation-mobile" onClick={() => this.setState({openedOnMobile: !this.state.openedOnMobile})}>
     <Icon source="fa" icon={this.state.openedOnMobile ? faTimes : faBars} />
   </div>;
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
          <Icon source="fa" icon={faWarehouseAlt} />
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
  };

  render() {
    return (
      <div className={'Navigation ' 
        + (SettingsService.getSettingValue(ESettings.SETTINGS_NAV_COLLAPSED) === 'COLLAPSED' ? '' : 'Navigation--deployed')
        + (!!this.state.openedOnMobile ? ' Navigation--opened' : '')}>

        <TrackRouteChange onChange={() => this.setState({openedOnMobile: false})} />
        
        {!!this.state.user && 
          <nav>
            <NavLink activeClassName="nav--active" to={`/dashboard`}>
              <Icon source="fa" icon={faTachometerFast} />
              <span className="nav-title">Dashboard</span>
            </NavLink>

            {this.getNavigationTabs()}
            <span className="nav-clearfix"></span>
            <NavLink activeClassName="nav--active" to={`/chat`}>
              <Icon source="fa" icon={faComments} />
              <span className="nav-title">Chat</span>
            </NavLink>
            <NavLink activeClassName="nav--active" to={`/search`}>
              <Icon source="fa" icon={faSearch} />
              <span className="nav-title">Search</span>
            </NavLink>
            {!!this.state.activeRole &&
              <NavLink activeClassName="nav--active" to={`/company/${this.state.activeRole.companyId}`}>
                <Icon source="fa" icon={faBuilding} />
                <span className="nav-title">Company</span>
              </NavLink>
            }
            {this.renderActiveRole()}
            {this.renderUsername()}
            {this.renderMobileNavigation()}
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
            {this.renderMobileNavigation()}
          </nav>
        }
      </div>
    );
  }
}

export default Navigation;
