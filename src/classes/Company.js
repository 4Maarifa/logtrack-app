
/**
 * class Company
 * This class represents the company
 * 
 * name: string | The name of the company
 * logoURL: string | The logo of the company
 * creator: string | The creator of the company (employeeId)
 */
class Company {
    constructor(name, logoURL, creator) {
        this.name = name;
        this.logoURL = logoURL;
        this.creator = creator;
    }
}

export default Company;
