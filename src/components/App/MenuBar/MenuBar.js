import React, { Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { faComments, faExclamationTriangle, faBell, faCalendarAlt, faEnvelope } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../services/data.service';

import { ERole } from './../../../classes/Role';

import Icon from './../../Utils/Icon/Icon';

import { v4 as uuid } from 'uuid';

import './MenuBar.scss';

const MenuBar = () => {

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);
  
  if(!computed.initialized) { return null; }

  if(!computed.user) { return null; }

  /**
   * RENDER
   */
  const renderRolePart = () => (
    <Fragment>
      <NavLink className="nav-soon" activeClassName="nav--active" to={`/`} title="Calendar" exact>
        <Icon source="fa" icon={faCalendarAlt} />
      </NavLink>
      <NavLink className="nav-soon" activeClassName="nav--active" to={`/`} title="Mail" exact>
        <Icon source="fa" icon={faEnvelope} />
      </NavLink>
      <NavLink className="nav-soon" activeClassName="nav--active" to={`/`} title="Chat" exact>
        <Icon source="fa" icon={faComments} />
        <span className="badge badge-inverse">...</span>
      </NavLink>
      {computed.activeRole && computed.activeRole.role === ERole.MANAGER && <NavLink className="nav-soon" activeClassName="nav--active" to={`/`} title="Alerts" exact>
          <Icon source="fa" icon={faExclamationTriangle} />
      </NavLink>}
      <NavLink className="nav-soon" activeClassName="nav--active" to={`/`} title="Notifications" exact>
          <Icon source="fa" icon={faBell} />
      </NavLink>
    </Fragment>
  );

  return (
    <div className="MenuBar">
      {renderRolePart()}
    </div>
  );
};

export default MenuBar;
