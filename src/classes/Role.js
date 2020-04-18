import { faSteeringWheel, faUserTie, faEye, faWrench } from '@fortawesome/pro-solid-svg-icons';

/**
 * A role is authorization for an employee to access a company's data depending of its role
 * 
 * employeeId: string | The employeeId of the employee authorized
 * companyId: string | The concerned company
 * status: ERoleStatus | The status of the role : 'DRAFT'|'CONFIRMED'|'REVOKED'
 * role: The role as Enum: 'MANAGER'|'DRIVER'|'OBSERVER'|'MECHANIC'
 * creationIsoDate: The creation date, as iso string
 * revokedIsoDate: The revoked date, as iso string
 */

class Role {
    constructor(employeeId, companyId, status, role, creationIsoDate, revokedIsoDate) {
        this.employeeId = employeeId;
        this.companyId = companyId;
        this.status = status;
        this.role = role;
        this.creationIsoDate = creationIsoDate;
        this.revokedIsoDate = revokedIsoDate;
    }
}

export const ERole = Object.freeze({
    DRIVER: 'DRIVER',
    MANAGER: 'MANAGER',
    OBSERVER: 'OBSERVER',
    MECHANIC: 'MECHANIC'
});

export const RoleDetails = {
    [ERole.DRIVER]: {
        name: 'Driver',
        icon: faSteeringWheel
    },
    [ERole.MANAGER]: {
        name: 'Manager',
        icon: faUserTie
    },
    [ERole.OBSERVER]: {
        name: 'Observer',
        icon: faEye
    },
    [ERole.MECHANIC]: {
        name: 'Mechanic',
        icon: faWrench
    },
};

export const ERoleStatus = Object.freeze({
    CONFIRMED: 'CONFIRMED',
    DRAFT: 'DRAFT',
    REVOKED: 'REVOKED'
});

export default Role;
