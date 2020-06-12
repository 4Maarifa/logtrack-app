import React from 'react';
import { faFile, faFileWord, faFileExcel, faFileVideo, faFileMusic, faFilePdf, 
faFileChartPie, faFileImage, faFileArchive, faFileCsv, faCube, faFileAlt, faDownload, faEye, faTrash, faEdit } from '@fortawesome/pro-solid-svg-icons';

import FirebaseService from './firebase.service';
import ErrorService from './error.service';
import ModalService from './modal.service';

import Icon from './../components/Utils/Icon/Icon';

import { v4 as uuid } from 'uuid';
    
const PROHIBITED_ACTIONS_DIC = [
    'companyLogos'
];

const PROHIBITED_ACTIONS_FILE = [
    'profile'
];

const QUOTA_FOR_USER = 20000000;

const FileService = {
    getStorageRef: () => FirebaseService.getFirebaseObject().storage().ref(),

    uploadProfilePhoto: file => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/profile').put(file),
    getDownloadURLForProfilePicture: () => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/profile').getDownloadURL(),

    uploadCompanyLogo: file => FileService.getStorageRef().child(FirebaseService.getCurrentUser().uid + '/' + uuid()).put(file),
    getDownloadURLForCompanyLogo: fileRef => FileService.getStorageRef().child(fileRef.metadata.fullPath).getDownloadURL(),

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

    fetchDirectoryContent: (directoryRef, fetchChildren) => new Promise((resolve, reject) => {
        directoryRef.listAll().then(res => {
            const result = res;

            Promise.all([
                Promise.all([ ...result.items.map(itemRef => itemRef.getDownloadURL()) ]),
                Promise.all([ ...result.items.map(itemRef => itemRef.getMetadata()) ])
            ])
                .then(itemProps => {
                    result.items.forEach((item, index) => {
                        item.downloadUrl = itemProps[0][index];
                        item.metadata = itemProps[1][index];
                    });
                    if(!fetchChildren) {
                        resolve(result);
                    }
                    else {
                        Promise.all([...result.prefixes.map(dirRef => FileService.fetchDirectoryContent(dirRef), true)])
                            .then(children => {
                                result.prefixes.forEach((prefix, index) => prefix.children = children[index]);
                                resolve(result);
                            })
                            .catch(err => ErrorService.manageErrorThenReject(err, reject));                            
                    }
                }).catch(err => ErrorService.manageErrorThenReject(err, reject));
        }).catch(err => ErrorService.manageErrorThenReject(err, reject));
    }),

    listFilesForUser: userId => new Promise((resolve, reject) => {
        FileService.fetchDirectoryContent(FileService.getStorageRef().child(`/${userId}`), true)
            .then(res => {
                resolve({
                    name: 'Root',
                    children: res
                });
            })
            .catch(err => ErrorService.manageErrorThenReject(err, reject));
    }),

    getReadableSize: size => {
        if (size === 0) { return "0.00 B"; }
        var e = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B';
    },

    getQuotaForUser: tree => {
        let size = 0;
        if(tree.children && tree.children.prefixes) {
            size += tree.children.prefixes.map(dic => FileService.getQuotaForUser(dic)).reduce((a, b) => a + b, 0);
        }

        if(tree.children && tree.children.items) {
            size += tree.children.items.map(file => file.metadata.size).reduce((a, b) => a + b, 0);
        }
        return size;
    },

    getQuotaPercentage: tree => {
        const QUOTA_SIZE = FileService.getQuotaForUser(tree);
        return (QUOTA_SIZE / QUOTA_FOR_USER) * 100;
    },

    getActionsForFile: (file, edit) => {
        const FILE_DETAILS = FileService.getDetailsForFile(file);

        const ACTIONS = [
            { title: 'Download', icon: <Icon source="fa" icon={faDownload} />, pureLink: file.downloadUrl }
        ];
        if(FILE_DETAILS.render) {
            ACTIONS.push({ title: 'View', icon: <Icon source="fa" icon={faEye} />, callback: () => ModalService.showModal(file.name, FILE_DETAILS.render(file), { actions: [] }) });
        }

        const FULL_PATH = file.fullPath;
        if(edit && !PROHIBITED_ACTIONS_FILE.includes(file.name) && !PROHIBITED_ACTIONS_DIC.map(dic => FULL_PATH.includes(dic)).reduce((a, b) => a || b)) {
            ACTIONS.push({ title: 'Rename', icon: <Icon source="fa" icon={faEdit} />, callback: () => console.log('TODO: IMPLEMENT') });
            ACTIONS.push({ title: 'Delete', icon: <Icon source="fa" icon={faTrash} />, callback: () => console.log('TODO: IMPLEMENT') });
        }

        return ACTIONS;
    },

    getActionsForDirectory: (dic, edit) => {
        const ACTIONS = [];

        const FULL_PATH = dic.fullPath;
        if(edit && !PROHIBITED_ACTIONS_DIC.map(dic => FULL_PATH.includes(dic)).reduce((a, b) => a || b)) {
            ACTIONS.push({ title: 'Delete', icon: <Icon source="fa" icon={faTrash} />, callback: () => console.log('TODO: IMPLEMENT') });
        }

        return ACTIONS;
    }
};

export default FileService;
