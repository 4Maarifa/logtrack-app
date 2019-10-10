import React from 'react';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';
import RoleService from './../../../services/entities/role.service';
import EmployeeService from './../../../services/entities/employee.service';

import RoleEmployee from './../../Entities/RoleEmployee/RoleEmployee';
import Map from './../../Utils/Map/Map';

import ExTable from '../../Utils/ExTable/ExTable';

import './Employees.scss';

class Employees extends ComponentSafeUpdate {
  constructor() {
    super();
    this.state = Object.assign({

      companyEmployees: {},
      companyEmployeesLoading: true,
      rolesOfCompanyEmployees: {}}, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setStateSafe(computedValues, this.computeValues);
      })
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
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
      RoleService.getRolesForCompanyId(this.state.activeRole.companyId)
        .then((roles) => {
          this.setStateSafe({rolesOfCompanyEmployees: roles});
  
          var employeesIds = UtilsService.removeDuplicateFromArray(Object.keys(roles).map((roleKey) => roles[roleKey].employeeId));
          EmployeeService.getAllForIdList(employeesIds)
            .then((employees) => this.setStateSafe({companyEmployees: employees, companyEmployeesLoading: false}))
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
      options={ {showDraft: false, showActions: false} }
      showDetails={mode === 'active'} />;
  }

  render() {
    return (
      <div className="Employees">
        <Map></Map>
        <ExTable key="employees" items={this.state.companyEmployees} renderItem={this.renderRoleEmployee} header={['Name', 'Roles']} loading={this.state.companyEmployeesLoading}></ExTable>
      </div>
    );
  }
}

export default Employees;
