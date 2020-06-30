import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faComment } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../../services/data.service';
import ErrorService from './../../../../services/error.service';
import ContactService from './../../../../services/entities/contact.service';

import Contact, { contactsExTableFSS } from './../../../Entities/Contact/Contact';

import Icon from './../../../Utils/Icon/Icon';
import ExTable from './../../../Utils/ExTable/ExTable';

import { v4 as uuid } from 'uuid';

/**
 * Component: AdminContactTab
 * Tab of the Admin component that prints all messaged from the contact form (Splash/pages/Contact)
 */
const AdminContactTab = () => {

  // Load contact messages
  const [contacts, setContacts] = useState({});
  const [isContactsLoading, setContactsLoading] = useState(true);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    setContacts({});
    setContactsLoading(true);

    // Employee must be part of the staff to load this
    if(!computed.employee || !computed.employee.staff) { return; }

    // Fetch the contact messages
    ContactService.list()
      .then(contacts => {
        // Set data
        setContacts(contacts);

        // Then trigger end of load
        setContactsLoading(false);
      })
      .catch(ErrorService.manageError);
  }, [computed.activeRole]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }
  if(!computed.employee || !computed.employee.staff) {
    // If employee is not part of the staff, we redirect him to the dashboard (safeguard - already managed by route)
    return <Redirect to={`/dashboard`} />;
  }

  /**
   * RENDER
   */
  const renderContact = (itemId, itemData) => <Contact contact={{[itemId]: itemData}} />;

  return <ExTable key="CONTACT"
                  fss={contactsExTableFSS}
                  items={contacts}
                  renderItem={renderContact}
                  header={<span><Icon source="fa" icon={faComment} /> Contact Messages</span>}
                  loading={isContactsLoading} />;
};

export default AdminContactTab;
