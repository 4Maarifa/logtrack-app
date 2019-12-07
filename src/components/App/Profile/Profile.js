import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import { NavLink } from 'react-router-dom';
import { faSignOut, faUser, faCog, faImage, faIdCardAlt, faUserHeadset, faPlus, faAward,
    faPhoneAlt, faInfoCircle, faExclamationCircle, faTimes, faUpload, faExclamationTriangle, faEnvelope, faClipboardUser, faCalendarAlt } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
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

import './Profile.scss';

class Profile extends ComponentSafeUpdate {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      profilePictureLoading: false,

      certificateName: '',
      certificateDate: null,

      experienceName: '',
      experienceCompamyName: '',
      experienceStartDate: null,
      experienceEndDate: null,

      supportMessage: '',
      supportMetadata: {}
    }, DataService.computed.getDefaultComputedValues());

    this.profilePicture = React.createRef();
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: 
      DataService.computed.observeComputedValues(computedValues => {
        this.setState(computedValues, this.computeValues);
      })
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  computeValues = () => {
    this.setState({supportMetadata: {
      userId: this.state.user.uid,
      userName: this.state.employee.firstname + ' ' + this.state.employee.lastname,
      userEmail: this.state.user.email,
      activeRoleId: this.state.employee.activeRoleId,
      activeRoleCompanyId: !!this.state.activeRole ? this.state.activeRole.companyId : null,
      activeRole: !!this.state.activeRole ? this.state.activeRole.role : null,
      date: DateService.getCurrentIsoDateString()
    }});
  };

  removeProfilePicture = () => {
    this.setState({profilePictureLoading: true}, () => {
      EmployeeService.updateField(this.state.user.uid, { profilePictureUrl: null })
        .then(() => DataService.computed.notifyChanges()
          .then(() => this.setState({profilePictureLoading: false})))
        .catch(ErrorService.manageError);
    });
  };

  uploadProfilePicture = () => {
    if(!!this.profilePicture.current.files.length) {
      this.setState({profilePictureLoading: true});
      FileService.uploadProfilePhoto(this.profilePicture.current.files[0])
        .then(() => {
          FileService.getDownloadURLForProfilePicture()
            .then(url => {
              EmployeeService.updateField(this.state.user.uid, { profilePictureUrl: url })
                .then(() => DataService.computed.notifyChanges()
                  .then(() => this.setState({profilePictureLoading: false})))
                .catch(ErrorService.manageError);
            })
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
  };

  handleChange = event => this.setState({[event.target.getAttribute('data-field')]: event.target.value});
  handleDateChange = (field, value) => this.setState({[field]: value});

  handleSubmitCertificate = event => {
    event.preventDefault();

    if(!!this.state.employee.certificates.filter(certificate => certificate.name === this.state.certificateName).length) {
      ErrorService.warning('You already have this certificate!');
      return;
    }

    let certificates = this.state.employee.certificates || [];
    certificates.push({name: this.state.certificateName, date: DateService.getMonthYearString(this.state.certificateDate)});

    EmployeeService.updateField(this.state.user.uid, {certificates})
      .then(() => DataService.computed.notifyChanges()
        .then(() => this.setState({certificateName: '', certificateDate: null})))
      .catch(ErrorService.manageError);
  };

  handleSubmitExperience = event => {
    event.preventDefault();

    if(this.state.experienceStartDate > this.state.experienceEndDate) {
      ErrorService.manageError('Experience start date muse be before end date!');
      return;
    }

    let experience = this.state.employee.experience || [];
    experience.push({
      name: this.state.experienceName,
      company: this.state.experienceCompamyName,
      start: DateService.getMonthYearString(this.state.experienceStartDate),
      end: DateService.getMonthYearString(this.state.experienceEndDate)
    });

    EmployeeService.updateField(this.state.user.uid, {experience})
      .then(() => DataService.computed.notifyChanges()
        .then(() => this.setState({experienceCompamyName: '', experienceName: '', experienceStartDate: null, experienceEndDate: null})))
      .catch(ErrorService.manageError);
  };

  handleSubmitSupport = event => {
    event.preventDefault();

    SupportService.createWithData(this.state.supportMessage, this.state.user.uid, this.state.supportMetadata)
      .then(() => {
        this.setState({supportMessage: ''});
        ErrorService.success('Your message was received successfully!');
      })
      .catch(ErrorService.manageError);
  };

  deleteCertificate = index => {
    let certificates = this.state.employee.certificates;
    certificates.splice(index, 1);
    EmployeeService.updateField(this.state.user.uid, {certificates})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  };

  deleteExperience = index => {
    let experience = this.state.employee.experience;
    experience.splice(index, 1);
    EmployeeService.updateField(this.state.user.uid, {experience})
      .then(DataService.computed.notifyChanges)
      .catch(ErrorService.manageError);
  };

  /**
   * RENDER
   */
  render() {
    return (
      <div className="Profile">
        {!!this.state.employee && !!this.state.user &&
          <div>
            Welcome back, <PageLink type={PageLinkType.EMPLOYEE} entityId={this.state.user.uid} entityData={this.state.employee} />!
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
              if(!this.state.user) {
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
                    {!!this.state.employee.profilePictureUrl &&
                      <img src={this.state.employee.profilePictureUrl} 
                        alt={this.state.employee.firstname + ' ' + this.state.employee.lastname + ' profile picture'} />
                    }
                    <div className="profile-picture-description">
                      {!!this.state.employee.profilePictureUrl && 
                        <h3>Current Profile Picture</h3>
                      }
                      {!this.state.employee.profilePictureUrl && 
                        <h3>You don't have a Profile Picture yet</h3>
                      }

                      {!this.state.profilePictureLoading && <div className="profile-picture-actions">

                        <label className="profile-picture-action" htmlFor="profile-picture">
                          <Icon source="fa" icon={faUpload} />
                          {!!this.state.employee.profilePictureUrl && <span>Replace your Profile Picture</span>}
                          {!this.state.employee.profilePictureUrl && <span>Set your Profile Picture</span>}
                        </label>

                        {!!this.state.employee.profilePictureUrl &&
                          <span className="profile-picture-action profile-picture-action-delete" onClick={() => this.removeProfilePicture()}>
                            <Icon source="fa" icon={faTimes} />
                            Remove your Profile Picture
                          </span>
                        }

                        <input type="file" id="profile-picture" name="profile-picture" ref={this.profilePicture} onChange={() => this.uploadProfilePicture()} />
                      </div>}

                      {!!this.state.profilePictureLoading && 
                        <Loader></Loader>
                      }

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
                        <input type="text" disabled id="personal-info-firstname" name="personal-info-firstname" value={this.state.employee.firstname} />
                      </div>
                      <div className="personal-info-input-container">
                        <label htmlFor="personal-info-lastname">Lastname</label>
                        <input type="text" disabled id="personal-info-lastname" name="personal-info-lastname" value={this.state.employee.lastname} />
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
                          {!!this.state.employee.certificates && this.state.employee.certificates.map((certificate, index) => 
                            <span key={certificate.name} className="certificate">
                              {certificate.name}
                              <span className="certificate-date">{certificate.date}</span>
                              <button onClick={() => this.deleteCertificate(index)}>
                                <Icon source="fa" icon={faTimes} />
                              </button>
                            </span>  
                          )}
                        </div>
                      </div>
                      <form className="certificate-add" onSubmit={this.handleSubmitCertificate}>
                        <input 
                          className="certificate-add-name-input"
                          type="text" 
                          placeholder="Certificate" 
                          data-field="certificateName"
                          value={this.state.certificateName}
                          onChange={this.handleChange}
                          autoComplete="false"
                          required />
                        <DateTimePicker
                          onChange={value => this.handleDateChange('certificateDate', value)}
                          value={this.state.certificateDate}
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
                          {!!this.state.employee.experience && this.state.employee.experience.map((experienceItem, index) => 
                            <span key={experienceItem.name} className="experience-item">
                              {experienceItem.name} @ {experienceItem.company}
                              <span className="experienceItem-date">
                                {experienceItem.start}
                                {!!experienceItem.end && 
                                  <span> - {experienceItem.end}</span>
                                }
                              </span>
                              <button onClick={() => this.deleteExperience(index)}>
                                <Icon source="fa" icon={faTimes} />
                              </button>
                            </span>  
                          )}
                        </div>
                      </div>
                      <form className="experience-add" onSubmit={this.handleSubmitExperience}>
                        <input 
                          className="experience-add-name-input"
                          type="text" 
                          placeholder="Experience" 
                          data-field="experienceName"
                          value={this.state.experienceName}
                          onChange={this.handleChange}
                          autoComplete="false"
                          required />
                        <input 
                          className="experience-add-company-input"
                          type="text" 
                          placeholder="Company" 
                          data-field="experienceCompamyName"
                          value={this.state.experienceCompamyName}
                          onChange={this.handleChange}
                          autoComplete="false"
                          required />
                        <DateTimePicker
                          onChange={value => this.handleDateChange('experienceStartDate', value)}
                          value={this.state.experienceStartDate}
                          clearIcon={null}
                          calendarIcon={<Icon source="fa" icon={faCalendarAlt} />}
                          format="y-MM"
                          maxDate={new Date()}
                          minDetail="year"
                          required
                          showLeadingZeros={true} />
                        <DateTimePicker
                          onChange={value => this.handleDateChange('experienceEndDate', value)}
                          value={this.state.experienceEndDate}
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
                  {Object.keys(this.state.supportMetadata).map(metadataKey =>
                    <span key={metadataKey}>{metadataKey} : {this.state.supportMetadata[metadataKey]}</span>
                  )}
              </details>
              <h2 className="profile-title">
                <Icon source="fa" icon={faEnvelope} />
                Send us a message
              </h2>
              <form className="support-form" onSubmit={this.handleSubmitSupport}>
                <textarea 
                  placeholder="Your message...."
                  data-field="supportMessage"
                  value={this.state.supportMessage}
                  onChange={this.handleChange}
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
                  {Object.keys(this.state.supportMetadata).map(metadataKey =>
                    <span key={metadataKey}>{metadataKey} : {this.state.supportMetadata[metadataKey]}</span>
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
  }
}

export default Profile;
