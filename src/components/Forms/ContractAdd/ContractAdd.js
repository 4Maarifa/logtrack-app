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

/**
 * Component: ContractAddForm
 * 
 * Standalone form to add or edit cntracts
 * Pass a contract id via get parameter for edition
 */
const ContractAdd = ({ match }) => {
  const CURRENT_CONTRACT_ID = match.params.contractid;

  // Current contract, populated on load with edition
  const [currentContract, setCurrentContract] = useState(null);

  // Save new contract id here, to redirect user
  const [newContractId, setNewContractId] = useState(null);

  // Form data
  const [identification, setIdentification] = useState('');

  // Form auto complete for companies
  const [possibleCompaniesInput, setPossibleCompaniesInput] = useState('');
  const [possibleCompanies, setPossibleCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedCompanyItem, setSelectedCompanyItem] = useState(null);

  // Contract type selection
  const [contractType, setContractType] = useState('');

  // Creator data
  const [creatorId, setCreatorId] = useState(null);
  const [creator, setCreator] = useState(null);

  // Boolean. If isExecutor, it means that active company will execute the contract
  // Otherwise, it will order the contract for the other company (selectedCompanyId)
  const [isExecutor, setExecutor] = useState(false);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // On company auto complete changes
  const onCompanyAutoCompleteChange = value => {

    // Save value of input
    setPossibleCompaniesInput(value);

    if(value.trim().length < 3) {
      setPossibleCompanies({});
    } 
    else {
      // Search for companies with that name
      CompanyService.search(value.trim().toLowerCase()).then(companies => {

        // Convert them to Choose component compatible data
        Object.keys(companies).forEach(companyId => companies[companyId] = {
          content: <PageLink noLink type={PageLinkType.COMPANY} entityId={companyId} entityData={companies[companyId]} />,
          value: companies[companyId]
        });

        // Save reult
        setPossibleCompanies(companies);
      });
    }
  };

  // Form handler
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

    // TODO: Contract detils: merchandise? goal? date? price?

    // On edition, just update the contract with new identification
    // Because only that field can be edited
    // Then set new contract id to redirect user
    if(CURRENT_CONTRACT_ID) {
      ContractService.updateField(CURRENT_CONTRACT_ID, {identification})
        .then(() => setNewContractId(CURRENT_CONTRACT_ID))
        .catch(ErrorService.manageError);
    }
    else {
      // Otherwise, compute data and create the new contract
      const COMPANY_ORDER_ID = isExecutor ? selectedCompanyId : computed.activeRole.companyId;
      const COMPANY_EXEC_ID = isExecutor ? computed.activeRole.companyId : selectedCompanyId;
      
      // When finished, just set new contract id to redirect user
      ContractService.create(new Contract(
                                  identification,
                                  [],
                                  COMPANY_ORDER_ID,
                                  COMPANY_EXEC_ID,
                                  computed.activeRole.companyId,
                                  contractType,
                                  EContractStatus.DRAFT,
                                  computed.user.uid,
                                  DateService.getCurrentIsoDateString(),
                                  null))
        .then(contractDoc => setNewContractId(contractDoc.id))
        .catch(ErrorService.manageError);
    }
  };

  useEffect(() => {
    if(computed.initialized) {

      // If id was passed => fetch contract details
      if(CURRENT_CONTRACT_ID) {
        // Fetch the existing contract
        ContractService.get(CURRENT_CONTRACT_ID)
          .then(contractDoc => {

            // set form input values
            setContractType(contractDoc.data().contractType);
            setIdentification(contractDoc.data().identification);

            // set the current contract data
            setCurrentContract(contractDoc.data());

            const IS_CURRENT_EXECUTOR = contractDoc.data().companyExecId === computed.activeRole.companyId;
            setExecutor(IS_CURRENT_EXECUTOR);
            
            // Get the other company's details
            CompanyService.get(IS_CURRENT_EXECUTOR ? contractDoc.data().companyOrderId : contractDoc.data().companyExecId)
              .then(companyDoc => {
                setSelectedCompanyId(companyDoc.id);
                setSelectedCompanyItem({
                  content: <PageLink noLink type={PageLinkType.COMPANY} entityId={companyDoc.id} entityData={companyDoc.data()} />,
                  value: companyDoc.data()
                });
              })
              .catch(ErrorService.manageError);

            // get the creator
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
        // otherwise, on add, just set the creator as current user
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

  // Convert contract types to Choose component compatible data
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

  // when finished, redirect user to contract list
  if(newContractId) {
    return <Redirect to={`/contracts`} />;
  }

  return (
    <div className="ContractAdd">
      <h1>{CURRENT_CONTRACT_ID ? 'Edit' : 'Add'} a contract</h1>

      {/* Contract add form */}
      <form onSubmit={handleSubmit}>

        {/* Identification */}
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

        {/* Company (hidden if current company orders the contract) */}
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
        {/* Company (hidden if current company executes the contract) */}
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

        {/* Type field */}
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
          {/* Creator pagelink */}
          <PageLink type={PageLinkType.EMPLOYEE} entityId={creatorId} entityData={creator} />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default ContractAdd;
