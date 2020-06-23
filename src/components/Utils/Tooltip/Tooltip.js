import React from 'react';

import './Tooltip.scss';

export const ETooltipPosition = {
  TOP: 'TOP',
  RIGHT: 'RIGHT',
  BOTTOM: 'BOTTOM',
  LEFT: 'LEFT'  
};

const ETooptipPositionCss = {
  [ETooltipPosition.TOP]: 'tooltip-top',
  [ETooltipPosition.RIGHT]: 'tooltip-right',
  [ETooltipPosition.BOTTOM]: 'tooltip-bottom',
  [ETooltipPosition.LEFT]: 'tooltip-left'
};

export const ETooltipTrianglePosition = {
  START: 'START',
  MIDDLE: 'MIDDLE',
  END: 'END'
};

const ETooptipTrianglePositionCss = {
  [ETooltipTrianglePosition.START]: 'triangle-start',
  [ETooltipTrianglePosition.MIDDLE]: 'triangle-middle',
  [ETooltipTrianglePosition.END]: 'triangle-end',
};

const Tooltip = ({ defaultTooltipPosition, defaultTooltipTrianglePosition, show, label, styles }) => {
  const tooltipPosition = (defaultTooltipPosition && ETooltipPosition[defaultTooltipPosition]) ? ETooltipPosition[defaultTooltipPosition] : 'BOTTOM';
  const tooltipTrianglePosition = (defaultTooltipTrianglePosition && ETooltipTrianglePosition[defaultTooltipTrianglePosition]) ? ETooltipTrianglePosition[defaultTooltipTrianglePosition] : 'MIDDLE';

  /**
   * RENDER
   */
  if(!show) {
    return null;
  }
  return (
    <div className={'Tooltip ' + ETooptipPositionCss[tooltipPosition]} style={styles}>
      <span className={'triangle ' + ETooptipTrianglePositionCss[tooltipTrianglePosition]}></span>
      <span className="label">{label}</span>
    </div>
  );
};

export default Tooltip;
