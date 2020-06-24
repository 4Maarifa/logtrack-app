import React from 'react';
import { faReply, faComment, faCopy } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import ActionList from './../../Utils/ActionList/ActionList';

import UtilsService from './../../../services/utils.service';
import DateService from './../../../services/date.service';
import UserAgentService from './../../../services/useragent.service';

import './Contact.scss';

const Contact = ({ contact }) => {
  if(!contact) { return null; }
  
  const CONTACT_ID = Object.keys(contact)[0];
  const CONTACT_DATA = contact[CONTACT_ID];

  const ACTIONS = [
    { title: 'Answer', icon: <Icon source="fa" icon={faReply} />, pureLink: `mailto:${CONTACT_DATA.email}` },
    { title: 'Copy Email', icon: <Icon source="fa" icon={faCopy} />, callback: () => UserAgentService.copyToClipboard(CONTACT_DATA.email) }
  ];

  return (
    <div className="Contact Element-content">
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faComment} />
        <div className="Element-data">
          <span className="Element-title">
            {CONTACT_DATA.email} said:
          </span>
          <span>
            {CONTACT_DATA.message}
          </span>
          <span className="sub">
            Created on {DateService.getDateString(DateService.getDateFromIsoString(CONTACT_DATA.creationIsoDate), false, false)} - ID: {CONTACT_ID}
          </span>
          <span className={'Element-badge badge'}>
            {EContactCategoryDetails[CONTACT_DATA.category].adminTitle}
          </span>
        </div>
        <div className="Element-actions">
          <ActionList actions={ACTIONS} />
        </div>
      </div>
    </div>
  );
};

export const EContactCategories = {
  BUSINESS_INQUIRY: 'BUSINESS_INQUIRY',
  PROBLEM_WITH_ACCOUNT: 'PROBLEM_WITH_ACCOUNT',
  OTHER: 'OTHER'
};

export const EContactCategoryDetails = {
  [EContactCategories.BUSINESS_INQUIRY]: {
    title: 'Business Inquiry',
    adminTitle: 'Business'
  },
  [EContactCategories.PROBLEM_WITH_ACCOUNT]: {
    title: 'I have a problem with my account',
    adminTitle: 'Account'
  },
  [EContactCategories.OTHER]: {
    title: 'Other Reason',
    adminTitle: 'Other'
  }
};

export const contactsExTableFSS = {
  sort: {
    date: {
      title: 'Date',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].creationIsoDate, items[key2].creationIsoDate)
      )),
      default: true
    }
  },
  search: (_, itemData, searchTerm) => (
    itemData.email.toLowerCase().includes(searchTerm.toLowerCase())
  ),
  filter: {}
};

Object.keys(EContactCategories).filter(typeKey => !EContactCategoryDetails[typeKey].disabled).forEach(typeKey => {
  contactsExTableFSS.filter[typeKey] = {
    title: 'Type - ' + EContactCategoryDetails[typeKey].adminTitle,
    apply: (_, itemData) => itemData.category === typeKey
  }
});

export default Contact;
