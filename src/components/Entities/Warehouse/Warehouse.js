import React, { Fragment } from 'react';
import { faWarehouse } from '@fortawesome/pro-solid-svg-icons';

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
      <div className="Warehouse">
        <Icon containerclassname="item-icon" source="fa" icon={faWarehouse} />
        <span className="item-content">
          <PageLink type={PageLinkType.WAREHOUSE} entityId={warehouseKey} entityData={this.props.warehouse[warehouseKey]} />
        </span>
        <span className="item-actions">
          
        </span>
      </div>
    );
  }
}

export default Warehouse;
