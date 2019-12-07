import React from 'react';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import DataService from './../../../services/data.service';
import RoleService from './../../../services/entities/role.service';
import DateService from './../../../services/date.service';

import { RoleDetails } from './../../../classes/Role';

import './Role.scss';

class Role extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = {
      actions: null
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
    if(!this.props.role) {
      return (<div></div>);
    }
    var roleId = Object.keys(this.props.role)[0];

    return (
      <div
       className={'Role ' + (!!DataService.computed.employee && DataService.computed.employee.activeRoleId === roleId ? 'Role--active' : '')} 
       title={'' + (!this.props.role[roleId].revokedIsoDate ? 
        'Requested on ' + DateService.getMonthYearString(DateService.getDateFromIsoString(this.props.role[roleId].creationIsoDate)) : 
        'Revoked on ' + DateService.getMonthYearString(DateService.getDateFromIsoString(this.props.role[roleId].revokedIsoDate))) }
       data-id={roleId}>
        <span>
          {RoleDetails[this.props.role[roleId].role].icon}
          {RoleDetails[this.props.role[roleId].role].name}
          {!!DataService.computed.employee && DataService.computed.employee.activeRoleId === roleId && <span className="badge">active</span> }
        </span>
        {this.state.actions}
      </div>
    );
  }
}

export default Role;
