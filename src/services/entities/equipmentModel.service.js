import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import EquipmentModel from './../../classes/EquipmentModel';

/**
 * Service: EquipmentModelService
 * Service to interact with EquipmentModel entities
 */
const EquipmentModelService = {

  // Equipment model entities rights
  rights: {
    [ERights.RIGHT_EQUIPMENT_MODEL_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EQUIPMENT_MODEL_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EQUIPMENT_MODEL_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EQUIPMENT_MODEL_UPDATE]: () => false,
    [ERights.RIGHT_EQUIPMENT_MODEL_DELETE]: () => false
  },

  create: equipmentModel => {

    // Rights
    if(!EquipmentModelService.rights[ERights.RIGHT_EQUIPMENT_MODEL_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create an Equipment Model' });
    }

    // Class instance
    if(!equipmentModel instanceof EquipmentModel) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Equipment Model' });
    }

    // Minimum data
    if(!ensureFilledFields(equipmentModel, ['name', 'creator', 'logoURL'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name', 'creator', 'logoURL'] });
    }

    // Check if creator is current user
    if(equipmentModel.creator !== DataService.computed.user.uid) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // create
    return FirebaseService.getFirestore().collection('equipmentModels').add(migratePrototype(equipmentModel));
  },
  get: equipmentModelId => {

    // Rights
    if(!EquipmentModelService.rights[ERights.RIGHT_EQUIPMENT_MODEL_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get an Equipment Model' });
    }

    // get
    return FirebaseService.getFirestore().collection('equipmentModels').doc(equipmentModelId).get();
  },
  list: () => {

    // Rights
    if(!EquipmentModelService.rights[ERights.RIGHT_EQUIPMENT_MODEL_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Equipment Models' });
    }

    // List all equipment models
    const EQUIPMENT_MODELS = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('equipmentModels').get()
            .then(querySnapshot => {
              // Build then resolve the equipment model object
              querySnapshot.forEach(equipmentModelDoc => EQUIPMENT_MODELS[equipmentModelDoc.id] = equipmentModelDoc.data());
              resolve(EQUIPMENT_MODELS);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (equipmentModelId, equipmentModel) => {

    // Rights
    if(!EquipmentModelService.rights[ERights.RIGHT_EQUIPMENT_MODEL_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Equipment Model' });
    }

    // Class instance
    if(!equipmentModel instanceof EquipmentModel) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Equipment Model' });
    }

    // minimum data
    if(!ensureFilledFields(equipmentModel, ['name', 'creator', 'logoURL'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name', 'creator', 'logoURL'] });
    }

    // update
    return FirebaseService.getFirestore().collection('equipmentModels').doc(equipmentModelId).set(migratePrototype(equipmentModel));
  },
  updateField: (equipmentModelId, equipmentModelField) => {

    // Rights
    if(!EquipmentModelService.rights[ERights.RIGHT_EQUIPMENT_MODEL_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Equipment Model' });
    }
    
    // update
    return FirebaseService.getFirestore().collection('equipmentModels').doc(equipmentModelId).update(equipmentModelField);
  },
  delete: equipmentModelId => {

    // Rights
    if(!EquipmentModelService.rights[ERights.RIGHT_EQUIPMENT_MODEL_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete an Equipment Model' });
    }
    
    // delete
    return FirebaseService.getFirestore().collection('equipmentModels').doc(equipmentModelId).delete();
  },

  // CUSTOM FUNCTIONS

  // Get all equipments, sorted by type
  getAllByType: () => {

    // Rights
    if(!EquipmentModelService.rights[ERights.RIGHT_EQUIPMENT_MODEL_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Equipment Models' });
    }
    
    // This object will store a list of equipments by type
    const EQUIPMENT_MODELS_BY_TYPE = {};
    let type = '';

    // Get all equipment models
    return new Promise((resolve, reject) => {
      EquipmentModelService.list()
        .then(equipmentModels => {

          // For each equipment model
          Object.keys(equipmentModels).forEach(equipmentModelKey => {

            // get its type
            type = equipmentModels[equipmentModelKey].type;

            // If the type is not registered into the object, register it
            if(!EQUIPMENT_MODELS_BY_TYPE[type]) {  EQUIPMENT_MODELS_BY_TYPE[type] = {}};

            // Then, add this equipment in its type
            EQUIPMENT_MODELS_BY_TYPE[type][equipmentModelKey] = equipmentModels[equipmentModelKey];
          });

          // resolve
          resolve(EQUIPMENT_MODELS_BY_TYPE);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  }
};

export default EquipmentModelService;
