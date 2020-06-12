import { ERights } from './../right.service';

import DateService from './../date.service';
import DataService, { ensureFilledFields } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import { EContactCategories } from './../../components/Entities/Contact/Contact';

const ContactService = {
  rights: {
    [ERights.RIGHT_CONTACT_CREATE]: () => true,
    [ERights.RIGHT_CONTACT_GET]: () => false,
    [ERights.RIGHT_CONTACT_LIST]: () => DataService.computed.employee.staff,
    [ERights.RIGHT_CONTACT_UPDATE]: () => false,
    [ERights.RIGHT_CONTACT_DELETE]: () => false
  },
  create: contact => {
    if(!ContactService.rights[ERights.RIGHT_CONTACT_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Contact' });
    }

    if(!ensureFilledFields(contact, ['message', 'email', 'creationIsoDate', 'category'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['message', 'email', 'creationIsoDate', 'category'] });
    }

    return FirebaseService.getFirestore().collection('contact').add(contact);
  },
  get: contactId => {
    if(!ContactService.rights[ERights.RIGHT_CONTACT_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Contact' });
    }
    return FirebaseService.getFirestore().collection('contact').doc(contactId).get();
  },
  list: () => {
    if(!ContactService.rights[ERights.RIGHT_CONTACT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Contacts' });
    }

    const CONTACTS = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('contact').get()
            .then(querySnapshot => {
                querySnapshot.forEach(contactDoc => CONTACTS[contactDoc.id] = contactDoc.data());
                resolve(CONTACTS);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (contactId, contact) => {
    if(!ContactService.rights[ERights.RIGHT_CONTACT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Contact' });
    }

    if(!ensureFilledFields(contact, ['message', 'email', 'creationIsoDate', 'category'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['message', 'email', 'creationIsoDate', 'category'] });
    }

    return FirebaseService.getFirestore().collection('contact').doc(contactId).set(contact);
  },
  updateField: (contactId, contactField) => {
    if(!ContactService.rights[ERights.RIGHT_CONTACT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Contact' });
    }
    
    return FirebaseService.getFirestore().collection('contact').doc(contactId).update(contactField);
  },
  delete: contactId => {
    if(!ContactService.rights[ERights.RIGHT_CONTACT_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Contact' });
    }
    
    return FirebaseService.getFirestore().collection('contact').doc(contactId).delete();
  },

  // CUSTOM FUNCTIONS
  createWithData: (message, email, category) => ContactService.create({message, email, category: EContactCategories[category], creationIsoDate: DateService.getCurrentIsoDateString() })
};

export default ContactService;
