import { faSteeringWheel, faUserTie, faEye, faWrench, faHands, faCalculator, faUserHardHat, faPeopleArrows } from '@fortawesome/pro-solid-svg-icons';

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
    MECHANIC: 'MECHANIC',
    OPERATOR: 'OPERATOR',
    INSURER: 'INSURER',
    ACCOUNTANT: 'ACCOUNTANT',
    RECRUITER: 'RECRUITER'
});

export const RoleDetails = {
    [ERole.DRIVER]: {
        name: 'Driver',
        icon: faSteeringWheel,
        description: 'An employee that takes good from point A to point B'
    },
    [ERole.MANAGER]: {
        name: 'Manager',
        icon: faUserTie,
        description: 'Powerful role to manage all company\'s assets'
    },
    [ERole.OBSERVER]: {
        name: 'Observer',
        icon: faEye,
        description: 'A trustful role who can see everything but cannot modify anything. Useful for external monitoring companies'
    },
    [ERole.MECHANIC]: {
        name: 'Mechanic',
        icon: faWrench,
        description: 'Can do maintenance over company\'s equipments'
    },
    [ERole.OPERATOR]: {
        name: 'Operator',
        icon: faUserHardHat,
        description: 'A generic user who can use equipment and do various tasks'
    },
    [ERole.INSURER]: {
        name: 'Insurer',
        icon: faHands,
        description: 'A specific role for your insurance company which is not on the platform. This user can see every equipment and logtrack'
    },
    [ERole.ACCOUNTANT]: {
        name: 'Accountant',
        icon: faCalculator,
        description: 'A specific role for your accountant company which is not on the platform. This user can see every logtrack and analytics'
    },
    [ERole.RECRUITER]: {
        name: 'Recruiter',
        icon: faPeopleArrows,
        description: 'This employee can create job offers and observe employees'
    }
};

export const ERoleStatus = Object.freeze({
    CONFIRMED: 'CONFIRMED',
    DRAFT: 'DRAFT',
    REVOKED: 'REVOKED'
});

export default Role;
