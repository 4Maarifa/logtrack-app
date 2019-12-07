import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { faCommentPlus, faUser, faTimes, faComment, faPaperPlane, faCaretDown, faCheck, faChevronRight, faChevronLeft } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Utils/Icon/Icon';
import FormDebounceAutoSuggestInput from './../../Utils/FormElements/FormDebounceAutoSuggestInput/FormDebounceAutoSuggestInput';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import ChatService from './../../../services/entities/chat.service';
import UtilsService from './../../../services/utils.service';
import EmployeeService from './../../../services/entities/employee.service';
import DateService from './../../../services/date.service';

import ChatClass, { EChatType } from './../../../classes/Chat';

import './Chat.scss';

const uuidv4 = require('uuid/v4');

/**
 * Component: Chat
 * Used by users to interact with each other
 */
class Chat extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({
        chats: {},
        users: {},

        inputValue: '',

        createFormDeployed: false,
        possibleUsers: {},
        selectedUsers: {},
        autoSuggestValue: {
          key: '',
          item: null
        },

        selectedChatId: props.match.params.chatid,

        creationFormChatId: null
      }, 
      DataService.computed.getDefaultComputedValues());

    this.chatContainer = React.createRef();
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues(computedValues => {
        this.setState(computedValues, this.computeChats);
      })
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if(Object.keys(nextState.users).length !== Object.keys(this.state.users).length) {
      this.setState({users: nextState.users});
    }
    if(Object.keys(nextState.chats).length !== Object.keys(this.state.chats).length) {
      this.setState({chats: nextState.chats});
    }
    if(nextProps.match.params.chatid !== this.state.selectedChatId) {
      this.setState({selectedChatId: nextProps.match.params.chatid}, this.updateScrollOfChatContainer);
    }
    return true;
  };

  onMessageInputChange = inputValue => this.setState({inputValue});

  onUserAutoCompleteChange = value => {
    if(value.trim().length < 3) {
      this.setState({possibleUsers: {}});
    }
    else {
      Promise.all([
        EmployeeService.searchOnFirstname(value),
        EmployeeService.searchOnLastname(value)
      ])
      .then(values => {
        let possibleUsers = {};
        values.forEach(querySnapshot => {
          querySnapshot.forEach(userDoc => {
            possibleUsers[userDoc.id] = {
              content: <span>{userDoc.data().firstname + ' ' + userDoc.data().lastname}</span>,
              value: userDoc.data()
            }
          });
        });
        this.setState({possibleUsers});
      }).catch(ErrorService.manageError);
    }
  };

  onSelectedUserItemChange = (selectedUserId, _, selectedUserItem) => {
    if(!selectedUserItem) { return; }
    
    var selectedUsers = this.state.selectedUsers;
    selectedUsers[selectedUserId] = selectedUserItem.value;
    this.setState({ selectedUsers, autoSuggestValue: { key: '', item: null } });
  };

  handleSubmit = event => {
    event.preventDefault();

    if(!this.state.selectedChatId) {
      ErrorService.error('Please select a conversation!');
      return;
    }

    if(!this.state.inputValue) {
      ErrorService.error('Please enter a message!');
      return;
    }

    const chatMessage = new ChatClass(
      this.state.selectedChatId,
      DataService.computed.user.uid,
      this.state.inputValue,
      DateService.getCurrentTimeStampNumber(),
      this.getUsersOfConversation(this.state.selectedChatId),
      EChatType.CHAT_MESSAGE
    );

    ChatService.create(chatMessage)
      .then(chatDoc => {
        let chats = this.state.chats;
        chats[this.state.selectedChatId][chatDoc.id] = chatMessage;
        this.setState({chats, inputValue: ''}, this.updateScrollOfChatContainer);
      })
      .catch(ErrorService.manageError);
  };

  toggleCreateFormDeployed = () => this.setState({createFormDeployed: !this.state.createFormDeployed});

  computeChats = () => {
    let chats = {}, userIds = [];

    return new Promise((resolve, reject) => {
      ChatService.getAllForUserId(this.state.user.uid)
        .then(chatDocs => {
          Object.keys(chatDocs).forEach(chatDocKey => {
            if(!chats[chatDocs[chatDocKey].conversationId]) {
              chats[chatDocs[chatDocKey].conversationId] = {};
            }
            chats[chatDocs[chatDocKey].conversationId][chatDocKey] = chatDocs[chatDocKey];
            userIds.push(...chatDocs[chatDocKey].users);
          });
          this.computeUsers(UtilsService.removeDuplicateFromArray(userIds))
            .then(resolve)
            .catch(e => ErrorService.manageErrorThenReject(e, reject));

          this.setState({chats}, this.updateScrollOfChatContainer);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  };

  updateScrollOfChatContainer = () => {
    if(!!this.chatContainer.current) {
      setTimeout(() => {
        this.chatContainer.current.scrollTop = this.chatContainer.current.scrollHeight;
      }, 200);
    }
  };

  computeUsers = userIds => (
    EmployeeService.getAllForIdList(userIds)
      .then(users => this.setState({users}))
      .catch(ErrorService.manageError)
  );

  deleteSelectedUser = userId => {
    let selectedUsers = this.state.selectedUsers;
    delete selectedUsers[userId];
    this.setState({selectedUsers});
  };

  createConversation = () => {
    const conversationId = uuidv4();

    if(!Object.keys(this.state.selectedUsers).length) {
      ErrorService.error('Please select at least one user');
      return;
    }

    let users = Object.keys(this.state.selectedUsers);
    // We push current user in conversation users : he's part of the conversation too!
    users.push(this.state.user.uid);
    users = UtilsService.removeDuplicateFromArray(users);

    // Create a CHAT_START message to indicate this is the start of the conversation
    ChatService.create(new ChatClass(
        conversationId,
        this.state.user.uid,
        null,
        DateService.getCurrentTimeStampNumber(),
        users,
        EChatType.CHAT_START)
      ).then(() => {
        this.computeChats()
          .then(() => this.setState({creationFormChatId: conversationId}))
          .catch(ErrorService.manageError);
      }).catch(ErrorService.manageError);
  };

  getUsersOfConversation = conversationId => {
    if(!this.state.chats[conversationId]) {
      return [];
    }
    const conversationLength = Object.keys(this.state.chats[conversationId]).length;
    // Return users of the last message of the conversation
    return this.state.chats[conversationId][
      Object.keys(this.state.chats[conversationId])[conversationLength - 1]
    ].users;
  };

  /**
   * RENDER
   */
  render() {
    if(!!this.state.creationFormChatId) {
      const chatId = `/chat/${this.state.creationFormChatId}`;
      return <Redirect to={chatId} />;
    }
    let messageDateTime = new Date(0);
    return (
      <div className={'Chat ' + (!!this.state.selectedChatId ? 'chat-selected' : '')}>
        <div className="selection">
          <ul>
            {Object.keys(this.state.chats).map(chatKey =>
              <li className={'conversation-link ' + (chatKey === this.state.selectedChatId ? 'conversation-link--active':'')} key={chatKey}>
                <NavLink to={`/chat/${chatKey}`}>
                  {this.getUsersOfConversation(chatKey)
                    .filter(userId => userId !== this.state.user.uid && !!this.state.users[userId])
                    .map(userId => this.state.users[userId].firstname + ' ' + this.state.users[userId].lastname)
                    .join(', ')}
                </NavLink>
                <Icon source="fa" icon={faChevronRight} />
              </li>
            )}
          </ul>
          <span className={'conversation-create ' + (this.state.createFormDeployed ? 'conversation-create--deployed' : '')} onClick={this.toggleCreateFormDeployed}>
            <Icon source="fa" icon={faCommentPlus} />
            Create a new conversation
            <Icon containerclassname="arrow-icon" source="fa" icon={faCaretDown} />
          </span>
          <div className={'conversation-create-form ' + (this.state.createFormDeployed ? 'conversation-create-form--deployed' : '')}>
            <FormDebounceAutoSuggestInput
              label={
                <span>
                  <Icon source="fa" icon={faUser} />
                  Add User
                </span>
              }
              possibleItems={this.state.possibleUsers}
              onValueChange={this.onUserAutoCompleteChange}
              onSelectedItemChange={this.onSelectedUserItemChange}
              inputAutoComplete="off"
              selectedItem={this.state.autoSuggestValue.item}
              selectedItemKey={this.state.autoSuggestValue.key}
              inputRequired
              instructions={
                <span>Pick a user</span>
              } />
            <ul className="selected-users">
              {Object.keys(this.state.selectedUsers).map(userId => <li key={userId}>
                <span>{this.state.selectedUsers[userId].firstname + ' ' + this.state.selectedUsers[userId].lastname}</span>
                <Icon source="fa" icon={faTimes} onClick={() => this.deleteSelectedUser(userId)} />
              </li>)}
            </ul>
            <div className="conversation-create-actions">
              <button className="conversation-create-cancel" onClick={this.toggleCreateFormDeployed}>
                <Icon source="fa" icon={faTimes} />
              </button>
              <button className="conversation-create-validate" onClick={this.createConversation}>
                <Icon source="fa" icon={faCheck} />
                Create
              </button>
            </div>
          </div>
        </div>
        <div className="conversation">
          {!!this.state.selectedChatId && !!this.state.chats[this.state.selectedChatId] && <span className="conversation-top">
            <NavLink className="return-link" to={`/chat`}>
              <Icon source="fa" icon={faChevronLeft} />
              Return
            </NavLink>
            {this.getUsersOfConversation(this.state.selectedChatId)
              .filter(userId => userId !== this.state.user.uid && !!this.state.users[userId])
              .map(userId => this.state.users[userId].firstname + ' ' + this.state.users[userId].lastname)
              .join(', ')}
          </span>}
          {!!this.state.selectedChatId && !!this.state.chats[this.state.selectedChatId] && <div className="conversation-content" ref={this.chatContainer}>
            <ul>
            {Object.keys(this.state.chats[this.state.selectedChatId])
              .sort((a, b) => -(this.state.chats[this.state.selectedChatId][b].datetime - this.state.chats[this.state.selectedChatId][a].datetime))
              .map(chatMessageKey => {

                if(this.state.chats[this.state.selectedChatId][chatMessageKey].chatType === EChatType.CHAT_START) {
                  return <li key={chatMessageKey} className="conversation-step">
                    This is the start of your conversation
                  </li>;
                }
                if(this.state.chats[this.state.selectedChatId][chatMessageKey].chatType === EChatType.CHAT_START) {
                  return <li key={chatMessageKey} className="conversation-step">
                    Users of this conversation were modified
                  </li>;
                }
                let printDate = DateService.getDifference(
                  DateService.getDateFromTimeStampNumber(this.state.chats[this.state.selectedChatId][chatMessageKey].datetime),
                  messageDateTime
                ) > (5 * 60 * 1000);

                messageDateTime = DateService.getDateFromTimeStampNumber(this.state.chats[this.state.selectedChatId][chatMessageKey].datetime);
                return <li key={chatMessageKey} className={'message ' + 
                    (this.state.chats[this.state.selectedChatId][chatMessageKey].creator === this.state.user.uid ? 'message-me' : 'message-others')}>

                  {!!printDate && <span className="message-date">{
                    DateService.isToday(DateService.getDateFromTimeStampNumber(this.state.chats[this.state.selectedChatId][chatMessageKey].datetime)) ?
                      DateService.getTimeString(DateService.getDateFromTimeStampNumber(this.state.chats[this.state.selectedChatId][chatMessageKey].datetime))
                      : DateService.getDateTimeString(DateService.getDateFromTimeStampNumber(this.state.chats[this.state.selectedChatId][chatMessageKey].datetime), false)
                  }</span>}
                  <span className="message-content">{this.state.chats[this.state.selectedChatId][chatMessageKey].message}</span>
                </li>;
            })}
            </ul>
          </div>}
          {!!this.state.selectedChatId && <form className="conversation-bottom" onSubmit={this.handleSubmit}>
            <FormInput 
              inputType="text"
              value={this.state.inputValue}
              inputAutoComplete="off"
              label={
                <span>
                  <Icon source="fa" icon={faComment} />
                  Message
                </span>}
              onValueChange={this.onMessageInputChange} />
              <button className="send-action">
                <Icon source="fa" icon={faPaperPlane} />
                <span>Send</span>
              </button>
              <span className={'send-notice ' + (!!this.state.inputValue ? 'send-notice--active' : '')}>
                <Icon source="custom" icon="EnterKey" />
                to send
              </span>
          </form>}
          {!this.state.selectedChatId && <span className="conversation-notice">Please select a conversation or start a new one!</span>}
        </div>
      </div>
    );
  }
}

export default Chat;
