import React, { useState, useEffect } from 'react';
import { faSearch, faUsers, faBuilding, faTruck, faWarehouseAlt, faHandshakeAlt } from '@fortawesome/pro-light-svg-icons';
import { faUsers as faUsersSolid, faWarehouseAlt as faWarehouseAltSolid, faHandshakeAlt as faHandshakeAltSolid,
  faBuilding as faBuildingSolid, faTruck as faTruckSolid } from '@fortawesome/pro-solid-svg-icons';

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

import Warehouse, { warehousesExTableFSS } from './../../Entities/Warehouse/Warehouse';
import Equipment, { equipmentsExTableFSS } from './../../Entities/Equipment/Equipment';
import Contract, { contractsExTableFSS } from './../../Entities/Contract/Contract';
import Company, { companiesExTableFSS } from './../../Entities/Company/Company';
import Employee, { employeesExTableFSS } from './../../Entities/Employee/Employee';

import { v4 as uuid } from 'uuid';

import './Search.scss';

/**
 * Component: Search
 * Search functions on companies, employees, contracts, warehouses, equipments
 */
const Search = () => {

  // Search form input
  const [searchInput, setSearchInput] = useState('');

  // Results of the search
  const [employees, setEmployees] = useState({});
  const [contracts, setContracts] = useState({});
  const [contractCompanies, setContractCompanies] = useState({});
  const [equipments, setEquipments] = useState({});
  const [companies, setCompanies] = useState({});
  const [warehouses, setWarehouses] = useState({});

  // All models and brands of equipments
  const [equipmentModels, setEquipmentModels] = useState({});
  const [brands, setBrands] = useState({});

  // is searching?
  const [isSearchLoading, setSearchLoading] = useState(true);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // Form handler
  const searchEntities = () => {
    if(searchInput.length <= 3) { return; }
    DataService.computed.search([ESearchType.EMPLOYEES, ESearchType.COMPANIES, ESearchType.WAREHOUSES, ESearchType.CONTRACTS, ESearchType.EQUIPMENTS], 
        searchInput, computed.activeRole.companyId)
      .then(results => {
        // Get all related companies to search data
        CompanyService.getAllForIdList(UtilsService.removeDuplicateFromArray(Object.keys(results.data.contracts).map(contractId => [results.data.contracts[contractId].companyExecId, results.data.contracts[contractId].companyOrderId]).flat(Infinity)))
          .then(contractCompanies => {

            // set data
            setEmployees(results.data.employees);
            setContracts(results.data.contracts);
            setEquipments(results.data.equipments);
            setCompanies(results.data.companies);
            setWarehouses(results.data.warehouses);
            setContractCompanies(contractCompanies);

            // Triggering end of load
            setSearchLoading(false);
          }).catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    // If search input value is modified, trigger search function
    setSearchLoading(true);
    searchEntities();
  }, [searchInput]);

  useEffect(() => {
    // Load all brands and equipment models on load
    BrandService.list()
      .then(setBrands)
      .catch(ErrorService.manageError);

    EquipmentModelService.list()
      .then(setEquipmentModels)
      .catch(ErrorService.manageError);
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */

  // Util render functions

  const renderEmployee = (itemId, itemData) => {
    return <Employee employee={{[itemId]: itemData}} />;
  };

  const renderCompany = (itemId, itemData) => {
    return <Company company={{[itemId]: itemData}} />;
  };

  const renderWarehouse = (itemId, itemData) => {
    return <Warehouse key={itemId}
      warehouse={ {[itemId]: itemData} }
      options={ {} }
      showDetails />;
  };

  const renderContract = (itemId, itemData) => {
    return <Contract
      contract={{[itemId]: itemData}}
      companyExec={{[itemData.companyExecId]: contractCompanies[itemData.companyExecId]}}
      companyOrder={{[itemData.companyOrderId]: contractCompanies[itemData.companyOrderId]}} />
  };

  const renderEquipment = (itemId, itemData) => {
    const EQUIPMENT_MODEL = { [itemData.equipmentModelId]: equipmentModels[itemData.equipmentModelId] },
      BRAND = { [EQUIPMENT_MODEL[itemData.equipmentModelId].brand]: brands[EQUIPMENT_MODEL[itemData.equipmentModelId].brand] };

    return <Equipment key={itemId}
      equipment={ {[itemId]: itemData} }
      brand={BRAND}
      equipmentModel={EQUIPMENT_MODEL}
      options={ {} }
      showDetails />
  };

  return (
    <div className={'Search ' + (searchInput.length >= 3 ? 'Search--valid' : '')}>

      {/* Search input */}
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

      {/* Search results */}
      <Tabs default="companies" tabs={{
        employees: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faUsersSolid : faUsers} />
            Employees / Users
            <span className="badge badge-inverse">{Object.keys(employees).length}</span>
          </span>,
          content: () => <ExTable key="employees"
                                  fss={employeesExTableFSS}
                                  items={employees}
                                  renderItem={renderEmployee}
                                  header={<span><Icon source="fa" icon={faUsers} /> Employees</span>}
                                  loading={isSearchLoading} />
        },
        companies: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faBuildingSolid : faBuilding} />
            Companies
            <span className="badge badge-inverse">{Object.keys(companies).length}</span>
          </span>,
          content: () => <ExTable key="companies"
                                  fss={companiesExTableFSS}
                                  items={companies}
                                  renderItem={renderCompany}
                                  header={<span><Icon source="fa" icon={faBuilding} /> Companies</span>}
                                  loading={isSearchLoading} />
        },
        equipments: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faTruckSolid : faTruck} />
            Equipments
            <span className="badge badge-inverse">{Object.keys(equipments).length}</span>
          </span>,
          content: () => <ExTable key="equipments"
                                  fss={equipmentsExTableFSS}
                                  items={equipments}
                                  renderItem={renderEquipment}
                                  header={<span><Icon source="fa" icon={faTruck} /> Equipments</span>}
                                  loading={isSearchLoading} />
        },
        contracts: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faHandshakeAltSolid : faHandshakeAlt} />
            Contracts
            <span className="badge badge-inverse">{Object.keys(contracts).length}</span>
          </span>,
          content: () => <ExTable key="contracts"
                                  fss={contractsExTableFSS}
                                  items={contracts}
                                  renderItem={renderContract}
                                  header={<span><Icon source="fa" icon={faHandshakeAlt} /> Contracts</span>}
                                  loading={isSearchLoading} />
        },
        warehouses: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faWarehouseAltSolid : faWarehouseAlt} />
            Warehouses
            <span className="badge badge-inverse">{Object.keys(warehouses).length}</span>
          </span>,
          content: () => <ExTable key="warehouses"
                                  fss={warehousesExTableFSS}
                                  items={warehouses}
                                  renderItem={renderWarehouse}
                                  header="Warehouses"
                                  loading={isSearchLoading} />
        }
      }} />
    </div>
  );
};

export default Search;
