import React from 'react';
import { faSearch, faUsers, faBuilding, faTruck, faFileSignature, faWarehouse } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Utils/Icon/Icon';
import Tabs from './../../Utils/Tabs/Tabs';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ExTable from './../../Utils/ExTable/ExTable';
import FormDebounceInput from './../../Utils/FormElements/FormDebounceInput/FormDebounceInput';

import DataService from './../../../services/data.service';
import BrandService from './../../../services/entities/brand.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';
import ErrorService from './../../../services/error.service';
import CompanyService from './../../../services/entities/company.service';
import UtilsService from './../../../services/utils.service';

import ESearchType from './../../../classes/enums/ESearchType';

import Warehouse from './../../Entities/Warehouse/Warehouse';
import Contract from './../../Entities/Contract/Contract';

import './Search.scss';

class Search extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      searchInput: '',

      employees: {},
      contracts: {},
      contractCompanies: {},
      equipments: {},
      companies: {},
      warehouses: {},

      equipmentModels: {},
      brands: {},

      searchLoading: true
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
    BrandService.list()
      .then(brands => this.setState({brands}))
      .catch(ErrorService.manageError);

    EquipmentModelService.list()
      .then((equipmentModels => this.setState({equipmentModels})))
      .catch(ErrorService.manageError);
  };

  onSearchInputChange = searchInput => this.setState({searchInput, searchLoading: true}, this.searchEntities);

  searchEntities = () => {
    if(this.state.searchInput.length <= 3) { return; }
    console.log(this.state.searchInput);
    DataService.computed.search([ESearchType.EMPLOYEES, ESearchType.COMPANIES, ESearchType.WAREHOUSES, ESearchType.CONTRACTS, ESearchType.EQUIPMENTS], 
        this.state.searchInput, this.state.activeRole.companyId)
      .then(results => {
        CompanyService.getAllForIdList(UtilsService.removeDuplicateFromArray(Object.keys(results.data.contracts).map(key => [results.data.contracts[key].companyExecId, results.data.contracts[key].companyOrderId]).flat(Infinity)))
          .then(contractCompanies => {
            this.setState({...results.data, contractCompanies, searchLoading: false});
          }).catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  };

  renderEmployee = (itemKey, itemData) => {
    return <PageLink type={PageLinkType.EMPLOYEE} entityId={itemKey} entityData={itemData} />;
  };

  renderCompany = (itemKey, itemData) => {
    return <PageLink type={PageLinkType.COMPANY} entityId={itemKey} entityData={itemData} />;
  };

  renderWarehouse = (itemKey, itemData) => {
    return <Warehouse key={itemKey}
      warehouse={ {[itemKey]: itemData} }
      options={ {} }
      showDetails={true} />;
  };

  renderContract = (itemKey, itemData) => {
    return <Contract
      contract={{[itemKey]: itemData}}
      companyExec={{[itemData.companyExecId]: this.state.contractCompanies[itemData.companyExecId]}}
      companyOrder={{[itemData.companyOrderId]: this.state.contractCompanies[itemData.companyOrderId]}} />
  }

  /**
   * RENDER
   */
  render() {
    return (
      <div className={'Search ' + (this.state.searchInput.length >= 3 ? 'Search--valid' : '')}>
        <FormDebounceInput 
          inputType="text"
          inputPattern=".{2,}"
          inputRequired
          instructions={
            <span>
              Please enter your search
            </span>
          }
          value={this.state.searchInput}
          label={
            <span>
              <Icon source="fa" icon={faSearch} />
              Search
            </span>}
          onValueChange={this.onSearchInputChange} />
        <Tabs default="companies" tabs={{
          employees: {
            name: () => <span>
              <Icon source="fa" icon={faUsers} />
              Employees / Users
              <span className="badge-inverse">{Object.keys(this.state.employees).length}</span>
            </span>,
            content: () => <ExTable key="employees" items={this.state.employees} renderItem={this.renderEmployee} header={['Name', 'Roles']} loading={this.state.searchLoading}></ExTable>
          },
          companies: {
            name: () => <span>
              <Icon source="fa" icon={faBuilding} />
              Companies
              <span className="badge-inverse">{Object.keys(this.state.companies).length}</span>
            </span>,
            content: () => <ExTable key="companies" items={this.state.companies} renderItem={this.renderCompany} header={['Name', '']} loading={this.state.searchLoading}></ExTable>
          },
          equipments: {
            name: () => <span>
              <Icon source="fa" icon={faTruck} />
              Equipments
              <span className="badge-inverse">{Object.keys(this.state.equipments).length}</span>
            </span>,
            content: () => <ExTable key="equipments" items={this.state.equipments} renderItem={this.renderEquipment} header={['Identification', 'Model']} loading={this.state.searchLoading}></ExTable>
          },
          contracts: {
            name: () => <span>
              <Icon source="fa" icon={faFileSignature} />
              Contracts
              <span className="badge-inverse">{Object.keys(this.state.contracts).length}</span>
            </span>,
            content: () => <ExTable key="contracts" items={this.state.contracts} renderItem={this.renderContract} header={['Type', 'Company']} loading={this.state.searchLoading}></ExTable>
          },
          warehouses: {
            name: () => <span>
              <Icon source="fa" icon={faWarehouse} />
              Warehouses
              <span className="badge-inverse">{Object.keys(this.state.warehouses).length}</span>
            </span>,
            content: () => <ExTable key="warehouses" items={this.state.warehouses} renderItem={this.renderWarehouse} header={['Name', '']} loading={this.state.searchLoading}></ExTable>
          }
        }}></Tabs>
      </div>
    );
  }
}

export default Search;
