import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
    hideDuration: 300
};

const ErrorService = {
    error: (message, title) => {
        toastr.error(message, title);
    },
    info: (message, title) => {
        toastr.info(message, title);
    },
    success: (message, title) => {
        toastr.success(message, title);
    },
    warning: (message, title) => {
        toastr.warning(message, title);
    },
    clear: () => {
        toastr.clear();
    },

    manageError: error => {
        console.error(error);

        if(error && error.hasOwnProperty('code')) {
            let errorMessage = '';
            switch(error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'Sign in failed. Please retry.';
                    break;
                case 'auth/passwords-not-match':
                    errorMessage = 'The two passwords don\'ont match';
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
                    errorMessage = 'An unknown error occured. Please contact the administrator providing details.';
                    break;
            }
            ErrorService.error(errorMessage);
        }
        else {
            ErrorService.error(error);
        }
    },
    manageErrorThenReject: (e, reject) => {
        ErrorService.manageError(e);
        reject(e);
    },
    manageErrorThenPromiseRejection: e => {
        ErrorService.manageError(e);
        return Promise.reject(e);
    }
};

export default ErrorService;
