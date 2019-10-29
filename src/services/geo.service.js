import React from 'react';

import { boundingExtent, buffer } from 'ol/extent';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import { Tile as TileLayer } from 'ol/layer';
import { OSM, BingMaps } from 'ol/source';

import ColorService from './color.service';

import DotMarkerIcon from './../assets/dot.png';

import ARCGIS_PREVIEW from './../assets/map/tilelayers/ARCGIS.png';
import BING_AERIAL_PREVIEW from './../assets/map/tilelayers/BING_AERIAL.png';
import BING_ROAD_PREVIEW from './../assets/map/tilelayers/BING_ROAD.png';
import BING_ROAD_DARK_PREVIEW from './../assets/map/tilelayers/BING_ROAD_DARK.png';
import BING_ROAD_GRAY_PREVIEW from './../assets/map/tilelayers/BING_ROAD_GRAY.png';
import BING_ROAD_LIGHT_PREVIEW from './../assets/map/tilelayers/BING_ROAD_LIGHT.png';
import CARTO_DARK_PREVIEW from './../assets/map/tilelayers/CARTO_DARK.png';
import CARTO_LIGHT_PREVIEW from './../assets/map/tilelayers/CARTO_LIGHT.png';
import OSM_PREVIEW from './../assets/map/tilelayers/OSM.png';
import THUNDERFOREST_CYCLE_PREVIEW from './../assets/map/tilelayers/THUNDERFOREST_CYCLE.png';
import THUNDERFOREST_NEIGHBOURHOOD_PREVIEW from './../assets/map/tilelayers/THUNDERFOREST_NEIGHBOURHOOD.png';
import THUNDERFOREST_RAIL_PREVIEW from './../assets/map/tilelayers/THUNDERFOREST_RAIL.png';
import THUNDERFOREST_TRANSPORT_PREVIEW from './../assets/map/tilelayers/THUNDERFOREST_TRANSPORT.png';
import THUNDERFOREST_TRANSPORT_DARK_PREVIEW from './../assets/map/tilelayers/THUNDERFOREST_TRANSPORT_DARK.png';

import Keys from './../params.inc';
import { XYZ } from 'ol/source';

export const MarkerStyles = {
  getLocationStyle: () => {
    return new Style({
      image: new Icon({
        color: '#4A80FF',
        src: DotMarkerIcon
      })
    });
  },
  getMarkerStyle: () => {
    return new Style({
      image: new Icon({
        color: ColorService.getSecondColor(),
        src: DotMarkerIcon
      })
    });
  }
};

export const TileLayersDetails = {
  OSM: {
    value: 'OSM',
    layer: new TileLayer({ source: new OSM() }),
    name: 'OpenStreetMap',
    attributions: <span>
      <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap Contributors</a>
    </span>,
    preview: OSM_PREVIEW
  },
  BING_ROAD: {
    value: 'BING_ROAD',
    layer: new TileLayer({ 
      source: new BingMaps({
        maxZoom: 19,
        imagerySet: 'RoadOnDemand',
        key: Keys.bingMaps
      })
    }),
    name: 'Bing Maps / Roads',
    attributions: <span>
      <a href="https://www.microsoft.com/en-us/maps/product">Microsoft Bing Maps Platform APIs</a>
    </span>,
    preview: BING_ROAD_PREVIEW
  },
  BING_AERIAL: {
    value: 'BING_AERIAL',
    layer: new TileLayer({ 
      source: new BingMaps({
        maxZoom: 19,
        imagerySet: 'Aerial',
        key: Keys.bingMaps
      })
    }),
    name: 'Bing Maps / Aerial',
    attributions: <span>
      <a href="https://www.microsoft.com/en-us/maps/product">Microsoft Bing Maps Platform APIs</a>
    </span>,
    preview: BING_AERIAL_PREVIEW
  },
  BING_ROAD_DARK: {
    value: 'BING_ROAD_DARK',
    layer: new TileLayer({ 
      source: new BingMaps({
        maxZoom: 19,
        imagerySet: 'CanvasDark',
        key: Keys.bingMaps
      })
    }),
    name: 'Bing Maps / Roads Dark',
    attributions: <span>
      <a href="https://www.microsoft.com/en-us/maps/product">Microsoft Bing Maps Platform APIs</a>
    </span>,
    preview: BING_ROAD_DARK_PREVIEW
  },
  BING_ROAD_LIGHT: {
    value: 'BING_ROAD_LIGHT',
    layer: new TileLayer({ 
      source: new BingMaps({
        maxZoom: 19,
        imagerySet: 'CanvasLight',
        key: Keys.bingMaps
      })
    }),
    name: 'Bing Maps / Roads Light',
    attributions: <span>
      <a href="https://www.microsoft.com/en-us/maps/product">Microsoft Bing Maps Platform APIs</a>
    </span>,
    preview: BING_ROAD_LIGHT_PREVIEW
  },
  BING_ROAD_GRAY: {
    value: 'BING_ROAD_GRAY',
    layer: new TileLayer({ 
      source: new BingMaps({
        maxZoom: 19,
        imagerySet: 'CanvasGray',
        key: Keys.bingMaps
      })
    }),
    name: 'Bing Maps / Roads Gray',
    attributions: <span>
      <a href="https://www.microsoft.com/en-us/maps/product">Microsoft Bing Maps Platform APIs</a>
    </span>,
    preview: BING_ROAD_GRAY_PREVIEW
  },
  THUNDERFOREST_CYCLE: {
    value: 'THUNDERFOREST_CYCLE',
    layer: new TileLayer({
      source: new OSM({
        url: `https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${Keys.thunderforest}`
      })
    }),
    name: 'Cycle by ThunderForest',
    attributions: <span>
      <a href="https://www.thunderforest.com/">Maps © Thunderforest</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: THUNDERFOREST_CYCLE_PREVIEW
  },
  THUNDERFOREST_TRANSPORT: {
    value: 'THUNDERFOREST_TRANSPORT',
    layer: new TileLayer({
      source: new OSM({
        url: `https://{a-c}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=${Keys.thunderforest}`
      })
    }),
    name: 'Transport by ThunderForest',
    attributions: <span>
      <a href="https://www.thunderforest.com/">Maps © Thunderforest</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: THUNDERFOREST_TRANSPORT_PREVIEW
  },
  THUNDERFOREST_TRANSPORT_DARK: {
    value: 'THUNDERFOREST_TRANSPORT_DARK',
    layer: new TileLayer({
      source: new OSM({
        url: `https://{a-c}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=${Keys.thunderforest}`
      })
    }),
    name: 'Transport/Dark by ThunderForest',
    attributions: <span>
      <a href="https://www.thunderforest.com/">Maps © Thunderforest</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: THUNDERFOREST_TRANSPORT_DARK_PREVIEW
  },
  THUNDERFOREST_RAIL: {
    value: 'THUNDERFOREST_RAIL',
    layer: new TileLayer({
      source: new OSM({
        url: `https://{a-c}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=${Keys.thunderforest}`
      })
    }),
    name: 'Rail/Pioneer by ThunderForest',
    attributions: <span>
      <a href="https://www.thunderforest.com/">Maps © Thunderforest</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: THUNDERFOREST_RAIL_PREVIEW
  },
  THUNDERFOREST_NEIGHBOURHOOD: {
    value: 'THUNDERFOREST_NEIGHBOURHOOD',
    layer: new TileLayer({
      source: new OSM({
        url: `https://{a-c}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=${Keys.thunderforest}`
      })
    }),
    name: 'Neighbourhood by ThunderForest',
    attributions: <span>
      <a href="https://www.thunderforest.com/">Maps © Thunderforest</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: THUNDERFOREST_NEIGHBOURHOOD_PREVIEW
  },
  ARCGIS: {
    value: 'ARCGIS',
    layer: new TileLayer({
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
      })
    }),
    name: 'ArcGis Topographic Map',
    attributions: <span>
      <a href="https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer">Esri, HERE, Garmin</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: ARCGIS_PREVIEW
  },
  CARTO_LIGHT: {
    value: 'CARTO_LIGHT',
    layer: new TileLayer({
      source: new XYZ({
        url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
      })
    }),
    name: 'Light Theme by CartoDB',
    attributions: <span>
      <a href="https://carto.com/">© CARTO</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: CARTO_LIGHT_PREVIEW
  },
  CARTO_DARK: {
    value: 'CARTO_DARK',
    layer: new TileLayer({
      source: new XYZ({
        url: 'https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
      })
    }),
    name: 'Dark Theme by CartoDB',
    attributions: <span>
      <a href="https://carto.com/">© CARTO</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: CARTO_DARK_PREVIEW
  }
};

const GeoService = {
  computeBoundingBox(markers, margin = .5) {
    return buffer(boundingExtent(markers), margin);
  },
  transformCoordinates(lonLat) {
    return fromLonLat(lonLat, 'EPSG:3857');
  }
};

export default GeoService;
