import React, { useState, useEffect } from 'react';
import { faUser, faUserCog, faUserPlus, faUserTag, faPortrait,
  faAward, faClipboardUser, faTimes } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ActionList from './../../Utils/ActionList/ActionList';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import UtilsService from './../../../services/utils.service';
import EmployeeService from './../../../services/entities/employee.service';
import ErrorService from './../../../services/error.service';

import { ERole, ERoleDetails } from './../../../classes/Role';
import { printAccountActivityDetails, EAccountActivityTypeDetails } from './../../../classes/Employee';

import { v4 as uuid } from 'uuid';

import './Employee.scss';

const Employee = ({ employee, isPage }) => {
  if(!employee) { return null; }

  const employeeKey = Object.keys(employee)[0];

  const observerKey = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey);
  }, []);

  if(!computed.initialized) { return null; }

  const actions = [];

  if(!isPage) {
    actions.push({ title: 'Visit Profile', icon: <Icon source="fa" icon={faUser} />, link: `/employee/${employeeKey}` });
  }

  if(computed.user.uid === employeeKey) {
    actions.push({ title: 'Modify Profile', icon: <Icon source="fa" icon={faUserCog} />, link: '/profile' });
    actions.push({ title: 'Modify Pro Profile', icon: <Icon source="fa" icon={faPortrait} />, link: '/jobs?tab=profile' });
    actions.push({ title: 'Request a role', icon: <Icon source="fa" icon={faUserTag} />, link: '/role-add' });
  }
  else {
    if (computed.activeRole.role === ERole.MANAGER) {
      actions.push({ title: 'Offer a role', icon: <Icon source="fa" icon={faUserPlus} />, link: `/role-offer/${employeeKey}` });
    }
  }

  /**
   * RENDER
   */
  return (
    <div className="Employee Element-content">
      <div className="Element-base">
        {employee[employeeKey] && employee[employeeKey].profilePictureUrl ?
          <div className="Element-photo">
            <img
              alt={employee[employeeKey].firstname + ' ' + employee[employeeKey].lastname + '\'s profile picture'} 
              src={employee[employeeKey].profilePictureUrl} />
          </div>
        : <Icon containerclassname="Element-icon" source="fa" icon={faUser} /> }
        <div className="Element-data">
          <span className="Element-title">
            <PageLink type={PageLinkType.EMPLOYEE} entityId={employeeKey} entityData={employee[employeeKey]} noPhoto white={isPage} />
          </span>
        </div>
        <div className="Element-actions">
          <ActionList actions={actions} isFlatten={isPage} />
        </div>
      </div>
    </div>
  );
};

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
export const EmployeeCertificate = ({ certificate, employeeId }) => {
  const observerKey = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const deleteCertificate = () => {
    let certificates = computed.employee.certificates.filter(c => c.name !== certificate.name);
    EmployeeService.updateField(computed.user.uid, {certificates})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey);
  }, []);

  if(!computed.initialized) { return null; }

  return (<div className="certificate Element-content">
    <div className="Element-base">
      <Icon containerclassname="Element-icon" source="fa" icon={faAward} />
      <div className="Element-data">
        <span className="Element-title">
          {certificate.name}
        </span>
        <span className="sub">
          {DateService.getMonthYearString(DateService.getDateFromIsoString(certificate.date))}
        </span>
      </div>
      {computed.user.uid === employeeId ?
        <div className="Element-actions">
          <ActionList actions={[
            { title: 'Delete certificate', icon: <Icon source="fa" icon={faTimes} />, callback: deleteCertificate }
          ]} />
        </div>
      : null}
    </div>
  </div>);
};

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
export const EmployeeExperience = ({ exp, company }) => {
  let companyId = Object.keys(company)[0];

  return <div className="experience Element-content">
    <div className="Element-base">
      <Icon containerclassname="Element-icon" source="fa" icon={ERoleDetails[exp.role].icon} />
      <div className="Element-data">
        <span className="Element-title">
          {ERoleDetails[exp.role].name} @
          <PageLink type={PageLinkType.COMPANY} entityId={companyId} entityData={company[companyId]} />
        </span>
        <span className="sub">
          {DateService.getMonthYearString(
            DateService.getDateFromIsoString(exp.creationIsoDate)) + ' - ' + 
            (exp.status === 'CONFIRMED' ? 'Current' : DateService.getMonthYearString(DateService.getDateFromIsoString(exp.revokedIsoDate)))}
        </span>
      </div>
    </div>
  </div>};

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
export const EmployeeOtherExperience = ({ otherExp, employeeId }) => {
  const observerKey = uuid();

  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const deleteOtherExperience = () => {
    let experience = computed.employee.experience.filter(e => !(e.name === otherExp.name && e.company === otherExp.company));
    EmployeeService.updateField(computed.user.uid, {experience})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey);
  }, []);

  if(!computed.initialized) { return null; }

  return (<div className="experience Element-content">
    <div className="Element-base">
      <Icon containerclassname="Element-icon" source="fa" icon={faClipboardUser} />
      <div className="Element-data">
        <span className="Element-title">{otherExp.name} @ {otherExp.company}</span>
        <span className="sub">
          {DateService.getMonthYearString(DateService.getDateFromIsoString(otherExp.start))} - 
          {otherExp.end ? DateService.getMonthYearString(DateService.getDateFromIsoString(otherExp.end)) : 'Current'}
        </span>
      </div>
      {computed.user.uid === employeeId ?
        <div className="Element-actions">
          <ActionList actions={[
            { title: 'Delete experience', icon: <Icon source="fa" icon={faTimes} />, callback: deleteOtherExperience }
          ]} />
        </div>
      : null}
    </div>
  </div>);
};

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
export const EmployeeAccountActivity = ({ activity }) => (
  <div className="Equipment Element-content Element-content-small">
    <div className="Element-base">
      <Icon containerclassname="Element-icon" source="fa" icon={EAccountActivityTypeDetails[activity.type].icon} />
      <div className="Element-data">
        <span className="Element-title">
          {EAccountActivityTypeDetails[activity.type].title}
        </span>
        <span className="sub">
          {printAccountActivityDetails(activity)}
        </span>
      </div>
    </div>
  </div>
);

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
