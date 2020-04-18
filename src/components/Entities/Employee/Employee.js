import React from 'react';
import { faUser } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import './Employee.scss';

const Employee = ({ employee }) => {
  if(!employee) { return null; }

  const employeeKey = Object.keys(employee)[0];

  return (
    <div className="Employee Element-content">
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faUser} />
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.EMPLOYEE} entityId={employeeKey} entityData={employee[employeeKey]} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Employee;
