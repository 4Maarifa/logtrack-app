import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { faEllipsisV } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../Icon/Icon';

import './ActionList.scss';

const ActionList = ({ actions, isFlatten }) => {

  const [isDeployed, setDeployed] = useState(false);

  /**
   * RENDER
   */
  return (
    <div className={'ActionList ' + (isDeployed ? ' ActionList--deployed ' : '') + (isFlatten ? ' ActionList--flat ' : '')}>
      {actions ? <ul>
        {actions.map(action =>
            <li key={action.title}>
              {action.link ? 
                <NavLink to={action.link}>
                  <span className="action-title">{action.title}</span>
                  <span className="action-icon">{action.icon}</span>
                </NavLink> :
                <button className="white-button flat" onClick={action.callback}>
                  <span className="action-title">{action.title}</span>
                  <span className="action-icon">{action.icon}</span>
                </button>
              }
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
