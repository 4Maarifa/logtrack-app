import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import FirebaseService from './../../../services/firebase.service';
import ErrorService from './../../../services/error.service';
import EmployeeService from './../../../services/entities/employee.service';
import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';

import { AccountActivity, EAccountActivityType } from './../../../classes/Employee';

import './SignOut.scss';

/**
 * Component: Signout
 * Used to sign out
 * 
 * This component does not render anything
 */
const SignOut = () => {

  const [isSignOut, setSignOut] = useState(false);

  useEffect(() => {

    // On load, try to sign out
    FirebaseService.signOut()
      .then(() => {

        // Generate an account activity
        EmployeeService.accountActivity.create(
          new AccountActivity(
            DataService.computed.user.email,
            DateService.getCurrentIsoDateString(),
            {
              success: true,
            },
            EAccountActivityType.SIGNOUT)
        ).then(() => setSignOut(true))
        .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  }, []);

  /**
   * RENDER
   */
  if(isSignOut) {
    // Once signed out, redirect to /
    return <Redirect to='/' />;
  }
  return null;
};

export default SignOut;
