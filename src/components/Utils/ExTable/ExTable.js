import React, { Component } from 'react';

import './ExTable.css';
import UtilsService from '../../../services/utils.service';

class ExTable extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: null,
      items: {},
      renderItem: null
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(Object.keys(nextProps.items).length !== Object.keys(this.state.items).length) {
      this.setState({items: nextProps.items});
      return true;
    }
    return (nextState.activeItem !== this.state.activeItem);
  }

  componentWillMount() {
    if(!!this.props.default && this.state.activeItem !== this.props.default) {
      this.setState({activeItem: this.props.default});
    }
    this.setState({items: this.props.items, renderItem: this.props.renderItem});
  }

  activateItem = (e) => {
    var target = UtilsService.getClosestElement(e.target, 'item');
    this.setState({activeItem: target.getAttribute('data-item-id')});
  }
  
  render() {
    return (
      <div>
        EXTABLE
        <ul>
          {
            Object.keys(this.state.items).map((itemKey) => 
              <li key={itemKey} className={'item ' + ((itemKey === this.state.activeItem) ? 'selected' : '')} data-item-id={itemKey} onClick={this.activateItem}>
                {this.state.renderItem((itemKey === this.state.activeItem) ? 'active' : 'unactive', itemKey, this.state.items[itemKey])}
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default ExTable;
