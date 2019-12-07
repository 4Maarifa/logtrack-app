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
      accept: this.props.accept || '*/*',

      fileValues: null,

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
      !!this.props.onValueChange && this.props.onValueChange(this.file.current.files, this.props.fieldName);
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
          required={this.props.inputRequired} />
        <label htmlFor={inputId}>
          {!!this.props.imagePreview && !!this.state.fileValues && !!this.state.fileValues.length &&
            <img src={URL.createObjectURL(this.state.fileValues[0])} alt="Upload Preview" />
          }
          <span className="input-title">
            <Icon source="fa" icon={faUpload} />
            {!!this.state.fileValues ? 'Replace' : 'Upload'}
          </span>
          <span className="indicator"
            onMouseOver={() => this.setState({ hover: true })}
            onMouseOut={() => this.setState({ hover: false })}>

            <Icon containerclassname="valid" source="fa" icon={faCheck} />
            <Icon containerclassname="invalid" source="fa" icon={faTimes} />
          </span>
        </label>
        {!!this.props.label && <span className="fake-label">
          {this.props.label}
        </span>}
        {!!this.props.instructions && <Tooltip 
          show={this.state.hover} 
          label={this.props.instructions}
          tooltipPosition={ETooltipPosition.BOTTOM} 
          tooltipTrianglePosition={ETooltipTrianglePosition.END} />}
      </div>
    );
  }
}

export default FormInputFile;
