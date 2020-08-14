
// Type of event interactions between the ModalService and the Modal Component
// NEW_MODAL: replace the content of the current modal, and show it
// RERENDER: some data has changed, re render the modal content
export const MODAL_EVENT_TYPES = {
  NEW_MODAL: 'NEW_MODAL',
  RERENDER: 'RERENDER'
};

/**
 * Service: ModalService
 * Permits to launch, refresh, and get results from a modal
 */
const ModalService = {

  // Modal listener, from the Modal component
  _listener: null,

  // Save the current callback here
  _currentCallback: null,

  // Function called by the Modal Component to be registered
  // Only one modal can be registered at a time
  // It means you don't have to register a Modal Component, it is already registered by Navigation
  // Just launch a new modal calling showModal, this function is not for you
  changeListener: newListener => ModalService._listener = newListener,

  // Show a modal, with specific title, content and options
  showModal: (title, content, options, callback) => {

    // If a modal is registered, call its callback with new data to be printed
    ModalService._listener && ModalService._listener(MODAL_EVENT_TYPES.NEW_MODAL, { title, content, options });

    // save the callback here
    ModalService._currentCallback = callback;
  },

  // Ask for a modal rerender
  rerender: () => {

    // If a modal is registered, transfer the request
    ModalService._listener && ModalService._listener(MODAL_EVENT_TYPES.RERENDER, {});
  },

  // Trigger a modal callback. This will call the current callback with the action value
  triggerCallback: value => ModalService._currentCallback && ModalService._currentCallback(value)
};

export default ModalService;
