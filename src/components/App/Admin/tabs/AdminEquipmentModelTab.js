import React from 'react';
import { faTruck } from '@fortawesome/pro-solid-svg-icons';

import ExTable from './../../../Utils/ExTable/ExTable';
import Icon from './../../../Utils/Icon/Icon';

import UtilsService from './../../../../services/utils.service';

import { EEquipmentModelDetails, EEquipmentModelSubTypeDetails } from './../../../../classes/enums/EEquipmentModel';
import { EquipmentModelImage, EquipmentBrandImage } from './../../../Entities/Equipment/Equipment';

const AdminEquipmentModelTab = () => {
  
  const renderEquipmentModel = (itemId, itemData) => {

    return <div className="Element-content" key={itemId}>
      <div className="Element-base">
        <span className="Element-badge badge">
          {EEquipmentModelSubTypeDetails[itemData.type][itemData.subType].icon}
        </span>

        <div className="Element-photo">
          <EquipmentModelImage equipmentModelId={itemId} />
        </div>

        <div className="Element-data">
          <span className="Element-title">
            <EquipmentBrandImage brandId={itemData.brand} type="symbol" size="25" />
            {itemData.name}
          </span>
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
