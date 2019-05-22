
const Utils = {
    getClosestElement(el, classs) {
        while (!el.classList.contains(classs)) {
            el = el.parentNode;
            if (!el) {
                return null;
            }
        }
        return el;
    }
};

export default Utils;