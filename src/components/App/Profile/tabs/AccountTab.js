import React, { useEffect, useState } from 'react';
import { faUser, faInfoCircle, faImage, faExclamationCircle, faEnvelope } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../../services/data.service';
import ErrorService from './../../../../services/error.service';
import FileService from './../../../../services/file.service';
import EmployeeService from './../.././../../services/entities/employee.service';

import Icon from './../../../Utils/Icon/Icon';
import Loader from './../../../Utils/Loader/Loader';
import FormInput from './../../../Utils/FormElements/FormInput/FormInput';
import FormInputFile from './../../../Utils/FormElements/FormInputFile/FormInputFile';
import Switch from './../../../Utils/FormElements/Switch/Switch';

import { v4 as uuid } from 'uuid';

/**
 * Component: AccountTab
 * Tab of Profile component
 * 
 * Modify account's details
 */
const AccountTab = () => {

  // Current profile picture is stored here
  const [profilePicture, setProfilePicture] = useState(null);

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());
  
  // Profile picture change handler
  const handleProfilePictureChange = newProfilePicture => {

    // If the user chosed a new file
    if(newProfilePicture && newProfilePicture.file) {

      // Upload the file
      FileService.uploadProfilePhoto(newProfilePicture.file)
        .then(() => {

          // Get the public URL of the newly uploaded file
          FileService.getDownloadURLForProfilePicture()
            .then(url => {

              // Modify the current employee to store the new uploaded file URL
              EmployeeService.updateField(computed.user.uid, { profilePictureUrl: url })
                .then(DataService.computed.notifyChanges)
                .catch(ErrorService.manageError);
            })
            .catch(ErrorService.manageError);
        })
        .catch(ErrorService.manageError);
    }
    else {
      // Else, remove the current employee profile picture URL
      EmployeeService.updateField(computed.user.uid, { profilePictureUrl: null })
        .then(DataService.computed.notifyChanges)
        .catch(ErrorService.manageError);
    }
  };

  // Modify legal information
  const setInformed = () => {
    // Retrieving legal information
    const NEW_LEGAL = computed.employee.legal;

    // Toggling newsletter boolean
    NEW_LEGAL.informed = !NEW_LEGAL.informed;

    // Set the new legal information on the current employee
    EmployeeService.updateField(computed.user.uid, { legal: NEW_LEGAL })
      .then(() => {

        // Once done, inform user and data service on successfull change
        // Data service will reload the new information from the DB
        ErrorService.success('Saved!');
        DataService.computed.notifyChanges();
      })
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    if(computed.initialized) {
      // Set current file of the profile picture FormFile element
      if(computed.employee.profilePictureUrl) {
        setProfilePicture({
          file: null,
          url: computed.employee.profilePictureUrl
        });
      }
      else {
        // Resetting Profile picture FormFile element
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

      {/* Profile picture change */}
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

      {/* Other profile information */}
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
        {/* Firstname and lastname fiels are read-only: users are not allowed to modify them directly! */}
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

      {/* Newsletter subscription */}
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
