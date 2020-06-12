import React from 'react';

import './CompletionBar.scss';

const CompletionBar = ({ title, details, percentage }) => {

  return (
    <div className="CompletionBar">
      <h1>
        <span>{title}</span>
        <span>{details}{details ? ' - ' : null}{Math.floor(percentage)}%</span>
      </h1>
      <div className="bar">
        <i style={{width: (percentage > 100 ? 100 : percentage) + '%'}}></i>
      </div>
    </div>
  );
};

export default CompletionBar;
