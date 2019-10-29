import React from 'react';

import ComponentSafeUpdate from './../ComponentSafeUpdate/ComponentSafeUpdate';

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
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  activateTab = activeTab => this.setState({activeTab});

  render() {
    return (
      <div className="Tabs">
        <ul>
          {
            Object.keys(this.props.tabs).map(tabKey => 
              <li key={tabKey} className={'tab ' + ((tabKey === this.state.activeTab) ? 'selected' : '')} onClick={() => this.activateTab(tabKey)}>
                {this.props.tabs[tabKey].name()} 
              </li>
            )
          }
        </ul>

        {!!this.state.activeTab ? <div className="tab-container">
          {this.props.tabs[this.state.activeTab].content()}
        </div> : <div className="tab-container"></div>}
      </div>
    );
  }
}

export default Tabs;
