
/**
 * class Employee
 * Represents an employee of a company / multiple companies
 * 
 * id: string | The auto-generated id of the user (NOT THE EMPLOYEE !)
 * firstname: string | Firstname of the employee
 * lastname: string | Lastname of the employee
 * email: string | Email of the employee
 * certificates: array[certifacte: string] | List of certificates owned by the employee
 * activeRoleId: string | The id of the active role of the employee
 * profilePictureUrl: string | The picture URL of the employee
 * settings: object | The settings customed by the employee
 * cretionDate: string | The creation date, as iso string
 * loginAttempts: array | Array of login attempts
 */
class Employee {
    constructor(firstname, lastname, email, certificates, activeRoleId, profilePictureUrl, settings, creationIsoDate, loginAttempts) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.certificates = certificates;
        this.activeRoleId = activeRoleId;
        this.profilePictureUrl = profilePictureUrl;
        this.settings = settings;
        this.creationIsoDate = creationIsoDate;
        this.loginAttempts = loginAttempts;
    }
}

export class LoginAttempt {
    constructor(country, city, latitude, longitude, ip, email, success, creationIsoDate) {
        this.country = country;
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
        this.ip = ip;
        this.email = email;
        this.success = success;
        this.creationIsoDate = creationIsoDate;
    }
}

export default Employee;
