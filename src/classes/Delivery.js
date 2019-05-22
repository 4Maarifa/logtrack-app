
/**
 * class Delivery
 * Representes a delivery of goods between point A and point B
 * 
 * id: string | The auto-generated id of the delivery
 * contractId: string | The concerned contract
 * equipmentId: string | The equipments concerned by the delivery (trucks, trailers, containers...)
 * employeeId: string | The employee concerned by the delivery 
 */
class Delivery {
    constructor(id, contractId, equipmentIds, employeeId) {
        this.id = id;
        this.contractId = contractId;
        this.equipmentIds = equipmentIds;
        this.employeeId = employeeId;

        // TODO : populates delivery (load, date, gps...)
    }
}

export default Delivery;
