import { useEffect, useRef } from 'react';
import ObserverService from './observer.service';

/**
 * Service: UtilsService
 * A lot of useful methods
 */
const UtilsService = {

    url: {},

    // Get a specific URL GET parameter
    getUrlGetParam: paramKey => new URLSearchParams(window.location.search).get(paramKey),

    // STRINGS
    // Capitalize a string
    capitalize: str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),

    // ARRAYS & OBJECTS
    // Remove all duplicated from an array (don't work for reference, like nested objects or arrays!)
    removeDuplicateFromArray: array => array.filter((item, pos) => array.indexOf(item) === pos),

    // return key list according to a predicate
    filterKeysOnPropertyValue: (obj, predicate) => Object.keys(obj).filter(key => predicate(obj[key])),

    // Filter object values according to a predicate
    filterObjectsOnPropertyValue: (obj, predicate) => UtilsService.filterKeysOnPropertyValue(obj, predicate).map(key => obj[key]),

    // Building a resulting object from a key filter predicate
    filterKeyValueOnPropertyValue: (obj, predicate) => {
        const RESULT = {};
        UtilsService.filterKeysOnPropertyValue(obj, predicate)
            .forEach(key => RESULT[key] = obj[key]);
        return RESULT;
    },

    // Merge several objects together (without prototype migration, we do not keep a prototype)
    mergeObjects: (...obj) => Object.assign({}, ...obj),

    // Compare arrays together
    compareArrays: (arr1, arr2) => {

        // If one or the other is null, return false
        if (!arr1 || !arr2)
            return false;

        // If length is different, return false
        if (arr1.length !== arr2.length)
            return false;

        // Fetch any item of the first aray
        for (let i = 0, l=arr1.length; i < l; i++) {

            // If both array, for the same item, is an array => call compareArrays on them
            if (arr1[i] instanceof Array && arr2[i] instanceof Array) {

                // if those arrays are not the same, return false
                if (!UtilsService.compareArrays(arr1[i], arr2[i])) {
                    return false;
                }
            }           
            else if (arr1[i] !== arr2[i]) {
                // If some values are not the same, return false
                return false;   
            }           
        }
        // finally, if at that point, we find no difference, it means that arrays are the same
        return true;
    },

    // Simple compare function to compare numbers and dates
    compareFn: (val1, val2) => {
        if(val1 > val2) { return 1; }
        if(val1 < val2) { return -1; }
        return 0;
    },

    // Flatten an object
    flattenObject: ob => {

        // Return object
        const RESULT = {};
    
        // fetch properties
        for (var i in ob) {

            // If the item is not a real prop, continue, we can ignore this
            if (!ob.hasOwnProperty(i)) continue;
    
            // If another object is nested
            if ((typeof ob[i]) == 'object' && ob[i] !== null) {

                // Flatten it!
                const FLAT_OBJECT = UtilsService.flattenObject(ob[i]);

                // Pull up properties in the main object
                for (var x in FLAT_OBJECT) {
                    if (!FLAT_OBJECT.hasOwnProperty(x)) continue;
                    RESULT[i + '.' + x] = FLAT_OBJECT[x].toString();
                }
            }
            else {
                // just assign the prop
                RESULT[i] = ob[i];
            }
        }
        return RESULT;
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

export const ASSETS_URL = 'https://logtrack.github.io/logtrack-assets/assets/';

ObserverService.initialize(UtilsService.url, 'URL', {
    startWatcher: ({ updateObservers }) => window.addEventListener('popstate', updateObservers),
    stopWatcher: ({ updateObservers }) => window.removeEventListener('popstate', updateObservers),
    getData: () => window.location.href
});

export default UtilsService;
