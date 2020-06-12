import React, { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { faEllipsisV } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../Icon/Icon';

import './ActionList.scss';

const ActionList = ({ actions, isFlatten }) => {

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
    <div className={'ActionList ' + (isDeployed ? ' ActionList--deployed ' : '') + (isFlatten ? ' ActionList--flat ' : '')}>
      {actions ? <ul>
        {actions.map(action =>
            <li key={action.title}>
              {action.link ? <NavLink to={action.link}>{renderInner(action)}</NavLink> : null}
              {action.callback ? <button className="white-button flat" onClick={action.callback}>{renderInner(action)}</button> : null}
              {action.pureLink ? <a href={action.pureLink} target="_blank" rel="noopener noreferrer">{renderInner(action)}</a> : null}
            </li>
        )}
      </ul> : null}
      {actions && actions.length ? <span className="trigger" onClick={() => setDeployed(!isDeployed)}>
        <Icon source="fa" icon={faEllipsisV} />
      </span> : null}
    </div>
  );
}

export default ActionList;
