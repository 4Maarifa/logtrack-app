import { useEffect, useRef } from 'react';

const UtilsService = {
    getClosestElement: (el, classs) => {
        console.warning('UtilsService.getClosestElement is DEPRECATED!');
        while (!el.classList.contains(classs)) {
            el = el.parentNode;
            if(!el) {
                return null;
            }
        }
        return el;
    },

    getUrlGetParam: paramKey => new URLSearchParams(window.location.search).get(paramKey),

    // STRINGS
    capitalize: str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),

    // ARRAYS & OBJECTS
    removeDuplicateFromArray: array => array.filter((item, pos) => array.indexOf(item) === pos),
    filterKeysOnPropertyValue: (obj, predicate) => Object.keys(obj).filter(key => predicate(obj[key])),
    filterObjectsOnPropertyValue: (obj, predicate) => UtilsService.filterKeysOnPropertyValue(obj, predicate).map(key => obj[key]),
    filterKeyValueOnPropertyValue: (obj, predicate) => {
        const result = {};
        UtilsService.filterKeysOnPropertyValue(obj, predicate)
            .forEach(key => result[key] = obj[key]);
        return result;
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

    // HOOKS
    usePrevious: value => {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
    }
};

export default UtilsService;