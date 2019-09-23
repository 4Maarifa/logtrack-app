import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';

import EquipmentImage from './../../../assets/equipment.png';
import EmployeeImage from './../../../assets/employee.png';

import './Dashboard.scss';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = Object.assign({
      equipmentCount: null,
      employeeCount: null}, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    this.setState({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setState(computedValues, this.computeValues);
      })
    });
  }

  componentWillUnmount = () => {
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  }

  computeValues() {
    this.computeStats();
  }

  computeStats = () => {
    if(!!this.state.activeRole) {
      DataService.equipment.countAllForCompanyId(this.state.activeRole.companyId)
        .then((equipmentCount) => this.setState({equipmentCount: equipmentCount}))
        .catch(ErrorService.manageError);

      DataService.employee.countAllForCompanyId(this.state.activeRole.companyId)
        .then((employeeCount) => this.setState({employeeCount: employeeCount}))
        .catch(ErrorService.manageError);
    }
  }

  /**
   * RENDER
   */
  render() {
    return (
      <div className="Dashboard">
        {!!this.state.employee && !!this.state.user && <div>
          Welcome back, {this.state.employee.firstname + ' ' + this.state.employee.lastname}!
        </div>}
        <div className="stat-container">
          {!!this.state.equipmentCount && <NavLink className="stat" to={`/equipments`}>
            <span className="stat-image">
              <img src={EquipmentImage} alt="Equipment overlay" />
            </span>
            <span className="stat-description">
              <span className="stat-number">{this.state.equipmentCount}</span>
              <span className="stat-title">Equipments</span>
            </span>
          </NavLink>}
          {!!this.state.employeeCount && <NavLink className="stat" to={`/employees`}>
            <span className="stat-image">
              <img src={EmployeeImage} alt="Employee overlay" />
            </span>
            <span className="stat-description">
              <span className="stat-number">{this.state.employeeCount}</span>
              <span className="stat-title">Employees</span>
            </span>
          </NavLink>}
        </div>
      </div>
    );
  }
}

export default Dashboard;
