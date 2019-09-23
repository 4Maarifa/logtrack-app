import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './ActionButton.scss';

class ActionButton extends Component {
  constructor () {
    super();
    this.state = {
      icon: null,
      actions: [],

      deployed: false
    };
  }

  componentDidMount = () => {
    this.setState({icon: this.props.icon, actions: this.props.actions});
  }

  toggleDisplay = () => {
    this.setState({deployed: !this.state.deployed});
  }

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
