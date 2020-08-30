import React, { Component } from 'react';

class Map extends Component {

  constructor (props) {
    super(props);

    this.state = {
      markers: []
    };
  }

  initializeMap() {}

  toggleGpsMode() {}
  changeActiveTileLayer() {}

  onUserPositionChanged() {}
  centerOnUserPosition() {}

  invalidateMap() {}

  addMarker(lat, lon, popup) {
    this.setState({ markers: [...this.state.markers, { lat, lon, popup }] });
  }
  addMarkers() {}
  switchMarker() {}
  deleteMarker() {}
  deleteAllMarkers() {}

  centerOnMarker() {}
  centerOnAllMarkers() {}

  triggerPopup() {}

  panTo() {}
  fitBounds() {}

  render() {
    return <div className="Map">
      <h1>MAP_COMPONENT</h1>
      <ul id="markers">
        {this.state.markers.map((marker, index) => <li key={index}>MARKER - lat: {marker.lat} - lon: {marker.lon} - popup: {marker.popup}</li>)}
      </ul>
    </div>;
  }
}

export default Map;
