import React from 'react';
import { faUpload } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from '../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import Icon from './../Icon/Icon';

import './FormInputFile.scss';

const uuidv4 = require('uuid/v4');

class FormInputFile extends ComponentSafeUpdate {
  constructor () {
    super();
    this.state = {
      onValueChange: null,

      fieldName: null,
      accept: '*/*',

      label: null,
      fileValues: null,

      initialized: false,
    };

    this.file = React.createRef();
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setStateSafe({
      onValueChange: this.props.onValueChange,
      label: this.props.label,
      fieldName: this.props.fieldName,
      accept: !!this.props.accept ? this.props.accept : '*/*',
      initialized: true
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
  }

  onChange = () => {
    this.setStateSafe({fileValues: this.file.current.files});
    !!this.state.onValueChange && this.state.onValueChange(this.file.current.files, this.state.fieldName);
  }

  /**
   * RENDER
   */
  render() {
    const inputId = uuidv4();
    return (
      <div className="FormInputFile">
        {!!this.state.initialized && <input
          id={inputId}
          type="file"
          ref={this.file}
          onChange={this.onChange}
          accept={this.state.accept}
          required />}
        <label htmlFor={inputId}>
          {!!this.state.fileValues &&
            <img src={URL.createObjectURL(this.state.fileValues[0])} alt="Upload Preview" />
          }
          <span>
            <Icon source="fa" icon={faUpload} />
            {!!this.state.fileValues ? 'Replace' : 'Upload'}
          </span>
        </label>
        {!!this.state.label && <span className="input-label">
          {this.state.label}
        </span>}
      </div>
    );
  }
}

export default FormInputFile;
