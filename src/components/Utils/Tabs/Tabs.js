import React, { Component } from 'react';

import Utils from '../../../utils';

import './Tabs.css';

class Tabs extends Component {
  constructor() {
    super();
    this.state = {activeTab: null};
  }

  componentWillMount() {
    if(!!this.props.default && this.state.activeTab !== this.props.default) {
      this.setState({activeTab: this.props.default});
    }
  }

  activateTab = (e) => {
    var target = Utils.getClosestElement(e.target, 'tab');
    this.setState({activeTab: target.getAttribute('data-tab-id')});
  }

  render() {
    return (
      <div>
        TABS
        <ul>
          {
            Object.keys(this.props.tabs).map((tabKey) => 
              <li key={tabKey} className={'tab ' + ((tabKey === this.state.activeTab) ? 'selected' : '')} data-tab-id={tabKey} onClick={this.activateTab}>
                {this.props.tabs[tabKey].name()} 
              </li>
            )
          }
        </ul>

        {(!!this.state.activeTab) ? <div>
          {this.props.tabs[this.state.activeTab].content()}
        </div> : <div></div>}
      </div>
    );
  }
}

export default Tabs;
