import React, { Fragment } from 'react';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import ExTable from './../../Utils/ExTable/ExTable';
import Tabs from './../../Utils/Tabs/Tabs';

import ELoadType from './../../../classes/enums/ELoadType';

import './ChooseLoadType.scss';

class ChooseLoadType extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = {
      roleId: null, 
      roleType: '', 

      possibleCompanies: [], 
      selectedCompany: null, 
      companyName: ''
    };
  }

  /**
   * RENDER
   */
  renderLoadTypeTab = loadTypeKey => { return {
    name: () => <Fragment>
      {ELoadType[loadTypeKey].icon}
      {ELoadType[loadTypeKey].name}
    </Fragment>,
    content: () => <ExTable key={loadTypeKey} items={ ELoadType[loadTypeKey].subTypes } renderItem={(mode, itemKey, itemData) => this.renderSubLoadType(loadTypeKey, mode, itemKey, itemData)}></ExTable>
  }};

  renderSubLoadType = (loadTypeKey, mode, itemKey, itemData) => {
    return <Fragment>
      {itemData.icon}
      {itemData.name}
    </Fragment>;
  };

  render() {
    var loadTypes = {};
    Object.keys(ELoadType).forEach((loadTypeKey) => loadTypes[loadTypeKey] = this.renderLoadTypeTab(loadTypeKey));
    return <div className="ChooseLoadType">
      <Tabs tabs={loadTypes}></Tabs>
    </div>;
  }
}

export default ChooseLoadType;
