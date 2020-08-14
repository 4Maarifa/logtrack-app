import React, { Fragment, useState } from 'react';
import { faInfoCircle, faKey } from '@fortawesome/pro-light-svg-icons';
import { Redirect } from 'react-router-dom';

import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';
import FirebaseService from './../../../services/firebase.service';

import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import Icon from './../../Utils/Icon/Icon';

import './AuthHandler.scss';

/**
 * Component: AuthHandler
 * This component permits to handle Firebase redirected requests
 * 
 * This component, for the moment, is used only for reset password 
 */
const AuthHandler = () => {

  // Firebase send tokens to the app via GET parameters. getting them here
  const MODE = UtilsService.getUrlGetParam('mode');
  const CODE = UtilsService.getUrlGetParam('oobCode');

  // Password change (signed out) form
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  // Save if the change is the success
  const [changePasswordDone, setChangePasswordDone] = useState(false);

  // Form handler
  const resetPasswordSubmit = event => {
    event.preventDefault();

    // Of passwords does not match => error
    if(newPassword !== newPasswordConfirm) {
      ErrorService.manageError({code: 'auth/passwords-not-match'});
      return;
    }

    // change the password passing the code
    FirebaseService.getFirebaseObject().auth().confirmPasswordReset(CODE, newPassword)
      .then(() => setChangePasswordDone(true))
      .catch(ErrorService.manageError);
  };

  if(!MODE) {
    ErrorService.error('Invalid mode!');
    return <Redirect to={`/signin`} />;
  }

  if(changePasswordDone) {
    // Once the password is changed, notify and redirect the user
    ErrorService.success('Password changed! You can now sign in!');
    return <Redirect to={`/signin`} />;
  }

  /**
   * RENDER
   */
  return (<div className="AuthHandler">
    {
      MODE === 'resetPassword' ? 
        <Fragment>
          
          <h1>Reset your password</h1>
          <span className="sub">
            <Icon source="fa" icon={faInfoCircle} />
            Enter your new password!
          </span>
          
          {/* Reset password form */}
          <form onSubmit={resetPasswordSubmit}>
            {/* Password field */}
            <FormInput
              value={newPassword}
              inputType="password"
              fieldName="password"
              label={
                <span>
                  <Icon source="fa" icon={faKey} />
                  Password
                </span>
              }
              instructions={
                <span>
                  Pick a password<br/>
                  5 characters minimum
                </span>
              }
              inputPattern=".{5,}"
              inputName="password"
              inputRequired
              onValueChange={setNewPassword} />

            {/* Second Password field */}
            <FormInput
              value={newPasswordConfirm}
              inputType="password"
              fieldName="secondpassword"
              label={
                <span>
                  <Icon source="fa" icon={faKey} />
                  Repeat your password
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

            <input type="submit" value="Change password!" />
          </form>
        </Fragment>
      : <span>Unkown mode</span>
    }
  </div>);
};

export default AuthHandler;
