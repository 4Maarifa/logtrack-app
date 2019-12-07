import React from 'react';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Map from './../../Utils/Map/Map';
import ExTable from './../../Utils/ExTable/ExTable';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';
import RoleService from './../../../services/entities/role.service';
import EmployeeService from './../../../services/entities/employee.service';

import RoleEmployee from './../../Entities/RoleEmployee/RoleEmployee';


import './Employees.scss';

class Employees extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({

      companyEmployees: {},
      companyEmployeesLoading: true,
      rolesOfCompanyEmployees: {}
    }, DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues(computedValues => {
        this.setState(computedValues, this.computeValues);
      })
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  computeValues = () => {
    this.computeEmployeesRoles();
  };

  /**
   * EMPLOYEES
   */
  computeEmployeesRoles = () => {
    if(!!this.state.activeRole) {
      RoleService.getRolesForCompanyId(this.state.activeRole.companyId)
        .then(rolesOfCompanyEmployees => {
          this.setState({rolesOfCompanyEmployees});
  
          var employeesIds = UtilsService.removeDuplicateFromArray(Object.keys(rolesOfCompanyEmployees).map(roleKey => rolesOfCompanyEmployees[roleKey].employeeId));
          EmployeeService.getAllForIdList(employeesIds)
            .then(companyEmployees => this.setState({companyEmployees, companyEmployeesLoading: false}))
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
  };

  /**
   * RENDER
   */
  renderRoleEmployee = (itemKey, itemData) => (
    <RoleEmployee key={itemKey} 
      employee={ {[itemKey]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(this.state.rolesOfCompanyEmployees, predicate => predicate.employeeId === itemKey)}
      options={ {showDraft: false, showActions: false} }
      showDetails={true} />
  );

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
