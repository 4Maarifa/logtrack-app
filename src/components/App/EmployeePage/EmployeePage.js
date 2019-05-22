import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './EmployeePage.css';
import DataService from '../../../services/data.service';
import ErrorService from '../../../services/error.service';

class EmployeePage extends Component {
  constructor () {
    super();
    this.state = {
      employeeId: null,
      employee: null,
      rolesByCompany: {}
    }
  }

  componentDidMount = () => {
    this.setState({employeeId: this.props.match.params.id}, this.fetchEmployeeInfos);
  }

  fetchEmployeeInfos = () => {
    DataService.employee.get(this.state.employeeId)
      .then((employeeDoc) => {
        this.setState({employee: employeeDoc.data()});
      })
      .catch(ErrorService.manageError);
    
    DataService.role.getRolesForEmployeeId(this.state.employeeId)
      .then((querySnapshot) => {
        var rolesByCompany = {};
        querySnapshot.forEach((roleDoc) => {
          const companyId = roleDoc.data().companyId;

          if(!rolesByCompany[companyId]) {
            rolesByCompany[companyId] = {roles: {}};

            DataService.company.get(companyId)
              .then((companyDoc) => {
                rolesByCompany[companyId].company = companyDoc.data();
                this.setState({rolesByCompany: rolesByCompany});
              })
              .catch(ErrorService.manageError);
          }

          rolesByCompany[companyId].roles[roleDoc.id] = roleDoc.data();
        });
        this.setState({rolesByCompany: rolesByCompany});
      })
      .catch(ErrorService.manageError);
  }

  renderRolesByCompany = () => {
    if (!this.state.rolesByCompany) {
      return (<div></div>);
    }
    var roles = [];
    Object.keys(this.state.rolesByCompany).forEach((companyId) => {
      if(!!this.state.rolesByCompany[companyId].company) {
        var rolesForCompany = [];
        Object.keys(this.state.rolesByCompany[companyId].roles).forEach((roleKey) => {
          rolesForCompany.push(this.state.rolesByCompany[companyId].roles[roleKey].role);
        });

        roles.push(<li key={companyId}>
          <img width="20" height="20" alt={this.state.rolesByCompany[companyId].company.name + '\'s logo'} src={this.state.rolesByCompany[companyId].company.logoURL} /><br/>
          <Link to={`/company/${companyId}`}>
            {this.state.rolesByCompany[companyId].company.name}
          </Link> =>
          {rolesForCompany}
        </li>);
      }
    });
    return roles;
  }

  render() {
    if (!this.state.employee) {
      return (<div></div>);
    }
    return (
      <div>
        <img width="20" height="20" src={this.state.employee.profilePictureUrl} alt={this.state.employee.firstname + ' ' + this.state.employee.lastname + '\'s photo'} />
        <h1>{this.state.employee.firstname + ' ' + this.state.employee.lastname}</h1>
        {this.renderRolesByCompany()}
      </div>
    );
  }
}

export default EmployeePage;
