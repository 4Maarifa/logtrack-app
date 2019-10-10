import React from 'react';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import ELoadType from './../../../classes/enums/ELoadType';
import ExTable from './../../Utils/ExTable/ExTable';
import Tabs from './../../Utils/Tabs/Tabs';

import './ChooseLoadType.scss';

class ChooseLoadType extends ComponentSafeUpdate {
  constructor () {
    super();
    this.state = {roleId: null, roleType: '', possibleCompanies: [], selectedCompany: null, companyName: ''};
  }

  /**
   * RENDER
   */
  renderLoadTypeTab(loadTypeKey) {
    return {
      name: () => ELoadType[loadTypeKey].name,
      content: () => <ExTable key={loadTypeKey} items={ ELoadType[loadTypeKey].subTypes } renderItem={(mode, itemKey, itemData) => this.renderSubLoadType(loadTypeKey, mode, itemKey, itemData)}></ExTable>
    };
  }

  renderSubLoadType(loadTypeKey, mode, itemKey, itemData) {
    return <span>{loadTypeKey + '>' + itemKey + ' ' + itemData}</span>;
  }

  render() {
    var loadTypes = {};
    Object.keys(ELoadType).forEach((loadTypeKey) => loadTypes[loadTypeKey] = this.renderLoadTypeTab(loadTypeKey));
    return <div>
      <Tabs tabs={loadTypes}></Tabs>
    </div>;
  }
}

export default ChooseLoadType;
