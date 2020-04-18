import React, { useState, useEffect } from 'react';
import { faSearch, faUsers, faBuilding, faTruck, faFileSignature, faWarehouseAlt } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import Tabs from './../../Utils/Tabs/Tabs';
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
import Equipment from './../../Entities/Equipment/Equipment';
import Contract from './../../Entities/Contract/Contract';
import Company from './../../Entities/Company/Company';
import Employee from './../../Entities/Employee/Employee';

import { v4 as uuid } from 'uuid';

import './Search.scss';

const Search = () => {

  const [searchInput, setSearchInput] = useState('');

  const [employees, setEmployees] = useState({});
  const [contracts, setContracts] = useState({});
  const [contractCompanies, setContractCompanies] = useState({});
  const [equipments, setEquipments] = useState({});
  const [companies, setCompanies] = useState({});
  const [warehouses, setWarehouses] = useState({});

  const [equipmentModels, setEquipmentModels] = useState({});
  const [brands, setBrands] = useState({});

  const [isSearchLoading, setSearchLoading] = useState(true);

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeValues = () => {
    BrandService.list()
      .then(setBrands)
      .catch(ErrorService.manageError);

    EquipmentModelService.list()
      .then(setEquipmentModels)
      .catch(ErrorService.manageError);
  };

  const searchEntities = () => {
    if(searchInput.length <= 3) { return; }
    DataService.computed.search([ESearchType.EMPLOYEES, ESearchType.COMPANIES, ESearchType.WAREHOUSES, ESearchType.CONTRACTS, ESearchType.EQUIPMENTS], 
        searchInput, computed.activeRole.companyId)
      .then(results => {
        CompanyService.getAllForIdList(UtilsService.removeDuplicateFromArray(Object.keys(results.data.contracts).map(key => [results.data.contracts[key].companyExecId, results.data.contracts[key].companyOrderId]).flat(Infinity)))
          .then(contractCompanies => {
            setEmployees(results.data.employees);
            setContracts(results.data.contracts);
            setEquipments(results.data.equipments);
            setCompanies(results.data.companies);
            setWarehouses(results.data.warehouses);
            setContractCompanies(contractCompanies);
            setSearchLoading(false);
          }).catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    setSearchLoading(true);
    searchEntities();
  }, [searchInput]);

  useEffect(computeValues, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);
  
  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderEmployee = (itemKey, itemData) => {
    return <Employee employee={{[itemKey]: itemData}} />;
  };

  const renderCompany = (itemKey, itemData) => {
    return <Company company={{[itemKey]: itemData}} />;
  };

  const renderWarehouse = (itemKey, itemData) => {
    return <Warehouse key={itemKey}
      warehouse={ {[itemKey]: itemData} }
      options={ {} }
      showDetails={true} />;
  };

  const renderContract = (itemKey, itemData) => {
    return <Contract
      contract={{[itemKey]: itemData}}
      companyExec={{[itemData.companyExecId]: contractCompanies[itemData.companyExecId]}}
      companyOrder={{[itemData.companyOrderId]: contractCompanies[itemData.companyOrderId]}} />
  };

  const renderEquipment = (itemKey, itemData) => {
    const equipmentModel = { [itemData.equipmentModelId]: equipmentModels[itemData.equipmentModelId] },
      brand = { [equipmentModel[itemData.equipmentModelId].brand]: brands[equipmentModel[itemData.equipmentModelId].brand] };

    return <Equipment key={itemKey}
      equipment={ {[itemKey]: itemData} }
      brand={brand}
      equipmentModel={equipmentModel}
      options={ {} }
      showDetails={true} />
  };

  return (
    <div className={'Search ' + (searchInput.length >= 3 ? 'Search--valid' : '')}>
      <FormDebounceInput 
        inputType="text"
        inputPattern=".{2,}"
        inputRequired
        instructions={
          <span>
            Please enter your search
          </span>
        }
        value={searchInput}
        label={
          <span>
            <Icon source="fa" icon={faSearch} />
            Search
          </span>}
        onValueChange={setSearchInput} />
      <Tabs default="companies" tabs={{
        employees: {
          name: () => <span>
            <Icon source="fa" icon={faUsers} />
            Employees / Users
            <span className="badge-inverse">{Object.keys(employees).length}</span>
          </span>,
          content: () => <ExTable key="employees" 
                                  items={employees}
                                  renderItem={renderEmployee}
                                  header={['Name', 'Roles']}
                                  loading={isSearchLoading}></ExTable>
        },
        companies: {
          name: () => <span>
            <Icon source="fa" icon={faBuilding} />
            Companies
            <span className="badge-inverse">{Object.keys(companies).length}</span>
          </span>,
          content: () => <ExTable key="companies"
                                  items={companies}
                                  renderItem={renderCompany}
                                  header={['Name', '']}
                                  loading={isSearchLoading}></ExTable>
        },
        equipments: {
          name: () => <span>
            <Icon source="fa" icon={faTruck} />
            Equipments
            <span className="badge-inverse">{Object.keys(equipments).length}</span>
          </span>,
          content: () => <ExTable key="equipments"
                                  items={equipments}
                                  renderItem={renderEquipment}
                                  header={['Identification', 'Model']}
                                  loading={isSearchLoading}></ExTable>
        },
        contracts: {
          name: () => <span>
            <Icon source="fa" icon={faFileSignature} />
            Contracts
            <span className="badge-inverse">{Object.keys(contracts).length}</span>
          </span>,
          content: () => <ExTable key="contracts"
                                  items={contracts}
                                  renderItem={renderContract}
                                  header={['Type', 'Company']}
                                  loading={isSearchLoading}></ExTable>
        },
        warehouses: {
          name: () => <span>
            <Icon source="fa" icon={faWarehouseAlt} />
            Warehouses
            <span className="badge-inverse">{Object.keys(warehouses).length}</span>
          </span>,
          content: () => <ExTable key="warehouses"
                                  items={warehouses}
                                  renderItem={renderWarehouse}
                                  header={['Name', '']}
                                  loading={isSearchLoading}></ExTable>
        }
      }}></Tabs>
    </div>
  );
};

export default Search;
