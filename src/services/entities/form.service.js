import Form from '../../classes/Form';

import { ERights } from './../right.service';
import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

/**
 * Service: FormService
 * Service to manage forms
 */
const FormService = {

  // Rights for Form entities
  rights: {
    [ERights.RIGHT_FORM_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_FORM_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_FORM_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_FORM_UPDATE]: () => false,
    [ERights.RIGHT_FORM_DELETE]: () => false,
  },

  create: form => {

    // FormService
    if(!FormService.rights[ERights.RIGHT_FORM_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Form' });
    }

    // Class instance
    if(!form instanceof Form) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Form' });
    }

    // Minimum data
    if(!ensureFilledFields(form, ['creator', 'creationIsoDate', 'companyId', 'identification', 'questions'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['creator', 'creationIsoDate', 'companyId', 'identification', 'questions'] });
    }

    // Check if form creator is the current user.
    if(form.creator !== DataService.computed.user.uid) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // Check if active role is on the same company than the form's company
    if(form.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // Create
    return FirebaseService.getFirestore().collection('forms').add(migratePrototype(form));
  },
  get: formId => {

    // Rights
    if(!FormService.rights[ERights.RIGHT_FORM_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Form' });
    }

    // get
    return FirebaseService.getFirestore().collection('forms').doc(formId).get();
  },
  list: () => {
    
    // Rights
    if(!FormService.rights[ERights.RIGHT_FORM_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Forms' });
    }

    // Get all forms
    const FORMS = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('forms').get()
            .then(querySnapshot => {
              // Assign all forms to the same object, then resolve
              querySnapshot.forEach(formDoc => FORMS[formDoc.id] = formDoc.data());
              resolve(FORMS);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (formId, form) => {

    // Rigths
    if(!FormService.rights[ERights.RIGHT_FORM_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Form' });
    }

    // Class instance
    if(!form instanceof Form) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Form' });
    }

    // Minimum data
    if(!ensureFilledFields(form, ['creator', 'creationIsoDate', 'companyId', 'identification', 'questions'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['creator', 'creationIsoDate', 'companyId', 'identification', 'questions'] });
    }

    // Check if active role is on the same company than the form's company
    if(form.companyId !== DataService.computed.activeRole.companyId) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // update
    return FirebaseService.getFirestore().collection('forms').doc(formId).set(migratePrototype(form));
  },
  updateField: (formId, formField) => {

    // Rights
    if(!FormService.rights[ERights.RIGHT_FORM_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Form' });
    }
    
    // update
    return FirebaseService.getFirestore().collection('forms').doc(formId).update(formField);
  },
  delete: formId => {

    // Rights
    if(!FormService.rights[ERights.RIGHT_FORM_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Form' });
    }
    
    // delete
    return FirebaseService.getFirestore().collection('forms').doc(formId).delete();
  },

  // CUSTOM FUNCTIONS
  getAllForCompanyId: companyId => {

    // Rights
    if(!FormService.rights[ERights.RIGHT_FORM_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Forms' });
    }
    
    const FORMS = {};

    // fetch all forms that match the companyId
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('forms')
        .where('companyId', '==', companyId)
        .get()
        .then(querySnapshot => {
          // assign forms to the object, then resolve with it
          querySnapshot.forEach(formDoc => FORMS[formDoc.id] = formDoc.data());
          resolve(FORMS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  }

};

export default FormService;
