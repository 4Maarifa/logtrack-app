import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { faBuilding, faUser, faImage, faPalette, faInfoCircle, faCheck } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Utils/Icon/Icon';
import Choose from './../../Utils/Choose/Choose';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import FormInputFile from './../../Utils/FormElements/FormInputFile/FormInputFile';

import DataService from './../../../services/data.service';
import DateService from './../../../services/date.service';
import ErrorService from './../../../services/error.service';
import FileService from './../../../services/file.service';
import RoleService from './../../../services/entities/role.service';
import CompanyService from './../../../services/entities/company.service';
import ColorService from './../../../services/color.service';

import Company from './../../../classes/Company';
import Role from './../../../classes/Role';
import { ERole, ERoleStatus } from './../../../classes/Role';

import './CompanyAdd.scss';

const defaultColors = {
  '#999999': {
    content: <Fragment>
        <i className="input-color-choice" style={{ backgroundColor: '#999999' }}></i>
        <Icon source="fa" icon={faCheck} />
      </Fragment>
  }
};

class CompanyAdd extends ComponentSafeUpdate {
  constructor (props) {
    super(props);

    this.state = Object.assign({
      companyId: null, 
      name: '', 
      logo: null,
      colors: {
        ...defaultColors
      },
      selectedColor: '#999999'
    }, 
    DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({observerKey: DataService.computed.observeComputedValues(computedValues => this.setState(computedValues))});
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  onFormInputChange = (value, fieldName) => this.setState({[fieldName]: value});

  handleSubmit = event => {
    event.preventDefault();

    this.uploadLogo()
      .then(logoUrl => {

        CompanyService.create(new Company(this.state.name, logoUrl, this.state.user.uid, DateService.getCurrentIsoDateString(), this.state.selectedColor))
          .then(docRef => {

            RoleService.create(new Role(this.state.user.uid, docRef.id, ERoleStatus.CONFIRMED, ERole.MANAGER, DateService.getCurrentIsoDateString(), null))
              .then(() => this.setState({companyId: docRef.id}))
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  };

  onLogoChange = file => {
    !!file && ColorService.getMainColorsOfImage(URL.createObjectURL(file[0]))
      .then(this.computeColors)
      .catch(ErrorService.manageError);
    this.setState({logo: !!file ? file[0] : null});
  };

  computeColors = colors => {
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
    this.setState({colors: colorResults});
  };

  uploadLogo = () => {
    return new Promise((resolve, reject) => {
      // Logo is mandatory
      if(!this.state.logo) {
        reject('You must upload a logo!');
      }

      FileService.uploadCompanyLogo(this.state.logo)
        .then((fileRef) => {

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
  render() {
    if(!this.state.employee) {
      return (<div></div>);
    } 
    else if(!!this.state.companyId) {
      let companyUrl = '/company/' + this.state.companyId;
      return <Redirect to={companyUrl} />;
    } 
    else {
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
              onValueChange={this.onFormInputChange} />

            {/* Logo field */}
            <FormInputFile
              imagePreview
              onValueChange={this.onLogoChange}
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
                items={this.state.colors}
                multiple={false} 
                defaultSelection={this.state.selectedColor}
                fieldName="selectedColor"
                selectionRequired
                onSelectionChange={this.onFormInputChange} />
              <span className="input-color-info">
                <Icon source="fa" icon={faInfoCircle} />
                The dominant color of your company is used to customize employee's experience.
              </span>
            </div>

            {/* Creator */}
            <div className="input-creator">
              <span className="fake-label">
                <Icon source="fa" icon={faUser} />
                Creator
              </span>
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
