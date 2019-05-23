import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './CompanyPage.css';
import DataService from '../../../services/data.service';
import ErrorService from '../../../services/error.service';
import UtilsService from '../../../services/utils.service';

class CompanyPage extends Component {
  constructor () {
    super();
    this.state = {
      companyId: null,
      company: null,
      roles: {},
      rolesEmployees: {}
    }
  }

  componentDidMount = () => {
    this.setState({companyId: this.props.match.params.id}, this.fetchCompanyInfos);
  }

  fetchCompanyInfos = () => {
    DataService.company.get(this.state.companyId)
      .then((companyDoc) => this.setState({company: companyDoc.data()}))
      .catch(ErrorService.manageError);

    DataService.role.getRolesForCompanyId(this.state.companyId)
      .then((roles) => {
        this.setState({roles: roles});

        var employeesIds = UtilsService.removeDuplicateFromArray(
          Object.keys(roles).map((roleKey) => roles[roleKey].employeeId)
        );
        DataService.employee.getAllForIdList(employeesIds)
          .then((employees) => this.setState({rolesEmployees: employees}))
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  }

  renderRolesByEmployee = () => {
    if(!this.state.roles || !this.state.rolesEmployees) {
      return (<div></div>);
    }
    var roles = [];
    
    Object.keys(this.state.rolesEmployees).forEach((employeeId) => {
      roles.push(<li key={employeeId}>
        <img width="20" height="20" src={this.state.rolesEmployees[employeeId].profilePictureUrl} alt={this.state.rolesEmployees[employeeId].firstname + ' ' + this.state.rolesEmployees[employeeId].lastname + '\'s photo'} />
        <Link to={`/employee/${employeeId}`}>
          {this.state.rolesEmployees[employeeId].firstname + ' ' + this.state.rolesEmployees[employeeId].lastname}
        </Link> =>
        {UtilsService.filterObjectsOnPropertyValue(this.state.roles, (predicate) => predicate.employeeId === employeeId).map((role) => role.role).join(',')}
      </li>);
    });

    return roles;
  }

  render() {
    if (!this.state.company) {
      return (<div></div>);
    }
    return (
      <div>
        <img width="20" height="20" alt={this.state.company.name + '\'s logo'} src={this.state.company.logoURL} /><br/>
        <h1>{this.state.company.name}</h1>
        {this.renderRolesByEmployee()}
      </div>
    );
  }
}

export default CompanyPage;
