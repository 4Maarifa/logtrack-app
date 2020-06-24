import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faRectangleWide, faExchange, faUser } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import Choose from './../../Utils/FormElements/Choose/Choose';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import FormDebounceAutoSuggestInput from './../../Utils/FormElements/FormDebounceAutoSuggestInput/FormDebounceAutoSuggestInput';

import Contract from './../../../classes/Contract';
import { EContractStatus, EContractTypeDetails } from './../../../classes/Contract';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import CompanyService from './../../../services/entities/company.service';
import EmployeeService from './../../../services/entities/employee.service';
import ContractService from './../../../services/entities/contract.service';

import { v4 as uuid } from 'uuid';

import './ContractAdd.scss';

const ContractAdd = ({ match }) => {
  const CURRENT_CONTRACT_ID = match.params.contractid;

  const [currentContract, setCurrentContract] = useState(null);

  const [newContractId, setNewContractId] = useState(null);

  const [identification, setIdentification] = useState('');

  const [possibleCompaniesInput, setPossibleCompaniesInput] = useState('');
  const [possibleCompanies, setPossibleCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedCompanyItem, setSelectedCompanyItem] = useState(null);

  const [contractType, setContractType] = useState('');

  const [creatorId, setCreatorId] = useState(null);
  const [creator, setCreator] = useState(null);

  const [isExecutor, setExecutor] = useState(false);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const onCompanyAutoCompleteChange = value => {
    setPossibleCompaniesInput(value);
    if(value.trim().length < 3) {
      setPossibleCompanies({});
    } 
    else {
      CompanyService.search(value.trim().toLowerCase()).then(companies => {
        Object.keys(companies).forEach(companyId => companies[companyId] = {
          content: <PageLink noLink type={PageLinkType.COMPANY} entityId={companyId} entityData={companies[companyId]} />,
          value: companies[companyId]
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

    if(CURRENT_CONTRACT_ID) {
      ContractService.updateField(CURRENT_CONTRACT_ID, {identification})
        .then(() => setNewContractId(CURRENT_CONTRACT_ID))
        .catch(ErrorService.manageError);
    }
    else {
      const COMPANY_ORDER_ID = isExecutor ? selectedCompanyId : computed.activeRole.companyId;
      const COMPANY_EXEC_ID = isExecutor ? computed.activeRole.companyId : selectedCompanyId;
      
      ContractService.create(new Contract(identification, [], COMPANY_ORDER_ID, COMPANY_EXEC_ID, computed.activeRole.companyId, contractType, EContractStatus.DRAFT, computed.user.uid, DateService.getCurrentIsoDateString(), null))
        .then(contractDoc => setNewContractId(contractDoc.id))
        .catch(ErrorService.manageError);
    }
  };

  useEffect(() => {
    if(computed.initialized) {
      if(CURRENT_CONTRACT_ID) {
      ContractService.get(CURRENT_CONTRACT_ID)
        .then(contractDoc => {
          setContractType(contractDoc.data().contractType);
          setIdentification(contractDoc.data().identification);
          setCurrentContract(contractDoc.data());

          const IS_CURRENT_EXECUTOR = contractDoc.data().companyExecId === computed.activeRole.companyId;
          setExecutor(IS_CURRENT_EXECUTOR);
          
          CompanyService.get(IS_CURRENT_EXECUTOR ? contractDoc.data().companyOrderId : contractDoc.data().companyExecId)
            .then(companyDoc => {
              setSelectedCompanyId(companyDoc.id);
              setSelectedCompanyItem({
                content: <PageLink noLink type={PageLinkType.COMPANY} entityId={companyDoc.id} entityData={companyDoc.data()} />,
                value: companyDoc.data()
              });
            })
            .catch(ErrorService.manageError);

          EmployeeService.get(contractDoc.data().creator)
            .then(employeeDoc => {
              setCreatorId(employeeDoc.id);
              setCreator(employeeDoc.data());
            })
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
    else {
      setCreatorId(computed.user.uid);
      setCreator(computed.employee);
    }
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(!computed.activeRole) {
    ErrorService.warning('Please activate a role to add an equipment!');
    return <Redirect to={`/dashboard`} />;
  }

  /**
   * RENDER
   */

  let contractDetails = {};
  Object.keys(EContractTypeDetails).forEach(contractTypeKey => {
    contractDetails[contractTypeKey] = {
      content: ({ isActive }) => <span title={EContractTypeDetails[contractTypeKey].disabled ? 'Not available in your plan' : 'Choose this type'}>
        <Icon source="fa" icon={isActive ? EContractTypeDetails[contractTypeKey].iconSolid : EContractTypeDetails[contractTypeKey].icon} />
        {EContractTypeDetails[contractTypeKey].name}
      </span>,
      disabled: EContractTypeDetails[contractTypeKey].disabled
    }
  });

  if(!computed.employee || !computed.activeRoleCompany) {
    return null;
  }

  if(newContractId) {
    let contractsUrl = '/contracts';
    return <Redirect to={contractsUrl} />;
  }

  return (
    <div className="ContractAdd">
      <h1>{CURRENT_CONTRACT_ID ? 'Edit' : 'Add'} a contract</h1>
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
          <div className="input-container">
            <span className="fake-label">
              <Icon source="fa" icon={faBuilding} />
              Company ordering the contract
            </span>
            <PageLink type={PageLinkType.COMPANY} entityId={computed.activeRole.companyId} entityData={computed.activeRoleCompany} />
          </div>
          {CURRENT_CONTRACT_ID ? null : <div className="company-swap">
            <button onClick={() => setExecutor(!isExecutor)}>
              <Icon source="fa" icon={faExchange} style={{transform: 'rotate(90deg)'}} />
              Swap executing and ordering companies
            </button>
          </div>}
        </Fragment>
        }

        {/* Company field */}
        {CURRENT_CONTRACT_ID && selectedCompanyItem ?
          <div className="input-container">
            <span className="fake-label">
              <Icon source="fa" icon={faBuilding} />
              Company {isExecutor ? 'ordering' : 'executing'} the contract
            </span>
            <PageLink type={PageLinkType.COMPANY} entityId={selectedCompanyId} entityData={selectedCompanyItem.value} />
          </div> : 
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
        }

        {/* Company */}
        {isExecutor && 
        <Fragment>
          {CURRENT_CONTRACT_ID ? null : <div className="company-swap">
            <button onClick={() => setExecutor(!isExecutor)}>
              <Icon source="fa" icon={faExchange} style={{transform: 'rotate(90deg)'}} />
              Swap executing and ordering companies
            </button>
          </div>}
          <div className="input-container">
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
          {CURRENT_CONTRACT_ID && currentContract ? 
            contractDetails[contractType].content
          : <Choose
              selection={contractType}
              items={contractDetails}
              fieldName="contractType"
              onSelectionChange={setContractType} /> }
        </div>

        {/* Creator */}
        <div className="input-container">
          <span className="fake-label">
            <Icon source="fa" icon={faUser} />
            Creator
          </span>
          <PageLink type={PageLinkType.EMPLOYEE} entityId={creatorId} entityData={creator} />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default ContractAdd;
