import React from 'react';

import './CompletionBar.scss';

/**
 * Component: CompletionBar
 * A progress / fulfilment bar
 * 
 * title: string | Title of the graph
 * details: string | Short description of the graph (optional)
 * percentage: number | between 0 and 100 (capped to 100)
 */
const CompletionBar = ({ title, details, percentage }) => (
  <div className="CompletionBar">
    <h1>
      <span>{title}</span>
      <span>{details}{details ? ' - ' : null}{Math.floor(percentage)}%</span>
    </h1>
    <div className="bar">
      {/* Width of the bar is computed from the percentage */}
      <i data-testid="bar" style={{width: (percentage > 100 ? 100 : percentage) + '%'}}></i>
    </div>
  </div>
);

export default CompletionBar;
