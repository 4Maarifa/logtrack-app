import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import LogTrack from './../../classes/LogTrack';
import DateService from '../date.service';

const LogTrackService = {
  rights: {
    [ERights.RIGHT_LOGTRACK_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_LOGTRACK_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_LOGTRACK_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_LOGTRACK_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_LOGTRACK_DELETE]: () => false
  },
  create: logTrack => {
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a LogTrack' });
    }

    if(!logTrack instanceof LogTrack) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'LogTrack' });
    }

    if(!ensureFilledFields(logTrack, ['activity', 'companyId', 'employeeId'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['activity', 'companyId', 'employeeId'] });
    }

    if(logTrack.employeeId !== DataService.computed.user.uid || logTrack.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getFirestore().collection('logtracks').add(migratePrototype(logTrack));
  },
  get: logTrackId => {
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_GET]()) {
      return ErrorService.manageErrorThenReject({ code: 'entity/right', details: 'Get a LogTrack' });
    }

    return FirebaseService.getFirestore().collection('logtracks').doc(logTrackId).get();
  },
  list: () => {
    console.warning('LogTrackService.list is not made for bulk calls!');
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_LIST]()) {
      return ErrorService.manageErrorThenReject({ code: 'entity/right', details: 'List LogTracks' });
    }

    const LOGTRACKS = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('logtracks').get()
            .then(querySnapshot => {
                querySnapshot.forEach(logTrackDoc => LOGTRACKS[logTrackDoc.id] = logTrackDoc.data());
                resolve(LOGTRACKS);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (logTrackId, logTrack) => {
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a LogTrack' });
    }

    if(!logTrack instanceof LogTrack) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'LogTrack' });
    }

    if(!ensureFilledFields(logTrack, ['activity', 'companyId', 'employeeId'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['activity', 'companyId', 'employeeId'] });
    }

    if(logTrack.employeeId !== DataService.computed.user.uid || logTrack.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getFirestore().collection('logtracks').doc(logTrackId).set(migratePrototype(logTrack));
  },
  updateField: (logTrackId, logTrackField) => {
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a LogTrack' });
    }
    
    return FirebaseService.getFirestore().collection('logtracks').doc(logTrackId).update(logTrackField);
  },
  delete: logTrackId => {
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a LogTrack' });
    }
    
    return FirebaseService.getFirestore().collection('logtracks').doc(logTrackId).delete();
  },

  // CUSTOM FUNCTIONS
  getEndedForCompanyIdPast24h: companyId => {
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_LIST]()) {
      return ErrorService.manageErrorThenReject({ code: 'entity/right', details: 'List LogTracks' });
    }

    const past24hTimestamp = DateService.getCurrentTimeStampNumber() - (24 * 60 * 60 * 1000);

    const LOGTRACKS = {};

    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('logtracks')
        .where('companyId', '==', companyId)
        .where('endTimestamp', '>=', past24hTimestamp)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(logTrackDoc => LOGTRACKS[logTrackDoc.id] = logTrackDoc.data());
          resolve(LOGTRACKS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    }); 
  },
  getEndedForEmployeeIdPast24h: employeeId => {
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_LIST]()) {
      return ErrorService.manageErrorThenReject({ code: 'entity/right', details: 'List LogTracks' });
    }

    const past24hTimestamp = DateService.getCurrentTimeStampNumber() - (24 * 60 * 60 * 1000);

    const LOGTRACKS = {};

    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('logtracks')
        .where('employeeId', '==', employeeId)
        .where('endTimestamp', '>=', past24hTimestamp)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(logTrackDoc => LOGTRACKS[logTrackDoc.id] = logTrackDoc.data());
          resolve(LOGTRACKS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    }); 
  },
  getEndedForEquipmentIdPast24h: equipmentId => {
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_LIST]()) {
      return ErrorService.manageErrorThenReject({ code: 'entity/right', details: 'List LogTracks' });
    }

    const past24hTimestamp = DateService.getCurrentTimeStampNumber() - (24 * 60 * 60 * 1000);

    const LOGTRACKS = {};

    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('logtracks')
        .where('equipmentIds', 'array-contains', equipmentId)
        .where('endTimestamp', '>=', past24hTimestamp)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(logTrackDoc => LOGTRACKS[logTrackDoc.id] = logTrackDoc.data());
          resolve(LOGTRACKS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    }); 
  }
};

export default LogTrackService;
