import React, { useState, useEffect } from 'react';
import { faPlus, faBagsShopping, faCog, faSignature, faHandshakeAlt } from '@fortawesome/pro-solid-svg-icons';

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

  const observerKey = uuid();
  
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
      Object.keys(results[0]).forEach(key => companyIds.push(results[0][key].companyExecId, results[0][key].companyOrderId));
      Object.keys(results[1]).forEach(key => companyIds.push(results[1][key].companyExecId, results[1][key].companyOrderId));

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
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);
  
  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderContract = (itemKey, itemData) => {
    return <Contract
      notifyContractChanges={() => setNotifyCount(n => n+1)}
      contract={{[itemKey]: itemData}}
      companyExec={{[itemData.companyExecId]: companies[itemData.companyExecId]}}
      companyOrder={{[itemData.companyOrderId]: companies[itemData.companyOrderId]}} />
  };

  return (
    <div className="Contracts">
      <Tabs default="execution" tabs={{
        execution: {
          name: () => <span>
            <Icon source="fa" icon={faCog} />
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
          name: () => <span>
            <Icon source="fa" icon={faSignature} />
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
          name: () => <span>
            <Icon source="fa" icon={faBagsShopping} />
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
