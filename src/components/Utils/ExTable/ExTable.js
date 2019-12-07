import React from 'react';
import { faThLarge, faAlignJustify } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../ComponentSafeUpdate/ComponentSafeUpdate';
import Loader from './../Loader/Loader';
import Icon from './../Icon/Icon';

import './ExTable.scss';

class ExTable extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = {
      view: 'ITEMS'
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  shouldComponentUpdate(_, nextState) {
    if(nextState.view !== this.state.view) {
      this.setState({view: nextState.view});
    }
    return true;
  };

  setView = view => this.setState({view});
  
  render() {
    return (
      <div className={'ExTable ' + (this.state.view === 'LIST' ? 'ExTable--list' : 'ExTable--items')}>
        <div className="header-container">
          {!!this.props.header && !!this.props.header.length &&
            <div className="header">
              {this.props.header.map(header =>
                <span key={header}>{header}</span>  
              )}
            </div>
          }
          <div className="view-switcher">
            <span className={'view ' + (this.state.view === 'ITEMS' ? 'view--active' : '')} onClick={() => this.setView('ITEMS')}>
              <Icon source="fa" icon={faThLarge} />
            </span>
            <span className={'view ' + (this.state.view === 'LIST' ? 'view--active' : '')} onClick={() => this.setView('LIST')}>
              <Icon source="fa" icon={faAlignJustify} />
            </span>
          </div>
        </div>
        <ul>
          {!!this.props.loading && <li className="loader">
            <Loader></Loader>
          </li>}
          {!this.props.loading && Object.keys(this.props.items).map(itemKey => 
            <li key={itemKey} className="item">
              {this.props.renderItem(itemKey, this.props.items[itemKey])}
            </li>)
          }
          {!this.props.loading && !Object.keys(this.props.items).length && 
            <li className="no-item">Nothing to show!</li>
          }
        </ul>
      </div>
    );
  }
}

export default ExTable;
