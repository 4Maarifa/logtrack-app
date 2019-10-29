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
      onValueChange: props.onValueChange,

      inputType: this.props.inputType ? this.props.inputType : 'text',
      fieldName: props.fieldName,
      inputName: props.inputName,
      inputAutoComplete: props.inputAutoComplete,
      inputRequired: props.inputRequired,
      inputPattern: props.inputPattern,

      value: !!this.props.value ? this.props.value : '',
      label: props.label,

      instructions: props.instructions,

      hover: false
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  shouldComponentUpdate = (nextProps, _) => {
    if(nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value});
    }
    return true;
  };

  onChange = event => {
    this.setState({value: event.target.value});
    !!this.state.onValueChange && this.state.onValueChange(event.target.value, this.state.fieldName);
  };

  /**
   * RENDER
   */
  render() {
    const inputId = uuidv4();
    return (
      <div className={'FormInput '
          + (!!this.state.fieldName ? 'input-' + this.state.fieldName : '')}>

        <input
          id={inputId}
          className={'input ' + (!this.state.value ? 'input--empty' : '')}
          type={this.state.inputType}
          value={this.state.value}
          name={this.state.inputName}
          autoComplete={this.state.inputAutoComplete}
          pattern={this.state.inputPattern}
          onChange={this.onChange}
          required={this.state.inputRequired} />
        <span className="indicator"
          onMouseOver={() => this.setState({ hover: true })}
          onMouseOut={() => this.setState({ hover: false })}>

          <Icon className="valid" source="fa" icon={faCheck} />
          <Icon className="invalid" source="fa" icon={faTimes} />
        </span>
        {!!this.state.label && 
          <label htmlFor={inputId}>
            {this.state.label}
          </label>
        }
        {!!this.state.instructions && <Tooltip 
          show={this.state.hover} 
          label={this.state.instructions}
          tooltipPosition={ETooltipPosition.BOTTOM} 
          tooltipTrianglePosition={ETooltipTrianglePosition.END} />}
      </div>
    );
  }
}

export default FormInput;