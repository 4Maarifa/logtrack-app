import React, { Fragment, useState, useEffect } from 'react';
import { faExclamationTriangle, faEnvelope, faCalendar, faHashtag, faIndent, faUserPlus, 
  faCog, faPortrait, faWarehouseAlt, faBuilding, faTruck, faAward, faUserTie, faClipboardUser, 
  faSignIn, faUserHeadset, faFolders, faFile } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../../services/data.service';
import FileService from './../../../../services/file.service';
import DateService from './../../../../services/date.service';
import ErrorService from './../../../../services/error.service';
import UtilsService from './../../../../services/utils.service';
import { ESettingsDetails } from './../../../../services/settings.service';
import EquipmentService from './../../../../services/entities/equipment.service';
import WarehouseService from './../../../../services/entities/warehouse.service';
import CompanyService from './../../../../services/entities/company.service';
import RoleService from './../../../../services/entities/role.service';
import EmployeeService from './../../../../services/entities/employee.service';
import SupportService from './../../../../services/entities/support.service';

import Icon from './../../../Utils/Icon/Icon'
import Loader from './../../../Utils/Loader/Loader';
import ExTable, { EXTABLE_VIEWS } from './../../../Utils/ExTable/ExTable';
import CompletionBar from './../../../Utils/CompletionBar/CompletionBar';

import Employee, { employeeCertificatesExTableFSS, EmployeeCertificate, employeeExperienceExTableFSS, 
  EmployeeExperience, employeeOtherExperiencesExTableFSS, EmployeeOtherExperience, 
  employeeAccountActivityExTableFSS, EmployeeAccountActivity } from './../../../Entities/Employee/Employee';
import Warehouse, { warehousesExTableFSS } from './../../../Entities/Warehouse/Warehouse';
import Company, { companiesExTableFSS } from './../../../Entities/Company/Company';
import Equipment, { equipmentsExTableFSS } from './../../../Entities/Equipment/Equipment';
import JobOffer, { jobsExTableFSS } from './../../../Entities/JobOffer/JobOffer';
import Support, { supportsExTableFSS } from './../../../Entities/Support/Support';

import { ERoleDetails, ERoleStatus } from './../../../../classes/Role';

import { v4 as uuid } from 'uuid';

/**
 * Component: DataTab
 * Tab of Profile component
 * 
 * Used to retrieve all the data generated by the current user
 * Mandatory for legal reasons
 */
const DataTab = () => {

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // Is the report generating?
  const [isGenerating, setGenerating] = useState(false);

  // Generated report
  const [report, setReport] = useState(null);

  // Hook on generating
  useEffect(() => {
    if(isGenerating) {
      // If generation was launched, fetch all data with 2 passes for better performance

      // PASS1: equipments, warehouses, companies, roles, files, account activities, job offers, support
      Promise.all([
        EquipmentService.getAllForCreatorId(computed.user.uid),
        WarehouseService.getAllForCreatorId(computed.user.uid),
        CompanyService.getAllForCreatorId(computed.user.uid),
        RoleService.getRolesForEmployeeId(computed.user.uid, [ERoleStatus.CONFIRMED, ERoleStatus.DENIED, ERoleStatus.DRAFT, ERoleStatus.REVOKED]),
        FileService.getPersonalFiles(),
        EmployeeService.accountActivity.getAllForCurrentUser(),
        CompanyService.jobOffer.getAllForCreatorId(computed.user.uid),
        SupportService.getAllForCurrentUser()
      ]).then(results => {

        // this variable stores temporarly all the report's data that is already fetched
        const RESULT = {
          equipments: results[0],
          warehouses: results[1],
          companies: results[2],
          roles: results[3],
          files: results[4],
          accountActivity: results[5],
          jobOffers: results[6],
          supports: results[7]
        };

        // PASS 2
        // Second pass is mandatory: retrieving linked data for roles

        // Here, retrieving the companyes roles are set upon
        const roleCompanyIds = UtilsService.removeDuplicateFromArray(Object.keys(results[3]).map(roleKey => results[3][roleKey].companyId));
        CompanyService.getAllForIdList(roleCompanyIds)
          .then(companies => {

            // Setting those companies on the temp report
            RESULT.roleCompanies = companies;

            // then, setting all the data
            setReport(RESULT);

            // And triggering end of load
            setGenerating(false);
          })
          .catch(ErrorService.manageError);

      }).catch(ErrorService.manageError);
    }
  }, [isGenerating]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */

  // All specific util rendering functions

  const renderWarehouse = (itemId, itemData) => <Warehouse key={itemId} warehouse={ {[itemId]: itemData} } options={{  }} showDetails />;
  
  const renderCompany = (itemId, itemData) => {
    return <Company company={{[itemId]: itemData}} />;
  };
  
  const renderEquipment = (itemId, itemData) => <Equipment key={itemId} equipment={ {[itemId]: itemData} } options={ {} } showDetails />;

  const renderSupport = (itemId, itemData) => <Support support={{[itemId]: itemData}} />;

  // Computing user quota
  let USER_QUOTA = null;
  if(report) {
    USER_QUOTA = FileService.getQuota(report.files);
  }

  return <div className="tab-content">
    <h1>Generated Data on LogTrack</h1>
    <span>All the data you generated on LogTrack</span>

    {/* If we don't have a report yet and it's not generating, give access to the user to generate a new report */}
    {!isGenerating && !report ?
      <button className="inline" onClick={() => setGenerating(true)}>Generate your report</button>
    : null}

    {/* If generation is in progress, show a loader */}
    {isGenerating ? <Loader></Loader> : null}

    {/* If a report is here, show it! */}
    {report && !isGenerating ? <div>
      <h1>Your report</h1>

      {/* Date of the report */}
      <div className="sub">
        Generated {DateService.getDateTimeString(DateService.getCurrentDate(), true, true, 'on')}
      </div>

      {/* Legal information about the report */}
      <h3 className="profile-title">Notice</h3>
      <div className="Element Element--tile Element--full-width">
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faExclamationTriangle} />
            <div className="Element-data">
              <span>
                Some entities listed below, owned by companies you no longer work for, may be missing in very rare cases.
                The entities that you created may have been edited and have changed since you created them. This report indicates entities that you created in their current state.
                All changes on entities that you did not created are not recorded as your actions by LogTrack. Therefore, these entities are not present in this report.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal account section */}
      <h3 className="profile-title">Your personal account</h3>
      <div className="Element Element--page Element--hasAdditional">
        {/* Employee entity */}
        <Employee employee={{ [computed.user.uid]: computed.employee }} isPage />
      </div>
      <div className="Element Element--tile Element--full-width Element--additional">
        {/* Employee details */}
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faUserPlus} />
            <div className="Element-data">
              <span>
                <Icon source="fa" icon={faEnvelope} />
                Email: {computed.user.email}
              </span>
              <span>
                <Icon source="fa" icon={faCalendar} />
                Account created {DateService.getDateTimeString(DateService.getDateFromIsoString(computed.employee.creationIsoDate), true, true, 'on')}
              </span>
              <span>
                <Icon source="fa" icon={faHashtag} />
                ID: {computed.user.uid}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms acceptance */}
      <h3 className="profile-title">Terms &amp; Legal Information</h3>
      {computed.employee.legal ? <div className="Element Element--tile Element--full-width">
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faIndent} />
            <div className="Element-data">
              <span>
                {computed.employee.legal.informed ? 'Opted in LogTrack newsletters' : 'Not Opted in for LogTrack newsletters'}<br/>
                You accepted terms for version {computed.employee.legal.version} {DateService.getDateTimeString(DateService.getDateFromIsoString(computed.employee.legal.acceptDate), true, false, 'on')}.
              </span>
            </div>
          </div>
        </div>
      </div> : 'No Legal Information'}

      {/* Roles, either accepted, denied, confirmed, drafted... */}
      <h3 className="profile-title">Your roles</h3>
      <div className="ExTable-container-noscroll">
        <ExTable key="experience" 
                items={report.roles}
                fss={employeeExperienceExTableFSS}
                renderItem={(_, exp) => <EmployeeExperience exp={exp} company={{[exp.companyId]: report.roleCompanies[exp.companyId]}} />} 
                header={<span><Icon source="fa" icon={faUserTie} /> Experience</span>}
                isNoFrame />
      </div>

      {/* User's certificates */}
      <h3 className="profile-title">Your Certificates</h3>
      <div className="ExTable-container-noscroll">
        <ExTable key="certificates" 
                items={computed.employee.certificates} 
                fss={employeeCertificatesExTableFSS}
                renderItem={(_, cert) => <EmployeeCertificate certificate={cert} employeeId={computed.user.uid} />} 
                header={<span><Icon source="fa" icon={faAward} /> Certificates</span>}
                isNoFrame />
      </div>

      {/* User's other experience (experience not on the platform) */}
      <h3 className="profile-title">Your other experience</h3>
      <div className="ExTable-container-noscroll">
        <ExTable key="otherExperience"
              fss={employeeOtherExperiencesExTableFSS}
              items={computed.employee.experience} 
              renderItem={(index, exp) => <EmployeeOtherExperience otherExp={exp} employeeId={computed.user.uid} />}
              header={<span><Icon source="fa" icon={faClipboardUser} /> Other Experience</span>}
              isNoFrame />
      </div>

      {/* Current job search of the employee */}
      <h3 className="profile-title">Your Job Search</h3>
      <div className="Element Element--tile Element--full-width">
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faPortrait} />
            <div className="Element-data">
              <span>
                  {computed.employee.search ? <span>
                  {computed.employee.search.looking ? 'Actually looking as ' : 'Not looking. Last search was for '}
                  {computed.employee.search.roles ? computed.employee.search.roles.map(role => ERoleDetails[role].name).join(', ') : 'No roles recorded'}.<br/>
                  Actual Resume: {computed.employee.search.resume}
                </span> : 'No Job Search saved'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* User's personal and public files */}
      <h3 className="profile-title">Your Files</h3>
      <div className="Element Element--tile Element--full-width Element--hasAdditional">
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faFolders} />
            <div className="Element-data">
              <CompletionBar title="Personal Quota"
                      details={`${USER_QUOTA.totalReadableSize} / ${USER_QUOTA.authorizedReadableQuota}`}
                      percentage={USER_QUOTA.percentageUsed} />
            </div>
          </div>
        </div>
      </div>
      <div className="Element Element--tile Element--full-width Element--additional">
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faFile} />
            <div className="Element-data">
              <h1>Your personal Files</h1>
              <ul className="personalFilesList">
                {report.files.map(f => {
                  const FILE_DETAILS = FileService.getDetailsForFile(f);
                  return <li key={f.name}>
                    <span>
                      <Icon source="fa" icon={FILE_DETAILS.icon} />
                      {f.metadata.customMetadata.realName}
                    </span>
                    <span>{FileService.getReadableSize(f.metadata.size)}</span>
                  </li>
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* User's settings */}
      <h3 className="profile-title">Your Settings</h3>
      <div className="Element Element--tile Element--full-width">
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faCog} />
            <div className="Element-data">
              <span>
                {Object.keys(computed.employee.settings).map(settingKey => 
                  <Fragment key={settingKey}>
                    <span className="report-setting">{ESettingsDetails[settingKey].title}: {computed.employee.settings[settingKey]}</span><br/>
                  </Fragment>)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Created companies */}
      <h3 className="profile-title">Companies you've created</h3>
      <div className="ExTable-container-noscroll">
        <ExTable key="companies"
                fss={companiesExTableFSS}
                items={report.companies}
                renderItem={renderCompany}
                header={<span><Icon source="fa" icon={faBuilding} /> Companies</span>}
                loading={isGenerating}
                isNoFrame />
      </div>

      {/* Equipments created */}
      <h3 className="profile-title">Equipments you've created</h3>
      <div className="ExTable-container-noscroll">
        <ExTable key="equipments"
                  fss={equipmentsExTableFSS}
                  items={report.equipments}
                  renderItem={renderEquipment}
                  header={<span><Icon source="fa" icon={faTruck} /> Equipments</span>}
                  loading={isGenerating}
                  isNoFrame />
      </div>

      {/* Created warehouses */}
      <h3 className="profile-title">Warehouses you've created</h3>
      <div className="ExTable-container-noscroll">
        <ExTable key="warehouses" 
                items={report.warehouses}
                fss={warehousesExTableFSS}
                renderItem={renderWarehouse}
                header={<span><Icon source="fa" icon={faWarehouseAlt} /> Warehouses</span>}
                loading={isGenerating}
                isNoFrame />
      </div>

      {/* Job offers created by the user */}
      <h3 className="profile-title">Job Offers you've created</h3>
      <div className="ExTable-container-noscroll">
        <ExTable key="jobOffers"
                fss={jobsExTableFSS}
                items={report.jobOffers}
                renderItem={(itemId, itemData) => <JobOffer key={itemId} jobOffer={ {[itemId]: itemData} } />}
                header={<span><Icon source="fa" icon={faPortrait} /> Opened Positions</span>}
                isNoFrame />
      </div>

      {/* All support messages the user sent, with all available data */}
      <h3 className="profile-title">The support messages you sent</h3>
      <div className="ExTable-container-noscroll">
        <ExTable key="SUPPORT"
                  fss={supportsExTableFSS}
                  items={report.supports}
                  renderItem={renderSupport}
                  header={<span><Icon source="fa" icon={faUserHeadset} /> Support Messages</span>}
                  isNoFrame />
      </div>

      {/* User's account activities */}
      <h3 className="profile-title">Your account activity</h3>
      <div className="ExTable-container">
        <ExTable key="accountActivities"
                defaultView={EXTABLE_VIEWS.CONDENSED}
                items={report.accountActivity}
                fss={employeeAccountActivityExTableFSS}
                renderItem={(_, activity) => <EmployeeAccountActivity activity={activity} />}
                header={<span><Icon source="fa" icon={faSignIn} /> Account Activity</span>}
                isNoFrame />
      </div>
    </div> : null}
  </div> ;
};

export default DataTab;
