const uuidv4 = require('uuid/v4');

var observers = {};

const ResizeService = {
  addObserver(observerCallback) {
    const observerKey = uuidv4();
    observers[observerKey] = observerCallback;
    observerCallback();
    return observerKey;
  },
  removeObserver(observerKey) {
    delete observers[observerKey];
    observers[observerKey] = null;
  },
  updateObservers() {
    for(const value of Object.values(observers)) {
      !!value && (typeof value === 'function') && value();
    }
  }
};

export default ResizeService;
