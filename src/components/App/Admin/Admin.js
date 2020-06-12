import React from 'react';
import { faComment, faUserHeadset } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import Tabs from './../../Utils/Tabs/Tabs';

import AdminSupportTab from './tabs/AdminSupportTab';
import AdminContactTab from './tabs/AdminContactTab';

import './Admin.scss';

/**
 * Component: Admin
 */
const Admin = () => (
  <div className="Admin">
    <Tabs default="support" tabs={{
      support: {
        name: () => <span>
          <Icon source="fa" icon={faUserHeadset} />
          Support
        </span>,
        content: () => <AdminSupportTab />
      },
      order: {
        name: () => <span>
          <Icon source="fa" icon={faComment} />
          Contact
        </span>,
        content: () => <AdminContactTab />
      }
    }} />
  </div>
);

export default Admin;
