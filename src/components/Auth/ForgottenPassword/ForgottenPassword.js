import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { faEnvelope, faLock } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';

import ErrorService from './../../../services/error.service';
import FirebaseService from './../../../services/firebase.service';
import EmployeeService from './../../../services/entities/employee.service';
import DateService from './../../../services/date.service';

import { AccountActivity, EAccountActivityType } from './../../../classes/Employee';

import './ForgottenPassword.scss';

const ForgottenPassword = () => {

  const [email, setEmail] = useState('');

  const [isPasswordReset, setPasswordReset] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    FirebaseService.getFirebaseObject().auth().sendPasswordResetEmail(email)
      .then(() => {
        EmployeeService.accountActivity.create(
          new AccountActivity(
            email,
            DateService.getCurrentIsoDateString(),
            {
              success: true,
            },
            EAccountActivityType.PASSWORD_RESET)
        )
          .then(() => setPasswordReset(true))
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  };

  /**
   * RENDER
   */
  if(isPasswordReset) {
    ErrorService.success('Check your inbox! We just sent you a reset password link!');
    return <Redirect to={`/signin`} />;
  }

  return (<div className="ForgottenPassword">
    <h1>
      <Icon source="fa" icon={faLock} />
      Forgotten Password
    </h1>
    <form onSubmit={handleSubmit}>
      <FormInput
        value={email}
        inputType="email"
        fieldName="email"
        label={
          <span>
            <Icon source="fa" icon={faEnvelope} />
            E-mail
          </span>
        }
        inputName="email"
        inputRequired
        instructions={
          <span>
            Your account e-mail
          </span>
        }
        onValueChange={setEmail} />

      <input type="submit" />
    </form>
  </div>);
};

export default ForgottenPassword;
