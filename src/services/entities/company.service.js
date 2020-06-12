import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import Company, { JobOffer, EJobOfferStatus } from './../../classes/Company';
import ESearchType from './../../classes/enums/ESearchType';
import { ERole } from './../../classes/Role';

const CompanyService = {
  rights: {
    [ERights.RIGHT_COMPANY_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_COMPANY_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_COMPANY_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_COMPANY_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_COMPANY_DELETE]: () => false
  },
  create: company => {
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Compamy' });
    }

    if(!company instanceof Company) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Company' });
    }

    if(!ensureFilledFields(company, ['name', 'creator', 'logoURL', 'color', 'creationIsoString', 'plan'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name', 'creator', 'logoURL', 'color', 'creationIsoString', 'plan'] });
    }

    return FirebaseService.getFirestore().collection('companies').add(migratePrototype(company));
  },
  get: companyId => {
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Company' });
    }
    return FirebaseService.getFirestore().collection('companies').doc(companyId).get();
  },
  list: () => {
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Companies' });
    }

    const COMPANIES = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('companies').get()
            .then(querySnapshot => {
                querySnapshot.forEach(companyDoc => COMPANIES[companyDoc.id] = companyDoc.data());
                resolve(COMPANIES);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (companyId, company) => {
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Company' });
    }

    if(!company instanceof Company) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Company' });
    }

    if(!ensureFilledFields(company, ['name', 'creator', 'logoURL', 'color', 'creationIsoString', 'plan'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name', 'creator', 'logoURL', 'color', 'creationIsoString', 'plan'] });
    }

    if(DataService.computed.activeRole.companyId !== companyId || DataService.computed.activeRole.role !== ERole.MANAGER) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getFirestore().collection('companies').doc(companyId).set(migratePrototype(company));
  },
  updateField: (companyId, companyField) => {
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Company' });
    }
    
    return FirebaseService.getFirestore().collection('companies').doc(companyId).update(companyField);
  },
  delete: companyId => {
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Company' });
    }
    
    return FirebaseService.getFirestore().collection('companies').doc(companyId).delete();
  },

  // CUSTOM FUNCTIONS
  getAllForIdList: idList => {
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Companies' });
    }

    const PROMISES = [],
      COMPANIES = {};

    return new Promise((resolve, reject) => {
      idList.forEach(companyId => PROMISES.push(CompanyService.get(companyId)));

      Promise.all(PROMISES)
        .then(companyDocs => {
            companyDocs.forEach(companyDoc => COMPANIES[companyDoc.id] = companyDoc.data());
            resolve(COMPANIES);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });            
  },
  getAllForCreatorId: creatorId => {
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Companies' });
    }

    const COMPANIES = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('companies')
      .where('creator', '==', creatorId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(companyDoc => COMPANIES[companyDoc.id] = companyDoc.data());
        resolve(COMPANIES);
      })
      .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  search: term => new Promise((resolve, reject) => {
      DataService.computed.search([ESearchType.COMPANIES], term, null)
        .then(results => resolve(results.data.companies))
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    }),

  jobOffer: {
    rights: {
      [ERights.RIGHT_JOBOFFERS_CREATE]: () => DataService.computed.isConnected(),
      [ERights.RIGHT_JOBOFFERS_GET]: () => DataService.computed.isConnected(),
      [ERights.RIGHT_JOBOFFERS_LIST]: () => DataService.computed.isConnected(),
      [ERights.RIGHT_JOBOFFERS_UPDATE]: () => DataService.computed.isConnected(),
      [ERights.RIGHT_JOBOFFERS_DELETE]: () => false
    },
    create: jobOffer => {
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_CREATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Job Offer' });
      }
  
      if(!jobOffer instanceof JobOffer) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Job Offer' });
      }
  
      if(!ensureFilledFields(jobOffer, ['title', 'description', 'role', 'companyId'])) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['title', 'description', 'role', 'companyId'] });
      }
  
      return FirebaseService.getFirestore().collection('jobOffers').add(migratePrototype(jobOffer));
    },
    get: jobOfferId => {
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_GET]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Job Offer' });
      }
      return FirebaseService.getFirestore().collection('jobOffers').doc(jobOfferId).get();
    },
    list: () => {
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Job Offers' });
      }
  
      const JOB_OFFERS = {};
      return new Promise((resolve, reject) => {
          FirebaseService.getFirestore().collection('jobOffers').get()
              .then(querySnapshot => {
                  querySnapshot.forEach(jobOfferDoc => JOB_OFFERS[jobOfferDoc.id] = jobOfferDoc.data());
                  resolve(JOB_OFFERS);
              })
              .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    update: (jobOfferId, jobOffer) => {
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_UPDATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Job Offer' });
      }
  
      if(!jobOffer instanceof JobOffer) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Job Offer' });
      }
  
      if(!ensureFilledFields(jobOffer, ['title', 'description', 'role', 'companyId'])) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['title', 'description', 'role', 'companyId'] });
      }
  
      return FirebaseService.getFirestore().collection('jobOffers').doc(jobOfferId).set(migratePrototype(jobOffer));
    },
    updateField: (jobOfferId, jobOfferField) => {
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_UPDATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Job Offer' });
      }
      
      return FirebaseService.getFirestore().collection('jobOffers').doc(jobOfferId).update(jobOfferField);
    },
    delete: jobOfferId => {
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_DELETE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Job Offer' });
      }
      
      return FirebaseService.getFirestore().collection('jobOffers').doc(jobOfferId).delete();
    },

    // CUSTOM FUNCTIONS
    getAllForCompanyId: companyId => {
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Job Offers' });
      }

      const JOB_OFFERS = {};
      return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('jobOffers')
        .where('companyId', '==', companyId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(jobOfferDoc => JOB_OFFERS[jobOfferDoc.id] = jobOfferDoc.data());
          resolve(JOB_OFFERS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    getAllForCreatorId: creatorId => {
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Job Offers' });
      }

      const JOB_OFFERS = {};
      return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('jobOffers')
        .where('creator', '==', creatorId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(jobOfferDoc => JOB_OFFERS[jobOfferDoc.id] = jobOfferDoc.data());
          resolve(JOB_OFFERS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    getOpenedForCompanyId: companyId => {
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Job Offers' });
      }

      const JOB_OFFERS = {};
      return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('jobOffers')
        .where('companyId', '==', companyId)
        .where('status', '==', EJobOfferStatus.OPENED)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(jobOfferDoc => JOB_OFFERS[jobOfferDoc.id] = jobOfferDoc.data());
          resolve(JOB_OFFERS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    countOpenedForCompanyId: companyId => {
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Job Offers' });
      }

      return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('jobOffers')
        .where('companyId', '==', companyId)
        .get()
        .then(querySnapshot => resolve(querySnapshot.size))
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },
    getAllOpenedPositions: () => {
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Job Offers' });
      }

      const JOB_OFFERS = {};
      return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('jobOffers')
        .where('status', '==', EJobOfferStatus.OPENED)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(jobOfferDoc => JOB_OFFERS[jobOfferDoc.id] = jobOfferDoc.data());
          resolve(JOB_OFFERS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    }
  }
};

export default CompanyService;
