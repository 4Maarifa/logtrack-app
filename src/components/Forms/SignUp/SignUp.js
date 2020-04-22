import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { faUser, faEnvelope, faKey, faImage } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import FormInputFile from './../../Utils/FormElements/FormInputFile/FormInputFile';

import FirebaseService from './../../../services/firebase.service';
import ErrorService from './../../../services/error.service';
import DateService from './../../../services/date.service';
import FileService from './../../../services/file.service';
import EmployeeService from './../../../services/entities/employee.service';

import Employee from './../../../classes/Employee';

import './SignUp.scss';

const SignUp = () => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

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
    EmployeeService.create(newUser.uid, new Employee(firstname, lastname, [], null, null, null, DateService.getCurrentIsoDateString()))
      .then(() => {
        uploadProfilePhoto()
          .then(employeeProperties => {
            if(employeeProperties) {
              EmployeeService.updateField(newUser.uid, employeeProperties)
                .then(() => setFinishConfig(true))
                .catch(ErrorService.manageError);
            }
            else {
              setFinishConfig(true);
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
              .then(profilePictureUrl => resolve({profilePictureUrl}))
              .catch(reject);
          })
          .catch(reject);

      }
      else {
        resolve();
      }
    });
  };

  if(newUser && !isFinishedConfig) {
    finishConfiguration();
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
              Choose a password<br/>
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

        <input type="submit" />
      </form>
    </div>
  );
};

export default SignUp;
