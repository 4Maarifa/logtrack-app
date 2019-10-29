import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Utils/Icon/Icon';
import Choose from './../../Utils/Choose/Choose';
import FormAutoSuggestInput from './../../Utils/FormElements/FormAutoSuggestInput/FormAutoSuggestInput';

import Contract from './../../../classes/Contract';
import Company from './../../Entities/Company/Company';
import { EContractStatus, EContractType, ContractTypeDetails } from './../../../classes/Contract';

import ChooseLoadType from './../ChooseLoadType/ChooseLoadType';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import CompanyService from './../../../services/entities/company.service';
import ContractService from './../../../services/entities/contract.service';

import './ContractAdd.scss';

class ContractAdd extends ComponentSafeUpdate{
  constructor (props) {
    super(props);
    this.state = Object.assign({
      contractId: null, 

      possibleCompanies: [], 
      selectedCompanyId: null,
      selectedCompanyItem: null,

      contractType: '',

      isExecutor: true, 
    
      forceRedirect: false
    },
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues(computedValues => {
        if(!computedValues.activeRole) {
          ErrorService.warning('Please activate a role to add an equipment!');
          this.setState({forceRedirect: true});
        }
        this.setState(computedValues);
      })
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  handleChange = event => this.setState({[event.target.getAttribute('data-field')]: event.target.value});
  handleSelection = (value, fieldName) => this.setState({[fieldName]: value});

  onCompanyAutoCompleteChange = value => {
    if(value.trim().length < 3) {
      this.setState({possibleCompanies: [], selectedCompanyId: null, selectedCompanyItem: null});
    } 
    else {
      CompanyService.search(value.trim().toLowerCase()).then((querySnapshot) => {
        let companies = {};
        querySnapshot.forEach(result => companies[result.id] = {
          content: <Company company={ { [result.id]: result.data() } } />
        });
        this.setState({possibleCompanies: companies, selectedCompanyId: null, selectedCompanyItem: null});
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    if(!this.state.selectedCompanyId) {
      ErrorService.error('Please pick a company !');
      return;
    }

    if(!this.state.contractType) {
      ErrorService.error('Please pick a contract type !');
      return;
    }

    // TODO

    var companyOrderId = (!!this.state.isExecutor && this.state.selectedCompanyId) || this.state.activeRole.companyId;
    var companyExecId = (!!this.state.isExecutor && this.state.activeRole.companyId) || this.state.selectedCompanyId;
    
    ContractService.create(new Contract([], companyOrderId, companyExecId, this.state.contractType, EContractStatus.DRAFT, DateService.getCurrentIsoDateString()))
      .then((docContract) => {
        this.setState({contractId: docContract.id});
      })
      .catch(ErrorService.manageError);
  };

  /**
   * RENDER
   */
  render() {
    if(!!this.state.forceRedirect) {
      return <Redirect to={`/dashboard`} />;
    }

    let contractDetails = {};
    Object.keys(ContractTypeDetails).forEach(contractTypeKey => {
      contractDetails[contractTypeKey] = {
        content: <Fragment>
          {ContractTypeDetails[contractTypeKey].icon}
          {ContractTypeDetails[contractTypeKey].name}
        </Fragment>
      }
    });

    if(!this.state.employee || !this.state.activeRoleCompany) {
      return (<div></div>);
    } 
    else if(!!this.state.contractId) {
      let dashboardUrl = '/dashboard';
      return <Redirect to={dashboardUrl} />;
    } 
    else {
      return (
        <div className="ContractAdd">
          <h1>Add a contract</h1>
          <form onSubmit={this.handleSubmit}>
            {/* Company */}
            <div className="input-company">
              <span className="fake-label">
                <Icon source="fa" icon={faBuilding} />
                Company
              </span>
              <span>
                {this.state.activeRoleCompany.name}
              </span>
            </div>

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
            <div className="type-selection">
              <span className="fake-label">
                Contract Type
              </span>
              <Choose
                items={contractDetails}
                multiple={false} 
                fieldName="contractType"
                onSelectionChange={this.handleSelection} />
            </div>

            {(this.state.contractType === EContractType.TRANSPORTATION) ? <ChooseLoadType></ChooseLoadType> : ''}

            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}

export default ContractAdd;
