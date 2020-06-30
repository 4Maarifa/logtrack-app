import React from 'react';
import { faComment, faUserHeadset } from '@fortawesome/pro-light-svg-icons';
import { faComment as faCommentSolid, faUserHeadset as faUserHeadsetSolid } from '@fortawesome/pro-solid-svg-icons';


import Icon from './../../Utils/Icon/Icon';
import Tabs from './../../Utils/Tabs/Tabs';

import AdminSupportTab from './tabs/AdminSupportTab';
import AdminContactTab from './tabs/AdminContactTab';

import './Admin.scss';

/**
 * Component: Admin
 * Let admin have access to contact and support messages
 */
const Admin = () => (
  <div className="Admin">
    <Tabs default="support" tabs={{

      // Support Messages Tab
      support: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faUserHeadsetSolid : faUserHeadset} />
          Support
        </span>,
        content: () => <AdminSupportTab />
      },

      // Contact Messages tab
      contact: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faCommentSolid : faComment} />
          Contact
        </span>,
        content: () => <AdminContactTab />
      }
    }} />
  </div>
);

export default Admin;
