import React from 'react';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';
import L from 'leaflet';
import { faLocation, faLocationSlash } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import keys from './../../../params.inc';

import ResizeService from './../../../services/resize.service';
import PermissionService from './../../../services/permission.service';
import ErrorService from './../../../services/error.service';

import Icon from './../../Utils/Icon/Icon';

import './Map.scss';

const markerIcon = L.icon({
  iconUrl: require('./../../../assets/map/marker.png'),
  iconSize: [12, 12],
  iconAnchor: [6, 12],
  popupAnchor: [0, -12],
  shadowUrl: require('./../../../assets/map/marker-shadow.png'),
  shadowSize: [16, 16],
  shadowAnchor: [8, 14]
});

class Map extends ComponentSafeUpdate {
  constructor () {
    super();
    this.state = {
      resizeObserverKey: null,

      locationObserverKey: null,
      userPosition: null
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({
      resizeObserverKey: ResizeService.addObserver(this.invalidateMap)
    });

    PermissionService.location.askPermission()
      .then(() => {
        PermissionService.location.addLocationObserver(this.positionObserver)
          .then(observerKey => this.setStateSafe({locationObserverKey: observerKey}))
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
    ResizeService.removeObserver(this.state.resizeObserverKey);
    !!this.state.locationObserverKey && PermissionService.location.removeLocationObserver(this.state.locationObserverKey);
  }

  positionObserver = positionCoords => {
    this.setStateSafe({userPosition: positionCoords});
  };

  centerOnUserPosition = () => {
    if (!!this.refs.map) {
      this.refs.map.leafletElement.flyTo({lat: this.state.userPosition.latitude, lon: this.state.userPosition.longitude}, 18);
    }
  }

  invalidateMap = () => {
    if (!!this.refs.map) {
      this.refs.map.leafletElement.invalidateSize();
    }
  }

  /**
   * RENDER
   */
  render() {
    const position = [51.505, -0.09];
    return (
      <div className="Map">
        <LeafletMap ref="map" center={position} zoom={13}>
          <TileLayer
            url={'https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=' + keys.thunderforest}
            attribution="&copy; <a href=&quot;http://www.thunderforest.com/&quot;>Thunderforest</a>"
            maxZoom={22} />

          {!!this.state.userPosition && <Control position="topleft" className="leaflet-custom-control">
            <button onClick={() => this.centerOnUserPosition()}>
              <Icon source="fa" icon={faLocation} size="lg" />
            </button>
          </Control>}

          {!this.state.userPosition && <Control position="topleft" className="leaflet-custom-control">
            <button>
              <Icon source="fa" icon={faLocationSlash} size="lg" />
            </button>
          </Control>}

          <Marker position={position} icon={markerIcon}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
          </Marker>
        </LeafletMap>
      </div>
    );
  }
}

export default Map;
