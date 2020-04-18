import React, { Component } from 'react';
import { faLocation, faCompress, faInfo, faChevronRight } from '@fortawesome/pro-solid-svg-icons';

import OlMap from 'ol/Map';
import View from 'ol/View';
import { defaults, Control } from 'ol/control';

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';

import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { boundingExtent, buffer } from 'ol/extent';
import { Feature, Overlay } from 'ol';

import Icon from './../../Utils/Icon/Icon';

import ResizeService from './../../../services/resize.service';
import PermissionService from './../../../services/permission.service';
import ErrorService from './../../../services/error.service';
import GeoService, { MarkerStyles, TileLayersDetails } from './../../../services/geo.service';

import overlayClouds from './../../../assets/overlay-clouds.png';

import { v4 as uuid } from 'uuid';

import 'ol/ol.css';
import './Map.scss';

/**
 * Map component used in the app
 * /!\ Cannot be converted to function component due to ref utilization
 */
class Map extends Component {
  observerKey = uuid();

  constructor (props) {
    super(props);
    this.state = {
      userPosition: null,
      locationMarkerId: null,

      nbFeatures: 0,

      gpsMode: props.gpsMode,
      activeTileLayer: TileLayersDetails['OSM'].value
    };

    this.mapDomRef = React.createRef();
    this.popupDomRef = React.createRef();
    this.overlay3DRef = React.createRef();

    this.additionalControlsDomRef = React.createRef();
    this.layerControlsDomRef = React.createRef();
    this.attributionsDomRef = React.createRef();

    this.initializeMap();
  }

  componentDidMount = () => {
    ResizeService.addObserver(this.invalidateMap, this.observerKey);

    PermissionService.location.askPermission()
      .then(() => PermissionService.location.addLocationObserver(this.onUserPositionChanged, this.observerKey))
      .catch(ErrorService.manageError);
  };

  componentWillUnmount = () => {
    ResizeService.removeObserver(this.observerKey);
    PermissionService.location.removeLocationObserver(this.observerKey);
    this.map.dispose();
  };

  shouldComponentUpdate = (_, nextState) => {
    if(nextState.nbFeatures !== this.state.nbFeatures) {
      this.setState({nbFeatures: nextState.nbFeatures});
    }
    if(nextState.gpsMode !== this.state.gpsMode) {
      this.setState({gpsMode: nextState.gpsMode});
    }
    return true;
  };

  initializeMap() {
    this.view = new View({center: [255419.107329, 6250857.744477], zoom: 7, projection: 'EPSG:3857'});

    this.map = new OlMap({
      controls: defaults({attribution: false}),
      view: this.view,
      layers: [TileLayersDetails.OSM.layer]
    });

    /* MARKERS */
    this.markerVectorSource = new VectorSource({ features: [] });

    this.map.addLayer(new VectorLayer({
      source: this.markerVectorSource,
      style: MarkerStyles.getMarkerStyle()
    }));

    /* LOCATION */
    this.locationVectorSource = new VectorSource({ features: [] });

    this.map.addLayer(new VectorLayer({
      source: this.locationVectorSource,
      style: MarkerStyles.getLocationStyle()
    }));

    /* POPUP */
    this.popup = new Overlay({
      element: null,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [-5, -15]
    });

    this.map.addOverlay(this.popup);

    /* EVENTS */
    this.map.on('click', event => {
      var feature = this.map.forEachFeatureAtPixel(event.pixel, feature => feature);

      if(!!feature && !!feature.getProperties().popupContent) {
        this.popupDomRef.current.innerHTML = feature.getProperties().popupContent;
        this.popupDomRef.current.style.display = 'flex';
        this.popup.setPosition(feature.getGeometry().getCoordinates());
      }
      else {
        this.popupDomRef.current.style.display = 'none';
      }
    });

    this.map.on('pointermove', event => {
      if(!!event.dragging) {
        this.popupDomRef.current.style.display = 'none';
        this.mapDomRef.current.style.cursor = 'grabbing';
        return;
      }
      let hit = this.map.hasFeatureAtPixel(this.map.getEventPixel(event.originalEvent));
      this.mapDomRef.current.style.cursor = !!hit ? 'pointer' : 'grab';
    });
  };

  toggleGpsMode = () => this.setState({gpsMode: !this.state.gpsMode});

  changeActiveTileLayer = activeTileLayer => {
    this.map.removeLayer(TileLayersDetails[this.state.activeTileLayer].layer);
    this.setState({activeTileLayer});
    this.map.getLayers().insertAt(0, TileLayersDetails[activeTileLayer].layer);
  };

  onUserPositionChanged = userPosition => {
    this.setState({userPosition});

    let position = new Point(GeoService.transformCoordinates([
      this.state.userPosition.longitude,
      this.state.userPosition.latitude
    ]));

    if(!!this.state.locationMarkerId) {
      let marker = this.locationVectorSource.getFeatureById(this.state.locationMarkerId);
      marker.setGeometry(position);
    }
    else {
      const locationMarkerId = uuid();

      const marker = new Feature({
        geometry: position,
        popupContent: 'Your position'
      });
      marker.setId(locationMarkerId);
      
      this.locationVectorSource.addFeature(marker);

      this.setState({locationMarkerId});
    }
  };

  centerOnUserPosition = () => {
    if(!this.state.locationMarkerId) {
      return;
    }
    const feature = this.locationVectorSource.getFeatureById(this.state.locationMarkerId);

    this.view.fit(buffer(feature.getGeometry().getExtent(), 1000), {duration: 1000});

    this.popupDomRef.current.innerHTML = feature.getProperties().popupContent;
    this.popupDomRef.current.style.display = 'flex';
    this.popup.setPosition(feature.getGeometry().getCoordinates());
  };

  invalidateMap = () => {
    this.map.setTarget(this.mapDomRef.current);
    this.popup.setElement(this.popupDomRef.current);

    this.map.updateSize();

    /* CONTROLS */
    this.overlay3DRef.current && this.map.addControl(new Control({
      element: this.overlay3DRef.current
    }));
    this.additionalControlsDomRef.current && this.map.addControl(new Control({
      element: this.additionalControlsDomRef.current
    }));
    this.layerControlsDomRef.current && this.map.addControl(new Control({
      element: this.layerControlsDomRef.current
    }));
    this.attributionsDomRef.current && this.map.addControl(new Control({
      element: this.attributionsDomRef.current
    }));
  };

  addMarker = (lat, lon, popup) => {
    const markerId = uuid();

    const marker = new Feature({
      geometry: new Point([lat, lon]),
      popupContent: popup
    });
    marker.setId(markerId);
    
    this.markerVectorSource.addFeature(marker);

    this.setState({nbFeatures: this.state.nbFeatures + 1});

    return markerId;
  };

  addMarkers = markersToAdd => {
    let markerIds = [];
    let featuresToAddToSource = [];

    markersToAdd.forEach(markerToAdd => {
      const markerId = uuid();
      let marker = new Feature({
        geometry: new Point([markerToAdd.lat, markerToAdd.lon]),
        popupContent: markerToAdd.popup
      });
      marker.setId(markerId);

      markerIds.push(markerId);
      featuresToAddToSource.push(marker);
    });
    this.markerVectorSource.addFeatures(featuresToAddToSource);

    this.setState({nbFeatures: this.state.nbFeatures + markersToAdd.length});

    return markerIds;
  };

  switchMarker = (markerId, lat, lon, popup) => {
    let marker = this.markerVectorSource.getFeatureById(markerId);
    marker.setGeometry(new Point([lat, lon]));
    marker.set('popupContent', popup);
  };

  deleteMarker = markerId => {
    this.markerVectorSource.removeFeature(this.markerVectorSource.getFeatureById(markerId));
    this.setState({nbFeatures: this.state.nbFeatures - 1});
  };

  centerOnMarker = markerId => {
    setTimeout(() => {
      const markerGeometry = this.markerVectorSource.getFeatureById(markerId).getGeometry();
      this.view.fit(buffer(markerGeometry.getExtent(), 1000), {duration: 1000});
    }, 250);
  };

  centerOnAllMarkers = () => {
    if(!!this.markerVectorSource.isEmpty()) {
      return;
    }
    setTimeout(() => {
      this.view.fit(buffer(this.markerVectorSource.getExtent(), 10000), {duration: 1000});
    }, 250);
  };

  triggerPopup = markerId => {
    const feature = this.markerVectorSource.getFeatureById(markerId);
    if(!!feature) {
      this.popupDomRef.current.innerHTML = feature.getProperties().popupContent;
      this.popupDomRef.current.style.display = 'flex';
      this.popup.setPosition(feature.getGeometry().getCoordinates());
    }
    else {
      this.popupDomRef.current.style.display = 'none';
    }
  };

  panTo = (lat, lon) => this.view.animate({ center: fromLonLat([lat, lon]), duration: 2000 });
  fitBounds = (lat1, lon1, lat2, lon2) => this.view.fit(boundingExtent([[lon1, lat1], [lon2, lat2]]), {duration: 1000});

  /**
   * RENDER
   */
  render() {
    return (
      <div className="Map">
        <span id="map" className={'' + (!!this.state.gpsMode ? 'map-3d' : '')} ref={this.mapDomRef}>
          <span id="popup" ref={this.popupDomRef}></span>
          <span id="overlay-3d" ref={this.overlay3DRef} style={{
            backgroundImage: `url(${overlayClouds})`
          }}></span>
          <div id="additional-controls" className="ol-control" ref={this.additionalControlsDomRef}>
            {!!this.state.userPosition &&
              <button onClick={this.centerOnUserPosition} className="ol-geolocation ol-additional-control" type="button" title="Center on your position">
                <Icon source="fa" icon={faLocation} />
              </button>
            }
            {this.state.nbFeatures > 0 &&
              <button onClick={this.centerOnAllMarkers} className="ol-center ol-additional-control" type="button" title="Center view">
                <Icon source="fa" icon={faCompress} />
              </button>
            }
            <div className="ol-gps-mode ol-additional-control">
              <button onClick={this.toggleGpsMode} className={'ol-gps-mode-2d ' + (!this.state.gpsMode ? 'ol-gps-mode--active' : '')} type="button" title="Switch to 2D View">
                <span>2D</span>
              </button>
              <button onClick={this.toggleGpsMode} className={'ol-gps-mode-3d ' + (!!this.state.gpsMode ? 'ol-gps-mode--active' : '')} type="button" title="Switch to 3D View">
                <span>3D</span>
              </button>
            </div>
            <div className="ol-control ol-layer-selector" ref={this.layerControlsDomRef}>
              <div className="ol-layer-selector-selected">
                <button className="layer--active"
                        title={TileLayersDetails[this.state.activeTileLayer].name}>
                  <img src={TileLayersDetails[this.state.activeTileLayer].preview} alt={TileLayersDetails[this.state.activeTileLayer].name} />
                </button>
                <Icon source="fa" icon={faChevronRight} />
              </div>
              <div className="ol-layer-selector-others">
                {Object.keys(TileLayersDetails).map(tileLayerKey =>
                  <button key={tileLayerKey}
                          className={'' + (this.state.activeTileLayer === tileLayerKey ? 'layer--active' : 'layer')} 
                          onClick={() => this.changeActiveTileLayer(tileLayerKey)}
                          title={TileLayersDetails[tileLayerKey].name}>
                    <img src={TileLayersDetails[tileLayerKey].preview} alt={TileLayersDetails[tileLayerKey].name} />
                  </button>
                )}
              </div>
            </div>
            <span className="ol-attributions" ref={this.attributionsDomRef}>
              <span className="ol-attributions-button">
                <Icon source="fa" icon={faInfo} />
              </span>
              <span className="ol-attributions-content">
                {!!this.state.activeTileLayer && TileLayersDetails[this.state.activeTileLayer].attributions}
              </span>
            </span>
          </div>
        </span>
      </div>
    );
  }
}

export default Map;