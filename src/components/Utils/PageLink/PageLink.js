import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import ErrorService from './../../../services/error.service';
import DataService from './../../../services/data.service';

import { ECompanyPlan } from './../../../classes/Company';

import './PageLink.scss';

class PageLink extends ComponentSafeUpdate {

  getPageLink = () => {
    switch(this.props.type) {
      case PageLinkType.EMPLOYEE:
        return {
          link: `/employee/${this.props.entityId}`,
          content: <Fragment>
            {!!this.props.entityData.profilePictureUrl && 
              <img src={this.props.entityData.profilePictureUrl} alt="" />
            }
            <span>{this.props.entityData.firstname + ' ' + this.props.entityData.lastname}</span>
            {!!DataService.computed.user && this.props.entityId === DataService.computed.user.uid && <span className="badge you">you</span>}
          </Fragment>
        };
      case PageLinkType.COMPANY:
        return {
          link: `/company/${this.props.entityId}`,
          content: <Fragment>
            {!!this.props.entityData.logoURL &&
              <img src={this.props.entityData.logoURL} alt="" />
            }
            <span>{this.props.entityData.name}</span>
            <span className="mention badge company-plan" title={ECompanyPlan[this.props.entityData.plan].name + ' Plan'}>{ECompanyPlan[this.props.entityData.plan].solidIcon}</span>
          </Fragment>
        };
      case PageLinkType.EQUIPMENT:
        return {
          link: `/`,
          content: <Fragment>

          </Fragment>
        };
      case PageLinkType.WAREHOUSE:
        return {
          link: `/warehouse/${this.props.entityId}`,
          content: <Fragment>
            <span>{this.props.entityData.name}</span>
          </Fragment>
        };
      default:
        ErrorService.manageError('PageLink: The type ' + this.props.type + ' is not recognized');
        return null;
    }
  };

  /** 
   * RENDER
   */
  render() {
    const pageLink = this.getPageLink();
    if(!!this.props.noLink) {
      return <span className={'PageLink ' + (!!this.props.white ? 'PageLink-white' : '')}>
        {pageLink.content}
      </span>;
    }
    return (
      <NavLink className={'PageLink ' + (!!this.props.white ? 'white-link' : '')} to={pageLink.link} title="Visit Page">
        {pageLink.content}
      </NavLink>
    );
  }
}

export const PageLinkType = {
  EMPLOYEE: 'EMPLOYEE',
  COMPANY: 'COMPANY',
  EQUIPMENT: 'EQUIPMENT',
  WAREHOUSE: 'WAREHOUSE'
};

export default PageLink;
