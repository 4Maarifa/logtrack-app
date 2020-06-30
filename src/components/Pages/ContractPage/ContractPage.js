import React, { useState, useEffect } from 'react';
import { faHandshakeAlt, faReceipt } from '@fortawesome/pro-light-svg-icons';
import { faHandshakeAlt as faHandshakeAltSolid, faReceipt as faReceiptSolid } from '@fortawesome/pro-solid-svg-icons';

import ErrorService from './../../../services/error.service';
import CompanyService from './../../../services/entities/company.service';
import ContractService from './../../../services/entities/contract.service';

import Loader from './../../Utils/Loader/Loader';
import Tabs from './../../Utils/Tabs/Tabs';
import Icon from './../../Utils/Icon/Icon';

import Contract from './../../Entities/Contract/Contract';

import './ContractPage.scss';

/**
 * Component: ContractPage
 * Use by everyone to see details about a contract
 * 
 * You have to pass the related contract id
 */
const ContractPage = ({ match }) => {
  const CONTRACT_ID = match.params.contractid;

  // contract entity that matches the id, populated on load
  const [contract, setContract] = useState(null);

  // Both companies
  const [companyExec, setCompanyExec] = useState(null);
  const [companyOrder, setCompanyOrder] = useState(null);

  useEffect(() => {

    // get contract
    ContractService.get(CONTRACT_ID)
      .then(contractDoc => {

        // set the contract data
        setContract(contractDoc.data());

        // get the exec company
        CompanyService.get(contractDoc.data().companyExecId)
          .then(companyDoc => setCompanyExec(companyDoc.data()))
          .catch(ErrorService.manageError);

        // get the order company
        CompanyService.get(contractDoc.data().companyOrderId)
          .then(companyDoc => setCompanyOrder(companyDoc.data()))
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  }, []);

  if(!contract || !companyExec || !companyOrder) {
    return (
      <div className="ContractPage">
        <Loader />
      </div>
    );
  }
  return (
    <div className="ContractPage">
      <div className="Element Element--page">
        <Contract contract={{[CONTRACT_ID]: contract}}
                  companyExec={{[contract.companyExecId]: companyExec}}
                  companyOrder={{[contract.companyOrderId]: companyOrder}}
                  isPage />
      </div>
      <Tabs default="contracts" tabs={{
        contracts: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faHandshakeAltSolid : faHandshakeAlt} />
            Contract details
          </span>,
          content: () => null
        },
        invoices: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faReceiptSolid : faReceipt} />
            Invoices
          </span>,
          content: () => null
        }
      }} />
    </div>
  );
};

export default ContractPage;
