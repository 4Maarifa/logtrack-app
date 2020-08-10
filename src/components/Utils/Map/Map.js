import React, { Component } from 'react';
import { faLocation, faCompress, faInfo, faChevronRight } from '@fortawesome/pro-light-svg-icons';

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
 * /!\ Cannot be converted to function component due to ref utilization on it by other components
 * 
 * gpsMode: boolean | if true, activate 3d view as well as other functionalities
 * 
 * Many functions can be called with a reference to that component
 */
class Map extends Component {

  OBSERVER_KEY = uuid();

  constructor (props) {
    super(props);

    // save the userPosition (coordinates), locationMarkerId (id that links to the marker of the geolocation),
    // nbFeatures (number of markers), gpsMode (are 3d functionalities active), and the chosen tile layer
    this.state = {
      userPosition: null,
      locationMarkerId: null,

      nbFeatures: 0,

      gpsMode: props.gpsMode,
      activeTileLayer: TileLayersDetails['OSM'].value
    };

    // build refs to inner components
    this.mapDomRef = React.createRef();
    this.popupDomRef = React.createRef();
    this.overlay3DRef = React.createRef();

    // Addiitonal controls
    this.additionalControlsDomRef = React.createRef();
    this.layerControlsDomRef = React.createRef();
    this.attributionsDomRef = React.createRef();

    // Initialize map
    this.initializeMap();
  }

  componentDidMount = () => {

    // Add an observer when the window is resized
    // This rerender the map automatically for better aspect ratio
    ResizeService.addObserver(this.invalidateMap, this.OBSERVER_KEY);

    // Get permission of getting the user location
    PermissionService.location.askPermission()
      .then(() => PermissionService.addObserver(this.onUserPositionChanged, this.OBSERVER_KEY))
      .catch(ErrorService.manageError);
  };

  componentWillUnmount = () => {

    // remove observers
    ResizeService.removeObserver(this.OBSERVER_KEY);
    PermissionService.removeObserver(this.OBSERVER_KEY);

    // deleting map
    this.map.dispose();
  };

  // the component rerenders if the number of features changed of if the gps mode is enabled / disabled
  shouldComponentUpdate = (_, nextState) => {
    if(nextState.nbFeatures !== this.state.nbFeatures) {
      this.setState({nbFeatures: nextState.nbFeatures});
    }
    if(nextState.gpsMode !== this.state.gpsMode) {
      this.setState({gpsMode: nextState.gpsMode});
    }
    return true;
  };

  // Map initialization
  initializeMap() {

    // init view with EPSG:3857 propjection
    this.view = new View({center: [255419.107329, 6250857.744477], zoom: 7, projection: 'EPSG:3857'});

    // build map
    this.map = new OlMap({
      controls: defaults({attribution: false}),
      view: this.view,
      layers: [TileLayersDetails.OSM.layer]
    });

    /* MARKERS */

    // add a layer for markers
    this.markerVectorSource = new VectorSource({ features: [] });

    // add this layer to the map
    this.map.addLayer(new VectorLayer({
      source: this.markerVectorSource,
      style: MarkerStyles.getMarkerStyle()
    }));

    /* LOCATION */

    // add a layer for the location marker
    this.locationVectorSource = new VectorSource({ features: [] });

    // add this layer to the map
    this.map.addLayer(new VectorLayer({
      source: this.locationVectorSource,
      style: MarkerStyles.getLocationStyle()
    }));

    /* POPUP */

    // build a popup overlay
    this.popup = new Overlay({
      element: null,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [-5, -15]
    });

    // add this overlay to the map
    this.map.addOverlay(this.popup);

    /* EVENTS */

    // On click on the map, get the feature at the place the user clicked
    this.map.on('click', event => {
      const FEATURE = this.map.forEachFeatureAtPixel(event.pixel, feature => feature);

      // If a feature is present and a popup is attached to it, open the popup
      if(FEATURE && FEATURE.getProperties().popupContent) {

        // setting the content of the popup
        this.popupDomRef.current.innerHTML = FEATURE.getProperties().popupContent;

        // then show the popup at the feature position
        this.popupDomRef.current.style.display = 'flex';
        this.popup.setPosition(FEATURE.getGeometry().getCoordinates());
      }
      else {

        // close popup
        this.popupDomRef.current.style.display = 'none';
      }
    });

    this.map.on('pointermove', event => {

      // when the cursor moves
      if(event.dragging) {

        // If map is being dragged, close popup
        this.popupDomRef.current.style.display = 'none';
        this.mapDomRef.current.style.cursor = 'grabbing';
        return;
      }

      // else, modify cursor if a feature is at the cursor's place
      let hit = this.map.hasFeatureAtPixel(this.map.getEventPixel(event.originalEvent));
      this.mapDomRef.current.style.cursor = hit ? 'pointer' : 'grab';
    });
  };

  // toggle the gps mode and related 3d functionalities
  toggleGpsMode = () => this.setState({gpsMode: !this.state.gpsMode});

  // change the active tile layer
  changeActiveTileLayer = activeTileLayer => {

    // remove the current tile layer
    this.map.removeLayer(TileLayersDetails[this.state.activeTileLayer].layer);

    // saveing the change
    this.setState({activeTileLayer});

    // then setting the new one behind everything
    this.map.getLayers().insertAt(0, TileLayersDetails[activeTileLayer].layer);
  };

  // When the geolocation is got or changed
  onUserPositionChanged = userPosition => {

    if(!userPosition) { return; }

    // saving the new user posiiton
    this.setState({userPosition});

    // compute the position of user by transforming in the current projection
    let position = new Point(GeoService.transformCoordinates([
      this.state.userPosition.longitude,
      this.state.userPosition.latitude
    ]));

    // If a location marker is present
    if(this.state.locationMarkerId) {

      // get this location feature with the saved id
      let marker = this.locationVectorSource.getFeatureById(this.state.locationMarkerId);

      // and set its position to the user's position
      marker.setGeometry(position);
    }
    else {
      // else, create a new marker by generating an id
      const LOCATION_MARKER_ID = uuid();

      // build the marker and set its id
      const MARKER = new Feature({
        geometry: position,
        popupContent: 'Your position'
      });
      MARKER.setId(LOCATION_MARKER_ID);
      
      // add the marker to the location layer
      this.locationVectorSource.addFeature(MARKER);

      // save the id
      this.setState({ locationMarkerId: LOCATION_MARKER_ID });
    }
  };

  // center the map on the current user position
  centerOnUserPosition = () => {

    // if no location marker id is present, we do not have the current user position => return
    if(!this.state.locationMarkerId) {
      return;
    }

    // Get the feature of the location
    const FEATURE = this.locationVectorSource.getFeatureById(this.state.locationMarkerId);

    // Then, center the map on this feature, with 1000 meters on each side and with a 1000ms animation
    this.view.fit(buffer(FEATURE.getGeometry().getExtent(), 1000), {duration: 1000});

    // Display the popup of the location marker
    this.popupDomRef.current.innerHTML = FEATURE.getProperties().popupContent;
    this.popupDomRef.current.style.display = 'flex';
    this.popup.setPosition(FEATURE.getGeometry().getCoordinates());
  };

  // Invalidating map, when the map is moved and/or resized
  invalidateMap = () => {

    // resetting HTML reference
    this.map.setTarget(this.mapDomRef.current);
    this.popup.setElement(this.popupDomRef.current);

    // Force update and rerender of the map
    this.map.updateSize();

    /* CONTROLS */

    // Adding the 3D overlay
    this.overlay3DRef.current && this.map.addControl(new Control({
      element: this.overlay3DRef.current
    }));

    // Adding other controls
    this.additionalControlsDomRef.current && this.map.addControl(new Control({
      element: this.additionalControlsDomRef.current
    }));

    // Adding the layer controls
    this.layerControlsDomRef.current && this.map.addControl(new Control({
      element: this.layerControlsDomRef.current
    }));

    // Adding the attributions control
    this.attributionsDomRef.current && this.map.addControl(new Control({
      element: this.attributionsDomRef.current
    }));
  };

  // add a maker
  addMarker = (lat, lon, popup) => {

    // generate a new id
    const MARKER_ID = uuid();

    // building a new marker with the generated id
    const MARKER = new Feature({
      geometry: new Point([lat, lon]),
      popupContent: popup
    });
    MARKER.setId(MARKER_ID);
    
    // adding the marker to the layer
    this.markerVectorSource.addFeature(MARKER);

    // incrementing the number of features
    this.setState({nbFeatures: this.state.nbFeatures + 1});

    return MARKER_ID;
  };

  // adding multiple markers
  addMarkers = markersToAdd => {
    const MARKER_IDS = [];
    const FEATURES_TO_ADD_TO_SOURCE = [];

    // for each marker to add
    markersToAdd.forEach(markerToAdd => {

      // generate a new marker id
      const MARKER_ID = uuid();
      
      // building the marker
      let MARKER = new Feature({
        geometry: new Point([markerToAdd.lat, markerToAdd.lon]),
        popupContent: markerToAdd.popup
      });
      MARKER.setId(MARKER_ID);

      // push the id and the marker to temp arrays
      MARKER_IDS.push(MARKER_ID);
      FEATURES_TO_ADD_TO_SOURCE.push(MARKER);
    });

    // Then, add all the new markers to the marker layer at once (more performant)
    this.markerVectorSource.addFeatures(FEATURES_TO_ADD_TO_SOURCE);

    // Then, update the number of features
    this.setState({nbFeatures: this.state.nbFeatures + markersToAdd.length});

    return MARKER_IDS;
  };

  // Change marker properties
  switchMarker = (markerId, lat, lon, popup) => {

    // get the marker by its id
    const MARKER = this.markerVectorSource.getFeatureById(markerId);

    // set the new position
    MARKER.setGeometry(new Point([lat, lon]));

    // set the new popup
    MARKER.set('popupContent', popup);
  };

  // delete a marker by its id
  deleteMarker = markerId => {

    // remove the marker from the map
    this.markerVectorSource.removeFeature(this.markerVectorSource.getFeatureById(markerId));

    // update the number of features
    this.setState({nbFeatures: this.state.nbFeatures - 1});
  };

  // delete all markers
  deleteAllMarkers = () => {
    this.markerVectorSource.clear();

    this.setState({ nbFeatures: 0 });
  };

  // center on a specific marker
  centerOnMarker = markerId => {

    // set timeout is mandatory : it permits to not trigger multiple animations at once
    setTimeout(() => {

      // Get the marker by its id
      const MARKER_GEOMETRY = this.markerVectorSource.getFeatureById(markerId).getGeometry();

      // center the map on the marker, with 1000m on each side
      this.view.fit(buffer(MARKER_GEOMETRY.getExtent(), 1000), {duration: 200});
    }, 250);
  };

  // Recenter the map to view all markers
  centerOnAllMarkers = () => {

    // If no marker is present, do nothing
    if(this.markerVectorSource.isEmpty() || this.state.nbFeatures === 0) {
      return;
    }

    // Generate a timeout to prevent multiple animations at once
    setTimeout(() => {

      // center view on all markers
      this.view.fit(buffer(this.markerVectorSource.getExtent(), 10000), {duration: 200});
    }, 250);
  };

  // open popup of a specific marker
  triggerPopup = markerId => {

    // get the marker
    const FEATURE = this.markerVectorSource.getFeatureById(markerId);

    // if a marker is found
    if(FEATURE) {

      // set the popup content
      this.popupDomRef.current.innerHTML = FEATURE.getProperties().popupContent;

      // and open the popup at the marker position
      this.popupDomRef.current.style.display = 'flex';
      this.popup.setPosition(FEATURE.getGeometry().getCoordinates());
    }
    else {
      // else, close the popup
      this.popupDomRef.current.style.display = 'none';
    }
  };

  // pan to a position
  panTo = (lat, lon) => this.view.animate({ center: fromLonLat([lat, lon]), duration: 2000 });

  // fit specific bounds
  fitBounds = (lat1, lon1, lat2, lon2) => this.view.fit(boundingExtent([[lon1, lat1], [lon2, lat2]]), {duration: 1000});

  /**
   * RENDER
   */
  render() {
    return (
      <div className="Map">
        <span id="map" className={'' + (this.state.gpsMode ? 'map-3d' : '')} ref={this.mapDomRef}>

          {/* popup */}
          <span id="popup" ref={this.popupDomRef}></span>
          
          {/* 3d control */}
          <span id="overlay-3d" ref={this.overlay3DRef} style={{
            backgroundImage: `url(${overlayClouds})`
          }}></span>

          {/* Other controls */}
          <div id="additional-controls" className="ol-control" ref={this.additionalControlsDomRef}>

            {/* Recenter on user position */}
            {this.state.userPosition &&
              <button onClick={this.centerOnUserPosition} className="ol-geolocation ol-additional-control" type="button" title="Center on your position">
                <Icon source="fa" icon={faLocation} />
              </button>
            }

            {/* Recenter on all markers */}
            {this.state.nbFeatures > 0 &&
              <button onClick={this.centerOnAllMarkers} className="ol-center ol-additional-control" type="button" title="Center view">
                <Icon source="fa" icon={faCompress} />
              </button>
            }

            {/* GPS mode toggle */}
            <div className="ol-gps-mode ol-additional-control">
              <button onClick={this.toggleGpsMode} className={'ol-gps-mode-2d ' + (!this.state.gpsMode ? 'ol-gps-mode--active' : '')} type="button" title="Switch to 2D View">
                <span>2D</span>
              </button>
              <button onClick={this.toggleGpsMode} className={'ol-gps-mode-3d ' + (this.state.gpsMode ? 'ol-gps-mode--active' : '')} type="button" title="Switch to 3D View">
                <span>3D</span>
              </button>
            </div>

            {/* tile layer list */}
            <div className="ol-control ol-layer-selector" ref={this.layerControlsDomRef}>
              <div className="ol-layer-selector-selected">

                {/* Current tile layer */}
                <button className="layer--active" title={TileLayersDetails[this.state.activeTileLayer].name}>

                  <img src={TileLayersDetails[this.state.activeTileLayer].preview} alt={TileLayersDetails[this.state.activeTileLayer].name} />
                </button>
                <Icon source="fa" icon={faChevronRight} />
              </div>

              {/* other tile layers */}
              <div className="ol-layer-selector-others">
                {Object.keys(TileLayersDetails).map(tileLayerKey =>

                  /* Generate a button that sets a new tile layer */
                  <button key={tileLayerKey}
                          className={'' + (this.state.activeTileLayer === tileLayerKey ? 'layer--active' : 'layer')} 
                          onClick={() => this.changeActiveTileLayer(tileLayerKey)}
                          title={TileLayersDetails[tileLayerKey].name}>

                    <img src={TileLayersDetails[tileLayerKey].preview} alt={TileLayersDetails[tileLayerKey].name} />
                  </button>
                )}
              </div>
            </div>

            {/* Map attributions, updated according to the current tile layer */}
            <span className="ol-attributions" ref={this.attributionsDomRef}>
              <span className="ol-attributions-button">
                <Icon source="fa" icon={faInfo} />
              </span>
              <span className="ol-attributions-content">
                {this.state.activeTileLayer && TileLayersDetails[this.state.activeTileLayer].attributions}
              </span>
            </span>
          </div>
        </span>
      </div>
    );
  }
}

export default Map;