import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserTag, faBuilding } from '@fortawesome/pro-solid-svg-icons';

import ActionButton from './../../Utils/ActionButton/ActionButton';

import DataService from '../../../services/data.service';
import ErrorService from '../../../services/error.service';
import UtilsService from '../../../services/utils.service';

import RoleCompany from '../../Entities/RoleCompany/RoleCompany';
import RoleEmployee from './../../Entities/RoleEmployee/RoleEmployee';

import ExTable from '../../Utils/ExTable/ExTable';

import './Roles.scss';

class Roles extends Component {
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
    this.computeRoles();
  }

  /**
   * ROLES
   */
  computeRoles = () => {
    if (!this.state.user) return;
    // USER ROLES
    DataService.role.getRolesForEmployeeId(this.state.user.uid)
      .then((roles)=> {
        var companiesIds = UtilsService.removeDuplicateFromArray(Object.keys(roles).map((roleKey) => roles[roleKey].companyId));
        DataService.company.getAllForIdList(companiesIds)
          .then((companies) => this.setState({userRolesCompanies: companies, userRoles: roles}))
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);

    // REQUESTED ROLES
    if (!!this.state.activeRole) {
      DataService.role.getDraftRolesForCompanyId(this.state.activeRole.companyId)
        .then((roles) => {
          var employeesIds = UtilsService.removeDuplicateFromArray(Object.keys(roles).map((roleKey) => roles[roleKey].employeeId));
          DataService.employee.getAllForIdList(employeesIds)
            .then((employees) => this.setState({requestedRoles: roles, requestedRolesEmployees: employees}))
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
      <div>
        <ExTable items={this.state.userRolesCompanies} renderItem={this.renderUserRole}></ExTable>
        <h1>Requested roles</h1>
        <ExTable items={this.state.requestedRoles} renderItem={this.renderRequestedRole}></ExTable>
        <ActionButton icon={<FontAwesomeIcon icon={faPlus} />} actions={[
          {title: 'Request a role', icon: <FontAwesomeIcon icon={faUserTag} />, link: `/role/add`},
          {title: 'Add a company', icon: <FontAwesomeIcon icon={faBuilding} />, link: `/company/add`}
        ]} />
      </div>
    );
  }
}

export default Roles;
