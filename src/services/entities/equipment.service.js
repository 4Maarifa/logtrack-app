import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import Equipment from './../../classes/Equipment';

const EquipmentService = {
  rights: {
    [ERights.RIGHT_EQUIPMENT_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EQUIPMENT_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EQUIPMENT_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EQUIPMENT_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_EQUIPMENT_DELETE]: () => false
  },
  create(equipment) {
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create an Equipment' });
    }

    if(!equipment instanceof Equipment) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Equipment' });
    }

    if(!ensureFilledFields(equipment, ['companyId', 'identification', 'equipmentModelId'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['companyId', 'identification', 'equipmentModelId'] });
    }

    if(equipment.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('equipments').add(migratePrototype(equipment));
  },
  get(equipmentId) {
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get an Equipment' });
    }
    return FirebaseService.getDb().collection('equipments').doc(equipmentId).get();
  },
  list() {
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Equipments' });
    }

    var equipments = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getDb().collection('equipments').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((equipmentDoc) => equipments[equipmentDoc.id] = equipmentDoc.data());
                resolve(equipments);
            })
            .catch((e) => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update(equipment) {
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Equipment' });
    }

    if(!equipment instanceof Equipment) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Equipment' });
    }

    if(!ensureFilledFields(equipment, ['companyId', 'identification', 'equipmentModelId'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['companyId', 'identification', 'equipmentModelId'] });
    }

    if(equipment.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('equipments').doc(equipment.id).set(migratePrototype(equipment));
  },
  updateField(equipmentId, equipmentField) {
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update an Equipment' });
    }
    
    return FirebaseService.getDb().collection('equipments').doc(equipmentId).update(equipmentField);
  },
  delete(equipmentId) {
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete an Equipment' });
    }
    
    return FirebaseService.getDb().collection('equipments').doc(equipmentId).delete();
  },

  // CUSTOM FUNCTIONS
  getAllForCompanyId(companyId) {
    if(!EquipmentService.rights[ERights.RIGHT_EQUIPMENT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Equipments' });
    }

    var equipments = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getDb().collection('equipments')
      .where('companyId', '==', companyId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((equipmentDoc) => equipments[equipmentDoc.id] = equipmentDoc.data());
        resolve(equipments);
      })
      .catch((e) => ErrorService.manageErrorThenReject(e, reject));
    });
  },
};

export default EquipmentService;
