import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.css';

import DataService from '../../../services/data.service';
import ErrorService from '../../../services/error.service';
import Tabs from '../../Utils/Tabs/Tabs';
import ExTable from '../../Utils/ExTable/ExTable';
import ERoleStatus from '../../../classes/enums/ERoleStatus';
import ERole from '../../../classes/enums/ERole';
import UtilsService from '../../../services/utils.service';

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

    DataService.equipment.getAllForCompanyId(this.state.activeRole.companyId)
      .then((equipments) => this.setState({equipments: equipments}))
      .catch(ErrorService.manageError);
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
          this.setState({requestedRoles: roles});

          var employeesIds = UtilsService.removeDuplicateFromArray(Object.keys(roles).map((roleKey) => roles[roleKey].employeeId));
          DataService.employee.getAllForIdList(employeesIds)
            .then((employees) => this.setState({requestedRolesEmployees: employees}))
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
  }

  activateRole = (roleId) => DataService.employee.activateRole(roleId);
  unactivateRole = () => DataService.employee.unactivateRole();
  confirmRole = (roleId) => DataService.confirmRole(roleId);

  /**
   * RENDER
   */
  renderUserRoles() {
    var userRoles = [];
    Object.keys(this.state.userRoles).forEach((docRoleKey) => {
      userRoles.push(
        <li key={docRoleKey}>
          Role: {this.state.userRoles[docRoleKey].role + ' at '}
          <Link to={`/company/${this.state.userRoles[docRoleKey].companyId}`}>Company: {this.state.userRolesCompanies[this.state.userRoles[docRoleKey].companyId].name}</Link>
          
          <img width="20" height="20" alt={this.state.userRolesCompanies[this.state.userRoles[docRoleKey].companyId].name + '\'s logo'} src={this.state.userRolesCompanies[this.state.userRoles[docRoleKey].companyId].logoURL} /><br/>

          {(this.state.userRoles[docRoleKey].status === ERoleStatus.DRAFT) ? 
          (<span>Draft</span>) : 
            (docRoleKey === this.state.employee.activeRoleId) ? 
            (<span>Active. <button onClick={() => this.unactivateRole()}>Unactivate ?</button></span>) : 
            (<span>Unactive. <button onClick={() => this.activateRole(docRoleKey)}>Activate ?</button></span>)
          }
        </li>
      );
      
    });

    return (Object.keys(this.state.userRoles).length > 0) ? (
      <div>
        <h1>Roles</h1>
        <ul>{userRoles}</ul>
      </div>
    ) : <div></div>;
  }

  renderRequestedRoles() {
    var requestedRoles = [];
    Object.keys(this.state.requestedRoles).forEach((docRoleKey) => {
      requestedRoles.push(
        <li key={docRoleKey}>
          Employee id: {this.state.requestedRoles[docRoleKey].employeeId}<br/>
          Role: {this.state.requestedRoles[docRoleKey].role}<br/>
          Employee: {this.state.requestedRolesEmployees[this.state.requestedRoles[docRoleKey].employeeId].firstname + ' ' + this.state.requestedRolesEmployees[this.state.requestedRoles[docRoleKey].employeeId].lastname}<br/>
          <button onClick={() => this.confirmRole(docRoleKey)}>Confirm ?</button>
        </li>
      );
    });

    return (Object.keys(this.state.requestedRoles).length > 0) ? (
      <div>
        <h1>Requested Roles</h1>
        <ul>{requestedRoles}</ul>
      </div>
    ) : <div></div>;
  }

  renderProfile() {
    if (!!this.state.employee) {
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
    var brand = (!!this.state.brands[this.state.equipmentModels[itemData.equipmentModelId].brand]) ? 
      <img width="40" height="20" 
        alt={this.state.equipmentModels[itemData.equipmentModelId].brand + '\'s logo'} 
        src={this.state.brands[this.state.equipmentModels[itemData.equipmentModelId].brand].logoUrl} />
      : this.state.equipmentModels[itemData.equipmentModelId].brand;

    return (<div>
      {itemData.identification}<br/>
      {brand}<br/>
      <img width="100" height="100" 
        alt={this.state.equipmentModels[itemData.equipmentModelId].name} 
        src={this.state.equipmentModels[itemData.equipmentModelId].photoUrl} /><br/>
      
      {(mode === 'active') ? this.state.equipmentModels[itemData.equipmentModelId].name : ''}
    </div>);
  }

  renderCompanyEmployee = (mode, itemKey, itemData) => {
    var employeeName = itemData.firstname + ' ' + itemData.lastname;
    var roles = Object.keys(this.state.rolesOfCompanyEmployees)
      .map((roleKey) => this.state.rolesOfCompanyEmployees[roleKey])
      .filter((role) => role.employeeId === itemKey)
      .map((role) => role.role)
      .join(',');
      
    return (
      <div>
        {employeeName}<br/>
        {roles + ' at ' + this.state.activeRoleCompany.name}
      </div>
    );
  }

  renderManagerPart = () => {
    if(!this.state.activeRole) {return (<div></div>);}
    return (
      <div>
        Manager Part
        {this.renderRequestedRoles()}
        <Tabs default="equipments" tabs={
          {
            employees: {
              name: () => 'Employees',
              content: () => <ExTable key="employees" items={this.state.companyEmployees} renderItem={this.renderCompanyEmployee}></ExTable>
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

  render() {
    return (
      <div>
        Dashboard<br/>
        
        <Link to={`/company/add`}>Add a company</Link>
        <Link to={`/role/add`}>Request a role</Link>
        <Link to={`/equipment/add`}>Add an equipment</Link>

        {this.renderProfile()}
        {this.renderUserRoles()}

        {this.renderRoleDependingPart()}
      </div>
    );
  }
}

export default Dashboard;
