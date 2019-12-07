import React, { Fragment } from 'react';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';
import Choose from './../../Utils/Choose/Choose';

import DataService from './../../../services/data.service';

import { LogTrackCategoryDetails, LogTrackActivity, LogTrackActivityDetails } from './../../../classes/LogTrack';

import './LogTrackAdd.scss';

const formParts = {
  [LogTrackActivity.EAT]: {
    form: <div><input type="text" required /></div>,
    activityState: {recipe: null},
    validate: () => {}
  }
};

class LogTrackAdd extends ComponentSafeUpdate {
  constructor (props) {
    super(props);
    this.state = Object.assign({
      
      logTrackCategoryKey: null,
      logTrackActivityKey: null,

      activeForm: null,

      activityDetails: {
        
      }
    },
    DataService.computed.getDefaultComputedValues());
  }

  componentDidMount = () => {
    super.componentDidMount();
    this.setState({
      observerKey: DataService.computed.observeComputedValues(computedValues => this.setState(computedValues, this.computeValues))
    });
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    DataService.computed.unobserveComputedValues(this.state.observerKey);
  };

  computeValues = () => {
    
  };

  handleSelection = (value, fieldName) => this.setState({[fieldName]: value}, () => {
    if(fieldName === 'logTrackCategoryKey' || fieldName === 'logTrackActivityKey') {
      this.switchForm();
    }
  });

  switchForm = () => {

  };

  /**
   * RENDER
   */
  render() {
    if(!this.state.activeRole) {
      return <div className="LogTrackAdd"></div>;
    }
    
    let logTrackCategories = {}, logTrackActivities = {};
    Object.keys(LogTrackCategoryDetails).forEach(key => {
      logTrackCategories[key] = {
        content: <Fragment>
          {LogTrackCategoryDetails[key].icon}
          {LogTrackCategoryDetails[key].text}
        </Fragment>
      };
    });

    if(!!this.state.logTrackCategoryKey) {
      LogTrackCategoryDetails[this.state.logTrackCategoryKey].activities.forEach(key => {
        logTrackActivities[key] = {
          content: <Fragment>
            {LogTrackActivityDetails[key].icon}
            {LogTrackActivityDetails[key].text}
          </Fragment>,
          disabled: !LogTrackActivityDetails[key].roles.includes(this.state.activeRole.role)
        };
      });
    }

    return (
      <div className="LogTrackAdd">
        <h1>Add a LogTrack</h1>
        <h3>
          {!!this.state.currentLogTrack ?
            <span>

            </span>:
            <span>
              No Current LogTrack
            </span>
          }
        </h3>
        <Choose
          items={logTrackCategories}
          multiple={false}
          fieldName="logTrackCategoryKey"
          onSelectionChange={this.handleSelection} />
        {!!this.state.logTrackCategoryKey &&
          <Choose
            items={logTrackActivities}
            multiple={false}
            fieldName="logTrackActivityKey"
            onSelectionChange={this.handleSelection} />
        }
      </div>
    );
  }
}

export default LogTrackAdd;
