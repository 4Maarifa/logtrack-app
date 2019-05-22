import FirebaseService from './firebase.service';

const uuidv4 = require('uuid/v4');

const FileService = {
    getStorageRef: () => {
        return FirebaseService.getFirebaseObject().storage().ref();
    },

    uploadProfilePhoto: file => {
        const userId = FirebaseService.getCurrentUser().uid;
        return FileService.getStorageRef().child(userId + '/profile').put(file);
    },
    getDownloadURLForProfilePicture: () => {
        const userId = FirebaseService.getCurrentUser().uid;
        return FileService.getStorageRef().child(userId + '/profile').getDownloadURL();
    },

    uploadCompanyLogo: (file) => {
        const userId = FirebaseService.getCurrentUser().uid;
        return FileService.getStorageRef().child(userId + '/' + uuidv4()).put(file);
    },
    getDownloadURLForCompanyLogo: (fileRef) => {
        return FileService.getStorageRef().child(fileRef.metadata.fullPath).getDownloadURL();
    }
};

export default FileService;
