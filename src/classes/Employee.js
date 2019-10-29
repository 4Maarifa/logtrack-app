
/**
 * class Employee
 * Represents an employee of a company / multiple companies
 * 
 * id: string | The auto-generated id of the user (NOT THE EMPLOYEE !)
 * firstname: string | Firstname of the employee
 * lastname: string | Lastname of the employee
 * certificates: array[certifacte: string] | List of certificates owned by the employee
 * activeRoleId: string | The id of the active role of the employee
 * profilePictureUrl: string | The picture URL of the employee
 * settings: object | The settings customed by the employee
 * cretionDate: string | The creation date, as iso string
 */
class Employee {
    constructor(id, firstname, lastname, certificates, activeRoleId, profilePictureUrl, settings, creationIsoDate) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.certificates = certificates;
        this.activeRoleId = activeRoleId;
        this.profilePictureUrl = profilePictureUrl;
        this.settings = settings;
        this.creationIsoDate = creationIsoDate;
    }
}

export default Employee;
