import React from 'react';
import { Redirect } from 'react-router-dom';
import { faEnvelope, faKey } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import Icon from './../../Utils/Icon/Icon';

import FirebaseService from './../../../services/firebase.service';
import ErrorService from './../../../services/error.service';
import DataService from './../../../services/data.service';

import './SignIn.scss';

class SignIn extends ComponentSafeUpdate {

  constructor(props) {
    super(props);
    this.state = Object.assign({email: '', password: ''}, DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setState(computedValues);
      })
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  handleSubmit = event => {
    event.preventDefault();

    FirebaseService.signIn(this.state.email, this.state.password)
      .then((user) => this.setState({user}))
      .catch(ErrorService.manageError);
  };

  onFormInputChange = (value, fieldName) => this.setState({[fieldName]: value});

  /**
   * RENDER
   */
  render() {
    if(!!this.state.user) {
      return <Redirect to='/dashboard' />;
    } else {
      return (
        <div className="SignIn">
          <h1>Sign In</h1>
          <form onSubmit={this.handleSubmit}>

            {/* E-Mail field */}
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
                  Your account e-mail
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
                  Your account password
                </span>
              }
              inputRequired
              onValueChange={this.onFormInputChange} />

            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}

export default SignIn;
