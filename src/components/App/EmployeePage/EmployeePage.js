import React, { Component } from 'react';

import './EmployeePage.css';

import DataService from '../../../services/data.service';
import ErrorService from '../../../services/error.service';
import UtilsService from '../../../services/utils.service';

import RoleCompany from '../../Entities/RoleCompany/RoleCompany';

import ExTable from '../../Utils/ExTable/ExTable';

class EmployeePage extends Component {
  constructor () {
    super();
    this.state = {
      employeeId: null,
      employee: null,

      roles: {},
      rolesCompanies: {}
    };
  }

  componentDidMount = () => {
    this.setState({employeeId: this.props.match.params.id}, this.fetchEmployeeInfos);
  }

  fetchEmployeeInfos = () => {
    DataService.employee.get(this.state.employeeId)
      .then((employeeDoc) => this.setState({employee: employeeDoc.data()}))
      .catch(ErrorService.manageError);
    
    DataService.role.getRolesForEmployeeId(this.state.employeeId)
      .then((roles) => {
        var companiesIds = UtilsService.removeDuplicateFromArray(
          Object.keys(roles).map((roleKey) => roles[roleKey].companyId)
        );

        DataService.company.getAllForIdList(companiesIds)
          .then((companies) => this.setState({rolesCompanies: companies, roles: roles}))
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  }

  renderRoleCompany = (mode, itemKey, itemData) => {
    var company = {};
    company[itemKey] = itemData;

    return <RoleCompany key={itemKey} 
      company={company} 
      roles={UtilsService.filterKeyValueOnPropertyValue(this.state.roles, (predicate) => predicate.companyId === itemKey)}
      options={{}} />;
  }

  render() {
    if (!this.state.employee) {
      return (<div></div>);
    }
    return (
      <div>
        <img width="20" height="20" src={this.state.employee.profilePictureUrl} alt={this.state.employee.firstname + ' ' + this.state.employee.lastname + '\'s photo'} />
        <h1>{this.state.employee.firstname + ' ' + this.state.employee.lastname}</h1>
        <ExTable items={this.state.rolesCompanies} renderItem={this.renderRoleCompany}></ExTable>
      </div>
    );
  }
}

export default EmployeePage;
