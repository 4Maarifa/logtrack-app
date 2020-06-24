import React, { Fragment, useState, useEffect } from 'react';
import { faPlus, faUserTag, faBuilding, faUserPlus, faTag } from '@fortawesome/pro-light-svg-icons';

import ActionButton from './../../Utils/ActionButton/ActionButton';
import ExTable from './../../Utils/ExTable/ExTable';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';
import RoleService from './../../../services/entities/role.service';
import CompanyService from './../../../services/entities/company.service';
import EmployeeService from './../../../services/entities/employee.service';

import RoleCompany, { roleCompanyExTableFSS } from './../../Entities/RoleCompany/RoleCompany';
import RoleEmployee, { roleEmployeeExTableFSS } from './../../Entities/RoleEmployee/RoleEmployee';

import { ERole, ERoleStatus } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './Roles.scss';

const Roles = () => {

  const [userRoles, setUserRoles] = useState({});
  const [userRolesCompanies, setUserRolesCompanies] = useState({});

  const [userRevokedRoles, setUserRevokedRoles] = useState({});
  const [userRevokedRolesCompanies, setUserRevokedRolesCompanies] = useState({});

  const [userDraftRoles, setUserDraftRoles] = useState({});
  const [userDraftRolesCompanies, setUserDraftRolesCompanies] = useState({});

  const [requestedRoles, setRequestedRoles] = useState({});
  const [requestedRolesEmployees, setRequestedRolesEmployees] = useState({});

  const [userDeniedRoles, setUserDeniedRoles] = useState({});
  const [userDeniedRolesCompanies, setUserDeniedRolesCompanies] = useState({});

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeActions = () => {
    const DEFAULT_ACTIONS = [
      {title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: `/role-add`},
      {title: 'Add a company', icon: <Icon source="fa" icon={faBuilding} />, link: `/company-add`}
    ];

    if(computed.activeRole && computed.activeRole.role === ERole.MANAGER) {
      DEFAULT_ACTIONS.unshift({
        title: 'Offer a role', 
        icon: <Icon source="fa" icon={faUserPlus} />, 
        link: `/role-offer`
      })
    }
    return DEFAULT_ACTIONS;
  };

  useEffect(() => {
    if(computed.initialized && computed.user) {
      // USER ROLES
      RoleService.getRolesForEmployeeId(computed.user.uid, [ERoleStatus.CONFIRMED, ERoleStatus.DRAFT, ERoleStatus.REVOKED, ERoleStatus.DENIED])
        .then(roles => {
          const USER_ROLES = {}, USER_REVOKED_ROLES = {}, USER_DRAFT_ROLES = {}, USER_DENIED_ROLES = {};
          const COMPANY_IDS_FOR_USER_ROLES = [], COMPANY_IDS_FOR_USER_REVOKED_ROLES = [], COMPANY_IDS_FOR_USER_DRAFT_ROLES = [], COMPANY_IDS_FOR_USER_DENIED_ROLES = [];

          Object.keys(roles).forEach(roleId => {
            if(roles[roleId].status === ERoleStatus.CONFIRMED) {
              USER_ROLES[roleId] = roles[roleId];
              COMPANY_IDS_FOR_USER_ROLES.push(roles[roleId].companyId);
            }
            if(roles[roleId].status === ERoleStatus.DRAFT) {
              USER_DRAFT_ROLES[roleId] = roles[roleId];
              COMPANY_IDS_FOR_USER_DRAFT_ROLES.push(roles[roleId].companyId);
            }
            if(roles[roleId].status === ERoleStatus.REVOKED) {
              USER_REVOKED_ROLES[roleId] = roles[roleId];
              COMPANY_IDS_FOR_USER_REVOKED_ROLES.push(roles[roleId].companyId);
            }
            if(roles[roleId].status === ERoleStatus.DENIED) {
              USER_DENIED_ROLES[roleId] = roles[roleId];
              COMPANY_IDS_FOR_USER_DENIED_ROLES.push(roles[roleId].companyId);
            }
          });

          CompanyService.getAllForIdList(UtilsService.removeDuplicateFromArray(Object.keys(roles).map(roleId => roles[roleId].companyId)))
            .then(allCompanies => {
              const COMPANIES_FOR_USER_ROLES = {}, COMPANIES_FOR_USER_DRAFT_ROLES = {}, COMPANIES_FOR_USER_REVOKED_ROLES = {}, COMPANIES_FOR_USER_DENIED_ROLES = {};

              COMPANY_IDS_FOR_USER_ROLES.forEach(companyId => COMPANIES_FOR_USER_ROLES[companyId] = allCompanies[companyId]);
              COMPANY_IDS_FOR_USER_REVOKED_ROLES.forEach(companyId => COMPANIES_FOR_USER_REVOKED_ROLES[companyId] = allCompanies[companyId]);
              COMPANY_IDS_FOR_USER_DRAFT_ROLES.forEach(companyId => COMPANIES_FOR_USER_DRAFT_ROLES[companyId] = allCompanies[companyId]);
              COMPANY_IDS_FOR_USER_DENIED_ROLES.forEach(companyId => COMPANIES_FOR_USER_DENIED_ROLES[companyId] = allCompanies[companyId]);

              setUserDraftRolesCompanies(COMPANIES_FOR_USER_DRAFT_ROLES);
              setUserRevokedRolesCompanies(COMPANIES_FOR_USER_REVOKED_ROLES);
              setUserRolesCompanies(COMPANIES_FOR_USER_ROLES);
              setUserDeniedRolesCompanies(COMPANIES_FOR_USER_DENIED_ROLES);

              setUserDraftRoles(USER_DRAFT_ROLES);
              setUserRevokedRoles(USER_REVOKED_ROLES);
              setUserRoles(USER_ROLES);
              setUserDeniedRoles(USER_DENIED_ROLES);
            })
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);

      // REQUESTED ROLES
      if(computed.activeRole && computed.activeRole.role === ERole.MANAGER) {
        RoleService.getRolesForCompanyId(computed.activeRole.companyId, [ERoleStatus.DRAFT])
          .then(requestedRoles => {
            let employeesIds = UtilsService.removeDuplicateFromArray(Object.keys(requestedRoles).map(roleId => requestedRoles[roleId].employeeId));

            EmployeeService.getAllForIdList(employeesIds)
              .then(requestedRolesEmployees => {
                setRequestedRoles(requestedRoles);
                setRequestedRolesEmployees(requestedRolesEmployees);
              })
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
      }
    }
  }, [computed.initialized, computed.user]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);
  
  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderUserRole = (itemId, itemData) => (
    <RoleCompany key={itemId} 
      company={ {[itemId]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(userRoles, predicate => predicate.companyId === itemId)}
      options={ {showActions: true} } />
  );

  const renderDraftUserRole = (itemId, itemData) => (
    <RoleCompany key={itemId} 
      company={ {[itemId]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(userDraftRoles, predicate => predicate.companyId === itemId)}
      options={ {showActions: true, showDates: true} } />
  );

  const renderRevokedUserRole = (itemId, itemData) => (
    <RoleCompany key={itemId} 
      company={ {[itemId]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(userRevokedRoles, predicate => predicate.companyId === itemId)}
      options={ {showActions: true, showDates: true} } />
  );

  const renderRequestedRole = (itemId, itemData) => (
    <RoleEmployee key={itemId}
      employee={ {[itemData.employeeId]: requestedRolesEmployees[itemData.employeeId]} }
      roles={ { [itemId]: itemData } }
      options={ {showDraft: true, showActions: true} } />
  );

  const renderDeniedUserRole = (itemId, itemData) => (
    <RoleCompany key={itemId} 
      company={ {[itemId]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(userDeniedRoles, predicate => predicate.companyId === itemId)}
      options={ {showActions: true, showDates: true} } />
  );

  return (
    <div className="Roles">
      {computed.activeRole && 
        <Fragment>
          <h1>Your Current Role</h1>
          <div className="Element Element--tile">
            <RoleCompany company={ {[computed.activeRole.companyId]: computed.activeRoleCompany} }
              roles={ {[computed.employee.activeRoleId]: computed.activeRole} } />
          </div>
        </Fragment>
      }

      <h1>Your Roles</h1>
      <ExTable items={userRolesCompanies}
                renderItem={renderUserRole}
                fss={roleCompanyExTableFSS}
                header={<span><Icon source="fa" icon={faTag} /> Your Roles</span>}
                isNoFrame />

      {computed.activeRole && computed.activeRole.role === ERole.MANAGER &&
        <Fragment>
          <h1>
            Requests to join <PageLink noPhoto type={PageLinkType.COMPANY} entityId={computed.activeRole.companyId} entityData={computed.activeRoleCompany} />
          </h1>
          <ExTable items={requestedRoles}
                    renderItem={renderRequestedRole}
                    fss={roleEmployeeExTableFSS}
                    header={<span><Icon source="fa" icon={faTag} /> Requests to join</span>}
                    isNoFrame />
        </Fragment>
      }

      <h1>Pending Requests</h1>
      <ExTable items={userDraftRolesCompanies}
                renderItem={renderDraftUserRole}
                fss={roleCompanyExTableFSS}
                header={<span><Icon source="fa" icon={faTag} /> Pending Requests</span>}
                isNoFrame />

      <h1>Revoked Roles</h1>
      <ExTable items={userRevokedRolesCompanies}
                renderItem={renderRevokedUserRole}
                fss={roleCompanyExTableFSS}
                header={<span><Icon source="fa" icon={faTag} /> Revoked Roles</span>}
                isNoFrame />

      <h1>Denied Roles</h1>
      <ExTable items={userDeniedRolesCompanies}
                renderItem={renderDeniedUserRole}
                fss={roleCompanyExTableFSS}
                header={<span><Icon source="fa" icon={faTag} /> Denied Roles</span>}
                isNoFrame />

      <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={computeActions()} />
    </div>
  );
};

export default Roles;
