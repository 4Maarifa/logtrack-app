import React, { useState, useEffect } from 'react';
import { faUsers } from '@fortawesome/pro-solid-svg-icons';

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

const Employees = () => {

  const [companyEmployees, setCompanyEmployees] = useState({});
  const [isCompanyEmployeesLoading, setCompanyEmployeesLoading] = useState(true);
  const [rolesOfCompanyEmployees, setRolesOfCompanyEmployees] = useState({});

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    if(computed.activeRole) {
      RoleService.getRolesForCompanyId(computed.activeRole.companyId)
        .then(rolesOfCompanyEmployees => {
          setRolesOfCompanyEmployees(rolesOfCompanyEmployees);
  
          let employeesIds = UtilsService.removeDuplicateFromArray(
            Object.keys(rolesOfCompanyEmployees)
              .map(roleId => rolesOfCompanyEmployees[roleId].employeeId));
            
          EmployeeService.getAllForIdList(employeesIds)
            .then(companyEmployees => {
              setCompanyEmployees(companyEmployees);
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
