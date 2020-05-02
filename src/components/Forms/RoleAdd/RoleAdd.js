import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faTag, faUser, faInfoCircle } from '@fortawesome/pro-solid-svg-icons';

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

const RoleAdd = ({ match }) => {
  const companyId = match.params.companyid;

  const [roleId, setRoleId] = useState(null);

  const [roleType, setRoleType] = useState('');

  const [currentRoles, setCurrentRoles] = useState([]);
  const [isCurrentRolesLoading, setCurrentRolesLoading] = useState(false);

  const [possibleCompaniesInput, setPossibleCompaniesInput] = useState('');
  const [possibleCompanies, setPossibleCompanies] = useState({});
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedCompanyItem, setSelectedCompanyItem] = useState(null);

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeValues = () => {
    if(companyId) {
      CompanyService.get(companyId)
        .then(companyDoc => {
          setSelectedCompanyId(companyDoc.id);
          setSelectedCompanyItem({
            value: companyDoc.id,
            content: <PageLink noLink type={PageLinkType.COMPANY} entityId={companyDoc.id} entityData={companyDoc.data()} />
          });
        })
        .catch(ErrorService.manageError);
    }
  };

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
    
    const roleStatus = (selectedCompanyItem.creator === computed.user.uid ||
      (selectedCompanyId === computed.activeRole.companyId && computed.activeRole.role === ERole.MANAGER)
      ) ? ERoleStatus.CONFIRMED : ERoleStatus.DRAFT;
    
    RoleService.create(new Role(computed.user.uid, selectedCompanyId, roleStatus, roleType, DateService.getCurrentIsoDateString(), null))
      .then(docRole => setRoleId(docRole.id))
      .catch(ErrorService.manageError);
  };

  const onCompanyAutoCompleteChange = value => {
    setPossibleCompaniesInput(value || '');
    if(value.trim().length < 3) {
      setPossibleCompanies({});
    }
    else {
      CompanyService.search(value.trim().toLowerCase()).then(companies => {
        Object.keys(companies).forEach(companyKey => companies[companyKey] = {
          content: <PageLink noLink type={PageLinkType.COMPANY} entityId={companyKey} entityData={companies[companyKey]} />,
          value: companies[companyKey]
        });
        setPossibleCompanies(companies);
      }).catch(ErrorService.manageError);
    }
  };

  const computeCurrentRoles = () => {
    if(!selectedCompanyId || !computed.initialized) { return; }
    RoleService.getRolesForEmployeeIdAndCompanyId(computed.user.uid, selectedCompanyId, [ERoleStatus.DRAFT, ERoleStatus.CONFIRMED, ERoleStatus.DENIED])
      .then(currentRoles => {
        setCurrentRoles(Object.keys(currentRoles).map(roleKey => currentRoles[roleKey].role));
        setCurrentRolesLoading(false);
      }).catch(ErrorService.manageError);
  };

  useEffect(() => computeCurrentRoles(), [selectedCompanyId]);

  useEffect(() => {
    if (computed.initialized) {
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

  /**
   * RENDER
   */  
  let roleDetails = {};
  Object.keys(ERoleDetails).forEach(roleKey => {
    roleDetails[roleKey] = {
      content: <Fragment>
        <span>
          <Icon source="fa" icon={ERoleDetails[roleKey].icon} />
          {ERoleDetails[roleKey].name}
        </span>
        <span>
          {ERoleDetails[roleKey].description}
        </span>
      </Fragment>,
      disabled: currentRoles.includes(roleKey)
    }
  });

  return (
    <div className="RoleAdd">
      <h1>Request a role</h1>
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
          {selectedCompanyId && !isCurrentRolesLoading ?
            <Fragment>
              {currentRoles.length ? <span className="info">
                <Icon source="fa" icon={faInfoCircle} />
                Some roles are already owned, requested by, or denied for the user.
              </span> : null}
              <Choose
                selection={roleType}
                items={roleDetails}
                multiple={false} 
                fieldName="roleType"
                onSelectionChange={setRoleType}
                isVertical />
            </Fragment> : null
          }
          {selectedCompanyId && isCurrentRolesLoading &&
            <Loader />
          }
          {!selectedCompanyId &&
            <span>Please select a company first!</span>
          }
        </div>

        {/* User */}
        {computed.employee && <div className="input-user">
          <span className="fake-label">
            <Icon source="fa" icon={faUser} />
            User
          </span>
          <PageLink type={PageLinkType.EMPLOYEE} entityId={computed.user.uid} entityData={computed.employee} />
        </div>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default RoleAdd;
