import { ERights } from './../right.service';

import DateService from './../date.service';
import DataService, { ensureFilledFields } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import { EContactCategories } from './../../components/Entities/Contact/Contact';

/**
 * Service: ContactService
 * Service to manage contact messages entities
 */
const ContactService = {

  // Rights for contact entities
  rights: {
    [ERights.RIGHT_CONTACT_CREATE]: () => true,
    [ERights.RIGHT_CONTACT_GET]: () => false,
    [ERights.RIGHT_CONTACT_LIST]: () => DataService.computed.employee.staff,
    [ERights.RIGHT_CONTACT_UPDATE]: () => false,
    [ERights.RIGHT_CONTACT_DELETE]: () => false
  },

  create: contact => {
    // Rights
    if(!ContactService.rights[ERights.RIGHT_CONTACT_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Contact' });
    }

    // Minimum data
    if(!ensureFilledFields(contact, ['message', 'email', 'creationIsoDate', 'category'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['message', 'email', 'creationIsoDate', 'category'] });
    }

    // Create
    return FirebaseService.getFirestore().collection('contact').add(contact);
  },
  get: contactId => {

    // Rights
    if(!ContactService.rights[ERights.RIGHT_CONTACT_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Contact' });
    }

    // get
    return FirebaseService.getFirestore().collection('contact').doc(contactId).get();
  },
  list: () => {

    // Rights
    if(!ContactService.rights[ERights.RIGHT_CONTACT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Contacts' });
    }

    const CONTACTS = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('contact').get()
            .then(querySnapshot => {
              // Build object, then resolve
              querySnapshot.forEach(contactDoc => CONTACTS[contactDoc.id] = contactDoc.data());
              resolve(CONTACTS);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (contactId, contact) => {
    // Rights
    if(!ContactService.rights[ERights.RIGHT_CONTACT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Contact' });
    }

    // Minimum data
    if(!ensureFilledFields(contact, ['message', 'email', 'creationIsoDate', 'category'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['message', 'email', 'creationIsoDate', 'category'] });
    }

    // update
    return FirebaseService.getFirestore().collection('contact').doc(contactId).set(contact);
  },
  updateField: (contactId, contactField) => {
    // Rights
    if(!ContactService.rights[ERights.RIGHT_CONTACT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Contact' });
    }
    
    // update
    return FirebaseService.getFirestore().collection('contact').doc(contactId).update(contactField);
  },
  delete: contactId => {
    // Rights
    if(!ContactService.rights[ERights.RIGHT_CONTACT_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Contact' });
    }
    
    // delete
    return FirebaseService.getFirestore().collection('contact').doc(contactId).delete();
  },

  // CUSTOM FUNCTIONS

  // Create a contact message, with a message, email and category from EContactCategories
  createWithData: (message, email, category) => ContactService.create({message, email, category: EContactCategories[category], creationIsoDate: DateService.getCurrentIsoDateString() })
};

export default ContactService;
