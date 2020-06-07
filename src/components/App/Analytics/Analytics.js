import React from 'react';
import Chart from 'react-apexcharts';

import ColorService from './../../../services/color.service';

import './Analytics.scss';

/**
 * Component: Analytics
 * Used by managers to see stats about logtracks
 */
const Analytics = () => {
  const graphs = {
    logtrack: {
      options: {
        chart: { id: "basic-bar" },
        xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998] },
        colors: [ColorService.getSecondColor()]
      },
      series: [ { name: "series-1", data: [30, 40, 45, 50, 49, 60, 70, 91] } ]
    },
    gauge: {
      options: {
        plotOptions: {
          radialBar: {
            startAngle: -45,
            endAngle: 45,
            dataLabels: { value: { show: false } }
          }
        },
        colors: [ColorService.getSecondColor()]
      },
      series: [70]
    }
  };

  return <div className="Analytics">
    <div className="chart-container">
      <Chart
        options={graphs.logtrack.options}
        series={graphs.logtrack.series}
        type="line"
        width="500" />
    </div>
      
    <Chart
      options={graphs.gauge.options}
      series={graphs.gauge.series}
      type="radialBar"
      width="200" />
  </div>;
};

export default Analytics;
