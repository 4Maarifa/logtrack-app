import React, { Component } from 'react';

import DataService from '../../../services/data.service';
import ErrorService from '../../../services/error.service';
import UtilsService from '../../../services/utils.service';

import RoleEmployee from './../../Entities/RoleEmployee/RoleEmployee';
import Map from './../../Utils/Map/Map';

import ExTable from '../../Utils/ExTable/ExTable';

import './Employees.scss';

class Employees extends Component {
  constructor() {
    super();
    this.state = Object.assign({

      companyEmployees: {},
      companyEmployeesLoading: true,
      rolesOfCompanyEmployees: {}}, 
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
    this.computeEmployeesRoles();
  }

  /**
   * EMPLOYEES
   */
  computeEmployeesRoles = () => {
    if(!!this.state.activeRole) {
      DataService.role.getRolesForCompanyId(this.state.activeRole.companyId)
        .then((roles) => {
          this.setState({rolesOfCompanyEmployees: roles});
  
          var employeesIds = UtilsService.removeDuplicateFromArray(Object.keys(roles).map((roleKey) => roles[roleKey].employeeId));
          DataService.employee.getAllForIdList(employeesIds)
            .then((employees) => this.setState({companyEmployees: employees, companyEmployeesLoading: false}))
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
  }

  /**
   * RENDER
   */
  renderRoleEmployee = (mode, itemKey, itemData) => {
    var employee = {};
    employee[itemKey] = itemData;

    return <RoleEmployee key={itemKey} 
      employee={employee} 
      roles={UtilsService.filterKeyValueOnPropertyValue(this.state.rolesOfCompanyEmployees, (predicate) => predicate.employeeId === itemKey)}
      options={ {showDraft: false, showActions: false} } />;
  }

  render() {
    return (
      <div>
        <Map></Map>
        <ExTable key="employees" items={this.state.companyEmployees} renderItem={this.renderRoleEmployee} header={['Name', 'Roles']} loading={this.state.companyEmployeesLoading}></ExTable>
      </div>
    );
  }
}

export default Employees;
