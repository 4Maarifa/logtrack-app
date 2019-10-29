import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Choose from './../../Utils/Choose/Choose';
import Icon from './../../Utils/Icon/Icon';
import FormAutoSuggestInput from './../../Utils/FormElements/FormAutoSuggestInput/FormAutoSuggestInput';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import CompanyService from './../../../services/entities/company.service';
import RoleService from './../../../services/entities/role.service';

import Role from './../../../classes/Role';
import { ERoleStatus, RoleDetails } from './../../../classes/Role';

import Company from './../../Entities/Company/Company';

import './RoleAdd.scss';

class RoleAdd extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = Object.assign({
      roleId: null, 

      roleType: '', 

      possibleCompanies: {}, 
      selectedCompanyId: null,
      selectedCompanyItem: null
    },
    DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: DataService.computed.observeComputedValues(computedValues => this.setState(computedValues))});
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
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
      .then((docRole) => {
        this.setState({roleId: docRole.id});
      })
      .catch(ErrorService.manageError);
  };

  onCompanyAutoCompleteChange = value => {
    if(value.trim().length < 3) {
      this.setState({possibleCompanies: {}, selectedCompanyId: null, selectedCompanyItem: null});
    } 
    else {
      CompanyService.search(value.trim().toLowerCase()).then(querySnapshot => {
        let companies = {};
        querySnapshot.forEach(result => companies[result.id] = {
          content: <Company company={ { [result.id]: result.data() } } />
        });
        this.setState({possibleCompanies: companies, selectedCompanyId: null, selectedCompanyItem: null});
      });
    }
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
        </Fragment>
      }
    }); 
    
    if(!!this.state.roleId) {
      let dashboardUrl = '/dashboard';
      return <Redirect to={dashboardUrl} />;
    } else {
      return (
        <div className="RoleAdd">
          <h1>Request a role</h1>
          <form onSubmit={this.handleSubmit}>
            {/* Company field */}
            <FormAutoSuggestInput
              label={
                <span>
                  <Icon source="fa" icon={faBuilding} />
                  Company
                </span>
              }
              possibleItems={this.state.possibleCompanies}
              onValueChange={this.onCompanyAutoCompleteChange}
              onSelectedItemChange={(selectedCompanyId, _, selectedCompanyItem) => this.setState({selectedCompanyId, selectedCompanyItem})}
              inputAutoComplete="off"
              inputRequired
              instructions={
                <span>Pick a company</span>
              } />

            {/* Role field */}
            <div className="role-selection">
              <span className="fake-label">
                Role to request
              </span>
              <Choose
                items={roleDetails}
                multiple={false} 
                fieldName="roleType"
                onSelectionChange={this.handleSelection} />
            </div>

            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}

export default RoleAdd;
