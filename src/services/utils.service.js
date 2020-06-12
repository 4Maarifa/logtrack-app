import { useEffect, useRef } from 'react';

const UtilsService = {
    _observers: {},
    addObserver: (observerCallback, observerKey) => {
        UtilsService._observers[observerKey] = observerCallback;
      observerCallback();
      UtilsService._computeObserverNumber() >= 1 && UtilsService._initializeListener();
      return observerKey;
    },
    removeObserver: observerKey => {
      delete UtilsService._observers[observerKey];
      UtilsService._observers[observerKey] = null;
      UtilsService._computeObserverNumber() === 0 && UtilsService._deleteListener();
    },
    updateObservers: () => Object.values(UtilsService._observers)
      .forEach(observer => observer && (typeof observer === 'function') && observer()),

    _initializeListener: () => window.addEventListener('popstate', UtilsService.updateObservers),
    _deleteListener: () => window.removeEventListener('popstate', UtilsService.updateObservers),
    _computeObserverNumber: () => Object.values(UtilsService._observers).filter(obs => obs && typeof obs === 'function').length,

    getUrlGetParam: paramKey => new URLSearchParams(window.location.search).get(paramKey),

    // STRINGS
    capitalize: str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),

    // ARRAYS & OBJECTS
    removeDuplicateFromArray: array => array.filter((item, pos) => array.indexOf(item) === pos),
    filterKeysOnPropertyValue: (obj, predicate) => Object.keys(obj).filter(key => predicate(obj[key])),
    filterObjectsOnPropertyValue: (obj, predicate) => UtilsService.filterKeysOnPropertyValue(obj, predicate).map(key => obj[key]),
    filterKeyValueOnPropertyValue: (obj, predicate) => {
        const RESULT = {};
        UtilsService.filterKeysOnPropertyValue(obj, predicate)
            .forEach(key => RESULT[key] = obj[key]);
        return RESULT;
    },
    mergeObjects: (...obj) => Object.assign({}, ...obj),
    compareArrays: (arr1, arr2) => {
        if (!arr1 || !arr2)
            return false;

        if (arr1.length !== arr2.length)
            return false;

        for (let i = 0, l=arr1.length; i < l; i++) {
            if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
                if (!UtilsService.compareArrays(arr1[i], arr2[i])) {
                    return false;
                }
            }           
            else if (arr1[i] !== arr2[i]) {
                return false;   
            }           
        }       
        return true;
    },
    compareFn: (val1, val2) => {
        if(val1 > val2) { return 1; }
        if(val1 < val2) { return -1; }
        return 0;
    },
    flattenObject: ob => {
        var toReturn = {};
    
        for (var i in ob) {
            if (!ob.hasOwnProperty(i)) continue;
    
            if ((typeof ob[i]) == 'object' && ob[i] !== null) {
                var flatObject = UtilsService.flattenObject(ob[i]);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) continue;
                    toReturn[i + '.' + x] = flatObject[x].toString();
                }
            } else {
                toReturn[i] = ob[i];
            }
        }
        return toReturn;
    },

    // HOOKS
    usePrevious: value => {
        const REF = useRef();
        useEffect(() => {
            REF.current = value;
        });
        return REF.current;
    }
};

export default UtilsService;