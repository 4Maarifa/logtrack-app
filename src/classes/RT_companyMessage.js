import React from 'react';

import { faExclamationTriangle, faBellOn } from "@fortawesome/pro-solid-svg-icons";
import { faTriangle, faBell } from '@fortawesome/pro-light-svg-icons';

import Alerts from '../components/App/MenuBar/Alerts/Alerts';
import Notifications from '../components/App/MenuBar/Notifications/Notifications';

import { ERole } from './Role';

/**
 * class RT_companyMessage
 * represents a RT message shared between some company users that have a specific role
 */
class RT_companyMessage {
  constructor(type, creationIsoDate, content, creator, roles, metadata) {
    this.type = ERT_companyMessage[type];
    this.creationIsoDate = creationIsoDate;
    this.content = content;
    this.creator = creator;
    this.roles = roles.map(role => ERole[role]);
    this.metadata = metadata;
  }
}

export const ERT_companyMessage = {
  ALERTS: 'ALERTS',
  NOTIFICATIONS: 'NOTIFICATIONS'
};


export const ERT_companyMessageDetails = {
  [ERT_companyMessage.ALERTS]: {
    title: 'Alerts',
    icons: {
      active: faExclamationTriangle,
      inactive: faTriangle
    },
    buildMetadata: () => ({
      
    }),
    verifyMetadata: metadata => metadata.conversationId,
    render: rt => <Alerts rt={rt} />,
    countBadge: rt => {
      return 0;
    }
  },
  [ERT_companyMessage.NOTIFICATIONS]: {
    title: 'Notifications',
    icons: {
      active: faBellOn,
      inactive: faBell
    },
    buildMetadata: () => ({
      
    }),
    verifyMetadata: metadata => metadata.conversationId,
    render: rt => <Notifications rt={rt} />,
    countBadge: rt => {
      return 0;      
    }
  },
};

export default RT_companyMessage;
