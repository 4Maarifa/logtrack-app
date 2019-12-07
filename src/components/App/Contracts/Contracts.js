import React from 'react';
import { faFileSignature, faPlus, faBagsShopping, faCog, faSignature, faToggleOn, faToggleOff } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../services/data.service';
import ContractService from './../../../services/entities/contract.service';
import CompanyService from './../../../services/entities/company.service';
import ErrorService from './../../../services/error.service';
import UtilsService from './../../../services/utils.service';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import ActionButton from './../../Utils/ActionButton/ActionButton';
import Icon from './../../Utils/Icon/Icon';
import ExTable from './../../Utils/ExTable/ExTable';
import Tabs from './../../Utils/Tabs/Tabs';

import { EContractStatus } from './../../../classes/Contract';

import Contract from './../../Entities/Contract/Contract';

import './Contracts.scss';

/**
 * Component: Contracts
 * Used by managers to list contracts that link to other companies
 */
class Contracts extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      orderContracts: {},
      executeContracts: {},
      companies: null,
      contractsLoading: true,

      showArchived: false
    }, DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues(computedValues => {
        this.setState(computedValues, this.computeValues);
      })
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  computeValues = () => {
    if(!this.state.activeRole) { return; }
    let statusArray = [EContractStatus.DRAFT, EContractStatus.EXECUTION, EContractStatus.FINISHED, EContractStatus.PAID];
    if(!!this.state.showArchived) {
      statusArray.push(EContractStatus.ARCHIVED);
    }

    Promise.all([
      ContractService.getAllForCompanyExecId(this.state.activeRole.companyId, statusArray),
      ContractService.getAllForCompanyOrderId(this.state.activeRole.companyId, statusArray)
    ]).then(results => {
      var companyIds = [];
      Object.keys(results[0]).forEach(key => companyIds.push(results[0][key].companyExecId, results[0][key].companyOrderId));
      Object.keys(results[1]).forEach(key => companyIds.push(results[1][key].companyExecId, results[1][key].companyOrderId));

      CompanyService.getAllForIdList(UtilsService.removeDuplicateFromArray(companyIds))
        .then(companies => this.setState({contractsLoading: false, companies, orderContracts: results[1], executeContracts: results[0]}))
        .catch(ErrorService.manageError);
    }).catch(ErrorService.manageError);
  };

  toggleShowArchived = () => this.setState({
    showArchived: !this.state.showArchived,
    orderContracts: {},
    executeContracts: {},
    contractsLoading: true
  }, this.computeValues);

  /**
   * RENDER
   */
  renderContract = (itemKey, itemData) => {
    return <Contract
      notifyContractChanges={this.computeValues}
      contract={{[itemKey]: itemData}}
      companyExec={{[itemData.companyExecId]: this.state.companies[itemData.companyExecId]}}
      companyOrder={{[itemData.companyOrderId]: this.state.companies[itemData.companyOrderId]}}></Contract>
  };

  render() {
    return (
      <div className="Contracts">
        <Tabs default="execution" tabs={{
          execution: {
            name: () => <span>
              <Icon source="fa" icon={faCog} />
              Contracts to Execute
            </span>,
            content: () => <ExTable key="EXECUTION" items={this.state.executeContracts} renderItem={this.renderContract} header={['Type', 'Company']} loading={this.state.contractsLoading}></ExTable>
          },
          order: {
            name: () => <span>
              <Icon source="fa" icon={faSignature} />
              Ordered Contracts
            </span>,
            content: () => <ExTable key="ORDER" items={this.state.orderContracts} renderItem={this.renderContract} header={['Type', 'Company']} loading={this.state.contractsLoading}></ExTable>
          },
          market: {
            name: () => <span>
              <Icon source="fa" icon={faBagsShopping} />
              Market <span className="badge-inverse">soon</span>
            </span>,
            content: () => <div></div>,
            disabled: true
          }
        }}></Tabs>
        <span className={'toggle-button ' + (!!this.state.showArchived ? 'toggle-button--active' : '')} tabIndex="0" onClick={this.toggleShowArchived}>
          <Icon source="fa" icon={!!this.state.showArchived ? faToggleOn : faToggleOff} />
          Show archived contracts
        </span>
        <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
          {title: 'Add a contract', icon: <Icon source="fa" icon={faFileSignature} />, link: `/contract-add`}
        ]} />
      </div>
    );
  }
}

export default Contracts;
