import React, { Component } from 'react';

import UtilsService from '../../../services/utils.service';

import './Tabs.scss';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: (!!props.default) ? props.default : null
    };
  }

  activateTab = (e) => {
    var target = UtilsService.getClosestElement(e.target, 'tab');
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
