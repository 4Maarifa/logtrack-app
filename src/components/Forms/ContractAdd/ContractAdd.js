import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

import './ContractAdd.css';
import '../../../assets/react-autosuggest.css';
import DataService from '../../../services/data.service';
import ErrorService from '../../../services/error.service';
import Contract from '../../../classes/Contract';
import Company from '../../Entities/Company/Company';
import EContractType from '../../../classes/enums/EContractType';
import EContractStatus from '../../../classes/enums/EContractStatus';
import ChooseLoadType from './../ChooseLoadType/ChooseLoadType';

class ContractAdd extends Component {
  constructor () {
    super();
    this.state = Object.assign({
      contractId: null, possibleCompanies: [], isExecutor: true, selectedCompany: null, companyName: '', contractType: ''},
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
      if(!!this.state.isExecutor) {
        return <span>
          <Company company={ { [this.state.activeRole.companyId]: this.state.activeRoleCompany } } />
          (You) will execute the {this.state.contractType} for
          <Company company={ { [this.state.selectedCompany.id]: this.state.selectedCompany } } />
        </span>;
      }

      return <span>
        <Company company={ { [this.state.selectedCompany.id]: this.state.selectedCompany } } />
        (You) will execute the {this.state.contractType} for
        <Company company={ { [this.state.activeRole.companyId]: this.state.activeRoleCompany } } />
      </span>;
    }
    return (<span></span>);
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('ContractAdd : submitting...');

    if(!this.state.selectedCompany) {
      ErrorService.error('Please pick a company !');
      return;
    }

    if(!this.state.contractType) {
      ErrorService.error('Please pick a contract type !');
      return;
    }

    // TODO

    var companyOrderId = (!!this.state.isExecutor && this.state.selectedCompany.id) || this.state.activeRole.companyId;
    var companyExecId = (!!this.state.isExecutor && this.state.activeRole.companyId) || this.state.selectedCompany.id;
    DataService.contract.create(new Contract([], companyOrderId, companyExecId, this.state.contractType, EContractStatus.DRAFT))
      .then((docContract) => {
        this.setState({contractId: docContract.id});
      })
      .catch(ErrorService.manageError);
  }

  render() {
    if (!!this.state.contractId) {
      let dashboardUrl = '/dashboard';
      return <Redirect to={dashboardUrl} />;
    } else {
      return (
        <div>
          Add a contract
          <form onSubmit={this.handleSubmit}>
            {/* Role field */}
            <label>
              Type of contract:
              <select value={this.state.contractType} onChange={this.handleChange} data-field="contractType">
                <option disabled value=""></option>
                <option value={EContractType.MAINTENANCE}>Maintenance</option>
                <option value={EContractType.TRANSPORTATION}>Transportation</option>
              </select>
            </label><br/>

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

            {(this.state.contractType === EContractType.TRANSPORTATION) ? <ChooseLoadType></ChooseLoadType> : ''}

            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}

export default ContractAdd;
