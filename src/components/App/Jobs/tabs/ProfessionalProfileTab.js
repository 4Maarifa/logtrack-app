import React, { useState, useEffect, Fragment } from 'react';
import { faArrowAltToRight, faArrowAltFromLeft, faCalendarAlt, faClipboardUser, faInfoCircle, 
  faBuilding, faAward, faUserTie } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../../services/data.service';
import UtilsService from './../../../../services/utils.service';
import DateService from './../../../../services/date.service';
import ErrorService from './../../../../services/error.service';
import EmployeeService from './../../../../services/entities/employee.service';
import RoleService from './../../../../services/entities/role.service';
import CompanyService from './../../../../services/entities/company.service';

import Icon from './../../../Utils/Icon/Icon';
import ExTable from './../../../Utils/ExTable/ExTable';
import Choose from './../../../Utils/FormElements/Choose/Choose';
import FormInput from './../../../Utils/FormElements/FormInput/FormInput';
import Switch from './../../../Utils/FormElements/Switch/Switch';
import FormTextarea from './../../../Utils/FormElements/FormTextarea/FormTextarea';
import FormDateTimeInput from './../../../Utils/FormElements/FormDateTimeInput/FormDateTimeInput';

import { ERoleDetails, ERoleStatus } from './../../../../classes/Role';

import { EmployeeCertificate, EmployeeExperience, EmployeeOtherExperience, employeeCertificatesExTableFSS, employeeExperienceExTableFSS, employeeOtherExperiencesExTableFSS } from './../../../Entities/Employee/Employee';

import { v4 as uuid } from 'uuid';

/**
 * component: ProfessionalProfileTab
 * Tab of the Jobs component (as well as Profile compnent), view to edit current search
 */
const ProfessionalProfileTab = () => {
  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // Current search
  const [looking, setLooking] = useState(false);
  const [roleSelection, setRoleSelection] = useState([]);
  const [resume, setResume] = useState('');
  
  // New certificate form data
  const [certificateName, setCertificateName] = useState('');
  const [certificateDate, setCertificateDate] = useState(null);
  
  // New experience form data
  const [experienceName, setExperienceName] = useState('');
  const [experienceCompamyName, setExperienceCompanyName] = useState('');
  const [experienceStartDate, setExperienceStartDate] = useState(null);
  const [experienceEndDate, setExperienceEndDate] = useState(null);
  
  // All current and revoked roles
  const [roles, setRoles] = useState({});
  // and related companies to these roles
  const [companies, setCompanies] = useState({});

  // new certificate form handler
  const handleSubmitCertificate = event => {
    event.preventDefault();

    // verify if the user has already this certificate
    if(computed.employee.certificates.filter(certificate => certificate.name === certificateName).length) {
      ErrorService.warning('You already have this certificate!');
      return;
    }

    // Pushing the new certificate in the old array
    const CERTIFICATES = computed.employee.certificates || [];
    CERTIFICATES.push({
      name: certificateName,
      date: DateService.getIsoDateString(certificateDate)
    });

    // Updating his certificates
    EmployeeService.updateField(computed.user.uid, { certificates: CERTIFICATES })
      // Telling the data service something has changed for current user
      .then(() => DataService.computed.notifyChanges()
        .then(() => {
          // resetting form
          setCertificateName('');
          setCertificateDate(null);
        }))
      .catch(ErrorService.manageError);
  };

  // New experience form handler
  const handleSubmitExperience = event => {
    event.preventDefault();

    // If an end date was mentioned and if it's before the start => error
    if(experienceEndDate && experienceStartDate > experienceEndDate) {
      ErrorService.manageError('Experience start date muse be before end date!');
      return;
    }

    // Pushing the new experience in the experience array
    const EXPERIENCE = computed.employee.experience || [];
    EXPERIENCE.push({
      name: experienceName,
      company: experienceCompamyName,
      start: DateService.getIsoDateString(experienceStartDate),
      // End is optional
      end: experienceEndDate ? DateService.getIsoDateString(experienceEndDate) : null
    });

    // Updating the employee with the new experience
    EmployeeService.updateField(computed.user.uid, { experience: EXPERIENCE })
      // telling the data service something has changed for current user
      .then(() => DataService.computed.notifyChanges()
        .then(() => {
          // resetting the form
          setExperienceName('');
          setExperienceCompanyName('');
          setExperienceStartDate(null);
          setExperienceEndDate(null);
        }))
      .catch(ErrorService.manageError);
  };

  // Saving the current job search
  const saveSearch = e => {
    e.preventDefault();

    const SEARCH = {
      looking,
      roles: roleSelection,
      resume
    };
    // Updating the employee with new job search
    EmployeeService.updateField(computed.user.uid, { search: SEARCH })
      .then(() => {
        ErrorService.success('Search Saved');
        // Telling the dataservice something hsa changed for the current user
        DataService.computed.notifyChanges();
      })
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    // If roles change, then loading related companies

    // getting and removing duplicates for role companies
    let companyIds = UtilsService.removeDuplicateFromArray(Object.keys(roles).map(roleId => roles[roleId].companyId));
    CompanyService.getAllForIdList(companyIds)
      .then(setCompanies)
      .catch(ErrorService.manageError);
  }, [roles]);

  useEffect(() => {
    if(computed.initialized) {
      // Get all confirmed and revoked roles for current user.
      // Those are roles that were or are available and accepted by companies managers (legit roles)
      RoleService.getRolesForEmployeeId(computed.user.uid, [ERoleStatus.CONFIRMED, ERoleStatus.REVOKED])
        .then(setRoles)
        .catch(ErrorService.manageError);
      
      // setting the search form fields values
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
  // reparing current search roles fields
  const ROLE_DETAILS = {};
  Object.keys(ERoleDetails).forEach(roleId => {
    ROLE_DETAILS[roleId] = {
      content: ({ isActive }) => <Fragment>
        <Icon source="fa" icon={isActive ? ERoleDetails[roleId].iconSolid : ERoleDetails[roleId].icon} />
        {ERoleDetails[roleId].name}
      </Fragment>
    }
  });

  // Preparing the employee experience (loading only confirmed or revoked roles - safeguard - we only load that type of roles normally)
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
        <FormDateTimeInput
          onValueChange={setCertificateDate}
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
        <FormDateTimeInput
          onValueChange={setExperienceStartDate}
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
        <FormDateTimeInput
          onValueChange={setExperienceEndDate}
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
