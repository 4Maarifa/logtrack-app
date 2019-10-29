import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import LogTrack from './../../classes/LogTrack';

const LogTrackService = {
  rights: {
    [ERights.RIGHT_LOGTRACK_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_LOGTRACK_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_LOGTRACK_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_LOGTRACK_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_LOGTRACK_DELETE]: () => false
  },
  create(logTrack) {
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a LogTrack' }, reject);
    }

    if(!logTrack instanceof LogTrack) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'LogTrack' }, reject);
    }

    if(!ensureFilledFields(logTrack, ['activity', 'companyId', 'employeeId'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['activity', 'companyId', 'employeeId'] });
    }

    if(logTrack.employeeId !== DataService.computed.employee.id || logTrack.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('logtracks').add(migratePrototype(logTrack));
  },
  get(logTrackId) {
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_GET]()) {
      return ErrorService.manageErrorThenReject({ code: 'entity/right', details: 'Get a LogTrack' }, reject);
    }

    if(logTrack.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('logtracks').doc(logTrackId).get();
  },
  list() {
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_LIST]()) {
      return ErrorService.manageErrorThenReject({ code: 'entity/right', details: 'List LogTracks' }, reject);
    }

    if(logTrack.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    var logTracks = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getDb().collection('logtracks').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((logTrackDoc) => logTracks[logTrackDoc.id] = logTrackDoc.data());
                resolve(logTracks);
            })
            .catch((e) => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update(logTrack) {
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a LogTrack' });
    }

    if(!logTrack instanceof LogTrack) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'LogTrack' });
    }

    if(!ensureFilledFields(logTrack, ['activity', 'companyId', 'employeeId'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['activity', 'companyId', 'employeeId'] });
    }

    if(logTrack.employeeId !== DataService.computed.employee.id || logTrack.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('logtracks').doc(logTrack.id).set(migratePrototype(logTrack));
  },
  updateField(logTrackId, logTrackField) {
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a LogTrack' });
    }

    if(logTrack.employeeId !== DataService.computed.employee.id || logTrack.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }
    
    return FirebaseService.getDb().collection('logtracks').doc(logTrackId).update(logTrackField);
  },
  delete(logTrackId) {
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a LogTrack' });
    }
    
    return FirebaseService.getDb().collection('logtracks').doc(logTrackId).delete();
  },

  // CUSTOM FUNCTIONS
};

export default LogTrackService;
