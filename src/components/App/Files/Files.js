import React, { useState, useEffect, useRef } from 'react';
import { faUpload, faFolder, faFolderPlus } from '@fortawesome/pro-solid-svg-icons';

import FileService, { QUOTA_FOR_USER } from './../../../services/file.service';
import DataService from './../../../services/data.service';

import Loader from './../../Utils/Loader/Loader';
import Icon from './../../Utils/Icon/Icon';
import ActionList from './../../Utils/ActionList/ActionList';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';

import { v4 as uuid } from 'uuid';

import './Files.scss';
import CompletionBar from '../../Utils/CompletionBar/CompletionBar';

const Files = () => {

  const OBSERVER_KEY = uuid();
  const REF_FILE = useRef(null);
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const [personalFiles, setPersonalFiles] = useState(null);
  const [, setStructure] = useState(null);

  const [currentNode, setCurrentNode] = useState(null);

  const [newFolderName, setNewFolderName] = useState('');

  const uploadFiles = () => {
    if(REF_FILE.current.files && REF_FILE.current.files.length) {
      FileService.uploadFiles(REF_FILE.current.files, currentNode);
    }
  };

  const handleCreateFolderForm = e => {
    e.preventDefault();
    FileService.createFolder(currentNode, newFolderName);
  };

  useEffect(() => {
    if(computed.initialized && computed.user) {
      FileService.addObserver((personalFiles, structure) => {
        setPersonalFiles(personalFiles);
        setStructure(structure);
        setNewFolderName('');
      }, OBSERVER_KEY);
    }
  }, [computed.user]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => {
      DataService.computed.unobserveComputedValues(OBSERVER_KEY);
      FileService.removeObserver(OBSERVER_KEY);
    }
  }, []);
  
  if(!computed.initialized) { return null; }

  if(!personalFiles) { return <Loader />; }

  const CURRENT_NODE_FOLDERS = FileService.getFoldersForNode(currentNode);
  const CURRENT_NODE_FILES = FileService.getFilesForNode(currentNode);

  const USER_QUOTA = FileService.getQuota(personalFiles);

  /**
   * RENDER
   */
  const renderFolder = (key, f) => <li key={key} className="Files-folder">
    <span onClick={() => setCurrentNode(key)}>
      <Icon source="fa" icon={faFolder} />
      {f.name}
    </span>
    <ActionList actions={FileService.getActionsForFolder(key)} isFlatten />
  </li>;

  const renderFile = f => {
    const FILE_DETAILS = FileService.getDetailsForFile(f);

    return <li key={f.name} className="Files-file">
      <span>
        <Icon source="fa" icon={FILE_DETAILS.icon} />
        {f.metadata.customMetadata.realName}  
      </span>
      <ActionList actions={FileService.getActionsForFile(f)} isFlatten />
    </li>;
  };

  const renderBreadCrumb = () => {
    let fetchNode = currentNode;
    let breadcrumbParts = [];
    while(!!fetchNode) {
      breadcrumbParts.unshift({ title: FileService._structure[fetchNode].name, node: fetchNode });
      fetchNode = FileService._structure[fetchNode].parent;
    }
    breadcrumbParts.unshift({ title: 'Root', node: null });
    return <ul className="Files-breadcrumb">
      {breadcrumbParts.map(part => 
        <li key={part.node} onClick={() => setCurrentNode(part.node)} tabIndex="0">
          {part.title}
        </li>)}
    </ul>;
  };

  return (
    <div className="Files">
      <h1>Your Files</h1>
      <div className="Files-quota">
        <CompletionBar title="Personal Quota"
                      details={`${USER_QUOTA.totalReadableSize} / ${USER_QUOTA.authorizedReadableQuota}`}
                      percentage={USER_QUOTA.percentageUsed} />
      </div>
      <div className="Files-content">
        <div className="Files-menu">
          {renderBreadCrumb()}
          <div className="Files-menu-part">
            <form onSubmit={handleCreateFolderForm}>
              <FormInput
                value={newFolderName}
                onValueChange={setNewFolderName}
                noValidation
                inputRequired
                label={<span>Folder name</span>} />
              <button>
                <Icon source="fa" icon={faFolderPlus} />
              </button>
            </form>
            <input type="file" id="uploadFiles" multiple onChange={uploadFiles} ref={REF_FILE} />
            {!QUOTA_FOR_USER.exceeded ? <label className="button" htmlFor="uploadFiles">
              <Icon source="fa" icon={faUpload} />
              Upload Files
            </label> : null}
          </div>
        </div>
        <ul className="Files-list">
          {Object.keys(CURRENT_NODE_FOLDERS).map(folderKey => renderFolder(folderKey, CURRENT_NODE_FOLDERS[folderKey]))}
          {CURRENT_NODE_FILES.map(renderFile)}
          {!Object.keys(CURRENT_NODE_FOLDERS).length && !CURRENT_NODE_FILES.length ? <li>No items here</li> : null}
        </ul>
      </div>
    </div>
  );
};

export default Files;
