import React from 'react';
import { Redirect } from 'react-router-dom';
import { faUser, faEnvelope, faKey, faImage } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
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

class SignUp extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      secondpassword: '',
      profilePicture: null,
      user: FirebaseService.getCurrentUser()
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  handleChange = event => this.setState({[event.target.getAttribute('data-field')]: event.target.value});
  onFormInputChange = (value, fieldName) => this.setState({[fieldName]: value});

  onProfilePictureChange = file => this.setState({profilePicture: !!file ? file[0] : null});

  handleSubmit = event => {
    event.preventDefault();

    if(this.state.password !== this.state.secondpassword) {
      ErrorService.manageError({code: 'auth/passwords-not-match'});
      return;
    }

    FirebaseService.signUp(this.state.email, this.state.password)
      .then((user) => {
        EmployeeService.create(new Employee(user.user.uid, this.state.firstname, this.state.lastname, [], null, null, null, DateService.getCurrentIsoDateString()))
          .then(() => {
            this.uploadProfilePhoto()
              .then(employeeProperties => {
                if(!!employeeProperties) {
                  EmployeeService.updateField(user.user.uid, employeeProperties)
                    .then(() => this.setState({user}))
                    .catch(ErrorService.manageError);
                } else {
                  this.setState({user});
                }
              })
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
    });
  };

  uploadProfilePhoto = () => {
    return new Promise ((resolve, reject) => {
      // If profile picture is known, then first upload it then update the user
      if(!!this.state.profilePicture) {
        FileService.uploadProfilePhoto(this.state.profilePicture)
          .then(() => {

            FileService.getDownloadURLForProfilePicture()
              .then(profilePictureUrl => resolve({profilePictureUrl}))
              .catch(reject);
          })
          .catch(reject);

      } else {
        resolve();
      }
    });
  };

  /**
   * RENDER
   */
  render() {
    if(!!this.state.user) {
      return <Redirect to='/dashboard' />;
    } else {
      return (
        <div className="SignUp">
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit}>

            {/* Firstname field */}
            <FormInput
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
              onValueChange={this.onFormInputChange} />

            {/* Lastname field */}
            <FormInput
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
              onValueChange={this.onFormInputChange} />

            {/* Email field */}
            <FormInput
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
              onValueChange={this.onFormInputChange} />

            {/* Password field */}
            <FormInput
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
              onValueChange={this.onFormInputChange} />

            {/* Second Password field */}
            <FormInput
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
              onValueChange={this.onFormInputChange} />

            {/* Profile Photo */}
            <FormInputFile
              imagePreview
              onValueChange={this.onProfilePictureChange}
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
    }
  }
}

export default SignUp;
