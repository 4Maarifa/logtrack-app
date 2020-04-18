import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faUser, faImage, faPalette, faInfoCircle, faCheck, faWallet } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import Choose from './../../Utils/Choose/Choose';
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

import Company, { ECompanyPlan } from './../../../classes/Company';
import Role from './../../../classes/Role';
import { ERole, ERoleStatus } from './../../../classes/Role';

import { v4 as uuid } from 'uuid';

import './CompanyAdd.scss';

const defaultColors = {
  '#999999': {
    content: <Fragment>
        <i className="input-color-choice" style={{ backgroundColor: '#999999' }}></i>
        <Icon source="fa" icon={faCheck} />
      </Fragment>
  }
};

const CompanyAdd = () => {

  const [companyId, setCompanyId] = useState(null);

  const [name, setName] = useState('');
  const [plan, setPlan] = useState('');
  const [logo, setLogo] = useState(null);
  const [colors, setColors] = useState({ ...defaultColors });
  const [selectedColor, setSelectedColor] = useState('#999999');

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, observerKey);
    return () => DataService.computed.unobserveComputedValues(observerKey)
  }, []);
  
  if(!computed.initialized) { return null; }

  const handleSubmit = event => {
    event.preventDefault();

    if(!plan) {
      ErrorService.warning('Please select a plan!');
      return;
    }

    uploadLogo()
      .then(logoUrl => {

        CompanyService.create(new Company(name, logoUrl, computed.user.uid, DateService.getCurrentIsoDateString(), selectedColor, plan))
          .then(docRef => {

            RoleService.create(new Role(computed.user.uid, docRef.id, ERoleStatus.CONFIRMED, ERole.MANAGER, DateService.getCurrentIsoDateString(), null))
              .then(() => setCompanyId(docRef.id))
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  };

  const onLogoChange = file => {
    !!file && ColorService.getMainColorsOfImage(URL.createObjectURL(file[0]))
      .then(computeColors)
      .catch(ErrorService.manageError);
    setLogo(!!file ? file[0] : null);
  };

  const computeColors = colors => {
    let colorResults = {
      ...defaultColors
    };
    colors.filter(ColorService.isMedColor).map(ColorService.convertRGBtoHEX).forEach(color => {
      colorResults[color] = {
        content: <Fragment>
          <i className="input-color-choice" style={{backgroundColor: color}}></i>
          <Icon source="fa" icon={faCheck} />
        </Fragment>
      }
    });
    setColors(colorResults);
  };

  const uploadLogo = () => {
    return new Promise((resolve, reject) => {
      // Logo is mandatory
      if(!logo) {
        reject('You must upload a logo!');
      }

      FileService.uploadCompanyLogo(logo)
        .then(fileRef => {

          FileService.getDownloadURLForCompanyLogo(fileRef)
            .then(url => resolve(url))
            .catch(reject);
        })
        .catch(reject);
    });
  };

  /**
   * RENDER
   */
  if(!computed.employee) {
    return null;
  }
  if(companyId) {
    const companyUrl = '/company/' + companyId;
    return <Redirect to={companyUrl} />;
  }

  return (
    <div className="CompanyAdd">
      <h1>Add a company</h1>
      <form onSubmit={handleSubmit}>

        {/* Name field */}
        <FormInput
          value={name}
          inputType="text"
          fieldName="name"
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

        {/* Plan field */}
        <div className="plan-selection">
          <span className="fake-label">
            <Icon source="fa" icon={faWallet} />
            Plan
          </span>
          <div className="plan-selection-content">
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
              <span className={'button ' + (!!ECompanyPlan[planKey].disabled ? 'disabled' : '')} onClick={() => !ECompanyPlan[planKey].disabled && setPlan(planKey)}>
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
          label={
            <span>
              <Icon source="fa" icon={faImage} />
              Logo
            </span>
          }
          inputRequired
          instructions={
            <span>
              The logo is required
            </span>
          }
          accept="image/*" />

        {/* Main Color */}
        <div className="input-color">
          <span className="fake-label">
            <Icon source="fa" icon={faPalette} />
            Dominant Color
          </span>
          <Choose
            items={colors}
            multiple={false} 
            defaultSelection={selectedColor}
            fieldName="selectedColor"
            selectionRequired
            onSelectionChange={setSelectedColor} />
          <span className="input-color-info">
            <Icon source="fa" icon={faInfoCircle} />
            The dominant color of your company is used to customize employees' experience.
          </span>
        </div>

        {/* Creator */}
        <div className="input-creator">
          <span className="fake-label">
            <Icon source="fa" icon={faUser} />
            Creator
          </span>
          <PageLink type={PageLinkType.EMPLOYEE} entityId={computed.user.uid} entityData={computed.employee} />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default CompanyAdd;
