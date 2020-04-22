import React, { useState, useEffect } from 'react';
import { faUsers, faTruck, faWarehouseAlt } from '@fortawesome/pro-solid-svg-icons';

import DataService from '../../../services/data.service';
import CompanyService from '../../../services/entities/company.service';
import ErrorService from '../../../services/error.service';
import RoleService from '../../../services/entities/role.service';
import UtilsService from '../../../services/utils.service';
import EmployeeService from '../../../services/entities/employee.service';
import BrandService from '../../../services/entities/brand.service';
import EquipmentModelService from '../../../services/entities/equipmentModel.service';
import EquipmentService from '../../../services/entities/equipment.service';
import WarehouseService from '../../../services/entities/warehouse.service';

import Loader from '../../Utils/Loader/Loader';
import Tabs from '../../Utils/Tabs/Tabs';
import Icon from '../../Utils/Icon/Icon';
import ExTable from '../../Utils/ExTable/ExTable';

import RoleEmployee from '../../Entities/RoleEmployee/RoleEmployee';
import Equipment from '../../Entities/Equipment/Equipment';
import Warehouse from '../../Entities/Warehouse/Warehouse';
import Company from '../../Entities/Company/Company';

import { v4 as uuid } from 'uuid';

import './CompanyPage.scss';

/**
 * Component: CompanyPage
 * Use by everyone to see details about a company (warehouses / equipments / employees)
 */
const CompanyPage = ({ match }) => {
  const companyId = match.params.companyid;

  const [company, setCompany] = useState(null);
  
  const [warehouses, setWarehouses] = useState({});
  const [isWarehousesLoading, setWarehousesLoading] = useState(true);

  const [companyEmployees, setCompanyEmployees] = useState({});
  const [isCompanyEmployeesLoading, setCompanyEmployeesLoading] = useState(true);
  const [rolesOfCompanyEmployees, setRolesOfCompanyEmployees] = useState(null);

  const [equipments, setEquipments] = useState({});
  const [isEquipmentsLoading, setEquipmentsLoading] = useState(true);
  const [equipmentModels, setEquipmentModels] = useState({});
  const [brands, setBrands] = useState({});

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeCompany = () => {
    CompanyService.get(companyId)
      .then(companyDoc => setCompany(companyDoc.data()))
      .catch(ErrorService.manageError);
  };

  const computeWarehouses = () => {
    if(companyId) {
      WarehouseService.getAllForCompanyId(companyId)
        .then(warehouses => {
          setWarehouses(warehouses);
          setWarehousesLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  };

  const computeEmployeesRoles = () => {
    if(companyId) {
      RoleService.getRolesForCompanyId(companyId)
        .then(rolesOfCompanyEmployees => {
          setRolesOfCompanyEmployees(rolesOfCompanyEmployees);
  
          const employeesIds = UtilsService.removeDuplicateFromArray(Object.keys(rolesOfCompanyEmployees)
            .map(roleKey => rolesOfCompanyEmployees[roleKey].employeeId));
          
          EmployeeService.getAllForIdList(employeesIds)
            .then(companyEmployees => {
              setCompanyEmployees(companyEmployees);
              setCompanyEmployeesLoading(false);
            })
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
  };

  const computeEquipments = () => {
    BrandService.list()
      .then(setBrands)
      .catch(ErrorService.manageError);

    EquipmentModelService.list()
      .then(setEquipmentModels)
      .catch(ErrorService.manageError);

    if(companyId) {
      EquipmentService.getAllForCompanyId(companyId)
        .then(equipments => {
          setEquipments(equipments);
          setEquipmentsLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  };

  useEffect(() => computeEmployeesRoles(), [company]);

  useEffect(() => computeCompany(), [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    computeWarehouses();
    computeEmployeesRoles();
    computeEquipments();
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);

  if(!computed.initialized) { return null; }


  /**
   * RENDER
   */
  const renderRoleEmployee = (itemKey, itemData) => (
    <RoleEmployee key={itemKey} 
      employee={ {[itemKey]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(rolesOfCompanyEmployees, predicate => predicate.employeeId === itemKey)}
      options={ {showDraft: false, showActions: false} }
      showDetails />
  );

  const renderEquipment = (itemKey, itemData) => {
    const equipmentModel = { [itemData.equipmentModelId]: equipmentModels[itemData.equipmentModelId] }, 
      brand = { [equipmentModel[itemData.equipmentModelId].brand]: brands[equipmentModel[itemData.equipmentModelId].brand] };

    return <Equipment key={itemKey}
      equipment={ {[itemKey]: itemData} }
      brand={brand}
      equipmentModel={equipmentModel}
      options={ {} }
      showDetails />
  };

  const renderWarehouse = (itemKey, itemData) => (
    <Warehouse key={itemKey}
      warehouse={ {[itemKey]: itemData} }
      options={ {} }
      showDetails />
  );

  if(!company) {
    return <div className="CompanyPage">
      <Loader></Loader>
    </div>
  }

  return (
    <div className="CompanyPage">
      <div className="Element Element--page">
        <Company key={companyId} company={ {[companyId]: company} } options={{ }} showDetails isPage />
      </div>
      <Tabs default="warehouses" tabs={{
        warehouses: {
          name: () => <span>
            <Icon source="fa" icon={faWarehouseAlt} />
            Warehouses
            <span className="badge badge-inverse">{Object.keys(warehouses).length}</span>
          </span>,
          content: () => <ExTable key="warehouses" items={warehouses} renderItem={renderWarehouse} header={['Name', '']} loading={isWarehousesLoading} />
        },
        employees: {
          name: () => <span>
            <Icon source="fa" icon={faUsers} />
            Employees
            <span className="badge badge-inverse">{Object.keys(companyEmployees).length}</span>
          </span>,
          content: () => <ExTable key="employees" items={companyEmployees} renderItem={renderRoleEmployee} header={['Name', 'Roles']} loading={isCompanyEmployeesLoading}/>
        },
        equipments: {
          name: () => <span>
            <Icon source="fa" icon={faTruck} />
            Equipments
            <span className="badge badge-inverse">{Object.keys(equipments).length}</span>
          </span>,
          content: () => <ExTable key="equipments" items={equipments} renderItem={renderEquipment} header={['Identification', 'Model']} loading={isEquipmentsLoading}/>
        }
      }} />
    </div>
  );
};

export default CompanyPage;
