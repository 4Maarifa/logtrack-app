import React, { Component } from 'react';
import Icon from '../Icon/Icon';
import TestMap from './TestMap/TestMap';

import './Specs.css';

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
        <h1>Icons</h1>
        <h2>Vehicles</h2>
        <ul>
            <li><Icon source="fa" withLabel={true} icon="truck"/></li>
            <li><Icon source="fa" withLabel={true} icon="truck-moving"/></li>
            <li><Icon source="fa" withLabel={true} icon="truck-pickup"/></li>
            <li><Icon source="fa" withLabel={true} icon="truck-container"/></li>
            <li><Icon source="fa" withLabel={true} icon="car-side"/></li>
            <li><Icon source="fa" withLabel={true} icon="helicopter"/></li>
            <li><Icon source="fa" withLabel={true} icon="plane"/></li>
            <li><Icon source="fa" withLabel={true} icon="ship"/></li>
            <li><Icon source="fa" withLabel={true} icon="train"/></li>
            <li><Icon source="fa" withLabel={true} icon="shipping-fast"/></li>
        </ul>
        <h2>Loading</h2>
        <ul>
            <li><Icon source="fa" withLabel={true} icon="truck-ramp"/></li>
            <li><Icon source="fa" withLabel={true} icon="truck-loading"/></li>
            <li><Icon source="fa" withLabel={true} icon="truck-couch"/></li>
            <li><Icon source="fa" withLabel={true} icon="person-dolly-empty"/></li>
            <li><Icon source="fa" withLabel={true} icon="person-dolly"/></li>
            <li><Icon source="fa" withLabel={true} icon="person-carry"/></li>
            <li><Icon source="fa" withLabel={true} icon="dolly"/></li>
            <li><Icon source="fa" withLabel={true} icon="dolly-empty"/></li>
            <li><Icon source="fa" withLabel={true} icon="people-carry"/></li>
            <li><Icon source="fa" withLabel={true} icon="ramp-loading"/></li>
            <li><Icon source="fa" withLabel={true} icon="conveyor-belt"/></li>
            <li><Icon source="fa" withLabel={true} icon="conveyor-belt-alt"/></li>
            <li><Icon source="fa" withLabel={true} icon="forklift"/></li>
            <li><Icon source="fa" withLabel={true} icon="inventory"/></li>
        </ul>
        <h2>Problems</h2>
        <ul>
            <li><Icon source="fa" withLabel={true} icon="car-battery"/></li>
            <li><Icon source="fa" withLabel={true} icon="car-bump"/></li>
            <li><Icon source="fa" withLabel={true} icon="car-crash"/></li>
            <li><Icon source="fa" withLabel={true} icon="car-garage"/></li>
            <li><Icon source="fa" withLabel={true} icon="car-mechanic"/></li>
            <li><Icon source="fa" withLabel={true} icon="car-tilt"/></li>
            <li><Icon source="fa" withLabel={true} icon="engine-warning"/></li>
            <li><Icon source="fa" withLabel={true} icon="oil-can"/></li>
            <li><Icon source="fa" withLabel={true} icon="oil-temp"/></li>
            <li><Icon source="fa" withLabel={true} icon="tire-flat"/></li>
            <li><Icon source="fa" withLabel={true} icon="tire-pressure-warning"/></li>
            <li><Icon source="fa" withLabel={true} icon="gas-pump-slash"/></li>
            <li><Icon source="fa" withLabel={true} icon="traffic-cone"/></li>
        </ul>
        <h2>Parts</h2>
        <ul>
            <li><Icon source="fa" withLabel={true} icon="tire"/></li>
            <li><Icon source="fa" withLabel={true} icon="microchip"/></li>
            <li><Icon source="fa" withLabel={true} icon="lightbulb-on"/></li>
            <li><Icon source="custom" withLabel={true} icon="Spring"/></li>
            <li><Icon source="custom" withLabel={true} icon="Fuel"/></li>
            <li><Icon source="custom" withLabel={true} icon="Exhaust"/></li>
            <li><Icon source="custom" withLabel={true} icon="CarSeat"/></li>
            <li><Icon source="custom" withLabel={true} icon="CarDoor"/></li>
            <li><Icon source="custom" withLabel={true} icon="Brake"/></li>
            <li><Icon source="custom" withLabel={true} icon="Engine"/></li>
            <li><Icon source="custom" withLabel={true} icon="Gearbox"/></li>
            <li><Icon source="custom" withLabel={true} icon="FifthWheel"/></li>
        </ul>
        <h2>Pause</h2>
        <ul>
            <li><Icon source="fa" withLabel={true} icon="charging-station"/></li>
            <li><Icon source="fa" withLabel={true} icon="gas-pump"/></li>
            <li><Icon source="fa" withLabel={true} icon="pause"/></li>
            <li><Icon source="fa" withLabel={true} icon="bed"/></li>
            <li><Icon source="fa" withLabel={true} icon="utensils"/></li>
            <li><Icon source="fa" withLabel={true} icon="weight"/></li>
            <li><Icon source="fa" withLabel={true} icon="parking"/></li>
            <li><Icon source="fa" withLabel={true} icon="weight-hanging"/></li>
            <li><Icon source="fa" withLabel={true} icon="car-wash"/></li>
        </ul>
        <h2>Date / Monitoring</h2>
        <ul>
            <li><Icon source="fa" withLabel={true} icon="calendar"/></li>
            <li><Icon source="fa" withLabel={true} icon="calendar-alt"/></li>
            <li><Icon source="fa" withLabel={true} icon="calendar-check"/></li>
            <li><Icon source="fa" withLabel={true} icon="calendar-times"/></li>
            <li><Icon source="fa" withLabel={true} icon="calendar-exclamation"/></li>
            <li><Icon source="fa" withLabel={true} icon="digital-tachograph"/></li>
            <li><Icon source="fa" withLabel={true} icon="temperature-low"/></li>
            <li><Icon source="fa" withLabel={true} icon="temperature-high"/></li>
            <li><Icon source="fa" withLabel={true} icon="analytics"/></li>
            <li><Icon source="fa" withLabel={true} icon="calendar-day"/></li>
            <li><Icon source="fa" withLabel={true} icon="receipt"/></li>
        </ul>
        <h2>Merchandise</h2>
        <ul>
            <li><Icon source="fa" withLabel={true} icon="archive"/></li>
            <li><Icon source="fa" withLabel={true} icon="carrot"/></li>
            <li><Icon source="fa" withLabel={true} icon="cookie"/></li>
            <li><Icon source="fa" withLabel={true} icon="laptop"/></li>
            <li><Icon source="fa" withLabel={true} icon="tv"/></li>
            <li><Icon source="fa" withLabel={true} icon="apple-alt"/></li>
            <li><Icon source="fa" withLabel={true} icon="bacon"/></li>
            <li><Icon source="fa" withLabel={true} icon="bread-loaf"/></li>
            <li><Icon source="fa" withLabel={true} icon="cheese"/></li>
            <li><Icon source="fa" withLabel={true} icon="cheeseburger"/></li>
            <li><Icon source="fa" withLabel={true} icon="corn"/></li>
            <li><Icon source="fa" withLabel={true} icon="egg"/></li>
            <li><Icon source="fa" withLabel={true} icon="fish"/></li>
            <li><Icon source="fa" withLabel={true} icon="hamburger"/></li>
            <li><Icon source="fa" withLabel={true} icon="ice-cream"/></li>
            <li><Icon source="fa" withLabel={true} icon="lemon"/></li>
            <li><Icon source="fa" withLabel={true} icon="meat"/></li>
            <li><Icon source="fa" withLabel={true} icon="pie"/></li>
            <li><Icon source="fa" withLabel={true} icon="pizza"/></li>
            <li><Icon source="fa" withLabel={true} icon="pizza-slice"/></li>
            <li><Icon source="fa" withLabel={true} icon="pumpkin"/></li>
            <li><Icon source="fa" withLabel={true} icon="salad"/></li>
            <li><Icon source="fa" withLabel={true} icon="soup"/></li>
            <li><Icon source="fa" withLabel={true} icon="steak"/></li>
            <li><Icon source="fa" withLabel={true} icon="turkey"/></li>
            <li><Icon source="fa" withLabel={true} icon="wheat"/></li>
            <li><Icon source="fa" withLabel={true} icon="cow"/></li>
            <li><Icon source="fa" withLabel={true} icon="pig"/></li>
            <li><Icon source="fa" withLabel={true} icon="elephant"/></li>
            <li><Icon source="fa" withLabel={true} icon="horse"/></li>
            <li><Icon source="fa" withLabel={true} icon="hippo"/></li>
            <li><Icon source="fa" withLabel={true} icon="duck"/></li>
            <li><Icon source="fa" withLabel={true} icon="monkey"/></li>
            <li><Icon source="fa" withLabel={true} icon="rabbit"/></li>
            <li><Icon source="fa" withLabel={true} icon="ram"/></li>
            <li><Icon source="fa" withLabel={true} icon="sheep"/></li>
            <li><Icon source="fa" withLabel={true} icon="snake"/></li>
            <li><Icon source="fa" withLabel={true} icon="turtle"/></li>
            <li><Icon source="fa" withLabel={true} icon="box-alt"/></li>
            <li><Icon source="fa" withLabel={true} icon="boxes-alt"/></li>
            <li><Icon source="fa" withLabel={true} icon="container-storage"/></li>
            <li><Icon source="fa" withLabel={true} icon="couch"/></li>
            <li><Icon source="fa" withLabel={true} icon="capsules"/></li>
            <li><Icon source="fa" withLabel={true} icon="water"/></li>
            <li><Icon source="fa" withLabel={true} icon="flower-tulip"/></li>
            <li><Icon source="fa" withLabel={true} icon="pallet"/></li>
            <li><Icon source="fa" withLabel={true} icon="pallet-alt"/></li>
            <li><Icon source="fa" withLabel={true} icon="pills"/></li>
            <li><Icon source="fa" withLabel={true} icon="prescription-bottle"/></li>
            <li><Icon source="fa" withLabel={true} icon="prescription-bottle-alt"/></li>
            <li><Icon source="fa" withLabel={true} icon="recycle"/></li>
            <li><Icon source="fa" withLabel={true} icon="sandwich"/></li>
        </ul>
        <h2>Places</h2>
        <ul>
            <li><Icon source="fa" withLabel={true} icon="map"/></li>
            <li><Icon source="fa" withLabel={true} icon="map-marker"/></li>
            <li><Icon source="fa" withLabel={true} icon="map-marker-alt"/></li>
            <li><Icon source="fa" withLabel={true} icon="map-marker-check"/></li>
            <li><Icon source="fa" withLabel={true} icon="map-marker-exclamation"/></li>
            <li><Icon source="fa" withLabel={true} icon="map-marker-question"/></li>
            <li><Icon source="fa" withLabel={true} icon="map-marker-times"/></li>
            <li><Icon source="fa" withLabel={true} icon="map-signs"/></li>
            <li><Icon source="fa" withLabel={true} icon="route"/></li>
            <li><Icon source="fa" withLabel={true} icon="map-marked"/></li>
            <li><Icon source="fa" withLabel={true} icon="map-marked-alt"/></li>
            <li><Icon source="fa" withLabel={true} icon="atlas"/></li>
            <li><Icon source="fa" withLabel={true} icon="globe"/></li>
            <li><Icon source="fa" withLabel={true} icon="location-arrow"/></li>
            <li><Icon source="fa" withLabel={true} icon="route-interstate"/></li>
            <li><Icon source="fa" withLabel={true} icon="route-highway"/></li>
            <li><Icon source="fa" withLabel={true} icon="flag"/></li>
            <li><Icon source="fa" withLabel={true} icon="flag-alt"/></li>
            <li><Icon source="fa" withLabel={true} icon="flag-checkered"/></li>
            <li><Icon source="fa" withLabel={true} icon="location"/></li>
            <li><Icon source="fa" withLabel={true} icon="location-slash"/></li>
            <li><Icon source="fa" withLabel={true} icon="location-circle"/></li>
            <li><Icon source="fa" withLabel={true} icon="road"/></li>
            <li><Icon source="fa" withLabel={true} icon="directions"/></li>
        </ul>
        <h2>Weather</h2>
        <ul>
            <li><Icon source="fa" withLabel={true} icon="bolt"/></li>
            <li><Icon source="fa" withLabel={true} icon="cloud"/></li>
            <li><Icon source="fa" withLabel={true} icon="cloud-drizzle"/></li>
            <li><Icon source="fa" withLabel={true} icon="cloud-hail"/></li>
            <li><Icon source="fa" withLabel={true} icon="cloud-hail-mixed"/></li>
            <li><Icon source="fa" withLabel={true} icon="cloud-moon"/></li>
            <li><Icon source="fa" withLabel={true} icon="cloud-moon-rain"/></li>
            <li><Icon source="fa" withLabel={true} icon="cloud-rain"/></li>
            <li><Icon source="fa" withLabel={true} icon="cloud-rainbow"/></li>
            <li><Icon source="fa" withLabel={true} icon="cloud-showers"/></li>
            <li><Icon source="fa" withLabel={true} icon="cloud-showers-heavy"/></li>
            <li><Icon source="fa" withLabel={true} icon="cloud-sleet"/></li>
            <li><Icon source="fa" withLabel={true} icon="cloud-snow"/></li>
            <li><Icon source="fa" withLabel={true} icon="cloud-sun"/></li>
            <li><Icon source="fa" withLabel={true} icon="cloud-sun-rain"/></li>
            <li><Icon source="fa" withLabel={true} icon="clouds"/></li>
            <li><Icon source="fa" withLabel={true} icon="clouds-moon"/></li>
            <li><Icon source="fa" withLabel={true} icon="clouds-sun"/></li>
            <li><Icon source="fa" withLabel={true} icon="fog"/></li>
            <li><Icon source="fa" withLabel={true} icon="moon"/></li>
            <li><Icon source="fa" withLabel={true} icon="smog"/></li>
            <li><Icon source="fa" withLabel={true} icon="smoke"/></li>
            <li><Icon source="fa" withLabel={true} icon="snow-blowing"/></li>
            <li><Icon source="fa" withLabel={true} icon="snowflake"/></li>
            <li><Icon source="fa" withLabel={true} icon="snowflakes"/></li>
            <li><Icon source="fa" withLabel={true} icon="stars"/></li>
            <li><Icon source="fa" withLabel={true} icon="raindrops"/></li>
            <li><Icon source="fa" withLabel={true} icon="sun"/></li>
            <li><Icon source="fa" withLabel={true} icon="sun-cloud"/></li>
            <li><Icon source="fa" withLabel={true} icon="sun-dust"/></li>
            <li><Icon source="fa" withLabel={true} icon="sun-haze"/></li>
            <li><Icon source="fa" withLabel={true} icon="sunrise"/></li>
            <li><Icon source="fa" withLabel={true} icon="sunset"/></li>
            <li><Icon source="fa" withLabel={true} icon="thunderstorm"/></li>
            <li><Icon source="fa" withLabel={true} icon="tornado"/></li>
            <li><Icon source="fa" withLabel={true} icon="wind"/></li>
            <li><Icon source="fa" withLabel={true} icon="wind-warning"/></li>
            <li><Icon source="fa" withLabel={true} icon="windsock"/></li>
        </ul>
        <h1>Map</h1>
        <TestMap></TestMap>
      </div>
    );
  }
}

export default Specs;
