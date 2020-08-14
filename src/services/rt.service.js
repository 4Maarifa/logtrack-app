
import { ERights } from './right.service';

import DataService, { migratePrototype, ensureFilledFields } from './data.service';
import ErrorService from './error.service';
import FirebaseService from './firebase.service';

import RT_userMessage, { ERT_userMessage, ERT_userMessageDetails } from './../classes/RT_userMessage';
import RT_companyMessage, { ERT_companyMessage, ERT_companyMessageDetails } from './../classes/RT_companyMessage';

import { v4 as uuid } from 'uuid';

/**
 * Service: RT_Service
 * Service to interact with all real-time data
 */
const RT_Service = {

  // RT rights
  rights: {

    // RT_User messages rights
    [ERights.RIGHT_RT_USER_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_RT_USER_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_RT_USER_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_RT_USER_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_RT_USER_DELETE]: () => false,

    // RT_company messages rights
    [ERights.RIGHT_RT_COMPANY_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_RT_COMPANY_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_RT_COMPANY_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_RT_COMPANY_UPDATE]: () => false,
    [ERights.RIGHT_RT_COMPANY_DELETE]: () => false,
  },

  // RT_User messages
  user: {
    create: rtUserMessage => {

      // Rights
      if(!RT_Service.rights[ERights.RIGHT_RT_USER_CREATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a User RTMessage' });
      }
  
      // Class instance
      if(!rtUserMessage instanceof RT_userMessage) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_userMessage' });
      }
      
      // Minimum data
      if(!ensureFilledFields(rtUserMessage, ['type', 'creator', 'creationIsoDate', 'content', 'users'])) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['type', 'creator', 'creationIsoDate', 'content', 'users'] });
      }
  
      // Creator verfication
      if(rtUserMessage.creator !== DataService.computed.user.uid) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/creator-not-match', details: 'RT_userMessage' });
      }
  
      // Verify the metadata
      if(!ERT_userMessage[rtUserMessage.type] || !ERT_userMessageDetails[rtUserMessage.type].verifyMetadata(rtUserMessage.metadata)) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_userMessage/metadata' });
      }
  
      // Generating the message id and revision
      const MESSAGE_ID = uuid(), REVISION = rtUserMessage.revision;
  
      // Push message
      return new Promise((resolve, reject) => {
        FirebaseService.getRtDb().ref('/rtForUsers/' + MESSAGE_ID).set(migratePrototype(rtUserMessage))
          .then(() => {

            // push rights to access the message
            Promise.all([
              Object.keys(rtUserMessage.users).map(userId =>
                FirebaseService.getRtDb().ref(`/users/${userId}/messages/${MESSAGE_ID}`)
                .set({
                  REVISION,
                  private: ERT_userMessageDetails[rtUserMessage.type].buildPrivateInfo()
                }))
            ])
            .then(() => resolve(MESSAGE_ID))
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
          })
          .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    get: rtUserMessageId => {

      // Rights
      if(!RT_Service.rights[ERights.RIGHT_RT_USER_GET]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a RT_userMessage' });
      }
  
      // Get message
      return new Promise((resolve, reject) => {
        FirebaseService.getRtDb().ref('/rtForUsers/' + rtUserMessageId).once('value')
          .then(snapshot => resolve({[snapshot.key]: snapshot.val()}))
          .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    list: () => {

      // Rights
      if(!RT_Service.rights[ERights.RIGHT_RT_USER_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List RT_userMessages' });
      }
  
      // NOTHING : useful?
      ErrorService.error('Not implemented yet.');
    },
    update: (rtUserMessageId, rtUserMessage) => {

      // Rights
      if(!RT_Service.rights[ERights.RIGHT_RT_USER_UPDATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a RT_userMessage' });
      }
  
      // Class Instance
      if(!rtUserMessage instanceof RT_userMessage) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_userMessage' });
      }
      
      // Minimum data
      if(!ensureFilledFields(rtUserMessage, ['type', 'creator', 'content', 'creationIsoDate', 'users'])) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['type', 'creator', 'content', 'creationIsoDate', 'users'] });
      }
  
      // Creator verification
      if(rtUserMessage.creator !== DataService.computed.user.uid) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/creator-not-match', details: 'RT_userMessage' });
      }

      // Metadata verification
      if(!ERT_userMessage[rtUserMessage.type] || !ERT_userMessageDetails[rtUserMessage.type].verifyMetadata(rtUserMessage.metadata)) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_userMessage/metadata' });
      }

      // Building revision and computing users
      const REVISION = uuid(), NEW_USERS = [], EXISTING_USERS = [], REMOVED_USERS = [];
  
      return new Promise((resolve, reject) => {

        // transactions
        FirebaseService.getRtDb().ref('/rtForUsers/' + rtUserMessageId).transaction(rtForUser => {
          if(!rtForUser) { return null; }

          // update data
          rtForUser.content = rtUserMessage.content;
          rtForUser.metadata = rtUserMessage.metadata;
          
          rtForUser.revision = REVISION;

          // ADDING NEW USERS
          Object.keys(rtUserMessage.users).forEach(userId => {
            if(!rtForUser.users[userId]) {
              rtForUser.users[userId] = rtUserMessage.users[userId];
              NEW_USERS.push(userId);
            }
            else {
              EXISTING_USERS.push(userId);
            }
          });

          // DELETING OLD USERS
          Object.keys(rtForUser.users).forEach(userId => {
            if(!rtUserMessage.users[userId]) {
              REMOVED_USERS.push(userId);
              delete rtForUser.users[userId];
            }
          });

          return rtForUser;
        }).then(() => {
          Promise.all([
            // ADDING RIGHTS FOR NEW USERS
            NEW_USERS.map(userId =>
              FirebaseService.getRtDb()
                .ref(`/users/${userId}/messages/${rtUserMessageId}`)
                .set({
                  REVISION,
                  private: ERT_userMessageDetails[rtUserMessage.type].buildPrivateInfo()
                })),

            // UPDATING REVISION FOR EXISTING USERS
            EXISTING_USERS.map(userId => 
              FirebaseService.getRtDb()
                .ref(`/users/${userId}/messages/${rtUserMessageId}`)
                .transaction(userMessage => {
                  if(!userMessage) { return null; }
                  userMessage.revision = REVISION;
                  return userMessage;
                })),

            // REMOVING RIGHTS FOR REMOVED USERS
            REMOVED_USERS.map(userId => 
              FirebaseService.getRtDb()
                .ref(`/users/${userId}/messages/${rtUserMessageId}`)
                .remove())
          ])
          .then(() => resolve(rtUserMessageId))
          .catch(ErrorService.manageError);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    delete: rtUserMessageId => {

      // Rights
      if(!RT_Service.rights[ERights.RIGHT_RT_USER_DELETE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a RT_userMessage' });
      }
  
      // delete
      return FirebaseService.getRtDb().ref('/rtForUsers/' + rtUserMessageId).remove();
    }
  },

  // RT_Company messages
  company: {
    create: rtCompanyMessage => {

      // Rights
      if(!RT_Service.rights[ERights.RIGHT_RT_COMPANY_CREATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a RT_companyMessage' });
      }
  
      // Class instance
      if(!rtCompanyMessage instanceof RT_companyMessage) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_companyMessage' });
      }
      
      // minimum data
      if(!ensureFilledFields(rtCompanyMessage, ['type', 'creator', 'creationIsoDate', 'content', 'roles'])) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['type', 'creator', 'creationIsoDate', 'content', 'roles'] });
      }
  
      // creator verification
      if(rtCompanyMessage.creator !== DataService.computed.user.uid) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/creator-not-match', details: 'RT_companyMessage' });
      }
  
      // verify metadata
      if(!ERT_companyMessage[rtCompanyMessage.type] || !ERT_companyMessageDetails[rtCompanyMessage.metadata]) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_companyMessage/metadata' });
      }
  
      // building id
      const MESSAGE_ID = uuid();
  
      // create message
      return new Promise((resolve, reject) => {
        FirebaseService.getRtDb().ref('/rtForCompanies/' + MESSAGE_ID).set(migratePrototype(rtCompanyMessage))
          .then(() => resolve(MESSAGE_ID))
          .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    get: rtCompanyMessageId => {

      // Rights
      if(!RT_Service.rights[ERights.RIGHT_RT_COMPANY_GET]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a RT_companyMessage' });
      }
  
      // Get message
      return new Promise((resolve, reject) => {
        FirebaseService.getRtDb().ref('/rtForCompanies/' + rtCompanyMessageId).once('value')
          .then(snapshot => resolve({[snapshot.key]: snapshot.val()}))
          .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    list: () => {

      // Rights
      if(!RT_Service.rights[ERights.RIGHT_RT_COMPANY_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List RT_companyMessages' });
      }
  
      // NOTHING: useful?
      ErrorService.error('Not implemented yet');
    },
    update: (rtCompanyMessageId, rtCompanyMessage) => {

      // Rights
      if(!RT_Service.rights[ERights.RIGHT_RT_COMPANY_UPDATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a RT_companyMessage' });
      }
  
      // Class instance
      if(!rtCompanyMessage instanceof RT_companyMessage) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_companyMessage' });
      }
      
      // Minimum data
      if(!ensureFilledFields(rtCompanyMessage, ['type', 'creator', 'content', 'creationIsoDate', 'roles'])) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['type', 'creator', 'content', 'creationIsoDate', 'roles'] });
      }
  
      // creator verification
      if(rtCompanyMessage.creator !== DataService.computed.user.uid) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/creator-not-match', details: 'RT_companyMessage' });
      }
  
      // metadata verification
      if(!ERT_companyMessage[rtCompanyMessage.type] || !ERT_companyMessageDetails[rtCompanyMessage.type].verifyMetadata(rtCompanyMessage.metadata)) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_companyMessage/metadata' });
      }
  
      // update
      return FirebaseService.getRtDb().ref('/rtForCompanies/' + rtCompanyMessageId).set(migratePrototype(rtCompanyMessage));
    },
    delete: rtCompanyMessageId => {

      // rights
      if(!RT_Service.rights[ERights.RIGHT_RT_COMPANY_DELETE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a RT_companyMessage' });
      }
  
      // delete message
      return FirebaseService.getRtDb().ref('/rtForCompanies/' + rtCompanyMessageId).remove();
    }
  },

  // Active role
  role: {

    // update the active role
    updateRole: ({ role, companyId }) => (
      FirebaseService.getRtDb()
        .ref(`/users/${DataService.computed.user.uid}/role`).set({ role, companyId })
        .catch(ErrorService.manageError)
    ),

    // remove active role
    resetRole: () => RT_Service.role.updateRole({ role: null, companyId: null })
  },

  // OBSERVERS

  // observer list
  _observers: {},

  // RT_User message list
  _rtForUsers: {},

  // RT_Company message list
  _currentUserId: null,

  // Is data initialized?
  _initialized: false,

  _observerKey: uuid(),

  // When a message is updated or modified
  _onRT_userMessageAddedOrModified: rtSnapshot => {
    
    // get the new message
    FirebaseService.getRtDb().ref(`/rtForUsers/${rtSnapshot.key}`)
      .once('value')
      .then(snapshot => {

        // then, save the new message
        const MESSAGE = migratePrototype(snapshot.val());
        MESSAGE.forUser = rtSnapshot.val();
        MESSAGE.type = ERT_userMessage[MESSAGE.type];
        RT_Service._rtForUsers[rtSnapshot.key] = MESSAGE;

        // and notify the observers
        RT_Service.notifyObservers();
      })
      .catch(ErrorService.manageError);
  },

  // When a user message is deleted
  _onRT_userMessageDelete: rtSnapshot => {

    // deleting the message from records
    delete RT_Service._rtForUsers[rtSnapshot.key];

    // notify the observers
    RT_Service.notifyObservers();
  },

  // Initialize data
  initialize: () => {

    // When the dataservice computed data is initialized
    DataService.computed.observeComputedValues(computed => {

      // If the user is not signed in
      if(computed.initialized && (!computed.user || RT_Service._currentUserId !== computed.user.uid)) {

        // Re-Initialize data here
        RT_Service._initialized = false;
        RT_Service._rtForUsers = {};
        RT_Service._currentUserId = computed.user ? computed.user.uid : null;

        // Notify observers with no data
        RT_Service.notifyObservers();
      }

      // If a user is signedin
      if(computed.initialized && computed.user && !RT_Service._initialized) {
        // INITLIALIZE LISTENERS

        // Intialize listener for added messages
        FirebaseService.getRtDb().ref(`/users/${DataService.computed.user.uid}/messages`)
          .on('child_added', RT_Service._onRT_userMessageAddedOrModified);

        // Initlialize listener for modified messages
        FirebaseService.getRtDb().ref(`/users/${DataService.computed.user.uid}/messages`)
          .on('child_changed', RT_Service._onRT_userMessageAddedOrModified);

        // Initialize listener for removed messages
        FirebaseService.getRtDb().ref(`/users/${DataService.computed.user.uid}/messages`)
          .on('child_removed', RT_Service._onRT_userMessageDelete);
        
        // MARK AS INITIALIZED
        RT_Service._initialized = true;
      }
    }, RT_Service._observerKey);
  },

  // Add an observer
  observeRTmessages: (callback, observerKey) => {

    // add the observers to the list
    RT_Service._observers[observerKey] = { callback };

    // Send data to all observers
    RT_Service.notifyObservers();
  },

  // Remove an observer
  // Pass the same unique observerKey than on obserer registration
  unobserveRTmessage: observerKey => delete RT_Service._observers[observerKey],

  // Notify all the observers
  notifyObservers: () => {

    // If service is not initialized yet, wait for initialization
    if(!RT_Service._initialized) { return; }

    // Loop through observers
    Object.keys(RT_Service._observers).forEach(observerKey => {
      if(!RT_Service._observers[observerKey]) { return; }

      // Call them with loaded data
      RT_Service._observers[observerKey].callback(RT_Service._rtForUsers);
    });
  },

  // CUSTOM FUNCTIONS

};

export default RT_Service;
