import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature, faPlus } from '@fortawesome/pro-solid-svg-icons';

import DataService from '../../../services/data.service';

import ActionButton from '../../Utils/ActionButton/ActionButton';

import './Contracts.scss';

class Contracts extends Component {
  constructor() {
    super();
    this.state = Object.assign({
      }, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    this.setState({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setState(computedValues, this.computeValues);
      })
    });
  }

  componentWillUnmount = () => {
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  }

  computeValues() {
    
  }

  /**
   * RENDER
   */
  render() {
    return (
      <div>
        Contracts
        <ActionButton icon={<FontAwesomeIcon icon={faPlus} />} actions={[
          {title: 'Add a contract', icon: <FontAwesomeIcon icon={faFileSignature} />, link: `/contract/add`}
        ]} />
      </div>
    );
  }
}

export default Contracts;
