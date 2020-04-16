import React from 'react';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import './Range.scss';

class Range extends ComponentSafeUpdate {

  constructor(props) {
    super(props);
    this.state = {
      value: props.default || Math.floor(Math.abs(props.max - props.min) / (props.step || 1) / 2) * (props.step || 1),
    };
    this.notifyParent(this.state.value);
  }

  onValueChange = e => {
    this.setState({value: e.target.value}, this.notifyParent);
  }

  notifyParent = () => !!this.props.onChange && this.props.onChange(parseInt(this.state.value), this.props.fieldName);

  /**
   * RENDER
   */
  render() {
    return (
      <div className="Range">
        <input type="range" 
          min={this.props.min}
          max={this.props.max}
          step={this.props.step || 1}
          value={this.state.value}
          onChange={this.onValueChange} />
        <span className="Range-value" data-value={this.state.value} style={{ left: `calc((100% - 41px) * ${(this.state.value - this.props.min) / (this.props.max - this.props.min)})` }}></span>
        <span className="Range-indicators">
          <span>{this.props.min}</span>
          <span>{this.props.max}</span>
        </span>
      </div>
    );
  }
}

export default Range;
