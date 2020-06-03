import { ERights } from './../right.service';

import DataService, { ensureFilledFields } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

const WeatherService = {
  rights: {
    [ERights.RIGHT_WEATHER_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_WEATHER_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_WEATHER_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_WEATHER_UPDATE]: () => false,
    [ERights.RIGHT_WEATHER_DELETE]: () => false
  },
  create: weather => {
    if(!WeatherService.rights[ERights.RIGHT_WEATHER_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Weather' });
    }

    if(!ensureFilledFields(weather, ['date', 'latitude', 'longitude', 'main', 'name', 'temp', 'icon'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['date', 'latitude', 'longitude', 'main', 'name', 'temp', 'icon'] });
    }

    return FirebaseService.getFirestore().collection('weather').add(weather);
  },
  get: weatherId => {
    if(!WeatherService.rights[ERights.RIGHT_WEATHER_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Weather' });
    }
    return FirebaseService.getFirestore().collection('weather').doc(weatherId).get();
  },
  list: () => {
    if(!WeatherService.rights[ERights.RIGHT_WEATHER_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Weathers' });
    }

    const weathers = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('weather').get()
            .then(querySnapshot => {
                querySnapshot.forEach(weatherDoc => weathers[weatherDoc.id] = weatherDoc.data());
                resolve(weathers);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (weatherId, weather) => {
    if(!WeatherService.rights[ERights.RIGHT_WEATHER_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Weather' });
    }

    if(!ensureFilledFields(weather, ['date', 'latitude', 'longitude', 'main', 'name', 'temp', 'icon'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['date', 'latitude', 'longitude', 'main', 'name', 'temp', 'icon'] });
    }

    return FirebaseService.getFirestore().collection('weather').doc(weatherId).set(weather);
  },
  updateField: (weatherId, weatherField) => {
    if(!WeatherService.rights[ERights.RIGHT_WEATHER_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Weather' });
    }
    
    return FirebaseService.getFirestore().collection('weather').doc(weatherId).update(weatherField);
  },
  delete: weatherId => {
    if(!WeatherService.rights[ERights.RIGHT_WEATHER_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Weather' });
    }
    
    return FirebaseService.getFirestore().collection('weather').doc(weatherId).delete();
  },

  // CUSTOM FUNCTIONS
  getByLatAndLon: (lon, lat) => {
    if(!WeatherService.rights[ERights.RIGHT_WEATHER_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Weathers' });
    }

    const currentDateLitteral = (new Date()).toISOString().substring(0, 14);
    const longitudeLitteral = Math.floor(parseFloat(lon) * 100) / 100;
    const latitudeLitteral = Math.floor(parseFloat(lat) * 100) / 100;

    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('weather')
        .where('date', '==', currentDateLitteral)
        .where('longitude', '==', longitudeLitteral)
        .where('latitude', '==', latitudeLitteral)
        .limit(1)
        .get()
        .then(querySnapshot => {
            if(querySnapshot.empty) {
                resolve(null);
            }
            else {
                resolve(querySnapshot.docs[0].data());
            }
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  }
};

export default WeatherService;
