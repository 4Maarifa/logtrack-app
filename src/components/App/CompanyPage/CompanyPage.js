import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './CompanyPage.css';
import DataService from '../../../services/data.service';
import ErrorService from '../../../services/error.service';

class CompanyPage extends Component {
  constructor () {
    super();
    this.state = {
      companyId: null,
      company: null,
      rolesByEmployee: {}
    }
  }

  componentDidMount = () => {
    this.setState({companyId: this.props.match.params.id}, this.fetchCompanyInfos);
  }

  fetchCompanyInfos = () => {
    DataService.company.get(this.state.companyId)
      .then((companyDoc) => {
        this.setState({company: companyDoc.data()});
      })
      .catch(ErrorService.manageError);

    DataService.role.getRolesForCompanyId(this.state.companyId)
      .then((querySnaphot) => {
        var rolesByEmployee = {};
        querySnaphot.forEach((roleDoc) => {
          const employeeId = roleDoc.data().employeeId;

          if(!rolesByEmployee[employeeId]) {
            rolesByEmployee[employeeId] = {roles: {}};

            DataService.employee.get(employeeId)
              .then((employeeDoc) => {
                rolesByEmployee[employeeId].employee = employeeDoc.data();
                this.setState({rolesByEmployee: rolesByEmployee});
              })
              .catch(ErrorService.manageError);
          }

          rolesByEmployee[employeeId].roles[roleDoc.id] = roleDoc.data();
        });
        this.setState({rolesByEmployee: rolesByEmployee});
      })
      .catch(ErrorService.manageError);
  }

  renderRolesByEmployee = () => {
    if(!this.state.rolesByEmployee) {
      return (<div></div>);
    }
    var roles = [];
    Object.keys(this.state.rolesByEmployee).forEach((employeeId) => {
      if(!!this.state.rolesByEmployee[employeeId].employee) {
        var rolesForEmployee = [];
        Object.keys(this.state.rolesByEmployee[employeeId].roles).forEach((roleKey) => {
          rolesForEmployee.push(this.state.rolesByEmployee[employeeId].roles[roleKey].role);
        });

        roles.push(<li key={employeeId}>
          <img width="20" height="20" src={this.state.rolesByEmployee[employeeId].employee.profilePictureUrl} alt={this.state.rolesByEmployee[employeeId].employee.firstname + ' ' + this.state.rolesByEmployee[employeeId].employee.lastname + '\'s photo'} />
          <Link to={`/employee/${employeeId}`}>
            {this.state.rolesByEmployee[employeeId].employee.firstname + ' ' + this.state.rolesByEmployee[employeeId].employee.lastname}
          </Link> =>
          {rolesForEmployee}
        </li>);
      }
    });
    return roles;
  }

  render() {
    if (!this.state.company) {
      return (<div></div>);
    }
    return (
      <div>
        <img width="20" height="20" alt={this.state.company.name + '\'s logo'} src={this.state.company.logoURL} /><br/>
        <h1>{this.state.company.name}</h1>
        {this.renderRolesByEmployee()}
      </div>
    );
  }
}

export default CompanyPage;
