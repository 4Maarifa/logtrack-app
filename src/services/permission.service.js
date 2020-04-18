
import ErrorService from './error.service';

const PermissionService = {
  location: {
    __granted: false,
    __observers: {},
    __watchId: null,

    askPermission: () => {
      return new Promise((resolve, reject) => {
        if(!('geolocation' in navigator)) {
          return reject('Geolocation is not compatible with your browser');
        }
  
        if(!!PermissionService.location.__granted) {
          return resolve();
        }
        navigator.permissions.query({name: 'geolocation'}).then(result => {
          PermissionService.location.__onLocationPermissionChanged(result, resolve, reject);
        });
      });
    },
    getLocation: () => {
      return new Promise((resolve, reject) => {
        if(!PermissionService.location.__granted) {
          return reject('Location was asked before permission was given. Ask for location permission before trying to locate.');
        }

        navigator.geolocation.getCurrentPosition(position => {
          return resolve(position.coords);
        });
      });
    },
    addLocationObserver: (locationObserverCallback, observerKey) => {
      return new Promise((resolve, reject) => {
        
        if(!PermissionService.location.__granted) {
          return reject('Location Observation was asked before permission was given. Ask for location permission before trying to locate.');
        }

        PermissionService.location.__observers[observerKey] = locationObserverCallback;
        if(PermissionService.location.__computeObserverNumber() > 1) {
          PermissionService.location.__watchLocation();
        }
        PermissionService.location.getLocation()
          .then(positionCoords => PermissionService.location.__notifyLocationObservers(positionCoords))
          .catch(ErrorService.manageError);
        resolve(observerKey);
      });
    },
    removeLocationObserver: observerKey => {
      if(!PermissionService.location.__observers[observerKey]) { return; }
      delete PermissionService.location.__observers[observerKey];
      PermissionService.location.__observers[observerKey] = null;
      if(PermissionService.location.__computeObserverNumber() === 0) {
        PermissionService.location.__unwatchLocation();
      }
    },
    __watchLocation: () => {
      if(!PermissionService.location.__granted) {
        return;
      }

      PermissionService.location.__watchId = navigator.geolocation.watchPosition(
        position => {
          PermissionService.location.__notifyLocationObservers(position.coords);
        },
        ErrorService.manageError,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5000
        });
    },
    __notifyLocationObservers: (positionCoords) => {
      Object.values(PermissionService.location.__observers).forEach(observer => {
        !!observer && observer(positionCoords);
      });
    },
    __unwatchLocation: () => {
      if(!!PermissionService.location.__watchId) {
        navigator.geolocation.clearWatch(PermissionService.location.__watchId);
      }
    },
    __onLocationPermissionChanged: (result, resolve, reject) => {
      if(result.state === 'granted') {
        PermissionService.location.__granted = true;
        !!resolve && resolve();
      }
      else if(result.state === 'prompt') {
        result.onchange = PermissionService.location.__onLocationPermissionChanged;
      }
      else {
        !!reject && reject('Location permission was denied');
      }
    },
    __computeObserverNumber: () => {
      var nbObservers = 0;
      Object.values(PermissionService.location.__observers).forEach(observer => {
        if(!!observer) {
          nbObservers++;
        }
      });
      return nbObservers;
    }
  }
};

export default PermissionService;
