import React, { useRef, useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { faCommentPlus, faUser, faTimes, faComment, faPaperPlane, faCaretDown, faCheck, faChevronRight, faChevronLeft } from '@fortawesome/pro-solid-svg-icons';

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
import { v4 as uuid } from 'uuid';

import './Chat.scss';

/**
 * Component: Chat
 * Used by users to interact with each other
 */
const Chat = ({ match }) => {
  const observerKey = uuid();
  const selectedChatId = match.params.chatid;

  const [chats, setChats] = useState({});
  const [users, setUsers] = useState({});

  const [inputValue, setInputValue] = useState('');

  const [isCreateFormDeployed, setCreateFormDeployed] = useState(false);
  const [possibleUsersInput, setPossibleUsersInput] = useState('');
  const [possibleUsers, setPossibleUsers] = useState({});
  const [selectedUsers, setSelectedUsers] = useState({});
  const [autoSuggestValue, setAutoSuggestValue] = useState({
    key: '',
    item: null
  });

  const [creationFormChatId, setCreationFormChatId] = useState(null);

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const chatContainer = useRef(null);

  const updateScrollOfChatContainer = () => {
    setTimeout(() => {
      if(chatContainer.current) {
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
      }
    }, 200);
  };

  const computeUsers = userIds => (
    EmployeeService.getAllForIdList(userIds)
      .then(setUsers)
      .catch(ErrorService.manageError)
  );

  const deleteSelectedUser = userId => {
    let newSelectedUsers = selectedUsers;
    delete newSelectedUsers[userId];
    setSelectedUsers(newSelectedUsers);
  };

  const getUsersOfConversation = conversationId => {
    if(!chats[conversationId]) {
      return [];
    }
    const conversationLength = Object.keys(chats[conversationId]).length;
    // Return users of the last message of the conversation
    return chats[conversationId][
      Object.keys(chats[conversationId])[conversationLength - 1]
    ].users;
  };

  const onUserAutoCompleteChange = value => {
    setPossibleUsersInput(value);
    if(value.trim().length < 3) {
      setPossibleUsers({});
    }
    else {
      EmployeeService.search(value)
      .then(users => {
        let possibleUsers = {};
        Object.keys(users).forEach(userId => {
          possibleUsers[userId] = {
            content: <span>{users[userId].firstname + ' ' + users[userId].lastname}</span>,
            value: users[userId]
          }
        });
        setPossibleUsers(possibleUsers);
      }).catch(ErrorService.manageError);
    }
  }

  const onSelectedUserItemChange = (selectedUserId, _, selectedUserItem) => {
    if(!selectedUserItem) { return; }
    
    let newSelectedUsers = selectedUsers;
    newSelectedUsers[selectedUserId] = selectedUserItem.value;
    setSelectedUsers(newSelectedUsers);
    setAutoSuggestValue({ key: '', item: null });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if(!selectedChatId) {
      ErrorService.error('Please select a conversation!');
      return;
    }

    if(!inputValue) {
      ErrorService.error('Please enter a message!');
      return;
    }

    const chatMessage = new ChatClass(
      selectedChatId,
      DataService.computed.user.uid,
      inputValue,
      DateService.getCurrentTimeStampNumber(),
      getUsersOfConversation(selectedChatId),
      EChatType.CHAT_MESSAGE
    );

    ChatService.create(chatMessage)
      .then(chatDoc => {
        let newChats = chats;
        newChats[selectedChatId][chatDoc.id] = chatMessage;
        
        setInputValue('');
        setChats(newChats);
      })
      .catch(ErrorService.manageError);
  };

  const computeChats = () => {
    let newChats = {}, userIds = [];

    return new Promise((resolve, reject) => {
      ChatService.getAllForUserId(computed.user.uid)
        .then(chatDocs => {
          Object.keys(chatDocs).forEach(chatDocKey => {
            if(!newChats[chatDocs[chatDocKey].conversationId]) {
              newChats[chatDocs[chatDocKey].conversationId] = {};
            }
            newChats[chatDocs[chatDocKey].conversationId][chatDocKey] = chatDocs[chatDocKey];
            userIds.push(...chatDocs[chatDocKey].users);
          });
          computeUsers(UtilsService.removeDuplicateFromArray(userIds))
            .then(resolve)
            .catch(e => ErrorService.manageErrorThenReject(e, reject));

          setChats(newChats);
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  };

  const createConversation = () => {
    const conversationId = uuid();

    if(!Object.keys(selectedUsers).length) {
      ErrorService.error('Please select at least one user');
      return;
    }

    let users = Object.keys(selectedUsers);
    // We push current user in conversation users : he's part of the conversation too!
    users.push(computed.user.uid);
    users = UtilsService.removeDuplicateFromArray(users);

    // Create a CHAT_START message to indicate this is the start of the conversation
    ChatService.create(new ChatClass(
        conversationId,
        computed.user.uid,
        null,
        DateService.getCurrentTimeStampNumber(),
        users,
        EChatType.CHAT_START)
      ).then(() => {
        computeChats()
          .then(() => setCreationFormChatId(conversationId))
          .catch(ErrorService.manageError);
      }).catch(ErrorService.manageError);
  };

  useEffect(() => updateScrollOfChatContainer, [chats]);

  useEffect(() => {
    if(computed.initialized) {
      computeChats();
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);

  if(!computed.initialized) { return null; }

  if(creationFormChatId) {
    const chatId = `/chat/${creationFormChatId}`;
    return <Redirect to={chatId} />;
  }
  let messageDateTime = new Date(0);

  return (
    <div className={'Chat ' + (selectedChatId ? 'chat-selected' : '')}>
      <div className="selection">
        <ul>
          {Object.keys(chats).map(chatKey =>
            <li className={'conversation-link ' + (chatKey === selectedChatId ? 'conversation-link--active':'')} key={chatKey}>
              <NavLink to={`/chat/${chatKey}`}>
                {getUsersOfConversation(chatKey)
                  .filter(userId => userId !== computed.user.uid && users[userId])
                  .map(userId => users[userId].firstname + ' ' + users[userId].lastname)
                  .join(', ')}
              </NavLink>
              <Icon source="fa" icon={faChevronRight} />
            </li>
          )}
        </ul>
        <span className={'conversation-create ' + (isCreateFormDeployed ? 'conversation-create--deployed' : '')} onClick={() => setCreateFormDeployed(!isCreateFormDeployed)}>
          <Icon source="fa" icon={faCommentPlus} />
          Create a new conversation
          <Icon containerclassname="arrow-icon" source="fa" icon={faCaretDown} />
        </span>
        <div className={'conversation-create-form ' + (isCreateFormDeployed ? 'conversation-create-form--deployed' : '')}>
          <FormDebounceAutoSuggestInput
            value={possibleUsersInput}
            label={
              <span>
                <Icon source="fa" icon={faUser} />
                Add User
              </span>
            }
            possibleItems={possibleUsers}
            onValueChange={onUserAutoCompleteChange}
            onSelectedItemChange={onSelectedUserItemChange}
            inputAutoComplete="off"
            selectedItem={autoSuggestValue.item}
            selectedItemKey={autoSuggestValue.key}
            inputRequired
            instructions={
              <span>Pick a user</span>
            } />
          <ul className="selected-users">
            {Object.keys(selectedUsers).map(userId => <li key={userId}>
              <span>{selectedUsers[userId].firstname + ' ' + selectedUsers[userId].lastname}</span>
              <Icon source="fa" icon={faTimes} onClick={() => deleteSelectedUser(userId)} />
            </li>)}
          </ul>
          <div className="conversation-create-actions">
            <button className="conversation-create-cancel" onClick={() => setCreateFormDeployed(!isCreateFormDeployed)}>
              <Icon source="fa" icon={faTimes} />
            </button>
            <button className="conversation-create-validate" onClick={createConversation}>
              <Icon source="fa" icon={faCheck} />
              Create
            </button>
          </div>
        </div>
      </div>
      <div className="conversation">
        {selectedChatId && chats[selectedChatId] && <span className="conversation-top">
          <NavLink className="return-link" to={`/chat`}>
            <Icon source="fa" icon={faChevronLeft} />
            Return
          </NavLink>
          {getUsersOfConversation(selectedChatId)
            .filter(userId => userId !== computed.user.uid && users[userId])
            .map(userId => users[userId].firstname + ' ' + users[userId].lastname)
            .join(', ')}
        </span>}
        {selectedChatId && chats[selectedChatId] && <div className="conversation-content" ref={chatContainer}>
          <ul>
          {Object.keys(chats[selectedChatId])
            .sort((a, b) => -(chats[selectedChatId][b].datetime - chats[selectedChatId][a].datetime))
            .map(chatMessageKey => {

              if(chats[selectedChatId][chatMessageKey].chatType === EChatType.CHAT_START) {
                return <li key={chatMessageKey} className="conversation-step">
                  This is the start of your conversation
                </li>;
              }
              if(chats[selectedChatId][chatMessageKey].chatType === EChatType.CHAT_START) {
                return <li key={chatMessageKey} className="conversation-step">
                  Users of this conversation were modified
                </li>;
              }
              let printDate = DateService.getDifference(
                DateService.getDateFromTimeStampNumber(chats[selectedChatId][chatMessageKey].datetime),
                messageDateTime
              ) > (5 * 60 * 1000);

              messageDateTime = DateService.getDateFromTimeStampNumber(chats[selectedChatId][chatMessageKey].datetime);
              return <li key={chatMessageKey} className={'message ' + 
                  (chats[selectedChatId][chatMessageKey].creator === computed.user.uid ? 'message-me' : 'message-others')}>

                {printDate && <span className="message-date">{
                  DateService.isToday(DateService.getDateFromTimeStampNumber(chats[selectedChatId][chatMessageKey].datetime)) ?
                    DateService.getTimeString(DateService.getDateFromTimeStampNumber(chats[selectedChatId][chatMessageKey].datetime))
                    : DateService.getDateTimeString(DateService.getDateFromTimeStampNumber(chats[selectedChatId][chatMessageKey].datetime), false)
                }</span>}
                <span className="message-content">{chats[selectedChatId][chatMessageKey].message}</span>
              </li>;
          })}
          </ul>
        </div>}
        {selectedChatId && <form className="conversation-bottom" onSubmit={handleSubmit}>
          <FormInput 
            inputType="text"
            value={inputValue}
            inputAutoComplete="off"
            label={
              <span>
                <Icon source="fa" icon={faComment} />
                Message
              </span>}
            onValueChange={setInputValue} />
            <button className="send-action">
              <Icon source="fa" icon={faPaperPlane} />
              <span>Send</span>
            </button>
            <span className={'send-notice ' + (inputValue ? 'send-notice--active' : '')}>
              <Icon source="custom" icon="EnterKey" />
              to send
            </span>
        </form>}
        {!selectedChatId && <span className="conversation-notice">Please select a conversation or start a new one!</span>}
      </div>
    </div>
  );
};

export default Chat;
