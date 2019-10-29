import React from 'react';
import { faSearch } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Utils/Icon/Icon';
import FormDebounceInput from './../../Utils/FormElements/FormDebounceInput/FormDebounceInput';

import DataService from './../../../services/data.service';

import './Search.scss';

class Search extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({
        searchInput: null
      }, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setState(computedValues);
      })
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  onSearchInputChange = value => this.setState({searchInput: value});

  /**
   * RENDER
   */
  render() {
    return (
      <div className="Search">
        <FormDebounceInput 
          inputType="text"
          inputPattern=".{2,}"
          inputRequired
          instructions={
            <span>
              Please enter your search
            </span>
          }
          value={this.state.searchInput}
          label={
            <span>
              <Icon source="fa" icon={faSearch} />
              Search
            </span>}
          onValueChange={this.onSearchInputChange} />
      </div>
    );
  }
}

export default Search;
