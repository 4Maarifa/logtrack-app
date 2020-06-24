import React, { useEffect, useState } from 'react';
import { faUser, faInfoCircle, faImage, faExclamationCircle, faEnvelope } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../../services/data.service';
import ErrorService from './../../../../services/error.service';
import FileService from './../../../../services/file.service';
import EmployeeService from './../.././../../services/entities/employee.service';

import Icon from './../../../Utils/Icon/Icon';
import FormInput from './../../../Utils/FormElements/FormInput/FormInput';
import FormInputFile from './../../../Utils/FormElements/FormInputFile/FormInputFile';
import Loader from './../../../Utils/Loader/Loader';

import { v4 as uuid } from 'uuid';
import Switch from '../../../Utils/FormElements/Switch/Switch';

const AccountTab = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const OBSERVER_KEY = uuid();
  
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

  const setInformed = () => {
    const NEW_LEGAL = computed.employee.legal;
    NEW_LEGAL.informed = !NEW_LEGAL.informed;
    EmployeeService.updateField(computed.user.uid, { legal: NEW_LEGAL })
      .then(() => {
        ErrorService.success('Saved!');
        DataService.computed.notifyChanges();
      })
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    if(computed.initialized) {
      if(computed.employee.profilePictureUrl) {
        setProfilePicture({
          file: null,
          url: computed.employee.profilePictureUrl
        });
      }
      else {
        setProfilePicture(null);
      }
    }
  }, [computed.initialized, computed.employee]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  
  if(!computed.initialized) { return null; }

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
          <div className="input-container">
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
          <div className="input-container">
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
        <Icon source="fa" icon={faEnvelope} />
        Newsletter Subscription
      </h2>
      <Switch value={computed.employee.legal.informed} onChange={setInformed} label="Keep me informed about product's news" />
      <span className="sub">Once per month, NO spam, NO email from partners</span>
    </div>;
  }
};

export default AccountTab;
