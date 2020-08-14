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
 * tooltipPosition: ETooltipPosition | position of the tooltip
 * tooltipTrianglePosition: ETooltipTrianglePosition | position of the tooltip triangle
 * show: boolean | May the tooltip be shown or not
 * label: HTML | content of the tooltip
 * styles: Object | custom styles
 */
const Tooltip = ({ tooltipPosition, tooltipTrianglePosition, show, label, styles }) => {

  // Compute the tooltip position, or get a default
  const TOOLTIP_POSITION = (tooltipPosition && ETooltipPosition[tooltipPosition]) ? ETooltipPosition[tooltipPosition] : ETooltipPosition.BOTTOM;

  // compute the tooltip triangle position, or get the default
  const TOOLTIP_TRIANGLE_POSITION = (tooltipTrianglePosition && ETooltipTrianglePosition[tooltipTrianglePosition]) ? ETooltipTrianglePosition[tooltipTrianglePosition] : ETooltipTrianglePosition.MIDDLE;

  /**
   * RENDER
   */

  // If the tooltip must be hidden, return nothing
  if(!show) {
    return null;
  }

  // Else, return it
  return (
    <div className={'Tooltip ' + ETooptipPositionCss[TOOLTIP_POSITION]} style={styles}>

      {/* Triangle */}
      <span className={'triangle ' + ETooptipTrianglePositionCss[TOOLTIP_TRIANGLE_POSITION]}></span>

      {/* Content */}
      <span className="label">{label}</span>
    </div>
  );
};

export default Tooltip;
