
const ResizeService = {
  _observers: {},
  addObserver(observerCallback, observerKey) {
    ResizeService._observers[observerKey] = observerCallback;
    observerCallback();
    return observerKey;
  },
  removeObserver(observerKey) {
    delete ResizeService._observers[observerKey];
    ResizeService._observers[observerKey] = null;
  },
  updateObservers() {
    for(const value of Object.values(ResizeService._observers)) {
      value && (typeof value === 'function') && value();
    }
  }
};

export default ResizeService;
