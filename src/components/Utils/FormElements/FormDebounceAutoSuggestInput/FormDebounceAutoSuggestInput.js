import React from 'react';
import { faCheck, faTimes, faEdit } from '@fortawesome/pro-solid-svg-icons';
import { DelayInput } from 'react-delay-input';

import ComponentSafeUpdate from './../../ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import './FormDebounceAutoSuggestInput.scss';

const uuidv4 = require('uuid/v4');

class FormDebounceAutoSuggestInput extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = {
      value: props.value || '',
      lastPropValue: props.value,

      selectedItemKey: props.selectedItemKey || '',
      selectedItem: props.selectedItem,

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

  onItemChange = itemKey => {
    this.setState({
      selectedItemKey: itemKey,
      selectedItem: this.props.possibleItems[itemKey],
      value: ''
    });
    !!this.props.onValueChange && this.props.onValueChange('', this.props.fieldName);
    !!this.props.onSelectedItemChange && this.props.onSelectedItemChange(itemKey, this.props.fieldName, this.props.possibleItems[itemKey]);
  };

  reset = () => {
    this.setState({
      selectedItemKey: '',
      selectedItem: null,
      value: ''
    });
    !!this.props.onValueChange && this.props.onValueChange('', this.props.fieldName, null);
    !!this.props.onSelectedItemChange && this.props.onSelectedItemChange(null, this.props.fieldName);
  };

  isValid = () => !this.props.inputRequired || !!this.state.selectedItem;

  /**
   * RENDER
   */
  render() {
    const inputId = uuidv4();
    return (
      <div className={'FormDebounceAutoSuggestInput '
        + (this.isValid() ? 'input--valid ' : 'input--invalid ')
        + (!!this.props.fieldName ? 'input-' + this.props.fieldName : '')}>

        {!this.state.selectedItemKey &&
          <DelayInput
            id={inputId}
            delayTimeout={1100}
            className={'input ' + (!this.state.value ? 'input--empty' : '')}
            type="text"
            value={this.state.value}
            name={this.props.inputName}
            autoComplete={this.props.inputAutoComplete}
            onChange={e => this.onChange(e.target.value)} />
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
          required={this.props.inputRequired} 
          value={this.state.selectedItemKey} />

        {!this.state.selectedItemKey && !!this.props.possibleItems && !!Object.keys(this.props.possibleItems).length && 
          <ul className="items">
            {Object.keys(this.props.possibleItems).map(key =>
              <li key={key} onClick={() => this.onItemChange(key)}>
                {this.props.possibleItems[key].content}
              </li>
            )}
          </ul>
        }

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

export default FormDebounceAutoSuggestInput;
