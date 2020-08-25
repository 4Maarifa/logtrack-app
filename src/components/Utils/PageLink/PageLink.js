import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import DataService from './../../../services/data.service';

import { ECompanyPlan } from './../../../classes/Company';

import './PageLink.scss';

/**
 * Enum: PageLinkType
 * List different compatible entities that have pages
 */
export const PageLinkType = {
  COMPANY: 'COMPANY',
  CONTRACT: 'CONTRACT',
  EMPLOYEE: 'EMPLOYEE',
  EQUIPMENT: 'EQUIPMENT',
  FORM: 'FORM',
  JOBOFFER: 'JOBOFFER',
  WAREHOUSE: 'WAREHOUSE'
};

/**
 * Enum: PageLinkTypeDetails
 * details of enum PageLinkType
 * 
 * function that returns the link as well as the content
 */
const PageLinkTypeDetails = {
  [PageLinkType.COMPANY]: ({ entityId, entityData, white, noPhoto }) => ({
    link: `/company/${entityId}`,
    content: <Fragment>
      {!noPhoto && entityData.logoURL &&
        <img src={entityData.logoURL} alt="" />
      }
      <span>{entityData.name}</span>
      <span className={'badge company-plan ' + (white ? 'badge-inverse' : '')} title={ECompanyPlan[entityData.plan].name + ' Plan'}>{ECompanyPlan[entityData.plan].solidIcon}</span>
    </Fragment>
  }),
  [PageLinkType.CONTRACT]: ({ entityId, entityData }) => ({
    link: `/contract/${entityId}`,
    content: <Fragment>
      <span>{entityData.identification}</span>
    </Fragment>
  }),
  [PageLinkType.EMPLOYEE]: ({ entityId, entityData, white, noPhoto }) => ({
    link: `/employee/${entityId}`,
    content: <Fragment>
      {!noPhoto && entityData.profilePictureUrl && 
        <img src={entityData.profilePictureUrl} alt="" />
      }
      <span>{entityData.firstname + ' ' + entityData.lastname}</span>
      {DataService.computed.user && entityId === DataService.computed.user.uid && <span className={'badge you ' + (white ? 'badge-inverse' : '')}>you</span>}
      {DataService.computed.employee && entityId === DataService.computed.user.uid && DataService.computed.employee.staff && <span className={'badge staff ' + (white ? 'badge-inverse' : '')}>staff</span>}
    </Fragment>
  }),
  [PageLinkType.EQUIPMENT]: ({ entityId, entityData }) => ({
    link: `/equipment/${entityId}`,
    content: <Fragment>
      <span>{entityData.identification}</span>
    </Fragment>
  }),
  [PageLinkType.FORM]: ({ entityId, entityData }) => ({
    link: `/forms/detail/${entityId}`,
    content: <Fragment>
      <span>{entityData.identification}</span>
    </Fragment>
  }),
  [PageLinkType.JOBOFFER]: ({ entityId, entityData }) => ({
    link: `/joboffer/${entityId}`,
    content: <Fragment>
      <span>{entityData.title}</span>
    </Fragment>
  }),
  [PageLinkType.WAREHOUSE]: ({ entityId, entityData}) => ({
    link: `/warehouse/${entityId}`,
    content: <Fragment>
      <span>{entityData.name}</span>
    </Fragment>
  })
};

/**
 * Component: PageLink
 * Generates a preview of entities as well as link to their page
 * 
 * type: PateLinkType | type of the entity to print
 */
const PageLink = ({ type, entityId, entityData, noLink, white, noPhoto }) => {

  if(!entityData || !entityId) { return null; }

  /**
   * RENDER
   */

   // Get pagelink print function
  const PAGE_LINK = PageLinkTypeDetails[type]({ entityId, entityData, white, noPhoto });

  if(noLink) {
    // If nolink option is passed, only print the content
    return <span className={'PageLink ' + (white ? 'PageLink-white' : '')}>
      {PAGE_LINK.content}
    </span>;
  }

  // Print a navlink with the computed link and content
  return (
    <NavLink className={'PageLink ' + (white ? 'white-link' : '')} to={PAGE_LINK.link} title="Visit Page">
      {PAGE_LINK.content}
    </NavLink>
  );
};

export default PageLink;
