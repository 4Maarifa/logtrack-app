import React, { Component, Fragment } from 'react';
import { faTruckContainer, faTruck, faTruckMoving, faTruckPickup, faCarSide, faHelicopter, 
    faPlane, faShip, faTrain, faTrailer, faShippingFast, faShippingTimed, faWindsock, 
    faWindWarning, faWind, faTornado, faThunderstorm, faSunset, faSunrise, faSunHaze, 
    faSunDust, faSunCloud, faSun, faRaindrops, faStars, faSnowflake, faSnowflakes, 
    faSnowBlowing, faSmoke, faSmog, faMoon, faFog, faTruckRamp, faTruckLoading, 
    faTruckCouch, faDolly, faPersonCarry, faPersonDolly, faPersonDollyEmpty, faDollyEmpty, 
    faPeopleCarry, faRampLoading, faConveyorBelt, faConveyorBeltAlt, faForklift, faInventory, 
    faCarBattery, faCarBump, faLightbulbOn, faLightbulb, faMicrochip, faTire, faTrafficCone, 
    faGasPumpSlash, faTirePressureWarning, faTireFlat, faOilTemp, faOilCan, faEngineWarning, 
    faCarTilt, faCarMechanic, faCarCrash, faCarGarage, faChargingStation, faGasPump, 
    faPause, faBed, faUtensils, faWeight, faParking, faWeightHanging, faCarWash, 
    faShare, faReply, faWrench, faArrowAltFromLeft, faArrowAltToRight, faToolbox, 
    faCloud, faCloudDrizzle, faCloudHail, faCloudHailMixed, faCloudMoon, faCloudMoonRain, 
    faCloudRain, faCloudRainbow, faCloudShowers, faCloudShowersHeavy, faCloudSleet, 
    faCloudSnow, faCloudSun, faCloudSunRain, faClouds, faCloudsMoon, faCloudsSun, 
    faBolt, faCalendar, faCalendarAlt, faCalendarCheck, faCalendarTimes, faClock, 
    faCalendarExclamation, faDigitalTachograph, faTemperatureLow, faTemperatureHigh, 
    faAnalytics, faCalendarDay, faReceipt, faMap, faMapMarker, faMapMarkerAlt, faMapMarkerCheck,
    faMapMarkerExclamation, faMapMarkerQuestion, faMapMarkerTimes, faMapSigns, faRoute, 
    faMapMarked, faAtlas, faGlobe, faLocationArrow, faRouteHighway, faRouteInterstate, 
    faFlag, faFlagAlt, faFlagCheckered, faLocationSlash, faLocation, faLocationCircle, 
    faRoad, faDirections, faArchive, faCarrot, faLaptop, faCookie, faTv, faAppleAlt, 
    faBacon, faBreadLoaf, faCheese, faCheeseburger, faCorn, faEgg, faFish, faHamburger, 
    faIceCream, faLemon, faMeat, faPizza, faPie, faPizzaSlice, faPumpkin, faSalad, 
    faSoup, faSteak, faTurkey, faWheat, faCow, faPig, faElephant, faHorse, faHippo, 
    faDuck, faMonkey, faRabbit, faSheep, faSnake, faRam, faBoxAlt, faTurtle, faBoxesAlt, 
    faContainerStorage, faCouch, faCapsules, faWater, faFlowerTulip, faFlower, faPallet, 
    faPalletAlt, faPills, faPrescriptionBottle, faPrescription, faPrescriptionBottleAlt, 
    faRecycle, faTrash, faSandwich, faTshirt, faCogs } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../Icon/Icon';

import { EPalette, EVeryLightPaletteDetails, ELightPaletteDetails, EMediumPaletteDetails, EDarkPaletteDetails } from './../../../services/color.service';

import './Specs.scss';

class Specs extends Component {

  render() {
    return (
      <div className="Specs">
        <h1>Colors</h1>
        <span className="color clr-a"></span>
        <span className="color clr-b"></span>
        <span className="color clr-c"></span>
        <span className="color clr-d"></span>
        <span className="color clr-e"></span>
        <span className="color clr-f"></span>
        <span className="color clr-g"></span>
        <span className="color clr-h"></span>
        <span className="color clr-i"></span>
        <span className="color clr-j"></span>
        <span className="color clr-k"></span>
        <span className="color clr-l"></span>
        <br/>
        {Object.keys(EPalette).map(colorKey => 
            <Fragment key={colorKey}>
                <span key={'very-light' + colorKey} className="color" style={{backgroundColor: `var(${EVeryLightPaletteDetails[colorKey].cssVariable})`}}>
                    {EVeryLightPaletteDetails[colorKey].name} /
                    <span style={{color: 'white'}}>{EVeryLightPaletteDetails[colorKey].name}</span>
                </span>
                <span key={'light' + colorKey} className="color" style={{backgroundColor: `var(${ELightPaletteDetails[colorKey].cssVariable})`}}>
                    {ELightPaletteDetails[colorKey].name} /
                    <span style={{color: 'white'}}>{ELightPaletteDetails[colorKey].name}</span>
                </span>
                <span key={'medium' + colorKey} className="color" style={{backgroundColor: `var(${EMediumPaletteDetails[colorKey].cssVariable})`}}>
                    {EMediumPaletteDetails[colorKey].name} /
                    <span style={{color: 'white'}}>{EMediumPaletteDetails[colorKey].name}</span>
                </span>
                <span key={'dark' + colorKey} className="color" style={{backgroundColor: `var(${EDarkPaletteDetails[colorKey].cssVariable})`}}>
                    {EDarkPaletteDetails[colorKey].name} /
                    <span style={{color: 'white'}}>{EDarkPaletteDetails[colorKey].name}</span>
                </span><br/>
            </Fragment>)}
        <h1>Icons</h1>
        <h2>Vehicles</h2>
        <ul>
            <li><Icon source="fa" icon={faTruck} /></li>
            <li><Icon source="fa" icon={faTruckMoving} /></li>
            <li><Icon source="fa" icon={faTruckPickup} /></li>
            <li><Icon source="fa" icon={faTruckContainer} /></li>
            <li><Icon source="fa" icon={faCarSide} /></li>
            <li><Icon source="fa" icon={faTrailer} /></li>
            <li><Icon source="fa" icon={faHelicopter} /></li>
            <li><Icon source="fa" icon={faPlane} /></li>
            <li><Icon source="fa" icon={faShip} /></li>
            <li><Icon source="fa" icon={faTrain} /></li>
            <li><Icon source="fa" icon={faShippingFast} /></li>
            <li><Icon source="fa" icon={faShippingTimed} /></li>
        </ul>
        <h2>Loading</h2>
        <ul>
            <li><Icon source="fa" icon={faTruckRamp} /></li>
            <li><Icon source="fa" icon={faTruckLoading} /></li>
            <li><Icon source="fa" icon={faTruckCouch} /></li>
            <li><Icon source="fa" icon={faPersonDollyEmpty} /></li>
            <li><Icon source="fa" icon={faPersonDolly} /></li>
            <li><Icon source="fa" icon={faPersonCarry} /></li>
            <li><Icon source="fa" icon={faDolly} /></li>
            <li><Icon source="fa" icon={faDollyEmpty} /></li>
            <li><Icon source="fa" icon={faPeopleCarry} /></li>
            <li><Icon source="fa" icon={faRampLoading} /></li>
            <li><Icon source="fa" icon={faConveyorBelt} /></li>
            <li><Icon source="fa" icon={faConveyorBeltAlt} /></li>
            <li><Icon source="fa" icon={faForklift} /></li>
            <li><Icon source="fa" icon={faInventory} /></li>
        </ul>
        <h2>Problems</h2>
        <ul>
            <li><Icon source="fa" icon={faCarBattery} /></li>
            <li><Icon source="fa" icon={faCarBump} /></li>
            <li><Icon source="fa" icon={faCarCrash} /></li>
            <li><Icon source="fa" icon={faCarGarage} /></li>
            <li><Icon source="fa" icon={faCarMechanic} /></li>
            <li><Icon source="fa" icon={faCarTilt} /></li>
            <li><Icon source="fa" icon={faEngineWarning} /></li>
            <li><Icon source="fa" icon={faOilCan} /></li>
            <li><Icon source="fa" icon={faOilTemp} /></li>
            <li><Icon source="fa" icon={faTireFlat} /></li>
            <li><Icon source="fa" icon={faTirePressureWarning} /></li>
            <li><Icon source="fa" icon={faGasPumpSlash} /></li>
            <li><Icon source="fa" icon={faTrafficCone} /></li>
        </ul>
        <h2>Parts</h2>
        <ul>
            <li><Icon source="fa" icon={faTire} /></li>
            <li><Icon source="fa" icon={faMicrochip} /></li>
            <li><Icon source="fa" icon={faLightbulb} /></li>
            <li><Icon source="fa" icon={faLightbulbOn} /></li>
            <li><Icon source="custom" icon="Spring" /></li>
            <li><Icon source="custom" icon="Fuel" /></li>
            <li><Icon source="custom" icon="Exhaust" /></li>
            <li><Icon source="custom" icon="CarSeat" /></li>
            <li><Icon source="custom" icon="CarDoor" /></li>
            <li><Icon source="custom" icon="Brake" /></li>
            <li><Icon source="custom" icon="Engine" /></li>
            <li><Icon source="custom" icon="Gearbox" /></li>
            <li><Icon source="custom" icon="FifthWheel" /></li>
        </ul>
        <h2>Pause</h2>
        <ul>
            <li><Icon source="fa" icon={faChargingStation} /></li>
            <li><Icon source="fa" icon={faGasPump} /></li>
            <li><Icon source="fa" icon={faPause} /></li>
            <li><Icon source="fa" icon={faBed} /></li>
            <li><Icon source="fa" icon={faUtensils} /></li>
            <li><Icon source="fa" icon={faWeight} /></li>
            <li><Icon source="fa" icon={faParking} /></li>
            <li><Icon source="fa" icon={faWeightHanging} /></li>
            <li><Icon source="fa" icon={faCarWash} /></li>
            <li><Icon source="fa" icon={faTruck} additional={faShare} /></li>
            <li><Icon source="fa" icon={faTruck} additional={faReply} /></li>
        </ul>
        <h2>Service</h2>
        <ul>
            <li><Icon source="fa" icon={faWrench} /></li>
            <li><Icon source="fa" icon={faArrowAltFromLeft} /></li>
            <li><Icon source="fa" icon={faArrowAltToRight} /></li>
            <li><Icon source="fa" icon={faToolbox} /></li>
        </ul>
        <h2>Date / Monitoring</h2>
        <ul>
            <li><Icon source="fa" icon={faCalendar} /></li>
            <li><Icon source="fa" icon={faCalendarAlt} /></li>
            <li><Icon source="fa" icon={faCalendarCheck} /></li>
            <li><Icon source="fa" icon={faCalendarTimes} /></li>
            <li><Icon source="fa" icon={faClock} /></li>
            <li><Icon source="fa" icon={faCalendarExclamation} /></li>
            <li><Icon source="fa" icon={faDigitalTachograph} /></li>
            <li><Icon source="fa" icon={faTemperatureLow} /></li>
            <li><Icon source="fa" icon={faTemperatureHigh} /></li>
            <li><Icon source="fa" icon={faAnalytics} /></li>
            <li><Icon source="fa" icon={faCalendarDay} /></li>
            <li><Icon source="fa" icon={faReceipt} /></li>
        </ul>
        <h2>Merchandise</h2>
        <ul>
            <li><Icon source="fa" icon={faArchive} /></li>
            <li><Icon source="fa" icon={faCarrot} /></li>
            <li><Icon source="fa" icon={faCookie} /></li>
            <li><Icon source="fa" icon={faLaptop} /></li>
            <li><Icon source="fa" icon={faTv} /></li>
            <li><Icon source="fa" icon={faAppleAlt} /></li>
            <li><Icon source="fa" icon={faBacon} /></li>
            <li><Icon source="fa" icon={faBreadLoaf} /></li>
            <li><Icon source="fa" icon={faCheese} /></li>
            <li><Icon source="fa" icon={faCheeseburger} /></li>
            <li><Icon source="fa" icon={faCorn} /></li>
            <li><Icon source="fa" icon={faEgg} /></li>
            <li><Icon source="fa" icon={faFish} /></li>
            <li><Icon source="fa" icon={faHamburger} /></li>
            <li><Icon source="fa" icon={faIceCream} /></li>
            <li><Icon source="fa" icon={faLemon} /></li>
            <li><Icon source="fa" icon={faMeat} /></li>
            <li><Icon source="fa" icon={faPie} /></li>
            <li><Icon source="fa" icon={faPizza} /></li>
            <li><Icon source="fa" icon={faPizzaSlice} /></li>
            <li><Icon source="fa" icon={faPumpkin} /></li>
            <li><Icon source="fa" icon={faSalad} /></li>
            <li><Icon source="fa" icon={faSoup} /></li>
            <li><Icon source="fa" icon={faSteak} /></li>
            <li><Icon source="fa" icon={faTurkey} /></li>
            <li><Icon source="fa" icon={faWheat} /></li>
            <li><Icon source="fa" icon={faCow} /></li>
            <li><Icon source="fa" icon={faPig} /></li>
            <li><Icon source="fa" icon={faElephant} /></li>
            <li><Icon source="fa" icon={faHorse} /></li>
            <li><Icon source="fa" icon={faHippo} /></li>
            <li><Icon source="fa" icon={faDuck} /></li>
            <li><Icon source="fa" icon={faMonkey} /></li>
            <li><Icon source="fa" icon={faRabbit} /></li>
            <li><Icon source="fa" icon={faRam} /></li>
            <li><Icon source="fa" icon={faSheep} /></li>
            <li><Icon source="fa" icon={faSnake} /></li>
            <li><Icon source="fa" icon={faTurtle} /></li>
            <li><Icon source="fa" icon={faBoxAlt} /></li>
            <li><Icon source="fa" icon={faBoxesAlt} /></li>
            <li><Icon source="fa" icon={faContainerStorage} /></li>
            <li><Icon source="fa" icon={faCarSide} /></li>
            <li><Icon source="fa" icon={faCouch} /></li>
            <li><Icon source="fa" icon={faCapsules} /></li>
            <li><Icon source="fa" icon={faWater} /></li>
            <li><Icon source="fa" icon={faFlower} /></li>
            <li><Icon source="fa" icon={faFlowerTulip} /></li>
            <li><Icon source="fa" icon={faPallet} /></li>
            <li><Icon source="fa" icon={faPalletAlt} /></li>
            <li><Icon source="fa" icon={faPills} /></li>
            <li><Icon source="fa" icon={faPrescription} /></li>
            <li><Icon source="fa" icon={faPrescriptionBottle} /></li>
            <li><Icon source="fa" icon={faPrescriptionBottleAlt} /></li>
            <li><Icon source="fa" icon={faRecycle} /></li>
            <li><Icon source="fa" icon={faTrash} /></li>
            <li><Icon source="fa" icon={faSandwich} /></li>
            <li><Icon source="fa" icon={faTshirt} /></li>
            <li><Icon source="fa" icon={faCogs} /></li>
        </ul>
        <h2>Places</h2>
        <ul>
            <li><Icon source="fa" icon={faMap} /></li>
            <li><Icon source="fa" icon={faMapMarker} /></li>
            <li><Icon source="fa" icon={faMapMarkerAlt} /></li>
            <li><Icon source="fa" icon={faMapMarkerCheck} /></li>
            <li><Icon source="fa" icon={faMapMarkerExclamation} /></li>
            <li><Icon source="fa" icon={faMapMarkerQuestion} /></li>
            <li><Icon source="fa" icon={faMapMarkerTimes} /></li>
            <li><Icon source="fa" icon={faMapSigns} /></li>
            <li><Icon source="fa" icon={faRoute} /></li>
            <li><Icon source="fa" icon={faMapMarked} /></li>
            <li><Icon source="fa" icon={faMapMarked} /></li>
            <li><Icon source="fa" icon={faAtlas} /></li>
            <li><Icon source="fa" icon={faGlobe} /></li>
            <li><Icon source="fa" icon={faLocationArrow} /></li>
            <li><Icon source="fa" icon={faRouteInterstate} /></li>
            <li><Icon source="fa" icon={faRouteHighway} /></li>
            <li><Icon source="fa" icon={faFlag} /></li>
            <li><Icon source="fa" icon={faFlagAlt} /></li>
            <li><Icon source="fa" icon={faFlagCheckered} /></li>
            <li><Icon source="fa" icon={faLocation} /></li>
            <li><Icon source="fa" icon={faLocationSlash} /></li>
            <li><Icon source="fa" icon={faLocationCircle} /></li>
            <li><Icon source="fa" icon={faRoad} /></li>
            <li><Icon source="fa" icon={faDirections} /></li>
        </ul>
        <h2>Weather</h2>
        <ul>
            <li><Icon source="fa" icon={faBolt} /></li>
            <li><Icon source="fa" icon={faCloud} /></li>
            <li><Icon source="fa" icon={faCloudDrizzle} /></li>
            <li><Icon source="fa" icon={faCloudHail} /></li>
            <li><Icon source="fa" icon={faCloudHailMixed} /></li>
            <li><Icon source="fa" icon={faCloudMoon} /></li>
            <li><Icon source="fa" icon={faCloudMoonRain} /></li>
            <li><Icon source="fa" icon={faCloudRain} /></li>
            <li><Icon source="fa" icon={faCloudRainbow} /></li>
            <li><Icon source="fa" icon={faCloudShowers} /></li>
            <li><Icon source="fa" icon={faCloudShowersHeavy} /></li>
            <li><Icon source="fa" icon={faCloudSleet} /></li>
            <li><Icon source="fa" icon={faCloudSnow} /></li>
            <li><Icon source="fa" icon={faCloudSun} /></li>
            <li><Icon source="fa" icon={faCloudSunRain} /></li>
            <li><Icon source="fa" icon={faClouds} /></li>
            <li><Icon source="fa" icon={faCloudsMoon} /></li>
            <li><Icon source="fa" icon={faCloudsSun} /></li>
            <li><Icon source="fa" icon={faFog} /></li>
            <li><Icon source="fa" icon={faMoon} /></li>
            <li><Icon source="fa" icon={faSmog} /></li>
            <li><Icon source="fa" icon={faSmoke} /></li>
            <li><Icon source="fa" icon={faSnowBlowing} /></li>
            <li><Icon source="fa" icon={faSnowflake} /></li>
            <li><Icon source="fa" icon={faSnowflakes} /></li>
            <li><Icon source="fa" icon={faStars} /></li>
            <li><Icon source="fa" icon={faRaindrops} /></li>
            <li><Icon source="fa" icon={faSun} /></li>
            <li><Icon source="fa" icon={faSunCloud} /></li>
            <li><Icon source="fa" icon={faSunDust} /></li>
            <li><Icon source="fa" icon={faSunHaze} /></li>
            <li><Icon source="fa" icon={faSunrise} /></li>
            <li><Icon source="fa" icon={faSunset} /></li>
            <li><Icon source="fa" icon={faThunderstorm} /></li>
            <li><Icon source="fa" icon={faTornado} /></li>
            <li><Icon source="fa" icon={faWind} /></li>
            <li><Icon source="fa" icon={faWindWarning} /></li>
            <li><Icon source="fa" icon={faWindsock} /></li>
        </ul>
      </div>
    );
  }
}

export default Specs;
