import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import Warehouse from './../../classes/Warehouse';
import { ERole } from './../../classes/Role';
import ESearchType from './../../classes/enums/ESearchType';

/**
 * Service: WarehouseService
 * Service that manage warehouse entities
 */
const WarehouseService = {

  // Rights for Warehouse entities
  rights: {
    [ERights.RIGHT_WAREHOUSE_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_WAREHOUSE_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_WAREHOUSE_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_WAREHOUSE_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_WAREHOUSE_DELETE]: () => false
  },

  create: warehouse => {

    // Rights
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Warehouse' });
    }

    // class instance
    if(!warehouse instanceof Warehouse) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Warehouse' });
    }

    // Minimum data
    if(!ensureFilledFields(warehouse, ['name', 'latitude', 'longitude', 'companyId', 'creator'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name', 'latitude', 'longitude', 'companyId', 'creator'] });
    }

    // Check if the warehouse creator is the current user, and if the user is manager of the warehouse's company Id. Otherwise => forbidden
    if(warehouse.creator !== DataService.computed.user.uid ||
        DataService.computed.activeRole.role !== ERole.MANAGER || warehouse.companyId !== DataService.computed.activeRole.companyId) {
          
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // create
    return FirebaseService.getFirestore().collection('warehouses').add(migratePrototype(warehouse));
  },
  get: warehouseId => {

    // Rights
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Warehouse' });
    }

    // get
    return FirebaseService.getFirestore().collection('warehouses').doc(warehouseId).get();
  },
  list: () => {

    // Rights
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Warehouses' });
    }

    // fetch all warehouse
    const WAREHOUSES = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('warehouses').get()
            .then(querySnapshot => {
              // Build a result object
              querySnapshot.forEach(warehouseDoc => WAREHOUSES[warehouseDoc.id] = warehouseDoc.data());
              resolve(WAREHOUSES);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (warehouseId, warehouse) => {

    // Rights
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Warehouse' });
    }

    // Minimum data
    if(!ensureFilledFields(warehouse, ['name', 'latitude', 'longitude', 'address', 'companyId', 'creator'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name', 'latitude', 'longitude', 'address', 'companyId', 'creator'] });
    }

    // class instance
    if(!warehouse instanceof Warehouse) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Warehouse' });
    }

    // If the current user is not manager of the warehouse's company => forbidden
    if(DataService.computed.activeRole.role !== ERole.MANAGER || warehouse.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // update
    return FirebaseService.getFirestore().collection('warehouses').doc(warehouseId).set(migratePrototype(warehouse));
  },
  updateField: (warehouseId, warehouseField) => {

    // Rights
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Warehouse' });
    }
    
    // update
    return FirebaseService.getFirestore().collection('warehouses').doc(warehouseId).update(warehouseField);
  },
  delete: warehouseId => {

    // Rights
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Warehouse' });
    }
    
    // delete
    return FirebaseService.getFirestore().collection('warehouses').doc(warehouseId).delete();
  },

  // CUSTOM FUNCTIONS

  // Get all warehouses for the companyId
  getAllForCompanyId: companyId => {

    // Rights
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Warehouses' });
    }

    // Fetch all warehouses linked to this companyID
    const WAREHOUSES = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('warehouses')
      .where('companyId', '==', companyId)
      .get()
      .then(querySnapshot => {
        // build the result object, then resolve
        querySnapshot.forEach(warehouseDoc => WAREHOUSES[warehouseDoc.id] = warehouseDoc.data());
        resolve(WAREHOUSES);
      })
      .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },

  // Get all warehouses created by a user
  getAllForCreatorId: creatorId => {

    // Rights
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Warehouses' });
    }

    // get all warehouses creted by the userId
    const WAREHOUSES = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('warehouses')
      .where('creator', '==', creatorId)
      .get()
      .then(querySnapshot => {
        // Build resultant object, then resolve with it
        querySnapshot.forEach(warehouseDoc => WAREHOUSES[warehouseDoc.id] = warehouseDoc.data());
        resolve(WAREHOUSES);
      })
      .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },

  // search for warehouses
  search: term => new Promise((resolve, reject) => {

    // active role is mandatory to search warehouses
    if(!DataService.computed.activeRole) {
      reject('Cannot search warehouses : No active role');
    }

    // Launch compute function to search for warehouses
    DataService.computed.search([ESearchType.WAREHOUSES], term, DataService.computed.activeRole.companyId)
      .then(results => resolve(results.data.warehouses))
      .catch(e => ErrorService.manageErrorThenReject(e, reject));
  })
};

export default WarehouseService;
