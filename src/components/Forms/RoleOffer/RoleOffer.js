import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faTag, faUser, faInfoCircle } from '@fortawesome/pro-solid-svg-icons';

import Choose from './../../Utils/Choose/Choose';
import Icon from './../../Utils/Icon/Icon';
import Loader from './../../Utils/Loader/Loader';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import FormDebounceAutoSuggestInput from './../../Utils/FormElements/FormDebounceAutoSuggestInput/FormDebounceAutoSuggestInput';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import EmployeeService from './../../../services/entities/employee.service';
import RoleService from './../../../services/entities/role.service';

import Role, { ERole } from './../../../classes/Role';
import { ERoleStatus, RoleDetails } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './RoleOffer.scss';

const RoleOffer = ({ match }) => {
  const userId = match.params.userid;

  const [roleId, setRoleId] = useState(null);

  const [roleType, setRoleType] = useState('');

  const [currentRoles, setCurrentRoles] = useState([]);
  const [isCurrentRolesLoading, setCurrentRolesLoading] = useState(false);

  const [possibleUsersInput, setPossibleUsersInput] = useState('');
  const [possibleUsers, setPossibleUsers] = useState({});
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUserItem, setSelectedUserItem] = useState(null);

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeValues = () => {
    if(userId) {
      EmployeeService.get(userId)
        .then(employeeDoc => {
          setSelectedUserId(employeeDoc.id);
          setSelectedUserItem({
            content: <PageLink noLink type={PageLinkType.EMPLOYEE} entityId={employeeDoc.id} entityData={employeeDoc.data()} />,
            value: employeeDoc.data()
          });
        })
        .catch(ErrorService.manageError);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if(!selectedUserId) {
      ErrorService.error('Please pick a user !');
      return;
    }

    if(!roleType) {
      ErrorService.error('Please pick a role !');
      return;
    }

    RoleService.create(new Role(selectedUserId, computed.activeRole.companyId, ERoleStatus.CONFIRMED, roleType, DateService.getCurrentIsoDateString(), null))
      .then(docRole => setRoleId(docRole.id))
      .catch(ErrorService.manageError);
  };

  const onUserAutoCompleteChange = value => {
    setPossibleUsersInput(value);

    if(value.trim().length < 3) {
      setPossibleUsers({});
    } 
    else {
      EmployeeService.search(value)
        .then(newPossibleUsers => {
          Object.keys(newPossibleUsers).forEach(employeeKey => {
            newPossibleUsers[employeeKey] = {
              content: <PageLink noLink type={PageLinkType.EMPLOYEE} entityId={employeeKey} entityData={newPossibleUsers[employeeKey]} />,
              value: newPossibleUsers[employeeKey]
            };
          });
          setPossibleUsers(newPossibleUsers);
        }).catch(ErrorService.manageError);
    }
  };

  const computeCurrentRoles = () => {
    if(!selectedUserId) { return; }
    RoleService.getRolesForEmployeeIdAndCompanyId(selectedUserId, computed.activeRole.companyId, [ERoleStatus.DRAFT, ERoleStatus.CONFIRMED])
      .then(currentRoles => {
        setCurrentRoles(Object.keys(currentRoles).map(roleKey => currentRoles[roleKey].role));
        setCurrentRolesLoading(false);
      }).catch(ErrorService.manageError);
  };

  useEffect(() => computeCurrentRoles(), [selectedUserId]);

  useEffect(() => {
    if(computed.initialized) {
      computeValues();
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(roleId) {
    let dashboardUrl = '/dashboard';
    return <Redirect to={dashboardUrl} />;
  }

  if(computed.activeRole.role !== ERole.MANAGER) {
    ErrorService.manageError('You can\'t offer a role if you\'re not a manager!');
    let dashboardUrl = '/dashboard';
    return <Redirect to={dashboardUrl} />;
  }

  /**
   * RENDER
   */
  let roleDetails = {};
  Object.keys(RoleDetails).forEach(roleKey => {
    roleDetails[roleKey] = {
      content: <Fragment>
        <Icon source="fa" icon={RoleDetails[roleKey].icon} />
        {RoleDetails[roleKey].name}
      </Fragment>,
      disabled: currentRoles.includes(roleKey)
    }
  });

  return (
    <div className="RoleOffer">
      <h1>Offer a role</h1>
      <form onSubmit={handleSubmit}>
        {/* User field */}
        <FormDebounceAutoSuggestInput
          value={possibleUsersInput}
          label={
            <span>
              <Icon source="fa" icon={faUser} />
              User
            </span>
          }
          possibleItems={possibleUsers}
          onValueChange={onUserAutoCompleteChange}
          onSelectedItemChange={(selectedUserId, _, selectedUserItem) => {
            setSelectedUserId(selectedUserId);
            setSelectedUserItem(selectedUserItem);
            setCurrentRolesLoading(true);
          }}
          inputAutoComplete="off"
          inputRequired
          selectedItemKey={selectedUserId}
          selectedItem={selectedUserItem}
          instructions={
            <span>Pick a user</span>
          } />

        {/* Role field */}
        <div className="role-selection">
          <span className="fake-label">
            <Icon source="fa" icon={faTag} />
            Role to request
          </span>
          {selectedUserId && !isCurrentRolesLoading &&
            <Fragment>
              {currentRoles.length ? <span className="info">
                <Icon source="fa" icon={faInfoCircle} />
                Some roles are already owned or requested by the user.
              </span> : null}
              <Choose
                items={roleDetails}
                multiple={false} 
                fieldName="roleType"
                onSelectionChange={setRoleType} />
            </Fragment>
          }
          {selectedUserId && isCurrentRolesLoading &&
            <Loader></Loader>
          }
          {!selectedUserId &&
            <span>Please select a user first!</span>
          }
        </div>

        {/* Company */}
        {computed.activeRoleCompany && <div className="input-company">
          <span className="fake-label">
            <Icon source="fa" icon={faBuilding} />
            Company
          </span>
          <PageLink type={PageLinkType.COMPANY} entityId={computed.activeRole.companyId} entityData={computed.activeRoleCompany} />
        </div>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default RoleOffer;
