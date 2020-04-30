import React, { useState, useEffect, Fragment } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { faPlus, faArrowAltToRight, faArrowAltFromLeft, faCalendarAlt,
  faClipboardUser, faInfoCircle, faBuilding, faAward, faSave, faTimes } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../services/data.service';
import UtilsService from './../../../services/utils.service';
import EmployeeService from './../../../services/entities/employee.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import RoleService from './../../../services/entities/role.service';
import CompanyService from './../../../services/entities/company.service';

import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import ActionList from './../../Utils/ActionList/ActionList';
import Icon from './../../Utils/Icon/Icon';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import ExTable from './../../Utils/ExTable/ExTable';
import Choose from './../../Utils/FormElements/Choose/Choose';
import Switch from './../../Utils/FormElements/Switch/Switch';

import { RoleDetails, ERoleStatus } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

const ProfessionalProfile = () => {
  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const [looking, setLooking] = useState(false);
  const [roleSelection, setRoleSelection] = useState([]);
  const [resume, setResume] = useState('');
  
  const [certificateName, setCertificateName] = useState('');
  const [certificateDate, setCertificateDate] = useState(null);
  
  const [experienceName, setExperienceName] = useState('');
  const [experienceCompamyName, setExperienceCompanyName] = useState('');
  const [experienceStartDate, setExperienceStartDate] = useState(null);
  const [experienceEndDate, setExperienceEndDate] = useState(null);
  
  const [roles, setRoles] = useState({});
  const [companies, setCompanies] = useState({});

  const handleSubmitCertificate = event => {
    event.preventDefault();

    if(computed.employee.certificates.filter(certificate => certificate.name === certificateName).length) {
      ErrorService.warning('You already have this certificate!');
      return;
    }

    const certificates = computed.employee.certificates || [];
    certificates.push({name: certificateName, date: DateService.getMonthYearString(certificateDate)});

    EmployeeService.updateField(computed.user.uid, {certificates})
      .then(() => DataService.computed.notifyChanges()
        .then(() => {
          setCertificateName('');
          setCertificateDate(null);
        }))
      .catch(ErrorService.manageError);
  };

  const handleSubmitExperience = event => {
    event.preventDefault();

    if(experienceEndDate && experienceStartDate > experienceEndDate) {
      ErrorService.manageError('Experience start date muse be before end date!');
      return;
    }

    const experience = computed.employee.experience || [];
    experience.push({
      name: experienceName,
      company: experienceCompamyName,
      start: DateService.getMonthYearString(experienceStartDate),
      end: experienceEndDate ? DateService.getMonthYearString(experienceEndDate) : null
    });

    EmployeeService.updateField(computed.user.uid, {experience})
      .then(() => DataService.computed.notifyChanges()
        .then(() => {
          setExperienceName('');
          setExperienceCompanyName('');
          setExperienceStartDate(null);
          setExperienceEndDate(null);
        }))
      .catch(ErrorService.manageError);
  };

  const saveSearch = () => {
    const search = {
      looking,
      roles: roleSelection,
      resume
    };
    EmployeeService.updateField(computed.user.uid, { search });
  };

  const deleteCertificate = index => {
    let certificates = computed.employee.certificates;
    certificates.splice(index, 1);
    EmployeeService.updateField(computed.user.uid, {certificates})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  };

  const deleteExperience = index => {
    let experience = computed.employee.experience;
    experience.splice(index, 1);
    EmployeeService.updateField(computed.user.uid, {experience})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    let companyIds = UtilsService.removeDuplicateFromArray(Object.keys(roles).map(roleKey => roles[roleKey].companyId));
    CompanyService.getAllForIdList(companyIds)
      .then(setCompanies)
      .catch(ErrorService.manageError);
  }, [roles]);

  useEffect(() => {
    if(computed.initialized) {
      RoleService.getRolesForEmployeeId(computed.user.uid, [ERoleStatus.CONFIRMED, ERoleStatus.REVOKED])
        .then(setRoles)
        .catch(ErrorService.manageError);
      
      if(computed.employee.search) {
        setLooking(computed.employee.search.looking || false);
        setRoleSelection(computed.employee.search.roles || []);
        setResume(computed.employee.search.resume || '');
      }
    }
  }, [computed]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);
  
  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderExperience = (_, exp) => (
    <div className="experience Element-content">
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={RoleDetails[exp.role].icon} />
        <div className="Element-data">
          <span className="Element-title">
            {RoleDetails[exp.role].name} @
            {companies[exp.companyId] &&
              <PageLink type={PageLinkType.COMPANY} entityId={exp.companyId} entityData={companies[exp.companyId]} />
            }
          </span>
          <span className="sub">
            {DateService.getMonthYearString(
              DateService.getDateFromIsoString(exp.creationIsoDate)) + ' - ' + 
              (exp.status === 'CONFIRMED' ? 'Current' : DateService.getMonthYearString(DateService.getDateFromIsoString(exp.revokedIsoDate)))}
          </span>
        </div>
      </div>
    </div>);
    
  const renderCertificate = (index, certificate) => (
    <div className="certificate Element-content">
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faAward} />
        <div className="Element-data">
          <span className="Element-title">
            {certificate.name}
          </span>
          <span className="sub">{certificate.date}</span>
        </div>
        <div className="Element-actions">
          <ActionList actions={[
            { title: 'Delete certificate', icon: <Icon source="fa" icon={faTimes} />, callback: () => deleteCertificate(index) }
          ]} />
        </div>
      </div>
    </div>);

  const renderOtherExperience = (index, otherExp) => (
    <div className="experience Element-content">
      <div className="Element-base">
        <Icon containerclassname="Element-icon" source="fa" icon={faClipboardUser} />
        <div className="Element-data">
          <span className="Element-title">{otherExp.name} @ {otherExp.company}</span>
          <span className="sub">
            {otherExp.start} - {otherExp.end ? otherExp.end : 'Current'}
          </span>
        </div>
        <div className="Element-actions">
          <ActionList actions={[
            { title: 'Delete experience', icon: <Icon source="fa" icon={faTimes} />, callback: () => deleteExperience(index) }
          ]} />
        </div>
      </div>
    </div>);

  const roleDetails = {};
  Object.keys(RoleDetails).forEach(roleKey => {
    roleDetails[roleKey] = {
      content: <Fragment>
        <Icon source="fa" icon={RoleDetails[roleKey].icon} />
        {RoleDetails[roleKey].name}
      </Fragment>
    }
  });


  const employeeExperience = {};
  if(roles) {
    Object.keys(roles)
      .filter(roleKey => roles[roleKey].status === ERoleStatus.CONFIRMED
          || roles[roleKey].status === ERoleStatus.REVOKED)
      .forEach(roleKey => employeeExperience[roleKey] = roles[roleKey]);
  }

  return <div className="ProfessionalProfile tab-content">
    <h2>Current Search</h2>
    <div className="input-container">
      <span className="fake-label">
        Actively Looking for a job?
      </span>
      <Switch value={looking} onChange={setLooking} />
    </div>
    <div className="input-container">
      <span className="fake-label">
        Looking for an offer as
      </span>
      <Choose selection={roleSelection}
              items={roleDetails}
              multiple
              onSelectionChange={setRoleSelection} />
    </div>
    <div className="input-container">
      <span className="fake-label">
        Write about yourself
      </span>
      <textarea
        placeholder="Tell recruiters about yourself"
        rows="5"
        value={resume}
        onChange={e => setResume(e.target.value)} />
    </div>
    <button className="input-submit" onClick={saveSearch}>
      <Icon source="fa" icon={faSave} />
      Save Current Search
    </button>
    <h2>Certificates</h2>
    <ExTable key="certificates" 
      items={computed.employee.certificates} 
      renderItem={renderCertificate} 
      header={['Name', '']}
      isNoFrame />
    <form className="pro-form" onSubmit={handleSubmitCertificate}>
      <h3>
        <Icon source="fa" icon={faAward} />
        Add a new certificate
      </h3>
      <FormInput
        value={certificateName}
        inputType="text"
        fieldName="certificateName"
        label={
          <span>
            <Icon source="fa" icon={faAward} />
            Certificate Name
          </span>
        }
        inputName="certificate-name"
        inputRequired
        instructions={
          <span>
            Name of the certificate
          </span>
        }
        onValueChange={setCertificateName} />
      <div className="input-container">
        <span className="fake-label">
          <Icon source="fa" icon={faCalendarAlt} />
          Date
        </span>
        <DateTimePicker
          onChange={setCertificateDate}
          value={certificateDate}
          clearIcon={null}
          calendarIcon={<Icon source="fa" icon={faCalendarAlt} />}
          format="y-MM"
          maxDate={new Date()}
          minDetail="year"
          required
          showLeadingZeros />
      </div>
      <button className="input-submit">
        <Icon source="fa" icon={faPlus} />
        <span className="button-label">Add Certificate</span>
      </button>
    </form>

    <h2>Experience</h2>
    <span className="sub">
      <Icon source="fa" icon={faInfoCircle} />
      These are your current and past roles
    </span>
    <ExTable key="experience" 
      items={employeeExperience} 
      renderItem={renderExperience} 
      header={['Name', 'Company']}
      isNoFrame />

    <h2>Other Experience</h2>
    <ExTable key="otherExperience" 
      loading={false}
      items={computed.employee.experience} 
      renderItem={renderOtherExperience} 
      header={['Name', 'Company']}
      isNoFrame />
    <form className="pro-form experience-add" onSubmit={handleSubmitExperience}>
      <h3>
        <Icon source="fa" icon={faClipboardUser} />
        Add a new experience
      </h3>
      <FormInput
        value={experienceName}
        inputType="text"
        fieldName="experienceName"
        label={
          <span>
            <Icon source="fa" icon={faClipboardUser} />
            Role
          </span>
        }
        inputName="experience-name"
        inputRequired
        instructions={
          <span>
            Your role of your experience
          </span>
        }
        onValueChange={setExperienceName} />
      <FormInput
        value={experienceCompamyName}
        inputType="text"
        fieldName="experienceCompanyName"
        label={
          <span>
            <Icon source="fa" icon={faBuilding} />
            Company
          </span>
        }
        inputName="experience-company-name"
        inputRequired
        instructions={
          <span>
            Your experience's company
          </span>
        }
        onValueChange={setExperienceCompanyName} />
      <div className="input-container">
        <span className="fake-label">
          <Icon source="fa" icon={faArrowAltFromLeft} />
          Experience Start Date
        </span>
        <DateTimePicker
          onChange={setExperienceStartDate}
          value={experienceStartDate}
          clearIcon={null}
          calendarIcon={<Icon source="fa" icon={faCalendarAlt} />}
          format="y-MM"
          maxDate={new Date()}
          minDetail="year"
          required
          showLeadingZeros />
      </div>
      <div className="input-container">
        <span className="fake-label">
          <Icon source="fa" icon={faArrowAltToRight} />
          Experience End Date (Optional)
        </span>
        <DateTimePicker
          onChange={setExperienceEndDate}
          value={experienceEndDate}
          clearIcon={null}
          calendarIcon={<Icon source="fa" icon={faCalendarAlt} />}
          format="y-MM"
          maxDate={new Date()}
          minDetail="year"
          showLeadingZeros />
      </div>
      <button className="input-submit">
        <Icon source="fa" icon={faPlus} />
        <span className="button-label">Add Experience</span>
      </button>
    </form>
  </div>;
};

export default ProfessionalProfile;
