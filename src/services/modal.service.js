
const ModalService = {
  _listener: null,
  changeListener: newListener => ModalService._listener = newListener,

  showModal: (title, content, actions, callback) => {
    ModalService._listener && ModalService._listener(title, content, actions, callback);
  }
};

export default ModalService;
