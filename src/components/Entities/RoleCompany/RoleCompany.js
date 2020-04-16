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
      <div className="RoleCompany Element-content">
        <div className="Element-base">
          <Icon source="fa" icon={faUserTag} containerclassname="Element-icon" />
          <div className="Element-data">
            <span className="Element-title">
              <PageLink type={PageLinkType.COMPANY} entityId={companyId} entityData={this.props.company[companyId]} />
            </span>
            <div className="roles">
              {Object.keys(this.props.roles).map(roleKey => 
                <Role key={roleKey} role={ { [roleKey]: this.props.roles[roleKey] } } options={this.props.options}></Role>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoleCompany;
