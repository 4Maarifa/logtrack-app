import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';

import './ActionButton.scss';

/**
 * Component: ActionButton
 * Floating button that print other actions when deployed
 * 
 * Action button accepts two parameters:
 * icon: HTML of the initial button (the floating one). Any HTML will do
 * actions: an array of actions.
 * 
 * An action has:
 * - a title: string
 * - an icon: string
 * - a callback: function OR a link: string OR a pureLink: string
 *    callback: called when clicked
 *    link: link to another view
 *    pureLink: will open a new tab with the link. Useful for external links
 */
const ActionButton = ({ icon, actions }) => {

  // is deployed? if deployed, the action button will show child actions
  const [isDeployed, setDeployed] = useState(false);

  /**
   * RENDER
   */
  const renderInner = action => (
    <Fragment>
      <span className="action-title">{action.title}</span>
      <span className="action-icon">{action.icon}</span>
    </Fragment>
  );

  return (
    <div className={'ActionButton ' + (isDeployed ? 'ActionButton--deployed' : '')}>
      <ul>
        {/* Loop through actions */}
        {actions.map(action =>
            <li key={action.title}>
              {action.link ? <NavLink to={action.link}>{renderInner(action)}</NavLink> : null}
              {action.callback ? <button className="white-button flat" onClick={action.callback}>{renderInner(action)}</button> : null}
              {action.pureLink ? <a href={action.pureLink} title={action.title} target="_blank" rel="noopener noreferrer" download={action.isDownload ? '' : null}>{renderInner(action)}</a> : null}
            </li>
        )}
      </ul>

      {/* Main button */}
      <span className="button" onClick={() => setDeployed(isDeployed => !isDeployed)}>
        {icon}
      </span>
    </div>
  );
}

export default ActionButton;
