import React, { Fragment } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { faRectangleWide, faEdit, faTruck, faUser, faBuilding } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Utils/Icon/Icon';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import Choose from './../../Utils/Choose/Choose';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import BrandService from './../../../services/entities/brand.service';
import EquipmentModelService from './../../../services/entities/equipmentModel.service';
import EquipmentService from './../../../services/entities/equipment.service';

import Equipment from './../../../classes/Equipment';
import { EEquipmentModelTypeDetails, EEquipmentModelSubTypeDetails } from './../../../classes/EquipmentModel';

import './EquipmentAdd.scss';

class EquipmentAdd extends ComponentSafeUpdate {
  constructor (props) {
    super(props);

    this.state = Object.assign({
        equipmentId: null, 
        identification: '',

        equipmentModels: {},
        brands: {},

        selectedEquipmentType: null,
        selectedEquipmentSubType: null,
        selectedEquipmentModelId: null,

        forceRedirect: false
    }, DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        if(!computedValues.activeRole) {
          ErrorService.warning('Please activate a role to add an equipment!');
          this.setState({forceRedirect: true});
        }
        this.setState(computedValues, this.computeModels);
      })
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  shouldComponentUpdate = (_, nextState) => {
    if(nextState.selectedEquipmentType !== this.state.selectedEquipmentType) {
      this.setState({selectedEquipmentType: nextState.selectedEquipmentType});
    }
    if(nextState.selectedEquipmentSubType !== this.state.selectedEquipmentSubType) {
      this.setState({selectedEquipmentSubType: nextState.selectedEquipmentSubType});
    }
    return true;
  };

  computeModels = () => {
    BrandService.list()
      .then(brands => this.setState({brands: brands}))
      .catch(ErrorService.manageError);

    EquipmentModelService.list()
      .then(equipmentModels => this.setState({equipmentModels: equipmentModels}))
      .catch(ErrorService.manageError);
  };

  onFormInputChange = (value, fieldName) => this.setState({[fieldName]: value});

  handleSubmit = event => {
    event.preventDefault();

    if(!this.state.selectedEquipmentModelId) {
      ErrorService.error('Please pick a model or create one!');
      return;
    }
    
    EquipmentService.create(new Equipment(this.state.activeRole.companyId, this.state.identification, this.state.selectedEquipmentModelId, DateService.getCurrentIsoDateString()))
      .then(equipmentDoc => {
        this.setState({equipmentId: equipmentDoc.id});
      })
      .catch(ErrorService.manageError);
  };

  handleSelection = (value, fieldName) => {
    if(fieldName === 'selectedEquipmentType' && !value) {
      this.setState({
        selectedEquipmentType: null, 
        selectedEquipmentSubType: null,
        selectedEquipmentModelId: null
      });
    } 
    else if(fieldName === 'selectedEquipmentSubType' && !value) {
      this.setState({
        selectedEquipmentSubType: null,
        selectedEquipmentModelId: null
      });
    }
    else {
      this.setState({[fieldName]: value});
    }
  };

  filterEquipmentModels = (type, subType = null) => {
    var equipmentModels = {};
    if(!subType) {
      Object.keys(this.state.equipmentModels)
        .filter(key => this.state.equipmentModels[key].type === type)
        .forEach(key => equipmentModels[key] = this.state.equipmentModels[key]);
    }
    else {
      Object.keys(this.state.equipmentModels)
        .filter(key => this.state.equipmentModels[key].type === type)
        .filter(key => this.state.equipmentModels[key].subType === subType)
        .forEach(key => equipmentModels[key] = this.state.equipmentModels[key]);
    }
    return equipmentModels;
  };

  /** 
   * RENDER
   */
  renderModels = () => {
    if(!this.state.equipmentModels || !Object.keys(this.state.equipmentModels).length) {
      return (<div></div>);
    }
    var equipmentTypes = {}, equipmentSubTypes = {}, equipmentModels = {};

    Object.keys(EEquipmentModelTypeDetails).forEach(key => {
      equipmentTypes[key] = {
        content: <Fragment>
          {EEquipmentModelTypeDetails[key].icon}
          {EEquipmentModelTypeDetails[key].name}
        </Fragment>,
        disabled: !Object.keys(this.filterEquipmentModels(key)).length
      };
    });

    if(!!this.state.selectedEquipmentType) {
      Object.keys(EEquipmentModelSubTypeDetails[this.state.selectedEquipmentType]).forEach(key => {
        equipmentSubTypes[key] = {
          content: <Fragment>
            {EEquipmentModelSubTypeDetails[this.state.selectedEquipmentType][key].icon}
            {EEquipmentModelSubTypeDetails[this.state.selectedEquipmentType][key].name}
          </Fragment>,
          disabled: !Object.keys(this.filterEquipmentModels(this.state.selectedEquipmentType, key)).length
        };
      });
    }

    if(!!this.state.selectedEquipmentType && !!this.state.selectedEquipmentSubType) {
      Object.keys(this.filterEquipmentModels(this.state.selectedEquipmentType, this.state.selectedEquipmentSubType)).forEach(key => {
        equipmentModels[key] = {
          content: <Fragment>
            <img src={this.state.equipmentModels[key].photoUrl}
              alt={this.state.equipmentModels[key].name + '\'s photo'} />
            {this.state.equipmentModels[key].name}
          </Fragment>
        }
      });
    }

    return <div className="model-selection">
      <div className="model-result">
        <h3>Equipment Type</h3>
        {!!this.state.selectedEquipmentType &&
          <Fragment>
            {EEquipmentModelTypeDetails[this.state.selectedEquipmentType].icon}
            {EEquipmentModelTypeDetails[this.state.selectedEquipmentType].name}
            <span className="action" onClick={() => this.handleSelection(null, 'selectedEquipmentType')}>
              <Icon source="fa" icon={faEdit} />
            </span>
          </Fragment>
        }
      </div>
      
      {!this.state.selectedEquipmentType && 
        <Choose items={equipmentTypes} 
          multiple={false} 
          fieldName="selectedEquipmentType"
          onSelectionChange={this.handleSelection} />
      }
      
      {!!this.state.selectedEquipmentType &&
        <Fragment>
          <div className="model-result">
            <h3>Equipment Sub-type</h3>
            {!!this.state.selectedEquipmentSubType &&
              <Fragment>
                {EEquipmentModelSubTypeDetails[this.state.selectedEquipmentType][this.state.selectedEquipmentSubType].icon}
                {EEquipmentModelSubTypeDetails[this.state.selectedEquipmentType][this.state.selectedEquipmentSubType].name}
                <span className="action" onClick={() => this.handleSelection(null, 'selectedEquipmentSubType')}>
                  <Icon source="fa" icon={faEdit} />
                </span>
              </Fragment>
            }
          </div>
          {!this.state.selectedEquipmentSubType &&
            <Choose items={equipmentSubTypes} 
              multiple={false} 
              fieldName="selectedEquipmentSubType"
              onSelectionChange={this.handleSelection} />
          }
        </Fragment>
      }

      {!!this.state.selectedEquipmentType && !!this.state.selectedEquipmentSubType &&
        <Fragment>
          <div className="model-result">
            <h3>Equipment Model</h3>
            {!!this.state.selectedEquipmentModelId &&
              <Fragment>
                <img src={this.state.equipmentModels[this.state.selectedEquipmentModelId].photoUrl}
                  alt={this.state.equipmentModels[this.state.selectedEquipmentModelId].name + '\'s photo'} />
                {this.state.equipmentModels[this.state.selectedEquipmentModelId].name}
                <span className="action" onClick={() => this.handleSelection(null, 'selectedEquipmentModelId')}>
                  <Icon source="fa" icon={faEdit} />
                </span>
              </Fragment>
            }
          </div>
          {!this.state.selectedEquipmentModelId &&
            <Choose items={equipmentModels}
              multiple={false}
              fieldName="selectedEquipmentModelId"
              onSelectionChange={this.handleSelection} />
          }
        </Fragment>
      }

      <NavLink className="equipment-model-add-link" to={`/equipment-model-add`}>Can't find what you're looking for? Add yours now!</NavLink>

      <span className="fake-label">
        <Icon source="fa" icon={faTruck} />
        Model
      </span>
    </div>;
  }

  render() {
    if(!!this.state.forceRedirect) {
      return <Redirect to={`/equipments`} />;
    }

    if(!this.state.employee || !this.state.activeRoleCompany) {
      return (<div></div>);
    } 
    else if(!!this.state.equipmentId) {
      ErrorService.success('Equipment created!');
      return <Redirect to={`/dashboard`} />;
    } 
    else {
      return (
        <div className="EquipmentAdd">
          <h1>Add an equipment</h1>
          <form onSubmit={this.handleSubmit}>
            {/* Model */}
            {this.renderModels()}

            <FormInput
              inputType="text"
              fieldName="identification"
              label={
                <span>
                  <Icon source="fa" icon={faRectangleWide} />
                  Identification
                </span>
              }
              inputRequired
              inputPattern=".{3,}"
              instructions={
                <span>
                  The identification is required<br/>
                  The identification must be 3 characters minimum<br/>
                  It can be the number plate, serial number...
                </span>
              }
              onValueChange={this.onFormInputChange} />

            {/* Company */}
            <div className="input-company">
              <span className="fake-label">
                <Icon source="fa" icon={faBuilding} />
                Company
              </span>
              <span>
                {this.state.activeRoleCompany.name}
              </span>
            </div>

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

export default EquipmentAdd;
