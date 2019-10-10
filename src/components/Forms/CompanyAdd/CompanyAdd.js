import React from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faUser, faImage } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import DataService from './../../../services/data.service';
import ErrorService from './../../../services/error.service';
import FileService from './../../../services/file.service';
import RoleService from './../../../services/entities/role.service';
import CompanyService from './../../../services/entities/company.service';

import Company from './../../../classes/Company';
import Role from './../../../classes/Role';

import ERoleStatus from './../../../classes/enums/ERoleStatus';
import ERole from './../../../classes/enums/ERole';

import Icon from './../../Utils/Icon/Icon';
import FormInput from './../../Utils/FormInput/FormInput';
import FormInputFile from '../../Utils/FormInputFile/FormInputFile';

import './CompanyAdd.scss';

class CompanyAdd extends ComponentSafeUpdate {
  constructor () {
    super();

    this.state = Object.assign({
      companyId: null, 
      name: '', 
      logo: null}, 
      DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({observerKey: 
      DataService.computed.observeComputedValues((computedValues) => {
        this.setStateSafe(computedValues);
      })
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
  }

  handleChange = event => {
    let newState = {};
    newState[event.target.getAttribute('data-field')] = event.target.value;
    this.setStateSafe(newState);
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('CompanyAdd : submitting...');

    this.uploadLogo()
      .then(logoUrl => {

        CompanyService.create(new Company(this.state.name, logoUrl, this.state.user.uid))
          .then(docRef => {
            console.log('CompanyAdd : Company added, creating Role...')

            RoleService.create(new Role(this.state.user.uid, docRef.id, ERoleStatus.CONFIRMED, ERole.MANAGER))
              .then(() => {
                console.log('CompanyAdd : successful');
                this.setStateSafe({companyId: docRef.id});
              })
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  }

  onLogoChange = file => {
    this.setStateSafe({logo: !!file ? file[0] : null});
  }

  uploadLogo = () => {
    return new Promise((resolve, reject) => {
      // Logo is mandatory
      if (!this.state.logo) {
        reject('You must upload a logo!');
      }

      console.log('CompanyAdd: uploading logo...');
      FileService.uploadCompanyLogo(this.state.logo)
        .then((fileRef) => {
          console.log('CompanyAdd : Company logo saved, getting logo company URL...');

          FileService.getDownloadURLForCompanyLogo(fileRef)
            .then((url) => {
              console.log('CompanyAdd : Company Logo URL got...');

              resolve(url);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  onFormInputChange = (value, fieldName) => {
    this.setStateSafe({[fieldName]: value});
  }

  /**
   * RENDER
   */
  render() {
    if (!this.state.employee) {
      return (<div></div>);
    } else if (!!this.state.companyId) {
      let companyUrl = '/company/' + this.state.companyId;
      return <Redirect to={companyUrl} />;
    } else {
      return (
        <div className="CompanyAdd">
          <h1>Add a company</h1>
          <form onSubmit={this.handleSubmit}>

            {/* Name field */}
            <FormInput 
              inputType="text"
              fieldName="name"
              label={
                <span>
                  <Icon source="fa" icon={faBuilding} />
                  Name
                </span>}
              onValueChange={this.onFormInputChange} />

            {/* Logo field */}
            <FormInputFile
              onValueChange={this.onLogoChange}
              label={
                <span>
                  <Icon source="fa" icon={faImage} />
                  Logo
                </span>
              }
              accept="image/*" />

            {/* Creator */}
            <div className="input-creator">
              <label>
                <Icon source="fa" icon={faUser} />
                Creator
              </label>
              <span>
                {this.state.employee.firstname + ' ' + this.state.employee.lastname}
              </span>
            </div>

            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}

export default CompanyAdd;
