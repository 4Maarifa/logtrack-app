import { ERights } from './../right.service';

import DateService from './../date.service';
import DataService, { ensureFilledFields } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

const SupportService = {
  rights: {
    [ERights.RIGHT_SUPPORT_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_SUPPORT_GET]: () => false,
    [ERights.RIGHT_SUPPORT_LIST]: () => false,
    [ERights.RIGHT_SUPPORT_UPDATE]: () => false,
    [ERights.RIGHT_SUPPORT_DELETE]: () => false
  },
  create: support => {
    if(!SupportService.rights[ERights.RIGHT_SUPPORT_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Support' });
    }

    if(!ensureFilledFields(support, ['message', 'userId'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['message', 'userId'] });
    }

    if(support.userId !== DataService.computed.user.uid) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getFirestore().collection('support').add(support);
  },
  get: supportId => {
    if(!SupportService.rights[ERights.RIGHT_SUPPORT_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Support' });
    }
    return FirebaseService.getFirestore().collection('support').doc(supportId).get();
  },
  list: () => {
    if(!SupportService.rights[ERights.RIGHT_SUPPORT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Supports' });
    }

    const supports = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('support').get()
            .then(querySnapshot => {
                querySnapshot.forEach(supportDoc => supports[supportDoc.id] = supportDoc.data());
                resolve(supports);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (supportId, support) => {
    if(!SupportService.rights[ERights.RIGHT_SUPPORT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Support' });
    }

    if(!ensureFilledFields(support, ['message', 'userId'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['message', 'userId'] });
    }

    if(support.userId !== DataService.computed.user.uid) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getFirestore().collection('support').doc(supportId).set(support);
  },
  updateField: (supportId, supportField) => {
    if(!SupportService.rights[ERights.RIGHT_SUPPORT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Support' });
    }
    
    return FirebaseService.getFirestore().collection('support').doc(supportId).update(supportField);
  },
  delete: supportId => {
    if(!SupportService.rights[ERights.RIGHT_SUPPORT_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Support' });
    }
    
    return FirebaseService.getFirestore().collection('support').doc(supportId).delete();
  },

  // CUSTOM FUNCTIONS
  createWithData: (message, userId, metadata) => SupportService.create({message, userId, metadata, date: DateService.getCurrentIsoDateString() })
};

export default SupportService;
