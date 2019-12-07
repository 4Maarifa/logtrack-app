import React from 'react';
import { faUserTag } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import Icon from './../../Utils/Icon/Icon';

import Role from './../Role/Role';

import './RoleCompany.scss';

class RoleCompany extends ComponentSafeUpdate {

  /**
   * RENDER
   */
  render() {
    if(!this.props.company || !Object.keys(this.props.roles).length) {
      return (<div></div>);
    }
    var companyId = Object.keys(this.props.company)[0];
    
    return (
      <div className="RoleCompany">
        <Icon source="fa" icon={faUserTag} containerclassname="item-icon" />
        <span className="item-content">
          <PageLink type={PageLinkType.COMPANY} entityId={companyId} entityData={this.props.company[companyId]} />
        </span>
        <div className="item-actions">
          <div className="roles">
            {Object.keys(this.props.roles).map(roleKey => 
              <Role key={roleKey} role={ { [roleKey]: this.props.roles[roleKey] } } options={this.props.options}></Role>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RoleCompany;
