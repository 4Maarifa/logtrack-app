import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { faSignOut, faUser, faCog, faUserHeadset, faPhoneAlt, faInfoCircle, 
  faExclamationCircle, faImage, faExclamationTriangle, faEnvelope, faLock, 
  faKey, faSignIn } from '@fortawesome/pro-solid-svg-icons';

import Tabs from './../../Utils/Tabs/Tabs';
import Loader from './../../Utils/Loader/Loader';
import Icon from './../../Utils/Icon/Icon';
import ExTable from './../../Utils/ExTable/ExTable';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import FormInputFile from './../../Utils/FormElements/FormInputFile/FormInputFile';

import FirebaseService from './../../../services/firebase.service';
import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import FileService from './../../../services/file.service';
import EmployeeService from './../../../services/entities/employee.service';
import SupportService from './../../../services/entities/support.service';
import SettingsService, { ESettings, ESettingsDetails } from './../../../services/settings.service';

import { AccountActivity, EAccountActivityType } from './../../../classes/Employee';

import { EmployeeAccountActivity, employeeAccountActivityExTableFSS } from './../../Entities/Employee/Employee';

import { v4 as uuid } from 'uuid';

import './Profile.scss';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const [supportMessage, setSupportMessage] = useState('');
  const [supportMetadata, setSupportMetadata] = useState({});

  const [accountActivities, setAccountActivities] = useState([]);
  const [isAccountActivitiesLoading, setAccountActivitiesLoading] = useState(true);

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const handleProfilePictureChange = newProfilePicture => {
    if(newProfilePicture && newProfilePicture.file) {
      FileService.uploadProfilePhoto(newProfilePicture.file)
        .then(() => {
          FileService.getDownloadURLForProfilePicture()
            .then(url => {
              EmployeeService.updateField(computed.user.uid, { profilePictureUrl: url })
                .then(DataService.computed.notifyChanges)
                .catch(ErrorService.manageError);
            })
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
    else {
      EmployeeService.updateField(computed.user.uid, { profilePictureUrl: null })
        .then(DataService.computed.notifyChanges)
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

  const handleChangePasswordSubmit = event => {
    event.preventDefault();

    if(newPassword !== newPasswordConfirm) {
      ErrorService.manageError({code: 'auth/passwords-not-match'});
      return;
    }

    const credential = FirebaseService.getFirebaseObject().auth.EmailAuthProvider.credential(
      computed.user.email,
      currentPassword
    );

    FirebaseService.getCurrentUser().reauthenticateWithCredential(credential)
      .then(() => {
        FirebaseService.getCurrentUser().updatePassword(newPassword)
          .then(() => {
            EmployeeService.accountActivity.create(
              new AccountActivity(
                computed.user.email,
                DateService.getCurrentIsoDateString(),
                {
                  success: true,
                },
                EAccountActivityType.PASSWORD_CHANGE)
            )
              .then(() => {
                ErrorService.success('Password modified!');
                setCurrentPassword('');
                setNewPassword('');
                setNewPasswordConfirm('');
              })
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    if(computed.initialized) {
      setSupportMetadata({
        userId: computed.user.uid,
        userName: computed.employee.firstname + ' ' + computed.employee.lastname,
        userEmail: computed.user.email,
        activeRoleId: computed.employee.activeRoleId,
        activeRoleCompanyId: computed.activeRole ? computed.activeRole.companyId : null,
        activeRole: computed.activeRole ? computed.activeRole.role : null,
        date: DateService.getCurrentIsoDateString()
      });
      if(computed.employee.profilePictureUrl) {
        setProfilePicture({
          file: null,
          url: computed.employee.profilePictureUrl
        });
      }
      else {
        setProfilePicture(null);
      }
      EmployeeService.accountActivity.getAllByEmail(computed.user.email)
        .then(accountActivities => {
          setAccountActivities(accountActivities);
          setAccountActivitiesLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  }, [computed.initialized, computed.employee]);

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
                  <FormInputFile
                    imagePreview
                    onValueChange={handleProfilePictureChange}
                    value={profilePicture}
                    label={
                      <span>
                        <Icon source="fa" icon={faImage} />
                        Profile Picture
                      </span>
                    }
                    instructions={
                      <span>
                        <Icon source="fa" icon={faExclamationCircle} />
                        Before uploading a profile picture, make sure it is compliant with our guidelines.<br/>
                        <Icon source="fa" icon={faInfoCircle} />
                        Make sure to use a square picture otherwise it might be stretched.
                      </span>
                    }
                    accept="image/*" />
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
                    <span className="personal-info-line-separator"></span>
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
                <h3>Change your password</h3>
                <form onSubmit={handleChangePasswordSubmit}>
                  <div className="personal-info-line">
                    <div className="personal-info-input-container">
                      {/* Current Password field */}
                      <FormInput
                        value={currentPassword}
                        inputType="password"
                        fieldName="currentPassword"
                        label={
                          <span>
                            <Icon source="fa" icon={faKey} />
                            Current password
                          </span>
                        }
                        instructions={
                          <span>
                            Your old password
                          </span>
                        }
                        inputAutoComplete="password"
                        inputPattern=".{5,}"
                        inputName="password"
                        inputRequired
                        onValueChange={setCurrentPassword} />
                    </div>
                  </div>
                  <div className="personal-info-line">
                    <div className="personal-info-input-container">
                      {/* Password field */}
                      <FormInput
                        value={newPassword}
                        inputType="password"
                        fieldName="password"
                        label={
                          <span>
                            <Icon source="fa" icon={faKey} />
                            New password
                          </span>
                        }
                        instructions={
                          <span>
                            Pick a password<br/>
                            5 characters minimum
                          </span>
                        }
                        inputAutoComplete="off"
                        inputPattern=".{5,}"
                        inputName="password"
                        inputRequired
                        onValueChange={setNewPassword} />
                    </div>
                    <span className="personal-info-line-separator"></span>
                    <div className="personal-info-input-container">
                      {/* Second Password field */}
                      <FormInput
                        value={newPasswordConfirm}
                        inputType="password"
                        fieldName="secondpassword"
                        label={
                          <span>
                            <Icon source="fa" icon={faKey} />
                            Repeat your new password
                          </span>
                        }
                        instructions={
                          <span>
                            Repeat the password
                          </span>
                        }
                        inputAutoComplete="off"
                        inputRequired
                        onValueChange={setNewPasswordConfirm} />
                    </div>
                  </div>
                  <input type="submit" value="Change password" />
                </form>
                <h2 className="profile-title">
                  <Icon source="fa" icon={faSignIn} />
                  Account Activity
                </h2>
                <div className="personal-info-container">
                  <ExTable key="accountActivities" 
                          items={accountActivities}
                          fss={employeeAccountActivityExTableFSS}
                          renderItem={(_, activity) => <EmployeeAccountActivity activity={activity} />}
                          loading={isAccountActivitiesLoading}
                          header={<span><Icon source="fa" icon={faSignIn} /> Account Activity</span>}
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
