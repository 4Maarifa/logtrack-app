import ERights from './../../classes/enums/ERights';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import Brand from './../../classes/Brand';

const BrandService = {
  rights: {
    [ERights.RIGHT_BRAND_CREATE]: () => false,
    [ERights.RIGHT_BRAND_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_BRAND_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_BRAND_UPDATE]: () => false,
    [ERights.RIGHT_BRAND_DELETE]: () => false
  },
  create(brand) {
    if (!BrandService.rights[ERights.RIGHT_BRAND_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Brand' });
    }

    if (!brand instanceof Brand) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Brand' });
    }

    if (!ensureFilledFields(brand, ['name'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name'] });
    }

    return FirebaseService.getDb().collection('brands').doc(brand.id).set(migratePrototype(brand));
  },
  get(brandId) {
    if (!BrandService.rights[ERights.RIGHT_BRAND_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Brand' });
    }
    return FirebaseService.getDb().collection('brands').doc(brandId).get();
  },
  list() {
    if (!BrandService.rights[ERights.RIGHT_BRAND_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Brands' });
    }

    var brands = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getDb().collection('brands').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((brandDoc) => brands[brandDoc.id] = brandDoc.data());
            resolve(brands);
        })
        .catch((e) => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update(brand) {
    if (!BrandService.rights[ERights.RIGHT_BRAND_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Brand' });
    }

    if (!brand instanceof Brand) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Brand' });
    }

    if (!ensureFilledFields(brand, ['name'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name'] });
    }

    return FirebaseService.getDb().collection('brands').doc(brand.id).set(migratePrototype(brand));
  },
  updateField(brandId, brandField) {
    if (!BrandService.rights[ERights.RIGHT_BRAND_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Brand' });
    }
    
    return FirebaseService.getDb().collection('brands').doc(brandId).update(brandField);
  },
  delete(brandId) {
    if (!BrandService.rights[ERights.RIGHT_BRAND_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Brand' });
    }
    
    return FirebaseService.getDb().collection('brands').doc(brandId).delete();
  },

  // CUSTOM FUNCTIONS
};

export default BrandService;
