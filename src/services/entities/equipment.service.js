import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import Equipment from './../../classes/Equipment';
import ESearchType from './../../classes/enums/ESearchType';

/**
 * Service: EquipmentService
 */
const EquipmentService = {

  // Rights for the Equipment entities
  rights: {
    [ERights.RIGHT_EQUIPMENT_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EQUIPMENT_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EQUIPMENT_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EQUIPMENT_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EQUIPMENT_DELETE]: () => false
  },

  create: equipment => {

    // Rights
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create an Equipment' });
    }

    // Class instance
    if(!equipment instanceof Equipment) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Equipment' });
    }

    // Minimum data
    if(!ensureFilledFields(equipment, ['companyId', 'identification', 'equipmentModelId'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['companyId', 'identification', 'equipmentModelId'] });
    }

    // If the equipment is not part of the current company, or if the current user id not the creator => forbidden
    if(equipment.companyId !== DataService.computed.activeRole.companyId || equipment.creator !== DataService.computed.user.uid) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // create
    return FirebaseService.getFirestore().collection('equipments').add(migratePrototype(equipment));
  },
  get: equipmentId => {

    // Rights
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get an Equipment' });
    }
    
    // get
    return FirebaseService.getFirestore().collection('equipments').doc(equipmentId).get();
  },
  list: () => {

    // Rights
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Equipments' });
    }

    // List all equipments
    const EQUIPMENTS = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('equipments').get()
        .then(querySnapshot => {
          // build resultant object, then resolve
          querySnapshot.forEach(equipmentDoc => EQUIPMENTS[equipmentDoc.id] = equipmentDoc.data());
          resolve(EQUIPMENTS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (equpmentId, equipment) => {

    // Rights
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Equipment' });
    }

    // Class instance
    if(!equipment instanceof Equipment) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Equipment' });
    }

    // Minimum data
    if(!ensureFilledFields(equipment, ['companyId', 'identification', 'equipmentModelId'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['companyId', 'identification', 'equipmentModelId'] });
    }

    // If equipment is not part of the current company => it's forbidden
    if(equipment.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // update
    return FirebaseService.getFirestore().collection('equipments').doc(equpmentId).set(migratePrototype(equipment));
  },
  updateField: (equipmentId, equipmentField) => {

    // Rights
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Equipment' });
    }
    
    // update
    return FirebaseService.getFirestore().collection('equipments').doc(equipmentId).update(equipmentField);
  },
  delete: equipmentId => {

    // Rights
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete an Equipment' });
    }
    
    // delete
    return FirebaseService.getFirestore().collection('equipments').doc(equipmentId).delete();
  },

  // CUSTOM FUNCTIONS

  // Get all equipments for the companyId
  getAllForCompanyId: companyId => {

    // Rights
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Equipments' });
    }

    // List all equipments that belong to the company
    const EQUIPMENTS = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('equipments')
      .where('companyId', '==', companyId)
      .get()
      .then(querySnapshot => {
        // Building response object and resolve
        querySnapshot.forEach(equipmentDoc => EQUIPMENTS[equipmentDoc.id] = equipmentDoc.data());
        resolve(EQUIPMENTS);
      })
      .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },

  // Get all equipments that are linked to the warehouse
  getAllForWarehouseId: warehouseId => {

    // Rights
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Equipments' });
    }

    // get equipments linked to this warehouse
    const EQUIPMENTS = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('equipments')
      .where('warehouseId', '==', warehouseId)
      .get()
      .then(querySnapshot => {
        // build warehouse list
        querySnapshot.forEach(equipmentDoc => EQUIPMENTS[equipmentDoc.id] = equipmentDoc.data());
        resolve(EQUIPMENTS);
      })
      .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },

  // get all equipments that are created by a user
  getAllForCreatorId: creatorId => {

    // Rights
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Equipments' });
    }

    // List equipments that are created by this user
    const EQUIPMENTS = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('equipments')
      .where('creator', '==', creatorId)
      .get()
      .then(querySnapshot => {
        // Building the created equipments
        querySnapshot.forEach(equipmentDoc => EQUIPMENTS[equipmentDoc.id] = equipmentDoc.data());
        resolve(EQUIPMENTS);
      })
      .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },

  // Search for equipments
  search: term => new Promise((resolve, reject) => {

    // Search for equipments is restricted to user with an active role
    if(!DataService.computed.activeRole) {
      reject('Cannot search equipments : No active role');
      return;
    }

    // Call the compute function to search for warehouses
    DataService.computed.search([ESearchType.EQUIPMENTS], term, DataService.computed.activeRole.companyId)
      .then(results => resolve(results.data.equipments))
      .catch(e => ErrorService.manageErrorThenReject(e, reject));
    })
};

export default EquipmentService;
