import React, { useState, useEffect } from 'react';
import { faUsers } from '@fortawesome/pro-light-svg-icons';

import Map from './../../Utils/Map/Map';
import ExTable from './../../Utils/ExTable/ExTable';
import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';
import RoleService from './../../../services/entities/role.service';
import EmployeeService from './../../../services/entities/employee.service';

import RoleEmployee from './../../Entities/RoleEmployee/RoleEmployee';
import { employeesExTableFSS } from './../../Entities/Employee/Employee';

import { v4 as uuid } from 'uuid';

import './Employees.scss';

/**
 * Component: Employees
 * Used by managers to view and manage employee roles and rights
 */
const Employees = () => {

  // Company Employees, with their respective roles
  const [companyEmployees, setCompanyEmployees] = useState({});
  const [isCompanyEmployeesLoading, setCompanyEmployeesLoading] = useState(true);
  const [rolesOfCompanyEmployees, setRolesOfCompanyEmployees] = useState({});

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    if(computed.activeRole) {

      // loading all the roles for the company (default loaded roles have the CONFIRMED status only.
      // draft, revoked or denied roles are not laoded here)
      RoleService.getRolesForCompanyId(computed.activeRole.companyId)
        .then(rolesOfCompanyEmployees => {
  
          // For each role, get the employeeId amd remove duplicates
          let employeesIds = UtilsService.removeDuplicateFromArray(
            Object.keys(rolesOfCompanyEmployees).map(roleId => rolesOfCompanyEmployees[roleId].employeeId));
            
          // Then, get all the employees for these roles
          EmployeeService.getAllForIdList(employeesIds)
            .then(companyEmployees => {
              // Setting all the data
              setRolesOfCompanyEmployees(rolesOfCompanyEmployees);
              setCompanyEmployees(companyEmployees);

              // Then trigger end of load
              setCompanyEmployeesLoading(false);
            })
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
  }, [computed.activeRole]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderRoleEmployee = (itemId, itemData) => (
    <RoleEmployee key={itemId} 
      employee={ {[itemId]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(rolesOfCompanyEmployees, predicate => predicate.employeeId === itemId)}
      options={ {showDraft: false} } />
  );

  return (
    <div className="Employees">
      <Map />
      <ExTable key="employees"
                fss={employeesExTableFSS}
                items={companyEmployees}
                renderItem={renderRoleEmployee}
                header={<span><Icon source="fa" icon={faUsers} /> Employees</span>}
                loading={isCompanyEmployeesLoading} />
    </div>
  );
};

export default Employees;
