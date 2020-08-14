import toastr from 'toastr';

import 'toastr/build/toastr.min.css';

// Toastr options overwrite
toastr.options = {
    hideDuration: 300
};

/**
 * Service: ErrorService
 * Used to notify the user about success and errors
 */
const ErrorService = {

    // error trigger
    error: (message, title) => {
        toastr.error(message, title);
    },

    // info trigger
    info: (message, title) => {
        toastr.info(message, title);
    },

    // success trigger
    success: (message, title) => {
        toastr.success(message, title);
    },

    // warning trigger
    warning: (message, title) => {
        toastr.warning(message, title);
    },

    // clear all current alerts
    clear: () => {
        toastr.clear();
    },

    // manage an error
    // If the error code is known, it will trigger a user-friendly corresponding message.
    // Otherwise, it will trigger a generic user-friendly message.
    // It will always console the error
    manageError: error => {
        console.error(error);

        if(error && error.hasOwnProperty('code')) {
            let errorMessage = '';

            // If the error code is known, set the error Message
            switch(error.code) {
                case 3:
                    errorMessage = 'There was a problem getting your location.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'Sign in failed. Please retry.';
                    break;
                case 'auth/passwords-not-match':
                    errorMessage = 'The two passwords don\'t match';
                    break;
                case 'auth/expired-action-code':
                    errorMessage = 'Your reset code has expired';
                    break;
                case 'auth/invalid-action-code':
                    errorMessage = 'Your reset code is invalid';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Your password is not strong enough';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Wrong password';
                    break;
                case 'form/missing-fields':
                    errorMessage = 'Please enter details in fields : ' + error.details.join(', ');
                    break;
                case 'entity/missing-fields':
                    errorMessage = 'Entity is missing fields : ' + error.details.join(', ');
                    break;
                case 'entity/prototype-not-match':
                    errorMessage = 'Entity must be of prototype : ' + error.details;
                    break;
                case 'entity/creator-not-match':
                    errorMessage = 'Creator must be you when creating / updating : ' + error.details;
                    break;
                case 'entity/not-found':
                    errorMessage = 'Can\'t found entity ' + error.details;
                    break;
                case 'entity/right':
                    errorMessage = 'You don\'t have the right for this : ' + error.details;
                    break;
                case 'auth/email-already-in-use':
                    errorMessage = 'An account already exists with this email address. Please sign in, or change your password if you forgot it.';
                    break;
                default :
                    // if the error code is not known, set a generic error message
                    errorMessage = 'An unknown error occured. Please contact the administrator providing details.';
                    break;
            }

            // Trigger the error
            ErrorService.error(errorMessage);
        }
        else {
            // if the error has no code, it means it's not managed yet. Print it like it arrived.
            ErrorService.error(error);
        }
    },

    // Manage the error, then call the reject function with the error
    manageErrorThenReject: (e, reject) => {
        ErrorService.manageError(e);
        reject(e);
    },

    // Manage the error, then return a rejection with the error
    manageErrorThenPromiseRejection: e => {
        ErrorService.manageError(e);
        return Promise.reject(e);
    }
};

export default ErrorService;
