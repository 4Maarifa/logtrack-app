import React from 'react';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import DataService from '../../../services/data.service';

import Map from './../../Utils/Map/Map';

import './Gps.scss';

class Gps extends ComponentSafeUpdate {
  constructor() {
    super();
    this.state = Object.assign({
      }, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setStateSafe(computedValues);
      })
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  }

  /**
   * RENDER
   */
  render() {
    return (
      <div className="Gps">
        <div className="gps-content">
          <Map></Map>
          <div className="indications">
            <div className="active-logtrack">

            </div>
            <div className="gps-indicator">
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gps;
