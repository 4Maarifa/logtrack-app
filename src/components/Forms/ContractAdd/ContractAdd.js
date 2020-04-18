import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faRectangleWide, faExchange } from '@fortawesome/pro-solid-svg-icons';

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

import { v4 as uuid } from 'uuid';

import './ContractAdd.scss';

const ContractAdd = () => {

  const [contractId, setContractId] = useState(null);

  const [identification, setIdentification] = useState('');

  const [possibleCompaniesInput, setPossibleCompaniesInput] = useState('');
  const [possibleCompanies, setPossibleCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedCompanyItem, setSelectedCompanyItem] = useState(null);

  const [contractType, setContractType] = useState('');

  const [isExecutor, setExecutor] = useState(false);

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const onCompanyAutoCompleteChange = value => {
    setPossibleCompaniesInput(value);
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
      });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if(!selectedCompanyId) {
      ErrorService.error('Please pick a company !');
      return;
    }

    if(!contractType) {
      ErrorService.error('Please pick a contract type !');
      return;
    }

    // TODO

    const companyOrderId = (isExecutor && selectedCompanyId) || computed.activeRole.companyId;
    const companyExecId = (isExecutor && computed.activeRole.companyId) || selectedCompanyId;
    
    ContractService.create(new Contract(identification, [], companyOrderId, companyExecId, computed.activeRole.companyId, contractType, EContractStatus.DRAFT, DateService.getCurrentIsoDateString(), null))
      .then(contractDoc => setContractId(contractDoc.id))
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(!computed.activeRole) {
    ErrorService.warning('Please activate a role to add an equipment!');
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

  if(!computed.employee || !computed.activeRoleCompany) {
    return null;
  }

  if(contractId) {
    let contractsUrl = '/contracts';
    return <Redirect to={contractsUrl} />;
  }

  return (
    <div className="ContractAdd">
      <h1>Add a contract</h1>
      <form onSubmit={handleSubmit}>

        <FormInput
          value={identification}
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
          onValueChange={setIdentification} />

        {/* Company */}
        {!isExecutor && 
        <Fragment>
          <div className="input-company">
            <span className="fake-label">
              <Icon source="fa" icon={faBuilding} />
              Company ordering the contract
            </span>
            <PageLink type={PageLinkType.COMPANY} entityId={computed.activeRole.companyId} entityData={computed.activeRoleCompany} />
          </div>
          <div className="company-swap">
            <button onClick={() => setExecutor(!isExecutor)}>
              <Icon source="fa" icon={faExchange} style={{transform: 'rotate(90deg)'}} />
              Swap executing and ordering companies
            </button>
          </div>
        </Fragment>
        }

        {/* Company field */}
        <FormDebounceAutoSuggestInput
          value={possibleCompaniesInput}
          label={
            <span>
              <Icon source="fa" icon={faBuilding} />
              Company {isExecutor ? 'ordering' : 'executing'} the contract
            </span>
          }
          possibleItems={possibleCompanies}
          onValueChange={onCompanyAutoCompleteChange}
          onSelectedItemChange={(selectedCompanyId, _, selectedCompanyItem) => {
            setSelectedCompanyId(selectedCompanyId);
            setSelectedCompanyItem(selectedCompanyItem);
          }}
          inputAutoComplete="off"
          inputRequired
          selectedItemKey={selectedCompanyId}
          selectedItem={selectedCompanyItem}
          instructions={
            <span>Pick a company</span>
          } />

        {/* Company */}
        {isExecutor && 
        <Fragment>
          <div className="company-swap">
            <button onClick={() => setExecutor(!isExecutor)}>
              <Icon source="fa" icon={faExchange} style={{transform: 'rotate(90deg)'}} />
              Swap executing and ordering companies
            </button>
          </div>
          <div className="input-company">
            <span className="fake-label">
              <Icon source="fa" icon={faBuilding} />
              Company executing the contract
            </span>
            <PageLink type={PageLinkType.COMPANY} entityId={computed.activeRole.companyId} entityData={computed.activeRoleCompany} />
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
            onSelectionChange={setContractType} />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default ContractAdd;
