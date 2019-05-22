import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FirebaseService from '../../../services/firebase.service';

import './SignOut.css';

class SignOut extends Component {

  componentDidMount() {
    FirebaseService.signOut();
  }

  render() {
    return (
      <Redirect to='/' />
    );
  }
}

export default SignOut;
