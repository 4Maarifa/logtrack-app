import React, { Fragment } from 'react';
import { faUser } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import './Employee.scss';

class Employee extends ComponentSafeUpdate {

  /**
   * RENDER
   */
  render() {
    if(!this.props.employee) {
      return (<Fragment></Fragment>);
    }

    var employeeKey = Object.keys(this.props.employee)[0];

    return (
      <div className="Employee Element-content">
        <div className="Element-base">
          <Icon containerclassname="Element-icon" source="fa" icon={faUser} />
          <div className="Element-data">
            <span className="Element-title">
              <PageLink type={PageLinkType.EMPLOYEE} entityId={employeeKey} entityData={this.props.employee[employeeKey]} />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Employee;
