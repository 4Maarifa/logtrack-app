import React from 'react';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import './FormInput.scss';

const uuidv4 = require('uuid/v4');

class FormInput extends ComponentSafeUpdate {
  constructor () {
    super();
    this.state = {
      onValueChange: null,

      inputType: 'text',
      fieldName: null,

      value: '',
      label: null,

      initialized: false
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({
      onValueChange: this.props.onValueChange,
      inputType: (this.props.inputType ? this.props.inputType : 'text'),
      value: (!!this.props.value ? this.props.value : ''),
      label: this.props.label,
      initialized: true,
      fieldName: this.props.fieldName
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
  }

  onChange = event => {
    this.setStateSafe({value: event.target.value});
    !!this.state.onValueChange && this.state.onValueChange(event.target.value, this.state.fieldName);
  }

  /**
   * RENDER
   */
  render() {
    const inputId = uuidv4();
    return (
      <div className="FormInput">
        {!!this.state.initialized && <input
          id={inputId}
          className={'input ' + (!this.state.value ? 'input--empty' : '')}
          type={this.state.inputType}
          value={this.state.value}
          onChange={this.onChange}
          required />}
        {!!this.state.label && 
          <label htmlFor={inputId}>
            {this.state.label}
          </label>
        }
      </div>
    );
  }
}

export default FormInput;
