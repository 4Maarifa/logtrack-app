import React from 'react';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import './Choose.scss';

class Choose extends ComponentSafeUpdate {

  constructor(props) {
    super(props);
    this.state = {
      selection: props.defaultSelection || [],
    };
  }

  onValueChange = itemKey => {
    if(!!this.props.items[itemKey].disabled) {
      return;
    }

    var selection = this.state.selection;
    if(!!this.props.multiple) {
      if(this.state.selection.includes(itemKey)) {
        if(!!this.props.selectionRequired && this.state.selection.length <= 1) {
          return;
        }
        selection.splice(selection.indexOf(itemKey), 1);
      }
      else {
        selection.push(itemKey);
      }
      this.setState({selection}, this.notifyParent);
    }
    else {
      if(!!this.props.selectionRequired && itemKey === selection) {
        return;
      }
      this.setState({selection: null}, () => {
        this.notifyParent();
        if(itemKey !== selection) {
          this.setState({selection: itemKey}, this.notifyParent);
        }
      });
    }
  };

  notifyParent = () => !!this.props.onSelectionChange && this.props.onSelectionChange(this.state.selection, this.props.fieldName);

  isItemActive = itemKey => {
    if(!!this.props.multiple) {
      return this.state.selection.includes(itemKey);
    }
    return this.state.selection === itemKey;
  };

  /** 
   * RENDER
   */
  render() {
    return (
      <div className="Choose">
        <ul role="listbox" tabIndex="0" aria-activedescendant={this.state.selection} aria-multiselectable={this.state.multiple}>
          {Object.keys(this.props.items).map(key =>
            <li key={key} 
              id={key}
              role="option"
              aria-selected={this.isItemActive(key)}
              className={'' + (this.isItemActive(key) ? 'li--active ' : '') + (!!this.props.items[key].disabled ? 'li--disabled' : '')} 
              onClick={() => this.onValueChange(key)}>
                
              {this.props.items[key].content}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Choose;
