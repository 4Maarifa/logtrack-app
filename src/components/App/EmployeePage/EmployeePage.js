import React from 'react';
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

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Loader from './../../Utils/Loader/Loader';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import { ERoleStatus, RoleDetails, ERole } from './../../../classes/Role';
import Chat, { EChatType } from './../../../classes/Chat';

import './EmployeePage.scss';

const uuidv4 = require('uuid/v4');

/**
 * Component: EmployeePage
 * Used to visit employee profile
 */
class EmployeePage extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      employeeId: props.match.params.employeeid,

      employeeData: null,

      roles: {},
      companies: {},
      rolesLoading: true,

      creationFormChatId: null
    }, 
    DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues(computedValues => {
        this.setState(computedValues, this.computeValues);
      })
    }, () => {
      // Compute all data
      this.computeRoles();
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  computeValues() {
    EmployeeService.get(this.state.employeeId)
      .then(employeeDoc => this.setState({employeeData: employeeDoc.data()}, this.computeRoles))
      .catch(ErrorService.manageError);
  }

  computeRoles = () => {
    RoleService.getRolesForEmployeeId(this.state.employeeId, [ERoleStatus.CONFIRMED, ERoleStatus.REVOKED])
      .then(roles => {
        this.setState({roles});

        var companyIds = UtilsService.removeDuplicateFromArray(Object.keys(roles).map(roleKey => roles[roleKey].companyId));
        CompanyService.getAllForIdList(companyIds)
          .then(companies => this.setState({companies, rolesLoading: false}))
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  };

  createChat = () => {
    let users = [this.state.user.uid, this.state.employeeId];
    const conversationId = uuidv4();

    ChatService.create(new Chat(
      conversationId,
      this.state.user.uid,
      null,
      DateService.getCurrentTimeStampNumber(),
      users,
      EChatType.CHAT_START)
    ).then(() => {
      this.setState({creationFormChatId: conversationId});
    }).catch(ErrorService.manageError);
  };

  /**
   * RENDER
   */
  render() {
    if(!this.state.employeeData) {
      return (
        <div className="EmployeePage">
          <Loader></Loader>
        </div>
      );
    }
    if(!!this.state.creationFormChatId) {
      const chatId = `/chat/${this.state.creationFormChatId}`;
      return <Redirect to={chatId} />;
    }
    return (
      <div className="EmployeePage">
        <div className="employee-header">
          <h1>
            <PageLink type={PageLinkType.EMPLOYEE} entityId={this.state.employeeId} entityData={this.state.employeeData} white />
          </h1>
          {this.state.employeeId === this.state.user.uid &&
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
          {this.state.employeeId !== this.state.user.uid &&
            <div className="actions">
              <button className="action white-button" onClick={this.createChat}>
                <Icon source="fa" icon={faCommentDots} />
                Chat
              </button>
              {!!this.state.activeRole && this.state.activeRole.role === ERole.MANAGER &&
                <NavLink className="action" to={`/role-offer/${this.state.employeeId}`}>
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
              {!!this.state.employeeData.certificates && this.state.employeeData.certificates.map(certificate => 
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
              {Object.keys(this.state.roles).filter(roleKey => this.state.roles[roleKey].status === ERoleStatus.CONFIRMED).map(roleKey => 
                <span key={roleKey} className="role">
                  {RoleDetails[this.state.roles[roleKey].role].icon}
                  {RoleDetails[this.state.roles[roleKey].role].name} @
                  {!!this.state.companies[this.state.roles[roleKey].companyId] &&
                    <PageLink type={PageLinkType.COMPANY} entityId={this.state.roles[roleKey].companyId} entityData={this.state.companies[this.state.roles[roleKey].companyId]} />
                  }
                  <span className="role-date">{DateService.getMonthYearString(DateService.getDateFromIsoString(this.state.roles[roleKey].creationIsoDate))}</span>
                </span>
              )}
              <span className="role-separator"></span>
              {Object.keys(this.state.roles).filter(roleKey => this.state.roles[roleKey].status === ERoleStatus.REVOKED).map(roleKey => 
                <span key={roleKey} className="role">
                  {RoleDetails[this.state.roles[roleKey].role].icon}
                  {RoleDetails[this.state.roles[roleKey].role].name} @
                  {!!this.state.companies[this.state.roles[roleKey].companyId] &&
                    <PageLink type={PageLinkType.COMPANY} entityId={this.state.roles[roleKey].companyId} entityData={this.state.companies[this.state.roles[roleKey].companyId]} />
                  }
                  <span className="role-date">
                    {DateService.getMonthYearString(DateService.getDateFromIsoString(this.state.roles[roleKey].creationIsoDate)) + ' - ' + DateService.getMonthYearString(DateService.getDateFromIsoString(this.state.roles[roleKey].revokedIsoDate))}
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
              {!!this.state.employeeData.experience && this.state.employeeData.experience.map(experienceItem => 
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
  }
}

export default EmployeePage;
