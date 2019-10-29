import React from 'react';
import { NavLink } from 'react-router-dom';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import './ActionButton.scss';

class ActionButton extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = {
      icon: props.icon,
      actions: props.actions,

      deployed: false
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  toggleDisplay = () => this.setState({deployed: !this.state.deployed});

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
