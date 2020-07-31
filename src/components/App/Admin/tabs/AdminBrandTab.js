import React, { Fragment } from 'react';
import { faStar } from '@fortawesome/pro-solid-svg-icons';

import ExTable from './../../../Utils/ExTable/ExTable';
import Icon from './../../../Utils/Icon/Icon';

import { EBrandDetails } from './../../../../classes/enums/EBrand';

import UtilsService from './../../../../services/utils.service';

const AdminBrandTab = () => {
  
  const renderBrand = (itemId, itemData) => {
    const IconTagSymbol = itemData.icons.symbol ? itemData.icons.symbol : null;
    const IconTagMono = itemData.icons.mono;
    const IconTagColor = itemData.icons.color;

    return <div className="Element-content" key={itemId}>
      <div className="Element-base">
        <div className="Element-icon">
          {IconTagSymbol ? <IconTagSymbol width="50" height="50" fill={itemData.color} />
            : <IconTagMono width="50" height="50" fill={itemData.color} />}
        </div>
        <div className="Element-data">
          <span className="Element-title">
            {itemData.name}
          </span>
          <span>
            Colored: <IconTagColor width="25" height="25" /> / Mono: <IconTagMono width="25" height="25" fill={itemData.color} /> {IconTagSymbol ? <Fragment> / Symbol: <IconTagSymbol width="25" height="25" fill={itemData.color} /></Fragment> : null}
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
