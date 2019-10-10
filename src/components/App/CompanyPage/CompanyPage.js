import React from 'react';
import { faUsers, faTruck } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import DataService from './../../../services/data.service';
import CompanyService from './../../../services/entities/company.service';
import ErrorService from './../../../services/error.service';
import RoleService from './../../../services/entities/role.service';
import UtilsService from './../../../services/utils.service';
import EmployeeService from './../../../services/entities/employee.service';
import BrandService from './../../../services/entities/brand.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';
import EquipmentService from './../../../services/entities/equipment.service';

import Loader from './../../Utils/Loader/Loader';
import Tabs from './../../Utils/Tabs/Tabs';
import Icon from './../../Utils/Icon/Icon';
import ExTable from './../../Utils/ExTable/ExTable';

import RoleEmployee from './../../Entities/RoleEmployee/RoleEmployee';
import Equipment from './../../Entities/Equipment/Equipment';

import './CompanyPage.scss';

class CompanyPage extends ComponentSafeUpdate {
  constructor() {
    super();
    this.state = Object.assign({
      companyId: null,
      company: null,

      companyEmployees: {},
      companyEmployeesLoading: true,
      rolesOfCompanyEmployees: null,
    
      equipments: {},
      equipmentsLoading: true,
      equipmentModels: {},
      brands: {}}, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({companyId: this.props.match.params.companyid, observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setStateSafe(computedValues, this.computeValues);
      })
    }, () => {
      this.computeEmployeesRoles();
      this.computeEquipments();
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  }

  computeValues() {
    CompanyService.get(this.props.match.params.companyid)
      .then(companyDoc => this.setStateSafe({company: companyDoc.data()}))
      .catch(ErrorService.manageError);
  }

  /**
   * EMPLOYEES
   */
  computeEmployeesRoles = () => {
    if(!!this.state.companyId) {
      RoleService.getRolesForCompanyId(this.state.companyId)
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

  computeEquipments = () => {
    BrandService.list()
      .then((brands) => this.setStateSafe({brands: brands}))
      .catch(ErrorService.manageError);

    EquipmentModelService.list()
      .then((equipmentModels => this.setState({equipmentModels: equipmentModels})))
      .catch(ErrorService.manageError);

    if(!!this.state.activeRole) {
      EquipmentService.getAllForCompanyId(this.state.activeRole.companyId)
        .then((equipments) => this.setStateSafe({equipments: equipments, equipmentsLoading: false}))
        .catch(ErrorService.manageError);
    }
  }

  renderRoleEmployee = (mode, itemKey, itemData) => {
    var employee = {};
    employee[itemKey] = itemData;

    return <RoleEmployee key={itemKey} 
      employee={employee} 
      roles={UtilsService.filterKeyValueOnPropertyValue(this.state.rolesOfCompanyEmployees, (predicate) => predicate.employeeId === itemKey)}
      options={ {showDraft: false, showActions: false} }
      showDetails={mode === 'active'} />;
  }

  renderEquipment = (mode, itemKey, itemData) => {
    var equipmentModel = {}, brand = {}, equipment = {};
    equipmentModel[itemData.equipmentModelId] = this.state.equipmentModels[itemData.equipmentModelId];
    brand[equipmentModel[itemData.equipmentModelId].brand] = this.state.brands[equipmentModel[itemData.equipmentModelId].brand];
    equipment[itemKey] = itemData;

    return <Equipment key={itemKey}
      equipment={equipment}
      brand={brand}
      equipmentModel={equipmentModel}
      options={ {} }
      showDetails={mode === 'active'} />
  }

  /**
   * RENDER
   */
  render() {
    if (!this.state.company) {
      return (
        <div className="CompanyPage">
          <Loader></Loader>
        </div>
      );
    }
    return (
      <div className="CompanyPage">
        <div className="company-header" style={{
          backgroundColor: (this.state.company.color ? this.state.company.color : '#DDDDDD')
        }}>
          {!!this.state.company.logoURL && 
            <img src={this.state.company.logoURL} alt={this.state.company.name + '\'s logo'} />
          }
          <span>{this.state.company.name}</span>
        </div>
        <Tabs default="employees" tabs={{
          employees: {
            name: () => <span>
              <Icon source="fa" icon={faUsers} />
              Employees
            </span>,
            content: () => <ExTable key="employees" items={this.state.companyEmployees} renderItem={this.renderRoleEmployee} header={['Name', 'Roles']} loading={this.state.companyEmployeesLoading}></ExTable>
          },
          equipments: {
            name: () => <span>
              <Icon source="fa" icon={faTruck} />
              Equipments
            </span>,
            content: () => <ExTable key="equipments" items={this.state.equipments} renderItem={this.renderEquipment} header={['Identification', 'Model']} loading={this.state.equipmentsLoading}></ExTable>
          }
        }}></Tabs>
      </div>
    );
  }
}

export default CompanyPage;
