import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faSignOut, faUser, faCog, faUserHeadset, faLock, faBug, faIndent, faUserCog, faDatabase, faPortrait } from '@fortawesome/pro-solid-svg-icons';

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
      {computed.employee && computed.user &&
        <div>
          Welcome back, <PageLink type={PageLinkType.EMPLOYEE} entityId={computed.user.uid} entityData={computed.employee} />!
          <Link to={`/signout`} className="signout">
            <Icon source="fa" icon={faSignOut} />
            Sign Out
          </Link>
        </div>
      }
      <Tabs default="root" horizontalLayout tabs={{
        root: {
          name: () => <span>
            <Icon source="fa" icon={faUserCog} />
            <span>Home</span>
          </span>,
          content: () => <ProfileRootTab />
        },
        account: {
          name: () => <span>
            <Icon source="fa" icon={faUser} />
            <span>Account</span>
          </span>,
          content: () => <AccountTab />
        },
        security: {
          name: () => <span>
            <Icon source="fa" icon={faLock} />
            <span>Security</span>
          </span>,
          content: () => <SecurityTab />
        },
        support: {
          name: () => <span>
            <Icon source="fa" icon={faUserHeadset} />
            <span>Support</span>
          </span>,
          content: () => <SupportTab />
        },
        pro: {
          name: () => <span>
            <Icon source="fa" icon={faPortrait} />
            <span>Professional</span>
          </span>,
          content: () => <ProfessionalProfileTab />
        },
        settings: {
          name: () => <span>
            <Icon source="fa" icon={faCog} />
            <span>Settings</span>
          </span>,
          content: () => <SettingsTab />
        },
        clearfix: { clearfix: true },
        device: {
          name: () => <span>
            <Icon source="fa" icon={faBug} />
            <span>Debug</span>
          </span>,
          content: () => <Debug initialData={UserAgentService.getAll()} isLive />
        },
        terms: {
          name: () => <span>
            <Icon source="fa" icon={faIndent} />
            <span>Terms</span>
          </span>,
          content: () => <TermsTab />
        },
        data: {
          name: () => <span>
            <Icon source="fa" icon={faDatabase} />
            <span>Data</span>
          </span>,
          content: () => <DataTab />
        }
      }} />
    </div>
  );
};

export default Profile;
