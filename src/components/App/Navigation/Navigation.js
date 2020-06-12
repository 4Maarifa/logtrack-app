import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { faTachometerFast, faHome, faSignIn, faUserPlus, faUserCog, faUsers,
  faTruck, faTag, faCompass, faAnalytics, faMapPin, faBuilding, faSearch,
  faWarehouseAlt, faBars, faTimes, faHandshakeAlt, faSuitcase, faPortrait, faCrown } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';
import RightService from './../../../services/right.service';
import SettingsService, { ESettings } from './../../../services/settings.service';
import { ERights } from './../../../services/right.service';

import { ERoleDetails } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './Navigation.scss';

const TrackRouteChange = ({ onChange }) => {
  const LOCATION = useLocation();
  useEffect(() => onChange(), [LOCATION]);
  return null;
};

const Navigation = () => {

  const [isOpenedOnMobile, setOpenedOnMobile] = useState(false);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */ 

  const renderActiveRole = () => {
    if(!computed.activeRole) {
      return (<NavLink activeClassName="nav--active" to={`/roles`} exact>
        <Icon source="fa" icon={faTag} />
        <span className="nav-title">No active role</span>
      </NavLink>);
    }
    return (<NavLink activeClassName="nav--active" to={`/roles`} exact>
      <Icon source="fa" icon={ERoleDetails[computed.activeRole.role].icon} />
      <span className="nav-title nav-title-role">
        {UtilsService.capitalize(computed.activeRole.role)}<br/>
        {computed.activeRoleCompany.name}
      </span>
    </NavLink>);
  };
  
  const renderUsername = () => {
    if(computed.employee) {
      return (
        <NavLink activeClassName="nav--active" to={`/profile`} exact>
          <Icon source="fa" icon={faUserCog} />
          <span className="nav-title">
            {computed.employee.firstname + ' ' + computed.employee.lastname}
          </span>
        </NavLink>
      );
    }
    return (<NavLink activeClassName="nav--active" to={`/profile`} exact>
      <Icon source="fa" icon={faUserCog} />
    </NavLink>);
  };

  const renderMobileNavigation = () => {
   return <div className="Navigation-mobile" onClick={() => setOpenedOnMobile(!isOpenedOnMobile)}>
     <Icon source="fa" icon={isOpenedOnMobile ? faTimes : faBars} />
   </div>;
  }

  const getNavigationTabs = () => {
    const TABS = {
      [ERights.APP_CAN_USE_ADMIN_MANAGEMENT]:
        <NavLink key="admin" activeClassName="nav--active" to={`/admin`}>
          <Icon source="fa" icon={faCrown} />
          <span className="nav-title">Admin</span>
        </NavLink>,
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
          <Icon source="fa" icon={faHandshakeAlt} />
          <span className="nav-title">Contracts</span>
        </NavLink>,
      [ERights.APP_CAN_USE_ANALYTICS]: 
        <NavLink key="analytics" activeClassName="nav--active" to={`/analytics`}>
          <Icon source="fa" icon={faAnalytics} />
          <span className="nav-title">Analytics</span>
        </NavLink>,
      [ERights.APP_CAN_USE_JOBOFFERS_MANAGEMENT] :
        <NavLink key="joboffers" activeClassName="nav--active" to={`/joboffers`}>
          <Icon source="fa" icon={faPortrait} />
          <span className="nav-title">Job Offers</span>
        </NavLink>
    };

    return Object.keys(TABS).filter(key => RightService.hasAppRight(key)).map(key => TABS[key]);
  };

  return (
    <div className={'Navigation ' 
      + (SettingsService.getSettingValue(ESettings.SETTINGS_NAV_COLLAPSED) === 'COLLAPSED' ? '' : 'Navigation--deployed')
      + (isOpenedOnMobile ? ' Navigation--opened' : '')}>

      <TrackRouteChange onChange={() => setOpenedOnMobile(false)} />
      
      {computed.user && 
        <nav>
          <NavLink activeClassName="nav--active" to={`/dashboard`}>
            <Icon source="fa" icon={faTachometerFast} />
            <span className="nav-title">Dashboard</span>
          </NavLink>

          {getNavigationTabs()}
          <span className="nav-clearfix"></span>
          <NavLink activeClassName="nav--active" to={`/search`}>
            <Icon source="fa" icon={faSearch} />
            <span className="nav-title">Search</span>
          </NavLink>
          <NavLink activeClassName="nav--active" to={`/jobs`}>
            <Icon source="fa" icon={faSuitcase} />
            <span className="nav-title">Jobs</span>
          </NavLink>
          {computed.activeRole &&
            <NavLink activeClassName="nav--active" to={`/company/${computed.activeRole.companyId}`}>
              <Icon source="fa" icon={faBuilding} />
              <span className="nav-title">Company</span>
            </NavLink>
          }
          {renderActiveRole()}
          {renderUsername()}
          {renderMobileNavigation()}
        </nav>
      }
      {!computed.user &&
        <nav>
          <NavLink activeClassName="nav--active" to={`/`} exact>
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
          {renderMobileNavigation()}
        </nav>
      }
    </div>
  );
};

export default Navigation;
