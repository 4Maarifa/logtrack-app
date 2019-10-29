import React from 'react';

import ComponentSafeUpdate from './../ComponentSafeUpdate/ComponentSafeUpdate';

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

class Tooltip extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = {
      label: props.label,
      tooltipPosition: (!!this.props.tooltipPosition && !!ETooltipPosition[this.props.tooltipPosition]) ? ETooltipPosition[this.props.tooltipPosition] : 'BOTTOM',
      tooltipTrianglePosition: (!!this.props.tooltipTrianglePosition && !!ETooltipTrianglePosition[this.props.tooltipTrianglePosition]) ? ETooltipTrianglePosition[this.props.tooltipTrianglePosition] : 'MIDDLE',
      show: props.show
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  shouldComponentUpdate(nextProps, _) {
    if(nextProps.show !== this.state.show) {
      this.setState({ show: nextProps.show });
    }
    return true;
  };

  /**
   * RENDER
   */
  render() {
    if(!this.state.show) {
      return null;
    }
    return (
      <div className={'Tooltip ' + ETooptipPositionCss[this.state.tooltipPosition]}>
        <span className={'triangle ' + ETooptipTrianglePositionCss[this.state.tooltipTrianglePosition]}></span>
        <span className="label">{this.state.label}</span>
      </div>
    );
  }
}

export default Tooltip;
