import React, { Fragment } from 'react';
import { faPlus, faUserTag, faBuilding, faUserPlus } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import ActionButton from './../../Utils/ActionButton/ActionButton';
import ExTable from './../../Utils/ExTable/ExTable';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';
import RoleService from './../../../services/entities/role.service';
import CompanyService from './../../../services/entities/company.service';
import EmployeeService from './../../../services/entities/employee.service';

import RoleCompany from './../../Entities/RoleCompany/RoleCompany';
import RoleEmployee from './../../Entities/RoleEmployee/RoleEmployee';

import { ERole, ERoleStatus } from './../../../classes/Role';

import './Roles.scss';

class Roles extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      userRoles: {},
      userRolesCompanies: {},

      userRevokedRoles: {},
      userRevokedRolesCompanies: {},

      userDraftRoles: {},
      userDraftRolesCompanies: {},

      requestedRoles: {},
      requestedRolesEmployees: {}
    }, DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues(computedValues => {
        this.setState(computedValues, this.computeRoles);
      })
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  shouldComponentUpdate = (_, nextState) => {
    if(Object.keys(nextState.userRoles).length !== Object.keys(this.state.userRoles).length) {
      this.setState({userRoles: nextState.userRoles});
    }
    if(Object.keys(nextState.userRolesCompanies).length !== Object.keys(this.state.userRolesCompanies).length) {
      this.setState({userRolesCompanies: nextState.userRolesCompanies});
    }
    if(Object.keys(nextState.requestedRoles).length !== Object.keys(this.state.requestedRoles).length) {
      this.setState({requestedRoles: nextState.requestedRoles});
    }
    if(Object.keys(nextState.requestedRolesEmployees).length !== Object.keys(this.state.requestedRolesEmployees).length) {
      this.setState({requestedRolesEmployees: nextState.requestedRolesEmployees});
    }
    return true;
  };

  /**
   * ROLES
   */
  computeRoles = () => {
    if(!this.state.user) return;
    // USER ROLES
    RoleService.getRolesForEmployeeId(this.state.user.uid, [ERoleStatus.CONFIRMED, ERoleStatus.DRAFT, ERoleStatus.REVOKED])
      .then(roles => {
        var userRoles = {}, userRevokedRoles = {}, userDraftRoles = {}, 
          userRolesCompanyKeys = [], userRevokedRolesCompanyKeys = [], userDraftRolesCompanyKeys = [];

        Object.keys(roles).forEach(roleKey => {
          if(roles[roleKey].status === ERoleStatus.CONFIRMED) {
            userRoles[roleKey] = roles[roleKey];
            userRolesCompanyKeys.push(roles[roleKey].companyId);
          }
          if(roles[roleKey].status === ERoleStatus.DRAFT) {
            userDraftRoles[roleKey] = roles[roleKey];
            userDraftRolesCompanyKeys.push(roles[roleKey].companyId);
          }
          if(roles[roleKey].status === ERoleStatus.REVOKED) {
            userRevokedRoles[roleKey] = roles[roleKey];
            userRevokedRolesCompanyKeys.push(roles[roleKey].companyId);
          }
        });

        CompanyService.getAllForIdList(UtilsService.removeDuplicateFromArray(Object.keys(roles).map(roleKey => roles[roleKey].companyId)))
          .then(allCompanies => {
            var userRolesCompanies = {}, userDraftRolesCompanies = {}, userRevokedRolesCompanies = {};

            userRolesCompanyKeys.forEach(companyKey => userRolesCompanies[companyKey] = allCompanies[companyKey]);
            userRevokedRolesCompanyKeys.forEach(companyKey => userRevokedRolesCompanies[companyKey] = allCompanies[companyKey]);
            userDraftRolesCompanyKeys.forEach(companyKey => userDraftRolesCompanies[companyKey] = allCompanies[companyKey]);
            this.setState({userDraftRolesCompanies, userRevokedRolesCompanies, userRolesCompanies, userRevokedRoles, userDraftRoles, userRoles});
          })
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);

    // REQUESTED ROLES
    if(!!this.state.activeRole) {
      RoleService.getRolesForCompanyId(this.state.activeRole.companyId, [ERoleStatus.DRAFT])
        .then(requestedRoles => {
          var employeesIds = UtilsService.removeDuplicateFromArray(Object.keys(requestedRoles).map(roleKey => requestedRoles[roleKey].employeeId));

          EmployeeService.getAllForIdList(employeesIds)
            .then(requestedRolesEmployees => this.setState({requestedRoles, requestedRolesEmployees}))
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
  };

  computeActions = () => {
    var defaultActions = [
      {title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: `/role-add`},
      {title: 'Add a company', icon: <Icon source="fa" icon={faBuilding} />, link: `/company-add`}
    ];

    if(!!this.state.activeRole && this.state.activeRole.role === ERole.MANAGER) {
      defaultActions.unshift({
        title: 'Offer a role', 
        icon: <Icon source="fa" icon={faUserPlus} />, 
        link: `/role-offer`
      })
    }
    return defaultActions;
  };

  /**
   * RENDER
   */
  renderUserRole = (itemKey, itemData) => (
    <RoleCompany key={itemKey} 
      company={ {[itemKey]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(this.state.userRoles, predicate => predicate.companyId === itemKey)}
      options={ {showActions: true} } />
  );

  renderDraftUserRole = (itemKey, itemData) => (
    <RoleCompany key={itemKey} 
      company={ {[itemKey]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(this.state.userDraftRoles, predicate => predicate.companyId === itemKey)}
      options={ {showActions: true, showDates: true} } />
  );

  renderRevokedUserRole = (itemKey, itemData) => (
    <RoleCompany key={itemKey} 
      company={ {[itemKey]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(this.state.userRevokedRoles, predicate => predicate.companyId === itemKey)}
      options={ {showActions: true, showDates: true} } />
  );

  renderRequestedRole = (itemKey, itemData) => (
    <RoleEmployee key={itemKey}
      employee={ {[itemData.employeeId]: this.state.requestedRolesEmployees[itemData.employeeId]} }
      roles={ { [itemKey]: itemData } }
      options={ {showDraft: true, showActions: true} } />
  );

  render() {
    return (
      <div className="Roles">
        {!!this.state.activeRole && 
          <Fragment>
            <h1>Your Current Role</h1>
            <div className="activeRole">
              <RoleCompany company={ {[this.state.activeRole.companyId]: this.state.activeRoleCompany} }
                roles={ {[this.state.employee.activeRoleId]: this.state.activeRole} } />
            </div>
          </Fragment>
        }

        <h1>Your Roles</h1>
        <ExTable items={this.state.userRolesCompanies} renderItem={this.renderUserRole}></ExTable>

        {!!this.state.activeRole && this.state.activeRole.role === ERole.MANAGER &&
          <Fragment>
            <h1>
              Requests to join 
              <PageLink type={PageLinkType.COMPANY} entityId={this.state.employee.activeRoleId} entityData={this.state.activeRoleCompany} />
            </h1>
            <ExTable items={this.state.requestedRoles} renderItem={this.renderRequestedRole}></ExTable>
          </Fragment>
        }

        <h1>Pending Requests</h1>
        <ExTable items={this.state.userDraftRolesCompanies} renderItem={this.renderDraftUserRole}></ExTable>

        <h1>Revoked Roles</h1>
        <ExTable items={this.state.userRevokedRolesCompanies} renderItem={this.renderRevokedUserRole}></ExTable>

        <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={this.computeActions()} />
      </div>
    );
  }
}

export default Roles;
