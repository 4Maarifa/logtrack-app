import React, { Component } from 'react';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import './Map.scss';

const markerIcon = L.icon({
  iconUrl: require('./../../../assets/marker.png'),
  iconSize: [12, 12],
  iconAnchor: [6, 12],
  popupAnchor: [0, -12],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null
});

class Map extends Component {
  constructor () {
    super();
    this.state = {
      
    };
  }

  componentDidMount = () => {

  }

  render() {
    const position = [51.505, -0.09];
    return (
      <div className="Map">
        <LeafletMap center={position} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Marker position={position} icon={markerIcon}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
          </Marker>
        </LeafletMap>
      </div>
    );
  }
}

export default Map;
