
const ModalService = {
  _listener: null,
  _currentCallback: null,
  changeListener: newListener => ModalService._listener = newListener,

  showModal: (title, content, options, callback) => {
    ModalService._listener && ModalService._listener(title, content, options);
    ModalService._currentCallback = callback;
  },
  triggerCallback: value => ModalService._currentCallback && ModalService._currentCallback(value)
};

export default ModalService;
