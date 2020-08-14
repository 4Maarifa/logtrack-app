import React, { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { faEllipsisV } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../Icon/Icon';

import './ActionList.scss';

/**
 * Conponent: ActionList
 * Collapsible action menu (that is a flat list when on mobile)
 * 
 * actions: [] | The action array
 * isFlatten: boolean | Force flatten list mode
 * isHideLabels: boolean | Only show icons for the actions
 * 
 * An action has:
 * - a title: string
 * - an icon: string
 * - a callback: function OR a link: string OR a pureLink: string
 *    callback: called when clicked
 *    link: link to another view
 *    pureLink: will open a new tab with the link. Useful for external links
 */
const ActionList = ({ actions, isFlatten, isHideLabels }) => {

  // is deployed? if deployed, the action list is printed
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
    <div className={'ActionList ' + (isDeployed ? ' ActionList--deployed ' : '') + (isFlatten ? ' ActionList--flat ' : '') + (isHideLabels || actions.length > 2 ? 'ActionList--manyItems ' : '')}>
      {actions ? <ul>
        {/* Loop through actions */}
        {actions.map(action =>
            <li key={action.title}>
              {action.link ? <NavLink to={action.link} title={action.title}>{renderInner(action)}</NavLink> : null}
              {action.callback ? <button className="white-button flat" title={action.title} onClick={action.callback}>{renderInner(action)}</button> : null}
              {action.pureLink ? <a href={action.pureLink} title={action.title} target="_blank" rel="noopener noreferrer" download={action.isDownload ? '' : null}>{renderInner(action)}</a> : null}
            </li>
        )}
      </ul> : null}

      {/* Main button for triggering the list */}
      {actions && actions.length ? <span className="trigger" onClick={() => setDeployed(!isDeployed)}>
        <Icon source="fa" icon={faEllipsisV} />
      </span> : null}
    </div>
  );
}

export default ActionList;
