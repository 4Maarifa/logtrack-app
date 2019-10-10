import React from 'react';
import { NavLink } from 'react-router-dom';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import './ActionButton.scss';

class ActionButton extends ComponentSafeUpdate {
  constructor () {
    super();
    this.state = {
      icon: null,
      actions: [],

      deployed: false
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({icon: this.props.icon, actions: this.props.actions});
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
  }

  toggleDisplay = () => {
    this.setStateSafe({deployed: !this.state.deployed});
  }

  /**
   * RENDER
   */
  render() {
    return (
      <div className={'ActionButton ' + (!!this.state.deployed ? 'ActionButton--deployed':'')}>
        <ul>
          {this.state.actions.map(action =>
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
        <span className="button" onClick={() => this.toggleDisplay()}>
          {!!this.state.icon && this.state.icon}
        </span>
      </div>
    );
  }
}

export default ActionButton;
