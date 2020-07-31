import React from 'react';
import { faTruck } from '@fortawesome/pro-solid-svg-icons';

import ExTable from './../../../Utils/ExTable/ExTable';
import Icon from './../../../Utils/Icon/Icon';

import UtilsService from './../../../../services/utils.service';

import { EEquipmentModelDetails, EEquipmentModelSubTypeDetails } from './../../../../classes/enums/EEquipmentModel';
import { EBrandDetails } from './../../../../classes/enums/EBrand';

const AdminEquipmentModelTab = () => {
  
  const renderEquipmentModel = (itemId, itemData) => {
    const BrandIcon = EBrandDetails[itemData.brand].icons.mono;

    return <div className="Element-content" key={itemId}>
      <div className="Element-base">
        <span className="Element-badge badge">
          {EEquipmentModelSubTypeDetails[itemData.type][itemData.subType].icon}
        </span>

        <div className="Element-photo">
          <img
            alt={itemData.name} 
            src={itemData.image} />
        </div>

        <div className="Element-data">
          <span className="Element-title">
            {itemData.name}
          </span>
          <BrandIcon width="50" height="50" />
        </div>
      </div>
    </div>
  };
  
  return <div className="AdminEquipmentModelTab">
    <ExTable key="MODELS"
            items={EEquipmentModelDetails}
            renderItem={renderEquipmentModel}
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
            header={<span><Icon source="fa" icon={faTruck} /> Models</span>}
            loading={false} />
  </div>;
};

export default AdminEquipmentModelTab;
