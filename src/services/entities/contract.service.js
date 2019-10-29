import { ERights } from './../right.service';

import DataService, { ensureFilledFields, migratePrototype } from './../data.service';
import FirebaseService from './../firebase.service';
import ErrorService from './../error.service';

import Contract from './../../classes/Contract';

import { EContractStatus } from './../../classes/Contract';
import { ERole } from './../../classes/Role';

const ContractService = {
  rights: {
    [ERights.RIGHT_CONTRACT_CREATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_CONTRACT_GET]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_CONTRACT_LIST]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_CONTRACT_UPDATE]: () => DataService.computed.isConnected(),
    [ERights.RIGHT_CONTRACT_DELETE]: () => false
  },
  create(contract) {
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_CREATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Create a Contract' });
    }

    if(!contract instanceof Contract) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Contract' });
    }

    if(!ensureFilledFields(contract, ['companyOrderId', 'companyExecId', 'contractType', 'status'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['companyOrderId', 'companyExecId', 'contractType', 'status'] });
    }

    if(contract.status !== EContractStatus.DRAFT || DataService.computed.activeRole.role !== ERole.MANAGER ||
        (DataService.computed.activeRole.companyId !== contract.companyOrderId && DataService.computed.activeRole.companyId !== contract.companyExecId)) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('contracts').add(migratePrototype(contract));
  },
  get(contractId) {
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_GET]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Get a Contract' });
    }

    return FirebaseService.getDb().collection('contracts').doc(contractId).get();
  },
  list() {
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Contracts' });
    }

    var contracts = {};
    return new Promise((resolve, reject) => {
        FirebaseService.getDb().collection('contracts').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((contractDoc) => contracts[contractDoc.id] = contractDoc.data());
                resolve(contracts);
            })
            .catch((e) => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  update(contract) {
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Contract' });
    }

    if(!contract instanceof Contract) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/prototype-not-match', details: 'Contract' });
    }

    if(!ensureFilledFields(contract, ['companyOrderId', 'companyExecId', 'contractType', 'status'])) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/missing-fields', details: ['companyOrderId', 'companyExecId', 'contractType', 'status'] });
    }

    if(contract.status !== EContractStatus.DRAFT || DataService.computed.activeRole.role !== ERole.MANAGER ||
      (DataService.computed.activeRole.companyId !== contract.companyOrderId && DataService.computed.activeRole.companyId !== contract.companyExecId)) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Your role is not suitable' });
    }

    return FirebaseService.getDb().collection('contracts').doc(contract.id).set(migratePrototype(contract));
  },
  updateField(contractId, contractField) {
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_UPDATE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Update a Contract' });
    }
    
    return FirebaseService.getDb().collection('contracts').doc(contractId).update(contractField);
  },
  delete(contractId) {
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_DELETE]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'Delete a Contract' });
    }
    
    return FirebaseService.getDb().collection('contracts').doc(contractId).delete();
  },

  // CUSTOM FUNCTIONS
  getAllForCompanyExecId(companyExecId) {
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Contracts' });
    }

    var contracts = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getDb().collection('contracts')
        .where('companyExecId', '==', companyExecId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((contractDoc) => contracts[contractDoc.id] = contractDoc.data());
            resolve(contracts);
        })
        .catch((e) => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  getAllForCompanyOrderId(companyOrderId) {
    if(!ContractService.rights[ERights.RIGHT_CONTRACT_LIST]()) {
      return ErrorService.manageErrorThenPromiseRejection({ code: 'entity/right', details: 'List Contracts' });
    }
    
    var contracts = {};
    return new Promise((resolve, reject) => {
      FirebaseService.getDb().collection('contracts')
        .where('companyOrderId', '==', companyOrderId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((contractDoc) => contracts[contractDoc.id] = contractDoc.data());
            resolve(contracts);
        })
        .catch((e) => ErrorService.manageErrorThenReject(e, reject));
    });
  },
};

export default ContractService;
