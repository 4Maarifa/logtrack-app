import React from 'react';
import { faExclamationTriangle, faBellOn } from "@fortawesome/pro-solid-svg-icons";
import { faTriangle, faBell } from '@fortawesome/pro-light-svg-icons';

import Alerts from '../components/App/MenuBar/Alerts/Alerts';
import Notifications from '../components/App/MenuBar/Notifications/Notifications';

import { ERole } from './Role';

/**
 * class RT_companyMessage
 * represents a RT message shared between some company users that have a specific role
 * 
 * TODO: Implement company RT messages
 * 
 * type: ERT_companyMessage | Type of RT message
 * creationIsoDate: string | Creation date, as iso string
 * content: string | content of the event
 * creator: string | Creator of the RT Message (employeeId)
 * roles: [ERole] | Roles that have rights to read this message
 * metadata: Object | Metadata of the RT Message, as built by the ERT_companyMessage.buildMetadata function.
 *  Can also be verified by the function ERT_companyMessage.verifyMetadata function
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

/**
 * Enum: ERT_companyMessage
 * Describes the type of the RT Message
 */
export const ERT_companyMessage = {
  ALERTS: 'ALERTS',
  NOTIFICATIONS: 'NOTIFICATIONS'
};

/**
 * Enum: ERT_companyMessageDetails
 * Details about the enum ERT_companyMessage
 * 
 * title: string | Printable label
 * icons: { active: FA/IconDefinition, inactive: FA/IconDefinition } | Set of icons for active / inactive menu
 * buildMetadata: function | Build a metadata object for this kind of message
 * verifyMetadata: function | Verify, for a given message, that metadata is well build and there are no missing fields
 * remder: function | return HTMLElement to print RT messages
 * countBadge: function | count important events to print the number in a badge
 */
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
