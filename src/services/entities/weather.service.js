import { ERights } from './../right.service';

import DataService, { ensureFilledFields } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

/**
 * Service: WeatherService
 * Service to manage weather entities
 */
const WeatherService = {

  // Rights for weather entities
  rights: {
    [ERights.RIGHT_WEATHER_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_WEATHER_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_WEATHER_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_WEATHER_UPDATE]: () => false,
    [ERights.RIGHT_WEATHER_DELETE]: () => false
  },

  create: weather => {

    // Rights
    if(!WeatherService.rights[ERights.RIGHT_WEATHER_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Weather' });
    }

    // Minimum data
    if(!ensureFilledFields(weather, ['date', 'latitude', 'longitude', 'main', 'name', 'temp', 'icon'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['date', 'latitude', 'longitude', 'main', 'name', 'temp', 'icon'] });
    }

    // create
    return FirebaseService.getFirestore().collection('weather').add(weather);
  },
  get: weatherId => {

    // Rights
    if(!WeatherService.rights[ERights.RIGHT_WEATHER_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Weather' });
    }

    // get
    return FirebaseService.getFirestore().collection('weather').doc(weatherId).get();
  },
  list: () => {

    // Rights
    if(!WeatherService.rights[ERights.RIGHT_WEATHER_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Weathers' });
    }

    // List all weathers
    const WEATHERS = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('weather').get()
            .then(querySnapshot => {
              // Build result object, then resolve with it
              querySnapshot.forEach(weatherDoc => WEATHERS[weatherDoc.id] = weatherDoc.data());
              resolve(WEATHERS);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (weatherId, weather) => {

    // Rights
    if(!WeatherService.rights[ERights.RIGHT_WEATHER_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Weather' });
    }

    // Minimum data
    if(!ensureFilledFields(weather, ['date', 'latitude', 'longitude', 'main', 'name', 'temp', 'icon'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['date', 'latitude', 'longitude', 'main', 'name', 'temp', 'icon'] });
    }

    // update
    return FirebaseService.getFirestore().collection('weather').doc(weatherId).set(weather);
  },
  updateField: (weatherId, weatherField) => {

    // Rights
    if(!WeatherService.rights[ERights.RIGHT_WEATHER_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Weather' });
    }

    // update    
    return FirebaseService.getFirestore().collection('weather').doc(weatherId).update(weatherField);
  },
  delete: weatherId => {

    // Rights
    if(!WeatherService.rights[ERights.RIGHT_WEATHER_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Weather' });
    }
    
    // delete
    return FirebaseService.getFirestore().collection('weather').doc(weatherId).delete();
  },

  // CUSTOM FUNCTIONS

  // Get the recent weather at a position
  getRecentByLatAndLon: (lon, lat) => {

    // Rights
    if(!WeatherService.rights[ERights.RIGHT_WEATHER_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Weathers' });
    }

    // Compute the date, longitude and latitude litteral (removeing precision)
    const CURRENT_DATE_LITTERAL = (new Date()).toISOString().substring(0, 14),
      LONGITUDE_LITTERAL = Math.floor(parseFloat(lon) * 100) / 100,
      LATITUDE_LITTERAL = Math.floor(parseFloat(lat) * 100) / 100;

    // get the weather for the date and posiiton
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('weather')
        .where('date', '==', CURRENT_DATE_LITTERAL)
        .where('longitude', '==', LONGITUDE_LITTERAL)
        .where('latitude', '==', LATITUDE_LITTERAL)
        .limit(1)
        .get()
        .then(querySnapshot => {

          // If no weather, resolve with null
          if(querySnapshot.empty) {
            resolve(null);
          }
          else {
            // else, resolve with the data
            resolve(querySnapshot.docs[0].data());
          }
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  }
};

export default WeatherService;
