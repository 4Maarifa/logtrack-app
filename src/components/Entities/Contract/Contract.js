import React, { useState, useEffect } from 'react';
import { faFileSignature, faHourglassStart, faCog, faCreditCard } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../services/data.service';
import ContractService from './../../../services/entities/contract.service';
import ErrorService from './../../../services/error.service';
import DateService from './../../../services/date.service';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import { EContractStatusDetails, EContractStatus } from './../../../classes/Contract';
import { v4 as uuid } from 'uuid';

import './Contract.scss';

const Contract = ({ notifyContractChanges, contract, companyExec, companyOrder }) => {

  if(!contract) { return null; }

  const contractKey = Object.keys(contract)[0];
  const contractData = contract[contractKey];
  const observerKey = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey);
  }, []);

  if(!computed.initialized) { return null; }

  const changeContractStatus = status => {
    let fieldsToUpdate = { status };
    if(status === EContractStatus.ARCHIVED) {
      Object.assign(fieldsToUpdate, { archiveIsoDate: DateService.getCurrentIsoDateString() });
    }
    ContractService.updateField(contractKey, fieldsToUpdate)
      .then(() => {
        ErrorService.success('Contract updated!');
        !!notifyContractChanges && notifyContractChanges(contractKey);
      }).catch(ErrorService.manageError);
  };

  const computeAction = () => {
    const isExecutor = (Object.keys(companyExec)[0] === computed.activeRole.companyId);
    const hasCreated = contractData.createdByCompanyId === computed.activeRole.companyId;

    switch(contractData.status) {
      case EContractStatus.DRAFT:
        if(!!hasCreated) {
          return <span><Icon source="fa" icon={faHourglassStart} />Waiting for the other company...</span>;
        }
        return <button onClick={() => changeContractStatus(EContractStatus.EXECUTION)}>Click to accept the contract</button>;
      case EContractStatus.EXECUTION:
        if(!!isExecutor) {
          return <span><Icon source="fa" icon={faCog} />You're executing the contract...</span>;
        }
        return <button onClick={() => changeContractStatus(EContractStatus.FINISHED)}>Click when execution is finished</button>;
      case EContractStatus.FINISHED:
        if(!!isExecutor) {
          return <button onClick={() => changeContractStatus(EContractStatus.PAID)}>Click when you get paid</button>;
        }
        return <span><Icon source="fa" icon={faCreditCard} />You're paying the contract...</span>;
      case EContractStatus.PAID:
        if(!!isExecutor) {
          return <span><Icon source="fa" icon={faHourglassStart} />Waiting for the other company...</span>;
        }
        return <button onClick={() => changeContractStatus(EContractStatus.ARCHIVED)}>Click to archive</button>;
      case EContractStatus.ARCHIVED:
        return <span>Archived on {DateService.getDateString(DateService.getDateFromIsoString(contractData.archiveIsoDate))}</span>
      default: 
        console.error('Unknown contract status:' + contractData.status);
    }
  };

  const otherCompany = Object.keys(companyExec)[0] === computed.activeRole.companyId ? companyOrder : companyExec;
  const otherCompanyId = Object.keys(otherCompany)[0];
  
  const isExecutor = (Object.keys(companyExec)[0] === computed.activeRole.companyId);
  
  return (
    <div className="Contract Element-content" key={contractKey}>
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faFileSignature} />
        <div className="Element-data">
          <span className="Element-title">{contractData.identification}</span>
          <span>
            {!!isExecutor ? 'You execute the contract for' : 'You ordered the contract from'}
            <PageLink type={PageLinkType.COMPANY} entityId={otherCompanyId} entityData={otherCompany[otherCompanyId]} />
          </span>
          <span className="Element-badge badge">
            {EContractStatusDetails[contractData.status].icon}
            {EContractStatusDetails[contractData.status].name}
          </span>
        </div>
      </div>
      
      <span className="Element-actions">
        {computeAction()}
      </span>
    </div>
  );
};

export default Contract;
