import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faSignOut, faUser, faCog, faUserHeadset, faLock, faBug, faIndent, faUserCog, 
  faDatabase, faPortrait } from '@fortawesome/pro-light-svg-icons';
import { faUser as faUserSolid, faUserCog as faUserCogSolid, faLock as faLockSolid,
  faBug as faBugSolid, faPortrait as faPortraitSolid, faUserHeadset as faUserHeadsetSolid,
  faDatabase as faDatabaseSolid, faIndent as faIndentSolid, faCog as faCogSolid } from '@fortawesome/pro-solid-svg-icons';

import Tabs from './../../Utils/Tabs/Tabs';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import UserAgentService from './../../../services/useragent.service';
import DataService from './../../../services/data.service';

import AccountTab from './tabs/AccountTab';
import SecurityTab from './tabs/SecurityTab';
import SupportTab from './tabs/SupportTab';
import Debug from '../../Utils/Debug/Debug';
import ProfessionalProfileTab from './../Jobs/tabs/ProfessionalProfileTab';
import DataTab from './tabs/DataTab';
import TermsTab from './tabs/TermsTab';
import SettingsTab from './tabs/SettingsTab';
import ProfileRootTab from './tabs/ProfileRootTab';

import { v4 as uuid } from 'uuid';

import './Profile.scss';

/**
 * Component: Profile
 * Used by everyone to access their account, settings and sign out
 */
const Profile = () => {

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
  return (
    <div className="Profile">
      {/* Sign out link */}
      {computed.employee && computed.user &&
        <div>
          Welcome back, <PageLink type={PageLinkType.EMPLOYEE} entityId={computed.user.uid} entityData={computed.employee} />!
          <Link to={`/signout`} className="signout">
            <Icon source="fa" icon={faSignOut} />
            Sign Out
          </Link>
        </div>
      }

      {/* All links to different sections of the profile and settings */}
      <Tabs default="root" isHorizontalLayout tabs={{
        root: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faUserCogSolid : faUserCog} />
            <span>Home</span>
          </span>,
          content: () => <ProfileRootTab />
        },
        account: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faUserSolid : faUser} />
            <span>Account</span>
          </span>,
          content: () => <AccountTab />
        },
        security: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faLockSolid : faLock} />
            <span>Security</span>
          </span>,
          content: () => <SecurityTab />
        },
        support: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faUserHeadsetSolid : faUserHeadset} />
            <span>Support</span>
          </span>,
          content: () => <SupportTab />
        },
        pro: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faPortraitSolid : faPortrait} />
            <span>Professional</span>
          </span>,
          content: () => <ProfessionalProfileTab />
        },
        settings: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faCogSolid : faCog} />
            <span>Settings</span>
          </span>,
          content: () => <SettingsTab />
        },
        clearfix: { clearfix: true },
        device: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faBugSolid : faBug} />
            <span>Debug</span>
          </span>,
          content: () => <Debug initialData={UserAgentService.getAll()} isLive />
        },
        terms: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faIndentSolid : faIndent} />
            <span>Terms</span>
          </span>,
          content: () => <TermsTab />
        },
        data: {
          name: ({ isActive }) => <span>
            <Icon source="fa" icon={isActive ? faDatabaseSolid : faDatabase} />
            <span>Data</span>
          </span>,
          content: () => <DataTab />
        }
      }} />
    </div>
  );
};

export default Profile;
