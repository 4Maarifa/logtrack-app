import React from 'react';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import UtilsService from '../../../services/utils.service';

import Loader from './../Loader/Loader';

import './ExTable.scss';

class ExTable extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: (!!props.default) ? props.default : null,
      items: (!!props.items) ? props.items : {},
      header: (!!props.header) ? props.header : [],
      renderItem: (!!props.renderItem) ? props.renderItem : null,
      loading: props.loading
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(Object.keys(nextProps.items).length !== Object.keys(this.state.items).length) {
      this.setStateSafe({items: nextProps.items});
      return true;
    }
    if(nextProps.loading !== this.state.loading) {
      this.setStateSafe({loading: nextProps.loading});
      return true;
    }
    return (nextState.activeItem !== this.state.activeItem);
  }

  activateItem = (e) => {
    var target = UtilsService.getClosestElement(e.target, 'item');
    this.setStateSafe({
      activeItem: (this.state.activeItem === target.getAttribute('data-item-id') ? null : target.getAttribute('data-item-id'))});
  }
  
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
              <li key={itemKey} className={'item ' + ((itemKey === this.state.activeItem) ? 'item--selected' : '')} data-item-id={itemKey} onClick={this.activateItem}>
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
