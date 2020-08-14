import React, { useEffect, useState } from 'react';
import { faKey, faSignIn, faLock } from '@fortawesome/pro-light-svg-icons';

import FirebaseService from './../../../../services/firebase.service';
import DataService from './../../../../services/data.service';
import DateService from './../../../../services/date.service';
import ErrorService from './../../../../services/error.service';
import EmployeeService from './../.././../../services/entities/employee.service';

import Icon from './../../../Utils/Icon/Icon';
import FormInput from './../../../Utils/FormElements/FormInput/FormInput';
import ExTable, { EXTABLE_VIEWS } from './../../../Utils/ExTable/ExTable';

import { AccountActivity, EAccountActivityType } from './../../../../classes/Employee';

import { EmployeeAccountActivity, employeeAccountActivityExTableFSS } from './../../../Entities/Employee/Employee';

import { v4 as uuid } from 'uuid';

/**
 * Component: SecurityTab
 * Tab of Profile Component
 * 
 * Password change and account activities
 */
const SecurityTab = () => {

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // Account activities
  const [accountActivities, setAccountActivities] = useState([]);
  const [isAccountActivitiesLoading, setAccountActivitiesLoading] = useState(true);

  // Password change form elements
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  // Password change handler
  const handleChangePasswordSubmit = event => {
    event.preventDefault();

    // If both passwords does not match => error
    if(newPassword !== newPasswordConfirm) {
      ErrorService.manageError({code: 'auth/passwords-not-match'});
      return;
    }

    // Requiring a new credential to change password (or any sensitive information anyway)
    // passing the current password mentioned by user
    const CREDENTIAL = FirebaseService.getFirebaseObject().auth.EmailAuthProvider.credential(
      computed.user.email,
      currentPassword
    );

    // Reauthenticate the user
    FirebaseService.getCurrentUser().reauthenticateWithCredential(CREDENTIAL)
      .then(() => {

        // Update the password
        FirebaseService.getCurrentUser().updatePassword(newPassword)
          .then(() => {

            //Create the account activity password change
            EmployeeService.accountActivity.create(
              new AccountActivity(
                computed.user.email,
                DateService.getCurrentIsoDateString(),
                {
                  success: true,
                },
                EAccountActivityType.PASSWORD_CHANGE)
            )
              .then(() => {

                // Success: notify the user
                ErrorService.success('Password modified!');

                // and resetting password change form
                setCurrentPassword('');
                setNewPassword('');
                setNewPasswordConfirm('');
              })
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  };


  useEffect(() => {
    if(computed.initialized) {

      // Get all account activity by email
      EmployeeService.accountActivity.getAllForCurrentUser()
        .then(accountActivities => {
          setAccountActivities(accountActivities);
          setAccountActivitiesLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  }, [computed.initialized, computed.employee]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  return <div className="tab-content tab-security">
    <h2 className="profile-title">
      <Icon source="fa" icon={faLock} />
      Security
    </h2>

    {/* Password change section */}
    <h3>Change your password</h3>
    <form onSubmit={handleChangePasswordSubmit}>
      <div className="personal-info-line">
        <div className="input-container">
          {/* Current Password field */}
          {/* Needed to reauchenticate user and make sure the user behind the screen knows the password and
             1: does not try to take over an account where the user has forgot to sign out
             2: does not try to take over an account using a stolen signed in token
          */}
          <FormInput
            value={currentPassword}
            inputType="password"
            fieldName="currentPassword"
            label={
              <span>
                <Icon source="fa" icon={faKey} />
                Current password
              </span>
            }
            instructions={
              <span>
                Your old password
              </span>
            }
            inputAutoComplete="password"
            inputPattern=".{5,}"
            inputName="password"
            inputRequired
            onValueChange={setCurrentPassword} />
        </div>
      </div>
      
      {/* new password fields */}
      <div className="personal-info-line">
        <div className="input-container">
          {/* Password field */}
          <FormInput
            value={newPassword}
            inputType="password"
            fieldName="password"
            label={
              <span>
                <Icon source="fa" icon={faKey} />
                New password
              </span>
            }
            instructions={
              <span>
                Pick a password<br/>
                5 characters minimum
              </span>
            }
            inputAutoComplete="off"
            inputPattern=".{5,}"
            inputName="password"
            inputRequired
            onValueChange={setNewPassword} />
        </div>
        <span className="personal-info-line-separator"></span>
        <div className="input-container">
          {/* Second Password field */}
          <FormInput
            value={newPasswordConfirm}
            inputType="password"
            fieldName="secondpassword"
            label={
              <span>
                <Icon source="fa" icon={faKey} />
                Repeat your new password
              </span>
            }
            instructions={
              <span>
                Repeat the password
              </span>
            }
            inputAutoComplete="off"
            inputRequired
            onValueChange={setNewPasswordConfirm} />
        </div>
      </div>
      <input type="submit" value="Change password" />
    </form>

    {/* Account activities section */}
    <h2 className="profile-title">
      <Icon source="fa" icon={faSignIn} />
      Account Activity
    </h2>
    <div className="ExTable-container">
      <ExTable key="accountActivities" 
              items={accountActivities}
              defaultView={EXTABLE_VIEWS.CONDENSED}
              fss={employeeAccountActivityExTableFSS}
              renderItem={(_, activity) => <EmployeeAccountActivity activity={activity} />}
              loading={isAccountActivitiesLoading}
              header={<span><Icon source="fa" icon={faSignIn} /> Account Activity</span>}
              isNoFrame />
    </div>
  </div>;
};

export default SecurityTab;
