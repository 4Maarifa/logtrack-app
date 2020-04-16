import React, { Fragment } from 'react';
import { faWarehouseAlt, faWarehouse } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import './Warehouse.scss';

class Warehouse extends ComponentSafeUpdate {

  /**
   * RENDER
   */
  render() {
    if(!this.props.warehouse) {
      return (<Fragment></Fragment>);
    }

    var warehouseKey = Object.keys(this.props.warehouse)[0];
    
    return (
      <div className="Warehouse Element-content">
        <div className="Element-base">
          <Icon containerclassname="Element-icon" source="fa" icon={faWarehouseAlt} />
          <div className="Element-data">
            <span className="Element-title">
              <PageLink type={PageLinkType.WAREHOUSE} entityId={warehouseKey} entityData={this.props.warehouse[warehouseKey]} />
            </span>
            {!!this.props.warehouse[warehouseKey].nbLoadingDocks ? <span>
              {this.props.warehouse[warehouseKey].nbLoadingDocks}
              <Icon source="fa" icon={faWarehouse} />
            </span> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Warehouse;
