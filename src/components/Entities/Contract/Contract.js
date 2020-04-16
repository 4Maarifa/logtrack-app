import React from 'react';
import { faFileSignature, faHourglassStart, faCog, faCreditCard } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../services/data.service';
import ContractService from './../../../services/entities/contract.service';
import ErrorService from './../../../services/error.service';
import DateService from './../../../services/date.service';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import { EContractStatusDetails, EContractStatus } from './../../../classes/Contract';

import './Contract.scss';

class Contract extends ComponentSafeUpdate {

  computeAction = () => {
    const contractData = this.props.contract[Object.keys(this.props.contract)[0]];
    const isExecutor = (Object.keys(this.props.companyExec)[0] === DataService.computed.activeRole.companyId);
    const hasCreated = contractData.createdByCompanyId === DataService.computed.activeRole.companyId;

    switch(contractData.status) {
      case EContractStatus.DRAFT:
        if(!!hasCreated) {
          return <span><Icon source="fa" icon={faHourglassStart} />Waiting for the other company...</span>;
        }
        return <button onClick={() => this.changeContractStatus(EContractStatus.EXECUTION)}>Click to accept the contract</button>;
      case EContractStatus.EXECUTION:
        if(!!isExecutor) {
          return <span><Icon source="fa" icon={faCog} />You're executing the contract...</span>;
        }
        return <button onClick={() => this.changeContractStatus(EContractStatus.FINISHED)}>Click when execution is finished</button>;
      case EContractStatus.FINISHED:
        if(!!isExecutor) {
          return <button onClick={() => this.changeContractStatus(EContractStatus.PAID)}>Click when you get paid</button>;
        }
        return <span><Icon source="fa" icon={faCreditCard} />You're paying the contract...</span>;
      case EContractStatus.PAID:
        if(!!isExecutor) {
          return <span><Icon source="fa" icon={faHourglassStart} />Waiting for the other company...</span>;
        }
        return <button onClick={() => this.changeContractStatus(EContractStatus.ARCHIVED)}>Click to archive</button>;
      case EContractStatus.ARCHIVED:
        return <span>Archived on {DateService.getDateString(DateService.getDateFromIsoString(contractData.archiveIsoDate))}</span>
      default: 
        console.error('Unknown contract status:' + contractData.status);
    }
  };

  changeContractStatus = status => {
    const contractId = Object.keys(this.prps.contract)[0];
    let fieldsToUpdate = {status};
    if(status === EContractStatus.ARCHIVED) {
      Object.assign(fieldsToUpdate, {archiveIsoDate: DateService.getCurrentIsoDateString()});
    }
    ContractService.updateField(contractId, fieldsToUpdate)
      .then(() => {
        ErrorService.success('Contract updated!');
        !!this.props.notifyContractChanges && this.props.notifyContractChanges(contractId);
      }).catch(ErrorService.manageError);
  };

  /**
   * RENDER
   */
  render() {
    if(!this.props.contract) {
      return (<></>);
    }

    var contractKey = Object.keys(this.props.contract)[0];

    const otherCompany = Object.keys(this.props.companyExec)[0] === DataService.computed.activeRole.companyId ? this.props.companyOrder : this.props.companyExec;
    const otherCompanyId = Object.keys(otherCompany)[0];
    
    const isExecutor = (Object.keys(this.props.companyExec)[0] === DataService.computed.activeRole.companyId);
    
    return (
      <div className="Contract Element-content" key={contractKey}>
        <div className="Element-base">
          <Icon containerclassname="Element-icon" source="fa" icon={faFileSignature} />
          <div className="Element-data">
            <span className="Element-title">{this.props.contract[contractKey].identification}</span>
            <span>
              {!!isExecutor ? 'You execute the contract for' : 'You ordered the contract from'}
              <PageLink type={PageLinkType.COMPANY} entityId={otherCompanyId} entityData={otherCompany[otherCompanyId]} />
            </span>
            <span className="Element-badge badge">
              {EContractStatusDetails[this.props.contract[contractKey].status].icon}
              {EContractStatusDetails[this.props.contract[contractKey].status].name}
            </span>
          </div>
        </div>
        
        <span className="Element-actions">
          {this.computeAction()}
        </span>
      </div>
    );
  }
}

export default Contract;
