import React from 'react';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import Role from '../Role/Role';

import './RoleCompany.scss';

class RoleCompany extends ComponentSafeUpdate {
  constructor () {
    super();
    this.state = {
      roles: [],
      company: null,
      options: {}
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({
      company: this.props.company, 
      roles: this.props.roles, 
      options: this.props.options
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
  }

  render() {
    if (!this.state.company || !Object.keys(this.state.roles).length) {
      return (<></>);
    }
    var companyId = Object.keys(this.state.company)[0];
    
    return (
      <div className="RoleCompany">
        <img width="20" height="20" alt={this.state.company[companyId].name + '\'s logo'} 
            src={this.state.company[companyId].logoURL} /><br/>
        
        {this.state.company[companyId].name} =>
        {Object.keys(this.state.roles).map((roleKey) => 
          <Role key={roleKey} role={ { [roleKey]: this.state.roles[roleKey] } } options={this.state.options}></Role>
        )}
      </div>
    );
  }
}

export default RoleCompany;
