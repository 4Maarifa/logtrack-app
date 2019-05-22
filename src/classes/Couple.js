
/**
 * class Couple
 * a couple links an employee to an equipment that he is using.
 * 
 * id: string | The auto-generated id of the contract
 * employeeId: string | Id of employee that uses the equipment
 * equipmentId: string | The equipment used
 * status: string | Active ? We save the old couples to leave access to the couple associated to an activity
 */
class Couple {
    constructor(id, employeeId, equipmentId) {
        this.id = id;
        this.employeeId = employeeId;
        this.equipmentId = equipmentId;
    }
}

export default Couple;
