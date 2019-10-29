import React from 'react';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import RoleService from './../../../services/entities/role.service';
import UtilsService from './../../../services/utils.service';

import { RoleIcons } from './../../../classes/Role';

import './Role.scss';

class Role extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = {
      role: props.role,
      actions: null,

      options: props.options
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
    RoleService.observeActions(this.props.role, actions => this.setState({actions}));
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  render() {
    if(!this.state.role) {
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
