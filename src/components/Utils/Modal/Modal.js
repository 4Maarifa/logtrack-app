import React, { useState } from 'react';

import ModalService from './../../../services/modal.service';

import './Modal.scss';

/**
 * Component: Modal
 * Used to confirm / information
 */
const Modal = () => {

  const [isShow, setShow] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [actions, setActions] = useState([]);
  const [callback, setCallback] = useState(null);

  const listen = (newTitle, newContent, newActions, newCallback) => {
    setTitle(newTitle);
    setContent(newContent);
    setActions(newActions);
    setCallback(newCallback);
  };

  const onAction = value => {
    callback && callback(value);
    setShow(false);
  };

  ModalService.changeListener(listen);

  /**
   * RENDER
   */
  return (
    <div className={'Modal ' + (isShow ? 'Modal--show' : '')}>
      <div className="Modal-content">
        <h1>{title}</h1>
        <div>{content}</div>
        <div className="actions">
          {actions.map(action =>
            <button key={action.value} value={action.value} onClick={() => onAction(action.value)}>{action.content}</button>  
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
