import { faWrench, faShippingFast, faDraftingCompass, faPlay, faCheck, faMoneyBill, faArchive, faCalculator, faHands } from '@fortawesome/pro-light-svg-icons';
import { faWrench as faWrenchSolid, faShippingFast as faShippingFastSolid, faHands as faHandsSolid,
    faCalculator as faCalculatorSolid } from '@fortawesome/pro-solid-svg-icons';

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
 * creator: string | The creator of the contract (employeeId)
 * creationIsoDate: string | The creation date, as iso string
 * archiveIsoDate: string | The archive date, as iso string
 */

class Contract {
    constructor(identification, invoices, companyOrderId, companyExecId, createdByCompanyId, 
                contractType, status, creator, creationIsoDate, archiveIsoDate) {
        this.identification = identification;
        this.invoices = invoices;
        this.companyOrderId = companyOrderId;
        this.companyExecId = companyExecId;
        this.createdByCompanyId = createdByCompanyId;
        this.contractType = contractType;
        this.status = status;
        this.creator = creator;
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
        icon: faDraftingCompass
    },
    [EContractStatus.EXECUTION]: {
        name: 'Execution',
        icon: faPlay
    },
    [EContractStatus.FINISHED]: {
        name: 'Finished',
        icon: faCheck
    },
    [EContractStatus.PAID]: {
        name: 'Paid',
        icon: faMoneyBill
    },
    [EContractStatus.ARCHIVED]: {
        name: 'Archived',
        icon: faArchive
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
        icon: faWrench,
        iconSolid: faWrenchSolid,
        disabled: false
    },
    [EContractType.TRANSPORTATION]: {
        name: 'Transportation',
        icon: faShippingFast,
        iconSolid: faShippingFastSolid,
        disabled: false
    },
    [EContractType.INSURANCE]: {
        name: 'Insurance',
        icon: faHands,
        iconSolid: faHandsSolid,
        disabled: true
    },
    [EContractType.ACCOUNTING]: {
        name: 'Accounting',
        icon: faCalculator,
        iconSolid: faCalculatorSolid,
        disabled: true
    }
});

export default Contract;
