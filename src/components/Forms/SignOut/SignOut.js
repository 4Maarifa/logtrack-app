import React from 'react';
import { Redirect } from 'react-router-dom';

import FirebaseService from './../../../services/firebase.service';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import './SignOut.scss';

class SignOut extends ComponentSafeUpdate {

  componentDidMount = () => {
    super.componentDidMount();
    FirebaseService.signOut();
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  render() {
    return (
      <Redirect to='/' />
    );
  }
}

export default SignOut;
