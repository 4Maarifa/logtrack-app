import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faUser, faImage, faPalette, faInfoCircle, faCheck, faWallet } from '@fortawesome/pro-light-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import Choose from './../../Utils/FormElements/Choose/Choose';
import PageLink, { PageLinkType } from './../../Utils/PageLink/PageLink';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import FormInputFile from './../../Utils/FormElements/FormInputFile/FormInputFile';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import FileService from './../../../services/file.service';
import RoleService from './../../../services/entities/role.service';
import CompanyService from './../../../services/entities/company.service';
import ColorService from './../../../services/color.service';
import EmployeeService from './../../../services/entities/employee.service';

import Company, { ECompanyPlan } from './../../../classes/Company';
import Role from './../../../classes/Role';
import { ERole, ERoleStatus } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './CompanyAdd.scss';

// Build a default color object
const DEFAULT_COLORS = {
  '#444444': {
    content: ({ isActive }) => <Fragment>
        <i className="input-color-choice" style={{ backgroundColor: '#444444' }} />
        {isActive ? <Icon source="fa" icon={faCheck} /> : null}
      </Fragment>
  }
};

/**
 * Component: CompanyAdd
 * Form to add or edit a new company
 * 
 * Standalone form to add or edit a company
 * On eidtion, just pass the company Id as a GET param
 */
const CompanyAdd = ({ match }) => {
  const CURRENT_COMPANY_ID = match.params.companyid;

  // Current company data, fetched on load
  const [currentCompany, setCurrentCompany] = useState(null);

  // Save the new companyId here to redirect the user once finished
  const [newCompanyId, setNewCompanyId] = useState(null);

  // Creator data
  const [creatorId, setCreatorId] = useState(null);
  const [creator, setCreator] = useState(null);

  // Form inputs
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('');
  const [logo, setLogo] = useState(null);
  const [colors, setColors] = useState({ ...DEFAULT_COLORS });
  const [selectedColor, setSelectedColor] = useState('#444444');

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // Form handler
  const handleSubmit = event => {
    event.preventDefault();

    if(!plan) {
      ErrorService.warning('Please select a plan!');
      return;
    }

    if(!logo) {
      ErrorService.warning('You must upload a logo');
      return;
    }

    // Declare a util function taht will update company fields on edit, or create a new company on add
    const endCompanyProcess = logoURL => {
      if(CURRENT_COMPANY_ID) {

        // if company exists, just update the updatable fields
        CompanyService.updateField(CURRENT_COMPANY_ID, {
          logoURL,
          color: selectedColor || '#444444'
        }).then(() => {

            // Set new id to redirect the user
            setNewCompanyId(CURRENT_COMPANY_ID);

            // And notify changes, as only managers have an active role on company can edit them,
            // It means that activeRoleCompany has been updated, so we have to reload it
            DataService.computed.notifyChanges();
          })
          .catch(ErrorService.manageError);
      }
      else {
        // Create the company
        CompanyService.create(
          new Company(name,
                      logoURL,
                      computed.user.uid,
                      DateService.getCurrentIsoDateString(),
                      selectedColor || '#444444',
                      plan))

          .then(docRef => {

            // Once created, create a first role of manager, already confirmed, for the creator
            // This is a very special situation where rights approve the creation of a pre-confirmed role, only if creator id match the role employee's id
            // Then set the company id to redirect the user
            RoleService.create(new Role(computed.user.uid, docRef.id, ERoleStatus.CONFIRMED, ERole.MANAGER, DateService.getCurrentIsoDateString(), null))
              .then(() => setNewCompanyId(docRef.id))
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
      }
    };

    // If the logo was uploaded / updated, upload it and get the url
    // Then, complete the company add / edition process
    if(logo.file) {
      FileService.uploadCompanyLogo(logo.file)
      .then(fileRef => {

        FileService.getDownloadURLForCompanyLogo(fileRef)
          .then(endCompanyProcess)
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
    }
    else {
      // Otherwise, just end the company process
      endCompanyProcess(currentCompany.logoURL);
    }
    
  };

  // When the logo change, save it and compute corresponding colors
  const onLogoChange = newLogo => {
    setLogo(newLogo);
    setSelectedColor(Object.keys(DEFAULT_COLORS)[0]);

    // If there's a new logo (not just a delete of the current one), get main colors of the image
    // So that the user can select company's color from new colors
    newLogo && newLogo.file && ColorService.getMainColorsOfImage(newLogo.url)
      .then(computeColors)
      .catch(ErrorService.manageError);
  };

  // Compute colors permits to convert a color array to a comprehensive array for the Choose component
  const computeColors = colors => {
    let colorResults = {
      ...DEFAULT_COLORS
    };

    // Remove all colors that are too dark or too light to be both understandable for users and compatible with the interface
    // Then, convert to HEX and convert data to Choose component compatible array
    colors.filter(ColorService.isMedColor).map(ColorService.convertRGBtoHEX).forEach(color => {
      colorResults[color] = {
        content: ({ isActive }) => <Fragment>
          <i className="input-color-choice" style={{backgroundColor: color}} />
          {isActive ? <Icon source="fa" icon={faCheck} /> : null}
        </Fragment>
      }
    });

    // Then set the color array to state
    setColors(colorResults);
  };

  useEffect(() => {
    if(computed.initialized) {

      // If there's a current company = there's an edit, fetch the company
      if(CURRENT_COMPANY_ID) {
        CompanyService.get(CURRENT_COMPANY_ID)
          .then(companyDoc => {

            // Then set the current company, as well as its data, to the state
            setCurrentCompany(companyDoc.data());

            // set form data
            setName(companyDoc.data().name);
            setPlan(companyDoc.data().plan);
            setLogo({
              file: null,
              url: companyDoc.data().logoURL
            });
            
            // Add the company color to the possible color
            let currentColors = colors;
            currentColors[companyDoc.data().color] = {
              content: ({ isActive }) => <Fragment>
                <i className="input-color-choice" style={{ backgroundColor: companyDoc.data().color }} />
                {isActive ? <Icon source="fa" icon={faCheck} /> : null}
              </Fragment>
            };
            setColors(currentColors);

            // and select it (as it was the one that was selected)
            setSelectedColor(companyDoc.data().color);
            
            // And get the creator of that company
            EmployeeService.get(companyDoc.data().creator)
              .then(employeeDoc => {

                // and save him to the state
                setCreatorId(employeeDoc.id);
                setCreator(employeeDoc.data());
              })
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
      }
      else {
        setCreatorId(computed.user.uid);
        setCreator(computed.employee);
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
  if(!computed.employee) {
    return null;
  }

  // When finished, redirect to this company page
  if(newCompanyId) {
    return <Redirect to={`/company/${newCompanyId}`} />;
  }

  return (
    <div className="CompanyAdd">
      <h1>{CURRENT_COMPANY_ID ? 'Edit' : 'Add'} a company</h1>

      {/* Company add form */}
      <form onSubmit={handleSubmit}>

        {/* Name field */}
        {/* This field is disabled on edit => no edition of name is permitted */}
        <FormInput
          value={name}
          inputType="text"
          fieldName="name"
          inputDisabled={CURRENT_COMPANY_ID}
          label={
            <span>
              <Icon source="fa" icon={faBuilding} />
              Name
            </span>
          }
          inputRequired
          inputPattern=".{3,}"
          instructions={
            <span>
              The name is required<br/>
              The name must be 3 characters minimum
            </span>
          }
          onValueChange={setName} />

        {/* Imnforming the user here that the name could not be edited by him */}
        {CURRENT_COMPANY_ID ? <span className="input-color-info">
          <Icon source="fa" icon={faInfoCircle} />
          Please contact the support to edit your company's name.
        </span> : null}

        {/* Plan field */}
        <div className="plan-selection">
          <span className="fake-label">
            <Icon source="fa" icon={faWallet} />
            Plan
          </span>
          <div className="plan-selection-content">
            {/* Printing all plan features */}
            {Object.keys(ECompanyPlan).map(planKey => <div key={planKey}>
              <span className="plan-icon">{ECompanyPlan[planKey].icon}</span>
              <h2 className="plan-name">{ECompanyPlan[planKey].name}</h2>
              <ul>
                {ECompanyPlan[planKey].attributes.map((attr, index) => <li key={index}>
                  {attr}
                </li>)}
              </ul>
              <div className="plan-price">
                {ECompanyPlan[planKey].price}
              </div>
              <span className={'button ' + (ECompanyPlan[planKey].disabled ? 'disabled' : '')} onClick={() => !ECompanyPlan[planKey].disabled && setPlan(planKey)}>
                {!ECompanyPlan[planKey].disabled ? (plan === planKey ? <span><Icon source="fa" icon={faCheck}/> Plan Selected</span> : 'Select this plan') : 'Not available yet'}
              </span>
              {!ECompanyPlan[planKey].disabled && <span className="plan-info">No Credit Card required</span>}
            </div>)}
          </div>
          <span className="plan-selection-mentions">
            (1) Support by Phone is not available yet and will begin after early access<br/>
            (2) Activated during early access<br/>
            (3) If the user's device is compatible<br/>
            (4) After early access, you will have to choose your definitive plan &amp; options before charges apply
          </span>
        </div>

        {/* Logo field */}
        <FormInputFile
          imagePreview
          onValueChange={onLogoChange}
          value={logo}
          label={
            <span>
              <Icon source="fa" icon={faImage} />
              Logo
            </span>
          }
          inputRequired={!CURRENT_COMPANY_ID}
          instructions={
            <span>
              The logo is required
            </span>
          }
          accept="image/*" />

        {/* Main Color */}
        <div className="input-color input-container">
          <span className="fake-label">
            <Icon source="fa" icon={faPalette} />
            Dominant Color
          </span>
          <Choose
            items={colors}
            selection={selectedColor}
            fieldName="selectedColor"
            selectionRequired
            onSelectionChange={setSelectedColor} />
          <span className="input-color-info sub">
            <Icon source="fa" icon={faInfoCircle} />
            The dominant color of your company is used to customize employees' experience.
          </span>
        </div>

        {/* Creator */}
        <div className="input-container">
          <span className="fake-label">
            <Icon source="fa" icon={faUser} />
            Creator
          </span>
          {/* Just a pagelink to the employee */}
          <PageLink type={PageLinkType.EMPLOYEE} entityId={creatorId} entityData={creator} />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default CompanyAdd;
