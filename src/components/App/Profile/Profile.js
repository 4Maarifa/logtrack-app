import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import DataService from '../../../services/data.service';

import './Profile.scss';

class Profile extends Component {
  constructor() {
    super();
    this.state = Object.assign({
      }, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    this.setState({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setState(computedValues, this.computeValues);
      })
    });
  }

  componentWillUnmount = () => {
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  }

  computeValues() {
  }

  /**
   * RENDER
   */
  render() {
    return (
      <div className="Profile">
        {!!this.state.employee && !!this.state.user &&
          <div>
            Welcome back, {this.state.employee.firstname + ' ' + this.state.employee.lastname}!
            <NavLink to={`/signout`} className="signout">Sign Out</NavLink>
          </div>
        }
      </div>
    );
  }
}

export default Profile;
