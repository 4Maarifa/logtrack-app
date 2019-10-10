import React from 'react';

import DataService from '../../../services/data.service';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import './Analytics.scss';

class Analytics extends ComponentSafeUpdate {
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
        this.setState(computedValues);
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
      <div className="Analytics">
        Analytics
      </div>
    );
  }
}

export default Analytics;
