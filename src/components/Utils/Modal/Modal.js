import React from 'react';

import ModalService from './../../../services/modal.service';

import ComponentSafeUpdate from './../../Utils/ComponentSafeUpdate/ComponentSafeUpdate';

import './Modal.scss';

/**
 * Component: Modal
 * Used to confirm / information
 */
class Modal extends ComponentSafeUpdate {

  constructor(props) {
    super(props);
    this.state = Object.assign({
      show: false,

      title: '',
      content: '',
      actions: [],
      callback: null
    });
  }

  componentDidMount = () => {
    super.componentDidMount();
    ModalService.changeListener(this.listen);
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
  };

  shouldComponentUpdate = (_, nextState) => {
    if(this.state.title !== nextState.title) {
      this.setState({title: nextState.title});
    }
    if(this.state.content !== nextState.content) {
      this.setState({content: nextState.content});
    }
    if(this.state.actions !== nextState.actions) {
      this.setState({actions: nextState.actions});
    }
    if(this.state.show !== nextState.show) {
      this.setState({show: nextState.show});
    }
    if(this.state.callback !== nextState.callback) {
      this.setState({callback: nextState.callback});
    }
    return true;
  };

  listen = (title, content, actions, callback) => this.setState({title, content, actions, callback, show: true});

  onAction = value => {
    !!this.state.callback && this.state.callback(value);
    this.setState({show: false});
  };

  /**
   * RENDER
   */
  render() {
    return (
      <div className={'Modal ' + (!!this.state.show ? 'Modal--show' : '')}>
        <div className="Modal-content">
          <h1>{this.state.title}</h1>
          <div>{this.state.content}</div>
          <div className="actions">
            {this.state.actions.map(action =>
              <button key={action.value} value={action.value} onClick={() => this.onAction(action.value)}>{action.content}</button>  
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
