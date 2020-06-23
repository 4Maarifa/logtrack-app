
/**
 * class Equipment
 * an equipment is every object used by the employee to work. It can be a Truck, a Trailer, a mechanic bridge...
 * 
 * companyId: string | The company that owns the equipment
 * identification: string | Custom field to identify the equipment. Can be a serial number, a number plate...
 * equipmentModelId: string | The model of the equipment
 * creator: string | The creator of the company (employeeId)
 * creationIsoDate: string | The creation date, as iso string
 * currentLogTrack: LogTrack | The current LogTrack of the equipment
 */
class Equipment {
    constructor(companyId, identification, equipmentModelId, creator, creationIsoDate) {
        this.companyId = companyId;
        this.identification = identification;
        this.equipmentModelId = equipmentModelId;
        this.creator = creator;
        this.creationIsoDate = creationIsoDate;
        this.currentLogTrack = null;
    }
}

export default Equipment;
