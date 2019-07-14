import React, { Component } from 'react';

import './Role.css';
import DataService from '../../../services/data.service';

class Role extends Component {
  constructor () {
    super();
    this.state = {
      role: null,
      actions: null
    };
  }

  componentDidMount = () => {
    this.setState({role: this.props.role});
    DataService.role.observeActions(this.props.role, this.observeActions);
  }

  observeActions = (actions) => {
    this.setState({actions: actions})
  }

  render() {
    if (!this.state.role) {
      return (<div></div>);
    }
    var roleId = Object.keys(this.state.role)[0];

    return (
      <div>
        {this.state.role[roleId].role}<br/>
        {this.state.role[roleId].status}
        {this.state.actions}
      </div>
    );
  }
}

export default Role;
