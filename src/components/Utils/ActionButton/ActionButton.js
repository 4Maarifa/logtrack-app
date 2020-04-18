import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './ActionButton.scss';

const ActionButton = ({ icon, actions }) => {

  const [isDeployed, setDeployed] = useState(false);

  /**
   * RENDER
   */
  return (
    <div className={'ActionButton ' + (isDeployed ? 'ActionButton--deployed' : '')}>
      <ul>
        {actions.map(action =>
            <li key={action.title}>
              <NavLink to={action.link}>
                <span className="action-title">
                  {action.title}
                </span>
                <span className="action-icon">
                  {action.icon}
                </span>
              </NavLink>
            </li>
        )}
      </ul>
      <span className="button" onClick={() => setDeployed(!isDeployed)}>
        {icon}
      </span>
    </div>
  );
}

export default ActionButton;
