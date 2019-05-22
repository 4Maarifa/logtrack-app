import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './EquipmentAdd.css';
import DataService from '../../../services/data.service';
import ErrorService from '../../../services/error.service';

import Utils from '../../../utils';
import Equipment from '../../../classes/Equipment';

class EquipmentAdd extends Component {
  constructor () {
    super();

    this.state = Object.assign({
        equipmentId: null, 
        identification: '',

        equipmentModelType: null,
        equipmentModelId: null,

        modelsByType: {},
        brands: {},

        forceRedirect: false
    }, DataService.computed.getDefaultComputedValues());
  }

  observeComputedValues = (computedValues) => {
    if(!computedValues.activeRole) {
      ErrorService.warning('Please activate a role to add an equipment!');
      this.setState({forceRedirect: true});
    }
    this.setState(computedValues, this.computeModels);
  }

  componentDidMount = () => {
    DataService.computed.observeComputedValues(this.observeComputedValues);
  }

  computeModels = () => {
    DataService.brand.getAll()
        .then((querySnapshot) => {
            var brands = {};
            querySnapshot.forEach((brandDoc) => {
                brands[brandDoc.id] = brandDoc.data();
            });
            this.setState({brands: brands});
        })
        .catch(ErrorService.manageError);

    DataService.equipmentModel.getAll()
        .then((querySnapshot) => {
            var modelsByType = {};
            querySnapshot.forEach((equipmentModelDoc) => {
                var modelType = equipmentModelDoc.data().type;

                if(!modelsByType[modelType]) {
                    modelsByType[modelType] = {};
                }
                
                modelsByType[modelType][equipmentModelDoc.id] = equipmentModelDoc.data();
            });
            this.setState({modelsByType: modelsByType});
        })
        .catch(ErrorService.manageError);
  }

  handleChange = event => {
    let newState = {};
    newState[event.target.getAttribute('data-field')] = event.target.value;
    this.setState(newState);
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('EquipmentAdd : submitting...');

    if(!this.state.equipmentModelId) {
      ErrorService.error('Please pick a model or create one!');
      return;
    }
    
    DataService.equipment.create(new Equipment(this.state.activeRole.companyId, this.state.identification, this.state.equipmentModelId))
      .then((docEquipment) => {
        this.setState({equipmentId: docEquipment.id});
      })
      .catch(ErrorService.manageError);
  }

  renderModels = () => {
    if(!this.state.modelsByType) {
      return (<div></div>);
    }
    var models = [];
    Object.keys(this.state.modelsByType).forEach((modelType) => {
      models.push(
        <li key={modelType}>
          <h2>{modelType}</h2>
          <span>Default models:</span>
          <ul>
            {this.renderModelType(modelType, false)}
          </ul>
          <span>User models:</span>
          <ul>
            {this.renderModelType(modelType, true)}
          </ul>
        </li>
      );
    });
    return models;
  }

  renderModelType(modelType, isUserCreated) {
    var models = [];
    Object.keys(this.state.modelsByType[modelType]).forEach((modelKey) => {
      if(
        (!isUserCreated && this.state.modelsByType[modelType][modelKey].creator == null) ||
        (!!isUserCreated && this.state.modelsByType[modelType][modelKey].creator != null)
      ) {
        models.push(this.renderModel(modelKey, this.state.modelsByType[modelType][modelKey]));
      }
    });
    return models;
  }

  renderModelViaType(modelType, modelId) {
    return this.renderModel(modelId, this.state.modelsByType[modelType][modelId]);
  }

  renderModel(modelId, modelData) {
    var brand = (!!this.state.brands[modelData.brand]) ? 
      <img width="40" height="20" alt={modelData.brand + '\'s logo'} src={this.state.brands[modelData.brand].logoUrl} />
      : modelData.brand;

    return (
      <li className="model" 
          key={modelId} 
          onClick={this.handleClickOnModel} 
          data-model-id={modelId} 
          data-model-type={modelData.type}>
        
        <img width="100" height="100" alt={modelData.name} src={modelData.photoUrl} />
        {modelData.name} - {brand}
      </li>);
  }

  renderSelectedModel = () => {
    if(!this.state.equipmentModelId || !this.state.equipmentModelType) {
      return (<div></div>);
    }
    return this.renderModelViaType(this.state.equipmentModelType, this.state.equipmentModelId);
  }

  handleClickOnModel = (e) => {
    var target = Utils.getClosestElement(e.target, 'model');
    this.setState({
      equipmentModelId: target.getAttribute('data-model-id'),
      equipmentModelType: target.getAttribute('data-model-type')
    });
  }

  render() {
    if(!!this.state.forceRedirect) {
      return <Redirect to={`/dashboard`} />;
    }

    if (!this.state.employee) {
      return (<div></div>);
    } else if (!!this.state.equipmentId) {
      return <Redirect to={`/dashboard`} />;
    } else {
      return (
        <div>
          Add an equipment
          <form onSubmit={this.handleSubmit}>
            {/* Model */}
            Model:
            <ul>
              {this.renderModels()}
            </ul>

            Selected model:
            <ul>
              {this.renderSelectedModel()}
            </ul>

            Identification:
            <input
                type="text"
                data-field="identification"
                placeholder="123 W 25"
                value={this.state.identification}
                onChange={this.handleChange}
                required />

            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}

export default EquipmentAdd;
