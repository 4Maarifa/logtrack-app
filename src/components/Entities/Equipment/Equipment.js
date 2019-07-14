import React, { Component } from 'react';

import './Equipment.css';

class Equipment extends Component {
  constructor () {
    super();
    this.state = {
      equipment: null,
      brand: null,
      equipmentModel: null
    };
  }

  componentDidMount = () => {
    this.setState({equipment: this.props.equipment, brand: this.props.brand, equipmentModel: this.props.equipmentModel});
  }

  render() {
    if (!this.state.equipment) {
      return (<></>);
    }

    var equipmentKey = Object.keys(this.state.equipment)[0], 
      brandKey = Object.keys(this.state.brand)[0], 
      equipmentModelKey = Object.keys(this.state.equipmentModel)[0];
    
    return (
      <div>
        {this.state.equipment[equipmentKey].identification}<br/>
        <img width="40" height="20" 
          alt={this.state.brand[brandKey].name + '\'s logo'} 
          src={this.state.brand[brandKey].logoUrl} />

        <img width="100" height="100" 
          alt={this.state.equipmentModel[equipmentModelKey].name} 
          src={this.state.equipmentModel[equipmentModelKey].photoUrl} />
        
        {this.state.equipmentModel[equipmentModelKey].name}
      </div>
    );
  }
}

export default Equipment;
