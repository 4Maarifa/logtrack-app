import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { faUsers, faTruck, faWarehouseAlt, faClipboardUser } from '@fortawesome/pro-solid-svg-icons';

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
 */
const CompanyPage = ({ match }) => {
  const COMPANY_ID = match.params.companyid;

  const [company, setCompany] = useState(null);

  const [nbJobOffers, setNbJobOffers] = useState(0);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeCompany = () => {
    CompanyService.get(COMPANY_ID)
      .then(companyDoc => setCompany(companyDoc.data()))
      .catch(ErrorService.manageError);

    CompanyService.jobOffer.countOpenedForCompanyId(COMPANY_ID)
      .then(setNbJobOffers)
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    if(computed.initialized) {
      computeCompany();
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
    </div>
  }

  return (
    <div className="CompanyPage">
      <div className="Element Element--page">
        <Company key={COMPANY_ID} company={ {[COMPANY_ID]: company} } options={{ }} showDetails isPage />
      </div>
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
      <Tabs default="warehouses" tabs={{
        warehouses: {
          name: () => <span>
            <Icon source="fa" icon={faWarehouseAlt} />
            Warehouses
          </span>,
          content: () => <CompanyWarehousesTab companyId={COMPANY_ID} />
        },
        employees: {
          name: () => <span>
            <Icon source="fa" icon={faUsers} />
            Employees
          </span>,
          content: () => <CompanyEmployeesTab companyId={COMPANY_ID} />
        },
        equipments: {
          name: () => <span>
            <Icon source="fa" icon={faTruck} />
            Equipments
          </span>,
          content: () => <CompanyEquipmentsTab companyId={COMPANY_ID} />
        }
      }} />
    </div>
  );
};

export default CompanyPage;
