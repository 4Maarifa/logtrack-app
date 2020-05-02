import React from 'react';
import { faWrench, faShippingFast, faDraftingCompass, faPlay, faCheck, faMoneyBill, faArchive, faCalculator, faHands } from '@fortawesome/pro-solid-svg-icons';

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
 * identification: string | The identification of the contract, like order number, offer reference...
 * invoices: array[{//TODO : to be defined}] | The invoices array linked to this contract
 * companyOrderId: string | The company that proposes the contract
 * companyExecId: string | The company will execute the contract
 * contractType: string | The type of contract
 * status: string | The status of contract
 * creationIsoDate: string | The creation date, as iso string
 * archiveIsoDate: string | The archive date, as iso string
 */

class Contract {
    constructor(identification, invoices, companyOrderId, companyExecId, createdByCompanyId, contractType, status, creationIsoDate, archiveIsoDate) {
        this.identification = identification;
        this.invoices = invoices;
        this.companyOrderId = companyOrderId;
        this.companyExecId = companyExecId;
        this.createdByCompanyId = createdByCompanyId;
        this.contractType = contractType;
        this.status = status;
        this.creationIsoDate = creationIsoDate;
        this.archiveIsoDate = archiveIsoDate;
    }
}

export const EContractStatus = Object.freeze({
    DRAFT: 'DRAFT',
    EXECUTION: 'EXECUTION',
    FINISHED: 'FINISHED',
    PAID: 'PAID',
    ARCHIVED: 'ARCHIVED'
});

export const EContractStatusDetails = Object.freeze({
    [EContractStatus.DRAFT]: {
        name: 'Draft',
        icon: <Icon source="fa" icon={faDraftingCompass} />
    },
    [EContractStatus.EXECUTION]: {
        name: 'Execution',
        icon: <Icon source="fa" icon={faPlay} />
    },
    [EContractStatus.FINISHED]: {
        name: 'Finished',
        icon: <Icon source="fa" icon={faCheck} />
    },
    [EContractStatus.PAID]: {
        name: 'Paid',
        icon: <Icon source="fa" icon={faMoneyBill} />
    },
    [EContractStatus.ARCHIVED]: {
        name: 'Archived',
        icon: <Icon source="fa" icon={faArchive} />
    }
});

export const EContractType = Object.freeze({
   MAINTENANCE: 'MAINTENANCE',
   TRANSPORTATION: 'TRANSPORTATION',
   INSURANCE: 'INSURANCE',
   ACCOUNTING: 'ACCOUNTING'
});

export const EContractTypeDetails = Object.freeze({
    [EContractType.MAINTENANCE]: {
        name: 'Maintenance',
        icon: <Icon source="fa" icon={faWrench} />,
        disabled: false
    },
    [EContractType.TRANSPORTATION]: {
        name: 'Transportation',
        icon: <Icon source="fa" icon={faShippingFast} />,
        disabled: false
    },
    [EContractType.INSURANCE]: {
        name: 'Insurance',
        icon: <Icon source="fa" icon={faHands} />,
        disabled: true
    },
    [EContractType.ACCOUNTING]: {
        name: 'Accounting',
        icon: <Icon source="fa" icon={faCalculator} />,
        disabled: true
    }
});

export default Contract;
