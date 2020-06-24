import React, { useEffect, useState } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { faUser, faEnvelope, faKey, faImage, faExternalLink } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import FormInputFile from './../../Utils/FormElements/FormInputFile/FormInputFile';
import Checkbox from './../../Utils/FormElements/Checkbox/Checkbox';

import FirebaseService from './../../../services/firebase.service';
import ErrorService from './../../../services/error.service';
import DateService from './../../../services/date.service';
import FileService from './../../../services/file.service';
import EmployeeService from './../../../services/entities/employee.service';
import GeoService from './../../../services/geo.service';
import UserAgentService from './../../../services/useragent.service';

import Employee, { AccountActivity, EAccountActivityType } from './../../../classes/Employee';

import './SignUp.scss';

const SignUp = () => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const [isAcceptTerms, setAcceptTerms] = useState(true);
  const [isKeepInformed, setKeepInformed] = useState(false);

  const [newUser, setNewUser] = useState(null);
  const [isFinishedConfig, setFinishConfig] = useState(false);

  useEffect(() => {
    const unsubscribe = FirebaseService.getFirebaseObject().auth().onAuthStateChanged(user => {
        if (user) {
          setNewUser(user);
        }
    });
    return unsubscribe;
  }, []); 

  const finishConfiguration = () => {
    EmployeeService.create(newUser.uid, new Employee(firstname, lastname, [], null, null, null, DateService.getCurrentIsoDateString(), 
        { terms: isAcceptTerms, informed: isKeepInformed, version: UserAgentService.getAppVersion(), acceptDate: DateService.getCurrentIsoDateString() }))
      .then(() => {
        uploadProfilePhoto()
          .then(profilePicutreUrl => {
            if(profilePicutreUrl) {
              Promise.all([
                EmployeeService.updateField(newUser.uid, { profilePicutreUrl }),
                FirebaseService.getCurrentUser().updateProfile({ profilePicutreUrl, displayName: `${firstname} ${lastname}` })
              ]).then(() => setFinishConfig(true))
                .catch(ErrorService.manageError);
            }
            else {
              FirebaseService.getCurrentUser().updateProfile({
                displayName: `${firstname} ${lastname}`
              }).then(() => setFinishConfig(true))
                .catch(ErrorService.manageError);
            }
          })
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if(password !== secondPassword) {
      ErrorService.manageError({code: 'auth/passwords-not-match'});
      return;
    }

    FirebaseService.signUp(email, password)
      .catch(ErrorService.manageError);
  };

  const uploadProfilePhoto = () => {
    return new Promise ((resolve, reject) => {
      // If profile picture is known, then first upload it then update the user
      if(profilePicture && profilePicture.file) {
        FileService.uploadProfilePhoto(profilePicture.file)
          .then(() => {
            FileService.getDownloadURLForProfilePicture()
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);

      }
      else {
        resolve(null);
      }
    });
  };

  if(newUser && !isFinishedConfig) {
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
                success: true,
              },
              EAccountActivityType.SIGNUP)
          )
            .then(() => finishConfiguration())
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError)
  }

  if(isFinishedConfig) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>

        {/* Firstname field */}
        <FormInput
          value={firstname}
          inputType="text"
          fieldName="firstname"
          label={
            <span>
              <Icon source="fa" icon={faUser} />
              Firstname
            </span>
          }
          inputName="fname"
          inputRequired
          instructions={
            <span>
              Your firstname, required
            </span>
          }
          onValueChange={setFirstname} />

        {/* Lastname field */}
        <FormInput
          value={lastname}
          inputType="text"
          fieldName="lastname"
          label={
            <span>
              <Icon source="fa" icon={faUser} />
              Lastname
            </span>
          }
          inputName="lname"
          inputRequired
          instructions={
            <span>
              Your lastname, required
            </span>
          }
          onValueChange={setLastname} />

        {/* Email field */}
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
              Your e-mail, required
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
              Pick a password<br/>
              5 characters minimum
            </span>
          }
          inputPattern=".{5,}"
          inputName="password"
          inputRequired
          onValueChange={setPassword} />

        {/* Second Password field */}
        <FormInput
          value={secondPassword}
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
          onValueChange={setSecondPassword} />

        {/* Profile Photo */}
        <FormInputFile
          imagePreview
          value={profilePicture}
          onValueChange={setProfilePicture}
          label={
            <span>
              <Icon source="fa" icon={faImage} />
              Profile Picture (optional)
            </span>
          }
          instructions={
            <span>
              Choose a Profile Picture (Optional)
            </span>
          }
          accept="image/*" />

        {/* Terms */}
        <Checkbox
          value={isAcceptTerms}
          fieldName="terms"
          inputName="terms"
          inputRequired
          label={<span>
            You must accept <a className="text-link" href="/terms" target="_blank">
              terms and conditions
              <Icon source="fa" icon={faExternalLink} />
            </a>
          </span>}
          onValueChange={setAcceptTerms} />

        {/* Keep Informed */}
        <Checkbox
          value={isKeepInformed}
          fieldName="informed"
          inputName="informed"
          label={<span>
            Keep me informed about product's news!<br/>
            <span className="sub">Once per month, NO spam, NO email from partners</span>
          </span>}
          onValueChange={setKeepInformed} />

        <input type="submit" value="Sign Up" />
      </form>
      <NavLink className="signup-link" to={`/signin`}>Already have an account?</NavLink>
    </div>
  );
};

export default SignUp;
