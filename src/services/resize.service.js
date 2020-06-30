
/**
 * Service: ResizeService
 * Listen for resize and reload events
 */
const ResizeService = {

  // Observer list
  _observers: {},

  // Add an observer
  addObserver: (observerCallback, observerKey) => {

    // add the observer to the list
    ResizeService._observers[observerKey] = observerCallback;

    // call it immediately
    observerCallback();

    return observerKey;
  },

  // Remove an observer, passing the same unique observerKey than on observer registration
  removeObserver: observerKey => {

    // remove the observer from the list
    delete ResizeService._observers[observerKey];
    ResizeService._observers[observerKey] = null;
  },

  // Update observers: call each observer
  updateObservers: () => Object.values(ResizeService._observers)
    .forEach(observer => observer && (typeof observer === 'function') && observer())
};

export default ResizeService;
