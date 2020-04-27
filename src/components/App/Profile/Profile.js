import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { faSignOut, faUser, faCog, faUserHeadset, faPhoneAlt, faInfoCircle, 
  faExclamationCircle, faTimes, faUpload, faExclamationTriangle, faEnvelope, faLock, faCheck } from '@fortawesome/pro-solid-svg-icons';

import Tabs from './../../Utils/Tabs/Tabs';
import Loader from './../../Utils/Loader/Loader';
import Icon from './../../Utils/Icon/Icon';
import ExTable from './../../Utils/ExTable/ExTable';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';

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

  const [supportMessage, setSupportMessage] = useState('');
  const [supportMetadata, setSupportMetadata] = useState({});

  const [loginAttempts, setLoginAttempts] = useState([]);
  const [isLoginAttemptsLoading, setLoginAttemptsLoading] = useState(true);

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
    EmployeeService.loginAttempt.getAllByEmail(computed.employee.email)
      .then(loginAttempts => {
        setLoginAttempts(loginAttempts);
        setLoginAttemptsLoading(false);
      })
      .catch(ErrorService.manageError);
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

  const handleSubmitSupport = event => {
    event.preventDefault();

    SupportService.createWithData(supportMessage, computed.user.uid, supportMetadata)
      .then(() => {
        setSupportMessage('');
        ErrorService.success('Your message was received successfully!');
      })
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
  const renderLoginAttempt = (_, itemData) => (
    <div className="Equipment Element-content Element-content-small">
      <div className="Element-base">
        {itemData.success ?
          <Icon containerclassname="Element-icon loginAttempt--success" source="fa" icon={faCheck} /> :
          <Icon containerclassname="Element-icon loginAttempt--failed" source="fa" icon={faTimes} />
        }
        <div className="Element-data">
          <span className="Element-title">
            Near {itemData.city}, {itemData.country}
          </span>
          <span className="sub">{DateService.getDateTimeString(DateService.getDateFromIsoString(itemData.creationIsoDate), false)}</span>
        </div>
      </div>
    </div>
  );

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
      <Tabs default="account" tabs={{
        account: {
          name: () => <span>
            <Icon source="fa" icon={faUser} />
            Account
          </span>,
          content: () => {
            if(!computed.user) {
              return <div className="tab-content">
                <Loader />
              </div>;
            }
            else {
              return <div className="tab-content">
                <h2 className="profile-title">Profile Picture</h2>
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

                    {isProfilePictureLoading && <Loader />}

                    <span className="profile-picture-info">
                      <Icon source="fa" icon={faExclamationCircle} />
                      Before uploading a profile picture, make sure it is compliant with our guidelines.<br/>
                      <Icon source="fa" icon={faInfoCircle} />
                      Make sure to use a square picture otherwise it might be stretched.
                    </span>
                  </div>
                </div>
                <h2 className="profile-title">
                  <Icon source="fa" icon={faUser} />
                  Profile Information
                </h2>
                <div className="personal-info-container">
                  <div className="personal-info-line">
                    <span className="personal-info-infos">
                      <Icon source="fa" icon={faInfoCircle} />
                      Please contact the support to edit your firstname or lastname.
                    </span>
                  </div>
                  <div className="personal-info-line">
                    <div className="personal-info-input-container">
                      <FormInput
                        value={computed.employee.firstname}
                        inputType="text"
                        fieldName="firstname"
                        inputDisabled
                        label={
                          <span>
                            Firstname
                          </span>
                        } />
                    </div>
                    <div className="personal-info-input-container">
                      <FormInput
                        value={computed.employee.lastname}
                        inputType="text"
                        fieldName="lastname"
                        inputDisabled
                        label={
                          <span>
                            Lastname
                          </span>
                        } />
                    </div>
                  </div>
                </div>
                <h2 className="profile-title">
                  <Icon source="fa" icon={faLock} />
                  Security
                </h2>
                <div className="personal-info-container">
                  <ExTable key="loginAttempts" 
                    items={loginAttempts}
                    renderItem={renderLoginAttempt}
                    loading={isLoginAttemptsLoading}
                    isNoFrame
                    isSmallItems />
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
                required />
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
                  {ESettingsDetails[settingKey].note &&
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
