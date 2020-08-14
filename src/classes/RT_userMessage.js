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
 * 
 * type: ERT_userMessage | Type of the RT Message
 * creationIsoDate: string | creation date, as iso string
 * creator: string | The creator id (employeeId)
 * users: {string: publicInfo} | Users that are concerned by this RT Message (in addition to the creator)
 * metadata: Object | Metadata of the RT Message, as built by the ERT_companyMessage.buildMetadata function.
 *  Can also be verified by the function ERT_companyMessage.verifyMetadata function
 * revision: string | unique identifier of the message. Different for each message + different for each edition
 *  if the message is changed (any change), the revision is different. So if the id is the same but not the revision, it means something has changed in the message.
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

/**
 * Enum: ERT_userMessage
 * Type of the RT Message
 */
export const ERT_userMessage = {
  CALENDAR: 'CALENDAR',
  MESSAGES: 'MESSAGES',
  CHAT: 'CHAT'
};

/**
 * Enum: ERT_userMessageDetails
 * Details about the enum ERT_userMessage
 * 
 * title: string | printable label
 * icons: { active: FA/IconDefinition, inactive: FA/IconDefinition } | icons that are printed for that type of RT Message
 * buildMetadata: function | Build a metadata object for this kind of message
 * verifyMetadata: function | Verify, for a given message, that metadata is well build and there are no missing fields
 * remder: function | return HTMLElement to print RT messages
 * countBadge: function | count important events to print the number in a badge
 * buildPublicInfo: function | In the users field, the key if the employeeId and the data is the publicInfo.
 *  It's the related info about the message that every other concerned user has access to (example: Is this user has seen the message?)
 * buildPrivateInfo: function | Private info is recorded in the users part, not in the message.
 *  Although, it concerns the message and can save any private information about the message (Is the email flagged?)
 */
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