import React, { Fragment } from 'react';
import { faUser } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import Icon from './../../Utils/Icon/Icon';

import Role from './../Role/Role';

import { ERoleStatus } from './../../../classes/Role';

import './RoleEmployee.scss';

class RoleEmployee extends ComponentSafeUpdate{

  /**
   * RENDER
   */
  renderProfilePicture = employeeId => {
    if(!!this.props.employee && !!this.props.employee[employeeId].profilePictureUrl) {
      return <img width="20" height="20" src={this.props.employee[employeeId].profilePictureUrl} 
        alt={this.props.employee[employeeId].firstname + ' ' + this.props.employee[employeeId].lastname + '\'s photo'} />
    }
    return <Fragment></Fragment>;
  };

  renderRole = roleKey => {
    if(!this.props.options.showDraft && this.props.roles[roleKey].status === ERoleStatus.DRAFT) {
      return <Fragment key={roleKey}></Fragment>;
    }
    return <Role key={roleKey} role={ { [roleKey]: this.props.roles[roleKey] } } options={this.props.options}></Role>;
  };

  render() {
    if(!this.props.employee || !Object.keys(this.props.roles).length) {
      return (<Fragment></Fragment>);
    }
    var employeeId = Object.keys(this.props.employee)[0];

    if(!this.props.options.showDraft && 
        Object.keys(this.props.roles).map((roleKey) => this.props.roles[roleKey].status).reduce((total, role) => total + (role.status === ERoleStatus.CONFIRMED) ? 1 : 0) === 0) {
        return <Fragment></Fragment>;
    }

    return (
      <div className="RoleEmployee Element-content">
        <div className="Element-base">
          <Icon source="fa" icon={faUser} containerclassname="Element-icon" />
          <div className="Element-data">
            <span className="Element-title">
              <PageLink type={PageLinkType.EMPLOYEE} entityId={employeeId} entityData={this.props.employee[employeeId]} />
            </span>
            <div className="roles">
              {Object.keys(this.props.roles).map(this.renderRole)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoleEmployee;
