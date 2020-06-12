import React, { useState, useEffect } from 'react';
import { faHandshakeAlt, faReceipt } from '@fortawesome/pro-solid-svg-icons';

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
 */
const ContractPage = ({ match }) => {
  const CONTRACT_ID = match.params.contractid;

  const [contract, setContract] = useState(null);
  const [companyExec, setCompanyExec] = useState(null);
  const [companyOrder, setCompanyOrder] = useState(null);

  useEffect(() => {
    ContractService.get(CONTRACT_ID)
      .then(contractDoc => {
        setContract(contractDoc.data());

        CompanyService.get(contractDoc.data().companyExecId)
          .then(companyDoc => setCompanyExec(companyDoc.data()))
          .catch(ErrorService.manageError);

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
          name: () => <span>
            <Icon source="fa" icon={faHandshakeAlt} />
            Contract details
          </span>,
          content: () => null
        },
        invoices: {
          name: () => <span>
            <Icon source="fa" icon={faReceipt} />
            Invoices
          </span>,
          content: () => null
        }
      }} />
    </div>
  );
};

export default ContractPage;
