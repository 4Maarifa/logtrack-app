import React, { useState, useEffect } from 'react';
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

  const [orderContracts, setOrderContracts] = useState({});
  const [executeContracts, setExecuteContracts] = useState({});
  const [nofifyCount, setNotifyCount] = useState(0);

  const [companies, setCompanies] = useState(null);

  const [isContractsLoading, setContractsLoading] = useState(true);

  const [isShowArchived, setShowArchived] = useState(false);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    setOrderContracts({});
    setExecuteContracts({});
    setContractsLoading(true);

    if(!computed.activeRole) { return; }
    let statusArray = [EContractStatus.DRAFT, EContractStatus.EXECUTION, EContractStatus.FINISHED, EContractStatus.PAID];
    if(isShowArchived) {
      statusArray.push(EContractStatus.ARCHIVED);
    }

    Promise.all([
      ContractService.getAllForCompanyExecId(computed.activeRole.companyId, statusArray),
      ContractService.getAllForCompanyOrderId(computed.activeRole.companyId, statusArray)
    ]).then(results => {
      let companyIds = [];
      Object.keys(results[0]).forEach(id => companyIds.push(results[0][id].companyExecId, results[0][id].companyOrderId));
      Object.keys(results[1]).forEach(id => companyIds.push(results[1][id].companyExecId, results[1][id].companyOrderId));

      CompanyService.getAllForIdList(UtilsService.removeDuplicateFromArray(companyIds))
        .then(companies => {
          setCompanies(companies);
          setOrderContracts(results[1]);
          setExecuteContracts(results[0]);
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
