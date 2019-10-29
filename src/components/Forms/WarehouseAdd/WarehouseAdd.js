import React from 'react';
import { Redirect } from 'react-router-dom';
import { faRectangleWide, faMapMarker, faUser, faBuilding } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import FormDebouceAutoSuggestInput from './../../Utils/FormElements/FormDebounceAutoSuggestInput/FormDebounceAutoSuggestInput';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import PlacesService from './../../../services/places.service';
import WarehouseService from './../../../services/entities/warehouse.service';
import GeoService from './../../../services/geo.service';

import Warehouse from './../../../classes/Warehouse';

import './WarehouseAdd.scss';

class WarehouseAdd extends ComponentSafeUpdate{
  constructor (props) {
    super(props);
    this.state = Object.assign({
      warehouseId: null,

      identification: '',

      possibleLocations: {},
      selectedLocationItem: null,

      locationMarkerId: null,

      forceRedirect: false
    },
    DataService.computed.getDefaultComputedValues());
    this.map = React.createRef();
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

  onLocationAutoCompleteChange = value => {
    PlacesService.search(value, { addressdetails: 0 })
      .then(values => {
        var possibleLocations = {};
        values.forEach(value => {
          value.coordinates = GeoService.transformCoordinates([
            parseFloat(value.lon),
            parseFloat(value.lat)
          ]);
          possibleLocations[value.osm_id] = {
            content: <span>
              {value.display_name}
            </span>,
            value: value
          };
        });
        this.setState({possibleLocations});
      })
      .catch(ErrorService.manageError);
  };

  onSelectedLocationItem = (_, __, selectedLocationItem) => {
    this.setState({selectedLocationItem});
    if(!selectedLocationItem) {
      this.map.current.deleteMarker(this.state.locationMarkerId);
      this.setState({locationMarkerId: null});
      return;
    }
    if(!!this.state.locationMarkerId) {
      this.map.current.switchMarker(
        this.state.locationMarkerId, 
        selectedLocationItem.value.coordinates[0], 
        selectedLocationItem.value.coordinates[1], 
        selectedLocationItem.value.display_name);
      this.centerOnLocationMarker();
    }
    else {
      this.setState({
        locationMarkerId: this.map.current.addMarker(
          selectedLocationItem.value.coordinates[0], 
          selectedLocationItem.value.coordinates[1], 
          selectedLocationItem.value.display_name)
      }, this.centerOnLocationMarker);
    }
  };

  centerOnLocationMarker = () => this.map.current.centerOnMarker(this.state.locationMarkerId);

  handleSubmit = event => {
    event.preventDefault();

    if(!this.state.selectedLocationItem) {
      ErrorService.error('Please select a location!');
      return;
    }

    WarehouseService.create(
      new Warehouse(
        this.state.identification, 
        this.state.selectedLocationItem.value.coordinates[0], 
        this.state.selectedLocationItem.value.coordinates[1],
        this.state.activeRole.companyId, 
        this.state.user.uid, 
        DateService.getCurrentIsoDateString()))
      .then(warehouseDoc => {
        this.setState({warehouseId: warehouseDoc.id});
      })
      .catch(ErrorService.manageError);
  };

  /**
   * RENDER
   */
  render() {
    if(!!this.state.forceRedirect) {
      return <Redirect to={`/dashboard`} />;
    }
    if(!this.state.employee || !this.state.activeRoleCompany) {
      return (<div></div>);
    }
    else if(!!this.state.warehouseId) {
      let dashboardUrl = '/dashboard';
      return <Redirect to={dashboardUrl} />;
    } 
    else {
      return (
        <div className="WarehouseAdd">
          <h1>Add a Warehouse</h1>
          <form onSubmit={this.handleSubmit}>
            
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
                  It can be the location, building info...
                </span>
              }
              onValueChange={this.onFormInputChange} />

            <FormDebouceAutoSuggestInput
              label={
                <span>
                  <Icon source="fa" icon={faMapMarker} />
                  Location
                </span>
              }
              possibleItems={this.state.possibleLocations}
              onValueChange={this.onLocationAutoCompleteChange}
              onSelectedItemChange={this.onSelectedLocationItem}
              inputAutoComplete="off"
              inputRequired
              fieldName="location"
              instructions={
                <span>Pick a location</span>
              } />
            <Map ref={this.map} />

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

export default WarehouseAdd;
