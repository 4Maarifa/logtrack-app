import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './RoleEmployee.css';

import Role from '../Role/Role';

import ERoleStatus from '../../../classes/enums/ERoleStatus';

class RoleEmployee extends Component {
  constructor () {
    super();
    this.state = {
      roles: [],
      employee: null,
      options: {}
    };
  }

  componentDidMount = () => {
    this.setState({employee: this.props.employee, roles: this.props.roles, options: this.props.options});
  }

  renderProfilePicture(employeeId) {
    if(!!this.state.employee && !!this.state.employee.profilePictureUrl) {
      return <img width="20" height="20" src={this.state.employee[employeeId].profilePictureUrl} 
        alt={this.state.employee[employeeId].firstname + ' ' + this.state.employee[employeeId].lastname + '\'s photo'} />
    }
    return <></>;
  }

  renderRole = (roleKey) => {
    if(!this.state.options.showDraft && this.state.roles[roleKey].status === ERoleStatus.DRAFT) {
      return <Fragment key={roleKey}></Fragment>;
    }
    return <Role key={roleKey} role={ { [roleKey]: this.state.roles[roleKey] } }></Role>;
  }

  render() {
    if (!this.state.employee || !Object.keys(this.state.roles).length) {
      return (<></>);
    }
    var employeeId = Object.keys(this.state.employee)[0];

    if(!this.state.options.showDraft && 
        Object.keys(this.state.roles).map((roleKey) => this.state.roles[roleKey].status).reduce((total, role) => total + (role.status === ERoleStatus.CONFIRMED) ? 1 : 0) === 0) {
        return <></>;
    }

    return (
      <div>
        {this.renderProfilePicture(employeeId)}
        
        <Link to={`/employee/${employeeId}`}>
          {this.state.employee[employeeId].firstname + ' ' + this.state.employee[employeeId].lastname}
        </Link> =>
        {Object.keys(this.state.roles).map((roleKey) => 
          this.renderRole(roleKey)
        )}
      </div>
    );
  }
}

export default RoleEmployee;
