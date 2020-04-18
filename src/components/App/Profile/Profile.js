import React, { useState, useRef, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { NavLink } from 'react-router-dom';
import { faSignOut, faUser, faCog, faImage, faIdCardAlt, faUserHeadset, faPlus, faAward,
    faPhoneAlt, faInfoCircle, faExclamationCircle, faTimes, faUpload, faExclamationTriangle, faEnvelope, faClipboardUser, faCalendarAlt } from '@fortawesome/pro-solid-svg-icons';

import Tabs from './../../Utils/Tabs/Tabs';
import Loader from './../../Utils/Loader/Loader';
import Icon from './../../Utils/Icon/Icon';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import FileService from './../../../services/file.service';
import EmployeeService from './../../../services/entities/employee.service';
import SupportService from './../../../services/entities/support.service';
import SettingsService, { ESettings, ESettingsDetails } from './../../../services/settings.service';

import { v4 as uuid } from 'uuid';

import './Profile.scss';

const Profile = () => {
  const [isProfilePictureLoading, setProfilePictureLoading] = useState(false);

  const [certificateName, setCertificateName] = useState('');
  const [certificateDate, setCertificateDate] = useState(null);

  const [experienceName, setExperienceName] = useState('');
  const [experienceCompamyName, setExperienceCompanyName] = useState('');
  const [experienceStartDate, setExperienceStartDate] = useState(null);
  const [experienceEndDate, setExperienceEndDate] = useState(null);

  const [supportMessage, setSupportMessage] = useState('');
  const [supportMetadata, setSupportMetadata] = useState({});

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const profilePicture = useRef(null);

  const computeValues = () => {
    setSupportMetadata({
      userId: computed.user.uid,
      userName: computed.employee.firstname + ' ' + computed.employee.lastname,
      userEmail: computed.user.email,
      activeRoleId: computed.employee.activeRoleId,
      activeRoleCompanyId: computed.activeRole ? computed.activeRole.companyId : null,
      activeRole: computed.activeRole ? computed.activeRole.role : null,
      date: DateService.getCurrentIsoDateString()
    });
  };

  const removeProfilePicture = () => {
    setProfilePictureLoading(true);
    EmployeeService.updateField(computed.user.uid, { profilePictureUrl: null })
      .then(() => DataService.computed.notifyChanges()
        .then(() => setProfilePictureLoading(false)))
      .catch(ErrorService.manageError);
  };

  const uploadProfilePicture = () => {
    if(profilePicture.current.files.length) {
      setProfilePictureLoading(true);
      FileService.uploadProfilePhoto(profilePicture.current.files[0])
        .then(() => {
          FileService.getDownloadURLForProfilePicture()
            .then(url => {
              EmployeeService.updateField(computed.user.uid, { profilePictureUrl: url })
                .then(() => DataService.computed.notifyChanges()
                  .then(() => setProfilePictureLoading(false)))
                .catch(ErrorService.manageError);
            })
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
  };

  const handleSubmitCertificate = event => {
    event.preventDefault();

    if(computed.employee.certificates.filter(certificate => certificate.name === certificateName).length) {
      ErrorService.warning('You already have this certificate!');
      return;
    }

    let certificates = computed.employee.certificates || [];
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

    if(experienceStartDate > experienceEndDate) {
      ErrorService.manageError('Experience start date muse be before end date!');
      return;
    }

    let experience = computed.employee.experience || [];
    experience.push({
      name: experienceName,
      company: experienceCompamyName,
      start: DateService.getMonthYearString(experienceStartDate),
      end: DateService.getMonthYearString(experienceEndDate)
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

  const handleSubmitSupport = event => {
    event.preventDefault();

    SupportService.createWithData(supportMessage, computed.user.uid, supportMetadata)
      .then(() => {
        setSupportMessage('');
        ErrorService.success('Your message was received successfully!');
      })
      .catch(ErrorService.manageError);
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
    if(computed.initialized) {
      computeValues();
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

  return (
    <div className="Profile">
      {computed.employee && computed.user &&
        <div>
          Welcome back, <PageLink type={PageLinkType.EMPLOYEE} entityId={computed.user.uid} entityData={computed.employee} />!
          <NavLink to={`/signout`} className="signout">
            <Icon source="fa" icon={faSignOut} />
            Sign Out
          </NavLink>
        </div>
      }
      <Tabs default="profile" tabs={{
        profile: {
          name: () => <span>
            <Icon source="fa" icon={faUser} />
            Profile
          </span>,
          content: () => {
            if(!computed.user) {
              return <div className="tab-content">
                <Loader></Loader>
              </div>;
            }
            else {
              return <div className="tab-content">
                <h2 className="profile-title">
                  <Icon source="fa" icon={faImage} />
                  Profile Picture
                </h2>
                <div className="profile-picture-container">
                  {computed.employee.profilePictureUrl &&
                    <img src={computed.employee.profilePictureUrl} 
                      alt={computed.employee.firstname + ' ' + computed.employee.lastname + ' profile picture'} />
                  }
                  <div className="profile-picture-description">
                    {computed.employee.profilePictureUrl && 
                      <h3>Current Profile Picture</h3>
                    }
                    {!computed.employee.profilePictureUrl && 
                      <h3>You don't have a Profile Picture yet</h3>
                    }

                    {!isProfilePictureLoading && <div className="profile-picture-actions">

                      <label className="profile-picture-action" htmlFor="profile-picture">
                        <Icon source="fa" icon={faUpload} />
                        {computed.employee.profilePictureUrl && <span>Replace your Profile Picture</span>}
                        {!computed.employee.profilePictureUrl && <span>Set your Profile Picture</span>}
                      </label>

                      {computed.employee.profilePictureUrl &&
                        <span className="profile-picture-action profile-picture-action-delete" onClick={() => removeProfilePicture()}>
                          <Icon source="fa" icon={faTimes} />
                          Remove your Profile Picture
                        </span>
                      }

                      <input type="file" id="profile-picture" name="profile-picture" ref={profilePicture} onChange={() => uploadProfilePicture()} />
                    </div>}

                    {isProfilePictureLoading && <Loader></Loader>}

                    <span className="profile-picture-info">
                      <Icon source="fa" icon={faExclamationCircle} />
                      Before uploading a profile picture, make sure it is compliant with our guidelines.<br/>
                      <Icon source="fa" icon={faInfoCircle} />
                      Make sure to use a square picture otherwise it might be stretched.
                    </span>
                  </div>
                </div>
                <h2 className="profile-title">
                  <Icon source="fa" icon={faIdCardAlt} />
                  Profile Information
                </h2>
                <div className="personal-info-container">
                  <div className="personal-info-line">
                    <div className="personal-info-input-container">
                      <label htmlFor="personal-info-firstname">Firstname</label>
                      <input type="text" disabled id="personal-info-firstname" name="personal-info-firstname" value={computed.employee.firstname} />
                    </div>
                    <div className="personal-info-input-container">
                      <label htmlFor="personal-info-lastname">Lastname</label>
                      <input type="text" disabled id="personal-info-lastname" name="personal-info-lastname" value={computed.employee.lastname} />
                    </div>
                  </div>
                  <div className="personal-info-line">
                    <span className="personal-info-infos">
                      <Icon source="fa" icon={faInfoCircle} />
                      Please contact the support to edit your firstname or lastname.
                    </span>
                  </div>
                </div>
                <div className="bottom-container">
                  <div className="certificates-container">
                    <h2 className="profile-title">
                      <Icon source="fa" icon={faAward} />
                      Certificates
                    </h2>
                    <div className="certificates">
                      <div className="certificates-list">
                        {computed.employee.certificates && computed.employee.certificates.map((certificate, index) => 
                          <span key={certificate.name} className="certificate">
                            {certificate.name}
                            <span className="certificate-date">{certificate.date}</span>
                            <button onClick={() => deleteCertificate(index)}>
                              <Icon source="fa" icon={faTimes} />
                            </button>
                          </span>  
                        )}
                      </div>
                    </div>
                    <form className="certificate-add" onSubmit={handleSubmitCertificate}>
                      <input 
                        className="certificate-add-name-input"
                        type="text" 
                        placeholder="Certificate" 
                        data-field="certificateName"
                        value={certificateName}
                        onChange={e => setCertificateName(e.target.value)}
                        autoComplete="false"
                        required />
                      <DateTimePicker
                        onChange={setCertificateDate}
                        value={certificateDate}
                        clearIcon={null}
                        calendarIcon={<Icon source="fa" icon={faCalendarAlt} />}
                        format="y-MM"
                        maxDate={new Date()}
                        minDetail="year"
                        required
                        showLeadingZeros={true} />
                      <button className="certificate-add-submit">
                        <Icon source="fa" icon={faPlus} />
                        Add
                      </button>
                    </form>
                  </div><div className="experience-container">
                    <h2 className="profile-title">
                      <Icon source="fa" icon={faClipboardUser} />
                      Experience
                    </h2>
                    <div className="experience">
                      <div className="experience-list">
                        {computed.employee.experience && computed.employee.experience.map((experienceItem, index) => 
                          <span key={experienceItem.name} className="experience-item">
                            {experienceItem.name} @ {experienceItem.company}
                            <span className="experienceItem-date">
                              {experienceItem.start}
                              {!!experienceItem.end && 
                                <span> - {experienceItem.end}</span>
                              }
                            </span>
                            <button onClick={() => deleteExperience(index)}>
                              <Icon source="fa" icon={faTimes} />
                            </button>
                          </span>  
                        )}
                      </div>
                    </div>
                    <form className="experience-add" onSubmit={handleSubmitExperience}>
                      <input 
                        className="experience-add-name-input"
                        type="text" 
                        placeholder="Experience" 
                        data-field="experienceName"
                        value={experienceName}
                        onChange={e => setExperienceName(e.target.value)}
                        autoComplete="false"
                        required />
                      <input 
                        className="experience-add-company-input"
                        type="text" 
                        placeholder="Company" 
                        data-field="experienceCompamyName"
                        value={experienceCompamyName}
                        onChange={e => setExperienceCompanyName(e.target.value)}
                        autoComplete="false"
                        required />
                      <DateTimePicker
                        onChange={setExperienceStartDate}
                        value={experienceStartDate}
                        clearIcon={null}
                        calendarIcon={<Icon source="fa" icon={faCalendarAlt} />}
                        format="y-MM"
                        maxDate={new Date()}
                        minDetail="year"
                        required
                        showLeadingZeros={true} />
                      <DateTimePicker
                        onChange={setExperienceEndDate}
                        value={experienceEndDate}
                        clearIcon={null}
                        calendarIcon={<Icon source="fa" icon={faCalendarAlt} />}
                        format="y-MM"
                        maxDate={new Date()}
                        minDetail="year"
                        showLeadingZeros={true} />
                      <button className="experience-add-submit">
                        <Icon source="fa" icon={faPlus} />
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>;
            }
          }
        },
        support: {
          name: () => <span>
            <Icon source="fa" icon={faUserHeadset} />
            Support
          </span>,
          content: () => <div className="tab-content tab-support">
            <h2 className="profile-title">
              <Icon source="fa" icon={faPhoneAlt} />
              Reach Phone Support
            </h2>
            <span className="support-tel">
              <span className="support-tel-icon">
                <Icon source="fa" icon={faPhoneAlt} />
              </span>
              <a className="support-tel-number" href="tel:0800000000">
                0.800.00.00.00
              </a>
            </span>
            <span>Contact by phone will be available soon!</span>
            <details>
                <summary>
                  <Icon source="fa" icon={faInfoCircle} />
                  We might ask you some information
                </summary>
                <span className="support-message-warning">
                  <Icon source="fa" icon={faExclamationTriangle} />
                  This information is private. Communicate it only to the support!
                </span>
                {Object.keys(supportMetadata).map(metadataKey =>
                  <span key={metadataKey}>{metadataKey} : {supportMetadata[metadataKey]}</span>
                )}
            </details>
            <h2 className="profile-title">
              <Icon source="fa" icon={faEnvelope} />
              Send us a message
            </h2>
            <form className="support-form" onSubmit={handleSubmitSupport}>
              <textarea 
                placeholder="Your message...."
                data-field="supportMessage"
                value={supportMessage}
                onChange={e => setSupportMessage(e.target.value)}
                autoComplete="false"
                required ></textarea>
              <details>
                <summary>
                  <Icon source="fa" icon={faInfoCircle} />
                  Some information will be automatically joined to your message
                </summary>
                <span className="support-message-warning">
                  <Icon source="fa" icon={faExclamationTriangle} />
                  This information is private. Communicate it only to the support!
                </span>
                {Object.keys(supportMetadata).map(metadataKey =>
                  <span key={metadataKey}>{metadataKey} : {supportMetadata[metadataKey]}</span>
                )}
              </details>
              <div className="support-form-actions">
                <button>Send message</button>
              </div>
            </form>
          </div>
        },
        settings: {
          name: () => <span>
            <Icon source="fa" icon={faCog} />
            Settings
          </span>,
          content: () => <div className="tab-content">
            <div className="settings-container">
              {Object.keys(ESettings).map(settingKey => 
                <div className="setting-container" key={settingKey}>
                  {ESettingsDetails[settingKey].title}
                  {!!ESettingsDetails[settingKey].note &&
                    <div className="setting-note">{ESettingsDetails[settingKey].note}</div>
                  }
                  <ul>
                    {ESettingsDetails[settingKey].options.map(settingOption =>
                      <li key={settingOption.value} className={(SettingsService.getSettingValue(settingKey) === settingOption.value ? 'selected' : '')}
                        onClick={() => SettingsService.updateSetting(settingKey, settingOption.value)}>
                        {settingOption.print()}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        }
      }} />
    </div>
  );
};

export default Profile;
