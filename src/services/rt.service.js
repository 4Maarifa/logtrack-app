
import { ERights } from './right.service';

import DataService, { migratePrototype, ensureFilledFields } from './data.service';
import ErrorService from './error.service';
import FirebaseService from './firebase.service';

import RT_userMessage, { ERT_userMessage, ERT_userMessageDetails } from './../classes/RT_userMessage';
import RT_companyMessage, { ERT_companyMessage, ERT_companyMessageDetails } from './../classes/RT_companyMessage';

import { v4 as uuid } from 'uuid';

const RT_Service = {
  rights: {
    [ERights.RIGHT_RT_USER_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_RT_USER_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_RT_USER_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_RT_USER_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_RT_USER_DELETE]: () => false,

    [ERights.RIGHT_RT_COMPANY_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_RT_COMPANY_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_RT_COMPANY_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_RT_COMPANY_UPDATE]: () => false,
    [ERights.RIGHT_RT_COMPANY_DELETE]: () => false,
  },
  user: {
    create: rtUserMessage => {
      if(!RT_Service.rights[ERights.RIGHT_RT_USER_CREATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a User RTMessage' });
      }
  
      if(!rtUserMessage instanceof RT_userMessage) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_userMessage' });
      }
      
      if(!ensureFilledFields(rtUserMessage, ['type', 'creator', 'creationIsoDate', 'content', 'users'])) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['type', 'creator', 'creationIsoDate', 'content', 'users'] });
      }
  
      if(rtUserMessage.creator !== DataService.computed.user.uid) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/creator-not-match', details: 'RT_userMessage' });
      }
  
      if(!ERT_userMessage[rtUserMessage.type] || !ERT_userMessageDetails[rtUserMessage.type].verifyMetadata(rtUserMessage.metadata)) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_userMessage/metadata' });
      }
  
      const messageKey = uuid(), revision = rtUserMessage.revision;
  
      return new Promise((resolve, reject) => {
        FirebaseService.getRtDb().ref('/rtForUsers/' + messageKey).set(migratePrototype(rtUserMessage))
          .then(() => {
            Promise.all([
              Object.keys(rtUserMessage.users).map(userId =>
                FirebaseService.getRtDb().ref(`/users/${userId}/messages/${messageKey}`)
                .set({
                  revision,
                  private: ERT_userMessageDetails[rtUserMessage.type].buildPrivateInfo()
                }))
            ])
            .then(() => resolve(messageKey))
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
          })
          .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    get: rtUserMessageId => {
      if(!RT_Service.rights[ERights.RIGHT_RT_USER_GET]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a RT_userMessage' });
      }
  
      return new Promise((resolve, reject) => {
        FirebaseService.getRtDb().ref('/rtForUsers/' + rtUserMessageId).once('value')
          .then(snapshot => resolve({[snapshot.key]: snapshot.val()}))
          .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    list: () => {
      if(!RT_Service.rights[ERights.RIGHT_RT_USER_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List RT_userMessages' });
      }
  
    },
    update: (rtUserMessageId, rtUserMessage) => {
      if(!RT_Service.rights[ERights.RIGHT_RT_USER_UPDATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a RT_userMessage' });
      }
  
      if(!rtUserMessage instanceof RT_userMessage) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_userMessage' });
      }
      
      if(!ensureFilledFields(rtUserMessage, ['type', 'creator', 'content', 'creationIsoDate', 'users'])) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['type', 'creator', 'content', 'creationIsoDate', 'users'] });
      }
  
      if(rtUserMessage.creator !== DataService.computed.user.uid) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/creator-not-match', details: 'RT_userMessage' });
      }
  
      if(!ERT_userMessage[rtUserMessage.type] || !ERT_userMessageDetails[rtUserMessage.type].verifyMetadata(rtUserMessage.metadata)) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_userMessage/metadata' });
      }

      const revision = uuid(), newUsers = [], existingUsers = [], removedUsers = [];
  
      return new Promise((resolve, reject) => {
        FirebaseService.getRtDb().ref('/rtForUsers/' + rtUserMessageId).transaction(rtForUser => {
          if(!rtForUser) { return null; }
          rtForUser.content = rtUserMessage.content;
          rtForUser.metadata = rtUserMessage.metadata;
          
          rtForUser.revision = revision;

          // ADDING NEW USERS
          Object.keys(rtUserMessage.users).forEach(userId => {
            if(!rtForUser.users[userId]) {
              rtForUser.users[userId] = rtUserMessage.users[userId];
              newUsers.push(userId);
            }
            else {
              existingUsers.push(userId);
            }
          });

          // DELETING OLD USERS
          Object.keys(rtForUser.users).forEach(userId => {
            if(!rtUserMessage.users[userId]) {
              removedUsers.push(userId);
              delete rtForUser.users[userId];
            }
          });

          return rtForUser;
        }).then(() => {
          Promise.all([
            // ADDING RIGHTS FOR NEW USERS
            newUsers.map(userId =>
              FirebaseService.getRtDb()
                .ref(`/users/${userId}/messages/${rtUserMessageId}`)
                .set({
                  revision,
                  private: ERT_userMessageDetails[rtUserMessage.type].buildPrivateInfo()
                })),

            // UPDATING REVISION FOR EXISTING USERS
            existingUsers.map(userId => 
              FirebaseService.getRtDb()
                .ref(`/users/${userId}/messages/${rtUserMessageId}`)
                .transaction(userMessage => {
                  if(!userMessage) { return null; }
                  userMessage.revision = revision;
                  return userMessage;
                })),

            // REMOVING RIGHTS FOR REMOVED USERS
            removedUsers.map(userId => 
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
      if(!RT_Service.rights[ERights.RIGHT_RT_USER_DELETE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a RT_userMessage' });
      }
  
      return FirebaseService.getRtDb().ref('/rtForUsers/' + rtUserMessageId).remove();
    }
  },
  company: {
    create: rtCompanyMessage => {
      if(!RT_Service.rights[ERights.RIGHT_RT_COMPANY_CREATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a RT_companyMessage' });
      }
  
      if(!rtCompanyMessage instanceof RT_companyMessage) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_companyMessage' });
      }
      
      if(!ensureFilledFields(rtCompanyMessage, ['type', 'creator', 'creationIsoDate', 'content', 'roles'])) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['type', 'creator', 'creationIsoDate', 'content', 'roles'] });
      }
  
      if(rtCompanyMessage.creator !== DataService.computed.user.uid) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/creator-not-match', details: 'RT_companyMessage' });
      }
  
      if(!ERT_companyMessage[rtCompanyMessage.type] || !ERT_companyMessageDetails[rtCompanyMessage.metadata]) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_companyMessage/metadata' });
      }
  
      const messageKey = uuid();
  
      return new Promise((resolve, reject) => {
        FirebaseService.getRtDb().ref('/rtForCompanies/' + messageKey).set(migratePrototype(rtCompanyMessage))
          .then(() => resolve(messageKey))
          .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    get: rtCompanyMessageId => {
      if(!RT_Service.rights[ERights.RIGHT_RT_COMPANY_GET]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a RT_companyMessage' });
      }
  
      return new Promise((resolve, reject) => {
        FirebaseService.getRtDb().ref('/rtForCompanies/' + rtCompanyMessageId).once('value')
          .then(snapshot => resolve({[snapshot.key]: snapshot.val()}))
          .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    list: () => {
      if(!RT_Service.rights[ERights.RIGHT_RT_COMPANY_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List RT_companyMessages' });
      }
  
    },
    update: (rtCompanyMessageId, rtCompanyMessage) => {
      if(!RT_Service.rights[ERights.RIGHT_RT_COMPANY_UPDATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a RT_companyMessage' });
      }
  
      if(!rtCompanyMessage instanceof RT_companyMessage) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_companyMessage' });
      }
      
      if(!ensureFilledFields(rtCompanyMessage, ['type', 'creator', 'content', 'creationIsoDate', 'roles'])) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['type', 'creator', 'content', 'creationIsoDate', 'roles'] });
      }
  
      if(rtCompanyMessage.creator !== DataService.computed.user.uid) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/creator-not-match', details: 'RT_companyMessage' });
      }
  
      if(!ERT_companyMessage[rtCompanyMessage.type] || !ERT_companyMessageDetails[rtCompanyMessage.type].verifyMetadata(rtCompanyMessage.metadata)) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'RT_companyMessage/metadata' });
      }
  
      return FirebaseService.getRtDb().ref('/rtForCompanies/' + rtCompanyMessageId).set(migratePrototype(rtCompanyMessage));
    },
    delete: rtCompanyMessageId => {
      if(!RT_Service.rights[ERights.RIGHT_RT_COMPANY_DELETE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a RT_companyMessage' });
      }
  
      return FirebaseService.getRtDb().ref('/rtForCompanies/' + rtCompanyMessageId).remove();
    }
  },
  role: {
    updateRole: ({ role, companyId }) => (
      FirebaseService.getRtDb()
        .ref(`/users/${DataService.computed.user.uid}/role`).set({ role, companyId })
        .catch(ErrorService.manageError)
    ),
    resetRole: () => RT_Service.role.updateRole({ role: null, companyId: null })
  },
  // OBSERVERS
  _observers: {},
  _rtForUsers: {},
  _currentUserId: null,
  _initialized: false,
  _observerKey: uuid(),

  _onRT_userMessageAddedOrModified: rtSnapshot => {
    FirebaseService.getRtDb().ref(`/rtForUsers/${rtSnapshot.key}`)
      .once('value')
      .then(snapshot => {
        const message = migratePrototype(snapshot.val());
        message.forUser = rtSnapshot.val();
        message.type = ERT_userMessage[message.type];
        RT_Service._rtForUsers[rtSnapshot.key] = message;
        RT_Service.notifyObservers();
      })
      .catch(ErrorService.manageError);
  },
  _onRT_userMessageDelete: rtSnapshot => {
    delete RT_Service._rtForUsers[rtSnapshot.key];
    RT_Service.notifyObservers();
  },
  initialize: () => {
    DataService.computed.observeComputedValues(computed => {
      if(computed.initialized && (!computed.user || RT_Service._currentUserId !== computed.user.uid)) {
        RT_Service._initialized = false;
        RT_Service._rtForUsers = {};
        RT_Service._currentUserId = computed.user ? computed.user.uid : null;
        RT_Service.notifyObservers();
      }

      if(computed.initialized && computed.user && !RT_Service._initialized) {
        // INITLIALIZE LISTENERS
        FirebaseService.getRtDb().ref(`/users/${DataService.computed.user.uid}/messages`)
          .on('child_added', RT_Service._onRT_userMessageAddedOrModified);

        FirebaseService.getRtDb().ref(`/users/${DataService.computed.user.uid}/messages`)
          .on('child_changed', RT_Service._onRT_userMessageAddedOrModified);

        FirebaseService.getRtDb().ref(`/users/${DataService.computed.user.uid}/messages`)
          .on('child_removed', RT_Service._onRT_userMessageDelete);
        
        // MARK AS INITIALIZED
        RT_Service._initialized = true;
      }
    }, RT_Service._observerKey);
  },
  observeRTmessages: (callback, observerKey) => {
    RT_Service._observers[observerKey] = { callback };
    RT_Service.notifyObservers();
  },
  unobserveRTmessage: observerKey => delete RT_Service._observers[observerKey],
  notifyObservers: () => {
    if(!RT_Service._initialized) { return; }
    Object.keys(RT_Service._observers).forEach(observerKey => {
      if(!RT_Service._observers[observerKey]) { return; }
      RT_Service._observers[observerKey].callback(RT_Service._rtForUsers);
    });
  },

  // CUSTOM FUNCTIONS

};

export default RT_Service;
