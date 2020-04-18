import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import ErrorService from './../../../services/error.service';
import DataService from './../../../services/data.service';

import { ECompanyPlan } from './../../../classes/Company';

import './PageLink.scss';

const PageLink = ({ type, entityId, entityData, noLink, white }) => {

  if(!entityData) { return null; }

  const getPageLink = () => {
    switch(type) {
      case PageLinkType.EMPLOYEE:
        return {
          link: `/employee/${entityId}`,
          content: <Fragment>
            {entityData.profilePictureUrl && 
              <img src={entityData.profilePictureUrl} alt="" />
            }
            <span>{entityData.firstname + ' ' + entityData.lastname}</span>
            {DataService.computed.user && entityId === DataService.computed.user.uid && <span className="badge you">you</span>}
          </Fragment>
        };
      case PageLinkType.COMPANY:
        return {
          link: `/company/${entityId}`,
          content: <Fragment>
            {entityData.logoURL &&
              <img src={entityData.logoURL} alt="" />
            }
            <span>{entityData.name}</span>
            <span className="mention badge company-plan" title={ECompanyPlan[entityData.plan].name + ' Plan'}>{ECompanyPlan[entityData.plan].solidIcon}</span>
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
          link: `/warehouse/${entityId}`,
          content: <Fragment>
            <span>{entityData.name}</span>
          </Fragment>
        };
      default:
        ErrorService.manageError('PageLink: The type ' + type + ' is not recognized');
        return null;
    }
  };

  /**
   * RENDER
   */
  const pageLink = getPageLink();
  if(noLink) {
    return <span className={'PageLink ' + (white ? 'PageLink-white' : '')}>
      {pageLink.content}
    </span>;
  }
  return (
    <NavLink className={'PageLink ' + (white ? 'white-link' : '')} to={pageLink.link} title="Visit Page">
      {pageLink.content}
    </NavLink>
  );
};

export const PageLinkType = {
  EMPLOYEE: 'EMPLOYEE',
  COMPANY: 'COMPANY',
  EQUIPMENT: 'EQUIPMENT',
  WAREHOUSE: 'WAREHOUSE'
};

export default PageLink;
