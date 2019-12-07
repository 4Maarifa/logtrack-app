
const UtilsService = {
    getClosestElement(el, classs) {
        while (!el.classList.contains(classs)) {
            el = el.parentNode;
            if(!el) {
                return null;
            }
        }
        return el;
    },

    // STRINGS
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    // ARRAYS & OBJECTS
    removeDuplicateFromArray(array) {
        return array.filter((item, pos) => array.indexOf(item) === pos);
    },
    filterKeysOnPropertyValue(obj, predicate) {
        return Object.keys(obj).filter(key => !!predicate(obj[key]));
    },
    filterObjectsOnPropertyValue(obj, predicate) {
        return UtilsService
            .filterKeysOnPropertyValue(obj, predicate)
            .map((key) => obj[key]);
    },
    filterKeyValueOnPropertyValue(obj, predicate) {
        var result = {};
        UtilsService.filterKeysOnPropertyValue(obj, predicate)
            .forEach((key) => result[key] = obj[key]);
        return result;
    },
    mergeObjects(...obj) {
        return Object.assign({}, ...obj);
    },
    compareArrays(arr1, arr2) {
        if (!arr1 || !arr2)
            return false;

        if (arr1.length !== arr2.length)
            return false;

        for (var i = 0, l=arr1.length; i < l; i++) {
            if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
                if (!UtilsService.compareArrays(arr1[i], arr2[i]))
                    return false;       
            }           
            else if (arr1[i] !== arr2[i]) {
                return false;   
            }           
        }       
        return true;
    }
};

export default UtilsService;