import React, { useState, useEffect } from 'react';
import { faUser, faUserHeadset, faLock, faPortrait, faCog, faBug, faExclamationTriangle, 
  faIndent, faDatabase } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../../services/data.service';

import Employee from './../../../Entities/Employee/Employee';

import Icon from './../../../Utils/Icon/Icon';
import ActionLink from './../../../Utils/ActionLink/ActionLink';

import { v4 as uuid } from 'uuid';

/**
 * Component: ProfileRootTab
 * Tab of Profile component
 * 
 * Root of profile and settings
 */
const ProfileRootTab = () => {

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
  return <div className="tab-content">
    {/* Showing current empoyee entity */}
    <div className="Element Element--page">
      <Employee employee={{ [computed.user.uid]: computed.employee }} isPage />
    </div>

    {/* All links to profile and settings sections */}
    <div className="profile-root-content">
      <ActionLink url="/profile?tab=account" className="Element--full-width Element Element--tile" content={
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faUser} />
            <div className="Element-data">
              <span className="Element-title">
                Modify your account's details.
              </span>
            </div>
          </div>
        </div>} />
      <ActionLink url="/profile?tab=security" className="Element Element--tile" content={
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faLock} />
            <div className="Element-data">
              <span className="Element-title">
                Security
              </span>
              <span className="sub">
                Change your password &amp; Review your account's activity.
              </span>
            </div>
          </div>
        </div>} />
      <ActionLink url="/profile?tab=support" className="Element Element--tile" content={
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faUserHeadset} />
            <div className="Element-data">
              <span className="Element-title">
                Support
              </span>
              <span className="sub">
                Got a Question? Encounter a bug? Let us know.
              </span>
            </div>
          </div>
        </div>} />
      <ActionLink url="/profile?tab=pro" className="Element--full-width Element Element--tile" content={
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faPortrait} />
            <div className="Element-data">
              <span className="Element-title">
                Looking for a new job?
              </span>
              <span className="sub">
                Update your Professional Profile now!
              </span>
            </div>
          </div>
        </div>} />
      <ActionLink url="/profile?tab=settings" className="Element Element--tile" content={
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faCog} />
            <div className="Element-data">
              <span className="Element-title">
                Your LogTrack's settings.
              </span>
            </div>
          </div>
        </div>} />
      <ActionLink url="/profile?tab=device" className="Element Element--tile" content={
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faBug} />
            <div className="Element-data">
              <span className="Element-title">
                Your Debug Info.
              </span>
              <span className="sub">
                <Icon source="fa" icon={faExclamationTriangle} /> For confirmed users only!
              </span>
            </div>
          </div>
        </div>} />
      <ActionLink url="/profile?tab=terms" className="Element Element--tile" content={
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faIndent} />
            <div className="Element-data">
              <span className="Element-title">
                Last LogTrack's Terms &amp; Conditions.
              </span>
            </div>
          </div>
        </div>} />
      <ActionLink url="/profile?tab=data" className="Element Element--tile" content={
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faDatabase} />
            <div className="Element-data">
              <span className="Element-title">
                Your activity on LogTrack.
              </span>
            </div>
          </div>
        </div>} />
    </div>
  </div>;
};

export default ProfileRootTab;
