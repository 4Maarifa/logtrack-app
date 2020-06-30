import { faWrench, faShippingFast, faDraftingCompass, faPlay, faCheck, faMoneyBill, faArchive, faCalculator, faHands } from '@fortawesome/pro-light-svg-icons';
import { faWrench as faWrenchSolid, faShippingFast as faShippingFastSolid, faHands as faHandsSolid,
    faCalculator as faCalculatorSolid } from '@fortawesome/pro-solid-svg-icons';

/**
 * class Contract
 * a contract is a commercial link between two companies.
 * 
 * The company 'company1' proposes the contract to the company 'company2' that can accept or decline it.
 * The contract type is specified by the enum EContractType. Subcontracting is allowed (TODO: Subcontracting).
 * Invoices are stored inside the contract (TODO: Invoices).
 * The status of the contract is specified by the enum EContractStatus
 * 
 * identification: string | The custom identification of the contract, like order number, offer reference...
 * invoices: array[{//TODO: to be defined}] | The invoices array linked to this contract
 * companyOrderId: string | The company that proposes the contract
 * companyExecId: string | The company will execute the contract
 * createdByCompanyId: string | The company that created the contract
 * contractType: EContractType | The type of contract
 * status: EContractStatus | The status of contract
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
        this.contractType = EContractType[contractType];
        this.status = EContractStatus[status];
        this.creator = creator;
        this.creationIsoDate = creationIsoDate;
        this.archiveIsoDate = archiveIsoDate;
    }
}

/**
 * Enum: EContractStatus
 * Specify the contract status
 */
export const EContractStatus = Object.freeze({
    // Contract is created, we wait for validation of the company2
    DRAFT: 'DRAFT',

    // Normal execution of the contract by the execCompany
    EXECUTION: 'EXECUTION',

    // Contract is finished, the execCompany wait its payment from orderCompany
    FINISHED: 'FINISHED',

    // Contract is paid by the orderCompany
    PAID: 'PAID',

    // Archived by either company
    ARCHIVED: 'ARCHIVED'
});

/**
 * Enum: EContractStatusDetails
 * Details of EContractStatus
 * 
 * name: string | printable label of the status
 * icon: FA/IconDefinition | Icon of the status
 */
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

/**
 * Enum: EContractType
 * Specified the type of the contract
 */
export const EContractType = Object.freeze({
    // Maintenance allows access to orderCompany's equipments for execCompany (TODO: Maintenance)
    MAINTENANCE: 'MAINTENANCE',

    // Transportation of goods by the execCompany
    TRANSPORTATION: 'TRANSPORTATION',

    // Insurance for orderCompany's equipments and employees
    INSURANCE: 'INSURANCE',

    // Accountance of the execCompany for the orderCompany
    ACCOUNTING: 'ACCOUNTING'
});

/**
 * Enum: EContractTypeDetails
 * Details about the enum EContractType
 * 
 * name: string | Printable name of the contract type
 * icon: FA/IconDefinition | Icon of the type, light
 * iconSolid: FA/IconDefinition | Icon of the type, solid
 * disabled: boolean | If contract type can be selected yet (TODO: Insurance and TODO: Accountance)
 */
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
