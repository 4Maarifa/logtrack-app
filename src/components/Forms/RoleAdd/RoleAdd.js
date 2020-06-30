import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faTag, faUser, faInfoCircle } from '@fortawesome/pro-light-svg-icons';

import Choose from './../../Utils/FormElements/Choose/Choose';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import Loader from './../../Utils/Loader/Loader';
import FormDebounceAutoSuggestInput from './../../Utils/FormElements/FormDebounceAutoSuggestInput/FormDebounceAutoSuggestInput';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import CompanyService from './../../../services/entities/company.service';
import RoleService from './../../../services/entities/role.service';

import Role, { ERole } from './../../../classes/Role';
import { ERoleStatus, ERoleDetails } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './RoleAdd.scss';

/**
 * Component: RoleAdd
 * Standalone form to request a new role
 * 
 * If a company id is passed, it is preselected in the form
 */
const RoleAdd = ({ match }) => {
  const COMPANY_ID = match.params.companyid;

  // new role id, set it to redirect the user
  const [roleId, setRoleId] = useState(null);

  // Type of role that is selected
  const [roleType, setRoleType] = useState('');

  // Current roles of the user
  // This permits to avoid a user to request a role he already has
  const [currentRoles, setCurrentRoles] = useState([]);
  const [isCurrentRolesLoading, setCurrentRolesLoading] = useState(false);

  // Company autosuggest input
  const [possibleCompaniesInput, setPossibleCompaniesInput] = useState('');
  const [possibleCompanies, setPossibleCompanies] = useState({});
  // Selected company
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedCompanyItem, setSelectedCompanyItem] = useState(null);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // Form handler
  const handleSubmit = event => {
    event.preventDefault();

    if(!selectedCompanyId) {
      ErrorService.error('Please pick a company !');
      return;
    }

    if(!roleType) {
      ErrorService.error('Please pick a role !');
      return;
    }
    
    // If the user has an active role as manager of the requested company, or is the creator of it, his new role is already confirmed
    // Else, his new role will be a draft. That means the new role will have to be confirmed by a manager of the requested company
    // before being available
    const ROLE_STATUS = (selectedCompanyItem.creator === computed.user.uid ||
      (selectedCompanyId === computed.activeRole.companyId && computed.activeRole.role === ERole.MANAGER)
      ) ? ERoleStatus.CONFIRMED : ERoleStatus.DRAFT;
    
    // Create the new role, then set its id to redirect the user
    RoleService.create(
      new Role(computed.user.uid, selectedCompanyId, ROLE_STATUS, roleType, DateService.getCurrentIsoDateString(), null))
      .then(docRole => setRoleId(docRole.id))
      .catch(ErrorService.manageError);
  };

  // Autosuggest company function
  const onCompanyAutoCompleteChange = value => {

    // save input value
    setPossibleCompaniesInput(value || '');

    if(value.trim().length < 3) {
      // reset autosuggest values
      setPossibleCompanies({});
    }
    else {
      // search for companies
      CompanyService.search(value.trim().toLowerCase()).then(companies => {

        // Convert data to autosuggest compatible values
        Object.keys(companies).forEach(companyId => companies[companyId] = {
          content: <PageLink noLink type={PageLinkType.COMPANY} entityId={companyId} entityData={companies[companyId]} />,
          value: companies[companyId]
        });

        // and set data for autosuggest input to print values
        setPossibleCompanies(companies);
      }).catch(ErrorService.manageError);
    }
  };

  // Get current roles of user on selected company
  // This permits to avoid the user to request a role he already has
  const computeCurrentRoles = () => {
    if(!selectedCompanyId || !computed.initialized) { return; }

    // Get roles for the user and the selected company
    RoleService.getRolesForEmployeeIdAndCompanyId(computed.user.uid, selectedCompanyId, [ERoleStatus.DRAFT, ERoleStatus.CONFIRMED, ERoleStatus.DENIED])
      .then(currentRoles => {

        // set the current roles
        setCurrentRoles(Object.keys(currentRoles).map(roleId => currentRoles[roleId].role));

        // then trigger the end of roles load
        setCurrentRolesLoading(false);
      }).catch(ErrorService.manageError);
  };

  // When the user select a company, compute current roles for the user and this company
  useEffect(() => computeCurrentRoles(), [selectedCompanyId]);

  useEffect(() => {
    if (computed.initialized && COMPANY_ID) {

      // if a company id is passed, load it
      // It will be selected by default in the company input
      CompanyService.get(COMPANY_ID)
        .then(companyDoc => {

          // Set the company as selected for the autosuggest input
          setSelectedCompanyId(companyDoc.id);
          setSelectedCompanyItem({
            value: companyDoc.id,
            content: <PageLink noLink type={PageLinkType.COMPANY} entityId={companyDoc.id} entityData={companyDoc.data()} />
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
    // redirect user once he added the role
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
        <span>
          {ERoleDetails[roleId].description}
        </span>
      </Fragment>,

      // disabling the role when the user has already it
      disabled: currentRoles.includes(roleId)
    }
  });

  return (
    <div className="RoleAdd">
      <h1>Request a role</h1>

      {/* Role add form */}
      <form onSubmit={handleSubmit}>
        {/* Company field */}
        <FormDebounceAutoSuggestInput
          value={possibleCompaniesInput}
          label={
            <span>
              <Icon source="fa" icon={faBuilding} />
              Company
            </span>
          }
          possibleItems={possibleCompanies}
          onValueChange={onCompanyAutoCompleteChange}
          onSelectedItemChange={(selectedCompanyId, _, selectedCompanyItem) => {
            setSelectedCompanyId(selectedCompanyId);
            setSelectedCompanyItem(selectedCompanyItem);
            setCurrentRolesLoading(true);
          }}
          inputAutoComplete="off"
          inputRequired
          selectedItemKey={selectedCompanyId}
          selectedItem={selectedCompanyItem}
          instructions={
            <span>Pick a company</span>
          } />

        {/* Role field */}
        <div className="role-selection">
          <span className="fake-label">
            <Icon source="fa" icon={faTag} />
            Role to request
          </span>

          {selectedCompanyId ? 
            isCurrentRolesLoading ?
              <Loader /> :
              <Fragment>
                {currentRoles.length ? <span className="info">
                  <Icon source="fa" icon={faInfoCircle} />
                  You already own, requested, or was denied for some roles.
                </span> : null}
                <Choose
                  selection={roleType}
                  items={ROLE_DETAILS}
                  multiple={false} 
                  fieldName="roleType"
                  onSelectionChange={setRoleType}
                  isVertical />
              </Fragment>
          : <span>Please select a company first!</span>}
        </div>

        {/* User */}
        {computed.employee && <div className="input-container">
          <span className="fake-label">
            <Icon source="fa" icon={faUser} />
            User
          </span>
          {/* Employee pagelink */}
          <PageLink type={PageLinkType.EMPLOYEE} entityId={computed.user.uid} entityData={computed.employee} />
        </div>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default RoleAdd;
