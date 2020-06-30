import React, { useState, useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { faEnvelope, faKey } from '@fortawesome/pro-light-svg-icons';

import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import Icon from './../../Utils/Icon/Icon';

import FirebaseService from './../../../services/firebase.service';
import ErrorService from './../../../services/error.service';
import DataService from './../../../services/data.service';
import GeoService from './../../../services/geo.service';
import EmployeeService from './../../../services/entities/employee.service';
import DateService from './../../../services/date.service';

import { AccountActivity, EAccountActivityType } from './../../../classes/Employee';

import { v4 as uuid } from 'uuid';

import './SignIn.scss';

/**
 * Component: SignIn
 * Used to sign in into LogTrack
 */
const SignIn = () => {

  // User: populated on sign in
  const [user, setUser] = useState(null);

  // Signin form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);

  // Signin form handler
  const handleSubmit = event => {
    event.preventDefault();

    // Save the account activity retrieving location and IP
    const registerAttempt = (user, isSuccess) => (
      GeoService.getApproximateLocation()
        .then(location => {
          EmployeeService.accountActivity.create(
            new AccountActivity(
              email,
              DateService.getCurrentIsoDateString(),
              {
                country: location.country_name,
                city: location.city,
                latitude: parseFloat(location.latitude),
                longitude: parseFloat(location.longitude),
                ip: location.IPv4,
                success: isSuccess,
              },
              EAccountActivityType.SIGNIN)
          )
            .then(() => user && setUser(user))
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError)
    );

    // Try to signin
    FirebaseService.signIn(email, password)
      .then(user => registerAttempt(user, true))
      .catch(e => {
        registerAttempt(null, false);
        ErrorService.manageError(e);
      });
  };
  
  if(!computed.initialized) { return null; }

  if(computed.user || user) {
    return <Redirect to='/dashboard' />;
  }

  /**
   * RENDER
   */
  return (
    <div className="SignIn">
      <h1>Sign In</h1>

      {/* Signin form */}
      <form onSubmit={handleSubmit}>

        {/* E-Mail field */}
        <FormInput
          value={email}
          inputType="email"
          fieldName="email"
          label={
            <span>
              <Icon source="fa" icon={faEnvelope} />
              E-Mail
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

        {/* Password field */}
        <FormInput
          value={password}
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
              Your account password
            </span>
          }
          inputRequired
          onValueChange={setPassword} />

        <input type="submit" value="Sign In" />
      </form>

      {/* Other links to related pages */}
      <NavLink className="signin-link" to={`/signup`}>Don't have an account yet?</NavLink>
      <NavLink className="signin-link" to={`/forgotten`}>Lost your password?</NavLink>
    </div>
  );
};

export default SignIn;
