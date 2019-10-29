import { Component } from 'react';

class ComponentSafeUpdate extends Component {

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setState = (obj, callback) => {
    !!this._isMounted && super.setState(obj, callback);
  }
}

export default ComponentSafeUpdate;
