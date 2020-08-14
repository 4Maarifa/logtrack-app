import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { faUsers, faTruck, faWarehouseAlt, faClipboardUser } from '@fortawesome/pro-light-svg-icons';
import { faUsers as faUsersSolid, faTruck as faTruckSolid, faWarehouseAlt as faWarehouseAltSolid } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../services/data.service';
import CompanyService from './../../../services/entities/company.service';
import ErrorService from './../../../services/error.service';

import Loader from './../../Utils/Loader/Loader';
import Tabs from './../../Utils/Tabs/Tabs';
import Icon from './../../Utils/Icon/Icon';

import Company from './../../Entities/Company/Company';

import { v4 as uuid } from 'uuid';

import CompanyEmployeesTab from './tabs/CompanyEmployeesTab';
import CompanyWarehousesTab from './tabs/CompanyWarehousesTab';
import CompanyEquipmentsTab from './tabs/CompanyEquipmentsTab';

import './CompanyPage.scss';

/**
 * Component: CompanyPage
 * Use by everyone to see details about a company (warehouses / equipments / employees)
 * 
 * You have to pass the company's id
 */
const CompanyPage = ({ match }) => {
  const COMPANY_ID = match.params.companyid;

  // Company entity
  const [company, setCompany] = useState(null);

  // Number of job offers related to that company
  const [nbJobOffers, setNbJobOffers] = useState(0);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    if(computed.initialized) {

      // Get company details
      CompanyService.get(COMPANY_ID)
        .then(companyDoc => setCompany(companyDoc.data()))
        .catch(ErrorService.manageError);

      // Get number of opened job offers
      CompanyService.jobOffer.countOpenedForCompanyId(COMPANY_ID)
        .then(setNbJobOffers)
        .catch(ErrorService.manageError);
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);

  if(!computed.initialized) { return null; }


  /**
   * RENDER
   */
  if(!company) {
    return <div className="CompanyPage">
      <Loader />
    </div>;
  }

  return (
    <div className="CompanyPage">
      <div className="Element Element--page">
        <Company key={COMPANY_ID} company={ {[COMPANY_ID]: company} } options={{ }} showDetails isPage />
      </div>

      {/* Job offers section */}
      {nbJobOffers ? 
        <NavLink className="Element Element--row joboffers" to={`/jobs/${COMPANY_ID}`}>
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faClipboardUser} />
            <div className="Element-data">
              <div className="Element-title">
                {company.name} has {nbJobOffers} opened positions!
              </div>
            </div>
          </div>
        </NavLink>
      : null}

      {/* Company details */}
      <Tabs default="warehouses" tabs={{
        warehouses: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faWarehouseAltSolid : faWarehouseAlt} />
            Warehouses
          </span>,
          content: () => <CompanyWarehousesTab companyId={COMPANY_ID} />
        },
        employees: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faUsersSolid : faUsers} />
            Employees
          </span>,
          content: () => <CompanyEmployeesTab companyId={COMPANY_ID} />
        },
        equipments: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faTruckSolid : faTruck} />
            Equipments
          </span>,
          content: () => <CompanyEquipmentsTab companyId={COMPANY_ID} />
        }
      }} />
    </div>
  );
};

export default CompanyPage;
