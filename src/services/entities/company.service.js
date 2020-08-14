import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import Company, { JobOffer, EJobOfferStatus } from './../../classes/Company';
import ESearchType from './../../classes/enums/ESearchType';
import { ERole } from './../../classes/Role';

/**
 * Service: CompanyService
 * service to manage Company entities
 */
const CompanyService = {

  // Rights for Company entity
  rights: {
    [ERights.RIGHT_COMPANY_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_COMPANY_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_COMPANY_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_COMPANY_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_COMPANY_DELETE]: () => false
  },
  create: company => {

    // Rights
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Compamy' });
    }

    // Class instance
    if(!company instanceof Company) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Company' });
    }

    // Minimum data
    if(!ensureFilledFields(company, ['name', 'creator', 'logoURL', 'color', 'creationIsoString', 'plan'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name', 'creator', 'logoURL', 'color', 'creationIsoString', 'plan'] });
    }

    // create
    return FirebaseService.getFirestore().collection('companies').add(migratePrototype(company));
  },
  get: companyId => {

    // Rights
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Company' });
    }

    // get
    return FirebaseService.getFirestore().collection('companies').doc(companyId).get();
  },
  list: () => {

    // Rights
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Companies' });
    }

    // List all companies
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

    // Rights
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Company' });
    }

    // Class instance
    if(!company instanceof Company) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Company' });
    }

    // Minimum data
    if(!ensureFilledFields(company, ['name', 'creator', 'logoURL', 'color', 'creationIsoString', 'plan'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['name', 'creator', 'logoURL', 'color', 'creationIsoString', 'plan'] });
    }

    // Role-related rights
    if(DataService.computed.activeRole.companyId !== companyId || DataService.computed.activeRole.role !== ERole.MANAGER) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // update
    return FirebaseService.getFirestore().collection('companies').doc(companyId).set(migratePrototype(company));
  },
  updateField: (companyId, companyField) => {

    // Rights
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Company' });
    }
    
    // update
    return FirebaseService.getFirestore().collection('companies').doc(companyId).update(companyField);
  },
  delete: companyId => {

    // Rights
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Company' });
    }
    
    // delete
    return FirebaseService.getFirestore().collection('companies').doc(companyId).delete();
  },

  // CUSTOM FUNCTIONS

  // Get all companies which id is in idList
  getAllForIdList: idList => {

    // Rights
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Companies' });
    }

    // Convert the idList to a Promise array
    const PROMISES = [],
      COMPANIES = {};

    return new Promise((resolve, reject) => {
      idList.forEach(companyId => PROMISES.push(CompanyService.get(companyId)));

      Promise.all(PROMISES)
        .then(companyDocs => {

          // Once we have all companioes, build result object and resolve with it
          companyDocs.forEach(companyDoc => COMPANIES[companyDoc.id] = companyDoc.data());
          resolve(COMPANIES);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });            
  },

  // Get all companies created by a user
  getAllForCreatorId: creatorId => {

    // Rights
    if(!CompanyService.rights[ERights.RIGHT_COMPANY_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Companies' });
    }

    // get all companies that have this specific creator
    const COMPANIES = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('companies')
      .where('creator', '==', creatorId)
      .get()
      .then(querySnapshot => {

        // Build the result object, then resolve with it
        querySnapshot.forEach(companyDoc => COMPANIES[companyDoc.id] = companyDoc.data());
        resolve(COMPANIES);
      })
      .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },

  // Search for companies
  search: term => new Promise((resolve, reject) => {
      DataService.computed.search([ESearchType.COMPANIES], term, null)
        .then(results => resolve(results.data.companies))
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    }),

  // Nested: Job Offers entities
  jobOffer: {

    // Rights for Job Offer entities
    rights: {
      [ERights.RIGHT_JOBOFFERS_CREATE]: () => DataService.computed.isConnected(),
      [ERights.RIGHT_JOBOFFERS_GET]: () => DataService.computed.isConnected(),
      [ERights.RIGHT_JOBOFFERS_LIST]: () => DataService.computed.isConnected(),
      [ERights.RIGHT_JOBOFFERS_UPDATE]: () => DataService.computed.isConnected(),
      [ERights.RIGHT_JOBOFFERS_DELETE]: () => false
    },
    create: jobOffer => {

      // Rights
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_CREATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Job Offer' });
      }
  
      // Class Instance
      if(!jobOffer instanceof JobOffer) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Job Offer' });
      }
  
      // Minimum data
      if(!ensureFilledFields(jobOffer, ['title', 'description', 'role', 'companyId'])) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['title', 'description', 'role', 'companyId'] });
      }
  
      // create
      return FirebaseService.getFirestore().collection('jobOffers').add(migratePrototype(jobOffer));
    },
    get: jobOfferId => {

      // Rights
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_GET]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Job Offer' });
      }

      // Get
      return FirebaseService.getFirestore().collection('jobOffers').doc(jobOfferId).get();
    },
    list: () => {

      // Rights
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Job Offers' });
      }
  
      // list job offers
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

      // rights
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_UPDATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Job Offer' });
      }
  
      // Class instance
      if(!jobOffer instanceof JobOffer) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Job Offer' });
      }
  
      // Minimum data
      if(!ensureFilledFields(jobOffer, ['title', 'description', 'role', 'companyId'])) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['title', 'description', 'role', 'companyId'] });
      }
  
      // Update
      return FirebaseService.getFirestore().collection('jobOffers').doc(jobOfferId).set(migratePrototype(jobOffer));
    },
    updateField: (jobOfferId, jobOfferField) => {

      // Rights
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_UPDATE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Job Offer' });
      }
      
      // update
      return FirebaseService.getFirestore().collection('jobOffers').doc(jobOfferId).update(jobOfferField);
    },
    delete: jobOfferId => {

      // Rights
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_DELETE]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Job Offer' });
      }
      
      // delete
      return FirebaseService.getFirestore().collection('jobOffers').doc(jobOfferId).delete();
    },

    // CUSTOM FUNCTIONS

    // get all job offers published by a company, including the closed ones
    getAllForCompanyId: companyId => {

      // Rights
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Job Offers' });
      }

      // Get all job offers for that companyId
      const JOB_OFFERS = {};
      return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('jobOffers')
        .where('companyId', '==', companyId)
        .get()
        .then(querySnapshot => {
          // Build object and resolve
          querySnapshot.forEach(jobOfferDoc => JOB_OFFERS[jobOfferDoc.id] = jobOfferDoc.data());
          resolve(JOB_OFFERS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },

    // get all job offers created by a user
    getAllForCreatorId: creatorId => {

      // Rights
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Job Offers' });
      }

      // Get all job offers created by the creatorId
      const JOB_OFFERS = {};
      return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('jobOffers')
        .where('creator', '==', creatorId)
        .get()
        .then(querySnapshot => {
          // Build resulting object and resolve with it
          querySnapshot.forEach(jobOfferDoc => JOB_OFFERS[jobOfferDoc.id] = jobOfferDoc.data());
          resolve(JOB_OFFERS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },

    // Get all opened job offers for a specific company
    getOpenedForCompanyId: companyId => {

      // Rights
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Job Offers' });
      }

      // Get all opened job offers for that companyId
      const JOB_OFFERS = {};
      return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('jobOffers')
        .where('companyId', '==', companyId)
        .where('status', '==', EJobOfferStatus.OPENED)
        .get()
        .then(querySnapshot => {

          // build resulting object and resolve with it
          querySnapshot.forEach(jobOfferDoc => JOB_OFFERS[jobOfferDoc.id] = jobOfferDoc.data());
          resolve(JOB_OFFERS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },

    // Count the number of opened job offers for a specific company
    countOpenedForCompanyId: companyId => {

      // Rights
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Job Offers' });
      }

      // Count opened job offers for that companyID
      return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('jobOffers')
        .where('companyId', '==', companyId)
        .where('status', '==', EJobOfferStatus.OPENED)
        .get()
        .then(querySnapshot => resolve(querySnapshot.size))
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    },

    // Get all opened job offers
    getAllOpenedPositions: () => {

      // Rights
      if(!CompanyService.jobOffer.rights[ERights.RIGHT_JOBOFFERS_LIST]()) {
        return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Job Offers' });
      }

      const JOB_OFFERS = {};
      return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('jobOffers')
        .where('status', '==', EJobOfferStatus.OPENED)
        .get()
        .then(querySnapshot => {
          // Build resulting object, resolve with it
          querySnapshot.forEach(jobOfferDoc => JOB_OFFERS[jobOfferDoc.id] = jobOfferDoc.data());
          resolve(JOB_OFFERS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
      });
    }
  }
};

export default CompanyService;
