import React from 'react';
import { Redirect } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import CompanyService from './../../../services/entities/company.service';
import RoleService from './../../../services/entities/role.service';

import Role from './../../../classes/Role';
import ERoleStatus from './../../../classes/enums/ERoleStatus';
import ERole from './../../../classes/enums/ERole';
import Company from './../../Entities/Company/Company';

import './../../../assets/react-autosuggest.css';
import './RoleAdd.scss';

class RoleAdd extends ComponentSafeUpdate {
  constructor () {
    super();
    this.state = Object.assign({roleId: null, roleType: '', possibleCompanies: [], selectedCompany: null, companyName: ''},
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setStateSafe(computedValues);
      })
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
  }

  handleChange = event => {
    let newState = {};
    newState[event.target.getAttribute('data-field')] = event.target.value;
    this.setStateSafe(newState);
  }

  onAutocompleteChange = (_, valueWrapper) => {
    if(typeof(valueWrapper.newValue) === 'string') {
      this.setStateSafe({companyName: valueWrapper.newValue, selectedCompany: null});
    } else {
      this.setStateSafe({companyName: valueWrapper.newValue.name, selectedCompany: valueWrapper.newValue});
    }
  }

  autoCompleteCompanies = valueWrapper => {
    if (valueWrapper.value.trim().length === 0) {
        this.setStateSafe({possibleCompanies: [], selectedCompany: null});
    }
    CompanyService.search(valueWrapper.value.trim().toLowerCase()).then((querySnapshot) => {
        let companies = [];
        querySnapshot.forEach((result) => companies.push(Object.assign(result.data(), {id: result.id})));
        this.setStateSafe({possibleCompanies: companies, selectedCompany: null});
    });
  }

  clearAutocomplete = () => this.setStateSafe( {possibleCompanies: []} );

  handleSubmit = event => {
    event.preventDefault();
    console.log('RoleAdd : submitting...');

    if(!this.state.selectedCompany) {
      ErrorService.error('Please pick a company !');
      return;
    }

    if(!this.state.roleType) {
      ErrorService.error('Please pick a role !');
      return;
    }
    
    const roleStatus = (this.state.selectedCompany.creator === this.state.user.uid) ? ERoleStatus.CONFIRMED : ERoleStatus.DRAFT;
    RoleService.create(new Role(this.state.user.uid, this.state.selectedCompany.id, roleStatus, this.state.roleType))
      .then((docRole) => {
        this.setStateSafe({roleId: docRole.id});
      })
      .catch(ErrorService.manageError);
  }

  /**
   * RENDER
   */
  getCompany = company => company ;
  renderCompany = company => <Company company={ { [company.id]: company } } />;

  printSelectedCompany = () => {
    if (!!this.state.selectedCompany) {
      return (<span>
        Selected company:
        <Company company={ { [this.state.selectedCompany.id]: this.state.selectedCompany } } />
      </span>);
    }
    return (<span></span>);
  }

  render() {
    if (!!this.state.roleId) {
      let dashboardUrl = '/dashboard';
      return <Redirect to={dashboardUrl} />;
    } else {
      return (
        <div>
          Request a role
          <form onSubmit={this.handleSubmit}>
            {/* Company field */}
            <label>
              Name of the company:
              <Autosuggest
                suggestions={this.state.possibleCompanies}
                onSuggestionsFetchRequested={this.autoCompleteCompanies}
                onSuggestionsClearRequested={this.clearAutocomplete}
                getSuggestionValue={this.getCompany}
                renderSuggestion={this.renderCompany}
                inputProps={ {placeholder: 'Name of the company', value: this.state.companyName, onChange: this.onAutocompleteChange} } />
            </label>
            {this.printSelectedCompany()}<br/>

            {/* Role field */}
            <label>
              Role to request:
              <select value={this.state.roleType} onChange={this.handleChange} data-field="roleType">
                <option disabled value=""></option>
                <option value={ERole.MANAGER}>Manager</option>
                <option value={ERole.DRIVER}>Driver</option>
                <option value={ERole.MECHANIC}>Mechanic</option>
              </select>
            </label>

            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}

export default RoleAdd;
