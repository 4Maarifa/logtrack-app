import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    // Vehicles
    faTruck, faTruckMoving, faTruckPickup, faTruckContainer, faCarSide, faHelicopter, faPlane, faShip, faTrain, faShippingFast,
    // Loading
    faTruckRamp, faTruckLoading, faTruckCouch, faPersonDollyEmpty, faPersonDolly, faPersonCarry, faDolly, faDollyEmpty, faPeopleCarry,
    faRampLoading, faConveyorBelt, faConveyorBeltAlt, faForklift, faInventory,
    // Problems
    faCarBattery, faCarBump, faCarCrash, faCarGarage, faCarMechanic, faCarTilt, faEngineWarning, faOilCan, faOilTemp, 
    faTireFlat, faTirePressureWarning, faGasPumpSlash, faTrafficCone,
    // Parts
    faTire, faMicrochip, faLightbulbOn,
    // Pause
    faChargingStation, faGasPump, faPause, faBed, faUtensils, faWeight, faParking, faWeightHanging, faCarWash,
    // Date / Monitoring
    faCalendar, faCalendarAlt, faCalendarCheck, faCalendarTimes, faCalendarExclamation, faDigitalTachograph, faTemperatureLow, 
    faTemperatureHigh, faAnalytics, faCalendarDay, faReceipt,
    // Merchandise
    faArchive, faCarrot, faCookie, faLaptop, faTv, faAppleAlt, faBacon, faBreadLoaf, faCheese, faCheeseburger, faCorn, faEgg, 
    faFish, faHamburger, faIceCream, faLemon, faMeat, faPie, faPizza, faPizzaSlice, faPumpkin,faSalad, faSoup, faSteak, 
    faTurkey, faWheat, faCow, faPig, faElephant, faHorse, faHippo, faDuck, faMonkey, faRabbit, faRam, faSheep, faSnake, faTurtle, 
    faBoxAlt, faBoxesAlt, faContainerStorage, faCouch, faCapsules, faWater, faFlowerTulip, faPallet, faPalletAlt, faPills, 
    faPrescriptionBottle, faPrescriptionBottleAlt, faRecycle, faTrash, faSandwich, faTshirt, faCogs,
    // Places
    faMap, faMapMarker, faMapMarkerAlt, faMapMarkerCheck, faMapMarkerExclamation, faMapMarkerQuestion, faMapMarkerTimes, 
    faMapSigns, faRoute, faMapMarked, faMapMarkedAlt, faAtlas, faGlobe, faLocationArrow, faRouteInterstate, faRouteHighway, 
    faFlag, faFlagAlt, faFlagCheckered, faLocation, faLocationSlash, faLocationCircle, faRoad, faDirections, 
    // Weather
    faBolt, faCloud, faCloudDrizzle, faCloudHail, faCloudHailMixed, faCloudMoon, faCloudMoonRain, faCloudRain, faCloudRainbow, 
    faCloudShowers, faCloudShowersHeavy, faCloudSleet, faCloudSnow, faCloudSun, faCloudSunRain, faClouds, faCloudsMoon, 
    faCloudsSun, faFog, faMoon, faSmog, faSmoke, faSnowBlowing, faSnowflake, faSnowflakes, faStars, faRaindrops, faSun, faSunCloud, 
    faSunDust, faSunHaze, faSunrise, faSunset, faThunderstorm, faTornado, faWind, faWindWarning, faWindsock,
    // Roles
    faUsers, faWrench, faSteeringWheel,

} from '@fortawesome/pro-solid-svg-icons';

import 'transportation-font/dist/transportation-font.css';

// COMPONENTS
import Specs from './components/Utils/Specs/Specs';

import Dashboard from './components/App/Dashboard/Dashboard';
import Splash from './components/App/Splash/Splash';
import Navigation from './components/App/Navigation/Navigation';

import SignIn from './components/Forms/SignIn/SignIn';
import SignUp from './components/Forms/SignUp/SignUp';
import SignOut from './components/Forms/SignOut/SignOut';

import Profile from './components/App/Profile/Profile';

import CompanyAdd from './components/Forms/CompanyAdd/CompanyAdd';
import CompanyPage from './components/App/CompanyPage/CompanyPage';

import Employees from './components/App/Employees/Employees';

import Roles from './components/App/Roles/Roles';
import RoleAdd from './components/Forms/RoleAdd/RoleAdd';

import Equipments from './components/App/Equipments/Equipments';
import EquipmentAdd from './components/Forms/EquipmentAdd/EquipmentAdd';

import Contracts from './components/App/Contracts/Contracts';
import ContractAdd from './components/Forms/ContractAdd/ContractAdd';

import Warehouses from './components/App/Warehouses/Warehouses';

import Gps from './components/App/Gps/Gps';

import LogTrack from './components/App/LogTrack/LogTrack';

import Analytics from './components/App/Analytics/Analytics';

import Search from './components/App/Search/Search';

// SERVICES
import FirebaseService from './services/firebase.service';
import DataService from './services/data.service';
import ResizeService from './services/resize.service';

import ESettings, { ESettingsDetails } from './classes/enums/ESettings';

import './index.scss';

// Vehicles
library.add(faTruck, faTruckMoving, faTruckPickup, faTruckContainer, faCarSide, faHelicopter, faPlane, faShip, faTrain, faShippingFast);
// Loading
library.add(faTruckRamp, faTruckLoading, faTruckCouch, faPersonDollyEmpty, faPersonDolly, faPersonCarry, faDolly, faDollyEmpty, faPeopleCarry,
    faRampLoading, faConveyorBelt, faConveyorBeltAlt, faForklift, faInventory);
// Problems
library.add(faCarBattery, faCarBump, faCarCrash, faCarCrash, faCarGarage, faCarMechanic, faCarTilt,faEngineWarning, faOilCan, faOilTemp, 
    faTireFlat, faTirePressureWarning, faGasPumpSlash, faTrafficCone);
// Parts
library.add(faTire, faMicrochip, faLightbulbOn);
// Pause
library.add(faChargingStation, faGasPump, faPause, faBed, faUtensils, faWeight, faParking, faWeightHanging, faCarWash);
// Date / Monitoring
library.add(faCalendar, faCalendarAlt, faCalendarCheck, faCalendarTimes, faCalendarExclamation, faDigitalTachograph, faTemperatureLow, 
    faTemperatureHigh, faAnalytics, faCalendarDay, faReceipt);
// Merchandise
library.add(faArchive, faCarrot, faCookie, faLaptop, faTv, faAppleAlt, faBacon, faBreadLoaf, faCheese, faCheeseburger, faCorn, faEgg, 
    faFish, faHamburger, faIceCream, faLemon, faMeat, faPie, faPizza, faPizzaSlice, faPumpkin,faSalad, faSoup, faSteak, 
    faTurkey, faWheat, faCow, faPig, faElephant, faHorse, faHippo, faDuck, faMonkey, faRabbit, faRam, faSheep, faSnake, faTurtle, 
    faBoxAlt, faBoxesAlt, faContainerStorage, faCouch, faCapsules, faWater, faFlowerTulip, faPallet, faPalletAlt, faPills, 
    faPrescriptionBottle, faPrescriptionBottleAlt, faRecycle, faTrash, faSandwich, faTshirt, faCogs);
// Places
library.add(faMap, faMapMarker, faMapMarkerAlt, faMapMarkerCheck, faMapMarkerExclamation, faMapMarkerQuestion, faMapMarkerTimes, 
    faMapSigns, faRoute, faMapMarked, faMapMarkedAlt, faAtlas, faGlobe, faLocationArrow, faRouteInterstate, faRouteHighway, 
    faFlag, faFlagAlt, faFlagCheckered, faLocation, faLocationSlash, faLocationCircle, faRoad, faDirections);
// Weather
library.add(faBolt, faCloud, faCloudDrizzle, faCloudHail, faCloudHailMixed, faCloudMoon, faCloudMoonRain, faCloudRain, faCloudRainbow, 
    faCloudShowers, faCloudShowersHeavy, faCloudSleet, faCloudSnow, faCloudSun, faCloudSunRain, faClouds, faCloudsMoon, 
    faCloudsSun, faFog, faMoon, faSmog, faSmoke, faSnowBlowing, faSnowflake, faSnowflakes, faStars, faRaindrops, faSun, faSunCloud, 
    faSunDust, faSunHaze, faSunrise, faSunset, faThunderstorm, faTornado, faWind, faWindWarning, faWindsock);

// Roles
library.add(faUsers, faWrench, faSteeringWheel);

// Private route
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        FirebaseService.isUserConnected()
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} />
);

const getSettingValue = (employee, settingKey) => {
    if (!employee) {
        return;
    }
    if (!!employee.settings && !!employee.settings[settingKey]) {
        return employee.settings[settingKey];
    }
    return ESettingsDetails[settingKey].default;
};

const renderApp = () => {
    ReactDOM.render(
        <Router>
            <div className={'app-container ' + (getSettingValue(DataService.computed.employee, ESettings.SETTINGS_FULL_PAGE_LAYOUT) === 'FULL' ? 'app-container--full' : '')}>
                <Navigation></Navigation>
                <div className="page_content">
                    <Route exact path="/" component={Splash} />
                    <Route exact path="/specs" component={Specs} />

                    <PrivateRoute exact path="/dashboard" component={Dashboard} />

                    <PrivateRoute exact path="/profile" component={Profile} />

                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <PrivateRoute exact path="/signout" component={SignOut} />
                    
                    <PrivateRoute exact path="/employees" component={Employees} />
        
                    <PrivateRoute exact path="/company/:companyid" component={CompanyPage} />
                    <PrivateRoute exact path="/company-add" component={CompanyAdd} />

                    <PrivateRoute exact path="/roles" component={Roles} />
                    <PrivateRoute exact path="/role-add" component={RoleAdd} />

                    <PrivateRoute exact path="/equipments" component={Equipments} />
                    <PrivateRoute exact path="/equipment-add" component={EquipmentAdd} />

                    <PrivateRoute exact path="/contracts" component={Contracts} />
                    <PrivateRoute exact path="/contract-add" component={ContractAdd} />

                    <PrivateRoute exact path="/warehouses" component={Warehouses} />

                    <PrivateRoute exact path="/gps" component={Gps} />
                    
                    <PrivateRoute exact path="/logtrack" component={LogTrack} />

                    <PrivateRoute exact path="/analytics" component={Analytics} />

                    <PrivateRoute exact path="/search" component={Search} />
                </div>
            </div>
        </Router>,
        document.getElementById('root'),
        () => {
            setTimeout(() => ResizeService.updateObservers(), 550);
        });
};


// Service Initialization
DataService.initialize().then(() => {
    renderApp();
});
const observeComputedValues = _ => renderApp();

DataService.computed.observeComputedValues(observeComputedValues);

