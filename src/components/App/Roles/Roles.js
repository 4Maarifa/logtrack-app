import React from 'react';
import { faPlus, faUserTag, faBuilding } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import ActionButton from './../../Utils/ActionButton/ActionButton';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';
import RoleService from './../../../services/entities/role.service';
import CompanyService from './../../../services/entities/company.service';
import EmployeeService from './../../../services/entities/employee.service';

import RoleCompany from './../../Entities/RoleCompany/RoleCompany';
import RoleEmployee from './../../Entities/RoleEmployee/RoleEmployee';

import ExTable from './../../Utils/ExTable/ExTable';
import Icon from './../../Utils/Icon/Icon';

import './Roles.scss';

class Roles extends ComponentSafeUpdate {
  constructor() {
    super();
    this.state = Object.assign({
      userRoles: {},
      userRolesCompanies: {},

      requestedRoles: {},
      requestedRolesEmployees: {}}, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setStateSafe(computedValues, this.computeRoles);
      })
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  }

  /**
   * ROLES
   */
  computeRoles = () => {
    if (!this.state.user) return;
    // USER ROLES
    RoleService.getRolesForEmployeeId(this.state.user.uid)
      .then((roles)=> {
        var companiesIds = UtilsService.removeDuplicateFromArray(Object.keys(roles).map((roleKey) => roles[roleKey].companyId));
        CompanyService.getAllForIdList(companiesIds)
          .then((companies) => this.setStateSafe({userRolesCompanies: companies, userRoles: roles}))
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);

    // REQUESTED ROLES
    if (!!this.state.activeRole) {
      RoleService.getDraftRolesForCompanyId(this.state.activeRole.companyId)
        .then((roles) => {
          var employeesIds = UtilsService.removeDuplicateFromArray(Object.keys(roles).map((roleKey) => roles[roleKey].employeeId));
          EmployeeService.getAllForIdList(employeesIds)
            .then((employees) => this.setStateSafe({requestedRoles: roles, requestedRolesEmployees: employees}))
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
  }

  /**
   * RENDER
   */
  renderUserRole = (mode, itemKey, itemData) => {
    var company = {};
    company[itemKey] = itemData;

    return <RoleCompany key={itemKey} 
      company={company} 
      roles={UtilsService.filterKeyValueOnPropertyValue(this.state.userRoles, (predicate) => predicate.companyId === itemKey)}
      options={ {showDraft: true, showActions: true} } />;
  }

  renderRequestedRole = (mode, itemKey, itemData) => {
    var employee = {};
    employee[itemData.employeeId] = this.state.requestedRolesEmployees[itemData.employeeId];

    return <RoleEmployee key={itemKey}
      employee={employee}
      roles={ { [itemKey]: itemData } }
      options={ {showDraft: true, showActions: true} } />
  }

  renderRoleEmployee = (mode, itemKey, itemData) => {
    var employee = {};
    employee[itemKey] = itemData;

    return <RoleEmployee key={itemKey} 
      employee={employee} 
      roles={UtilsService.filterKeyValueOnPropertyValue(this.state.rolesOfCompanyEmployees, (predicate) => predicate.employeeId === itemKey)}
      options={ {showDraft: false} } />;
  }

  render() {
    return (
      <div className="Roles">
        <ExTable items={this.state.userRolesCompanies} renderItem={this.renderUserRole}></ExTable>
        <h1>Requested roles</h1>
        <ExTable items={this.state.requestedRoles} renderItem={this.renderRequestedRole}></ExTable>
        <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
          {title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: `/role-add`},
          {title: 'Add a company', icon: <Icon source="fa" icon={faBuilding} />, link: `/company-add`}
        ]} />
      </div>
    );
  }
}

export default Roles;
