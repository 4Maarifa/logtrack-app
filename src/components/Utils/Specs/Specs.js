import React, { Component, Fragment } from 'react';

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
            <li><Icon source="fa" icon="truck"/></li>
            <li><Icon source="fa" icon="truck-moving"/></li>
            <li><Icon source="fa" icon="truck-pickup"/></li>
            <li><Icon source="fa" icon="truck-container"/></li>
            <li><Icon source="fa" icon="car-side"/></li>
            <li><Icon source="fa" icon="helicopter"/></li>
            <li><Icon source="fa" icon="plane"/></li>
            <li><Icon source="fa" icon="ship"/></li>
            <li><Icon source="fa" icon="train"/></li>
            <li><Icon source="fa" icon="shipping-fast"/></li>
            <li><Icon source="fa" icon="shipping-timed"/></li>
        </ul>
        <h2>Loading</h2>
        <ul>
            <li><Icon source="fa" icon="truck-ramp"/></li>
            <li><Icon source="fa" icon="truck-loading"/></li>
            <li><Icon source="fa" icon="truck-couch"/></li>
            <li><Icon source="fa" icon="person-dolly-empty"/></li>
            <li><Icon source="fa" icon="person-dolly"/></li>
            <li><Icon source="fa" icon="person-carry"/></li>
            <li><Icon source="fa" icon="dolly"/></li>
            <li><Icon source="fa" icon="dolly-empty"/></li>
            <li><Icon source="fa" icon="people-carry"/></li>
            <li><Icon source="fa" icon="ramp-loading"/></li>
            <li><Icon source="fa" icon="conveyor-belt"/></li>
            <li><Icon source="fa" icon="conveyor-belt-alt"/></li>
            <li><Icon source="fa" icon="forklift"/></li>
            <li><Icon source="fa" icon="inventory"/></li>
        </ul>
        <h2>Problems</h2>
        <ul>
            <li><Icon source="fa" icon="car-battery"/></li>
            <li><Icon source="fa" icon="car-bump"/></li>
            <li><Icon source="fa" icon="car-crash"/></li>
            <li><Icon source="fa" icon="car-garage"/></li>
            <li><Icon source="fa" icon="car-mechanic"/></li>
            <li><Icon source="fa" icon="car-tilt"/></li>
            <li><Icon source="fa" icon="engine-warning"/></li>
            <li><Icon source="fa" icon="oil-can"/></li>
            <li><Icon source="fa" icon="oil-temp"/></li>
            <li><Icon source="fa" icon="tire-flat"/></li>
            <li><Icon source="fa" icon="tire-pressure-warning"/></li>
            <li><Icon source="fa" icon="gas-pump-slash"/></li>
            <li><Icon source="fa" icon="traffic-cone"/></li>
        </ul>
        <h2>Parts</h2>
        <ul>
            <li><Icon source="fa" icon="tire"/></li>
            <li><Icon source="fa" icon="microchip"/></li>
            <li><Icon source="fa" icon="lightbulb-on"/></li>
            <li><Icon source="custom" icon="Spring"/></li>
            <li><Icon source="custom" icon="Fuel"/></li>
            <li><Icon source="custom" icon="Exhaust"/></li>
            <li><Icon source="custom" icon="CarSeat"/></li>
            <li><Icon source="custom" icon="CarDoor"/></li>
            <li><Icon source="custom" icon="Brake"/></li>
            <li><Icon source="custom" icon="Engine"/></li>
            <li><Icon source="custom" icon="Gearbox"/></li>
            <li><Icon source="custom" icon="FifthWheel"/></li>
        </ul>
        <h2>Pause</h2>
        <ul>
            <li><Icon source="fa" icon="charging-station"/></li>
            <li><Icon source="fa" icon="gas-pump"/></li>
            <li><Icon source="fa" icon="pause"/></li>
            <li><Icon source="fa" icon="bed"/></li>
            <li><Icon source="fa" icon="utensils"/></li>
            <li><Icon source="fa" icon="weight"/></li>
            <li><Icon source="fa" icon="parking"/></li>
            <li><Icon source="fa" icon="weight-hanging"/></li>
            <li><Icon source="fa" icon="car-wash"/></li>
            <li><Icon source="fa" icon="truck" additional="share" /></li>
            <li><Icon source="fa" icon="truck" additional="reply" /></li>
        </ul>
        <h2>Service</h2>
        <ul>
            <li><Icon source="fa" icon="wrench"/></li>
            <li><Icon source="fa" icon="arrow-alt-from-left"/></li>
            <li><Icon source="fa" icon="arrow-alt-to-right"/></li>
            <li><Icon source="fa" icon="toolbox"/></li>
        </ul>
        <h2>Date / Monitoring</h2>
        <ul>
            <li><Icon source="fa" icon="calendar"/></li>
            <li><Icon source="fa" icon="calendar-alt"/></li>
            <li><Icon source="fa" icon="calendar-check"/></li>
            <li><Icon source="fa" icon="calendar-times"/></li>
            <li><Icon source="fa" icon="clock"/></li>
            <li><Icon source="fa" icon="calendar-exclamation"/></li>
            <li><Icon source="fa" icon="digital-tachograph"/></li>
            <li><Icon source="fa" icon="temperature-low"/></li>
            <li><Icon source="fa" icon="temperature-high"/></li>
            <li><Icon source="fa" icon="analytics"/></li>
            <li><Icon source="fa" icon="calendar-day"/></li>
            <li><Icon source="fa" icon="receipt"/></li>
        </ul>
        <h2>Merchandise</h2>
        <ul>
            <li><Icon source="fa" icon="archive"/></li>
            <li><Icon source="fa" icon="carrot"/></li>
            <li><Icon source="fa" icon="cookie"/></li>
            <li><Icon source="fa" icon="laptop"/></li>
            <li><Icon source="fa" icon="tv"/></li>
            <li><Icon source="fa" icon="apple-alt"/></li>
            <li><Icon source="fa" icon="bacon"/></li>
            <li><Icon source="fa" icon="bread-loaf"/></li>
            <li><Icon source="fa" icon="cheese"/></li>
            <li><Icon source="fa" icon="cheeseburger"/></li>
            <li><Icon source="fa" icon="corn"/></li>
            <li><Icon source="fa" icon="egg"/></li>
            <li><Icon source="fa" icon="fish"/></li>
            <li><Icon source="fa" icon="hamburger"/></li>
            <li><Icon source="fa" icon="ice-cream"/></li>
            <li><Icon source="fa" icon="lemon"/></li>
            <li><Icon source="fa" icon="meat"/></li>
            <li><Icon source="fa" icon="pie"/></li>
            <li><Icon source="fa" icon="pizza"/></li>
            <li><Icon source="fa" icon="pizza-slice"/></li>
            <li><Icon source="fa" icon="pumpkin"/></li>
            <li><Icon source="fa" icon="salad"/></li>
            <li><Icon source="fa" icon="soup"/></li>
            <li><Icon source="fa" icon="steak"/></li>
            <li><Icon source="fa" icon="turkey"/></li>
            <li><Icon source="fa" icon="wheat"/></li>
            <li><Icon source="fa" icon="cow"/></li>
            <li><Icon source="fa" icon="pig"/></li>
            <li><Icon source="fa" icon="elephant"/></li>
            <li><Icon source="fa" icon="horse"/></li>
            <li><Icon source="fa" icon="hippo"/></li>
            <li><Icon source="fa" icon="duck"/></li>
            <li><Icon source="fa" icon="monkey"/></li>
            <li><Icon source="fa" icon="rabbit"/></li>
            <li><Icon source="fa" icon="ram"/></li>
            <li><Icon source="fa" icon="sheep"/></li>
            <li><Icon source="fa" icon="snake"/></li>
            <li><Icon source="fa" icon="turtle"/></li>
            <li><Icon source="fa" icon="box-alt"/></li>
            <li><Icon source="fa" icon="boxes-alt"/></li>
            <li><Icon source="fa" icon="container-storage"/></li>
            <li><Icon source="fa" icon="car-side"/></li>
            <li><Icon source="fa" icon="couch"/></li>
            <li><Icon source="fa" icon="capsules"/></li>
            <li><Icon source="fa" icon="water"/></li>
            <li><Icon source="fa" icon="flower-tulip"/></li>
            <li><Icon source="fa" icon="pallet"/></li>
            <li><Icon source="fa" icon="pallet-alt"/></li>
            <li><Icon source="fa" icon="pills"/></li>
            <li><Icon source="fa" icon="prescription-bottle"/></li>
            <li><Icon source="fa" icon="prescription-bottle-alt"/></li>
            <li><Icon source="fa" icon="recycle"/></li>
            <li><Icon source="fa" icon="trash"/></li>
            <li><Icon source="fa" icon="sandwich"/></li>
            <li><Icon source="fa" icon="tshirt"/></li>
            <li><Icon source="fa" icon="cogs"/></li>
        </ul>
        <h2>Places</h2>
        <ul>
            <li><Icon source="fa" icon="map"/></li>
            <li><Icon source="fa" icon="map-marker"/></li>
            <li><Icon source="fa" icon="map-marker-alt"/></li>
            <li><Icon source="fa" icon="map-marker-check"/></li>
            <li><Icon source="fa" icon="map-marker-exclamation"/></li>
            <li><Icon source="fa" icon="map-marker-question"/></li>
            <li><Icon source="fa" icon="map-marker-times"/></li>
            <li><Icon source="fa" icon="map-signs"/></li>
            <li><Icon source="fa" icon="route"/></li>
            <li><Icon source="fa" icon="map-marked"/></li>
            <li><Icon source="fa" icon="map-marked-alt"/></li>
            <li><Icon source="fa" icon="atlas"/></li>
            <li><Icon source="fa" icon="globe"/></li>
            <li><Icon source="fa" icon="location-arrow"/></li>
            <li><Icon source="fa" icon="route-interstate"/></li>
            <li><Icon source="fa" icon="route-highway"/></li>
            <li><Icon source="fa" icon="flag"/></li>
            <li><Icon source="fa" icon="flag-alt"/></li>
            <li><Icon source="fa" icon="flag-checkered"/></li>
            <li><Icon source="fa" icon="location"/></li>
            <li><Icon source="fa" icon="location-slash"/></li>
            <li><Icon source="fa" icon="location-circle"/></li>
            <li><Icon source="fa" icon="road"/></li>
            <li><Icon source="fa" icon="directions"/></li>
        </ul>
        <h2>Weather</h2>
        <ul>
            <li><Icon source="fa" icon="bolt"/></li>
            <li><Icon source="fa" icon="cloud"/></li>
            <li><Icon source="fa" icon="cloud-drizzle"/></li>
            <li><Icon source="fa" icon="cloud-hail"/></li>
            <li><Icon source="fa" icon="cloud-hail-mixed"/></li>
            <li><Icon source="fa" icon="cloud-moon"/></li>
            <li><Icon source="fa" icon="cloud-moon-rain"/></li>
            <li><Icon source="fa" icon="cloud-rain"/></li>
            <li><Icon source="fa" icon="cloud-rainbow"/></li>
            <li><Icon source="fa" icon="cloud-showers"/></li>
            <li><Icon source="fa" icon="cloud-showers-heavy"/></li>
            <li><Icon source="fa" icon="cloud-sleet"/></li>
            <li><Icon source="fa" icon="cloud-snow"/></li>
            <li><Icon source="fa" icon="cloud-sun"/></li>
            <li><Icon source="fa" icon="cloud-sun-rain"/></li>
            <li><Icon source="fa" icon="clouds"/></li>
            <li><Icon source="fa" icon="clouds-moon"/></li>
            <li><Icon source="fa" icon="clouds-sun"/></li>
            <li><Icon source="fa" icon="fog"/></li>
            <li><Icon source="fa" icon="moon"/></li>
            <li><Icon source="fa" icon="smog"/></li>
            <li><Icon source="fa" icon="smoke"/></li>
            <li><Icon source="fa" icon="snow-blowing"/></li>
            <li><Icon source="fa" icon="snowflake"/></li>
            <li><Icon source="fa" icon="snowflakes"/></li>
            <li><Icon source="fa" icon="stars"/></li>
            <li><Icon source="fa" icon="raindrops"/></li>
            <li><Icon source="fa" icon="sun"/></li>
            <li><Icon source="fa" icon="sun-cloud"/></li>
            <li><Icon source="fa" icon="sun-dust"/></li>
            <li><Icon source="fa" icon="sun-haze"/></li>
            <li><Icon source="fa" icon="sunrise"/></li>
            <li><Icon source="fa" icon="sunset"/></li>
            <li><Icon source="fa" icon="thunderstorm"/></li>
            <li><Icon source="fa" icon="tornado"/></li>
            <li><Icon source="fa" icon="wind"/></li>
            <li><Icon source="fa" icon="wind-warning"/></li>
            <li><Icon source="fa" icon="windsock"/></li>
        </ul>
      </div>
    );
  }
}

export default Specs;
