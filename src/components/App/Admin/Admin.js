import React from 'react';
import { faComment, faUserHeadset, faStar, faTruck, faPlus } from '@fortawesome/pro-light-svg-icons';
import { faComment as faCommentSolid, faUserHeadset as faUserHeadsetSolid, faStar as faStarSolid,
        faTruck as faTruckSolid } from '@fortawesome/pro-solid-svg-icons';


import Icon from './../../Utils/Icon/Icon';
import Tabs from './../../Utils/Tabs/Tabs';

import AdminSupportTab from './tabs/AdminSupportTab';
import AdminContactTab from './tabs/AdminContactTab';
import AdminBrandTab from './tabs/AdminBrandTab';
import AdminEquipmentModelTab from './tabs/AdminEquipmentModelTab';
import AdminEquipmentModelCreationTab from './tabs/AdminEquipmentModelCreationTab';

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
      },

      clearfix: {
        clearfix: true
      },

      // Brand list tab
      brands: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faStarSolid : faStar} />
          Brand List
        </span>,
        content: () => <AdminBrandTab />
      },

      // Model list tab
      models: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faTruckSolid : faTruck} />
          Model List
        </span>,
        content: () => <AdminEquipmentModelTab />
      },

      // Model creation assistant
      model_creation: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faTruckSolid : faTruck} additionalSource="fa" additional={faPlus} />
          Model Creation
        </span>,
        content: () => <AdminEquipmentModelCreationTab />
      }

    }} isHorizontalLayout />
  </div>
);

export default Admin;
