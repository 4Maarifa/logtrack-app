import React, { useState, useEffect } from 'react';

import Map from './../../Utils/Map/Map';
import ExTable from './../../Utils/ExTable/ExTable';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';
import RoleService from './../../../services/entities/role.service';
import EmployeeService from './../../../services/entities/employee.service';

import RoleEmployee from './../../Entities/RoleEmployee/RoleEmployee';

import { v4 as uuid } from 'uuid';

import './Employees.scss';

const Employees = () => {

  const [companyEmployees, setCompanyEmployees] = useState({});
  const [isCompanyEmployeesLoading, setCompanyEmployeesLoading] = useState(true);
  const [rolesOfCompanyEmployees, setRolesOfCompanyEmployees] = useState({});

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeEmployeesRoles = () => {
    if(computed.activeRole) {
      RoleService.getRolesForCompanyId(computed.activeRole.companyId)
        .then(rolesOfCompanyEmployees => {
          setRolesOfCompanyEmployees(rolesOfCompanyEmployees);
  
          let employeesIds = UtilsService.removeDuplicateFromArray(Object.keys(rolesOfCompanyEmployees)
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

  useEffect(() => computeEmployeesRoles(), [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
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
      options={ {showDraft: false} } />
  );

  return (
    <div className="Employees">
      <Map />
      <ExTable key="employees" items={companyEmployees} renderItem={renderRoleEmployee} header={['Name', 'Roles']} loading={isCompanyEmployeesLoading} />
    </div>
  );
};

export default Employees;
