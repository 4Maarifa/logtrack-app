import React, { useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { faAward, faClipboardUser, faTag, faCommentDots, faEdit, faUserTag, faUserPlus } from '@fortawesome/pro-solid-svg-icons';

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
        <div className="certificates">
          <h2 className="profile-title">
            <Icon source="fa" icon={faAward} />
            Certificates
          </h2>
          <div className="certificates-list">
            {employeeData.certificates && employeeData.certificates.map(certificate => 
              <span key={certificate.name} className="certificate">
                {certificate.name}
                <span className="certificate-date">{certificate.date}</span>
              </span>
            )}
          </div>
        </div>
        <div className="roles">
          <h2 className="profile-title">
            <Icon source="fa" icon={faTag} />
            Experience
          </h2>
          <div className="roles-list">
            {Object.keys(roles).filter(roleKey => roles[roleKey].status === ERoleStatus.CONFIRMED).map(roleKey => 
              <span key={roleKey} className="role">
                {RoleDetails[roles[roleKey].role].icon}
                {RoleDetails[roles[roleKey].role].name} @
                {companies[roles[roleKey].companyId] &&
                  <PageLink type={PageLinkType.COMPANY} entityId={roles[roleKey].companyId} entityData={companies[roles[roleKey].companyId]} />
                }
                <span className="role-date">{DateService.getMonthYearString(DateService.getDateFromIsoString(roles[roleKey].creationIsoDate))}</span>
              </span>
            )}
            <span className="role-separator"></span>
            {Object.keys(roles).filter(roleKey => roles[roleKey].status === ERoleStatus.REVOKED).map(roleKey => 
              <span key={roleKey} className="role">
                {RoleDetails[roles[roleKey].role].icon}
                {RoleDetails[roles[roleKey].role].name} @
                {companies[roles[roleKey].companyId] &&
                  <PageLink type={PageLinkType.COMPANY} entityId={roles[roleKey].companyId} entityData={companies[roles[roleKey].companyId]} />
                }
                <span className="role-date">
                  {DateService.getMonthYearString(
                    DateService.getDateFromIsoString(roles[roleKey].creationIsoDate)) + ' - ' + 
                    DateService.getMonthYearString(DateService.getDateFromIsoString(roles[roleKey].revokedIsoDate))}
                </span>
              </span>
            )}
          </div>
        </div>
        <div className="experience">
          <h2 className="profile-title">
            <Icon source="fa" icon={faClipboardUser} />
            Other Experience
          </h2>
          <div className="experience-list">
            {employeeData.experience && employeeData.experience.map(experienceItem => 
              <span key={experienceItem.name} className="experience-item">
                {experienceItem.name} @ {experienceItem.company}
                <span className="experienceItem-date">
                  {experienceItem.start}
                  {!!experienceItem.end && <span> - {experienceItem.end}</span>}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
