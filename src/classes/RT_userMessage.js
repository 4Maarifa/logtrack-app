import React from 'react';
import { faComments, faEnvelope, faCalendarAlt } from '@fortawesome/pro-solid-svg-icons';
import { faComments as faCommentsLight,
        faEnvelope as faEnvelopeLight,
        faCalendarAlt as faCalendarAltLight } from '@fortawesome/pro-light-svg-icons';

import DateService from './../services/date.service';

import Calendar from './../components/App/MenuBar/Calendar/Calendar';
import Messages from './../components/App/MenuBar/Messages/Messages';
import Chat from './../components/App/MenuBar/Chat/Chat';

/**
 * class RT_userMessage
 * represents a RT message shared between some users
 */
class RT_userMessage {
  constructor(type, creationIsoDate, content, creator, users, metadata, revision) {
    this.type = ERT_userMessage[type];
    this.creationIsoDate = creationIsoDate;
    this.content = content;
    this.creator = creator;
    this.users = users;
    this.metadata = metadata;
    this.revision = revision;
  }
}

export const ERT_userMessage = {
  CALENDAR: 'CALENDAR',
  MESSAGES: 'MESSAGES',
  CHAT: 'CHAT'
};

export const ERT_userMessageDetails = {
  [ERT_userMessage.CALENDAR]: {
    title: 'Calendar',
    icons: {
      active: faCalendarAlt,
      inactive: faCalendarAltLight
    },
    buildMetadata: (color, date, end, description, location) => ({
      color,
      date,
      end,
      description,
      location
    }),
    verifyMetadata: metadata => metadata.date && metadata.color,
    render: rt => <Calendar rt={rt} />,
    countBadge: rt => {
      return Object.values(rt).filter(rtMessage => 
        rtMessage.metadata.end && 
        DateService.getRelativeDifference(DateService.getDateFromIsoString(rtMessage.metadata.date)) < 0 &&
        DateService.getRelativeDifference(DateService.getDateFromIsoString(rtMessage.metadata.end)) > 0
      ).length
    },
    buildPublicInfo: () => ({ noPublic: true }),
    buildPrivateInfo: () => ({ noPrivate: true })
  },
  [ERT_userMessage.MESSAGES]: {
    title: 'Messages',
    icons: {
      active: faEnvelope,
      inactive: faEnvelopeLight
    },
    buildMetadata: object => ({
      object
    }),
    verifyMetadata: metadata => metadata.object,
    render: rt => <Messages rt={rt} />,
    countBadge: rt => {
      return 0;
    },
    buildPublicInfo: () => ({ noPublic: true }),
    buildPrivateInfo: () => ({ noPrivate: true })
  },
  [ERT_userMessage.CHAT]: {
    title: 'Chat',
    icons: {
      active: faComments,
      inactive: faCommentsLight
    },
    buildMetadata: conversationId => ({
      conversationId
    }),
    verifyMetadata: metadata => metadata.conversationId,
    render: rt => <Chat rt={rt} />,
    countBadge: rt => {
      return 0;      
    },
    buildPublicInfo: () => ({ noPublic: true }),
    buildPrivateInfo: () => ({ noPrivate: true })
  }
};

export default RT_userMessage;