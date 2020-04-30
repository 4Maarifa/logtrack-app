import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import EquipmentModel from './../../classes/EquipmentModel';

const EquipmentModelService = {
  rights: {
    [ERights.RIGHT_EQUIPMENT_MODEL_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EQUIPMENT_MODEL_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EQUIPMENT_MODEL_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EQUIPMENT_MODEL_UPDATE]: () => false,
    [ERights.RIGHT_EQUIPMENT_MODEL_DELETE]: () => false
  },
  create: equipmentModel => {
    if(!EquipmentModelService.rights[ERights.RIGHT_EQUIPMENT_MODEL_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create an Equipment Model' });
    }

    if(!equipmentModel instanceof EquipmentModel) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Equipment Model' });
    }

    if(!ensureFilledFields(equipmentModel, ['name', 'creator', 'logoURL'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name', 'creator', 'logoURL'] });
    }

    if(equipmentModel.creator !== DataService.computed.user.uid) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('equipmentModels').add(migratePrototype(equipmentModel));
  },
  get: equipmentModelId => {
    if(!EquipmentModelService.rights[ERights.RIGHT_EQUIPMENT_MODEL_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get an Equipment Model' });
    }
    return FirebaseService.getDb().collection('equipmentModels').doc(equipmentModelId).get();
  },
  list: () => {
    if(!EquipmentModelService.rights[ERights.RIGHT_EQUIPMENT_MODEL_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Equipment Models' });
    }

    const equipmentModels = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getDb().collection('equipmentModels').get()
            .then(querySnapshot => {
                querySnapshot.forEach(equipmentModelDoc => equipmentModels[equipmentModelDoc.id] = equipmentModelDoc.data());
                resolve(equipmentModels);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (equipmentModelId, equipmentModel) => {
    if(!EquipmentModelService.rights[ERights.RIGHT_EQUIPMENT_MODEL_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Equipment Model' });
    }

    if(!equipmentModel instanceof EquipmentModel) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Equipment Model' });
    }

    if(!ensureFilledFields(equipmentModel, ['name', 'creator', 'logoURL'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name', 'creator', 'logoURL'] });
    }

    return FirebaseService.getDb().collection('equipmentModels').doc(equipmentModelId).set(migratePrototype(equipmentModel));
  },
  updateField: (equipmentModelId, equipmentModelField) => {
    if(!EquipmentModelService.rights[ERights.RIGHT_EQUIPMENT_MODEL_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Equipment Model' });
    }
    
    return FirebaseService.getDb().collection('equipmentModels').doc(equipmentModelId).update(equipmentModelField);
  },
  delete: equipmentModelId => {
    if(!EquipmentModelService.rights[ERights.RIGHT_EQUIPMENT_MODEL_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete an Equipment Model' });
    }
    
    return FirebaseService.getDb().collection('equipmentModels').doc(equipmentModelId).delete();
  },

  // CUSTOM FUNCTIONS
  getAllByType: () => {
    if(!EquipmentModelService.rights[ERights.RIGHT_EQUIPMENT_MODEL_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Equipment Models' });
    }
    
    const equipmentModelsByType = {};
    let type = '';

    return new Promise((resolve, reject) => {
      EquipmentModelService.list()
        .then(equipmentModels => {
          Object.keys(equipmentModels).forEach((equipmentModelKey) => {
            type = equipmentModels[equipmentModelKey].type;
            if(!equipmentModelsByType[type]) {  equipmentModelsByType[type] = {}};

            equipmentModelsByType[type][equipmentModelKey] = equipmentModels[equipmentModelKey];
          });
          resolve(equipmentModelsByType);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  }
};

export default EquipmentModelService;
