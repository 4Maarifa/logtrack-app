import React from 'react';

import ComponentSafeUpdate from './../ComponentSafeUpdate/ComponentSafeUpdate';
import Loader from './../Loader/Loader';

import './ExTable.scss';

class ExTable extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = {
      header: (!!props.header) ? props.header : [],
      
      items: (!!props.items) ? props.items : {},

      activeItem: (!!props.default) ? props.default : null,
      renderItem: (!!props.renderItem) ? props.renderItem : null,
      onActivateItem: props.onActivateItem,

      loading: props.loading
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  shouldComponentUpdate(nextProps, nextState) {
    if(Object.keys(nextProps.items).length !== Object.keys(this.state.items).length) {
      this.setState({items: nextProps.items});
      return true;
    }
    if(nextProps.loading !== this.state.loading) {
      this.setState({loading: nextProps.loading});
      return true;
    }
    return (nextState.activeItem !== this.state.activeItem);
  };

  activateItem = itemKey => {
    this.setState({activeItem: (itemKey === this.state.activeItem ? null : itemKey)});
    !!this.state.onActivateItem && this.state.onActivateItem(itemKey);
  };
  
  render() {
    return (
      <div className="ExTable">
        {!!this.state.header && !!this.state.header.length &&
          <div className="header">
            {this.state.header.map(header =>
              <span key={header}>{header}</span>  
            )}
          </div>
        }
        <ul>
          {!!this.state.loading && <li className="loader">
            <Loader></Loader>
          </li>}
          {
            Object.keys(this.state.items).map((itemKey) => 
              <li key={itemKey} className={'item ' + ((itemKey === this.state.activeItem) ? 'item--selected' : '')} onClick={() => this.activateItem(itemKey)}>
                {this.state.renderItem((itemKey === this.state.activeItem) ? 'active' : 'unactive', itemKey, this.state.items[itemKey])}
              </li>
            )
          }
          {!this.state.loading && !Object.keys(this.state.items).length && 
            <li className="no-item">Nothing to show!</li>
          }
        </ul>
      </div>
    );
  }
}

export default ExTable;
