import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import LogTrack from './../../classes/LogTrack';
import DateService from '../date.service';

/**
 * Service: LogTrackService
 * Service to interact with LogTracks
 */
const LogTrackService = {

  // Rights for LogTrack Entities
  rights: {
    [ERights.RIGHT_LOGTRACK_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_LOGTRACK_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_LOGTRACK_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_LOGTRACK_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_LOGTRACK_DELETE]: () => false
  },

  create: logTrack => {

    // Rights
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a LogTrack' });
    }

    // Class Instance
    if(!logTrack instanceof LogTrack) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'LogTrack' });
    }

    // Minimum data
    if(!ensureFilledFields(logTrack, ['activity', 'companyId', 'employeeId'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['activity', 'companyId', 'employeeId'] });
    }

    // Check if the empoyee is the current user, and if the company is the one the current user has an active role on
    if(logTrack.employeeId !== DataService.computed.user.uid || logTrack.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // create
    return FirebaseService.getFirestore().collection('logtracks').add(migratePrototype(logTrack));
  },
  get: logTrackId => {

    // Rights
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_GET]()) {
      return ErrorService.manageErrorThenReject({ code: 'entity/right', details: 'Get a LogTrack' });
    }

    // get
    return FirebaseService.getFirestore().collection('logtracks').doc(logTrackId).get();
  },
  list: () => {

    // Rights
    // LogTracks collection contains a very large amount of documents
    console.warning('LogTrackService.list is not made for bulk calls!');

    // Rights
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_LIST]()) {
      return ErrorService.manageErrorThenReject({ code: 'entity/right', details: 'List LogTracks' });
    }

    // Fetch all logtracks
    const LOGTRACKS = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('logtracks').get()
            .then(querySnapshot => {
              // Build the final object
              querySnapshot.forEach(logTrackDoc => LOGTRACKS[logTrackDoc.id] = logTrackDoc.data());
              resolve(LOGTRACKS);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (logTrackId, logTrack) => {

    // Rights
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a LogTrack' });
    }

    // Class Instance
    if(!logTrack instanceof LogTrack) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'LogTrack' });
    }

    // Minimum data
    if(!ensureFilledFields(logTrack, ['activity', 'companyId', 'employeeId'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['activity', 'companyId', 'employeeId'] });
    }

    // Check if logtrack's employee is the current user and the company is the current activeRole one => otherwise, it's forbidden
    if(logTrack.employeeId !== DataService.computed.user.uid || logTrack.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // update
    return FirebaseService.getFirestore().collection('logtracks').doc(logTrackId).set(migratePrototype(logTrack));
  },
  updateField: (logTrackId, logTrackField) => {

    // Rights
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a LogTrack' });
    }
    
    // update
    return FirebaseService.getFirestore().collection('logtracks').doc(logTrackId).update(logTrackField);
  },
  delete: logTrackId => {

    // Rights
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a LogTrack' });
    }
    
    // delete
    return FirebaseService.getFirestore().collection('logtracks').doc(logTrackId).delete();
  },

  // CUSTOM FUNCTIONS

  // Get all logtracks linked to a company ended in the past 24H
  // Warning: this does not include current Logtracks
  getEndedForCompanyIdPast24h: companyId => {

    // Rights
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_LIST]()) {
      return ErrorService.manageErrorThenReject({ code: 'entity/right', details: 'List LogTracks' });
    }

    // Calculate the time yesterday, at the same hour (24H * 60min * 60seconds * 1000ms)
    const past24hTimestamp = DateService.getCurrentTimeStampNumber() - (24 * 60 * 60 * 1000);

    // Final object
    const LOGTRACKS = {};

    // Fetch all logtracks linked to the company and genrated in the past 24h
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('logtracks')
        .where('companyId', '==', companyId)
        .where('endTimestamp', '>=', past24hTimestamp)
        .get()
        .then(querySnapshot => {
          // assign these logtracks to the final object
          querySnapshot.forEach(logTrackDoc => LOGTRACKS[logTrackDoc.id] = logTrackDoc.data());
          resolve(LOGTRACKS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    }); 
  },

  // Get all logtracks linked to an employee and generated in the past 24H
  // Warning: this method does not return the current employee LogTrack
  // You can fetch it in employee.currentLogTrack
  getEndedForEmployeeIdPast24h: employeeId => {

    // Rights
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_LIST]()) {
      return ErrorService.manageErrorThenReject({ code: 'entity/right', details: 'List LogTracks' });
    }
    
    // Calculate the time yesterday, at the same hour (24H * 60min * 60seconds * 1000ms)
    const past24hTimestamp = DateService.getCurrentTimeStampNumber() - (24 * 60 * 60 * 1000);

    const LOGTRACKS = {};

    // Fetch all logtracks ended in the past 24h and linked to that employee
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('logtracks')
        .where('employeeId', '==', employeeId)
        .where('endTimestamp', '>=', past24hTimestamp)
        .get()
        .then(querySnapshot => {
          // Assign all of them to the same object, then resolve
          querySnapshot.forEach(logTrackDoc => LOGTRACKS[logTrackDoc.id] = logTrackDoc.data());
          resolve(LOGTRACKS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    }); 
  },

  // Get all equipment logtracks ended in the past day
  // Warning: this does not include the equipment current LogTrack
  // You can find it in equipment.currentLogTrack
  getEndedForEquipmentIdPast24h: equipmentId => {

    // Rights
    if(!LogTrackService.rights[ERights.RIGHT_LOGTRACK_LIST]()) {
      return ErrorService.manageErrorThenReject({ code: 'entity/right', details: 'List LogTracks' });
    }

    // Compute the timestamp at yesterday, same hour
    const past24hTimestamp = DateService.getCurrentTimeStampNumber() - (24 * 60 * 60 * 1000);

    const LOGTRACKS = {};

    // Fetch all logtracks containing this equipment in their applied equipments
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('logtracks')
        .where('equipmentIds', 'array-contains', equipmentId)
        .where('endTimestamp', '>=', past24hTimestamp)
        .get()
        .then(querySnapshot => {
          // Then, assign them to the result object, and resolve
          querySnapshot.forEach(logTrackDoc => LOGTRACKS[logTrackDoc.id] = logTrackDoc.data());
          resolve(LOGTRACKS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    }); 
  }
};

export default LogTrackService;
