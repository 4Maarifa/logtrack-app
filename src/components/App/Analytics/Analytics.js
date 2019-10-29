import React from 'react';
import Chart from 'react-apexcharts';

import DataService from './../../../services/data.service';
import ColorService from './../../../services/color.service';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import './Analytics.scss';

/**
 * Component: Analytics
 * Used by managers to see stats about logtracks
 */
class Analytics extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      graphs: {
        logtrack: {
          options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            },
            colors: [ColorService.getSecondColor()]
          },
          series: [
            {
              name: "series-1",
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
          ]
        }
      }
    }, 
    DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setState(computedValues);
      })
    });
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
      <div className="Analytics">
        Analytics
        <Chart
          options={this.state.graphs.logtrack.options}
          series={this.state.graphs.logtrack.series}
          type="line"
          width="500" />
      </div>
    );
  }
}

export default Analytics;
