
import ErrorService from './error.service';

/**
 * Service: PermissionService
 * Service that manages browser permissions
 */
const PermissionService = {

  // Loaction permission
  location: {

    // save if permission is granted or not
    __granted: false,

    // location listeneres
    __observers: {},

    // Watcher id for permission
    __watchId: null,

    // Ask the location permission
    askPermission: () => {

      // warning: if the user does not interact with the permission tooltip, the promise will stay opened
      return new Promise((resolve, reject) => {

        // If browser is not compatible, reject
        if(!('geolocation' in navigator)) {
          return reject('Geolocation is not compatible with your browser');
        }
  
        // if permission is already granted, resolve
        if(PermissionService.location.__granted) {
          return resolve();
        }

        // ask for permission
        navigator.permissions.query({name: 'geolocation'}).then(result => {

          // listen for permission result 
          PermissionService.location.__onLocationPermissionChanged(result, resolve, reject);
        });
      });
    },

    // When the location permission changed
    __onLocationPermissionChanged: (result, resolve, reject) => {

      // if the permission is granted
      if(result.state === 'granted') {

        // save this
        PermissionService.location.__granted = true;

        // and resolve
        resolve && resolve();
      }
      else if(result.state === 'prompt') {

        // If the prompt is re-opened, re-register this function as the location permission listener
        result.onchange = PermissionService.location.__onLocationPermissionChanged;
      }
      else {

        // else, permission is either in unknown state (not compatible) or denied, so reject
        reject && reject('Location permission was denied');
      }
    },

    // Get the location. Ask the permission first and wait for result!
    getLocation: () => {
      return new Promise((resolve, reject) => {

        // If permission is not granted, it means that permission was not asked at first
        if(!PermissionService.location.__granted) {
          return reject('Location was asked before permission was given. Ask for location permission before trying to locate.');
        }

        // Else, if it is granted, get the current position
        navigator.geolocation.getCurrentPosition(position => resolve(position.coords));
      });
    },

    // add an observer about location. Ask permission first!
    addLocationObserver: (locationObserverCallback, observerKey) => {

      return new Promise((resolve, reject) => {
        
        // If permission is not granted, it means that the permission was not given first.
        if(!PermissionService.location.__granted) {
          return reject('Location Observation was asked before permission was given. Ask for location permission before trying to locate.');
        }

        // Add the observer to the observer array
        PermissionService.location.__observers[observerKey] = locationObserverCallback;

        // If there is at least one observer
        if(PermissionService.location.__computeObserverNumber() >= 1) {

          // watch for location
          PermissionService.location.__watchLocation();
        }

        // also, get the locaiton and notify all location observers so that all components have the same position
        PermissionService.location.getLocation()
          .then(positionCoords => PermissionService.location.__notifyLocationObservers(positionCoords))
          .catch(ErrorService.manageError);
        resolve(observerKey);
      });
    },

    // Remove an observer. Pass the same unique observer key that passed when registering your obserer
    removeLocationObserver: observerKey => {

      // If the observer is already not part of the observers anymore, just return
      if(!PermissionService.location.__observers[observerKey]) { return; }

      // Delete the observer
      delete PermissionService.location.__observers[observerKey];
      PermissionService.location.__observers[observerKey] = null;

      // If there is no observers anymore, remove location watcher
      if(PermissionService.location.__computeObserverNumber() === 0) {
        PermissionService.location.__unwatchLocation();
      }
    },

    // Watch for location
    __watchLocation: () => {

      // If permission is not granted, just ignore
      if(!PermissionService.location.__granted) {
        return;
      }

      // Watch the location and save the watcher id
      PermissionService.location.__watchId = navigator.geolocation.watchPosition(

        // at each position update, notify the location observers
        position => PermissionService.location.__notifyLocationObservers(position.coords),

        // If there is an error, manage it
        ErrorService.manageError,

        // Options: enable high accuracy
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5000
        });
    },

    // Notify all observers with the position passed as parameter
    __notifyLocationObservers: positionCoords => {

      // loop through observers
      Object.values(PermissionService.location.__observers).forEach(observer => {

        // and call them with the new position
        observer && observer(positionCoords);
      });
    },

    // Remove the watcher
    __unwatchLocation: () => {

      // If a watcher is registered
      if(PermissionService.location.__watchId) {

        // Clear the watcher
        navigator.geolocation.clearWatch(PermissionService.location.__watchId);
      }
    },

    // Compute the number of location observers
    __computeObserverNumber: () => Object.values(PermissionService.location.__observers).filter(obs => !!obs).length
  }
};

export default PermissionService;
