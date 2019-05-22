import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './CompanyAdd.css';
import DataService from '../../../services/data.service';
import ErrorService from '../../../services/error.service';
import FileService from '../../../services/file.service';

import Company from '../../../classes/Company';
import Role from '../../../classes/Role';

import ERoleStatus from '../../../classes/enums/ERoleStatus';
import ERole from '../../../classes/enums/ERole';

class CompanyAdd extends Component {
  constructor () {
    super();

    this.state = Object.assign({companyId: null, name: ''}, DataService.computed.getDefaultComputedValues());
    this.logo = React.createRef();
  }

  observeComputedValues = (computedValues) => {
    this.setState(computedValues, this.computeRoles);
  }

  componentDidMount = () => {
    DataService.computed.observeComputedValues(this.observeComputedValues);
  }

  handleChange = event => {
    let newState = {};
    newState[event.target.getAttribute('data-field')] = event.target.value;
    this.setState(newState);
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('CompanyAdd : submitting...');

    this.uploadLogo()
      .then((logoUrl) => {

        DataService.company.create(new Company(this.state.name, logoUrl, this.state.user.uid))
          .then(docRef => {
            console.log('CompanyAdd : Company added, creating Role...')

            DataService.role.create(new Role(this.state.user.uid, docRef.id, ERoleStatus.CONFIRMED, ERole.MANAGER))
              .then(() => {
                console.log('CompanyAdd : successful');
                this.setState({companyId: docRef.id});
              })
              .catch(ErrorService.manageError);
          })
          .catch(ErrorService.manageError);
      })
      .catch(ErrorService.manageError);
  }

  uploadLogo = () => {
    return new Promise((resolve, reject) => {
      // Logo is mandatory
      if (!this.logo.current.files.length) {
        reject();
      }

      console.log('CompanyAdd: uploading logo...');
      FileService.uploadCompanyLogo(this.logo.current.files[0])
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

  render() {
    if (!this.state.employee) {
      return (<div></div>);
    } else if (!!this.state.companyId) {
      let companyUrl = '/company/' + this.state.companyId;
      return <Redirect to={companyUrl} />;
    } else {
      return (
        <div>
          Add a company
          <form onSubmit={this.handleSubmit}>
            {/* Name field */}
            <label>
              Name of the company:
              <input
                type="text"
                data-field="name"
                placeholder="Corporation Inc."
                value={this.state.name}
                onChange={this.handleChange}
                required />
            </label>

            {/* Logo field */}
            <label>
              Logo:
              <input
                type="file"
                ref={this.logo}
                required />
            </label>

            {/* Creator */}
            <label>
              Creator: {this.state.employee.firstname + ' ' + this.state.employee.lastname}
            </label>

            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}

export default CompanyAdd;
