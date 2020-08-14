import React from 'react';
import { faReply, faComment, faCopy } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import ActionList from './../../Utils/ActionList/ActionList';

import UtilsService from './../../../services/utils.service';
import DateService from './../../../services/date.service';
import UserAgentService from './../../../services/useragent.service';

import './Contact.scss';

/**
 * Component: Contact
 * Print contact message details
 */
const Contact = ({ contact }) => {
  if(!contact) { return null; }
  
  const CONTACT_ID = Object.keys(contact)[0];
  const CONTACT_DATA = contact[CONTACT_ID];

  // Actions on contact message
  const ACTIONS = [
    { title: 'Answer', icon: <Icon source="fa" icon={faReply} />, pureLink: `mailto:${CONTACT_DATA.email}` },
    { title: 'Copy Email', icon: <Icon source="fa" icon={faCopy} />, callback: () => UserAgentService.copyToClipboard(CONTACT_DATA.email) }
  ];

  return (
    <div className="Contact Element-content">
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faComment} />
        <div className="Element-data">
          {/* Contact message details */}
          <span className="Element-title">
            {CONTACT_DATA.email} said:
          </span>
          <span>
            {CONTACT_DATA.message}
          </span>
          <span className="sub">
            Created {DateService.getDateString(DateService.getDateFromIsoString(CONTACT_DATA.creationIsoDate), false, false, 'on')} - ID: {CONTACT_ID}
          </span>
          <span className={'Element-badge badge'}>
            {EContactCategoryDetails[CONTACT_DATA.category].adminTitle}
          </span>
        </div>
        <div className="Element-actions">
          {/* Actions */}
          <ActionList actions={ACTIONS} />
        </div>
      </div>
    </div>
  );
};

/**
 * Enum: EContactCategories
 * Categorize contact messages
 */
export const EContactCategories = {
  BUSINESS_INQUIRY: 'BUSINESS_INQUIRY',
  PROBLEM_WITH_ACCOUNT: 'PROBLEM_WITH_ACCOUNT',
  PRICING: 'PRICING',
  CUSTOM_PLAN: 'CUSTOM_PLAN',
  OTHER: 'OTHER'
};

/**
 * Enum: EContactCategoryDetails
 * Details about the enum EContactCategories
 * 
 * title: string | Printable title for the user, longer
 * adminTitle: string | Printable title for the admin, shorter
 */
export const EContactCategoryDetails = {
  [EContactCategories.BUSINESS_INQUIRY]: {
    title: 'Business Inquiry',
    adminTitle: 'Business'
  },
  [EContactCategories.PROBLEM_WITH_ACCOUNT]: {
    title: 'I have a problem with my account',
    adminTitle: 'Account'
  },
  [EContactCategories.PRICING]: {
    title: 'Question about pricing',
    adminTitle: 'Pricing'
  },
  [EContactCategories.CUSTOM_PLAN]: {
    title: 'Set up a custom plan',
    adminTitle: 'Custom Plan'
  },
  [EContactCategories.OTHER]: {
    title: 'Other Reason',
    adminTitle: 'Other'
  }
};

// FSS for contact messages (used to filter, search and sort contact messages) => sort on date, search on email, filter on categories
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

// Update FSS to have filters about Contact Categories, stored in EContactCategories
Object.keys(EContactCategories).filter(typeKey => !EContactCategoryDetails[typeKey].disabled).forEach(typeKey => {
  contactsExTableFSS.filter[typeKey] = {
    title: 'Type - ' + EContactCategoryDetails[typeKey].adminTitle,
    apply: (_, itemData) => itemData.category === typeKey
  }
});

export default Contact;
