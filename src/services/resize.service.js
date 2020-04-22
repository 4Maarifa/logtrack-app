
const ResizeService = {
  _observers: {},
  addObserver: (observerCallback, observerKey) => {
    ResizeService._observers[observerKey] = observerCallback;
    observerCallback();
    return observerKey;
  },
  removeObserver: observerKey => {
    delete ResizeService._observers[observerKey];
    ResizeService._observers[observerKey] = null;
  },
  updateObservers: () => Object.values(ResizeService._observers)
    .forEach(observer => observer && (typeof observer === 'function') && observer())
};

export default ResizeService;
