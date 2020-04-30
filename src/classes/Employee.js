import React, { Fragment } from 'react';
import { faSignIn, faSignOut, faUserPlus, faKey } from '@fortawesome/pro-solid-svg-icons';

import DateService from './../services/date.service';

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
 */
class Employee {
    constructor(firstname, lastname, email, certificates, activeRoleId, profilePictureUrl, settings, creationIsoDate) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.certificates = certificates;
        this.activeRoleId = activeRoleId;
        this.profilePictureUrl = profilePictureUrl;
        this.settings = settings;
        this.creationIsoDate = creationIsoDate;
    }
}

export const EAccountActivityType = {
    SIGNIN: 'SIGNIN',
    SIGNOUT: 'SIGNOUT',
    SIGNUP: 'SIGNUP',
    PASSWORD_RESET: 'PASSWORD_RESET',
    PASSWORD_CHANGE: 'PASSWORD_CHANGE'
};

export const printAccountActivityDetails = accountActivity => (
    <Fragment>
        {DateService.getDateTimeString(DateService.getDateFromIsoString(accountActivity.creationIsoDate), false)}
        {accountActivity.metadata.city && accountActivity.metadata.country ?
            `, Near ${accountActivity.metadata.city}, ${accountActivity.metadata.country}`
        : null}
        {accountActivity.metadata.ip ? `, IP: ${accountActivity.metadata.ip}` : null}
    </Fragment>
);

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

export class AccountActivity {
    constructor(email, creationIsoDate, metadata, type) {
        this.email = email;
        this.creationIsoDate = creationIsoDate;
        this.metadata = metadata;
        this.type = EAccountActivityType[type];
    }
}

export default Employee;
