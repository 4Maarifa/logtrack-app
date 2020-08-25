import React, { useState, useEffect } from 'react';
import { faEdit, faClipboardCheck } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ActionList from './../../Utils/ActionList/ActionList';

import { ERole } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './Form.scss';

/**
 * Component: Contract
 * Print contract details
 * 
 * You have to pass full CompanyExec and CompanyOrder, fully loaded
 */
const Form = ({ form, isPage }) => {

  if(!form) { return null; }

  const FORM_ID = Object.keys(form)[0];
  const FORM_DATA = form[FORM_ID];

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */

  // Compute actions about form
  const ACTIONS = [];

  if((computed.activeRole.role === ERole.INSURER || computed.activeRole.role === ERole.MANAGER) && 
    computed.activeRole.companyId === FORM_DATA.companyId) {

      //ACTIONS.push({ title: 'Edit', icon: <Icon source="fa" icon={faEdit} />, link: `/form-edit/${FORM_ID}` });
  }
  
  return (
    <div className="Form Element-content" key={FORM_ID}>
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faClipboardCheck} />
        <div className="Element-data">
          <span className="Element-title">
            {/* Render pagelink */}
            <PageLink type={PageLinkType.FORM} entityId={FORM_ID} entityData={FORM_DATA} white={isPage} />
          </span>
        </div>
        <span className="Element-actions">
          {/* Actions */}
          <ActionList actions={ACTIONS} isFlatten={isPage} />
        </span>
      </div>
    </div>
  );
};

// FSS for forms (used to filter, search and sort forms) => 
// sort on identification, search on identification
export const formsExTableFSS = {
  sort: {
    identification: {
      title: 'Identification',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].identification, items[key2].identification)
      )),
      default: true
    },
  },
  search: (_, itemData, searchTerm) => itemData.identification.toLowerCase().includes(searchTerm.toLowerCase()),
  filter: {}
};

export default Form;
