import FirebaseService from './firebase.service';

const uuidv4 = require('uuid/v4');

const FileService = {
    getStorageRef: () => FirebaseService.getFirebaseObject().storage().ref(),

    uploadProfilePhoto: file => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/profile').put(file),

    getDownloadURLForProfilePicture: () => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/profile').getDownloadURL(),

    uploadCompanyLogo: file => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/' + uuidv4()).put(file),

    getDownloadURLForCompanyLogo: fileRef => FileService.getStorageRef().child(fileRef.metadata.fullPath).getDownloadURL()
};

export default FileService;
