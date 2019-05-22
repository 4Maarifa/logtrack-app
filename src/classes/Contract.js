
/**
 * class Contract
 * a contract is a commercial link between two companies.
 * 
 * The company 'company1' proposes the contract to the company 'company2' that can accept or decline it.
 * The contract type is either 'maintenance' or 'transport'. Subcontracting is allowed.
 * Invoices are stored inside the contract.
 * The status of the contract can be : 'proposed', 'in progress' (the contract is accepted), 'declined' or 'finished'.
 * 
 * id: string | The auto-generated id of the contract
 * invoices: array[{//TODO : to be defined}] | The invoices array linked to this contract
 * company1Id: string | The company that proposes the contract
 * company2Id: string | The company that accepted or declined the contract. The company will execute the contract
 * contractType: string | The type of contract
 * status: string | The status of contract
 */
class Contract {
    constructor(id, invoices, company1Id, company2Id, contractType, status) {
        this.id = id;
        this.invoices = invoices;
        this.company1Id = company1Id;
        this.company2Id = company2Id;
        this.contractType = contractType;
        this.status = status;
    }
}

export default Contract;
