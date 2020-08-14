import React from 'react';

import UtilsService from './../../../services/utils.service';

import './ActionLink.scss';

/**
 * Component: ActionLink
 * This component is a link that modify the URL
 * This is useful for components that rely on URL change to update
 * 
 * content: content of the button
 */
const ActionLink = ({ content, url, className }) => {

  // The trigger action don't do anything apart pushing the new URL and 
  // triggering the URL observer
  const triggerAction = () => {
    window.history.pushState({}, '', url);
    UtilsService.url.updateObservers();
  };

  return (
    <div className={'ActionLink ' + className || ''} onClick={triggerAction}>
      {content}
    </div>
  );
};

export default ActionLink;
