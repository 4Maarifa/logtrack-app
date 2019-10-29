import React from 'react';
import { faFileSignature, faPlus } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import DataService from './../../../services/data.service';

import ActionButton from './../../Utils/ActionButton/ActionButton';
import Icon from './../../Utils/Icon/Icon';

import './Contracts.scss';

/**
 * Component: Contracts
 * Used by managers to list contracts that link to other companies
 */
class Contracts extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({
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

  /**
   * RENDER
   */
  render() {
    return (
      <div className="Contracts">
        Contracts
        <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
          {title: 'Add a contract', icon: <Icon source="fa" icon={faFileSignature} />, link: `/contract-add`}
        ]} />
      </div>
    );
  }
}

export default Contracts;
