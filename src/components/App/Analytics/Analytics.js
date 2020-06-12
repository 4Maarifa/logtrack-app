import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Chart from 'react-apexcharts';

import ColorService from './../../../services/color.service';
import DataService from './../../../services/data.service';

import PageLink, { PageLinkType } from '../../Utils/PageLink/PageLink';

import { v4 as uuid } from 'uuid';

import './Analytics.scss';

/**
 * Component: Analytics
 * Used by managers to see stats about logtracks
 */
const Analytics = () => {
  const GRAPHS = {
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
    },
    test: {
      options: {
        chart: { stacked: true, foreColor: '#999' },
        plotOptions: {
          bar: { 
            dataLabels: { enabled: false }, 
            columnWidth: '75%',
            startingShape: 'rounded',
            endingShape: 'rounded'
          }
        },
        colors: ["#00C5A4", '#555555'],
        labels: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4],
        xaxis: {
          axisBorder: { show: false },
          axisTicks: { show: false },
          crosshairs: { show: false, width: '2px' },
          labels: {
            show: false,
            style: { fontSize: '14px' }
          },
        },
        grid: {
          xaxis: { lines: { show: false } },
          yaxis: { lines: { show: false } }
        },
        yaxis: {
          axisBorder: { show: false },
          labels: { show: false },
        },
        legend: {
          floating: true,
          position: 'top',
          horizontalAlign: 'right',
          offsetY: -36
        },
        title: {
          text: 'Web Statistics',
          align: 'left',
        },
        subtitle: { text: 'Sessions and Views' },
        tooltip: { shared: true, followCursor: true }
      },
      series: [{
        name: "Sessions",
        data: [20, 16, 24, 28, 26, 22, 15, 5, 14, 16, 22, 29, 24, 19, 15, 10, 11, 15, 19, 23],
      }, {
        name: "Views",
        data: [20, 16, 24, 28, 26, 22, 15, 5, 14, 16, 22, 29, 24, 19, 15, 10, 11, 15, 19, 23],
      }]
    },
    test2: {
      options: {
        chart: {
          zoom: { enabled: false },
          offsetY: 20,
          xyRatios: { yRatio: 1 },
        },
        colors: ['#E91E63'],
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: { show: false },
              value: { offsetY: 0 }
            }
          }
        },
        theme: {  monochrome: { enabled: false } },
        legend: { show: false },
        title: {
          text: 'Bounce Rate',
          align: 'left'
        }
      },
      series: [65]
    },
    test3: {
      options: {
        chart: { offsetY: 20 },
        plotOptions: {
          pie: {
            customScale: 0.86,
            donut: { size: '72%' },
            dataLabels: { enabled: false }
          }
        },
        colors: ['#775DD0', '#00C8E1', '#FFB900'],
        title: { text: 'Visitors Source' },
        labels: ['Social Media', 'Blog', 'External'],
        legend: { show: false         }
      },
      series: [2, 7, 5],
    },
    spark1: {
      options: {
        chart: {
          sparkline: { enabled: true },
          group: 'sparklines'
        },
        stroke: { curve: 'smooth' },
        markers: { size: 0 },
        tooltip: {
          fixed: { enabled: true, position: 'right' },
          x: { show: false }
        },
        title: {
          text: '439',
          style: { fontSize: '26px' }
        },
        yaxis: { labels: { minWidth: 20 } },
        colors: ['#734CEA']
      },
      series: [{
        name: 'purple',
        data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
      }]
    },
    spark2: {
      options: {
        chart: {
          id: 'sparkline2',
          sparkline: { enabled: true },
          group: 'sparklines'
        },
        stroke: { curve: 'smooth' },
        markers: { size: 0 },
        tooltip: {
          fixed: { enabled: true, position: 'right' },
          x: { show: false }
        },
        title: {
          text: '387',
          style: { fontSize: '26px' }
        },
        yaxis: { labels: { minWidth: 20 } },
        colors: ['#34bfa3']
      },
      series: [{
        name: 'green',
        data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69]
      }]
    },
    area: {
      options: {
        chart: {
          background: '#fff',
          stacked: true,
          offsetY: 39,
          zoom: { enabled: false }
        },
        plotOptions: { line: { dataLabels: { enabled: false } } },
        stroke: { curve: 'straight' },
        colors: ["#3F51B5", '#2196F3'],
        fill: {
          type: 'gradient',
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.9,
            opacityTo: 0.6,
            stops: [0, 100, 100, 100]
          }
        },
        title: { text: 'Visitor Insights', align: 'left', offsetY: -5, offsetX: 20 },
        subtitle: { text: 'Adwords Statistics', offsetY: 30, offsetX: 20 },
        markers: {
          size: 0,
          style: 'hollow',
          strokeWidth: 8,
          strokeColor: "#fff",
          strokeOpacity: 0.25,
        },
        grid: {
          show: false,
          padding: { left: 0, right: 0 }
        },
        yaxis: { show: false },
        labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002', '01/21/2002', '01/22/2002', '01/23/2002'],
        xaxis: { type: 'datetime', tooltip: { enabled: false } },
        legend: { offsetY: -50, position: 'top', horizontalAlign: 'right' }
      },
      series: [{
          name: "Adwords Views",
          data: [15, 26, 20, 33, 27, 43, 17, 26, 19]
        },
        {
          name: "Adwords Clicks",
          data: [33, 21, 42, 19, 32, 25, 36, 29, 49]
        }]
    },
    test4: {
      options: {
        colors: ['#775DD0', '#00C8E1', '#FFB900'],
        labels: ['June', 'May', 'April'],
        theme: { monochrome: { enabled: false } },
        plotOptions: { radialBar: { offsetY: -30 } },
        legend: {
          show: true,
          position: 'left',
          containerMargin: { right: 0 }
        },
        title: { text: 'Growth' }
      },
      series: [71, 63, 77]
    },
    test5: {
      options: {
        chart: {
          zoom: { enabled: false },
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: .5,
          }
        },
        stroke: { curve: 'smooth', width: 2 },
        //colors: ["#3F51B5", '#2196F3'],
        title: { text: 'Media', align: 'left', offsetY: 25, offsetX: 20 },
        subtitle: { text: 'Statistics', offsetY: 55, offsetX: 20 },
        markers: {
          size: 6,
          strokeWidth: 0,
          hover: { size: 9 }
        },
        grid: {
          show: true,
          padding: { bottom: 0 }
        },
        labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002'],
        xaxis: { tooltip: { enabled: false } },
        legend: { position: 'top', horizontalAlign: 'right', offsetY: -20 }
      },
      series: [{
        name: "Music",
        data: [1, 15, 26, 20, 33, 27]
      },
      {
        name: "Photos",
        data: [3, 33, 21, 42, 19, 32]
      },
      {
        name: "Files",
        data: [0, 39, 52, 11, 29, 43]
      }]
    },
    sp1: {
      options: {
        chart: {
          id: 'spark1',
          group: 'sparks',
          sparkline: { enabled: true },
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
          }
        },
        yaxis: { labels: { minWidth: 20 } },
        stroke: { curve: 'smooth' },
        markers: { size: 0 },
        grid: { padding: { top: 20, bottom: 10, left: 110 } },
        colors: ['#fff'],
        tooltip: {
          x: { show: false },
          y: { title: { formatter: function formatter(val) { return ''; } } }
        }
      },
      series: [{
        data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
      }]
    },
    sp2: {
      options: {
        chart: {
          id: 'spark2',
          group: 'sparks',
          sparkline: { enabled: true },
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
          }
        },
        yaxis: { labels: { minWidth: 20 } },
        stroke: { curve: 'smooth' },
        grid: { padding: { top: 20, bottom: 10, left: 110 } },
        markers: { size: 0 },
        colors: ['#fff'],
        tooltip: {
          x: { show: false },
          y: { title: { formatter: function formatter(val) { return ''; } } }
        }
      },
      series: [{
        data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69]
      }]
    },
    sp3: {
      options: {
        chart: {
          id: 'spark3',
          group: 'sparks',
          sparkline: { enabled: true },
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
          }
        },
        yaxis: { labels: { minWidth: 20 } },
        stroke: { curve: 'smooth' },
        markers: { size: 0 },
        grid: { padding: { top: 20, bottom: 10, left: 110 } },
        colors: ['#fff'],
        xaxis: { crosshairs: { width: 1 }, },
        tooltip: {
          x: { show: false },
          y: { title: { formatter: function formatter(val) { return ''; } } }
        }
      },
      series: [{
        data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19]
      }]
    },
    sp4: {
      options: {
        chart: {
          id: 'spark4',
          group: 'sparks',
          sparkline: { enabled: true },
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
          }
        },
        yaxis: { labels: { minWidth: 20 } },
        stroke: { curve: 'smooth' },
        markers: { size: 0 },
        grid: { padding: { top: 20, bottom: 10, left: 110 } },
        colors: ['#fff'],
        xaxis: { crosshairs: { width: 1 }, },
        tooltip: {
          x: { show: false },
          y: { title: { formatter: function formatter(val) { return ''; } } }
        }
      },
      series: [{
        data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61]
      }]
    }
  };

  
  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }
  if(!computed.activeRole) { return <Redirect to={`/dashboard`} />; }

  return <div className="Analytics">
    <h1>Analytics / <PageLink type={PageLinkType.COMPANY} entityId={computed.activeRole.companyId} entityData={computed.activeRoleCompany} /></h1>
    <div className="chart-container">
      <Chart
        options={GRAPHS.logtrack.options}
        series={GRAPHS.logtrack.series}
        type="line"
        width="500" />
    </div>
      
    <Chart
      options={GRAPHS.gauge.options}
      series={GRAPHS.gauge.series}
      type="radialBar"
      width="200" />

    <div className="chart-container">
      <Chart
        options={GRAPHS.test.options}
        series={GRAPHS.test.series}
        type="bar"
        width="500"
        height="300" />
    </div>

    <Chart
      options={GRAPHS.test2.options}
      series={GRAPHS.test2.series}
      type="radialBar"
      width="200"
      height="200" />

    <Chart
      options={GRAPHS.test3.options}
      series={GRAPHS.test3.series}
      type="donut"
      width="200"
      height="200" />

    <Chart
      options={GRAPHS.spark1.options}
      series={GRAPHS.spark1.series}
      type="line"
      height="140" />

    <Chart
      options={GRAPHS.spark2.options}
      series={GRAPHS.spark2.series}
      type="line"
      height="140" />

    <Chart
      options={GRAPHS.area.options}
      series={GRAPHS.area.series}
      type="area"
      height="421" />

    <Chart 
      options={GRAPHS.test4.options}
      series={GRAPHS.test4.series}
      type="radialBar"
      height="314" />

    <Chart
      options={GRAPHS.test5.options}
      series={GRAPHS.test5.series}
      type="line"
      height="328" />

    <Chart
      options={GRAPHS.sp1.options}
      series={GRAPHS.sp1.series}
      type="line"
      height="80" />

    <Chart
      options={GRAPHS.sp2.options}
      series={GRAPHS.sp2.series}
      type="line"
      height="80" />

    <Chart
      options={GRAPHS.sp3.options}
      series={GRAPHS.sp3.series}
      type="line"
      height="80" />

    <Chart
      options={GRAPHS.sp4.options}
      series={GRAPHS.sp4.series}
      type="line"
      height="80" />
  </div>;
};

export default Analytics;
