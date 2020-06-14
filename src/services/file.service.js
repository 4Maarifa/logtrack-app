import React from 'react';
import { faFile, faFileWord, faFileExcel, faFileVideo, faFileMusic, faFilePdf, 
    faFileChartPie, faFileImage, faFileArchive, faFileCsv, faCube, faFileAlt, faDownload, faEye, faTrash } from '@fortawesome/pro-solid-svg-icons';

import FirebaseService from './firebase.service';
import ErrorService from './error.service';
import DataService from './data.service';
import ModalService from './modal.service';

import Icon from './../components/Utils/Icon/Icon';

import { v4 as uuid } from 'uuid';

export const QUOTA_FOR_USER = 20971520;

const FileService = {

    _observers: {},
    _personalFiles: [],
    _structure: {},
    addObserver: (observerCallback, observerKey) => {
        return new Promise((resolve, reject) => {
            FileService._observers[observerKey] = observerCallback;
            observerCallback(FileService._personalFiles);
            if(FileService._computeObserverNumber() >= 1) {
                FileService.notifyChanges()
                    .then(resolve)
                    .catch(err => ErrorService.manageErrorThenReject(err, reject));
            }
            else {
                resolve(observerKey);
            }
        });
    },
    removeObserver: observerKey => {
        delete FileService._observers[observerKey];
        FileService._observers[observerKey] = null;
    },
    updateObservers: () => Object.values(FileService._observers)
        .forEach(observer => observer && (typeof observer === 'function') && observer(FileService._personalFiles, FileService._structure)),
    notifyChanges: () => {
        if(DataService.computed.user) {
            return Promise.all([
                FileService.getPersonalFiles().then(personalFiles => FileService._personalFiles = personalFiles),
                FileService.getStructure().then(structure => FileService._structure = structure)
            ])
            .then(FileService.updateObservers)
            .catch(ErrorService.manageError);
        }
        return Promise.resolve();
    },
    _computeObserverNumber: () => Object.values(FileService._observers).filter(obs => obs && typeof obs === 'function').length,

    // FUNCTIONS
    getStorageRef: () => FirebaseService.getFirebaseObject().storage().ref(),

    uploadProfilePhoto: file => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/profile').put(file),
    getDownloadURLForProfilePicture: () => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/profile').getDownloadURL(),

    uploadCompanyLogo: file => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/' + uuid()).put(file),
    getDownloadURLForCompanyLogo: fileRef => FileService.getStorageRef().child(fileRef.metadata.fullPath).getDownloadURL(),
    
    getPersonalFiles: () => new Promise((resolve, reject) => {
        FileService.getStorageRef().child(`/${DataService.computed.user.uid}/personal`).listAll()
            .then(children => {
                Promise.all([
                    Promise.all(children.items.map(file => file.getMetadata())),
                    Promise.all(children.items.map(file => file.getDownloadURL()))
                ]).then(results => {
                        results[0].forEach(metadata => {
                            if(!metadata.customMetadata.folder) {
                                metadata.customMetadata.folder = null;
                            }
                        })
                        children.items.forEach((file, index) => {
                            file.metadata = results[0][index];
                            file.downloadUrl = results[1][index];
                        });
                        resolve(children.items);
                    })
                    .catch(err => ErrorService.manageErrorThenReject(err, reject));
            })
            .catch(err => ErrorService.manageErrorThenReject(err, reject));
    }),

    getStructure: () => new Promise((resolve, reject) => {
        const STRUCTURE_FILE_REF = FileService.getStorageRef().child(`${DataService.computed.user.uid}/structure`);
        STRUCTURE_FILE_REF.getMetadata()
            .then(metadata => resolve(JSON.parse(metadata.customMetadata.structure)))
            .catch(err => {
                // Create folder
                STRUCTURE_FILE_REF.put(new Blob([]))
                    .then(() => resolve({}));
            });
    }),

    updateStructure: newStructure => {
        return FileService.getStorageRef().child(`${DataService.computed.user.uid}/structure`).updateMetadata({
            customMetadata: {
                structure: JSON.stringify(newStructure)
            }
        }).then(FileService.notifyChanges)
        .catch(ErrorService.manageError);
    },

    getFilesForNode: node => FileService._personalFiles.filter(f => f.metadata.customMetadata && f.metadata.customMetadata.folder === node),

    uploadFile: (file, node, isNotify = true) => {
        return new Promise((resolve, reject) => {
            const FILE_REF = FileService.getStorageRef().child(`/${DataService.computed.user.uid}/personal/${uuid()}`);
            FILE_REF.put(file)
                .then(() => {
                    FILE_REF.updateMetadata({ customMetadata: {
                        realName: file.name,
                        folder: node
                    } })
                    .then(() => {
                        if(isNotify) {
                            FileService.notifyChanges();
                        }
                        resolve();
                    })
                    .catch(err => ErrorService.manageErrorThenReject(err, reject));
                })
                .catch(err => ErrorService.manageErrorThenReject(err, reject));
        });
    },

    uploadFiles: (files, node) => Promise.all(Array.from(files).map(file => FileService.uploadFile(file, node, false))).then(FileService.notifyChanges),

    renameFile: (file, newName) => {
        let NEW_METADATA = FileService._personalFiles.filter(pFile => pFile.name === file.name).metadata;
        NEW_METADATA.customMetadata.realName = newName;
        return FileService.getStorageRef().child(`${DataService.computed.user.uid}/personal/${file.name}`)
            .setCustomMetadata(NEW_METADATA)
            .then(FileService.notifyChanges);
    },

    getActionsForFile: file => {
        const FILE_DETAILS = FileService.getDetailsForFile(file);
        const ACTIONS = [
            { title: 'Download', icon: <Icon source="fa" icon={faDownload} />, pureLink: file.downloadUrl }
        ];

        if(FILE_DETAILS.render) {
            ACTIONS.push({ 
                title: 'View',
                icon: <Icon source="fa" icon={faEye} />,
                callback: () => ModalService.showModal(file.metadata.customMetadata.realName, FILE_DETAILS.render(file), { actions: [] }) });
        }

        ACTIONS.push({ title: 'Delete', icon: <Icon source="fa" icon={faTrash} />, callback: () => FileService.deleteFile(file) });

        return ACTIONS;
    },

    deleteFile: (file, isNotify = true) => FileService.getStorageRef().child(`${DataService.computed.user.uid}/personal/${file.name}`)
                            .delete()
                            .then(() => {
                                if(isNotify) { 
                                    FileService.notifyChanges();
                                }
                            }),

    getFoldersForNode: node => {
        const RESULT = {};
        Object.keys(FileService._structure)
            .filter(folderKey => FileService._structure[folderKey].parent === node)
            .forEach(folderKey => RESULT[folderKey] = FileService._structure[folderKey]);
        return RESULT;
    },

    createFolder: (parent, name) => {
        const NEW_STRUCTURE = FileService._structure || {};
        const FOLDER_KEY = uuid();
        NEW_STRUCTURE[FOLDER_KEY] = { name, parent };

        return FileService.updateStructure(NEW_STRUCTURE);
    },
    
    renameFolder: (folderKey, newName) => {
        let NEW_STRUCTURE = FileService._structure;
        NEW_STRUCTURE[folderKey].name = newName;

        return FileService.updateStructure(NEW_STRUCTURE);
    },

    getActionsForFolder: folderKey => {
        const ACTIONS = [
            { title: 'Delete', icon: <Icon source="fa" icon={faTrash} />, callback: () => FileService.deleteFolder(folderKey) }
        ];

        return ACTIONS;
    },

    deleteFolder: (folderKey, isInitial = true) => {
        return new Promise((resolve, reject) => {
            Promise.all([
                ...Object.keys(FileService.getFoldersForNode(folderKey)).map(folderKey => FileService.deleteFolder(folderKey, false)),
                ...FileService.getFilesForNode(folderKey).map(FileService.deleteFile)
            ]).then(() => {
                const NEW_STRUCTURE = FileService._structure;
                NEW_STRUCTURE[folderKey] = null;
                delete NEW_STRUCTURE[folderKey];
                FileService.updateStructure(NEW_STRUCTURE)
                    .then(() => {
                        if(isInitial) {
                            FileService.notifyChanges();
                        }
                        resolve();
                    })
                    .catch(err => ErrorService.manageErrorThenReject(err, reject));
            })
            .catch(err => ErrorService.manageErrorThenReject(err, reject));
        });
    },

    getQuota: files => {
        const TOTAL_SIZE = files.map(f => f.metadata.size).reduce((a, b) => a + b, 0);
        return {
            totalSize: TOTAL_SIZE,
            authorizedQuota: QUOTA_FOR_USER,
            totalReadableSize: FileService.getReadableSize(TOTAL_SIZE),
            authorizedReadableQuota: FileService.getReadableSize(QUOTA_FOR_USER),
            percentageUsed: Math.floor((TOTAL_SIZE / QUOTA_FOR_USER) * 100),
            exceeded: TOTAL_SIZE > QUOTA_FOR_USER
        };
    },

    getDetailsForFile: file => {
        const NEW_MIME_TYPE = file.metadata.contentType.toLowerCase();
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
            default:
                return { icon: faFile, type: 'Unknown', isOk: false, render: null };
        }
    },

    getReadableSize: size => {
        if(size === 0) { return '0.00 B'; }
        let e = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B';
    }
};

export default FileService;
