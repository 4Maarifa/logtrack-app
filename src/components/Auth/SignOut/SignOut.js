import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import FirebaseService from './../../../services/firebase.service';
import ErrorService from './../../../services/error.service';
import EmployeeService from './../../../services/entities/employee.service';
import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';

import { AccountActivity, EAccountActivityType } from './../../../classes/Employee';

import './SignOut.scss';

const SignOut = () => {

  const [isSignOut, setSignOut] = useState(false);

  useEffect(() => {
    FirebaseService.signOut()
      .then(() => {
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
    return <Redirect to='/' />;
  }
  return null;
};

export default SignOut;
