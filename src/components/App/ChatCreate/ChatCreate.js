import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import ErrorService from './../../../services/error.service';
import EmployeeService from './../../../services/entities/employee.service';
import ChatService from './../../../services/entities/chat.service';
import DateService from './../../../services/date.service';
import DataService from './../../../services/data.service';

import Chat, { EChatType } from './../../../classes/Chat';

import Loader from './../../Utils/Loader/Loader';

import { v4 as uuid } from 'uuid';

const ChatCreate = ({ match }) => {
  const observerKey = uuid();

  const userId = match.params.userid;

  const [creationChatId, setCreationChatId] = useState(null);

  if(!userId) {
    ErrorService('No user was passed for the creation of a chat');
    return <Redirect to={`/dashboard`} />;
  }

  const computeUser = () => {
    EmployeeService.get(userId)
      .then(() => {
        let users = [computed.user.uid, userId];
        const conversationId = uuid();

        ChatService.create(new Chat(
          conversationId,
          computed.user.uid,
          null,
          DateService.getCurrentTimeStampNumber(),
          users,
          EChatType.CHAT_START)
        ).then(() => setCreationChatId(conversationId))
        .catch(ErrorService.manageError);
      })
      .catch(e => {
        ErrorService.manageError(e);
        return <Redirect to={`/dashboard`} />;
      });
  };
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    if(computed.initialized) {
      computeUser();
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);

  if(creationChatId) {
    return <Redirect to={`/chat/${creationChatId}`} />;
  }
  return <Loader />
};

export default ChatCreate;
