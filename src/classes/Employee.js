import { faSignIn, faSignOut, faUserPlus, faKey } from '@fortawesome/pro-light-svg-icons';

/**
 * class Employee
 * Represents an employee of a company / multiple companies
 * 
 * id: string | The auto-generated id of the user (USERID = EMPLOYEEID !)
 * firstname: string | Firstname of the employee
 * lastname: string | Lastname of the employee
 * certificates: array[certifacte: string] | List of certificates owned by the employee
 * activeRoleId: string | The id of the active role of the employee
 * profilePictureUrl: string | The picture URL of the employee
 * settings: object | The settings customed by the employee
 * cretionDate: string | The creation date, as iso string
 * legal: object | Legal acceptance
 * staff: boolean | If the employee is part of the staff
 * currentLogTrack: LogTrack | Current LogTrack of the employee
 */
class Employee {
    constructor(firstname, lastname, certificates, activeRoleId, profilePictureUrl, settings, creationIsoDate, legal) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.certificates = certificates;
        this.activeRoleId = activeRoleId;
        this.profilePictureUrl = profilePictureUrl;
        this.settings = settings;
        this.creationIsoDate = creationIsoDate;
        this.legal = legal;
        this.staff = false;
        this.currentLogTrack = null;
    }
}

/**
 * class: AccountActivity
 * Stores an account activity: account related activity
 * 
 * email: string | email of the activity
 * creationIsoDate: string | creation date, as iso string
 * metadata: Object | all related metadata
 * type: EAccountAcvitiyType | Type of the activity
 */
export class AccountActivity {
    constructor(email, creationIsoDate, metadata, type) {
        this.email = email;
        this.creationIsoDate = creationIsoDate;
        this.metadata = metadata;
        this.type = EAccountActivityType[type];
    }
}

/**
 * Enum: EAccountActivityType
 * Type of activity of a user
 */
export const EAccountActivityType = {
    // The user signed in
    SIGNIN: 'SIGNIN',

    // The user signed out
    SIGNOUT: 'SIGNOUT',

    // The user signed up
    SIGNUP: 'SIGNUP',

    // The user resetted his password
    PASSWORD_RESET: 'PASSWORD_RESET',

    // The user changed his password (when already conntected, via Profile/Security)
    PASSWORD_CHANGE: 'PASSWORD_CHANGE'
};

/**
 * Enum: EAccountActivityTypeDetails
 * Details of the enum EAccountActivity
 * 
 * name: string | Printable name
 * icon: FA/IconDefinition | Icon of the type
 */
export const EAccountActivityTypeDetails = {
    [EAccountActivityType.SIGNIN]: {
        icon: faSignIn,
        title: 'Signed in'
    },
    [EAccountActivityType.SIGNOUT]: {
        icon: faSignOut,
        title: 'Signed out'
    },
    [EAccountActivityType.SIGNUP]: {
        icon: faUserPlus,
        title: 'Signed up'
    },
    [EAccountActivityType.PASSWORD_RESET]: {
        icon: faKey,
        title: 'Reset password'
    },
    [EAccountActivityType.PASSWORD_CHANGE]: {
        icon: faKey,
        title: 'Changed password'
    }
};

export default Employee;
