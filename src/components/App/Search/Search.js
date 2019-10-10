import React from 'react';
import { faSearch } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import DataService from '../../../services/data.service';

import FormInput from '../../Utils/FormInput/FormInput';

import Icon from './../../Utils/Icon/Icon';

import './Search.scss';

class Search extends ComponentSafeUpdate {
  constructor() {
    super();
    this.state = Object.assign({
        searchInput: null
      }, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setStateSafe(computedValues);
      })
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  }

  onSearchInputChange = value => {
    this.setStateSafe({searchInput: value});
  }

  /**
   * RENDER
   */
  render() {
    return (
      <div className="Search">
        <FormInput 
          inputType="text" 
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
