
/**
 * class Warehouse
 * This class represents the Warehouse
 * 
 * name: string | The name of the warehouse
 * latitude: number | The latitude of the warehouse
 * longitude: number | The longitude of the warehouse
 * address: string | Full address
 * companyId: string | The id of the company
 * creator: string | The id of the creator (employeeId)
 * creationIsoDate: string | The creation date, as iso string
 * nbLoadingDocks: number | The number of loading docks of this warehouse
 */
class Warehouse {
  constructor(name, latitude, longitude, address, companyId, creator, creationIsoDate, nbLoadingDocks) {
      this.name = name;
      this.latitude = latitude;
      this.longitude = longitude;
      this.address = address;
      this.companyId = companyId;
      this.creator = creator;
      this.creationIsoDate = creationIsoDate;
      this.nbLoadingDocks = nbLoadingDocks;
  }
}

export default Warehouse;
