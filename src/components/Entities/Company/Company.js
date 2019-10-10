import React from 'react';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import './Company.scss';

class Company extends ComponentSafeUpdate {
  constructor () {
    super();
    this.state = {
      company: null,
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({company: this.props.company});
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
  }

  render() {
    if (!this.state.company) {
      return (<></>);
    }

    var companyKey = Object.keys(this.state.company)[0];
    
    return (
      <div>
        <img width="20" height="20" alt={this.state.company[companyKey].name + '\'s logo'} src={this.state.company[companyKey].logoURL} />
        {this.state.company[companyKey].name}
      </div>
    );
  }
}

export default Company;
