
/**
 * class Chat
 * This class represents a chat message
 * 
 * conversationId: string | The conversation id
 * creator: string | The message writer's user id
 * message: string | The message content
 * datetime: number | Minutes / Seconds since 1st January 1970
 * users: string[] | All users in the conversation
 */
class Chat {
  constructor(conversationId, creator, message, datetime, users, chatType) {
    this.conversationId = conversationId;
    this.creator = creator;
    this.message = message;
    this.datetime = datetime;
    this.users = users;
    this.chatType = chatType;
  }
}

export const EChatType = Object.freeze({
  CHAT_START: 'CHAT_START',
  CHAT_MESSAGE: 'CHAT_MESSAGE',
  CHAT_MODIFY_USERS: 'CHAT_MODIFY_USERS',
});


export default Chat;
