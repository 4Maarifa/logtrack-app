import React, { useState } from 'react';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../Icon/Icon';

import ModalService from './../../../services/modal.service';

import './Modal.scss';

/**
 * Component: Modal
 * Used to confirm / information
 * 
 * options: { actions, noClose }
 */
const Modal = () => {

  const [isShow, setShow] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [options, setOptions] = useState({ actions: [] });

  const listen = (newTitle, newContent, newOptions) => {
    setTitle(newTitle);
    setContent(newContent);
    setOptions(newOptions);
    setShow(true);
  };

  const onAction = value => {
    ModalService.triggerCallback(value);
    setShow(false);
  };

  ModalService.changeListener(listen);

  /**
   * RENDER
   */
  return (
    <div className={'Modal ' + (isShow ? 'Modal--show ' : '') + (options.noClose ? 'Modal-noClose' : '')}>
      <div className="Modal-back" onClick={() => !options.noClose && onAction('CLOSE')}></div>
      <div className="Modal-content">
        <h1 className="Modal-title">
          {title}
          <button className="flat Modal-close" onClick={() => onAction('CLOSE')}>
            <Icon source="fa" icon={faTimes} />
          </button>
        </h1>
        <div className="Modal-data">{content}</div>
        <div className="Modal-actions">
          {options.actions.map(action =>
            <button key={action.value} value={action.value} onClick={() => onAction(action.value)}>{action.content}</button>  
          )}
          {!options.noClose ? <button key="close" onClick={() => onAction('CLOSE')}>CLOSE</button> : null}
        </div>
      </div>
    </div>
  );
};

export default Modal;
