import React from 'react';
import { faCheck, faTimes, faEdit } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import './FormAutoSuggestInput.scss';

const uuidv4 = require('uuid/v4');

class FormAutoSuggestInput extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = {
      onValueChange: props.onValueChange,
      onSelectedItemChange: props.onSelectedItemChange,
      possibleItems: props.possibleItems,

      fieldName: props.fieldName,
      inputName: props.inputName,
      inputAutoComplete: props.inputAutoComplete,
      inputRequired: props.inputRequired,

      value: !!this.props.value ? this.props.value : '',
      selectedItemKey: '',
      selectedItem: null,
      label: props.label,

      instructions: props.instructions,

      hover: false
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
  }

  shouldComponentUpdate = (nextProps, _) => {
    if(!!nextProps.possibleItems && 
        Object.keys(nextProps.possibleItems).length !== Object.keys(this.state.possibleItems).length) {
      this.setState({possibleItems: nextProps.possibleItems});
    }
    if(nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value});
    }
    return true;
  }

  onChange = event => {
    this.setState({value: event.target.value});
    !!this.state.onValueChange && this.state.onValueChange(event.target.value, this.state.fieldName);
  }

  onItemChange = itemKey => {
    this.setState({
      selectedItemKey: itemKey,
      selectedItem: this.state.possibleItems[itemKey],
      possibleItems: {},
      value: ''
    });
    !!this.state.onValueChange && this.state.onValueChange('', this.state.fieldName);
    !!this.state.onSelectedItemChange && this.state.onSelectedItemChange(itemKey, this.state.fieldName, this.state.possibleItems[itemKey]);
  }

  reset = () => {
    this.setState({
      selectedItemKey: '',
      selectedItem: null,
      possibleItems: {},
      value: ''
    });
    !!this.state.onSelectedItemChange && this.state.onSelectedItemChange(null, this.state.fieldName);
    !!this.state.onValueChange && this.state.onValueChange('', this.state.fieldName, null);
  }

  isValid = () => {
    return !this.state.inputRequired || !!this.state.selectedItem;
  }

  /**
   * RENDER
   */
  render() {
    const inputId = uuidv4();
    return (
      <div className={'FormAutoSuggestInput ' 
        + (this.isValid() ? 'input--valid ' : 'input--invalid ')
        + (!!this.state.fieldName ? 'input-' + this.state.fieldName : '')}>
        
        {!this.state.selectedItemKey &&
          <input
            id={inputId}
            className={'input ' + (!this.state.value ? 'input--empty' : '')}
            type="text"
            value={this.state.value}
            name={this.state.inputName}
            autoComplete={this.state.inputAutoComplete}
            onChange={this.onChange} />
        }

        {!!this.state.selectedItemKey && !!this.state.selectedItem && 
          <div className="selected-item">
            {this.state.selectedItem.content}
            <span className="action" onClick={this.reset}>
              <Icon source="fa" icon={faEdit} />
            </span>
          </div>
        }

        <input 
          className={(!this.state.selectedItem ? 'input--empty' : '')}
          type="hidden" 
          required={this.state.inputRequired} 
          value={this.state.selectedItemKey} />

        {!!this.state.possibleItems && !!Object.keys(this.state.possibleItems).length && 
          <ul className="items">
            {Object.keys(this.state.possibleItems).map(key =>
              <li key={key} onClick={() => this.onItemChange(key)}>
                {this.state.possibleItems[key].content}
              </li>
            )}
          </ul>
        }

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

export default FormAutoSuggestInput;
