import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.css';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';

import Tabs from './../../Utils/Tabs/Tabs';
import ExTable from './../../Utils/ExTable/ExTable';

import RoleCompany from './../../Entities/RoleCompany/RoleCompany';
import RoleEmployee from './../../Entities/RoleEmployee/RoleEmployee';
import Equipment from '../../Entities/Equipment/Equipment';

import ERole from './../../../classes/enums/ERole';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = Object.assign({
      userRoles: {},
      userRolesCompanies: {},

      requestedRoles: {},
      requestedRolesEmployees: {},

      equipments: {},
      equipmentModels: {},
      brands: {},

      companyEmployees: {},
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
    this.computeRoles();
    this.computeEquipments();
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
            .then((employees) => this.setState({companyEmployees: employees}))
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
  }

  /**
   * EQUIPMENTS
   */
  computeEquipments = () => {
    DataService.brand.getAll()
      .then((brands) => this.setState({brands: brands}))
      .catch(ErrorService.manageError);

    DataService.equipmentModel.getAll()
      .then((equipmentModels => this.setState({equipmentModels: equipmentModels})))
      .catch(ErrorService.manageError);

    if(!!this.state.activeRole) {
      DataService.equipment.getAllForCompanyId(this.state.activeRole.companyId)
        .then((equipments) => this.setState({equipments: equipments}))
        .catch(ErrorService.manageError);
    }
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
    if (!!this.state.activeRole && this.state.activeRole.role === ERole.MANAGER) {
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
      options={ {showDraft: true} } />;
  }

  renderRequestedRole = (mode, itemKey, itemData) => {
    var employee = {};
    employee[itemData.employeeId] = this.state.requestedRolesEmployees[itemData.employeeId];

    return <RoleEmployee key={itemKey}
      employee={employee}
      roles={ { [itemKey]: itemData } }
      options={ {showDraft: true} } />
  }

  renderProfile() {
    if (!!this.state.employee && !!this.state.user) {
      return (
        <div>
          Welcome back, <Link to={`/employee/${this.state.user.uid}`}>
            {this.state.employee.firstname + ' ' + this.state.employee.lastname}
          </Link>
        </div>
      );
    }
    return (<div></div>);
  }

  renderRoleDependingPart() {
    if(!this.state.activeRole) {return <div></div>;}

    var renderMethod = null;
    switch(this.state.activeRole.role) {
      case ERole.MANAGER: 
        renderMethod = this.renderManagerPart; break;
      case ERole.DRIVER:
        renderMethod = this.renderDriverPart; break;
      case ERole.MECHANIC:
        renderMethod = this.renderMechanicPart; break;
      default:
        renderMethod = () => {ErrorService.error('No match for role ' + this.state.activeRole.role); return <div></div>}; break;
    }

    return renderMethod();
  }

  renderEquipment = (mode, itemKey, itemData) => {
    var equipmentModel = {}, brand = {}, equipment = {};
    equipmentModel[itemData.equipmentModelId] = this.state.equipmentModels[itemData.equipmentModelId];
    brand[equipmentModel[itemData.equipmentModelId].brand] = this.state.brands[equipmentModel[itemData.equipmentModelId].brand];
    equipment[itemKey] = itemData;

    return <Equipment key={itemKey}
      equipment={equipment}
      brand={brand}
      equipmentModel={equipmentModel} />
  }

  renderRoleEmployee = (mode, itemKey, itemData) => {
    var employee = {};
    employee[itemKey] = itemData;

    return <RoleEmployee key={itemKey} 
      employee={employee} 
      roles={UtilsService.filterKeyValueOnPropertyValue(this.state.rolesOfCompanyEmployees, (predicate) => predicate.employeeId === itemKey)}
      options={ {showDraft: false} } />;
  }

  renderManagerPart = () => {
    if(!this.state.activeRole) {return (<div></div>);}
    return (
      <div>
        Manager Part
        <h1>Requested roles</h1>
        <ExTable items={this.state.requestedRoles} renderItem={this.renderRequestedRole}></ExTable>

        <Tabs default="equipments" tabs={
          {
            employees: {
              name: () => 'Employees',
              content: () => <ExTable key="employees" items={this.state.companyEmployees} renderItem={this.renderRoleEmployee}></ExTable>
            },
            equipments: {
              name: () => 'Equipments',
              content: () => <ExTable key="equipments" items={this.state.equipments} renderItem={this.renderEquipment}></ExTable>
            }
          }
        }></Tabs>
      </div>);
  }

  renderDriverPart() {
    // TODO
    return (<div>Driver Part</div>);
  }

  renderMechanicPart() {
    // TODO
    return (<div>Mechanic Part</div>);
  }

  renderTopLinks() {
    if(!this.state.activeRole || this.state.activeRole.role !== ERole.MANAGER) {
      return <div>
        <Link to={`/company/add`}>Add a company</Link>
        <Link to={`/role/add`}>Request a role</Link>
      </div>;
    }
    return <div>
      <Link to={`/company/add`}>Add a company</Link>
      <Link to={`/role/add`}>Request a role</Link>
      <Link to={`/equipment/add`}>Add an equipment</Link>
      <Link to={`/contract/add`}>Add a contract</Link>
    </div>;
  }

  render() {
    return (
      <div>
        Dashboard<br/>
        
        {this.renderTopLinks()}

        {this.renderProfile()}
        <ExTable items={this.state.userRolesCompanies} renderItem={this.renderUserRole}></ExTable>

        {this.renderRoleDependingPart()}
      </div>
    );
  }
}

export default Dashboard;
