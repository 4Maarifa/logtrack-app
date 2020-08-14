import React, { useState, useEffect } from 'react';
import { faUsers } from '@fortawesome/pro-light-svg-icons';

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
 * Tab of CompanyPage
 * 
 * used to get and show company's employees
 * You have to pass the companyId
 */
const CompanyEmployeesTab = ({ companyId }) => {

  // employees of the company
  const [companyEmployees, setCompanyEmployees] = useState({});
  const [isCompanyEmployeesLoading, setCompanyEmployeesLoading] = useState(true);

  // roles of the company
  const [rolesOfCompanyEmployees, setRolesOfCompanyEmployees] = useState(null);

  useEffect(() => {
    if(companyId) {

      // Get roles linked to the company
      RoleService.getRolesForCompanyId(companyId)
        .then(rolesOfCompanyEmployees => {

          // save the rles
          setRolesOfCompanyEmployees(rolesOfCompanyEmployees);
  
          // parse the employee ids from the roles, removing the duplicates
          const EMPLOYEE_IDS = UtilsService.removeDuplicateFromArray(Object.keys(rolesOfCompanyEmployees)
            .map(roleKey => rolesOfCompanyEmployees[roleKey].employeeId));
          
          // Then, get corresponding employee details
          EmployeeService.getAllForIdList(EMPLOYEE_IDS)
            .then(companyEmployees => {

              // save employees
              setCompanyEmployees(companyEmployees);

              // trigger end of load
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

  // Render an extable for the roles
  return <ExTable key="employees"
                  fss={employeesExTableFSS}
                  items={companyEmployees}
                  renderItem={renderRoleEmployee}
                  header={<span><Icon source="fa" icon={faUsers} /> Employees</span>}
                  loading={isCompanyEmployeesLoading}/>;
};

export default CompanyEmployeesTab;
