import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faEnvelope, faKey } from '@fortawesome/pro-solid-svg-icons';

import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import Icon from './../../Utils/Icon/Icon';

import FirebaseService from './../../../services/firebase.service';
import ErrorService from './../../../services/error.service';
import DataService from './../../../services/data.service';
import GeoService from './../../../services/geo.service';
import EmployeeService from './../../../services/entities/employee.service';
import DateService from './../../../services/date.service';

import { LoginAttempt } from './../../../classes/Employee';

import { v4 as uuid } from 'uuid';

import './SignIn.scss';

const SignIn = () => {

  const [user, setUser] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    const registerAttempt = (user, isSuccess) => (
      GeoService.getApproximateLocation()
        .then(location => {
          const loginAttempt = new LoginAttempt(
            location.country_name,
            location.city,
            parseFloat(location.latitude),
            parseFloat(location.longitude),
            location.IPv4,
            email,
            isSuccess,
            DateService.getCurrentIsoDateString()
          );
          EmployeeService.loginAttempt.create(loginAttempt)
            .then(() => user && setUser(user))
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError)
    );

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

        <input type="submit" />
      </form>
    </div>
  );
};

export default SignIn;
