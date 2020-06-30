import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import Brand from './../../classes/Brand';

/**
 * Service: BrandService
 * Manage Brand entities
 */
const BrandService = {

  // Rights for Brand entity
  rights: {
    [ERights.RIGHT_BRAND_CREATE]: () => false,
    [ERights.RIGHT_BRAND_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_BRAND_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_BRAND_UPDATE]: () => false,
    [ERights.RIGHT_BRAND_DELETE]: () => false
  },
  create: brand => {

    // Rights
    if(!BrandService.rights[ERights.RIGHT_BRAND_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Brand' });
    }

    // Class instance
    if(!brand instanceof Brand) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Brand' });
    }

    // Minimum data
    if(!ensureFilledFields(brand, ['name'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name'] });
    }

    // create
    return FirebaseService.getFirestore().collection('brands').doc(brand.id).set(migratePrototype(brand));
  },
  get: brandId => {

    // Rights
    if(!BrandService.rights[ERights.RIGHT_BRAND_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Brand' });
    }

    // get
    return FirebaseService.getFirestore().collection('brands').doc(brandId).get();
  },
  list: () => {

    // Rights
    if(!BrandService.rights[ERights.RIGHT_BRAND_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Brands' });
    }

    // get all brands
    const BRANDS = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('brands').get()
        .then(querySnapshot => {
            querySnapshot.forEach(brandDoc => BRANDS[brandDoc.id] = brandDoc.data());
            resolve(BRANDS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (brandId, brand) => {

    // Rights
    if(!BrandService.rights[ERights.RIGHT_BRAND_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Brand' });
    }

    // Class instance
    if(!brand instanceof Brand) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Brand' });
    }

    // Minimum data
    if(!ensureFilledFields(brand, ['name'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name'] });
    }

    // update
    return FirebaseService.getFirestore().collection('brands').doc(brandId).set(migratePrototype(brand));
  },
  updateField: (brandId, brandField) => {

    // Rights
    if(!BrandService.rights[ERights.RIGHT_BRAND_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Brand' });
    }
    
    // update
    return FirebaseService.getFirestore().collection('brands').doc(brandId).update(brandField);
  },
  delete: brandId => {

    // Rights
    if(!BrandService.rights[ERights.RIGHT_BRAND_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Brand' });
    }
    
    // delete
    return FirebaseService.getFirestore().collection('brands').doc(brandId).delete();
  },

  // CUSTOM FUNCTIONS
};

export default BrandService;
