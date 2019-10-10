import React from 'react';
import { Redirect } from 'react-router-dom';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import FirebaseService from '../../../services/firebase.service';
import ErrorService from '../../../services/error.service';
import DataService from '../../../services/data.service';

import './SignIn.scss';

class SignIn extends ComponentSafeUpdate {

  constructor() {
    super();
    this.state = Object.assign({email: '', password: ''}, DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setStateSafe(computedValues);
      })
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  }

  handleChange = event => {
    let newState = {};
    newState[event.target.getAttribute('data-field')] = event.target.value;
    this.setStateSafe(newState);
  }

  handleSubmit = event => {
    console.log('SignIn : submitting...');
    event.preventDefault();

    FirebaseService.signIn(this.state.email, this.state.password)
      .then((user) => {
        console.log('SignIn : successful. Redirecting to Dashboard...');
        this.setStateSafe({user: user});
      })
      .catch(ErrorService.manageError);
  }

  /**
   * RENDER
   */
  render() {
    if(!!this.state.user) {
      return <Redirect to='/dashboard' />;
    } else {
      return (
        <div>
          Sign In
          <form onSubmit={this.handleSubmit}>
            {/* E-Mail field */}
            <label>
              E-Mail:
              <input 
                type="email" 
                data-field="email"
                placeholder="john.doe@mail.com"
                name="email"
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
            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}

export default SignIn;
