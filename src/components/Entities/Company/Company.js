import React, { Component } from 'react';

import './Company.scss';

class Company extends Component {
  constructor () {
    super();
    this.state = {
      company: null,
    };
  }

  componentDidMount = () => {
    this.setState({company: this.props.company});
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
