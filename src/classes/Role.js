import { faSteeringWheel, faUserTie, faEye, faWrench, faHands, faCalculator, faUserHardHat, 
    faPeopleArrows, faRandom } from '@fortawesome/pro-light-svg-icons';
import { faSteeringWheel as faSteeringWheelSolid, faUserTie as faUserTieSolid, faEye as faEyeSolid,
    faWrench as faWrenchSolid, faUserHardHat as faUserHardHatSolid, faHands as faHandsSolid,
    faCalculator as faCalculatorSolid, faPeopleArrows as faPeopleArrowsSolid, faRandom as faRandomSolid } from '@fortawesome/pro-solid-svg-icons';

/**
 * A role is authorization for an employee to access a company's data depending of its role
 * 
 * employeeId: string | The employeeId of the employee authorized
 * companyId: string | The concerned company
 * status: ERoleStatus | The status of the role
 * role: ERole | The role from the emum ERole
 * creationIsoDate: The creation date, as iso string
 * revokedIsoDate: The revoked date, as iso string. Null if not revoked
 */

class Role {
    constructor(employeeId, companyId, status, role, creationIsoDate, revokedIsoDate) {
        this.employeeId = employeeId;
        this.companyId = companyId;
        this.status = ERoleStatus[status];
        this.role = ERole[role];
        this.creationIsoDate = creationIsoDate;
        this.revokedIsoDate = revokedIsoDate;
    }
}

/**
 * Enum: ERole
 * Type of the role an employee will hold
 */
export const ERole = Object.freeze({
    DRIVER: 'DRIVER',
    MANAGER: 'MANAGER',
    OBSERVER: 'OBSERVER',
    MECHANIC: 'MECHANIC',
    OPERATOR: 'OPERATOR',
    INSURER: 'INSURER',
    ACCOUNTANT: 'ACCOUNTANT',
    RECRUITER: 'RECRUITER',
    DISPATCHER: 'DISPATCHER'
});

/**
 * Enum: ERoleDetails
 * Details about the enum ERole
 * 
 * name: string | printable name
 * icon: FA/IconDefinition | icon of the role, light
 * iconSolid: FA/IconDefinition | icon of the role, solid
 * description: string | printable description
 */
export const ERoleDetails = {
    [ERole.DRIVER]: {
        name: 'Driver',
        icon: faSteeringWheel,
        iconSolid: faSteeringWheelSolid,
        description: 'An employee that takes goods from point A to point B'
    },
    [ERole.MANAGER]: {
        name: 'Manager',
        icon: faUserTie,
        iconSolid: faUserTieSolid,
        description: 'Powerful role to manage all company\'s assets'
    },
    [ERole.OBSERVER]: {
        name: 'Observer',
        icon: faEye,
        iconSolid: faEyeSolid,
        description: 'A trustful role who can see everything but cannot modify anything'
    },
    [ERole.MECHANIC]: {
        name: 'Mechanic',
        icon: faWrench,
        iconSolid: faWrenchSolid,
        description: 'Can do maintenance over all company\'s equipments'
    },
    [ERole.OPERATOR]: {
        name: 'Operator',
        icon: faUserHardHat,
        iconSolid: faUserHardHatSolid,
        description: 'A generic user who can use equipment and achieve various tasks'
    },
    [ERole.INSURER]: {
        name: 'Insurer',
        icon: faHands,
        iconSolid: faHandsSolid,
        description: 'A specific role for your insurer which is not on the platform'
    },
    [ERole.ACCOUNTANT]: {
        name: 'Accountant',
        icon: faCalculator,
        iconSolid: faCalculatorSolid,
        description: 'A specific role for your accountant which is not on the platform'
    },
    [ERole.RECRUITER]: {
        name: 'Recruiter',
        icon: faPeopleArrows,
        iconSolid: faPeopleArrowsSolid,
        description: 'This employee can create job offers'
    },
    [ERole.DISPATCHER]: {
        name: 'Dispatcher',
        icon: faRandom,
        iconSolid: faRandomSolid,
        description: 'Dispatch tasks to operators, drivers and mechanics'
    }
};

/**
 * Enum: ERoleStatus
 * Describes the status of the role
 */
export const ERoleStatus = Object.freeze({
    // User requested the role, still not available for him. Printed as requested for managers of the company
    DRAFT: 'DRAFT',

    // Managed confirmed the role. The user can now enjoy his new role!
    CONFIRMED: 'CONFIRMED',

    // Manager revoked the role : The user is not anymore an employee of that company (regarding this role anyway)
    REVOKED: 'REVOKED',

    // Manager denied the request of the user to join the company. 
    // In that case, the user cannot request this role for that company (he can still request other role for this company and can still request any role for other companies).
    // Managers of that company can still invite the user to join the company for the role they denied him. In that case, a new role will be created (the denied role is still denied)
    DENIED: 'DENIED'
});

export default Role;
