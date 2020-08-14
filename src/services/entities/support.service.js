import { ERights } from './../right.service';

import DateService from './../date.service';
import DataService, { ensureFilledFields } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

/**
 * Service: SupportService
 * Used to manage support messages entities
 */
const SupportService = {

  // Rights: on Support Entities
  rights: {
    [ERights.RIGHT_SUPPORT_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_SUPPORT_GET]: () => false,
    [ERights.RIGHT_SUPPORT_LIST]: () => DataService.computed.employee.staff,
    [ERights.RIGHT_SUPPORT_UPDATE]: () => false,
    [ERights.RIGHT_SUPPORT_DELETE]: () => false
  },

  create: support => {

    // Rights
    if(!SupportService.rights[ERights.RIGHT_SUPPORT_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Support' });
    }

    // Minimum data
    if(!ensureFilledFields(support, ['message', 'userId'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['message', 'userId'] });
    }

    // If the current user is not the support message userId => forbidden
    if(support.userId !== DataService.computed.user.uid) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // Create
    return FirebaseService.getFirestore().collection('support').add(support);
  },
  get: supportId => {

    // Rights
    if(!SupportService.rights[ERights.RIGHT_SUPPORT_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Support' });
    }

    // get
    return FirebaseService.getFirestore().collection('support').doc(supportId).get();
  },
  list: () => {

    // Rights
    if(!SupportService.rights[ERights.RIGHT_SUPPORT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Supports' });
    }

    // fetch all support messages
    const SUPPORTS = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('support').get()
            .then(querySnapshot => {
              // Build an object with all the support messages
              querySnapshot.forEach(supportDoc => SUPPORTS[supportDoc.id] = supportDoc.data());
              resolve(SUPPORTS);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (supportId, support) => {

    // Rights
    if(!SupportService.rights[ERights.RIGHT_SUPPORT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Support' });
    }

    // Minimum data
    if(!ensureFilledFields(support, ['message', 'userId'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['message', 'userId'] });
    }

    // Check if the support message user id is the current user. Otherwise => forbidden
    if(support.userId !== DataService.computed.user.uid) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // update
    return FirebaseService.getFirestore().collection('support').doc(supportId).set(support);
  },
  updateField: (supportId, supportField) => {

    // Rights
    if(!SupportService.rights[ERights.RIGHT_SUPPORT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Support' });
    }
    
    // update
    return FirebaseService.getFirestore().collection('support').doc(supportId).update(supportField);
  },
  delete: supportId => {

    // Rights
    if(!SupportService.rights[ERights.RIGHT_SUPPORT_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Support' });
    }
    
    // delete
    return FirebaseService.getFirestore().collection('support').doc(supportId).delete();
  },

  // CUSTOM FUNCTIONS

  // Create a support message with a message, userId, metadata and userAgent details (UserAgentService.getAll())
  createWithData: (message, userId, metadata, userAgent) => SupportService.create({message, userId, metadata, userAgent, date: DateService.getCurrentIsoDateString() }),

  // Get all 
  getAllForCurrentUser: () => {

    // Rights
    if(!SupportService.rights[ERights.RIGHT_SUPPORT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Supports' });
    }

    // Get all messages from the current user
    const SUPPORTS = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('support')
          .where('userId', '==', DataService.computed.user.uid)
          .get()
          .then(querySnapshot => {
            // Build results
            querySnapshot.forEach(supportDoc => SUPPORTS[supportDoc.id] = supportDoc.data());
            resolve(SUPPORTS);
          })
          .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  }
};

export default SupportService;
