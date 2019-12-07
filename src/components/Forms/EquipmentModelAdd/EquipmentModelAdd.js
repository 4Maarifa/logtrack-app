import React from 'react';
import { Redirect } from 'react-router-dom';
import { faUser } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';

import EquipmentModel from './../../../classes/EquipmentModel';

import './EquipmentModelAdd.scss';

class EquipmentModelAdd extends ComponentSafeUpdate{
  constructor (props) {
    super(props);
    this.state = Object.assign({
      equipmentModelId: null,

      forceRedirect: false
    },
    DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues(computedValues => {
        if(!computedValues.activeRole) {
          ErrorService.warning('Please activate a role to add an equipment!');
          this.setState({forceRedirect: true});
        }
        this.setState(computedValues);
      })
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  onFormInputChange = (value, fieldName) => this.setState({[fieldName]: value});

  handleSubmit = event => {
    event.preventDefault();

    EquipmentModelService.create(new EquipmentModel());
  };

  /**
   * RENDER
   */
  render() {
    if(!!this.state.forceRedirect) {
      return <Redirect to={`/dashboard`} />;
    }
    if(!this.state.employee) {
      return (<div></div>);
    }
    else if(!!this.state.equipmentModelId) {
      return <Redirect to={`/equipment-add`} />;
    } 
    else {
      return (
        <div className="EquipmentModelAdd">
          <h1>Add an Equipment Model</h1>
          <form onSubmit={this.handleSubmit}>

            

            {/* Creator */}
            <div className="input-creator">
              <span className="fake-label">
                <Icon source="fa" icon={faUser} />
                Creator
              </span>
              <span>
                {this.state.employee.firstname + ' ' + this.state.employee.lastname}
              </span>
            </div>

            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}

export default EquipmentModelAdd;
