import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.css';

import DataService from '../../../services/data.service';
import ErrorService from '../../../services/error.service';
import Tabs from '../../Utils/Tabs/Tabs';
import ExTable from '../../Utils/ExTable/ExTable';
import ERoleStatus from '../../../classes/enums/ERoleStatus';
import ERole from '../../../classes/enums/ERole';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = Object.assign({
      userRoles: {}, 
      requestedRoles: {},

      equipments: {},
      equipmentModels: {},
      brands: {},
      employeesRoles: {}}, 
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
      .then((querySnapshot) => {
        var employeesRoles = {};
        querySnapshot.forEach((roleDoc) => {
          if (!!employeesRoles[roleDoc.data().employeeId]) {
            employeesRoles[roleDoc.data().employeeId].roles[roleDoc.id] = roleDoc.data();
          }
          else {
            employeesRoles[roleDoc.data().employeeId] = {
              roles: {},
              employee: null
            };
            employeesRoles[roleDoc.data().employeeId].roles[roleDoc.id] = roleDoc.data();

            DataService.employee.get(roleDoc.data().employeeId)
              .then((employeeDoc) => {
                employeesRoles[employeeDoc.id].employee = employeeDoc.data();
                this.setState({employeesRoles: employeesRoles});
              })
              .catch(ErrorService.manageError);
          }
          this.setState({employeesRoles: employeesRoles});
        });
        this.setState({employeesRoles: employeesRoles});
      })
      .catch(ErrorService.manageError);
  }

  /**
   * EQUIPMENTS
   */
  computeEquipments = () => {
    DataService.brand.getAll()
      .then((querySnapshot) => {
        var brands = {};
        querySnapshot.forEach((brandDoc) => {
          brands[brandDoc.id] = brandDoc.data();
        });
        this.setState({brands: brands});
      })
      .catch(ErrorService.manageError);

    DataService.equipmentModel.getAll()
    .then((querySnapshot) => {
      var equipmentModels = {};
      querySnapshot.forEach((equipmentModelDoc) => {
        equipmentModels[equipmentModelDoc.id] = equipmentModelDoc.data();
      });
      this.setState({equipmentModels: equipmentModels});
    })
    .catch(ErrorService.manageError);

    DataService.equipment.getAllForCompanyId(this.state.activeRole.companyId)
      .then((querySnapshot) => {
        var equipments = {};
        querySnapshot.forEach((equipmentDoc) => {
          equipments[equipmentDoc.id] = equipmentDoc.data();
        });
        this.setState({equipments: equipments});
      })
      .catch(ErrorService.manageError);
  }

  /**
   * ROLES
   */
  computeRoles = () => {
    if (!this.state.user) return;
    // USER ROLES
    var userRoles = {};
    DataService.role.getRolesForEmployeeId(this.state.user.uid).then((querySnapshot)=> {
      querySnapshot.forEach((doc) => {
        userRoles[doc.id] = doc.data();
         
        DataService.company.get(doc.data().companyId)
          .then((companyDoc) => {
            userRoles[doc.id].company = companyDoc.data();
            this.setState({userRoles: userRoles});
          })
          .catch(ErrorService.manageError);
      });
      this.setState({userRoles: userRoles});
    })
    .catch(ErrorService.manageError);

    // REQUESTED ROLES
    if (!!this.state.activeRole && this.state.activeRole.role === ERole.MANAGER) {
      var requestedRoles = {};
      DataService.role.getDraftRolesForCompanyId(this.state.activeRole.companyId).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          requestedRoles[doc.id] = doc.data();

          DataService.employee.get(doc.data().employeeId)
            .then((employeeDoc) => {
              requestedRoles[doc.id].employee = employeeDoc.data();
              this.setState({requestedRoles: requestedRoles});
            })
            .catch(ErrorService.manageError);
        });
        this.setState({requestedRoles: requestedRoles});
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
      if (this.state.userRoles[docRoleKey].company != null) {
        userRoles.push(
          <li key={docRoleKey}>
            Role: {this.state.userRoles[docRoleKey].role + ' at '}
            <Link to={`/company/${this.state.userRoles[docRoleKey].companyId}`}>Company: {this.state.userRoles[docRoleKey].company.name}</Link>
            
            <img width="20" height="20" alt={this.state.userRoles[docRoleKey].company.name + '\'s logo'} src={this.state.userRoles[docRoleKey].company.logoURL} /><br/>

            {(this.state.userRoles[docRoleKey].status === ERoleStatus.DRAFT) ? 
            (<span>Draft</span>) : 
              (docRoleKey === this.state.employee.activeRoleId) ? 
              (<span>Active. <button onClick={() => this.unactivateRole()}>Unactivate ?</button></span>) : 
              (<span>Unactive. <button onClick={() => this.activateRole(docRoleKey)}>Activate ?</button></span>)
            }
          </li>
        );
      }
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
      if (this.state.requestedRoles[docRoleKey].employee != null) {
        requestedRoles.push(
          <li key={docRoleKey}>
            Employee id: {this.state.requestedRoles[docRoleKey].employeeId}<br/>
            Role: {this.state.requestedRoles[docRoleKey].role}<br/>Employee: {this.state.requestedRoles[docRoleKey].employee.firstname + ' ' + this.state.requestedRoles[docRoleKey].employee.lastname}<br/>
            <button onClick={() => this.confirmRole(docRoleKey)}>Confirm ?</button>
          </li>
        );
      }
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

  renderEmployeeRole = (mode, itemKey, itemData) => {
    var employeeName = (!!itemData.employee) ? itemData.employee.firstname + ' ' + itemData.employee.lastname : '';
    var roles = (Object.keys(itemData.roles).map((roleKey) => itemData.roles[roleKey].role).join(','));
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
              content: () => <ExTable key="employees" items={this.state.employeesRoles} renderItem={this.renderEmployeeRole}></ExTable>
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
