import ERights from './../../classes/enums/ERights';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import Company from './../../classes/Company';

import ERole from './../../classes/enums/ERole';

const CompanyService = {
  rights: {
    [ERights.RIGHT_COMPANY_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_COMPANY_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_COMPANY_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_COMPANY_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_COMPANY_DELETE]: () => false
  },
  create(company) {
    if (!CompanyService.rights[ERights.RIGHT_COMPANY_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Compamy' });
    }

    if (!company instanceof Company) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Company' });
    }

    if (!ensureFilledFields(company, ['name', 'creator'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name', 'creator'] });
    }

    return FirebaseService.getDb().collection('companies').add(migratePrototype(company));
  },
  get(companyId) {
    if (!CompanyService.rights[ERights.RIGHT_COMPANY_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Company' });
    }
    return FirebaseService.getDb().collection('companies').doc(companyId).get();
  },
  list() {
    if (!CompanyService.rights[ERights.RIGHT_COMPANY_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Companies' });
    }

    var companies = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getDb().collection('companies').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((companyDoc) => companies[companyDoc.id] = companyDoc.data());
                resolve(companies);
            })
            .catch((e) => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update(company) {
    if (!CompanyService.rights[ERights.RIGHT_COMPANY_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Company' });
    }

    if (!company instanceof Company) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Company' });
    }

    if (!ensureFilledFields(company, ['id', 'name', 'creator'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['id', 'name', 'creator'] });
    }

    if (DataService.computed.activeRole.companyId !== company.id || DataService.computed.activeRole.role !== ERole.MANAGER) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('companies').doc(company.id).set(migratePrototype(company));
  },
  updateField(companyId, companyField) {
    if (!CompanyService.rights[ERights.RIGHT_COMPANY_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Company' });
    }
    
    return FirebaseService.getDb().collection('companies').doc(companyId).update(companyField);
  },
  delete(companyId) {
    if (!CompanyService.rights[ERights.RIGHT_COMPANY_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Company' });
    }
    
    return FirebaseService.getDb().collection('companies').doc(companyId).delete();
  },

  // CUSTOM FUNCTIONS
  getAllForIdList(idList) {
    if (!CompanyService.rights[ERights.RIGHT_COMPANY_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Companies' });
    }

    var promises = [];
    var companies = {};

    return new Promise((resolve, reject) => {
      idList.forEach((companyId) => promises.push(CompanyService.get(companyId)));

      Promise.all(promises)
        .then((companyDocs) => {
            companyDocs.forEach((companyDoc) => companies[companyDoc.id] = companyDoc.data());
            resolve(companies);
        })
        .catch((e) => ErrorService.manageErrorThenReject(e, reject));
    });            
  },
  search(term) {
    if (!CompanyService.rights[ERights.RIGHT_COMPANY_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Companies' });
    }

    return FirebaseService.getDb().collection('companies').orderBy('name').startAt(term.toUpperCase()).endAt(term.toLowerCase() + "\uf8ff").get();
  }
};

export default CompanyService;
