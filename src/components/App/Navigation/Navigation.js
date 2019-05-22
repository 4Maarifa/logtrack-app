import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';

import DataService from '../../../services/data.service';

class Navigation extends Component {
  constructor() {
    super();
    this.state = DataService.computed.getDefaultComputedValues();
  }

  observeComputedValues = (computedValues) => {
    this.setState(computedValues);
  }

  componentDidMount = () => {
    DataService.computed.observeComputedValues(this.observeComputedValues);
  }

  renderActiveRole = () => {
    if (this.state.activeRole == null) {
      return (
        <span>No active role</span>
      );
    }
    return (
      <span>
        {this.state.activeRole.role} at {this.state.activeRoleCompany.name}
      </span>
    );
  }

  renderProfilePicture = () => {
    if(!!this.state.employee && this.state.employee.profilePictureUrl) {
      return (<img width="20" height="20" src={this.state.employee.profilePictureUrl} alt={this.state.employee.firstname + ' ' + this.state.employee.lastname + '\'s photo'} />);
    }
    return (<div></div>);
  }

  renderUsername = () => {
    if (!!this.state.employee) {
      return (
        <span>{this.state.employee.firstname + ' ' + this.state.employee.lastname}</span>
      )
    }
    return (<span></span>)
  }

  render() {
    if(!!this.state.user) {
      return (
        <nav>
          <Link to={`/`}>Home</Link>
          <Link to={`/signout`}>Sign out</Link>
          <Link to={`/dashboard`}>Dashboard</Link>
          
          {this.renderActiveRole()}
          {this.renderProfilePicture()}
          {this.renderUsername()}
        </nav>
      );
    } else {
      return (
        <nav>
          <Link to={`/`}>Home</Link>
          <Link to={`/signin`}>Sign in</Link>
          <Link to={`/signup`}>Sign up</Link>
        </nav>
      );
    }
    
  }
}

export default Navigation;
