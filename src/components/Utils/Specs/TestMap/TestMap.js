import React, { Component } from 'react';
import L from 'leaflet';

import './TestMap.css';
import 'leaflet/dist/leaflet.css';

class TestMap extends Component {

  map = null;

  componentDidMount() {
    this.map = L.map('map-container', {
      center: [49.8419, 24.0315],
      zoom: 10,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
  }


  render() {
    return (
      <div id="map-container"></div>
    );
  }
}

export default TestMap;
