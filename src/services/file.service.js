import React from 'react';
import { faFile, faFileWord, faFileExcel, faFileVideo, faFileMusic, faFilePdf, faFileChartPie, 
    faFileImage, faFileArchive, faFileCsv, faCube, faFileAlt, faDownload, faEye, faTrash, faCog } from '@fortawesome/pro-light-svg-icons';

import FirebaseService from './firebase.service';
import ErrorService from './error.service';
import DataService from './data.service';
import ModalService from './modal.service';

import Icon from './../components/Utils/Icon/Icon';

import { v4 as uuid } from 'uuid';
import ObserverService from './observer.service';

// number of bits authorized for the personal files of each user
export const QUOTA_FOR_USER = 20971520;

/**
 * Service: FileService
 * manage files along with Firebase storage
 * 
 * All personal files are stored in /uid/personal
 * Their name are changed into unique identifiers
 * Their real name are stored into their metadata key called 'realName'
 * 
 * The structure and folders of personal files are stored into the metadata key 'structure' of the /uid/structure file
 * This metadata is an object. Each property of this object is a folder: folderId: { name: string, parent: string }
 * If the parent is null, it means that the folder is at root
 * 
 * Each personal file has a folder key in their metadata that is their folder
 */
const FileService = {

    // List of personal files
    _personalFiles: [],

    // structure of personal files
    _structure: {},

    // Get the Firebase Storage reference
    getStorageRef: () => FirebaseService.getFirebaseObject().storage().ref(),

    // Upload the profile picture into the current user space
    uploadProfilePhoto: file => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/profile').put(file),

    // get the file URL of the current user profile picture
    getDownloadURLForProfilePicture: () => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/profile').getDownloadURL(),

    // upload a company logo into the user space
    uploadCompanyLogo: file => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/' + uuid()).put(file),

    // get the file url of the file ref
    getDownloadURLForCompanyLogo: fileRef => FileService.getStorageRef().child(fileRef.metadata.fullPath).getDownloadURL(),
    
    // Get all personal files
    getPersonalFiles: () => new Promise((resolve, reject) => {

        // First, list all files into the personal space
        FileService.getStorageRef().child(`/${DataService.computed.user.uid}/personal`).listAll()
            .then(children => {

                // for each file, get the metadata as well as the downloable url
                Promise.all([
                    Promise.all(children.items.map(file => file.getMetadata())),
                    Promise.all(children.items.map(file => file.getDownloadURL()))
                ]).then(results => {

                    // If the metadata folder key is not present, add it (for each file as the root)
                    results[0].forEach(metadata => {
                        if(!metadata.customMetadata.folder) {
                            metadata.customMetadata.folder = null;
                        }
                    });

                    // for each file, set the corresponding metadata and download url
                    children.items.forEach((file, index) => {
                        file.metadata = results[0][index];
                        file.downloadUrl = results[1][index];
                    });

                    // resolve with all the files
                    resolve(children.items);
                }).catch(err => ErrorService.manageErrorThenReject(err, reject));
            }).catch(err => ErrorService.manageErrorThenReject(err, reject));
    }),

    // Get all the file structure of the personal space
    getStructure: () => new Promise((resolve, reject) => {

        // Build the file ref to the structure file
        const STRUCTURE_FILE_REF = FileService.getStorageRef().child(`${DataService.computed.user.uid}/structure`);

        // get the metadata of the structure file, then parse the structure
        STRUCTURE_FILE_REF.getMetadata()
            .then(metadata => resolve(JSON.parse(metadata.customMetadata.structure)))
            .catch(err => {
                // If no structure file is present, build the structure file, and resolve with an empty structure
                STRUCTURE_FILE_REF.put(new Blob([]))
                    .then(() => resolve({}));
            });
    }),

    // Update the metadata of the structure file
    updateStructure: (newStructure, isNotify = true) => {

        // update the metadata with the new structure, then notify for changes
        return FileService.getStorageRef().child(`${DataService.computed.user.uid}/structure`).updateMetadata({
            customMetadata: { structure: JSON.stringify(newStructure) }
        }).then(() => {
            // Notify only if requested
            if (isNotify) {
                FileService.notifyChanges();
            }
        })
        .catch(ErrorService.manageError);
    },

    // get all files that are direct childs of a folder
    // For this, filter the personal files which have the node as the parent folder
    getFilesForNode: node => FileService._personalFiles.filter(f => f.metadata.customMetadata && f.metadata.customMetadata.folder === node),

    // Update file
    // file: File | the new content
    // node: string | the parent folder
    // isNotify: boolean | tells to notify for changes. useful when modifying a list of files: just notify at the end and not each time
    uploadFile: (file, node, isNotify = true) => {
        return new Promise((resolve, reject) => {

            // build the file reference
            const FILE_REF = FileService.getStorageRef().child(`/${DataService.computed.user.uid}/personal/${uuid()}`);

            // Put the new content
            FILE_REF.put(file)
                .then(() => {

                    // update the metadata with the real name and parent folder
                    FILE_REF.updateMetadata({ customMetadata: {
                        realName: file.name,
                        folder: node
                    } })
                    .then(() => {
                        if(isNotify) {
                            // If isNotify, notify for changes
                            FileService.notifyChanges();
                        }
                        resolve();
                    })
                    .catch(err => ErrorService.manageErrorThenReject(err, reject));
                })
                .catch(err => ErrorService.manageErrorThenReject(err, reject));
        });
    },

    // Create an ObjectURL from the file, and get the image dimesions from the Image API
    getImageDimensions: file => {
        const IMG_URL = URL.createObjectURL(file);
        const IMG_COMPONENT = new Image();

        return new Promise(resolve => {
            IMG_COMPONENT.onload = function() {
                resolve({
                    width: IMG_COMPONENT.width,
                    height: IMG_COMPONENT.height
                });
                URL.revokeObjectURL(IMG_COMPONENT.src);
            };
            
            IMG_COMPONENT.src = IMG_URL;
        });
    },

    // Upload multiple files
    // For this, call uploadFile for each file with the ask to not notofy. Once done, notify only once for changes
    uploadFiles: (files, node) => Promise.all(Array.from(files).map(file => FileService.uploadFile(file, node, false))).then(FileService.notifyChanges),

    // rename a file
    // file: File | File as firebase storage defined it
    // newName: string | new name of the file
    renameFile: (file, newName) => {

        // build the new metadata from the saved metadata
        let NEW_METADATA = FileService._personalFiles.filter(pFile => pFile.name === file.name).metadata;

        // update the name of the file
        NEW_METADATA.customMetadata.realName = newName;

        // update the metadata, then notify for changes
        return FileService.getStorageRef().child(`${DataService.computed.user.uid}/personal/${file.name}`)
            .setCustomMetadata(NEW_METADATA)
            .then(FileService.notifyChanges);
    },

    // get possible actions for a certain file
    getActionsForFile: file => {

        // get file details
        const FILE_DETAILS = FileService.getDetailsForFile(file);

        // build the actions
        const ACTIONS = [
            { title: 'Download', icon: <Icon source="fa" icon={faDownload} />, pureLink: file.downloadUrl }
        ];

        // If it is possible to render the file, add the view action
        if(FILE_DETAILS.render) {
            ACTIONS.push({ 
                title: 'View',
                icon: <Icon source="fa" icon={faEye} />,
                callback: () => ModalService.showModal(file.metadata.customMetadata.realName, FILE_DETAILS.render(file), { actions: [] }) });
        }

        // add the delete action at the end
        ACTIONS.push({ title: 'Delete', icon: <Icon source="fa" icon={faTrash} />, callback: () => FileService.deleteFile(file) });

        return ACTIONS;
    },

    // delete a file
    // file: File | file as firebase storage defines it
    // isNotify: boolean | set it to false when doing bulk operation to not notify for changes at each deletion. don't forget to notify for changes when finished
    // build the file reference and ask for deletion
    deleteFile: (file, isNotify = true) => 
        FileService.getStorageRef().child(`${DataService.computed.user.uid}/personal/${file.name}`)
            .delete()
            .then(() => {
                if(isNotify) { 
                    FileService.notifyChanges();
                }
            }),

    // get direct child folders of a node
    getFoldersForNode: node => {

        // build the result object
        const RESULT = {};

        // filter keys that have the passed node as a parent
        // then add the key with corresponding data into the result
        Object.keys(FileService._structure)
            .filter(folderKey => FileService._structure[folderKey].parent === node)
            .forEach(folderKey => RESULT[folderKey] = FileService._structure[folderKey]);

        return RESULT;
    },

    // create a child folder at the parent node
    // parent: string | key of the parent folder
    // name: string | name of the new folder
    createFolder: (parent, name) => {

        // get the current structure
        const NEW_STRUCTURE = FileService._structure || {};

        // create a new folder key
        const FOLDER_KEY = uuid();

        // build the new structure, with the chosen name and parent node
        NEW_STRUCTURE[FOLDER_KEY] = { name, parent };

        // then, ask to update the structure (that will notify changes when finished)
        return FileService.updateStructure(NEW_STRUCTURE);
    },
    
    // rename the folder
    // folderKey: string | folder to rename
    // newName: string | new name of the folder
    renameFolder: (folderKey, newName) => {

        // get current structure
        let NEW_STRUCTURE = FileService._structure || {};

        // set the name of the folder
        NEW_STRUCTURE[folderKey].name = newName;

        // Then, ask the sturcture to be refreshed, that will trigger the notify changes function
        return FileService.updateStructure(NEW_STRUCTURE);
    },

    // get possible actions for the specified folder
    getActionsForFolder: folderKey => {

        // build the actions array
        const ACTIONS = [
            { title: 'Delete', icon: <Icon source="fa" icon={faTrash} />, callback: () => FileService.deleteFolder(folderKey) }
        ];

        return ACTIONS;
    },

    // delete a folder, with all child folders and files
    deleteFolder: (folderKey, isInitial = true) => {
        return new Promise((resolve, reject) => {

            // launch deletion for child folders and child files
            Promise.all([
                // get and delete all child folders
                ...Object.keys(FileService.getFoldersForNode(folderKey)).map(folderKey => FileService.deleteFolder(folderKey, false)),

                // get and delete all child files
                ...FileService.getFilesForNode(folderKey).map(FileService.deleteFile)
            ]).then(() => {

                // get the current structure
                const NEW_STRUCTURE = FileService._structure;

                // remove the current folder
                NEW_STRUCTURE[folderKey] = null;
                delete NEW_STRUCTURE[folderKey];

                // update the structure, with the ask to not notify (if we are a child folder, 
                // it does not make sense to notify for changes, as deletion may not be finished yet for other folders)
                FileService.updateStructure(NEW_STRUCTURE, false)
                    .then(() => {
                        if(isInitial) {
                            // if it is the parent folder of all deletion, notify for changes
                            FileService.notifyChanges();
                        }
                        resolve();
                    }).catch(err => ErrorService.manageErrorThenReject(err, reject));
            }).catch(err => ErrorService.manageErrorThenReject(err, reject));
        });
    },

    // Compute the used quota of the personal space that is occupied by the passed file list
    getQuota: files => {

        // get the total size of the file list
        const TOTAL_SIZE = files.map(f => f.metadata.size).reduce((a, b) => a + b, 0);

        // returned advanced stats about the quota
        return {
            totalSize: TOTAL_SIZE,
            authorizedQuota: QUOTA_FOR_USER,
            totalReadableSize: FileService.getReadableSize(TOTAL_SIZE),
            authorizedReadableQuota: FileService.getReadableSize(QUOTA_FOR_USER),
            percentageUsed: Math.floor((TOTAL_SIZE / QUOTA_FOR_USER) * 100),
            exceeded: TOTAL_SIZE > QUOTA_FOR_USER
        };
    },

    // get details about a file
    getDetailsForFile: file => {

        // get the mime/type or content/type of the file
        const NEW_MIME_TYPE = file.metadata.contentType.toLowerCase();

        // returning details about the file content type
        // Returning { icon: FA/IconReference | file icon, type: string | printable document type, isOk: boolean | if it's a safe type | render: function | render the file content }
        switch(NEW_MIME_TYPE) {
            case 'doc': case 'docs':
            case 'application/msword': case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return { icon: faFileWord, type: 'Word Document', isOk: true, render: null };
            case 'xls': case 'xlsx':
            case 'application/vnd.ms-excel': case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return { icon: faFileExcel, type: 'Excel Document', isOk: true, render: null };
            case 'mp4': case 'avi': case 'mpeg4': case 'mpeg': case 'mpeg-4': case 'wmv':
            case 'video/mp4': case 'video/mpeg': case 'video/x-ms-wmv': case 'video/ms-wmv': case 'video/x-msvideo': case 'video/msvideo':
                return { icon: faFileVideo, type: 'Video', isOk: true, render: file => <video controls>
                    <source src={file.downloadUrl} type={NEW_MIME_TYPE} />
                </video> };
            case 'mp3': case 'wav':
            case 'audio/mpeg': case 'audio/wave': case 'audio/wav': case 'audio/mpeg3':
                return { icon: faFileMusic, type: 'Music', isOk: true, render: file => <audio controls>
                    <source src={file.downloadUrl} type={NEW_MIME_TYPE} />
                </audio> };
            case 'pdf':
            case 'application/pdf':
                return { icon: faFilePdf, type: 'PDF', isOk: true, render: null };
            case 'ppt': case 'pptx':
            case 'application/vnd.ms-powerpoint': case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                return { icon: faFileChartPie, type: 'Powerpoint Document', isOk: true, render: null };
            case 'jpg': case 'jpeg': case 'png': case 'svg': case 'bmp': case 'gif': case 'webp':
            case 'img/jpg': case 'img/jpeg': case 'img/png': case 'img/svg+xml': case 'img/svg':
            case 'image/jpg': case 'image/jpeg': case 'image/png': case 'image/svg+xml': case 'image/svg':
            case 'image/bmp': case 'image/gif': case 'image/webp':
                return { icon: faFileImage, type: 'Image', isOk: true, render: file => <img alt={file.name} src={file.downloadUrl} />};
            case 'zip': case 'rar':
            case 'application/zip': case 'application/vnd.rar':
                return { icon: faFileArchive, type: 'Archive', isOk: true, render: null };
            case 'csv':
            case 'plain/csv':
                return { icon: faFileCsv, type: 'CSV', isOk: true, render: null };
            case 'stl': case 'obj': case 'fbx': case 'collada': case '3ds': 
            case 'iges': case 'step': case 'vrml': case 'x3d': case 'dae': 
            case 'dxf': case 'dwg': case 'skp': case '3mf': case 'ply':
            case 'model/3mf': case 'application/acad': case 'image/vnd.dwg': case 'image/x-dwg':
            case 'application/dxf': case 'application/sla': case 'application/vnd.ms-pki.stl':
                return { icon: faCube, type: '3D Model', isOk: true, render: null };
            case 'txt': case 'xml': case 'json':
            case 'application/json': case 'plain/txt': case 'text/plain': case 'application/xml': case 'text/xml':
                return { icon: faFileAlt, type: 'Text', isOk: true, render: null };
            case 'exe':
            case 'application/octet-stream':
                return { icon: faCog, type: 'Application', isOk: false, render: null };
            default:
                return { icon: faFile, type: 'Unknown', isOk: false, render: null };
        }
    },

    // Get human readable size
    getReadableSize: size => {

        // if size is 0, return
        if(size === 0) { return '0 B'; }

        // compute the real size, dividing by 1024
        let e = Math.floor(Math.log(size) / Math.log(1024));

        // return the size
        return (size / Math.pow(1024, e)).toFixed(0) + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][e];
    }
};

ObserverService.initialize(FileService, 'FILES', {
    startWatcher: ({ notifyChanges }) => notifyChanges(),
    computeChanges: () => Promise.all([
        FileService.getPersonalFiles().then(personalFiles => FileService._personalFiles = personalFiles),
        FileService.getStructure().then(structure => FileService._structure = structure)
    ]),
    getData: () => ({ personalFiles: FileService._personalFiles, structure: FileService._structure })
});

export default FileService;
