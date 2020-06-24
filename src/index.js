import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import 'transportation-font/dist/transportation-font.css';

// COMPONENTS
import Specs from './components/Utils/Specs/Specs';

import Modal from './components/Utils/Modal/Modal';

import Admin from './components/App/Admin/Admin';

import Dashboard from './components/App/Dashboard/Dashboard';
import Splash from './components/App/Splash/Splash';
import Navigation from './components/App/Navigation/Navigation';
import MenuBar from './components/App/MenuBar/MenuBar';

import SignIn from './components/Auth/SignIn/SignIn';
import SignUp from './components/Auth/SignUp/SignUp';
import SignOut from './components/Auth/SignOut/SignOut';
import ForgottenPassword from './components/Auth/ForgottenPassword/ForgottenPassword';
import AuthHandler from './components/Auth/AuthHandler/AuthHandler';

import Profile from './components/App/Profile/Profile';

import CompanyAdd from './components/Forms/CompanyAdd/CompanyAdd';
import CompanyPage from './components/Pages/CompanyPage/CompanyPage';

import Employees from './components/App/Employees/Employees';
import EmployeePage from './components/Pages/EmployeePage/EmployeePage';

import Jobs from './components/App/Jobs/Jobs';
import JobOfferPage from './components/Pages/JobOfferPage/JobOfferPage';
import JobOffers from './components/App/JobOffers/JobOffers';
import JobOfferAdd from './components/Forms/JobOfferAdd/JobOfferAdd';

import Roles from './components/App/Roles/Roles';
import RoleAdd from './components/Forms/RoleAdd/RoleAdd';
import RoleOffer from './components/Forms/RoleOffer/RoleOffer';

import Equipments from './components/App/Equipments/Equipments';
import EquipmentAdd from './components/Forms/EquipmentAdd/EquipmentAdd';
import EquipmentPage from './components/Pages/EquipmentPage/EquipmentPage';
import EquipmentModelAdd from './components/Forms/EquipmentModelAdd/EquipmentModelAdd';

import Contracts from './components/App/Contracts/Contracts';
import ContractPage from './components/Pages/ContractPage/ContractPage';
import ContractAdd from './components/Forms/ContractAdd/ContractAdd';

import Invoices from './components/App/Invoices/Invoices';

import Warehouses from './components/App/Warehouses/Warehouses';
import WarehouseAdd from './components/Forms/WarehouseAdd/WarehouseAdd';
import WarehousePage from './components/Pages/WarehousePage/WarehousePage';

import Gps from './components/App/Gps/Gps';

import Maintenance from './components/App/Maintenance/Maintenance';

import LogTracks from './components/App/LogTracks/LogTracks';
import LogTrackAdd from './components/Forms/LogTrackAdd/LogTrackAdd';

import Analytics from './components/App/Analytics/Analytics';

import Search from './components/App/Search/Search';

import Files from './components/App/Files/Files';


// SERVICES
import FirebaseService from './services/firebase.service';
import DataService from './services/data.service';
import RT_Service from './services/rt.service';
import ResizeService from './services/resize.service';
import SettingsService, { ESettings } from './services/settings.service';
import ColorService from './services/color.service';

import { ERole } from './classes/Role';

import { v4 as uuid } from 'uuid';

import './index.scss';

// Private route
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        FirebaseService.isUserConnected()
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} />
);

// Role-limited Route
const RoleLimitedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        FirebaseService.isUserConnected()
        ? (
            (DataService.computed.activeRole && rest.roles.includes(DataService.computed.activeRole.role))
            ? <Component {...props} />
            : <Redirect to='dashboard' />
        )
        : <Redirect to='/signin' />
    )} />
);

const styleOverride = () => {
    if(SettingsService.getSettingValue(ESettings.SETTINGS_CUSTOM_COLORS) === 'BASIC' || 
        !DataService.computed.activeRoleCompany || !DataService.computed.activeRoleCompany.color) {
        
        return null;
    }
    return <style>
        {`:root {
            --theme: ${DataService.computed.activeRoleCompany.color} !important;
            --theme-light: ${
                ColorService.addOpacityToRGB(
                    ColorService.convertHEXtoRGB(
                        ColorService.lightenDarkenColor(DataService.computed.activeRoleCompany.color, 30)
                    ), '.2'
                )
            } !important;
        }`}
    </style>;
};

const renderApp = () => {
    ReactDOM.render(
        <Router>
            <div className={'app-container ' + (SettingsService.getSettingValue(ESettings.SETTINGS_FULL_PAGE_LAYOUT) === 'FULL' ? 'app-container--full' : '')}>
                <Navigation />
                <MenuBar />
                <div className="page_content">
                    <Route exact path="/" component={Splash} />
                    <Route exact path="/terms" render={props => <Splash {...props} page='terms' />} />
                    <Route exact path="/credits" render={props => <Splash {...props} page='credits' />} />
                    <Route exact path="/pricing" render={props => <Splash {...props} page='pricing' />} />
                    <Route exact path="/contact" render={props => <Splash {...props} page='contact' />} />
                    <Route exact path="/changelog" render={props => <Splash {...props} page='changelog' />} />
                    <Route exact path="/faq" render={props => <Splash {...props} page='faq' />} />
                    <Route exact path="/specs" component={Specs} />

                    <PrivateRoute exact path="/admin" component={Admin} />

                    <PrivateRoute exact path="/dashboard" component={Dashboard} />

                    <PrivateRoute exact path="/profile" component={Profile} />

                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <PrivateRoute exact path="/signout" component={SignOut} />
                    <Route exact path="/forgotten" component={ForgottenPassword} />
                    <Route exact path="/auth-handler" component={AuthHandler} />
                    
                    <RoleLimitedRoute roles={[ERole.MANAGER]} exact path="/employees" component={Employees} />
                    <PrivateRoute exact path="/employee/:employeeid" component={EmployeePage} />
        
                    <PrivateRoute exact path="/company/:companyid" component={CompanyPage} />
                    <PrivateRoute exact path="/company-add" component={CompanyAdd} />
                    <PrivateRoute exact path="/company-edit/:companyid" component={CompanyAdd} />

                    <PrivateRoute exact path="/jobs/:companyid" component={Jobs} />
                    <PrivateRoute exact path="/jobs" component={Jobs} />
                    <RoleLimitedRoute roles={[ERole.MANAGER, ERole.RECRUITER]} exact path="/joboffers" component={JobOffers} />
                    <PrivateRoute exact path="/joboffer/:jobofferid" component={JobOfferPage} />
                    <RoleLimitedRoute roles={[ERole.MANAGER, ERole.RECRUITER]} exact path="/joboffer-add" component={JobOfferAdd} />
                    <RoleLimitedRoute roles={[ERole.MANAGER, ERole.RECRUITER]} exact path="/joboffer-edit/:jobofferid" component={JobOfferAdd} />

                    <PrivateRoute exact path="/roles" component={Roles} />

                    <PrivateRoute exact path="/role-add" component={RoleAdd} />
                    <PrivateRoute exact path="/role-add/:companyid" component={RoleAdd} />
                    
                    <PrivateRoute exact path="/role-offer" component={RoleOffer} />
                    <PrivateRoute exact path="/role-offer/:userid" component={RoleOffer} />

                    <RoleLimitedRoute roles={[ERole.MANAGER]} exact path="/equipments" component={Equipments} />
                    <PrivateRoute exact path="/equipment/:equipmentid" component={EquipmentPage} />
                    <RoleLimitedRoute roles={[ERole.MANAGER]} exact path="/equipment-add" component={EquipmentAdd} />
                    <RoleLimitedRoute roles={[ERole.MANAGER]} exact path="/equipment-edit/:equipmentid" component={EquipmentAdd} />
                    <RoleLimitedRoute roles={[ERole.MANAGER]} exact path="/equipment-model-add" component={EquipmentModelAdd} />

                    <RoleLimitedRoute roles={[ERole.MANAGER]} exact path="/contracts" component={Contracts} />
                    <RoleLimitedRoute roles={[ERole.MANAGER]} exact path="/contract/:contractid" component={ContractPage} />
                    <RoleLimitedRoute roles={[ERole.MANAGER]} exact path="/contract-add" component={ContractAdd} />
                    <RoleLimitedRoute roles={[ERole.MANAGER]} exact path="/contract-edit/:contractid" component={ContractAdd} />

                    <RoleLimitedRoute roles={[ERole.MANAGER]} exact path="/invoices" component={Invoices} />

                    <RoleLimitedRoute roles={[ERole.MANAGER]} exact path="/warehouses" component={Warehouses} />
                    <RoleLimitedRoute roles={[ERole.MANAGER]} exact path="/warehouse-add" component={WarehouseAdd} />
                    <RoleLimitedRoute roles={[ERole.MANAGER]} exact path="/warehouse-edit/:warehouseid" component={WarehouseAdd} />
                    <PrivateRoute exact path="/warehouse/:warehouseid" component={WarehousePage} />

                    <RoleLimitedRoute roles={[ERole.DRIVER]} exact path="/gps" component={Gps} />

                    <RoleLimitedRoute roles={[ERole.MECHANIC]} exact path="/maintenance" component={Maintenance} />
                    
                    <RoleLimitedRoute roles={[ERole.DRIVER, ERole.MECHANIC, ERole.MANAGER]} exact path="/logtracks" component={LogTracks} />
                    <RoleLimitedRoute roles={[ERole.DRIVER, ERole.MECHANIC]} exact path="/logtrack-add" component={LogTrackAdd} />

                    <RoleLimitedRoute roles={[ERole.MANAGER]} exact path="/analytics" component={Analytics} />

                    <PrivateRoute exact path="/search" component={Search} />

                    <PrivateRoute exact path="/files" component={Files} />
                </div>
                <Modal />
            </div>
            {styleOverride()}
        </Router>,
        document.getElementById('root'),
        () => {
            setTimeout(ResizeService.updateObservers, 550);
        });
};


// Service Initialization
DataService.initialize();
RT_Service.initialize();

const OBSERVER_KEY = uuid();

DataService.computed.observeComputedValues(computedValues => {
    if(computedValues.initialized) {
        renderApp();
    }
}, OBSERVER_KEY);
