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
    faPrescriptionBottle, faPrescriptionBottleAlt, faRecycle, faSandwich,
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

// COMPONENTS
import Specs from './components/Utils/Specs/Specs';

import Dashboard from './components/App/Dashboard/Dashboard';
import Splash from './components/App/Splash/Splash';
import Navigation from './components/App/Navigation/Navigation';

import SignIn from './components/Forms/SignIn/SignIn';
import SignUp from './components/Forms/SignUp/SignUp';
import SignOut from './components/Forms/SignOut/SignOut';

import CompanyAdd from './components/Forms/CompanyAdd/CompanyAdd';
import CompanyPage from './components/App/CompanyPage/CompanyPage';

import EmployeePage from './components/App/EmployeePage/EmployeePage';

import RoleAdd from './components/Forms/RoleAdd/RoleAdd';

import EquipmentAdd from './components/Forms/EquipmentAdd/EquipmentAdd';

// SERVICES
import FirebaseService from './services/firebase.service';
import DataService from './services/data.service';

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
    faPrescriptionBottle, faPrescriptionBottleAlt, faRecycle, faSandwich);
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


// Service Initialization
DataService.initialize().then(() => {
    ReactDOM.render(
        <Router>
            <Navigation></Navigation>
            <div>
                <Route exact path="/" component={Splash} />
                <Route exact path="/specs" component={Specs} />

                <PrivateRoute exact path="/dashboard" component={Dashboard} />

                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <PrivateRoute exact path="/signout" component={SignOut} />
                
                <PrivateRoute path="/employee/:id" component={EmployeePage} />
    
                <PrivateRoute exact path="/company/add" component={CompanyAdd} />
                <PrivateRoute path="/company/:id" component={CompanyPage} />

                <PrivateRoute exact path="/role/add" component={RoleAdd} />

                <PrivateRoute exact path="/equipment/add" component={EquipmentAdd} />
            </div>
        </Router>,
        document.getElementById('root'));
});

