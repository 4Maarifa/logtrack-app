import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faUserHeadset } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../../services/data.service';
import ErrorService from './../../../../services/error.service';
import SupportService from './../../../../services/entities/support.service';

import Support, { supportsExTableFSS } from './../../../Entities/Support/Support';

import Icon from './../../../Utils/Icon/Icon';
import ExTable from './../../../Utils/ExTable/ExTable';

import { v4 as uuid } from 'uuid';

/**
 * Component: AdminSupportTab
 * Support Tab of the Admin component. Print all Support messages sent via the component Profile/tabs/SupportTab
 */
const AdminSupportTab = () => {

  // Support Messages
  const [supports, setSupports] = useState({});
  const [isSupportsLoading, setSupportsLoading] = useState(true);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    setSupports({});
    setSupportsLoading(true);

    // Employee must be part of the staff to load the messages
    if(!computed.employee || !computed.employee.staff) { return; }

    // load support messages
    SupportService.list()
      .then(supports => {
        // Set Data
        setSupports(supports);

        // Then trigger end of load
        setSupportsLoading(false);
      })
      .catch(ErrorService.manageError);
  }, [computed.activeRole]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }
  if(!computed.employee || !computed.employee.staff) {
    // If employee is not part of the staff => redirect to dashboard (safeguard - already managed by route)
    return <Redirect to={`/dashboard`} />;
  }

  /**
   * RENDER
   */
  const renderSupport = (itemId, itemData) => <Support support={{[itemId]: itemData}} />;

  return <ExTable key="SUPPORT"
                  fss={supportsExTableFSS}
                  items={supports}
                  renderItem={renderSupport}
                  header={<span><Icon source="fa" icon={faUserHeadset} /> Support Messages</span>}
                  loading={isSupportsLoading} />;
};

export default AdminSupportTab;
