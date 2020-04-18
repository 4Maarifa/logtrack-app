import React, { useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { faAward, faClipboardUser, faCommentDots, faEdit, faUserTag, faUserPlus } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import UtilsService from './../../../services/utils.service';
import ErrorService from './../../../services/error.service';
import EmployeeService from './../../../services/entities/employee.service';
import ChatService from './../../../services/entities/chat.service';
import RoleService from './../../../services/entities/role.service';
import CompanyService from './../../../services/entities/company.service';

import Loader from './../../Utils/Loader/Loader';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ExTable from './../../Utils/ExTable/ExTable';

import { ERoleStatus, RoleDetails, ERole } from './../../../classes/Role';
import Chat, { EChatType } from './../../../classes/Chat';

import './EmployeePage.scss';

import { v4 as uuid } from 'uuid';

/**
 * Component: EmployeePage
 * Used to visit employee profile
 */
const EmployeePage = ({ match }) => {
  const employeeId = match.params.employeeid;

  const [employeeData, setEmployeeData] = useState(null);

  const [roles, setRoles] = useState({});
  const [companies, setCompanies] = useState({});

  const [creationFormChatId, setCreationFormChatId] = useState(null);

  const observerKey = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  const computeValues = () => {
    EmployeeService.get(employeeId)
      .then(employeeDoc => setEmployeeData(employeeDoc.data()))
      .catch(ErrorService.manageError);
  };
  
  const computeRoles = () => {
    RoleService.getRolesForEmployeeId(employeeId, [ERoleStatus.CONFIRMED, ERoleStatus.REVOKED])
      .then(setRoles)
      .catch(ErrorService.manageError);
  };

  const createChat = () => {
    let users = [computed.user.uid, employeeId];
    const conversationId = uuid();

    ChatService.create(new Chat(
      conversationId,
      computed.user.uid,
      null,
      DateService.getCurrentTimeStampNumber(),
      users,
      EChatType.CHAT_START)
    ).then(() => setCreationFormChatId(conversationId))
    .catch(ErrorService.manageError);
  };

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
        <Loader></Loader>
      </div>
    );
  }

  if(creationFormChatId) {
    const chatId = `/chat/${creationFormChatId}`;
    return <Redirect to={chatId} />;
  }

  const employeeCertificates = {};
  employeeData.certificates.forEach(c => employeeCertificates[c.name] = c);

  const renderCertificate = (_, certificate) => (
    <div className="certificate Element-content">
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faAward} />
        <div className="Element-data">
          <span className="Element-title">
            {certificate.name}
          </span>
          <span className="Element-sub">{certificate.date}</span>
        </div>
      </div>
    </div>);

  const employeeExperience = {};
  Object.keys(roles)
    .filter(roleKey => roles[roleKey].status === ERoleStatus.CONFIRMED
        || roles[roleKey].status === ERoleStatus.REVOKED)
    .forEach(roleKey => employeeExperience[roleKey] = roles[roleKey]);

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
          <span className="Element-sub">
            {DateService.getMonthYearString(
              DateService.getDateFromIsoString(exp.creationIsoDate)) + ' - ' + 
              (exp.status === 'CONFIRMED' ? 'Current' : DateService.getMonthYearString(DateService.getDateFromIsoString(exp.revokedIsoDate)))}
          </span>
        </div>
      </div>
    </div>
  );

  const employeeOtherExperience = {};
  employeeData.experience.forEach(e => employeeOtherExperience[e.name] = e);

  const renderOtherExperience = (_, otherExp) => (
    <div className="experience Element-content">
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faClipboardUser} />
        <div className="Element-data">
          <span className="Element-title">{otherExp.name} @ {otherExp.company}</span>
          <span className="Element-sub">
            {otherExp.start} - {otherExp.end ? otherExp.end : 'Current'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="EmployeePage">
      <div className="employee-header">
        <h1>
          <PageLink type={PageLinkType.EMPLOYEE} entityId={employeeId} entityData={employeeData} white />
        </h1>
        {employeeId === computed.user.uid &&
          <div className="actions">
            <NavLink className="action" to={`/profile`}>
              <Icon source="fa" icon={faEdit} />
              Edit your profile
            </NavLink>
            <NavLink className="action" to={`/role-add`}>
              <Icon source="fa" icon={faUserTag} />
              Request a role
            </NavLink>
          </div>
        }
        {employeeId !== computed.user.uid &&
          <div className="actions">
            <button className="action white-button" onClick={createChat}>
              <Icon source="fa" icon={faCommentDots} />
              Chat
            </button>
            {computed.activeRole && computed.activeRole.role === ERole.MANAGER &&
              <NavLink className="action" to={`/role-offer/${employeeId}`}>
                <Icon source="fa" icon={faUserPlus} />
                Offer a role
              </NavLink>
            }
          </div>
        }
      </div>
      <div className="employee-content">
        {employeeData.certificates && <div className="certificates">
          <h2 className="profile-title">Certificates</h2>
          <ExTable key="certificates" 
              items={employeeCertificates} 
              renderItem={renderCertificate} 
              header={['Name', '']}
              isNoFrame />
        </div>}
        <div className="roles">
          <h2 className="profile-title">Experience</h2>
          <ExTable key="experience" 
              items={employeeExperience} 
              renderItem={renderExperience} 
              header={['Name', 'Company']}
              isNoFrame />
        </div>
        {employeeData.experience && <div className="experience">
          <h2 className="profile-title">Other Experience</h2>
          <ExTable key="otherExperience" 
              items={employeeOtherExperience} 
              renderItem={renderOtherExperience} 
              header={['Name', 'Company']}
              isNoFrame />
        </div>}
      </div>
    </div>
  );
};

export default EmployeePage;
