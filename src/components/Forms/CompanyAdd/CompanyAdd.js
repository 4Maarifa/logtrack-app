import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faUser, faImage, faPalette, faInfoCircle, faCheck, faWallet } from '@fortawesome/pro-solid-svg-icons';

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

const defaultColors = {
  '#444444': {
    content: <Fragment>
        <i className="input-color-choice" style={{ backgroundColor: '#444444' }} />
        <Icon source="fa" icon={faCheck} />
      </Fragment>
  }
};

const CompanyAdd = ({ match }) => {
  const currentCompanyId = match.params.companyid;

  const [currentCompany, setCurrentCompany] = useState(null);

  const [newCompanyId, setNewCompanyId] = useState(null);

  const [creatorId, setCreatorId] = useState(null);
  const [creator, setCreator] = useState(null);

  const [name, setName] = useState('');
  const [plan, setPlan] = useState('');
  const [logo, setLogo] = useState(null);
  const [colors, setColors] = useState({ ...defaultColors });
  const [selectedColor, setSelectedColor] = useState('#444444');

  const observerKey = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const computeValues = () => {
    if(currentCompanyId) {
      CompanyService.get(currentCompanyId)
        .then(companyDoc => {
          setCurrentCompany(companyDoc.data());
          setName(companyDoc.data().name);
          setPlan(companyDoc.data().plan);
          setLogo({
            file: null,
            url: companyDoc.data().logoURL
          });
          
          let currentColors = colors;
          currentColors[companyDoc.data().color] = {
            content: <Fragment>
              <i className="input-color-choice" style={{ backgroundColor: companyDoc.data().color }} />
              <Icon source="fa" icon={faCheck} />
            </Fragment>
          };
          setColors(currentColors);
          setSelectedColor(companyDoc.data().color);
          
          EmployeeService.get(companyDoc.data().creator)
            .then(employeeDoc => {
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
  };

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

    const endCompanyProcess = logoURL => {
      if(currentCompanyId) {
        CompanyService.updateField(currentCompanyId, {
          logoURL,
          color: selectedColor || '#444444'
        }).then(() => {
            setNewCompanyId(currentCompanyId);
            DataService.computed.notifyChanges();
          })
          .catch(ErrorService.manageError);
      }
      else {
        CompanyService.create(
          new Company(name,
                      logoURL,
                      computed.user.uid,
                      DateService.getCurrentIsoDateString(),
                      selectedColor || '#444444',
                      plan))

          .then(docRef => {
            RoleService.create(new Role(computed.user.uid, docRef.id, ERoleStatus.CONFIRMED, ERole.MANAGER, DateService.getCurrentIsoDateString(), null))
              .then(() => setNewCompanyId(docRef.id))
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
      }
    };

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
      endCompanyProcess(currentCompany.logoURL);
    }
    
  };

  const onLogoChange = newLogo => {
    setLogo(newLogo);
    setSelectedColor('');
    newLogo && newLogo.file && ColorService.getMainColorsOfImage(newLogo.url)
      .then(computeColors)
      .catch(ErrorService.manageError);
  };

  const computeColors = colors => {
    let colorResults = {
      ...defaultColors
    };
    colors.filter(ColorService.isMedColor).map(ColorService.convertRGBtoHEX).forEach(color => {
      colorResults[color] = {
        content: <Fragment>
          <i className="input-color-choice" style={{backgroundColor: color}} />
          <Icon source="fa" icon={faCheck} />
        </Fragment>
      }
    });
    setColors(colorResults);
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
  if(!computed.employee) {
    return null;
  }
  if(newCompanyId) {
    return <Redirect to={`/company/${newCompanyId}`} />;
  }

  return (
    <div className="CompanyAdd">
      <h1>{currentCompanyId ? 'Edit' : 'Add'} a company</h1>
      <form onSubmit={handleSubmit}>

        {/* Name field */}
        <FormInput
          value={name}
          inputType="text"
          fieldName="name"
          inputDisabled={currentCompanyId}
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

        {currentCompanyId ? <span className="input-color-info">
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
          inputRequired={!currentCompanyId}
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
        <div className="input-creator">
          <span className="fake-label">
            <Icon source="fa" icon={faUser} />
            Creator
          </span>
          <PageLink type={PageLinkType.EMPLOYEE} entityId={creatorId} entityData={creator} />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default CompanyAdd;
