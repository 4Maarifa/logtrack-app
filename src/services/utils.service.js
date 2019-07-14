
const UtilsService = {
    getClosestElement(el, classs) {
        while (!el.classList.contains(classs)) {
            el = el.parentNode;
            if (!el) {
                return null;
            }
        }
        return el;
    },
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
    }
};

export default UtilsService;