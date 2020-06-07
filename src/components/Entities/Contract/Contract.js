import React, { useState, useEffect } from 'react';
import { faHourglassStart, faCog, faCreditCard, faHandshakeAlt, faPlay, faMoneyBill, faArchive, faCheck, faEdit } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../services/data.service';
import ContractService from './../../../services/entities/contract.service';
import ErrorService from './../../../services/error.service';
import DateService from './../../../services/date.service';
import UtilsService from './../../../services/utils.service';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ActionList from './../../Utils/ActionList/ActionList';

import { EContractStatusDetails, EContractStatus, EContractTypeDetails } from './../../../classes/Contract';
import { ERole } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './Contract.scss';

const Contract = ({ notifyContractChanges, contract, companyExec, companyOrder, isPage }) => {

  if(!contract) { return null; }

  const contractKey = Object.keys(contract)[0];
  const contractData = contract[contractKey];
  const observerKey = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const changeContractStatus = status => {
    let fieldsToUpdate = { status };
    if(status === EContractStatus.ARCHIVED) {
      Object.assign(fieldsToUpdate, { archiveIsoDate: DateService.getCurrentIsoDateString() });
    }
    ContractService.updateField(contractKey, fieldsToUpdate)
      .then(() => {
        ErrorService.success('Contract updated!');
        notifyContractChanges && notifyContractChanges(contractKey);
      }).catch(ErrorService.manageError);
  };
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey);
  }, []);

  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const computeStatus = () => {
    const isExecutor = (Object.keys(companyExec)[0] === computed.activeRole.companyId);
    const hasCreated = contractData.createdByCompanyId === computed.activeRole.companyId;

    switch(contractData.status) {
      case EContractStatus.DRAFT:
        if(hasCreated) {
          return <span><Icon source="fa" icon={faHourglassStart} />Waiting for the other company...</span>;
        }
        return <span><Icon source="fa" icon={faPlay} />You have to accept the contract</span>;
      case EContractStatus.EXECUTION:
        if(isExecutor) {
          return <span><Icon source="fa" icon={faCog} />You're executing the contract...</span>;
        }
        return <span><Icon source="fa" icon={faCheck} />Inidicate when the contract is finished</span>;
      case EContractStatus.FINISHED:
        if(isExecutor) {
          return <button onClick={() => changeContractStatus(EContractStatus.PAID)}>Click when you get paid</button>;
        }
        return <span><Icon source="fa" icon={faCreditCard} />You're paying the contract...</span>;
      case EContractStatus.PAID:
        if(isExecutor) {
          return <span><Icon source="fa" icon={faHourglassStart} />Waiting for the other company...</span>;
        }
        return <button onClick={() => changeContractStatus(EContractStatus.ARCHIVED)}>Click to archive</button>;
      case EContractStatus.ARCHIVED:
        return <span>Archived on {DateService.getDateString(DateService.getDateFromIsoString(contractData.archiveIsoDate), false)}</span>
      default: 
        console.error('Unknown contract status:' + contractData.status);
    }
  };

  const computeAction = () => {
    const isExecutor = (Object.keys(companyExec)[0] === computed.activeRole.companyId);
    const hasCreated = contractData.createdByCompanyId === computed.activeRole.companyId;

    if(computed.activeRole.role !== ERole.MANAGER ||
      !(computed.activeRole.companyId === contractData.companyExecId || computed.activeRole.companyId === contractData.companyOrderId)) {
        return [];
      }

    switch(contractData.status) {
      case EContractStatus.DRAFT:
        if(hasCreated) { return []; }
        return [{ title: 'Accept', icon: <Icon source="fa" icon={faPlay} />, callback: () => changeContractStatus(EContractStatus.EXECUTION) }];
      case EContractStatus.EXECUTION:
        if(isExecutor) { return []; }
        return [{ title: 'Finish', icon: <Icon source="fa" icon={faCheck} />, callback: () => changeContractStatus(EContractStatus.FINISHED) }];
      case EContractStatus.FINISHED:
        if(isExecutor) {
          return [{ title: 'Got paid?', icon: <Icon source="fa" icon={faMoneyBill} />, callback: () => changeContractStatus(EContractStatus.PAID) }];
        }
        return [];
      case EContractStatus.PAID:
        if(isExecutor) { return []; }
        return [{ title: 'Archive', icon: <Icon source="fa" icon={faArchive} />, callback: () => changeContractStatus(EContractStatus.ARCHIVED) }];
      default: 
        return [];
    }
  };

  const otherCompany = Object.keys(companyExec)[0] === computed.activeRole.companyId ? companyOrder : companyExec;
  const otherCompanyId = Object.keys(otherCompany)[0];
  
  const isExecutor = (Object.keys(companyExec)[0] === computed.activeRole.companyId);

  const actions = [...computeAction()];

  if(computed.activeRole.role === ERole.MANAGER && 
    (computed.activeRole.companyId === contractData.companyExecId || computed.activeRole.companyId === contractData.companyOrderId)) {

      actions.push({ title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/contract-edit/${contractKey}` });
  }
  
  return (
    <div className="Contract Element-content" key={contractKey}>
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faHandshakeAlt} />
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.CONTRACT} entityId={contractKey} entityData={contractData} white={isPage} />
          </span>
          {isExecutor ? 'You execute the contract for' : 'You ordered the contract from'}
          <PageLink type={PageLinkType.COMPANY} entityId={otherCompanyId} entityData={otherCompany[otherCompanyId]} white={isPage} />
          <span className="badge badge-mono">
            {EContractTypeDetails[contractData.contractType].icon}
            {EContractTypeDetails[contractData.contractType].name}
          </span>
          <span className="sub">{computeStatus()}</span>
          <span className={'Element-badge badge ' + (isPage ? 'badge-inverse' : '')}>
            {EContractStatusDetails[contractData.status].icon}
            {EContractStatusDetails[contractData.status].name}
          </span>
        </div>
        <span className="Element-actions">
          <ActionList actions={actions} isFlatten={isPage} />
        </span>
      </div>
    </div>
  );
};

const contractsExTableFSS = {
  sort: {
    identification: {
      title: 'Identification',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].identification, items[key2].identification)
      )),
      default: true
    },
    status: {
      title: 'Status',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].status, items[key2].status)
      ))
    },
    contractType: {
      title: 'Type',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].contractType, items[key2].contractType)
      ))
    }
  },
  search: (_, itemData, searchTerm) => (
    itemData.identification.toLowerCase().includes(searchTerm.toLowerCase()) ||
    itemData.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    itemData.contractType.toLowerCase().includes(searchTerm.toLowerCase())
  ),
  filter: {}
};

Object.keys(EContractTypeDetails).filter(typeKey => !EContractTypeDetails[typeKey].disabled).forEach(typeKey => {
  contractsExTableFSS.filter[typeKey] = {
    title: 'Type - ' + EContractTypeDetails[typeKey].name,
    apply: (_, itemData) => itemData.contractType === typeKey
  }
});

Object.keys(EContractStatusDetails).forEach(statusKey => {
  contractsExTableFSS.filter[statusKey] = {
    title: 'Status - ' + EContractStatusDetails[statusKey].name,
    apply: (_, itemData) => itemData.status === statusKey
  }
});

export { contractsExTableFSS };

export default Contract;
