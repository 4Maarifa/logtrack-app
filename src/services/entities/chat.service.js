import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import Chat from '../../classes/Chat';

const ChatService = {
  rights: {
    [ERights.RIGHT_CHAT_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_CHAT_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_CHAT_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_CHAT_UPDATE]: () => false,
    [ERights.RIGHT_CHAT_DELETE]: () => false
  },
  create(chat) {
    if(!ChatService.rights[ERights.RIGHT_CHAT_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Chat' });
    }

    if(!chat instanceof Chat) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Chat' });
    }

    if(!ensureFilledFields(chat, ['creator', 'datetime', 'users'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['creator', 'datetime', 'users'] });
    }

    if(chat.creator !== DataService.computed.employee.id || !chat.users.includes(DataService.computed.employee.id)) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('chats').add(migratePrototype(chat));
  },
  get(chatId) {
    if(!ChatService.rights[ERights.RIGHT_CHAT_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Chat' });
    }
    return FirebaseService.getDb().collection('chats').doc(chatId).get();
  },
  list() {
    if(!ChatService.rights[ERights.RIGHT_CHAT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Chats' });
    }

    var chats = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getDb().collection('chats').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((chatDoc) => chats[chatDoc.id] = chatDoc.data());
                resolve(chats);
            })
            .catch((e) => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update(chat) {
    if(!ChatService.rights[ERights.RIGHT_CHAT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Chat' });
    }

    if(!ensureFilledFields(chat, ['creator', 'message', 'datetime', 'users'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['creator', 'message', 'datetime', 'users'] });
    }

    if(!chat instanceof Chat) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Chat' });
    }

    if(chat.creator !== DataService.computed.employee.id || !chat.users.includes(DataService.computed.employee.id)) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('chats').doc(chat.id).set(migratePrototype(chat));
  },
  updateField(chatId, chatField) {
    if(!ChatService.rights[ERights.RIGHT_CHAT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Chat' });
    }
    
    return FirebaseService.getDb().collection('chats').doc(chatId).update(chatField);
  },
  delete(chatId) {
    if(!ChatService.rights[ERights.RIGHT_CHAT_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Chat' });
    }
    
    return FirebaseService.getDb().collection('chats').doc(chatId).delete();
  },

  // CUSTOM FUNCTIONS
  getAllForUserId(userId) {
    if(!ChatService.rights[ERights.RIGHT_CHAT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Chats' });
    }

    var chats = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getDb().collection('chats')
      .where('users', 'array-contains', userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(chatDoc => chats[chatDoc.id] = chatDoc.data());
        resolve(chats);
      })
      .catch((e) => ErrorService.manageErrorThenReject(e, reject));
    });
  }
};

export default ChatService;
