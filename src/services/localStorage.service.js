
export const LOCALSTORAGEKEYS = {

};

const LocalStorageService = {
  setItem(localStorageKey, value) {
    localStorage.setItem(localStorageKey, value);
  },
  getItem(localStorageKey) {
    return localStorage.getItem(localStorageKey);
  },
  removeItem(localStorageKey) {
    localStorage.removeItem(localStorageKey);
  }
};

export default LocalStorageService;
