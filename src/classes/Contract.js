import React from 'react';
import { faWrench, faShippingFast } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../components/Utils/Icon/Icon';

/**
 * class Contract
 * a contract is a commercial link between two companies.
 * 
 * The company 'company1' proposes the contract to the company 'company2' that can accept or decline it.
 * The contract type is either 'maintenance' or 'transport'. Subcontracting is allowed.
 * Invoices are stored inside the contract.
 * The status of the contract can be : 'proposed', 'in progress' (the contract is accepted), 'declined' or 'finished'.
 * 
 * invoices: array[{//TODO : to be defined}] | The invoices array linked to this contract
 * companyOrderId: string | The company that proposes the contract
 * companyExecId: string | The company will execute the contract
 * contractType: string | The type of contract
 * status: string | The status of contract
 * creationIsoDate: string | The creation date, as iso string
 */

class Contract {
    constructor(invoices, companyOrderId, companyExecId, contractType, status, creationIsoDate) {
        this.invoices = invoices;
        this.companyOrderId = companyOrderId;
        this.companyExecId = companyExecId;
        this.contractType = contractType;
        this.status = status;
        this.creationIsoDate = creationIsoDate;
    }
}

export const EContractStatus = Object.freeze({
   CONFIRMED: 'CONFIRMED',
   DRAFT: 'DRAFT',
   FINISHED: 'FINISHED'
});

export const EContractType = Object.freeze({
   MAINTENANCE: 'MAINTENANCE',
   TRANSPORTATION: 'TRANSPORTATION'
});

export const ContractTypeDetails = Object.freeze({
    [EContractType.MAINTENANCE]: {
        name: 'Maintenance',
        icon: <Icon source="fa" icon={faWrench} />
    },
    [EContractType.TRANSPORTATION]: {
        name: 'Transportation',
        icon: <Icon source="fa" icon={faShippingFast} />
    }
});

export default Contract;
