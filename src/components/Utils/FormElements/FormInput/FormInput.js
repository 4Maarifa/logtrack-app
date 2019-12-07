import React from 'react';
import { faCheck, faTimes } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import './FormInput.scss';

const uuidv4 = require('uuid/v4');

class FormInput extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = {
      value: props.value || '',
      lastPropValue: props.value,

      hover: false
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if(nextProps.value !== this.state.lastPropValue) {
      this.setState({lastPropValue: nextProps.value}, () => {
        this.onChange(nextProps.value);
      });
    }
    else if(nextState.value !== this.state.value) {
      this.setState({value: nextState.value});
    }
    return true;
  };

  onChange = value => {
    this.setState({value});
    !!this.props.onValueChange && this.props.onValueChange(value, this.props.fieldName);
  };

  /**
   * RENDER
   */
  render() {
    const inputId = uuidv4();
    return (
      <div className={'FormInput '
          + (!!this.props.fieldName ? 'input-' + this.props.fieldName : '')}>

        <input
          id={inputId}
          className={'input ' + (!this.state.value ? 'input--empty' : '')}
          type={this.props.inputType || "text"}
          value={this.state.value}
          name={this.props.inputName}
          autoComplete={this.props.inputAutoComplete}
          pattern={this.props.inputPattern}
          onChange={e => this.onChange(e.target.value)}
          required={this.props.inputRequired} />
        <span className="indicator"
          onMouseOver={() => this.setState({ hover: true })}
          onMouseOut={() => this.setState({ hover: false })}>

          <Icon containerclassname="valid" source="fa" icon={faCheck} />
          <Icon containerclassname="invalid" source="fa" icon={faTimes} />
        </span>
        {!!this.props.label && 
          <label htmlFor={inputId}>
            {this.props.label}
          </label>
        }
        {!!this.props.instructions && <Tooltip 
          show={this.state.hover} 
          label={this.props.instructions}
          tooltipPosition={ETooltipPosition.BOTTOM} 
          tooltipTrianglePosition={ETooltipTrianglePosition.END} />}
      </div>
    );
  }
}

export default FormInput;
