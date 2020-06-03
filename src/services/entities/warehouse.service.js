import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import Warehouse from './../../classes/Warehouse';
import { ERole } from './../../classes/Role';
import ESearchType from './../../classes/enums/ESearchType';

const WarehouseService = {
  rights: {
    [ERights.RIGHT_WAREHOUSE_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_WAREHOUSE_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_WAREHOUSE_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_WAREHOUSE_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_WAREHOUSE_DELETE]: () => false
  },
  create: warehouse => {
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Warehouse' });
    }

    if(!warehouse instanceof Warehouse) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Warehouse' });
    }

    if(!ensureFilledFields(warehouse, ['name', 'latitude', 'longitude', 'companyId', 'creator'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name', 'latitude', 'longitude', 'companyId', 'creator'] });
    }

    if(warehouse.creator !== DataService.computed.user.uid ||
        DataService.computed.activeRole.role !== ERole.MANAGER || warehouse.companyId !== DataService.computed.activeRole.companyId) {
          
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getFirestore().collection('warehouses').add(migratePrototype(warehouse));
  },
  get: warehouseId => {
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Warehouse' });
    }
    return FirebaseService.getFirestore().collection('warehouses').doc(warehouseId).get();
  },
  list: () => {
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Warehouses' });
    }

    const warehouses = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('warehouses').get()
            .then(querySnapshot => {
                querySnapshot.forEach(warehouseDoc => warehouses[warehouseDoc.id] = warehouseDoc.data());
                resolve(warehouses);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (warehouseId, warehouse) => {
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Warehouse' });
    }

    if(!ensureFilledFields(warehouse, ['name', 'latitude', 'longitude', 'address', 'companyId', 'creator'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name', 'latitude', 'longitude', 'address', 'companyId', 'creator'] });
    }

    if(!warehouse instanceof Warehouse) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Warehouse' });
    }

    if(DataService.computed.activeRole.role !== ERole.MANAGER || warehouse.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getFirestore().collection('warehouses').doc(warehouseId).set(migratePrototype(warehouse));
  },
  updateField: (warehouseId, warehouseField) => {
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Warehouse' });
    }
    
    return FirebaseService.getFirestore().collection('warehouses').doc(warehouseId).update(warehouseField);
  },
  delete: warehouseId => {
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Warehouse' });
    }
    
    return FirebaseService.getFirestore().collection('warehouses').doc(warehouseId).delete();
  },

  // CUSTOM FUNCTIONS
  getAllForCompanyId: companyId => {
    if(!WarehouseService.rights[ERights.RIGHT_WAREHOUSE_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Warehouses' });
    }

    let warehouses = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('warehouses')
      .where('companyId', '==', companyId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(warehouseDoc => warehouses[warehouseDoc.id] = warehouseDoc.data());
        resolve(warehouses);
      })
      .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  search: term => new Promise((resolve, reject) => {
      if(!DataService.computed.activeRole) {
        reject('Cannot search warehouses : No active role');
      }
      DataService.computed.search([ESearchType.WAREHOUSES], term, DataService.computed.activeRole.companyId)
        .then(results => resolve(results.data.warehouses))
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    })
};

export default WarehouseService;
