import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

import DataService from '../../../services/data.service';
import ErrorService from '../../../services/error.service';

import Role from '../../../classes/Role';
import ERoleStatus from '../../../classes/enums/ERoleStatus';
import ERole from '../../../classes/enums/ERole';
import Company from '../../Entities/Company/Company';

import '../../../assets/react-autosuggest.css';
import './RoleAdd.scss';

class RoleAdd extends Component {
  constructor () {
    super();
    this.state = Object.assign({roleId: null, roleType: '', possibleCompanies: [], selectedCompany: null, companyName: ''},
      DataService.computed.getDefaultComputedValues());
  }

  observeComputedValues = (computedValues) => {
    this.setState(computedValues, this.computeRoles);
  }

  componentDidMount = () => {
    DataService.computed.observeComputedValues(this.observeComputedValues);
  }

  handleChange = event => {
    let newState = {};
    newState[event.target.getAttribute('data-field')] = event.target.value;
    this.setState(newState);
  }

  onAutocompleteChange = (_, valueWrapper) => {
    if(typeof(valueWrapper.newValue) === 'string') {
      this.setState({companyName: valueWrapper.newValue, selectedCompany: null});
    } else {
      this.setState({companyName: valueWrapper.newValue.name, selectedCompany: valueWrapper.newValue});
    }
  }

  autoCompleteCompanies = valueWrapper => {
    if (valueWrapper.value.trim().length === 0) {
        this.setState({possibleCompanies: [], selectedCompany: null});
    }
    DataService.company.search(valueWrapper.value.trim().toLowerCase()).then((querySnapshot) => {
        let companies = [];
        querySnapshot.forEach((result) => companies.push(Object.assign(result.data(), {id: result.id})));
        this.setState({possibleCompanies: companies, selectedCompany: null});
    });
  }

  clearAutocomplete = () => this.setState( {possibleCompanies: []} );

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
    DataService.role.create(new Role(this.state.user.uid, this.state.selectedCompany.id, roleStatus, this.state.roleType))
      .then((docRole) => {
        this.setState({roleId: docRole.id});
      })
      .catch(ErrorService.manageError);
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
