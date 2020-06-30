import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import Contract, { EContractStatus } from './../../classes/Contract';
import { ERole } from './../../classes/Role';
import ESearchType from './../../classes/enums/ESearchType';

/**
 * Service: ContractService
 * service to manage contract entities
 */
const ContractService = {

  // Rights for contract entities
  rights: {
    [ERights.RIGHT_CONTRACT_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_CONTRACT_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_CONTRACT_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_CONTRACT_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_CONTRACT_DELETE]: () => false
  },

  create: contract => {
    // Rights
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Contract' });
    }

    // Class instance
    if(!contract instanceof Contract) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Contract' });
    }

    // Minimum data
    if(!ensureFilledFields(contract, ['companyOrderId', 'companyExecId', 'contractType', 'status'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['companyOrderId', 'companyExecId', 'contractType', 'status'] });
    }

    // If the contract is not a draft, or the user is not manager, or the active role company is not part of contract => error
    if(contract.status !== EContractStatus.DRAFT || DataService.computed.activeRole.role !== ERole.MANAGER ||
        (DataService.computed.activeRole.companyId !== contract.companyOrderId && DataService.computed.activeRole.companyId !== contract.companyExecId)) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // create
    return FirebaseService.getFirestore().collection('contracts').add(migratePrototype(contract));
  },
  get: contractId => {
    // Rights
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Contract' });
    }

    // get
    return FirebaseService.getFirestore().collection('contracts').doc(contractId).get();
  },
  list: () => {
    // Rights
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Contracts' });
    }

    // List contracts
    const CONTRACTS = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getFirestore().collection('contracts').get()
            .then(querySnapshot => {
              // build object list, then resolve
              querySnapshot.forEach(contractDoc => CONTRACTS[contractDoc.id] = contractDoc.data());
              resolve(CONTRACTS);
            })
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update: (contractId, contract) => {
    // Rights
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Contract' });
    }

    // Class instance
    if(!contract instanceof Contract) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Contract' });
    }

    // Minimum data
    if(!ensureFilledFields(contract, ['companyOrderId', 'companyExecId', 'contractType', 'status'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['companyOrderId', 'companyExecId', 'contractType', 'status'] });
    }

    // If the user role is not manager, or if the company of active role is not part of the contract => forbidden
    if(DataService.computed.activeRole.role !== ERole.MANAGER ||
      (DataService.computed.activeRole.companyId !== contract.companyOrderId && DataService.computed.activeRole.companyId !== contract.companyExecId)) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    // update
    return FirebaseService.getFirestore().collection('contracts').doc(contractId).set(migratePrototype(contract));
  },
  updateField: (contractId, contractField) => {
    // Rights
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Contract' });
    }
    
    // update
    return FirebaseService.getFirestore().collection('contracts').doc(contractId).update(contractField);
  },
  delete: contractId => {
    // Rights
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Contract' });
    }
    
    // delete
    return FirebaseService.getFirestore().collection('contracts').doc(contractId).delete();
  },

  // CUSTOM FUNCTIONS

  // Get all contracts executed by the company, with a specific status. Default status are all but Archived
  getAllForCompanyExecId: (companyExecId, statusArray = [EContractStatus.DRAFT, EContractStatus.EXECUTION, EContractStatus.FINISHED, EContractStatus.PAID]) => {

    // Rights
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Contracts' });
    }

    // Get all contracts that match
    const CONTRACTS = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('contracts')
        .where('companyExecId', '==', companyExecId)
        .where('status', 'in', statusArray)
        .get()
        .then(querySnapshot => {
          // build result and return it
          querySnapshot.forEach(contractDoc => CONTRACTS[contractDoc.id] = contractDoc.data());
          resolve(CONTRACTS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },

  // Get all contracts orderned by the comapny, with a specific status. Default status are all but archived
  getAllForCompanyOrderId: (companyOrderId, statusArray = [EContractStatus.DRAFT, EContractStatus.EXECUTION, EContractStatus.FINISHED, EContractStatus.PAID]) => {

    // Rights
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Contracts' });
    }
    
    // List contracts
    const CONTRACTS = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getFirestore().collection('contracts')
        .where('companyOrderId', '==', companyOrderId)
        .where('status', 'in', statusArray)
        .get()
        .then(querySnapshot => {
          // build resultant object, resolve with it
          querySnapshot.forEach(contractDoc => CONTRACTS[contractDoc.id] = contractDoc.data());
          resolve(CONTRACTS);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },

  // search for contracts
  search: term => new Promise((resolve, reject) => {

    // active role is mandatory, and it must be manager
    if(!DataService.computed.activeRole) {
      reject('Cannot search contracts : No active role');
    }

    if(DataService.computed.activeRole.role !== ERole.MANAGER) {
      reject('Only managers are allowed to search for contracts');
    }

    // Call the compute function to search for contracts
    DataService.computed.search([ESearchType.CONTRACTS], term, DataService.computed.activeRole.companyId)
      .then(results => resolve(results.data.contracts))
      .catch(e => ErrorService.manageErrorThenReject(e, reject));
  })
};

export default ContractService;
