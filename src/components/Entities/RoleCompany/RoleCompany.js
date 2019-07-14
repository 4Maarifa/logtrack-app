import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './RoleCompany.css';

import Role from '../Role/Role';

class RoleCompany extends Component {
  constructor () {
    super();
    this.state = {
      roles: [],
      company: null,
      options: {}
    };
  }

  componentDidMount = () => {
    this.setState({company: this.props.company, roles: this.props.roles, options: this.props.options});
  }

  render() {
    if (!this.state.company || !Object.keys(this.state.roles).length) {
      return (<></>);
    }
    var companyId = Object.keys(this.state.company)[0];
    
    return (
      <div>
        <img width="20" height="20" alt={this.state.company[companyId].name + '\'s logo'} 
            src={this.state.company[companyId].logoURL} /><br/>
        
        <Link to={`/company/${companyId}`}>
          {this.state.company[companyId].name}
        </Link> =>
        {Object.keys(this.state.roles).map((roleKey) => 
          <Role key={roleKey} role={ { [roleKey]: this.state.roles[roleKey] } }></Role>
        )}
      </div>
    );
  }
}

export default RoleCompany;
