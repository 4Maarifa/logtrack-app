import React from 'react';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import './Choose.scss';

class Choose extends ComponentSafeUpdate {

  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      multiple: props.multiple,

      onSelectionChange: props.onSelectionChange,
      selection: props.defaultSelection || [],
      selectionRequired: props.selectionRequired,

      fieldName: props.fieldName
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  shouldComponentUpdate = (nextProps, _) => {
    if(Object.keys(nextProps.items).length !== Object.keys(this.state.items).length) {
      this.setState({items: nextProps.items});
    }
    return true;
  };

  onValueChange = itemKey => {
    if(!!this.state.items[itemKey].disabled) {
      return;
    }

    var selection = this.state.selection;
    if(!!this.state.multiple) {
      if(this.state.selection.includes(itemKey)) {
        if(!!this.state.selectionRequired && this.state.selection.length <= 1) {
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
      if(!!this.state.selectionRequired && itemKey === selection) {
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

  notifyParent = () => !!this.state.onSelectionChange && this.state.onSelectionChange(this.state.selection, this.state.fieldName);

  isItemActive = itemKey => {
    if(!!this.state.multiple) {
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
        <ul>
          {Object.keys(this.state.items).map(key =>
            <li key={key} 
              className={'' + (this.isItemActive(key) ? 'li--active ' : '') + (!!this.state.items[key].disabled ? 'li--disabled' : '')} 
              onClick={() => this.onValueChange(key)}>
                
              {this.state.items[key].content}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Choose;
