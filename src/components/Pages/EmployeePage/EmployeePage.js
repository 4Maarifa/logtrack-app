import React, { useState, useEffect } from 'react';
import { faAward, faClipboardUser, faPortrait } from '@fortawesome/pro-solid-svg-icons';

import DataService from '../../../services/data.service';
import DateService from '../../../services/date.service';
import UtilsService from '../../../services/utils.service';
import ErrorService from '../../../services/error.service';
import EmployeeService from '../../../services/entities/employee.service';
import RoleService from '../../../services/entities/role.service';
import CompanyService from '../../../services/entities/company.service';

import Loader from '../../Utils/Loader/Loader';
import Icon from '../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from '../../Utils/PageLink/PageLink';
import ExTable from '../../Utils/ExTable/ExTable';

import Employee from '../../Entities/Employee/Employee';

import { ERoleStatus, RoleDetails } from '../../../classes/Role';

import './EmployeePage.scss';

import { v4 as uuid } from 'uuid';

const renderCertificate = (_, certificate) => (
  <div className="certificate Element-content">
    <div className="Element-base">
      <Icon containerclassname="Element-icon" source="fa" icon={faAward} />
      <div className="Element-data">
        <span className="Element-title">
          {certificate.name}
        </span>
        <span className="sub">{certificate.date}</span>
      </div>
    </div>
  </div>);

const renderOtherExperience = (_, otherExp) => (
  <div className="experience Element-content">
    <div className="Element-base">
      <Icon containerclassname="Element-icon" source="fa" icon={faClipboardUser} />
      <div className="Element-data">
        <span className="Element-title">{otherExp.name} @ {otherExp.company}</span>
        <span className="sub">
          {otherExp.start} - {otherExp.end ? otherExp.end : 'Current'}
        </span>
      </div>
    </div>
  </div>);

/**
 * Component: EmployeePage
 * Used to visit employee profile
 */
const EmployeePage = ({ match }) => {
  const employeeId = match.params.employeeid;

  const [employeeData, setEmployeeData] = useState(null);

  const [roles, setRoles] = useState({});
  const [companies, setCompanies] = useState({});

  const observerKey = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  const computeValues = () => EmployeeService.get(employeeId)
      .then(employeeDoc => setEmployeeData(employeeDoc.data()))
      .catch(ErrorService.manageError);
  
  const computeRoles = () => RoleService.getRolesForEmployeeId(employeeId, [ERoleStatus.CONFIRMED, ERoleStatus.REVOKED])
      .then(setRoles)
      .catch(ErrorService.manageError);

  useEffect(() => {
    let companyIds = UtilsService.removeDuplicateFromArray(Object.keys(roles).map(roleKey => roles[roleKey].companyId));
    CompanyService.getAllForIdList(companyIds)
      .then(setCompanies)
      .catch(ErrorService.manageError);
  }, [roles]);

  useEffect(() => computeRoles, [employeeData]);

  useEffect(() => {
    computeValues();
    computeRoles();
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
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

  const employeeExperience = {};
  if(roles) {
    Object.keys(roles)
      .filter(roleKey => roles[roleKey].status === ERoleStatus.CONFIRMED
          || roles[roleKey].status === ERoleStatus.REVOKED)
      .forEach(roleKey => employeeExperience[roleKey] = roles[roleKey]);
  }

  const renderExperience = (_, exp) => (
    <div className="experience Element-content">
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={RoleDetails[exp.role].icon} />
        <div className="Element-data">
          <span className="Element-title">
            {RoleDetails[exp.role].name} @
            {companies[exp.companyId] &&
              <PageLink type={PageLinkType.COMPANY} entityId={exp.companyId} entityData={companies[exp.companyId]} />
            }
          </span>
          <span className="sub">
            {DateService.getMonthYearString(
              DateService.getDateFromIsoString(exp.creationIsoDate)) + ' - ' + 
              (exp.status === 'CONFIRMED' ? 'Current' : DateService.getMonthYearString(DateService.getDateFromIsoString(exp.revokedIsoDate)))}
          </span>
        </div>
      </div>
    </div>);

  return (
    <div className="EmployeePage">
      <div className="Element Element--page">
        <Employee employee={{ [employeeId]: employeeData }} isPage />
      </div>
      {employeeData.search && employeeData.search.looking ?
        <div className="Element Element--row employee-search">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faPortrait} />
            <div className="Element-data">
              <div className="Element-title">
                {employeeData.firstname + ' ' + employeeData.lastname} is looking for a new job
                {employeeData.search.roles && employeeData.search.roles.length ? ' as ' + employeeData.search.roles.map(role => RoleDetails[role].name).join(' or ') : null}!
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
              renderItem={renderCertificate} 
              header={['Name', '']}
              isNoFrame />
        </div> : null}
        <div className="roles">
          <h2 className="profile-title">Experience</h2>
          <ExTable key="experience" 
              items={employeeExperience} 
              renderItem={renderExperience} 
              header={['Name', 'Company']}
              isNoFrame />
        </div>
        {employeeData.experience && employeeData.experience.length ? <div className="experience">
          <h2 className="profile-title">Other Experience</h2>
          <ExTable key="otherExperience" 
              items={employeeData.experience} 
              renderItem={renderOtherExperience} 
              header={['Name', 'Company']}
              isNoFrame />
        </div> : null}
      </div>
    </div>
  );
};

export default EmployeePage;
