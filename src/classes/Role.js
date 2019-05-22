/**
 * A role is authorization for an employee to access a company's data depending of its role
 * 
 * employeeId: string | The employeeId of the employee authorized
 * companyId: string | The concerned company
 * status: ERoleStatus | The status of the role : 'DRAFT'|'CONFIRMED'|'REVOKED'
 */

class Role {
    constructor(employeeId, companyId, status, role) {
        this.employeeId = employeeId;
        this.companyId = companyId;
        this.status = status;
        this.role = role;
    }
}

export default Role;
