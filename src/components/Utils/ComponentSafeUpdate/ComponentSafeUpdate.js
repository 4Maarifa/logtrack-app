import { Component } from 'react';

class ComponentSafeUpdate extends Component {

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setStateSafe = (obj, callback) => {
    !!this._isMounted && this.setState(obj, callback);
  }
}

export default ComponentSafeUpdate;
