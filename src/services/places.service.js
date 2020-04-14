import Nominatim from 'nominatim';

import ErrorService from './../services/error.service';

const PlacesService = {
  search(searchString, options = {}) {
    // Don't spam this function! Go for a debounce (one call each 1100ms max!)
    return new Promise((resolve, reject) => {
      if(!searchString) { resolve([]); }
      Nominatim.search({ q: searchString, ...options }, (err, _, res) => {
        if(!!err) {
          ErrorService.manageErrorThenReject(err, reject);
        }
        resolve(res);
      });
    });
  }
};

export default PlacesService;
