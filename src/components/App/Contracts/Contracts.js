import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faPlus, faBagsShopping, faCog, faSignature, faHandshakeAlt } from '@fortawesome/pro-light-svg-icons';
import { faBagsShopping as faBagsShoppingSolid, faCog as faCogSolid, faSignature as faSignatureSolid } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../services/data.service';
import ContractService from './../../../services/entities/contract.service';
import CompanyService from './../../../services/entities/company.service';
import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';

import ActionButton from './../../Utils/ActionButton/ActionButton';
import Icon from './../../Utils/Icon/Icon';
import ExTable from './../../Utils/ExTable/ExTable';
import Tabs from './../../Utils/Tabs/Tabs';
import Switch from './../../Utils/FormElements/Switch/Switch';

import { EContractStatus } from './../../../classes/Contract';

import Contract, { contractsExTableFSS } from './../../Entities/Contract/Contract';

import { v4 as uuid } from 'uuid';

import './Contracts.scss';

/**
 * Component: Contracts
 * Used by managers to list contracts that link to other companies
 */
const Contracts = () => {

  // Related contracts
  const [orderContracts, setOrderContracts] = useState({});
  const [executeContracts, setExecuteContracts] = useState({});
  // Force view refresh when new contract is added or edited
  const [nofifyCount, setNotifyCount] = useState(0);

  // Related companies: All companies the current company has contract with
  const [companies, setCompanies] = useState(null);

  // General loading of all contracts and companies
  const [isContractsLoading, setContractsLoading] = useState(true);

  // Tells if archived contracts should be loaded or not. default is hide
  const [isShowArchived, setShowArchived] = useState(false);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    setOrderContracts({});
    setExecuteContracts({});
    setContractsLoading(true);

    // If no active role, no right to load contracts
    if(!computed.activeRole) { return; }

    // All contract status fetched by default
    let statusArray = [EContractStatus.DRAFT, EContractStatus.EXECUTION, EContractStatus.FINISHED, EContractStatus.PAID];

    // If the user wants to view archived contracts as well, adding here the archived status to the statusArray
    if(isShowArchived) {
      statusArray.push(EContractStatus.ARCHIVED);
    }

    // Load all contracts asynchronously (saving time)
    Promise.all([
      ContractService.getAllForCompanyExecId(computed.activeRole.companyId, statusArray),
      ContractService.getAllForCompanyOrderId(computed.activeRole.companyId, statusArray)
    ]).then(results => {
      // For each contract, saving the other company's id
      let companyIds = [];
      Object.keys(results[0]).forEach(id => companyIds.push(results[0][id].companyExecId, results[0][id].companyOrderId));
      Object.keys(results[1]).forEach(id => companyIds.push(results[1][id].companyExecId, results[1][id].companyOrderId));

      // Then, removing duplicate company ids and load them
      CompanyService.getAllForIdList(UtilsService.removeDuplicateFromArray(companyIds))
        .then(companies => {
          // Sacing all the data
          setCompanies(companies);
          setOrderContracts(results[1]);
          setExecuteContracts(results[0]);

          // triggering the end of the laoding process
          setContractsLoading(false);
        })
        .catch(ErrorService.manageError);
    }).catch(ErrorService.manageError);
  }, [computed.activeRole, isShowArchived, nofifyCount]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }
  if(!computed.activeRole) {
    // If there's no role, redirect to dashboard
    ErrorService.manageError('Activate a role to access contracts!');
    return <Redirect to={`/dashboard`} />;
  }

  /**
   * RENDER
   */
  const renderContract = (itemId, itemData) => {
    return <Contract
      notifyContractChanges={() => setNotifyCount(n => n+1)}
      contract={{[itemId]: itemData}}
      companyExec={{[itemData.companyExecId]: companies[itemData.companyExecId]}}
      companyOrder={{[itemData.companyOrderId]: companies[itemData.companyOrderId]}} />
  };

  return (
    <div className="Contracts">
      <Tabs default="execution" tabs={{

        // Contracts that current company executes
        execution: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faCogSolid : faCog} />
            Execution
          </span>,
          content: () => <ExTable key="EXECUTION"
                                  fss={contractsExTableFSS}
                                  items={executeContracts}
                                  renderItem={renderContract}
                                  header={<span><Icon source="fa" icon={faHandshakeAlt} /> Contracts to execute</span>}
                                  loading={isContractsLoading} />
        },

        // Contracts that current company orders
        order: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faSignatureSolid : faSignature} />
            Orders
          </span>,
          content: () => <ExTable key="ORDER"
                                  fss={contractsExTableFSS}
                                  items={orderContracts}
                                  renderItem={renderContract}
                                  header={<span><Icon source="fa" icon={faHandshakeAlt} /> Ordered contracts</span>}
                                  loading={isContractsLoading} />
        },

        // Marker tab (TODO: Contract market)
        // This will emable companies to make a bid about a contract
        market: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faBagsShoppingSolid : faBagsShopping} />
            Market <span className="badge badge-inverse">soon</span>
          </span>,
          content: () => null,
          disabled: true
        }
      }} />
      <Switch value={isShowArchived} onChange={setShowArchived} label="Show archived contracts" />
      <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
        {title: 'Add a contract', icon: <Icon source="fa" icon={faHandshakeAlt} />, link: `/contract-add`}
      ]} />
    </div>
  );
};

export default Contracts;
