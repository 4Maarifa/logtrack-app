import FirebaseService from './firebase.service';

import { v4 as uuid } from 'uuid';

const FileService = {
    getStorageRef: () => FirebaseService.getFirebaseObject().storage().ref(),

    uploadProfilePhoto: file => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/profile').put(file),

    getDownloadURLForProfilePicture: () => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/profile').getDownloadURL(),

    uploadCompanyLogo: file => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/' + uuid()).put(file),

    getDownloadURLForCompanyLogo: fileRef => FileService.getStorageRef().child(fileRef.metadata.fullPath).getDownloadURL()
};

export default FileService;
