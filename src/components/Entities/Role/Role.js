import React, { Component } from 'react';

import DataService from '../../../services/data.service';
import UtilsService from '../../../services/utils.service';

import { RoleIcons } from '../../../classes/enums/ERole';

import './Role.scss';

class Role extends Component {
  constructor () {
    super();
    this.state = {
      role: null,
      actions: null,

      options: null
    };
  }

  componentDidMount = () => {
    this.setState({role: this.props.role, options: this.props.options});
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
      <div className="Role">
        {RoleIcons[this.state.role[roleId].role]}
        {UtilsService.capitalize(this.state.role[roleId].role)}<br/>
        {!!this.state.options.showActions && this.state.actions}
      </div>
    );
  }
}

export default Role;
