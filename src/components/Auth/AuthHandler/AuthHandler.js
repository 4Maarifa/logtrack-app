import React, { Fragment, useState } from 'react';
import { faInfoCircle, faKey } from '@fortawesome/pro-solid-svg-icons';
import { Redirect } from 'react-router-dom';

import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';
import FirebaseService from './../../../services/firebase.service';

import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import Icon from './../../Utils/Icon/Icon';

import './AuthHandler.scss';

const AuthHandler = () => {

  const MODE = UtilsService.getUrlGetParam('mode');
  const CODE = UtilsService.getUrlGetParam('oobCode');

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const [changePasswordDone, setChangePasswordDone] = useState(false);

  const resetPasswordSubmit = event => {
    event.preventDefault();

    if(newPassword !== newPasswordConfirm) {
      ErrorService.manageError({code: 'auth/passwords-not-match'});
      return;
    }

    FirebaseService.getFirebaseObject().auth().confirmPasswordReset(CODE, newPassword)
      .then(() => setChangePasswordDone(true))
      .catch(ErrorService.manageError);
  };

  if(!MODE) {
    ErrorService.error('Invalid mode!');
    return <Redirect to={`/signin`} />;
  }

  if(changePasswordDone) {
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
      : null
    }
  </div>);
};

export default AuthHandler;
