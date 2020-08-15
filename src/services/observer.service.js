
/**
 * Service: ObserverService
 * Util for other services
 */
const ObserverService = {
  _observersByType: {},

  // Declare all observer-related function in the object passed in parameter (likedly a service)
  // type: string | unique type of the observer. Used as a channel.
  // options: object | observer options
  //    startWatcher: function | function to call when registering the first observer. Serves as initialization of data and event adding
  //    stopWatcher: function | function to call when unregistering last observer. Serves as data cleaning and event removing
  //    computeChanges: function | When a component notify that he changed the data, this function is called. It must update the oberved data
  //    getData: function | Return the computed data. This function should not compute data
  initialize: (obj, type, options) => {

    const RES_OBJECT = {};

    // Update observers take all registered observers, get the data and send each the data
    RES_OBJECT.updateObservers = () => {

      // Get data
      const DATA_RESULT = options.getData ? options.getData() : Promise.resolve({});

      return Promise.resolve(DATA_RESULT).then(data => {

        // Loop through observers
        Object.keys(ObserverService._observersByType[type].observers).forEach(observerKey => {
          if(!ObserverService._observersByType[type].observers[observerKey]) { return; }

          // Call the observer callback
          ObserverService._observersByType[type].observers[observerKey](data);
        });
      });
    }

    // Notify changes ask to recompute the data, then it updates the observers
    // If everthing is setup correctly, new data will be fetched by update observers
    if(options.computeChanges) {
      RES_OBJECT.notifyChanges = () => Promise.resolve(options.computeChanges()).then(RES_OBJECT.updateObservers);
    }

    // Add an observer
    RES_OBJECT.addObserver = (callback, id) => {

      // save the callback into the list of observers
      ObserverService._observersByType[type].observers[id] = callback;

      // If a watcher should be added and it's the first observer, start the watcher
      // In all cases, update the observers
      return new Promise(resolve => {
        Promise.resolve(
          (options.startWatcher && ObserverService._computeNbObserversByType(type) === 1) ?
            options.startWatcher({ updateObservers: RES_OBJECT.updateObservers, notifyChanges: RES_OBJECT.notifyChanges }) : {}
        ).then(RES_OBJECT.updateObservers().then(resolve));
      });
    };

    // Remove the observer passing the unique id passed when registering it
    RES_OBJECT.removeObserver = id => {

      // remove observer
      delete ObserverService._observersByType[type].observers[id];

      // Stop the watcher if a watcher was registered and if it was the last observer
      // In all cases, update the observers
      return new Promise(resolve => {
        Promise.resolve(
          (options.stopWatcher && ObserverService._computeNbObserversByType(type) === 0) ?
            options.stopWatcher({ updateObservers: RES_OBJECT.updateObservers, notifyChanges: RES_OBJECT.notifyChanges }) : {}
        ).then(RES_OBJECT.updateObservers().then(resolve));
      });
    };
    

    // Save the options for further uses
    ObserverService._observersByType[type] = {
      type,
      observers: [],
      options,
      obj: RES_OBJECT
    };
    

    Object.assign(obj, RES_OBJECT);
  },

  // Util function to compute the number of observers
  _computeNbObserversByType: type => Object.values(ObserverService._observersByType[type].observers).filter(obs => !!obs).length
};

export default ObserverService;
