import React, { useState, useEffect } from 'react';
import { faAward, faClipboardUser, faPortrait, faUserTie } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';
import ErrorService from './../../../services/error.service';
import EmployeeService from './../../../services/entities/employee.service';
import RoleService from './../../../services/entities/role.service';
import CompanyService from './../../../services/entities/company.service';

import Loader from './../../Utils/Loader/Loader';
import Icon from './../../Utils/Icon/Icon';
import ExTable from './../../Utils/ExTable/ExTable';

import Employee, { EmployeeExperience, EmployeeCertificate, EmployeeOtherExperience, employeeCertificatesExTableFSS, employeeExperienceExTableFSS, employeeOtherExperiencesExTableFSS } from './../../Entities/Employee/Employee';

import { ERoleStatus, ERoleDetails } from './../../../classes/Role';

import './EmployeePage.scss';

import { v4 as uuid } from 'uuid';

/**
 * Component: EmployeePage
 * Used to visit employee profile
 */
const EmployeePage = ({ match }) => {
  const EMPLOYEE_ID = match.params.employeeid;

  const [employeeData, setEmployeeData] = useState(null);

  const [roles, setRoles] = useState({});
  const [companies, setCompanies] = useState({});

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    CompanyService.getAllForIdList(UtilsService.removeDuplicateFromArray(Object.keys(roles).map(itemId => roles[itemId].companyId)))
      .then(setCompanies)
      .catch(ErrorService.manageError);
  }, [roles]);

  useEffect(() => {
    if(EMPLOYEE_ID) {
      EmployeeService.get(EMPLOYEE_ID)
        .then(employeeDoc => setEmployeeData(employeeDoc.data()))
        .catch(ErrorService.manageError);
      
      RoleService.getRolesForEmployeeId(EMPLOYEE_ID, [ERoleStatus.CONFIRMED, ERoleStatus.REVOKED])
        .then(setRoles)
        .catch(ErrorService.manageError);
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);

  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  if(!employeeData) {
    return (
      <div className="EmployeePage">
        <Loader />
      </div>
    );
  }

  const EMPLOYEE_EXPERIENCE = {};
  if(roles) {
    Object.keys(roles)
      .filter(roleId => roles[roleId].status === ERoleStatus.CONFIRMED
          || roles[roleId].status === ERoleStatus.REVOKED)
      .forEach(roleId => EMPLOYEE_EXPERIENCE[roleId] = roles[roleId]);
  }

  return (
    <div className="EmployeePage">
      <div className="Element Element--page">
        <Employee employee={{ [EMPLOYEE_ID]: employeeData }} isPage />
      </div>
      {employeeData.search && employeeData.search.looking ?
        <div className="Element Element--row employee-search">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faPortrait} />
            <div className="Element-data">
              <div className="Element-title">
                {employeeData.firstname + ' ' + employeeData.lastname} is looking for a new job
                {employeeData.search.roles && employeeData.search.roles.length ? ' as ' + employeeData.search.roles.map(role => ERoleDetails[role].name).join(' or ') : null}!
              </div>
              <span>
                {employeeData.search.resume ? <span className="sub">{employeeData.search.resume}</span> : null}
              </span>
            </div>
          </div>
        </div>
      : null}
      <div className="employee-content">
        {employeeData.certificates && employeeData.certificates.length ? <div className="certificates">
          <h2 className="profile-title">Certificates</h2>
          <ExTable key="certificates" 
                  items={employeeData.certificates} 
                  fss={employeeCertificatesExTableFSS}
                  renderItem={(_, cert) => <EmployeeCertificate certificate={cert} employeeId={EMPLOYEE_ID} />}
                  header={<span><Icon source="fa" icon={faAward} /> Certificates</span>}
                  isNoFrame />
        </div> : null}
        <div className="roles">
          <h2 className="profile-title">Experience</h2>
          <ExTable key="experience" 
                  items={EMPLOYEE_EXPERIENCE} 
                  fss={employeeExperienceExTableFSS}
                  renderItem={(_, exp) => <EmployeeExperience exp={exp} company={{[exp.companyId]: companies[exp.companyId]}} />} 
                  header={<span><Icon source="fa" icon={faUserTie} /> Experience</span>}
                  isNoFrame />
        </div>
        {employeeData.experience && employeeData.experience.length ? <div className="experience">
          <h2 className="profile-title">Other Experience</h2>
          <ExTable key="otherExperience" 
                    items={employeeData.experience}
                    fss={employeeOtherExperiencesExTableFSS}
                    renderItem={(_, exp) => <EmployeeOtherExperience otherExp={exp} employeeId={EMPLOYEE_ID} />}
                    header={<span><Icon source="fa" icon={faClipboardUser} /> Other Experience</span>}
                    isNoFrame />
        </div> : null}
      </div>
    </div>
  );
};

export default EmployeePage;
