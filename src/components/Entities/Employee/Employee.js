import React, { useState, useEffect } from 'react';
import { faUser, faUserCog, faUserPlus, faUserTag, faPortrait,
  faAward, faClipboardUser, faTimes } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ActionList from './../../Utils/ActionList/ActionList';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import UtilsService from './../../../services/utils.service';
import EmployeeService from './../../../services/entities/employee.service';
import ErrorService from './../../../services/error.service';

import { ERole, ERoleDetails, ERoleStatus } from './../../../classes/Role';
import { EAccountActivityTypeDetails } from './../../../classes/Employee';

import { v4 as uuid } from 'uuid';

import './Employee.scss';

/**
 * Component: Employee
 * Print employee details
 */
const Employee = ({ employee, isPage }) => {
  if(!employee) { return null; }

  const EMPLOYEE_ID = Object.keys(employee)[0];
  const EMPLOYEE_DATA = employee[EMPLOYEE_ID];

  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  // Computing actions
  const ACTIONS = [];

  if(!isPage) {
    ACTIONS.push({ title: 'Visit Profile', icon: <Icon source="fa" icon={faUser} />, link: `/employee/${EMPLOYEE_ID}` });
  }

  if(computed.user.uid === EMPLOYEE_ID) {
    // If current user, add actions about modifications and role request
    ACTIONS.push({ title: 'Modify Profile', icon: <Icon source="fa" icon={faUserCog} />, link: '/profile' });
    ACTIONS.push({ title: 'Modify Pro Profile', icon: <Icon source="fa" icon={faPortrait} />, link: '/jobs?tab=profile' });
    ACTIONS.push({ title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: '/role-add' });
  }
  else {
    if (computed.activeRole.role === ERole.MANAGER) {
      // If current user is manager, propose to offer a role
      ACTIONS.push({ title: 'Offer a role', icon: <Icon source="fa" icon={faUserPlus} />, link: `/role-offer/${EMPLOYEE_ID}` });
    }
  }

  /**
   * RENDER
   */
  return (
    <div className="Employee Element-content">
      <div className="Element-base">
        {EMPLOYEE_DATA.profilePictureUrl ?
          <div className="Element-photo">
            <img
              alt={EMPLOYEE_DATA.firstname + ' ' + EMPLOYEE_DATA.lastname + '\'s profile picture'} 
              src={EMPLOYEE_DATA.profilePictureUrl} />
          </div>
        : <Icon containerclassname="Element-icon" source="fa" icon={faUser} /> }
        <div className="Element-data">
          <span className="Element-title">
            {/* Employee pagelink */}
            <PageLink type={PageLinkType.EMPLOYEE} entityId={EMPLOYEE_ID} entityData={EMPLOYEE_DATA} noPhoto white={isPage} />
          </span>
        </div>
        <div className="Element-actions">
          {/* actions */}
          <ActionList actions={ACTIONS} isFlatten={isPage} />
        </div>
      </div>
    </div>
  );
};

// FSS for employees (used to filter, search and sort employees) => sort on name, search on name
export const employeesExTableFSS = {
  sort: {
    name: {
      title: 'Name',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(
          items[key1].firstname + ' ' + items[key1].lastname, 
          items[key2].firstname + ' ' + items[key2].lastname)
      )),
      default: true
    }
  },
  search: (_, itemData, searchTerm) => (
    itemData.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    itemData.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  )
};

/*
   *** *** *** *** *** *** *** *** *** *** *** ***
   *   *   * *  *   *  *    *  *   * *  *  *   *
   *   **  ***  *   *  **   *  *   ***  *  **  ***
   *   *   **   *   *  *    *  *   * *  *  *     *
   *** *** * *  *  *** *   *** *** * *  *  *** ***
*/

/**
 * Component: EmployeeCertificate
 * Render a user's certificate
 */
export const EmployeeCertificate = ({ certificate, employeeId }) => {
  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const deleteCertificate = () => {
    // delete certificate

    // Remove it via filter
    let certificates = computed.employee.certificates.filter(c => c.name !== certificate.name);
    
    // Update current employee
    EmployeeService.updateField(computed.user.uid, {certificates})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  return (<div className="certificate Element-content">
    <div className="Element-base">
      <Icon containerclassname="Element-icon" source="fa" icon={faAward} />
      <div className="Element-data">
        {/* Certificate details */}
        <span className="Element-title">
          {certificate.name}
        </span>
        <span className="sub">
          {DateService.getMonthYearString(DateService.getDateFromIsoString(certificate.date))}
        </span>
      </div>
      {computed.user.uid === employeeId ?
        <div className="Element-actions">
          {/* Certificate actions */}
          <ActionList actions={[
            { title: 'Delete certificate', icon: <Icon source="fa" icon={faTimes} />, callback: deleteCertificate }
          ]} />
        </div>
      : null}
    </div>
  </div>);
};

// FSS about certificates (filter, search and sort certificates) => sort on date and name, search on name
export const employeeCertificatesExTableFSS = {
  sort: {
    date: {
      title: 'Date',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'DESC' ? 1 : -1) * UtilsService.compareFn(items[key1].date, items[key2].date)
      )),
      default: true
    },
    name: {
      title: 'Name',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].name, items[key2].name)
      ))
    }
  },
  search: (_, itemData, searchTerm) => (
    itemData.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
};

/*
  *** * * *** *** *** *** *** *  * *** ***
  *   * * * * *   * *  *  *   ** * *   *
  **   *  *** **  ***  *  **  **** *   **
  *   * * *   *   **   *  *   * ** *   *
  *** * * *   *** * * *** *** * ** *** ***
*/

/**
 * Component: EmployeeExperience
 * Used to print user's Experience (via existing role)
 */
export const EmployeeExperience = ({ exp, company }) => {
  let companyId = Object.keys(company)[0];

  return <div className="experience Element-content">
    <div className="Element-base">
      <Icon containerclassname="Element-icon" source="fa" icon={ERoleDetails[exp.role].icon} />
      <div className="Element-data">

        {/* Role details */}
        <span className="Element-title">
          {/* Company pagelink */}
          {ERoleDetails[exp.role].name} @
          <PageLink type={PageLinkType.COMPANY} entityId={companyId} entityData={company[companyId]} />
        </span>
        <span className="sub">
          {DateService.getMonthYearString(
            DateService.getDateFromIsoString(exp.creationIsoDate)) + ' - ' + 
            (exp.status !== ERoleStatus.REVOKED ? 'Current' : DateService.getMonthYearString(DateService.getDateFromIsoString(exp.revokedIsoDate)))}
        </span>

        {/* Print if request is draft or denied */}
        {exp.status === ERoleStatus.DRAFT ? <span className="Element-badge badge">DRAFT</span> : null}
        {exp.status === ERoleStatus.DENIED ? <span className="Element-badge badge">DENIED</span> : null}
      </div>
    </div>
  </div>};

// FSS for EmployeeExperience (filter, search, sort employee experience) => sort by end date and role, search on role
export const employeeExperienceExTableFSS = {
  sort: {
    end: {
      title: 'Date',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'DESC' ? 1 : -1) * UtilsService.compareFn(items[key1].revokedIsoDate || 'C', items[key2].revokedIsoDate || 'C')
      )),
      default: true
    },
    role: {
      title: 'Role',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'DESC' ? 1 : -1) * UtilsService.compareFn(items[key1].role, items[key2].role)
      ))
    }
  },
  search: (_, itemData, searchTerm) => (
    itemData.role.toLowerCase().includes(searchTerm.toLowerCase())
  )
};

/*
  *** *** * * *** ***
  * *  *  * * *   * * 
  * *  *  *** **  ***
  * *  *  * * *   **
  ***  *  * * *** * *
*/

/**
 * Component: EmployeeOtherExperience
 * Print details about an employee's other experience
 */
export const EmployeeOtherExperience = ({ otherExp, employeeId }) => {
  const OBSERVER_KEY = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const deleteOtherExperience = () => {
    // Delete other experience

    // Filter the experience from the other experience array
    let experience = computed.employee.experience.filter(e => !(e.name === otherExp.name && e.company === otherExp.company));

    // Update the employee
    EmployeeService.updateField(computed.user.uid, {experience})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  return (<div className="experience Element-content">
    <div className="Element-base">
      <Icon containerclassname="Element-icon" source="fa" icon={faClipboardUser} />
      <div className="Element-data">
        {/* Other experience details */}
        <span className="Element-title">{otherExp.name} @ {otherExp.company}</span>
        <span className="sub">
          {DateService.getMonthYearString(DateService.getDateFromIsoString(otherExp.start))} - 
          {otherExp.end ? DateService.getMonthYearString(DateService.getDateFromIsoString(otherExp.end)) : 'Current'}
        </span>
      </div>
      {computed.user.uid === employeeId ?
        <div className="Element-actions">
          {/* Other experience actions */}
          <ActionList actions={[
            { title: 'Delete experience', icon: <Icon source="fa" icon={faTimes} />, callback: deleteOtherExperience }
          ]} />
        </div>
      : null}
    </div>
  </div>);
};

// FSS for other experience (used to filter, search and sort other expericence) => sort by end date and title search on title and company
export const employeeOtherExperiencesExTableFSS = {
  sort: {
    end: {
      title: 'Date',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'DESC' ? 1 : -1) * UtilsService.compareFn(items[key1].end, items[key2].end)
      )),
      default: true
    },
    title: {
      title: 'Title',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].title, items[key2].title)
      ))
    }
  },
  search: (_, itemData, searchTerm) => (
    itemData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    itemData.company.toLowerCase().includes(searchTerm.toLowerCase())
  )
};

/*
  *** *** *** *** * * *** *** * *
  * * *    *   *  * *  *   *  * *
  *** *    *   *  * *  *   *   *
  * * *    *   *  * *  *   *   *
  * * ***  *  ***  *  ***  *   *
*/

/**
 * Component: EmployeeAccountActivity
 * Print details about an employee's account activity
 */
export const EmployeeAccountActivity = ({ activity }) => (
  <div className="Equipment Element-content Element-content-small">
    <div className="Element-base">
      <Icon containerclassname="Element-icon" source="fa" icon={EAccountActivityTypeDetails[activity.type].icon} />
      <div className="Element-data">
        {/* Details, with its metadata and dates */}
        <span className="Element-title">
          {EAccountActivityTypeDetails[activity.type].title}
        </span>
        <span className="sub">
          {DateService.getDateTimeString(DateService.getDateFromIsoString(activity.creationIsoDate), false)}
          {activity.metadata.city && activity.metadata.country ?
              `, Near ${activity.metadata.city}, ${activity.metadata.country}`
          : null}
          {activity.metadata.ip ? `, IP: ${activity.metadata.ip}` : null}
        </span>
      </div>
    </div>
  </div>
);

// FSS for EmployeeAccountActivity (used to search, sort and filter them) => sort on creation date and type, search on type
export const employeeAccountActivityExTableFSS = {
  sort: {
    creationIsoDate: {
      title: 'Date',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'DESC' ? 1 : -1) * UtilsService.compareFn(items[key1].creationIsoDate, items[key2].creationIsoDate)
      )),
      default: true
    },
    type: {
      title: 'Type',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].type, items[key2].type)
      ))
    }
  },
  search: (_, itemData, searchTerm) => (
    itemData.type.toLowerCase().includes(searchTerm.toLowerCase())
  )
};

export default Employee;
