import React, { useState, useEffect, Fragment } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { faArrowAltToRight, faArrowAltFromLeft, faCalendarAlt, faClipboardUser,
  faInfoCircle, faBuilding, faAward, faUserTie } from '@fortawesome/pro-solid-svg-icons';

import DataService from '../../../../services/data.service';
import UtilsService from '../../../../services/utils.service';
import EmployeeService from '../../../../services/entities/employee.service';
import ErrorService from '../../../../services/error.service';
import RoleService from '../../../../services/entities/role.service';
import CompanyService from '../../../../services/entities/company.service';
import DateService from '../../../../services/date.service';

import Icon from '../../../Utils/Icon/Icon';
import FormInput from '../../../Utils/FormElements/FormInput/FormInput';
import ExTable from '../../../Utils/ExTable/ExTable';
import Choose from '../../../Utils/FormElements/Choose/Choose';
import Switch from '../../../Utils/FormElements/Switch/Switch';

import { ERoleDetails, ERoleStatus } from '../../../../classes/Role';

import { EmployeeCertificate, EmployeeExperience, EmployeeOtherExperience, employeeCertificatesExTableFSS, employeeExperienceExTableFSS, employeeOtherExperiencesExTableFSS } from '../../../Entities/Employee/Employee';

import { v4 as uuid } from 'uuid';
import FormTextarea from '../../../Utils/FormElements/FormTextarea/FormTextarea';

const ProfessionalProfileTab = () => {
  const OBSERVER_KEY = uuid();
  
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

    const CERTIFICATES = computed.employee.certificates || [];
    CERTIFICATES.push({
      name: certificateName,
      date: DateService.getIsoDateString(certificateDate)
    });

    EmployeeService.updateField(computed.user.uid, { certificates: CERTIFICATES })
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

    const EXPERIENCE = computed.employee.experience || [];
    EXPERIENCE.push({
      name: experienceName,
      company: experienceCompamyName,
      start: DateService.getIsoDateString(experienceStartDate),
      end: experienceEndDate ? DateService.getIsoDateString(experienceEndDate) : null
    });

    EmployeeService.updateField(computed.user.uid, { experience: EXPERIENCE })
      .then(() => DataService.computed.notifyChanges()
        .then(() => {
          setExperienceName('');
          setExperienceCompanyName('');
          setExperienceStartDate(null);
          setExperienceEndDate(null);
        }))
      .catch(ErrorService.manageError);
  };

  const saveSearch = e => {
    e.preventDefault();

    const SEARCH = {
      looking,
      roles: roleSelection,
      resume
    };
    EmployeeService.updateField(computed.user.uid, { search: SEARCH })
      .then(() => {
        ErrorService.success('Search Saved');
        DataService.computed.notifyChanges();
      })
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    let companyIds = UtilsService.removeDuplicateFromArray(Object.keys(roles).map(roleId => roles[roleId].companyId));
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
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY)
  }, []);
  
  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const ROLE_DETAILS = {};
  Object.keys(ERoleDetails).forEach(roleId => {
    ROLE_DETAILS[roleId] = {
      content: <Fragment>
        <Icon source="fa" icon={ERoleDetails[roleId].icon} />
        {ERoleDetails[roleId].name}
      </Fragment>
    }
  });


  const EMPLOYEE_EXPERIENCE = {};
  if(roles) {
    Object.keys(roles)
      .filter(roleId => roles[roleId].status === ERoleStatus.CONFIRMED
          || roles[roleId].status === ERoleStatus.REVOKED)
      .forEach(roleId => EMPLOYEE_EXPERIENCE[roleId] = roles[roleId]);
  }

  return <div className="ProfessionalProfile tab-content">
    <form onSubmit={saveSearch}>
      <h2>Current Search</h2>
      <div className="input-container">

        {/* Looking */}
        <span className="fake-label">
          Actively Looking for a job?
        </span>
        <Switch value={looking} onChange={setLooking} />
      </div>

      {/* Role selection */}
      <div className="input-container">
        <span className="fake-label">
          Looking for an offer as
        </span>
        <Choose selection={roleSelection}
                items={ROLE_DETAILS}
                multiple
                onSelectionChange={setRoleSelection} />
      </div>

      {/* Resume */}
      <FormTextarea
        label={<span>Tell recruiters about yourself</span>}
        value={resume}
        onValueChange={setResume} />

      {/* Save search */}
      <input type="submit" value="Save current search" />
    </form>

    <h2>Certificates</h2>
    <ExTable key="certificates" 
              items={computed.employee.certificates} 
              fss={employeeCertificatesExTableFSS}
              renderItem={(_, cert) => <EmployeeCertificate certificate={cert} employeeId={computed.user.uid} />} 
              header={<span><Icon source="fa" icon={faAward} /> Certificates</span>}
              isNoFrame />
    <form className="pro-form" onSubmit={handleSubmitCertificate}>
      <h3>
        <Icon source="fa" icon={faAward} />
        Add a new certificate
      </h3>

      {/* Certificate name */}
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

      {/* Certificate date */}
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

      {/* Submit */}
      <input type="submit" value="Add certificate" />
    </form>

    <h2>Experience</h2>
    <span className="sub">
      <Icon source="fa" icon={faInfoCircle} />
      These are your current and past roles
    </span>
    <ExTable key="experience" 
              items={EMPLOYEE_EXPERIENCE}
              fss={employeeExperienceExTableFSS}
              renderItem={(_, exp) => <EmployeeExperience exp={exp} company={{[exp.companyId]: companies[exp.companyId]}} />} 
              header={<span><Icon source="fa" icon={faUserTie} /> Experience</span>}
              isNoFrame />

    <h2>Other Experience</h2>
    <ExTable key="otherExperience" 
            loading={false}
            fss={employeeOtherExperiencesExTableFSS}
            items={computed.employee.experience} 
            renderItem={(index, exp) => <EmployeeOtherExperience otherExp={exp} employeeId={computed.user.uid} />}
            header={<span><Icon source="fa" icon={faClipboardUser} /> Other Experience</span>}
            isNoFrame />
    <form className="pro-form experience-add" onSubmit={handleSubmitExperience}>
      <h3>
        <Icon source="fa" icon={faClipboardUser} />
        Add a new experience
      </h3>

      {/* Experience Name */}
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

      {/* Experience company */}
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

      {/* Experience start date */}
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

      {/* Experience end date */}
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

      {/* Submit */}
      <input type="submit" value="Add Experience" />
    </form>
  </div>;
};

export default ProfessionalProfileTab;
