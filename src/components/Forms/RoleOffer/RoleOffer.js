import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faTag, faUser, faInfoCircle } from '@fortawesome/pro-light-svg-icons';

import Choose from './../../Utils/FormElements/Choose/Choose';
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
import { ERoleStatus, ERoleDetails } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './RoleOffer.scss';

/**
 * Component: RoleOffer
 * Standalone form for managers to offer roles to other users
 * 
 * Pass a user id to preselect a user
 */
const RoleOffer = ({ match }) => {
  const USER_ID = match.params.userid;

  // New role id. Set it to redirect the user once finished
  const [roleId, setRoleId] = useState(null);

  // Type of role that is selected
  const [roleType, setRoleType] = useState('');

  // Current roles of the user
  // This permits to avoid a manager to offer a role a user already has
  const [currentRoles, setCurrentRoles] = useState([]);
  const [isCurrentRolesLoading, setCurrentRolesLoading] = useState(false);

  // User autosuggest input
  const [possibleUsersInput, setPossibleUsersInput] = useState('');
  const [possibleUsers, setPossibleUsers] = useState({});
  // Selected user
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUserItem, setSelectedUserItem] = useState(null);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // Form handler
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

    // Create a confirmed role for selected user, then set new role id to redirect the user
    RoleService.create(
      new Role(selectedUserId, computed.activeRole.companyId, ERoleStatus.CONFIRMED, roleType, DateService.getCurrentIsoDateString(), null))
      .then(docRole => setRoleId(docRole.id))
      .catch(ErrorService.manageError);
  };

  // Autosuggest user function
  const onUserAutoCompleteChange = value => {

    // save input value
    setPossibleUsersInput(value);

    if(value.trim().length < 3) {
      // reset autosuggest values
      setPossibleUsers({});
    } 
    else {
      // search for employees / users
      EmployeeService.search(value)
        .then(newPossibleUsers => {

          // Convert data to autosuggest compatible values
          Object.keys(newPossibleUsers).forEach(employeeId => {
            newPossibleUsers[employeeId] = {
              content: <PageLink noLink type={PageLinkType.EMPLOYEE} entityId={employeeId} entityData={newPossibleUsers[employeeId]} />,
              value: newPossibleUsers[employeeId]
            };
          });

          // and set data for autosuggest input to print values
          setPossibleUsers(newPossibleUsers);
        }).catch(ErrorService.manageError);
    }
  };

  // Get current roles of selected user for current company
  // This permits to avoid to offer a role the user already has
  const computeCurrentRoles = () => {
    if(!selectedUserId) { return; }

    // Get roles for the selected user on the current company
    RoleService.getRolesForEmployeeIdAndCompanyId(selectedUserId, computed.activeRole.companyId, [ERoleStatus.DRAFT, ERoleStatus.CONFIRMED])
      .then(currentRoles => {

        // set current roles
        setCurrentRoles(Object.keys(currentRoles).map(roleId => currentRoles[roleId].role));

        // then trigger end of load of roles
        setCurrentRolesLoading(false);
      }).catch(ErrorService.manageError);
  };

  // Compute roles when selecting a new user
  useEffect(() => computeCurrentRoles(), [selectedUserId]);

  useEffect(() => {
    if(computed.initialized && USER_ID) {

      // if a user id is passed, load it here
      // This user will be selected by default in the user input
      EmployeeService.get(USER_ID)
        .then(employeeDoc => {

          // set the user as selected in the autosuggest input
          setSelectedUserId(employeeDoc.id);
          setSelectedUserItem({
            content: <PageLink noLink type={PageLinkType.EMPLOYEE} entityId={employeeDoc.id} entityData={employeeDoc.data()} />,
            value: employeeDoc.data()
          });
        })
        .catch(ErrorService.manageError);
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(roleId) {
    // redirect the user when the new role is added
    return <Redirect to={`/dashboard`} />;
  }

  if(computed.activeRole.role !== ERole.MANAGER) {
    // If user is not a manager, he can't offer a role => error
    ErrorService.manageError('You can\'t offer a role if you\'re not a manager!');
    return <Redirect to={`/dashboard`} />;
  }

  /**
   * RENDER
   */

  // Convert the roles from ERoleDetails to Choose component compatible data
  const ROLE_DETAILS = {};
  Object.keys(ERoleDetails).forEach(roleId => {
    ROLE_DETAILS[roleId] = {
      content: ({ isActive }) => <Fragment>
        <span>
          <Icon source="fa" icon={isActive ? ERoleDetails[roleId].iconSolid : ERoleDetails[roleId].icon} />
          {ERoleDetails[roleId].name}
        </span>
        <span className="sub">
          {ERoleDetails[roleId].description}
        </span>
      </Fragment>,

      // disabled the role if the selected user already has it
      disabled: currentRoles.includes(roleId)
    }
  });

  return (
    <div className="RoleOffer">
      <h1>Offer a role</h1>

      {/* Role Offer form */}
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

          {selectedUserId ?
            isCurrentRolesLoading ?
              <Loader />:
              <Fragment>
                {currentRoles.length ? <span className="info">
                  <Icon source="fa" icon={faInfoCircle} />
                  Some roles are already owned or requested by the user.
                </span> : null}
                <Choose
                  selection={roleType}
                  items={ROLE_DETAILS}
                  fieldName="roleType"
                  onSelectionChange={setRoleType}
                  isVertical />
              </Fragment>
            : <span>Please select a user first!</span>
          }
        </div>

        {/* Company */}
        {computed.activeRoleCompany && <div className="input-container">
          <span className="fake-label">
            <Icon source="fa" icon={faBuilding} />
            Company
          </span>
          {/* Company pagelink */}
          <PageLink type={PageLinkType.COMPANY} entityId={computed.activeRole.companyId} entityData={computed.activeRoleCompany} />
        </div>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default RoleOffer;
