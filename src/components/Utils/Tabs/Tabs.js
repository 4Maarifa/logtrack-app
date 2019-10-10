import React from 'react';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import UtilsService from '../../../services/utils.service';

import './Tabs.scss';

class Tabs extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: (!!props.default) ? props.default : null
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
  }

  activateTab = (e) => {
    var target = UtilsService.getClosestElement(e.target, 'tab');
    this.setStateSafe({activeTab: target.getAttribute('data-tab-id')});
  }

  render() {
    return (
      <div className="Tabs">
        <ul>
          {
            Object.keys(this.props.tabs).map((tabKey) => 
              <li key={tabKey} className={'tab ' + ((tabKey === this.state.activeTab) ? 'selected' : '')} data-tab-id={tabKey} onClick={this.activateTab}>
                {this.props.tabs[tabKey].name()} 
              </li>
            )
          }
        </ul>

        {(!!this.state.activeTab) ? <div className="tab-container">
          {this.props.tabs[this.state.activeTab].content()}
        </div> : <div className="tab-container"></div>}
      </div>
    );
  }
}

export default Tabs;
