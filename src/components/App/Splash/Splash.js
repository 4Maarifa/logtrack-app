import React from 'react';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import gaugeImg from './../../../assets/backgrounds/gauge.png';
import conveyorBeltImg from './../../../assets/backgrounds/converyor_belt.png';
import satelliteImg from './../../../assets/backgrounds/satellite.png';

import './Splash.scss';

class Splash extends ComponentSafeUpdate {

  constructor(props) {
    super(props);
    this.state = {
      category: null
    };
  }

  componentDidMount = () => {
    super.componentDidMount();
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  selectCategory = category => this.setState({category: (this.state.category === category ? null : category)});

  render() {
    const topSelectItems = {
      ANALYZE: {
        name: 'Analyze',
        image: gaugeImg
      },
      FOLLOW: {
        name: 'Follow',
        image: satelliteImg
      },
      TRACK: {
        name: 'Track',
        image: conveyorBeltImg
      },
      RECRUIT: {
        name: 'Recruit',
        image: gaugeImg
      },
      MANAGE: {
        name: 'Manage',
        image: gaugeImg
      },
      DEAL: {
        name: 'Deal',
        image: gaugeImg
      },
      MAINTAIN: {
        name: 'Maintain',
        image: gaugeImg
      },
      REPAIR: {
        name: 'Repair',
        image: gaugeImg
      },
      INSURE: {
        name: 'Insure',
        image: gaugeImg
      },
      COUNT: {
        name: 'Count',
        image: gaugeImg
      },
      DISCUSS: {
        name: 'Discuss',
        image: gaugeImg
      },
      ALERT: {
        name: 'Alert',
        image: gaugeImg
      }
    };

    return (
      <div className="Splash">
        <div className="top-select">
          {Object.entries(topSelectItems).map(([key, val]) => 
            <div key={key} className={'top-select-item ' + (this.state.category === key ? 'top-select-item--active' : '')} onClick={() => this.selectCategory(key)}>
              <img src={val.image} alt="" />
              <h2>{val.name}</h2>
            </div>)}
        </div>
        <div className="screen">
          
        </div>
      </div>
    );
  }
}

export default Splash;
