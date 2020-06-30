import React from 'react';

import './Tooltip.scss';

// Possible positions of tooltip
export const ETooltipPosition = {
  TOP: 'TOP',
  RIGHT: 'RIGHT',
  BOTTOM: 'BOTTOM',
  LEFT: 'LEFT'  
};

// corresponding CSS class for each position
const ETooptipPositionCss = {
  [ETooltipPosition.TOP]: 'tooltip-top',
  [ETooltipPosition.RIGHT]: 'tooltip-right',
  [ETooltipPosition.BOTTOM]: 'tooltip-bottom',
  [ETooltipPosition.LEFT]: 'tooltip-left'
};

// Possible positions of the triangle of the tooltip
export const ETooltipTrianglePosition = {
  START: 'START',
  MIDDLE: 'MIDDLE',
  END: 'END'
};

// corresponding triangle css classes
const ETooptipTrianglePositionCss = {
  [ETooltipTrianglePosition.START]: 'triangle-start',
  [ETooltipTrianglePosition.MIDDLE]: 'triangle-middle',
  [ETooltipTrianglePosition.END]: 'triangle-end',
};

/**
 * Component: Tooltip
 * Used to show a tooltip / help popin
 * The parent must have a relative position
 * 
 * defaultTooltipPosition: ETooltipPosition | position of the tooltip
 * defaultTooltipTrianglePosition: ETooltipTrianglePosition | position of the tooltip triangle
 * show: boolean | May the tooltip be shown or not
 * label: HTML | content of the tooltip
 * styles: Object | custom styles
 */
const Tooltip = ({ defaultTooltipPosition, defaultTooltipTrianglePosition, show, label, styles }) => {

  // Compute the tooltip position, or get a default
  const tooltipPosition = (defaultTooltipPosition && ETooltipPosition[defaultTooltipPosition]) ? ETooltipPosition[defaultTooltipPosition] : ETooltipPosition.BOTTOM;

  // compute the tooltip triangle position, or get the default
  const tooltipTrianglePosition = (defaultTooltipTrianglePosition && ETooltipTrianglePosition[defaultTooltipTrianglePosition]) ? ETooltipTrianglePosition[defaultTooltipTrianglePosition] : ETooltipTrianglePosition.MIDDLE;

  /**
   * RENDER
   */

  // If the tooltip must be hidden, return nothing
  if(!show) {
    return null;
  }

  // Else, return it
  return (
    <div className={'Tooltip ' + ETooptipPositionCss[tooltipPosition]} style={styles}>

      {/* Triangle */}
      <span className={'triangle ' + ETooptipTrianglePositionCss[tooltipTrianglePosition]}></span>

      {/* Content */}
      <span className="label">{label}</span>
    </div>
  );
};

export default Tooltip;
