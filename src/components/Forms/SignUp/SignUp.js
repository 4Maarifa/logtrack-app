import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import FirebaseService from '../../../services/firebase.service';
import ErrorService from '../../../services/error.service';
import FileService from '../../../services/file.service';
import DataService from '../../../services/data.service';

import Employee from '../../../classes/Employee';

import './SignUp.scss';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      secondpassword: '',
      user: FirebaseService.getCurrentUser()
    };
    this.profilePicture = React.createRef();
  }

  handleChange = event => {
    let newState = {};
    newState[event.target.getAttribute('data-field')] = event.target.value;
    this.setState(newState);
  }

  handleSubmit = event => {
    console.log('SignUp : submitting...');
    event.preventDefault();

    if (this.state.password !== this.state.secondpassword) {
      ErrorService.manageError({code: 'auth/passwords-not-match'});
      return;
    }

    FirebaseService.signUp(this.state.email, this.state.password)
      .then((user) => {
        DataService.employee.create(new Employee(user.user.uid, this.state.firstname, this.state.lastname, [], null, null))
          .then(() => {
            this.uploadProfilePhoto()
              .then(employeeProperties => {
                if(!!employeeProperties) {
                  DataService.employee.updateField(user.user.uid, employeeProperties)
                    .then(() => {
                      console.log('SignUp : successful. Redirecting to Dashboard...');
                      this.setState({user: user});
                    })
                    .catch(ErrorService.manageError);
                } else {
                  console.log('SignUp : successful. Redirecting to Dashboard...');
                  this.setState({user: user});
                }
              })
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
    });
  }

  uploadProfilePhoto = () => {
    return new Promise ((resolve, reject) => {
      // If profile picture is known, then first upload it then update the user
      if (!!this.profilePicture.current.files.length) {
        console.log('SignUp: Saving profile picture...');
        FileService.uploadProfilePhoto(this.profilePicture.current.files[0])
          .then(() => {
            console.log('SignUp : Profile Picture saved, getting profile picture URL...');

            FileService.getDownloadURLForProfilePicture()
              .then((url) => {
                console.log('SignUp : Profile Picture URL got...');

                resolve({
                  profilePictureUrl: url
                });
              })
              .catch(reject);
          })
          .catch(reject);

      } else {
        resolve();
      }
    });
  }

  render() {
    if (!!this.state.user) {
      return <Redirect to='/dashboard' />;
    } else {
      return (
        <div>
          Sign Up
          <form onSubmit={this.handleSubmit}>
            {/* Firstname field */}
            <label>
              Firstname:
              <input 
                type="text"
                data-field="firstname"
                placeholder="John"
                name="fname"
                value={this.state.firstname}
                onChange={this.handleChange}
                required />
            </label>

            {/* Lastname field */}
            <label>
              Lastname:
              <input 
                type="text"
                data-field="lastname"
                placeholder="Doe"
                name="lname"
                value={this.state.lastname}
                onChange={this.handleChange}
                required />
            </label>

            {/* Email field */}
            <label>
              E-Mail:
              <input 
                type="email" 
                data-field="email"
                name="email"
                placeholder="john.doe@mail.com"
                value={this.state.email} 
                onChange={this.handleChange} 
                required />
            </label>

            {/* Password field */}
            <label>
              Password:
              <input 
                type="password"
                data-field="password" 
                name="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                value={this.state.password} 
                onChange={this.handleChange} 
                required />
            </label>

            {/* Second Password field */}
            <label>
              Repeat your password:
              <input 
                type="password"
                data-field="secondpassword" 
                autoComplete="off"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                value={this.state.secondpassword} 
                onChange={this.handleChange} 
                required />
            </label>

            {/* Profile Photo */}
            <label>
              Profile picture (Optional):
              <input
                type="file"
                ref={this.profilePicture} />
            </label>

            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}

export default SignUp;
