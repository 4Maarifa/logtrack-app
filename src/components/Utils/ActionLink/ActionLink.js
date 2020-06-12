import React from 'react';

import UtilsService from './../../../services/utils.service';

import './ActionLink.scss';

const ActionLink = ({ content, url, className }) => {

  const triggerAction = () => {
    window.history.pushState({}, '', url);
    UtilsService.updateObservers();
  };

  return (
    <div className={'ActionLink ' + className || ''} onClick={triggerAction}>
      {content}
    </div>
  );
};

export default ActionLink;
