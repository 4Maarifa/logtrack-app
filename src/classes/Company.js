
/**
 * class Company
 * This class represents the company
 * 
 * name: string | The name of the company
 * logoURL: string | The logo of the company
 * creator: string | The creator of the company (employeeId)
 * creationIsoDate | The creation date, as iso string
 */
class Company {
    constructor(name, logoURL, creator, creationIsoString, color) {
        this.name = name;
        this.logoURL = logoURL;
        this.creator = creator;
        this.creationIsoString = creationIsoString;
        this.color = color;
    }
}

export default Company;
