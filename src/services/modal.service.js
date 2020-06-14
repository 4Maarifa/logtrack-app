
export const MODAL_EVENT_TYPES = {
  NEW_MODAL: 'NEW_MODAL',
  RERENDER: 'RERENDER'
};

const ModalService = {
  _listener: null,
  _currentCallback: null,
  changeListener: newListener => ModalService._listener = newListener,

  showModal: (title, content, options, callback) => {
    ModalService._listener && ModalService._listener(MODAL_EVENT_TYPES.NEW_MODAL, { title, content, options });
    ModalService._currentCallback = callback;
  },
  rerender: () => {
    ModalService._listener && ModalService._listener(MODAL_EVENT_TYPES.RERENDER, {});
  },
  triggerCallback: value => ModalService._currentCallback && ModalService._currentCallback(value)
};

export default ModalService;
