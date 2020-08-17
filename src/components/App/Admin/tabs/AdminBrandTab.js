import React, { Fragment } from 'react';
import { faStar } from '@fortawesome/pro-solid-svg-icons';

import ExTable from './../../../Utils/ExTable/ExTable';
import Icon from './../../../Utils/Icon/Icon';

import { EBrandDetails } from './../../../../classes/enums/EBrand';

import UtilsService from './../../../../services/utils.service';
import { EquipmentBrandImage } from '../../../Entities/Equipment/Equipment';

const AdminBrandTab = () => {
  
  const renderBrand = (itemId, itemData) => {
    return <div className="Element-content" key={itemId}>
      <div className="Element-base">
        <div className="Element-icon">
          <EquipmentBrandImage size="50" brandId={itemId} type="symbol" />
        </div>
        <div className="Element-data">
          <span className="Element-title">
            {itemData.name}
          </span>
          <span>
            Mono: <EquipmentBrandImage size="40" brandId={itemId} type="mono" /><br/>
            Colored: <EquipmentBrandImage size="40" brandId={itemId} type="color" isDowngradeType={false} /><br/>
            {EBrandDetails[itemId].icons.symbol ? <Fragment>Symbol: <EquipmentBrandImage size="40" brandId={itemId} type="symbol" isDowngradeType={false} /></Fragment> : null}
          </span>
        </div>
      </div>
    </div>
  };
  
  return <div className="AdminBrandTab">
    <ExTable key="BRANDS"
            items={EBrandDetails}
            renderItem={renderBrand}
            fss={{
              sort: {
                name: {
                  title: 'Name',
                  apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
                    (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].name, items[key2].name)
                  )),
                  default: true
                }
              },
              search: (_, itemData, searchTerm) => (
                itemData.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
            }}
            header={<span><Icon source="fa" icon={faStar} /> Brands</span>}
            loading={false} />
  </div>;
};

export default AdminBrandTab;
