import React, { Component } from 'react';

import './CompanyPage.css';
import DataService from '../../../services/data.service';
import ErrorService from '../../../services/error.service';
import UtilsService from '../../../services/utils.service';

import RoleEmployee from '../../Entities/RoleEmployee/RoleEmployee';
import ExTable from '../../Utils/ExTable/ExTable';

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

  renderRoleEmployee = (mode, itemKey, itemData) => {
    var employee = {};
    employee[itemKey] = itemData;
    
    return <RoleEmployee key={itemKey} 
      employee={employee} 
      roles={UtilsService.filterKeyValueOnPropertyValue(this.state.roles, (predicate) => predicate.employeeId === itemKey)}
      options={{showDraft: false}} />;
  }

  render() {
    if (!this.state.company) {
      return (<div></div>);
    }
    return (
      <div>
        <img width="20" height="20" alt={this.state.company.name + '\'s logo'} src={this.state.company.logoURL} /><br/>
        <h1>{this.state.company.name}</h1>
        <ExTable items={this.state.rolesEmployees} renderItem={this.renderRoleEmployee}></ExTable>
      </div>
    );
  }
}

export default CompanyPage;
