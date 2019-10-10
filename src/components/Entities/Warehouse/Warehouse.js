import React from 'react';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import './Warehouse.scss';

class Warehouse extends ComponentSafeUpdate {
  constructor () {
    super();
    this.state = {
      warehouse: null,

      options: {},
      showDetails: false
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({
      warehouse: this.props.warehouse,

      options: this.props.options,
      showDetails: this.props.showDetails
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
  }

  shouldComponentUpdate(nextProps, _) {
    if(!this.state.warehouse || nextProps.warehouse.warehouseKey !== this.state.warehouse.warehouseKey) {
      this.setStateSafe({warehouse: nextProps.warehouse});
    }
    if(nextProps.showDetails !== this.state.showDetails) {
      this.setStateSafe({showDetails: nextProps.showDetails});
    }
    return true;
  }

  /**
   * RENDER
   */
  render() {
    if (!this.state.warehouse) {
      return (<></>);
    }

    var warehouseKey = Object.keys(this.state.warehouse)[0];
    
    return (
      <div className="Warehouse">
        <div className="base">
          <span>
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
