
/**
 * class Warehouse
 * This class represents the Warehouse
 * 
 * name: string | The name of the warehouse
 * latitude: number | The latitude of the warehouse
 * longitude: number | The longitude of the warehouse
 * companyId: string | The id of the company
 * creator: string | The id of the creator (employeeId)
 * creationIsoDate: string | The creation date, as iso string
 */
class Warehouse {
  constructor(name, latitude, longitude, companyId, creator, creationIsoDate) {
      this.name = name;
      this.latitude = latitude;
      this.longitude = longitude;
      this.companyId = companyId;
      this.creator = creator;
      this.creationIsoDate = creationIsoDate;
  }
}

export default Warehouse;
