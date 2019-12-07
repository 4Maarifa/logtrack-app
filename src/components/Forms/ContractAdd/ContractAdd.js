import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faRectangleWide, faExchange } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Utils/Icon/Icon';
import Choose from './../../Utils/Choose/Choose';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import FormDebounceAutoSuggestInput from './../../Utils/FormElements/FormDebounceAutoSuggestInput/FormDebounceAutoSuggestInput';

import Contract from './../../../classes/Contract';
import { EContractStatus, ContractTypeDetails } from './../../../classes/Contract';

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

      identification: '',

      possibleCompanies: [], 
      selectedCompanyId: null,
      selectedCompanyItem: null,

      contractType: '',

      isExecutor: false, 
    
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

  toggleIsExecutor = () => this.setState({isExecutor: !this.state.isExecutor});

  handleChange = event => this.setState({[event.target.getAttribute('data-field')]: event.target.value});
  handleSelection = (value, fieldName) => this.setState({[fieldName]: value});

  onCompanyAutoCompleteChange = value => {
    if(value.trim().length < 3) {
      this.setState({possibleCompanies: [], selectedCompanyId: null, selectedCompanyItem: null});
    } 
    else {
      CompanyService.search(value.trim().toLowerCase()).then(companies => {
        Object.keys(companies).forEach(companyKey => companies[companyKey] = {
          content: <PageLink noLink type={PageLinkType.COMPANY} entityId={companyKey} entityData={companies[companyKey]} />,
          value: companies[companyKey]
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
    
    ContractService.create(new Contract(this.state.identification, [], companyOrderId, companyExecId, this.state.activeRole.companyId, this.state.contractType, EContractStatus.DRAFT, DateService.getCurrentIsoDateString(), null))
      .then(contractDoc => {
        this.setState({contractId: contractDoc.id});
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
        content: <span title={ContractTypeDetails[contractTypeKey].disabled ? 'Not available in your plan' : 'Choose this type'}>
          {ContractTypeDetails[contractTypeKey].icon}
          {ContractTypeDetails[contractTypeKey].name}
        </span>,
        disabled: ContractTypeDetails[contractTypeKey].disabled
      }
    });

    if(!this.state.employee || !this.state.activeRoleCompany) {
      return (<div></div>);
    } 
    else if(!!this.state.contractId) {
      let contractsUrl = '/contracts';
      return <Redirect to={contractsUrl} />;
    } 
    else {
      return (
        <div className="ContractAdd">
          <h1>Add a contract</h1>
          <form onSubmit={this.handleSubmit}>

            <FormInput
              inputType="text"
              fieldName="identification"
              label={
                <span>
                  <Icon source="fa" icon={faRectangleWide} />
                  Identification
                </span>
              }
              inputRequired
              inputPattern=".{3,}"
              instructions={
                <span>
                  The identification is required<br/>
                  The identification must be 3 characters minimum<br/>
                  It can be the number plate, serial number...
                </span>
              }
              onValueChange={this.handleSelection} />

            {/* Company */}
            {!this.state.isExecutor && 
            <Fragment>
              <div className="input-company">
                <span className="fake-label">
                  <Icon source="fa" icon={faBuilding} />
                  Company ordering the contract
                </span>
                <PageLink type={PageLinkType.COMPANY} entityId={this.state.activeRole.companyId} entityData={this.state.activeRoleCompany} />
              </div>
              <div className="company-swap">
                <button onClick={this.toggleIsExecutor}>
                  <Icon source="fa" icon={faExchange} style={{transform: 'rotate(90deg)'}} />
                  Swap executing and ordering companies
                </button>
              </div>
            </Fragment>
            }

            {/* Company field */}
            <FormDebounceAutoSuggestInput
              label={
                <span>
                  <Icon source="fa" icon={faBuilding} />
                  Company {!!this.state.isExecutor ? 'ordering' : 'executing'} the contract
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

            {/* Company */}
            {!!this.state.isExecutor && 
            <Fragment>
              <div className="company-swap">
                <button onClick={this.toggleIsExecutor}>
                  <Icon source="fa" icon={faExchange} style={{transform: 'rotate(90deg)'}} />
                  Swap executing and ordering companies
                </button>
              </div>
              <div className="input-company">
                <span className="fake-label">
                  <Icon source="fa" icon={faBuilding} />
                  Company executing the contract
                </span>
                <PageLink type={PageLinkType.COMPANY} entityId={this.state.activeRole.companyId} entityData={this.state.activeRoleCompany} />
              </div>
            </Fragment>
            }

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

            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}

export default ContractAdd;
