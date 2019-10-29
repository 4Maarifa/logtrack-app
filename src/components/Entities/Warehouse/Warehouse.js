import React from 'react';
import { faWarehouse } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Utils/Icon/Icon';

import './Warehouse.scss';

class Warehouse extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = {
      warehouse: props.warehouse,

      options: props.options,
      showDetails: props.showDetails
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  shouldComponentUpdate(nextProps, _) {
    if(!this.state.warehouse || nextProps.warehouse.warehouseKey !== this.state.warehouse.warehouseKey) {
      this.setState({warehouse: nextProps.warehouse});
    }
    if(nextProps.showDetails !== this.state.showDetails) {
      this.setState({showDetails: nextProps.showDetails});
    }
    return true;
  };

  /**
   * RENDER
   */
  render() {
    if(!this.state.warehouse) {
      return (<></>);
    }

    var warehouseKey = Object.keys(this.state.warehouse)[0];
    
    return (
      <div className="Warehouse">
        <div className="base">
          <span>
            <Icon source="fa" icon={faWarehouse} />
            {this.state.warehouse[warehouseKey].name}
          </span>
        </div>
        {!!this.state.showDetails && <div className="details">
          DETAILS
        </div>}
      </div>
    );
  }
}

export default Warehouse;
