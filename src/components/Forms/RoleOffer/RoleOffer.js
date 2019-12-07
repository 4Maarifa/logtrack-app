import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faTag, faUser, faInfoCircle } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
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

import './RoleOffer.scss';

class RoleOffer extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = Object.assign({
      roleId: null, 

      roleType: '', 

      currentRoles: [],
      currentRolesLoading: false,

      possibleUsers: {}, 
      selectedUserId: null,
      selectedUserItem: null,

      forceRedirect: false
    },
    DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({
      observerKey: DataService.computed.observeComputedValues(computedValues => {
        if(computedValues.activeRole.role !== ERole.MANAGER) {
          this.setState({forceRedirect: true});
        }
        this.setState(computedValues, this.computeValues);
      })
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  computeValues = () => {
    if(this.props.match.params.userid) {
      EmployeeService.get(this.props.match.params.userid)
        .then(employeeDoc => {
          this.setState({
            selectedUserId: employeeDoc.id,
            selectedUserItem: {
              content: <PageLink noLink type={PageLinkType.EMPLOYEE} entityId={employeeDoc.id} entityData={employeeDoc.data()} />,
              value: employeeDoc.data()
            }
          }, this.computeCurrentRoles)
        })
        .catch(ErrorService.manageError);
    }
    this.computeCurrentRoles();
  };

  handleSelection = (value, fieldName) => this.setState({[fieldName]: value});

  handleSubmit = event => {
    event.preventDefault();

    if(!this.state.selectedUserId) {
      ErrorService.error('Please pick a user !');
      return;
    }

    if(!this.state.roleType) {
      ErrorService.error('Please pick a role !');
      return;
    }

    RoleService.create(new Role(this.state.selectedUserId, this.state.activeRole.companyId, ERoleStatus.CONFIRMED, this.state.roleType, DateService.getCurrentIsoDateString(), null))
      .then(docRole => {
        this.setState({roleId: docRole.id});
      })
      .catch(ErrorService.manageError);
  };

  onUserAutoCompleteChange = value => {
    if(value.trim().length < 3) {
      this.setState({possibleUsers: {}, selectedUserId: null, selectedUserItem: null});
    } 
    else {
      EmployeeService.search(value)
        .then(possibleUsers => {
          Object.keys(possibleUsers).forEach(employeeKey => {
            possibleUsers[employeeKey] = {
              content: <PageLink noLink type={PageLinkType.EMPLOYEE} entityId={employeeKey} entityData={possibleUsers[employeeKey]} />,
              value: possibleUsers[employeeKey]
            };
          });
          this.setState({possibleUsers});
        }).catch(ErrorService.manageError);
    }
  };

  computeCurrentRoles = () => {
    console.log(this.state.selectedUserId);
    RoleService.getRolesForEmployeeIdAndCompanyId(this.state.selectedUserId, this.state.activeRole.companyId, [ERoleStatus.DRAFT, ERoleStatus.CONFIRMED])
      .then(currentRoles => {
        this.setState({
          currentRoles: Object.keys(currentRoles).map(roleKey => currentRoles[roleKey].role), 
          currentRolesLoading: false
        });
        console.log(currentRoles);
      }).catch(ErrorService.manageError);
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
    
    if(!!this.state.forceRedirect) {
      ErrorService.manageError('You can\'t offer a role if you\'re not a manager!');
      let dashboardUrl = '/dashboard';
      return <Redirect to={dashboardUrl} />;
    }
    if(!!this.state.roleId) {
      let dashboardUrl = '/dashboard';
      return <Redirect to={dashboardUrl} />;
    }
    return (
      <div className="RoleOffer">
        <h1>Offer a role</h1>
        <form onSubmit={this.handleSubmit}>
          {/* User field */}
          <FormDebounceAutoSuggestInput
            label={
              <span>
                <Icon source="fa" icon={faUser} />
                User
              </span>
            }
            possibleItems={this.state.possibleUsers}
            onValueChange={this.onUserAutoCompleteChange}
            onSelectedItemChange={(selectedUserId, _, selectedUserItem) => {console.log(selectedUserId);this.setState({selectedUserId, selectedUserItem, currentRolesLoading: true}, this.computeCurrentRoles)}}
            inputAutoComplete="off"
            inputRequired
            selectedItemKey={this.state.selectedUserId}
            selectedItem={this.state.selectedUserItem}
            instructions={
              <span>Pick a user</span>
            } />

          {/* Role field */}
          <div className="role-selection">
            <span className="fake-label">
              <Icon source="fa" icon={faTag} />
              Role to request
            </span>
            {!!this.state.selectedUserId && !this.state.currentRolesLoading &&
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
            {!!this.state.selectedUserId && !!this.state.currentRolesLoading &&
              <Loader></Loader>
            }
            {!this.state.selectedUserId &&
              <span>Please select a user first!</span>
            }
          </div>

          {/* Company */}
          {!!this.state.activeRoleCompany && <div className="input-company">
            <span className="fake-label">
              <Icon source="fa" icon={faBuilding} />
              Company
            </span>
            <PageLink type={PageLinkType.COMPANY} entityId={this.state.activeRole.companyId} entityData={this.state.activeRoleCompany} />
          </div>}

          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default RoleOffer;
