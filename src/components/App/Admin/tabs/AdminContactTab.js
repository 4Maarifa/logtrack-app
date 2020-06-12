import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faComment } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../../services/data.service';
import ErrorService from './../../../../services/error.service';
import ContactService from './../../../../services/entities/contact.service';

import Contact, { contactsExTableFSS } from './../../../Entities/Contact/Contact';

import Icon from './../../../Utils/Icon/Icon';
import ExTable from './../../../Utils/ExTable/ExTable';

import { v4 as uuid } from 'uuid';

/**
 * Component: AdminContactTab
 */
const AdminContactTab = () => {

  const [contacts, setContacts] = useState({});
  const [isContactsLoading, setContactsLoading] = useState(true);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    setContacts({});
    setContactsLoading(true);

    if(!computed.activeRole) { return; }

    ContactService.list()
      .then(contacts => {
        setContacts(contacts);
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
