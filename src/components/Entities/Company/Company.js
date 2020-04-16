import React, { Fragment } from 'react';
import { faBuilding } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import './Company.scss';

class Company extends ComponentSafeUpdate {

  /**
   * RENDER
   */

  render() {
    if(!this.props.company) {
      return (<Fragment></Fragment>);
    }

    var companyKey = Object.keys(this.props.company)[0];

    return (
      <div className="Company Element-content">
        <div className="Element-base">
          <Icon containerclassname="Element-icon" source="fa" icon={faBuilding} />
          <div className="Element-data">
            <span className="Element-title">
              <PageLink type={PageLinkType.COMPANY} entityId={companyKey} entityData={this.props.company[companyKey]} />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Company;
