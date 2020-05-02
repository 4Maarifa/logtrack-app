import React, { Fragment, useState, useEffect } from 'react';
import { faPlus, faUserTag, faBuilding, faUserPlus, faTag } from '@fortawesome/pro-solid-svg-icons';

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

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  const computeRoles = () => {
    if(!computed.user) { return; }
    // USER ROLES
    RoleService.getRolesForEmployeeId(computed.user.uid, [ERoleStatus.CONFIRMED, ERoleStatus.DRAFT, ERoleStatus.REVOKED, ERoleStatus.DENIED])
      .then(roles => {
        let userRoles = {}, userRevokedRoles = {}, userDraftRoles = {}, userDeniedRoles = {},
          userRolesCompanyKeys = [], userRevokedRolesCompanyKeys = [], userDraftRolesCompanyKeys = [], userDeniedRolesCompanyKeys = [];

        Object.keys(roles).forEach(roleKey => {
          if(roles[roleKey].status === ERoleStatus.CONFIRMED) {
            userRoles[roleKey] = roles[roleKey];
            userRolesCompanyKeys.push(roles[roleKey].companyId);
          }
          if(roles[roleKey].status === ERoleStatus.DRAFT) {
            userDraftRoles[roleKey] = roles[roleKey];
            userDraftRolesCompanyKeys.push(roles[roleKey].companyId);
          }
          if(roles[roleKey].status === ERoleStatus.REVOKED) {
            userRevokedRoles[roleKey] = roles[roleKey];
            userRevokedRolesCompanyKeys.push(roles[roleKey].companyId);
          }
          if(roles[roleKey].status === ERoleStatus.DENIED) {
            userDeniedRoles[roleKey] = roles[roleKey];
            userDeniedRolesCompanyKeys.push(roles[roleKey].companyId);
          }
        });

        CompanyService.getAllForIdList(UtilsService.removeDuplicateFromArray(Object.keys(roles).map(roleKey => roles[roleKey].companyId)))
          .then(allCompanies => {
            let userRolesCompanies = {}, userDraftRolesCompanies = {}, userRevokedRolesCompanies = {}, userDeniedRolesCompanies = {};

            userRolesCompanyKeys.forEach(companyKey => userRolesCompanies[companyKey] = allCompanies[companyKey]);
            userRevokedRolesCompanyKeys.forEach(companyKey => userRevokedRolesCompanies[companyKey] = allCompanies[companyKey]);
            userDraftRolesCompanyKeys.forEach(companyKey => userDraftRolesCompanies[companyKey] = allCompanies[companyKey]);
            userDeniedRolesCompanyKeys.forEach(companyKey => userDeniedRolesCompanies[companyKey] = allCompanies[companyKey]);

            setUserDraftRolesCompanies(userDraftRolesCompanies);
            setUserRevokedRolesCompanies(userRevokedRolesCompanies);
            setUserRolesCompanies(userRolesCompanies);
            setUserDeniedRolesCompanies(userDeniedRolesCompanies);

            setUserDraftRoles(userDraftRoles);
            setUserRevokedRoles(userRevokedRoles);
            setUserRoles(userRoles);
            setUserDeniedRoles(userDeniedRoles);
          })
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);

    // REQUESTED ROLES
    if(computed.activeRole && computed.activeRole.role === ERole.MANAGER) {
      RoleService.getRolesForCompanyId(computed.activeRole.companyId, [ERoleStatus.DRAFT])
        .then(requestedRoles => {
          let employeesIds = UtilsService.removeDuplicateFromArray(Object.keys(requestedRoles).map(roleKey => requestedRoles[roleKey].employeeId));

          EmployeeService.getAllForIdList(employeesIds)
            .then(requestedRolesEmployees => {
              setRequestedRoles(requestedRoles);
              setRequestedRolesEmployees(requestedRolesEmployees);
            })
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
  };

  const computeActions = () => {
    const defaultActions = [
      {title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: `/role-add`},
      {title: 'Add a company', icon: <Icon source="fa" icon={faBuilding} />, link: `/company-add`}
    ];

    if(computed.activeRole && computed.activeRole.role === ERole.MANAGER) {
      defaultActions.unshift({
        title: 'Offer a role', 
        icon: <Icon source="fa" icon={faUserPlus} />, 
        link: `/role-offer`
      })
    }
    return defaultActions;
  };

  useEffect(() => {
    if(computed.initialized) {
      computeRoles();
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey);
  }, []);
  
  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderUserRole = (itemKey, itemData) => (
    <RoleCompany key={itemKey} 
      company={ {[itemKey]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(userRoles, predicate => predicate.companyId === itemKey)}
      options={ {showActions: true} } />
  );

  const renderDraftUserRole = (itemKey, itemData) => (
    <RoleCompany key={itemKey} 
      company={ {[itemKey]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(userDraftRoles, predicate => predicate.companyId === itemKey)}
      options={ {showActions: true, showDates: true} } />
  );

  const renderRevokedUserRole = (itemKey, itemData) => (
    <RoleCompany key={itemKey} 
      company={ {[itemKey]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(userRevokedRoles, predicate => predicate.companyId === itemKey)}
      options={ {showActions: true, showDates: true} } />
  );

  const renderRequestedRole = (itemKey, itemData) => (
    <RoleEmployee key={itemKey}
      employee={ {[itemData.employeeId]: requestedRolesEmployees[itemData.employeeId]} }
      roles={ { [itemKey]: itemData } }
      options={ {showDraft: true, showActions: true} } />
  );

  const renderDeniedUserRole = (itemKey, itemData) => (
    <RoleCompany key={itemKey} 
      company={ {[itemKey]: itemData} } 
      roles={UtilsService.filterKeyValueOnPropertyValue(userDeniedRoles, predicate => predicate.companyId === itemKey)}
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
