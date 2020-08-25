import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { faTachometerFast, faHome, faSignIn, faUserPlus, faUserCog, faUsers,
  faTruck, faTag, faCompass, faAnalytics, faMapPin, faBuilding, faSearch,
  faWarehouseAlt, faBars, faTimes, faHandshakeAlt, faSuitcase, faPortrait, faCrown,
  faFolders, faReceipt, faWrench, faClipboardCheck } from '@fortawesome/pro-light-svg-icons';
import { faTag as faTagSolid, faCompass as faCompassSolid, faMapPin as faMapPinSolid,
  faTruck as faTruckSolid, faWarehouseAlt as faWarehouseAltSolid, faAnalytics as faAnalyticsSolid,
  faPortrait as faPortraitSolid, faHandshakeAlt as faHandshakeAltSolid, faUserCog as faUserCogSolid,
  faCrown as faCrownSolid, faUsers as faUsersSolid, faTachometerFast as faTachometerFastSolid,
  faHome as faHomeSolid, faUserPlus as faUserPlusSolid, faSuitcase as faSuitcaseSolid,
  faSignIn as faSignInSolid, faSearch as faSearchSolid, faFolders as faFoldersSolid,
  faBuilding as faBuildingSolid, faReceipt as faReceiptSolid, faWrench as faWrenchSolid,
  faClipboardCheck as faClipboardCheckSolid } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';
import RightService from './../../../services/right.service';
import SettingsService, { ESettings } from './../../../services/settings.service';
import { ERights } from './../../../services/right.service';

import { ERoleDetails } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './Navigation.scss';

/**
 * Custom hook when the route changes, even if it's not a React Router route handling (if a HTML GET parameter was changed for example)
 */
const TrackRouteChange = ({ onChange }) => {
  const LOCATION = useLocation();
  useEffect(onChange, [LOCATION]);
  return null;
};

/**
 * Component: Navigation
 * Main menu of LogTrack
 * Printed on the side on desktop, at the top on mobile
 */
const Navigation = () => {

  // On mobile, the navbar is toggled. This boolean indicated if the menu is opened (fullscreen) or closed (top bar only)
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

  // Render the active role menu item
  const renderActiveRole = () => {
    if(!computed.activeRole || !computed.activeRoleCompany) {
      return (<NavLink activeClassName="nav--active" to={`/roles`} exact>
        <Icon containerclassname="nav-icon--inactive" source="fa" icon={faTag} />
        <Icon containerclassname="nav-icon--active" source="fa" icon={faTagSolid} />
        <span className="nav-title">No active role</span>
      </NavLink>);
    }
    return (<NavLink activeClassName="nav--active" to={`/roles`} exact>
      <Icon containerclassname="nav-icon--inactive" source="fa" icon={ERoleDetails[computed.activeRole.role].icon} />
      <Icon containerclassname="nav-icon--active" source="fa" icon={ERoleDetails[computed.activeRole.role].iconSolid} />
      <span className="nav-title nav-title-role">
        {UtilsService.capitalize(computed.activeRole.role)}<br/>
        {computed.activeRoleCompany.name}
      </span>
    </NavLink>);
  };
  
  // Render the username menu item
  const renderUsername = () => {
    if(computed.employee) {
      return (
        <NavLink activeClassName="nav--active" to={`/profile`} exact>
          <Icon containerclassname="nav-icon--inactive" source="fa" icon={faUserCog} />
          <Icon containerclassname="nav-icon--active" source="fa" icon={faUserCogSolid} />
          <span className="nav-title">
            {computed.employee.firstname + ' ' + computed.employee.lastname}
          </span>
        </NavLink>
      );
    }
    return (<NavLink activeClassName="nav--active" to={`/profile`} exact>
      <Icon containerclassname="nav-icon--inactive" source="fa" icon={faUserCog} />
      <Icon containerclassname="nav-icon--active" source="fa" icon={faUserCogSolid} />
    </NavLink>);
  };

  // Render the active menu part, shown on mobile on top of the screen
  // When tapped, this section does not open the link, it toggles the menu in full screen
  const renderMobileNavigation = () => {
   return <div className="Navigation-mobile" onClick={() => setOpenedOnMobile(!isOpenedOnMobile)}>
     <Icon source="fa" icon={isOpenedOnMobile ? faTimes : faBars} />
   </div>;
  }

  // All other navigation tabs
  // For each, verifying if the current user has the right to access it before printing it
  const getNavigationTabs = () => {
    const TABS = {
      [ERights.APP_CAN_USE_ADMIN_MANAGEMENT]:
        <NavLink key="admin" activeClassName="nav--active" to={`/admin`}>
          <Icon containerclassname="nav-icon--inactive" source="fa" icon={faCrown} />
          <Icon containerclassname="nav-icon--active" source="fa" icon={faCrownSolid} />
          <span className="nav-title">Admin</span>
        </NavLink>,
      [ERights.APP_CAN_USE_GPS]: 
        <NavLink key="gps" activeClassName="nav--active" to={`/gps`}>
          <Icon containerclassname="nav-icon--inactive" source="fa" icon={faCompass} />
          <Icon containerclassname="nav-icon--active" source="fa" icon={faCompassSolid} />
          <span className="nav-title">GPS</span>
        </NavLink>,
      [ERights.APP_CAN_USE_MAINTENANCE]: 
        <NavLink key="maintenance" activeClassName="nav--active" to={`/maintenance`}>
          <Icon containerclassname="nav-icon--inactive" source="fa" icon={faWrench} />
          <Icon containerclassname="nav-icon--active" source="fa" icon={faWrenchSolid} />
          <span className="nav-title">Maintenance</span>
        </NavLink>,
      [ERights.APP_CAN_USE_LOGTRACKS]: 
        <NavLink key="logtracks" activeClassName="nav--active" to={`/logtracks`}>
          <Icon containerclassname="nav-icon--inactive" source="fa" icon={faMapPin} />
          <Icon containerclassname="nav-icon--active" source="fa" icon={faMapPinSolid} />
          <span className="nav-title">LogTracks</span>
        </NavLink>,
      [ERights.APP_CAN_USE_WAREHOUSE_MANAGEMENT]: 
        <NavLink key="warehouses" activeClassName="nav--active" to={`/warehouses`}>
          <Icon containerclassname="nav-icon--inactive" source="fa" icon={faWarehouseAlt} />
          <Icon containerclassname="nav-icon--active" source="fa" icon={faWarehouseAltSolid} />
          <span className="nav-title">Warehouses</span>
        </NavLink>,
      [ERights.APP_CAN_USE_EMPLOYEE_MANAGEMENT]: 
        <NavLink key="employees" activeClassName="nav--active" to={`/employees`}>
          <Icon containerclassname="nav-icon--inactive" source="fa" icon={faUsers} />
          <Icon containerclassname="nav-icon--active" source="fa" icon={faUsersSolid} />
          <span className="nav-title">Employees</span>
        </NavLink>,
      [ERights.APP_CAN_USE_EQUIPMENT_MANAGEMENT]: 
        <NavLink key="equipments" activeClassName="nav--active" to={`/equipments`}>
          <Icon containerclassname="nav-icon--inactive" source="fa" icon={faTruck} />
          <Icon containerclassname="nav-icon--active" source="fa" icon={faTruckSolid} />
          <span className="nav-title">Equipments</span>
        </NavLink>,
      [ERights.APP_CAN_USE_CONTRACT_MANAGEMENT]: 
        <NavLink key="contracts" activeClassName="nav--active" to={`/contracts`}>
          <Icon containerclassname="nav-icon--inactive" source="fa" icon={faHandshakeAlt} />
          <Icon containerclassname="nav-icon--active" source="fa" icon={faHandshakeAltSolid} />
          <span className="nav-title">Contracts</span>
        </NavLink>,
      [ERights.APP_CAN_USE_INVOICE_MANAGEMENT]: 
        <NavLink key="invoices" activeClassName="nav--active" to={`/invoices`}>
          <Icon containerclassname="nav-icon--inactive" source="fa" icon={faReceipt} />
          <Icon containerclassname="nav-icon--active" source="fa" icon={faReceiptSolid} />
          <span className="nav-title">Invoices</span>
        </NavLink>,
      [ERights.APP_CAN_USE_ANALYTICS]: 
        <NavLink key="analytics" activeClassName="nav--active" to={`/analytics`}>
          <Icon containerclassname="nav-icon--inactive" source="fa" icon={faAnalytics} />
          <Icon containerclassname="nav-icon--active" source="fa" icon={faAnalyticsSolid} />
          <span className="nav-title">Analytics</span>
        </NavLink>,
      [ERights.APP_CAN_USE_JOBOFFERS_MANAGEMENT] :
        <NavLink key="joboffers" activeClassName="nav--active" to={`/joboffers`}>
          <Icon containerclassname="nav-icon--inactive" source="fa" icon={faPortrait} />
          <Icon containerclassname="nav-icon--active" source="fa" icon={faPortraitSolid} />
          <span className="nav-title">Job Offers</span>
        </NavLink>,
      [ERights.APP_CAN_USE_FORMS] :
        <NavLink key="forms" activeClassName="nav--active" to={`/forms`}>
          <Icon containerclassname="nav-icon--inactive" source="fa" icon={faClipboardCheck} />
          <Icon containerclassname="nav-icon--active" source="fa" icon={faClipboardCheckSolid} />
          <span className="nav-title">Forms</span>
        </NavLink>
    };

    // Filtering menu items, returning an array with all correponding menu items according to each right
    return Object.keys(TABS).filter(key => RightService.hasAppRight(key)).map(key => TABS[key]);
  };


  return (
    <div className={'Navigation ' 
      + (SettingsService.getSettingValue(ESettings.SETTINGS_NAV_COLLAPSED) === 'COLLAPSED' ? '' : 'Navigation--deployed')
      + (isOpenedOnMobile ? ' Navigation--opened' : '')}>

      {/* Tracking each route change to :
       1: indicating correctly the current menu on topbar on mobile
       2: Closing the fullscreen menu on mobile when the URL changes */}
      <TrackRouteChange onChange={() => setOpenedOnMobile(false)} />
      
      {/* Printing all the menu items that are available if the user is connected */}
      {computed.user && 
        <nav>
          <NavLink activeClassName="nav--active" to={`/dashboard`}>
            <Icon containerclassname="nav-icon--inactive" source="fa" icon={faTachometerFast} />
            <Icon containerclassname="nav-icon--active" source="fa" icon={faTachometerFastSolid} />
            <span className="nav-title">Dashboard</span>
          </NavLink>

          {getNavigationTabs()}
          <span className="nav-clearfix"></span>
          <NavLink activeClassName="nav--active" to={`/search`}>
            <Icon containerclassname="nav-icon--inactive" source="fa" icon={faSearch} />
            <Icon containerclassname="nav-icon--active" source="fa" icon={faSearchSolid} />
            <span className="nav-title">Search</span>
          </NavLink>
          <NavLink activeClassName="nav--active" to={`/jobs`}>
            <Icon containerclassname="nav-icon--inactive" source="fa" icon={faSuitcase} />
            <Icon containerclassname="nav-icon--active" source="fa" icon={faSuitcaseSolid} />
            <span className="nav-title">Jobs</span>
          </NavLink>
          <NavLink activeClassName="nav--active" to={`/files`}>
            <Icon containerclassname="nav-icon--inactive" source="fa" icon={faFolders} />
            <Icon containerclassname="nav-icon--active" source="fa" icon={faFoldersSolid} />
            <span className="nav-title">Files</span>
          </NavLink>
          {computed.activeRole &&
            <NavLink activeClassName="nav--active" to={`/company/${computed.activeRole.companyId}`}>
              <Icon containerclassname="nav-icon--inactive" source="fa" icon={faBuilding} />
              <Icon containerclassname="nav-icon--active" source="fa" icon={faBuildingSolid} />
              <span className="nav-title">Company</span>
            </NavLink>
          }
          {renderActiveRole()}
          {renderUsername()}
          {renderMobileNavigation()}
        </nav>
      }

      {/* Printing all the menu items that are available if the user is not connected */}
      {!computed.user &&
        <nav>
          <NavLink activeClassName="nav--active" to={`/`} exact>
            <Icon containerclassname="nav-icon--inactive" source="fa" icon={faHome} />
            <Icon containerclassname="nav-icon--active" source="fa" icon={faHomeSolid} />
            <span className="nav-title">Home</span>
          </NavLink>
          <NavLink activeClassName="nav--active" to={`/signin`}>
            <Icon containerclassname="nav-icon--inactive" source="fa" icon={faSignIn} />
            <Icon containerclassname="nav-icon--active" source="fa" icon={faSignInSolid} />
            <span className="nav-title">Sign in</span>
          </NavLink>
          <NavLink activeClassName="nav--active" to={`/signup`}>
            <Icon containerclassname="nav-icon--inactive" source="fa" icon={faUserPlus} />
            <Icon containerclassname="nav-icon--active" source="fa" icon={faUserPlusSolid} />
            <span className="nav-title">Sign up</span>
          </NavLink>
          {renderMobileNavigation()}
        </nav>
      }
    </div>
  );
};

export default Navigation;
