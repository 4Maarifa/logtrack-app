import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import FirebaseService from './../../../services/firebase.service';

import './SignOut.scss';

const SignOut = () => {

  const [isSignOut, setSignOut] = useState(false);

  useEffect(() => {
    FirebaseService.signOut();
    setSignOut(true);
  }, []);

  /**
   * RENDER
   */
  if(isSignOut) {
    return <Redirect to='/' />;
  }
  return null;
};

export default SignOut;
