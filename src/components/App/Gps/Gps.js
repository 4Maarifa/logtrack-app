import React from 'react';
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Map from './../../Utils/Map/Map';
import Icon from './../../Utils/Icon/Icon';

import DataService from './../../../services/data.service';
import PermissionService from './../../../services/permission.service';
import ErrorService from './../../../services/error.service';

import './Gps.scss';

class Gps extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({

      locationObserverKey: null,
      currentUserPosition: null
    }, DataService.computed.getDefaultComputedValues());

    this.map = React.createRef();
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues(computedValues => {
        this.setState(computedValues);
      })
    });

    PermissionService.location.askPermission()
      .then(() => {
        PermissionService.location.addLocationObserver(currentUserPosition => this.setState({currentUserPosition}))
          .then(locationObserverKey => this.setState({locationObserverKey}))
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  /**
   * RENDER
   */
  render() {
    return (
      <div className="Gps">
        <div className="gps-content">
          <Map ref={this.map} gpsMode={true} />
          <div className="indications">
            <div className="active-logtrack">

            </div>
            <div className="gps-indicator">
              
            </div>
          </div>
          <div className="warnings">
            {!!this.state.currentUserPosition && !this.state.currentUserPosition.heading &&
              <span className="heading-problem">
                <Icon source="fa" icon={faExclamationTriangle} />
                This device is not compatible with heading.
              </span>
            }
            {!!this.state.currentUserPosition && !!this.state.currentUserPosition.accuracy &&
              <span className={'accuracy ' + (this.state.currentUserPosition.accuracy > 150 ? 'accuracy--problem' : '')}>
                Accuracy: {this.state.currentUserPosition.accuracy}m
              </span>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Gps;
