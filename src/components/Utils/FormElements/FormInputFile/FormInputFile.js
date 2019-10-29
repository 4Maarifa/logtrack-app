import React from 'react';
import { faUpload, faCheck, faTimes } from '@fortawesome/pro-solid-svg-icons';

import ComponentSafeUpdate from './../../ComponentSafeUpdate/ComponentSafeUpdate';
import Icon from './../../Icon/Icon';
import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../Tooltip/Tooltip';

import './FormInputFile.scss';

const uuidv4 = require('uuid/v4');

class FormInputFile extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = {
      onValueChange: props.onValueChange,

      fieldName: props.fieldName,
      inputRequired: props.inputRequired,
      accept: this.props.accept || '*/*',

      label: props.label,
      fileValues: null,

      instructions: props.instructions,

      imagePreview: props.imagePreview,

      hover: false
    };

    this.file = React.createRef();
  }

  componentDidMount = () => {
    super.componentDidMount();
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  onChange = () => {
    if(!!this.file.current.files && !!this.file.current.files.length) {
      this.setState({fileValues: this.file.current.files});
      !!this.state.onValueChange && this.state.onValueChange(this.file.current.files, this.state.fieldName);
    }
  };

  /**
   * RENDER
   */
  render() {
    const inputId = uuidv4();
    return (
      <div className="FormInputFile">
        <input
          id={inputId}
          type="file"
          ref={this.file}
          onChange={this.onChange}
          accept={this.state.accept}
          required={this.state.inputRequired} />
        <label htmlFor={inputId}>
          {!!this.state.imagePreview && !!this.state.fileValues && !!this.state.fileValues.length &&
            <img src={URL.createObjectURL(this.state.fileValues[0])} alt="Upload Preview" />
          }
          <span className="input-title">
            <Icon source="fa" icon={faUpload} />
            {!!this.state.fileValues ? 'Replace' : 'Upload'}
          </span>
          <span className="indicator"
            onMouseOver={() => this.setState({ hover: true })}
            onMouseOut={() => this.setState({ hover: false })}>

            <Icon className="valid" source="fa" icon={faCheck} />
            <Icon className="invalid" source="fa" icon={faTimes} />
          </span>
        </label>
        {!!this.state.label && <span className="fake-label">
          {this.state.label}
        </span>}
        {!!this.state.instructions && <Tooltip 
          show={this.state.hover} 
          label={this.state.instructions}
          tooltipPosition={ETooltipPosition.BOTTOM} 
          tooltipTrianglePosition={ETooltipTrianglePosition.END} />}
      </div>
    );
  }
}

export default FormInputFile;
