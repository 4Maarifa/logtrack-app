import React, { Fragment, useState, useEffect } from 'react';
import { faExclamationTriangle, faEnvelope, faCalendar, faHashtag, faIndent, faUserPlus, faCog, faPortrait, faWarehouseAlt, faBuilding, faTruck, faAward, faUserTie, faClipboardUser, faSignIn, faUserHeadset, faFolders, faFile } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../../services/data.service';
import FileService from './../../../../services/file.service';
import DateService from './../../../../services/date.service';
import ErrorService from './../../../../services/error.service';
import UtilsService from './../../../../services/utils.service';
import { ESettingsDetails } from './../../../../services/settings.service';
import EquipmentService from './../../../../services/entities/equipment.service';
import EquipmentModelService from './../../../../services/entities/equipmentModel.service';
import BrandService from './../../../../services/entities/brand.service';
import WarehouseService from './../../../../services/entities/warehouse.service';
import CompanyService from './../../../../services/entities/company.service';
import RoleService from './../../../../services/entities/role.service';
import EmployeeService from './../../../../services/entities/employee.service';
import SupportService from './../../../../services/entities/support.service';

import Icon from './../../../Utils/Icon/Icon'
import Loader from './../../../Utils/Loader/Loader';
import ExTable from './../../../Utils/ExTable/ExTable';
import CompletionBar from './../../../Utils/CompletionBar/CompletionBar';

import Employee, { employeeCertificatesExTableFSS, EmployeeCertificate, employeeExperienceExTableFSS, EmployeeExperience, employeeOtherExperiencesExTableFSS, EmployeeOtherExperience, employeeAccountActivityExTableFSS, EmployeeAccountActivity } from './../../../Entities/Employee/Employee';
import Warehouse, { warehousesExTableFSS } from './../../../Entities/Warehouse/Warehouse';
import Company, { companiesExTableFSS } from './../../../Entities/Company/Company';
import Equipment, { equipmentsExTableFSS } from './../../../Entities/Equipment/Equipment';
import JobOffer, { jobsExTableFSS } from './../../../Entities/JobOffer/JobOffer';
import Support, { supportsExTableFSS } from './../../../Entities/Support/Support';

import { ERoleDetails, ERoleStatus } from './../../../../classes/Role';

import { v4 as uuid } from 'uuid';

const DataTab = () => {

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  const [isGenerating, setGenerating] = useState(false);

  const [report, setReport] = useState(null);
  const [brands, setBrands] = useState(null);
  const [equipmentModels, setEquipmentModels] = useState(null);

  useEffect(() => {
    if(isGenerating) {
      Promise.all([
        EquipmentService.getAllForCreatorId(computed.user.uid),
        EquipmentModelService.list(),
        BrandService.list(),
        WarehouseService.getAllForCreatorId(computed.user.uid),
        CompanyService.getAllForCreatorId(computed.user.uid),
        RoleService.getRolesForEmployeeId(computed.user.uid, [ERoleStatus.CONFIRMED, ERoleStatus.DENIED, ERoleStatus.DRAFT, ERoleStatus.REVOKED]),
        FileService.getPersonalFiles(),
        EmployeeService.accountActivity.getAllByEmail(computed.user.email),
        CompanyService.jobOffer.getAllForCreatorId(computed.user.uid),
        SupportService.getAllForUserId(computed.user.uid)
      ]).then(results => {

        const RESULT = {
          equipments: results[0],
          warehouses: results[3],
          companies: results[4],
          roles: results[5],
          files: results[6],
          accountActivity: results[7],
          jobOffers: results[8],
          supports: results[9]
        };

        // PASS 2
        const roleCompanyIds = UtilsService.removeDuplicateFromArray(Object.keys(results[5]).map(roleKey => results[5][roleKey].companyId));
        CompanyService.getAllForIdList(roleCompanyIds)
          .then(companies => {
            RESULT.roleCompanies = companies;

            setReport(RESULT);
            setEquipmentModels(results[1]);
            setBrands(results[2]);
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
  const renderWarehouse = (itemId, itemData) => <Warehouse key={itemId} warehouse={ {[itemId]: itemData} } options={{  }} showDetails />;
  
  const renderCompany = (itemId, itemData) => {
    return <Company company={{[itemId]: itemData}} />;
  };
  
  const renderEquipment = (itemId, itemData) => {
    const EQUIPMENT_MODEL = { [itemData.equipmentModelId]: equipmentModels[itemData.equipmentModelId] },
      BRAND = { [EQUIPMENT_MODEL[itemData.equipmentModelId].brand]: brands[EQUIPMENT_MODEL[itemData.equipmentModelId].brand] };

    return <Equipment key={itemId}
      equipment={ {[itemId]: itemData} }
      brand={BRAND}
      equipmentModel={EQUIPMENT_MODEL}
      options={ {} }
      showDetails />
  };

  const renderSupport = (itemId, itemData) => <Support support={{[itemId]: itemData}} />;

  let USER_QUOTA = null;
  if(report) {
    USER_QUOTA = FileService.getQuota(report.files);
  }

  return <div className="tab-content">
    <h1>Generated Data on LogTrack</h1>
    <span>All the data you generated on LogTrack</span>

    {!isGenerating && !report ?
      <button className="inline" onClick={() => setGenerating(true)}>Generate your report</button>
    : null}

    {isGenerating ? <Loader></Loader> : null}
    {report && !isGenerating ? <div>
      <h1>Your report</h1>
      <div className="sub">
        Generated on {DateService.getDateTimeString(DateService.getCurrentDate())}
      </div>
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

      <h3 className="profile-title">Your personal account</h3>
      <div className="Element Element--page Element--hasAdditional">
        <Employee employee={{ [computed.user.uid]: computed.employee }} isPage />
      </div>
      <div className="Element Element--tile Element--full-width Element--additional">
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
                Account created on {DateService.getDateTimeString(DateService.getDateFromIsoString(computed.employee.creationIsoDate))}
              </span>
              <span>
                <Icon source="fa" icon={faHashtag} />
                ID: {computed.user.uid}
              </span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="profile-title">Terms &amp; Legal Information</h3>
      {computed.employee.legal ? <div className="Element Element--tile Element--full-width">
        <div className="Element-content">
          <div className="Element-base">
            <Icon containerclassname="Element-icon" source="fa" icon={faIndent} />
            <div className="Element-data">
              <span>
                {computed.employee.legal.informed ? 'Opted in LogTrack newsletters' : 'Not Opted in for LogTrack newsletters'}<br/>
                You accepted terms for version {computed.employee.legal.version} on {DateService.getDateTimeString(DateService.getDateFromIsoString(computed.employee.legal.acceptDate))}.
              </span>
            </div>
          </div>
        </div>
      </div> : 'No Legal Information'}

      <h3 className="profile-title">Your roles</h3>
      <ExTable key="experience" 
              items={report.roles}
              fss={employeeExperienceExTableFSS}
              renderItem={(_, exp) => <EmployeeExperience exp={exp} company={{[exp.companyId]: report.roleCompanies[exp.companyId]}} />} 
              header={<span><Icon source="fa" icon={faUserTie} /> Experience</span>}
              isNoFrame />

      <h3 className="profile-title">Your Certificates</h3>
      <ExTable key="certificates" 
              items={computed.employee.certificates} 
              fss={employeeCertificatesExTableFSS}
              renderItem={(_, cert) => <EmployeeCertificate certificate={cert} employeeId={computed.user.uid} />} 
              header={<span><Icon source="fa" icon={faAward} /> Certificates</span>}
              isNoFrame />

      <h3 className="profile-title">Your other experience</h3>
      <ExTable key="otherExperience"
            fss={employeeOtherExperiencesExTableFSS}
            items={computed.employee.experience} 
            renderItem={(index, exp) => <EmployeeOtherExperience otherExp={exp} employeeId={computed.user.uid} />}
            header={<span><Icon source="fa" icon={faClipboardUser} /> Other Experience</span>}
            isNoFrame />

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

      <h3 className="profile-title">Companies you've created</h3>
      <ExTable key="companies"
              fss={companiesExTableFSS}
              items={report.companies}
              renderItem={renderCompany}
              header={<span><Icon source="fa" icon={faBuilding} /> Companies</span>}
              loading={isGenerating}
              isNoFrame />

      <h3 className="profile-title">Equipments you've created</h3>
      <ExTable key="equipments"
                fss={equipmentsExTableFSS}
                items={report.equipments}
                renderItem={renderEquipment}
                header={<span><Icon source="fa" icon={faTruck} /> Equipments</span>}
                loading={isGenerating}
                isNoFrame />

      <h3 className="profile-title">Warehouses you've created</h3>
      <ExTable key="warehouses" 
              items={report.warehouses}
              fss={warehousesExTableFSS}
              renderItem={renderWarehouse}
              header={<span><Icon source="fa" icon={faWarehouseAlt} /> Warehouses</span>}
              loading={isGenerating}
              isNoFrame />

      <h3 className="profile-title">Job Offers you've created</h3>
      <ExTable key="jobOffers"
              fss={jobsExTableFSS}
              items={report.jobOffers}
              renderItem={(itemId, itemData) => <JobOffer key={itemId} jobOffer={ {[itemId]: itemData} } />}
              header={<span><Icon source="fa" icon={faPortrait} /> Opened Positions</span>}
              isNoFrame />

      <h3 className="profile-title">The support messages you sent</h3>
      <ExTable key="SUPPORT"
                fss={supportsExTableFSS}
                items={report.supports}
                renderItem={renderSupport}
                header={<span><Icon source="fa" icon={faUserHeadset} /> Support Messages</span>}
                isNoFrame />

      <h3 className="profile-title">Your account activity</h3>
      <ExTable key="accountActivities" 
              items={report.accountActivity}
              fss={employeeAccountActivityExTableFSS}
              renderItem={(_, activity) => <EmployeeAccountActivity activity={activity} />}
              header={<span><Icon source="fa" icon={faSignIn} /> Account Activity</span>}
              isNoFrame
              isSmallItems />
    </div> : null}
  </div> ;
};

export default DataTab;
