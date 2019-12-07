import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faTag, faUser, faInfoCircle } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Choose from './../../Utils/Choose/Choose';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import Loader from './../../Utils/Loader/Loader';
import FormDebounceAutoSuggestInput from './../../Utils/FormElements/FormDebounceAutoSuggestInput/FormDebounceAutoSuggestInput';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import CompanyService from './../../../services/entities/company.service';
import RoleService from './../../../services/entities/role.service';

import Role from './../../../classes/Role';
import { ERoleStatus, RoleDetails } from './../../../classes/Role';

import './RoleAdd.scss';

class RoleAdd extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = Object.assign({
      roleId: null, 

      roleType: '',

      currentRoles: [],
      currentRolesLoading: false,

      possibleCompanies: {}, 
      selectedCompanyId: null,
      selectedCompanyItem: null
    },
    DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: DataService.computed.observeComputedValues(computedValues => this.setState(computedValues, this.computeValues))});
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  computeValues = () => {
    if(this.props.match.params.companyid) {
      CompanyService.get(this.props.match.params.companyid)
        .then(companyDoc => this.setState({
          selectedCompanyId: companyDoc.id, 
          selectedCompanyItem: {content: <PageLink noLink type={PageLinkType.COMPANY} entityId={companyDoc.id} entityData={companyDoc.data()} />}
        }, this.computeCurrentRoles))
        .catch(ErrorService.manageError);
    }
    this.computeCurrentRoles();
  };

  handleSelection = (value, fieldName) => this.setState({[fieldName]: value});

  handleSubmit = event => {
    event.preventDefault();

    if(!this.state.selectedCompanyId) {
      ErrorService.error('Please pick a company !');
      return;
    }

    if(!this.state.roleType) {
      ErrorService.error('Please pick a role !');
      return;
    }
    
    const roleStatus = (this.state.selectedCompanyItem.creator === this.state.user.uid) ? ERoleStatus.CONFIRMED : ERoleStatus.DRAFT;
    
    RoleService.create(new Role(this.state.user.uid, this.state.selectedCompanyId, roleStatus, this.state.roleType, DateService.getCurrentIsoDateString(), null))
      .then(docRole => this.setState({roleId: docRole.id}))
      .catch(ErrorService.manageError);
  };

  onCompanyAutoCompleteChange = value => {
    if(value.trim().length < 3) {
      this.setState({possibleCompanies: {}, selectedCompanyId: null, selectedCompanyItem: null});
    }
    else {
      CompanyService.search(value.trim().toLowerCase()).then(companies => {
        Object.keys(companies).forEach(companyKey => companies[companyKey] = {
          content: <PageLink noLink type={PageLinkType.COMPANY} entityId={companyKey} entityData={companies[companyKey]} />
        });
        this.setState({possibleCompanies: companies, selectedCompanyId: null, selectedCompanyItem: null});
      });
    }
  };

  computeCurrentRoles = () => {
    if(!this.state.user || !this.state.selectedCompanyId) { return; }
    RoleService.getRolesForEmployeeIdAndCompanyId(this.state.user.uid, this.state.selectedCompanyId, [ERoleStatus.DRAFT, ERoleStatus.CONFIRMED])
      .then(currentRoles => this.setState({
        currentRoles: Object.keys(currentRoles).map(roleKey => currentRoles[roleKey].role), 
        currentRolesLoading: false}))
      .catch(ErrorService.manageError);
  };

  /**
   * RENDER
   */
  render() {
    let roleDetails = {};
    Object.keys(RoleDetails).forEach(roleKey => {
      roleDetails[roleKey] = {
        content: <Fragment>
          {RoleDetails[roleKey].icon}
          {RoleDetails[roleKey].name}
        </Fragment>,
        disabled: this.state.currentRoles.includes(roleKey)
      }
    });
    
    if(!!this.state.roleId) {
      let dashboardUrl = '/dashboard';
      return <Redirect to={dashboardUrl} />;
    }
    else {
      return (
        <div className="RoleAdd">
          <h1>Request a role</h1>
          <form onSubmit={this.handleSubmit}>
            {/* Company field */}
            <FormDebounceAutoSuggestInput
              label={
                <span>
                  <Icon source="fa" icon={faBuilding} />
                  Company
                </span>
              }
              possibleItems={this.state.possibleCompanies}
              onValueChange={this.onCompanyAutoCompleteChange}
              onSelectedItemChange={(selectedCompanyId, _, selectedCompanyItem) => this.setState({selectedCompanyId, selectedCompanyItem, currentRolesLoading: true}, this.computeCurrentRoles)}
              inputAutoComplete="off"
              inputRequired
              selectedItemKey={this.state.selectedCompanyId}
              selectedItem={this.state.selectedCompanyItem}
              instructions={
                <span>Pick a company</span>
              } />

            {/* Role field */}
            <div className="role-selection">
              <span className="fake-label">
                <Icon source="fa" icon={faTag} />
                Role to request
              </span>
              {!!this.state.selectedCompanyId && !this.state.currentRolesLoading &&
                <Fragment>
                  {!!this.state.currentRoles.length && <span className="info">
                    <Icon source="fa" icon={faInfoCircle} />
                    Some roles are already owned or requested by the user.
                  </span>}
                  <Choose
                    items={roleDetails}
                    multiple={false} 
                    fieldName="roleType"
                    onSelectionChange={this.handleSelection} />
                </Fragment>
              }
              {!!this.state.selectedCompanyId && !!this.state.currentRolesLoading &&
                <Loader></Loader>
              }
              {!this.state.selectedCompanyId &&
                <span>Please select a company first!</span>
              }
            </div>

            {/* User */}
            {!!this.state.employee && <div className="input-user">
              <span className="fake-label">
                <Icon source="fa" icon={faUser} />
                User
              </span>
              <PageLink type={PageLinkType.EMPLOYEE} entityId={this.state.user.uid} entityData={this.state.employee} />
            </div>}

            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}

export default RoleAdd;
