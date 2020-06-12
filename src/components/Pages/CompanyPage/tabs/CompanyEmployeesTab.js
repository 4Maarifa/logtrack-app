import React, { useState, useEffect } from 'react';
import { faUsers } from '@fortawesome/pro-solid-svg-icons';

import ErrorService from './../../../../services/error.service';
import RoleService from './../../../../services/entities/role.service';
import UtilsService from './../../../../services/utils.service';
import EmployeeService from './../../../../services/entities/employee.service';

import Icon from './../../../Utils/Icon/Icon';
import ExTable from './../../../Utils/ExTable/ExTable';

import RoleEmployee from './../../../Entities/RoleEmployee/RoleEmployee';
import { employeesExTableFSS } from './../../../Entities/Employee/Employee';

/**
 * Component: CompanyEmployeesTab
 */
const CompanyEmployeesTab = ({ companyId }) => {

  const [companyEmployees, setCompanyEmployees] = useState({});
  const [isCompanyEmployeesLoading, setCompanyEmployeesLoading] = useState(true);
  const [rolesOfCompanyEmployees, setRolesOfCompanyEmployees] = useState(null);

  useEffect(() => {
    if(companyId) {
      RoleService.getRolesForCompanyId(companyId)
        .then(rolesOfCompanyEmployees => {
          setRolesOfCompanyEmployees(rolesOfCompanyEmployees);
  
          const EMPLOYEE_IDS = UtilsService.removeDuplicateFromArray(Object.keys(rolesOfCompanyEmployees)
            .map(roleKey => rolesOfCompanyEmployees[roleKey].employeeId));
          
          EmployeeService.getAllForIdList(EMPLOYEE_IDS)
            .then(companyEmployees => {
              setCompanyEmployees(companyEmployees);
              setCompanyEmployeesLoading(false);
            })
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
  }, [companyId]);

  /**
   * RENDER
   */
  const renderRoleEmployee = (itemId, itemData) => (
    <RoleEmployee key={itemId} 
      employee={ {[itemId]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(rolesOfCompanyEmployees, predicate => predicate.employeeId === itemId)}
      options={ {showDraft: false, showActions: false} }
      showDetails />
  );

  return <ExTable key="employees"
                  fss={employeesExTableFSS}
                  items={companyEmployees}
                  renderItem={renderRoleEmployee}
                  header={<span><Icon source="fa" icon={faUsers} /> Employees</span>}
                  loading={isCompanyEmployeesLoading}/>;
};

export default CompanyEmployeesTab;
