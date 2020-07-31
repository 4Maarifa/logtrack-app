
import ErrorService from './error.service';
import ObserverService from './observer.service';

const GEOLOCATION_API_OPTIONS = { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 };

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
    }
  },

  _watcher: null,
  _location: null
};

ObserverService.initialize(PermissionService, 'LOCATION', {
  startWatcher: ({ updateObservers }) => PermissionService._watcher = navigator.geolocation.watchPosition(p => {
    PermissionService._location = p;
    updateObservers();
  }, ErrorService.manageError, GEOLOCATION_API_OPTIONS),
  endWatcher: () => navigator.geolocation.clearWatch(PermissionService._watcher),
  getData: () => PermissionService._location
});

export default PermissionService;
