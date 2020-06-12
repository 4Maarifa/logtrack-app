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

  const CONTRACT_ID = Object.keys(contract)[0];
  const CONTRACT_DATA = contract[CONTRACT_ID];
  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const changeContractStatus = status => {
    let fieldsToUpdate = { status };
    if(status === EContractStatus.ARCHIVED) {
      Object.assign(fieldsToUpdate, { archiveIsoDate: DateService.getCurrentIsoDateString() });
    }
    ContractService.updateField(CONTRACT_ID, fieldsToUpdate)
      .then(() => {
        ErrorService.success('Contract updated!');
        notifyContractChanges && notifyContractChanges(CONTRACT_ID);
      }).catch(ErrorService.manageError);
  };
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const computeStatus = () => {
    const IS_EXECUTOR = (Object.keys(companyExec)[0] === computed.activeRole.companyId);
    const HAS_CREATED = CONTRACT_DATA.createdByCompanyId === computed.activeRole.companyId;

    switch(CONTRACT_DATA.status) {
      case EContractStatus.DRAFT:
        if(HAS_CREATED) {
          return <span><Icon source="fa" icon={faHourglassStart} />Waiting for the other company...</span>;
        }
        return <span><Icon source="fa" icon={faPlay} />You have to accept the contract</span>;
      case EContractStatus.EXECUTION:
        if(IS_EXECUTOR) {
          return <span><Icon source="fa" icon={faCog} />You're executing the contract...</span>;
        }
        return <span><Icon source="fa" icon={faCheck} />Inidicate when the contract is finished</span>;
      case EContractStatus.FINISHED:
        if(IS_EXECUTOR) {
          return <button onClick={() => changeContractStatus(EContractStatus.PAID)}>Click when you get paid</button>;
        }
        return <span><Icon source="fa" icon={faCreditCard} />You're paying the contract...</span>;
      case EContractStatus.PAID:
        if(IS_EXECUTOR) {
          return <span><Icon source="fa" icon={faHourglassStart} />Waiting for the other company...</span>;
        }
        return <button onClick={() => changeContractStatus(EContractStatus.ARCHIVED)}>Click to archive</button>;
      case EContractStatus.ARCHIVED:
        return <span>Archived on {DateService.getDateString(DateService.getDateFromIsoString(CONTRACT_DATA.archiveIsoDate), false)}</span>
      default: 
        console.error('Unknown contract status:' + CONTRACT_DATA.status);
    }
  };

  const computeAction = () => {
    const IS_EXECUTOR = (Object.keys(companyExec)[0] === computed.activeRole.companyId);
    const HAS_CREATED = CONTRACT_DATA.createdByCompanyId === computed.activeRole.companyId;

    if(computed.activeRole.role !== ERole.MANAGER ||
      !(computed.activeRole.companyId === CONTRACT_DATA.companyExecId || computed.activeRole.companyId === CONTRACT_DATA.companyOrderId)) {
        return [];
      }

    switch(CONTRACT_DATA.status) {
      case EContractStatus.DRAFT:
        if(HAS_CREATED) { return []; }
        return [{ title: 'Accept', icon: <Icon source="fa" icon={faPlay} />, callback: () => changeContractStatus(EContractStatus.EXECUTION) }];
      case EContractStatus.EXECUTION:
        if(IS_EXECUTOR) { return []; }
        return [{ title: 'Finish', icon: <Icon source="fa" icon={faCheck} />, callback: () => changeContractStatus(EContractStatus.FINISHED) }];
      case EContractStatus.FINISHED:
        if(IS_EXECUTOR) {
          return [{ title: 'Got paid?', icon: <Icon source="fa" icon={faMoneyBill} />, callback: () => changeContractStatus(EContractStatus.PAID) }];
        }
        return [];
      case EContractStatus.PAID:
        if(IS_EXECUTOR) { return []; }
        return [{ title: 'Archive', icon: <Icon source="fa" icon={faArchive} />, callback: () => changeContractStatus(EContractStatus.ARCHIVED) }];
      default: 
        return [];
    }
  };

  const OTHER_COMPANY = Object.keys(companyExec)[0] === computed.activeRole.companyId ? companyOrder : companyExec;
  const OTHER_COMPANY_ID = Object.keys(OTHER_COMPANY)[0];
  const OTHER_COMPANY_DATA = OTHER_COMPANY[OTHER_COMPANY_ID];
  
  const IS_EXECUTOR = (Object.keys(companyExec)[0] === computed.activeRole.companyId);

  const ACTIONS = [...computeAction()];

  if(computed.activeRole.role === ERole.MANAGER && 
    (computed.activeRole.companyId === CONTRACT_DATA.companyExecId || computed.activeRole.companyId === CONTRACT_DATA.companyOrderId)) {

      ACTIONS.push({ title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/contract-edit/${CONTRACT_ID}` });
  }
  
  return (
    <div className="Contract Element-content" key={CONTRACT_ID}>
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faHandshakeAlt} />
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.CONTRACT} entityId={CONTRACT_ID} entityData={CONTRACT_DATA} white={isPage} />
          </span>
          {IS_EXECUTOR ? 'You execute the contract for' : 'You ordered the contract from'}
          <PageLink type={PageLinkType.COMPANY} entityId={OTHER_COMPANY_ID} entityData={OTHER_COMPANY_DATA} white={isPage} />
          <span className="badge badge-mono">
            {EContractTypeDetails[CONTRACT_DATA.contractType].icon}
            {EContractTypeDetails[CONTRACT_DATA.contractType].name}
          </span>
          <span className="sub">{computeStatus()}</span>
          <span className={'Element-badge badge ' + (isPage ? 'badge-inverse' : '')}>
            {EContractStatusDetails[CONTRACT_DATA.status].icon}
            {EContractStatusDetails[CONTRACT_DATA.status].name}
          </span>
        </div>
        <span className="Element-actions">
          <ActionList actions={ACTIONS} isFlatten={isPage} />
        </span>
      </div>
    </div>
  );
};

export const contractsExTableFSS = {
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

export default Contract;
