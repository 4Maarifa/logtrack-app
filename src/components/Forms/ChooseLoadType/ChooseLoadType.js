import React, { Component } from 'react';

import './ChooseLoadType.css';

import ELoadType from './../../../classes/enums/ELoadType';
import ExTable from './../../Utils/ExTable/ExTable';
import Tabs from './../../Utils/Tabs/Tabs';

class ChooseLoadType extends Component {
  constructor () {
    super();
    this.state = {roleId: null, roleType: '', possibleCompanies: [], selectedCompany: null, companyName: ''};
  }

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
