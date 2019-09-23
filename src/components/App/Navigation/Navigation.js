import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerFast, faHome, faSignIn, faUserPlus, faUser, faUsers, faTruck, faFileSignature, faTag } from '@fortawesome/pro-solid-svg-icons';

import DataService from '../../../services/data.service';
import UtilsService from '../../../services/utils.service';

import { RoleIcons } from '../../../classes/enums/ERole';

import './Navigation.scss';

class Navigation extends Component {
  constructor() {
    super();
    this.state = Object.assign({
      deployed: true}, 
      DataService.computed.getDefaultComputedValues());
  }

  observeComputedValues = (computedValues) => {
    this.setState(computedValues);
  }

  componentDidMount = () => {
    DataService.computed.observeComputedValues(this.observeComputedValues);
  }

  toggleDeployed = () => {
    this.setState({deployed: !this.state.deployed});
  }

  renderActiveRole = () => {
    if (this.state.activeRole == null) {
      return (<NavLink activeClassName="nav--active" to={`/roles`} exact={true}>
        <FontAwesomeIcon icon={faTag} />
        <span className="nav-title">No active role</span>
      </NavLink>);
    }
    return (<NavLink activeClassName="nav--active" to={`/roles`} exact={true}>
      {RoleIcons[this.state.activeRole.role]}
      <span className="nav-title">
        {UtilsService.capitalize(this.state.activeRole.role)} / {this.state.activeRoleCompany.name}
      </span>
    </NavLink>);
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
        <NavLink activeClassName="nav--active" to={`/profile`} exact={true}>
          <FontAwesomeIcon icon={faUser} />
          <span className="nav-title">
            {this.state.employee.firstname + ' ' + this.state.employee.lastname}
          </span>
        </NavLink>
      );
    }
    return (<NavLink activeClassName="nav--active" to={`/profile`} exact={true}>
      <FontAwesomeIcon icon={faUser} />
    </NavLink>);
  }

  render() {
    return (
      <div className={'Navigation ' + (!!this.state.deployed ? 'Navigation--deployed':'')}>
        {!!this.state.user && 
          <nav>
            <NavLink activeClassName="nav--active" to={`/dashboard`}>
              <FontAwesomeIcon icon={faTachometerFast} />
              <span className="nav-title">Dashboard</span>
            </NavLink>
            {!!this.state.activeRole &&
              <NavLink activeClassName="nav--active" to={`/employees`}>
                <FontAwesomeIcon icon={faUsers} />
                <span className="nav-title">Employees</span>
              </NavLink>
            }
            {!!this.state.activeRole &&
              <NavLink activeClassName="nav--active" to={`/equipments`}>
                <FontAwesomeIcon icon={faTruck} />
                <span className="nav-title">Equipments</span>
              </NavLink>
            }
            {!!this.state.activeRole &&
              <NavLink activeClassName="nav--active" to={`/contracts`}>
                <FontAwesomeIcon icon={faFileSignature} />
                <span className="nav-title">Contracts</span>
              </NavLink>
            }
            <span className="nav-clearfix"></span>
            {this.renderActiveRole()}
            {this.renderUsername()}
          </nav>
        }
        {!this.state.user &&
          <nav>
            <NavLink activeClassName="nav--active" to={`/`} exact={true}>
              <FontAwesomeIcon icon={faHome} />
              <span className="nav-title">Home</span>
            </NavLink>
            <NavLink activeClassName="nav--active" to={`/signin`}>
              <FontAwesomeIcon icon={faSignIn} />
              <span className="nav-title">Sign in</span>
            </NavLink>
            <NavLink activeClassName="nav--active" to={`/signup`}>
              <FontAwesomeIcon icon={faUserPlus} />
              <span className="nav-title">Sign up</span>
            </NavLink>
          </nav>
        }
        <span className="indicator" onClick={() => this.toggleDeployed()}>
          <i></i>
        </span>
      </div>
    );
  }
}

export default Navigation;
