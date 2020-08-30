import React from 'react';

export const SEARCH_PLACES = [
  {
    address: { road: 'Impasse 1', city: 'City 1', country: 'None' },
    boundingBox: [ '-1', '-1', '1', '1' ],
    coordinates: [ 0, 0 ],
    display_name: 'Impasse 1, City 1, None',
    importance: 0.05,
    lat: '0',
    lon: '0',
    osm_id: 1,
    osm_type: 'way',
    place_id: 1001,
    type: 'road'
  },
  {
    address: { road: 'Road 1', city: 'City 1', country: 'None' },
    boundingBox: [ '-2', '-2', '0', '0' ],
    coordinates: [ -1, -1 ],
    display_name: 'Road 1, City 1, None',
    importance: 0.15,
    lat: '-1',
    lon: '-1',
    osm_id: 2,
    osm_type: 'way',
    place_id: 1002,
    type: 'road'
  }
];

const GeoService = {
  computeBoundingBox: () => null,
  transformCoordinates: lonLat => lonLat,
  searchPlaces: jest.fn(() => Promise.resolve(SEARCH_PLACES)),
  getApproximateLocation: () => Promise.resolve({
    country_name: 'COUNTRY_TEST',
    city: 'CITY_TEST',
    latitude: 0,
    longitude: 0,
    IPv4: '105.105.105.250'
  })
};

// Global styles for the location marker and other markers
export const MarkerStyles = {
  getLocationStyle: () => {
    return {};
  },
  getMarkerStyle: () => {
    return {};
  }
};

export const TileLayersDetails = {
  OSM: {
    value: 'OSM',
    layer: {},
    name: 'OpenStreetMap',
    attributions: <span>
      <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap Contributors</a>
    </span>,
    preview: null
  },
  BING_ROAD: {
    value: 'BING_ROAD',
    layer: {},
    name: 'Bing Maps / Roads',
    attributions: <span>
      <a href="https://www.microsoft.com/en-us/maps/product">Microsoft Bing Maps Platform APIs</a>
    </span>,
    preview: null
  },
  BING_AERIAL: {
    value: 'BING_AERIAL',
    layer: {},
    name: 'Bing Maps / Aerial',
    attributions: <span>
      <a href="https://www.microsoft.com/en-us/maps/product">Microsoft Bing Maps Platform APIs</a>
    </span>,
    preview: null
  },
  BING_ROAD_DARK: {
    value: 'BING_ROAD_DARK',
    layer: {},
    name: 'Bing Maps / Roads Dark',
    attributions: <span>
      <a href="https://www.microsoft.com/en-us/maps/product">Microsoft Bing Maps Platform APIs</a>
    </span>,
    preview: null
  },
  BING_ROAD_LIGHT: {
    value: 'BING_ROAD_LIGHT',
    layer: {},
    name: 'Bing Maps / Roads Light',
    attributions: <span>
      <a href="https://www.microsoft.com/en-us/maps/product">Microsoft Bing Maps Platform APIs</a>
    </span>,
    preview: null
  },
  BING_ROAD_GRAY: {
    value: 'BING_ROAD_GRAY',
    layer: {},
    name: 'Bing Maps / Roads Gray',
    attributions: <span>
      <a href="https://www.microsoft.com/en-us/maps/product">Microsoft Bing Maps Platform APIs</a>
    </span>,
    preview: null
  },
  THUNDERFOREST_CYCLE: {
    value: 'THUNDERFOREST_CYCLE',
    layer: {},
    name: 'Cycle by ThunderForest',
    attributions: <span>
      <a href="https://www.thunderforest.com/">Maps © Thunderforest</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: null
  },
  THUNDERFOREST_TRANSPORT: {
    value: 'THUNDERFOREST_TRANSPORT',
    layer: {},
    name: 'Transport by ThunderForest',
    attributions: <span>
      <a href="https://www.thunderforest.com/">Maps © Thunderforest</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: null
  },
  THUNDERFOREST_TRANSPORT_DARK: {
    value: 'THUNDERFOREST_TRANSPORT_DARK',
    layer: {},
    name: 'Transport/Dark by ThunderForest',
    attributions: <span>
      <a href="https://www.thunderforest.com/">Maps © Thunderforest</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: null
  },
  THUNDERFOREST_RAIL: {
    value: 'THUNDERFOREST_RAIL',
    layer: {},
    name: 'Rail/Pioneer by ThunderForest',
    attributions: <span>
      <a href="https://www.thunderforest.com/">Maps © Thunderforest</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: null
  },
  THUNDERFOREST_NEIGHBOURHOOD: {
    value: 'THUNDERFOREST_NEIGHBOURHOOD',
    layer: {},
    name: 'Neighbourhood by ThunderForest',
    attributions: <span>
      <a href="https://www.thunderforest.com/">Maps © Thunderforest</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: null
  },
  ARCGIS: {
    value: 'ARCGIS',
    layer: {},
    name: 'ArcGis Topographic Map',
    attributions: <span>
      <a href="https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer">Esri, HERE, Garmin</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: null
  },
  CARTO_LIGHT: {
    value: 'CARTO_LIGHT',
    layer: {},
    name: 'Light Theme by CartoDB',
    attributions: <span>
      <a href="https://carto.com/">© CARTO</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: null
  },
  CARTO_DARK: {
    value: 'CARTO_DARK',
    layer: {},
    name: 'Dark Theme by CartoDB',
    attributions: <span>
      <a href="https://carto.com/">© CARTO</a>
      <a href="https://www.openstreetmap.org/copyright"> / © OpenStreetMap Contributors</a>
    </span>,
    preview: null
  }
};

export default GeoService;
