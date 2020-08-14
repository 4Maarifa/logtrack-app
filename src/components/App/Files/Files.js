import React, { useState, useEffect, useRef } from 'react';
import { faUpload, faFolder, faFolderPlus } from '@fortawesome/pro-light-svg-icons';

import FileService, { QUOTA_FOR_USER } from './../../../services/file.service';
import DataService from './../../../services/data.service';

import Loader from './../../Utils/Loader/Loader';
import Icon from './../../Utils/Icon/Icon';
import ActionList from './../../Utils/ActionList/ActionList';
import FormInput from './../../Utils/FormElements/FormInput/FormInput';
import CompletionBar from './../../Utils/CompletionBar/CompletionBar';

import { v4 as uuid } from 'uuid';

import './Files.scss';

/**
 * Component: Files
 * Used by everyone to access their personal files
 * 
 * Folders (structure) are stored in the metadata in Storage/employeeId/structure file (structure key)
 * The sturcutre is an object : { folderUuid: { name: string, parent: string (other folder id, null if parent is root) } }
 * 
 * Personal files are stored in Storage/employeeId/personal
 * Each file name is a uuid (unique identifier)
 * The real file name is saved in the metadata (realName key)
 * Parent folder is also saved in the metadata (folder key). If it's null, then folder is at root
 */
const Files = () => {

  const OBSERVER_KEY = uuid();
  // Reference on the input files that permits to upload documents
  const REF_FILE = useRef(null);
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // Personal files
  const [personalFiles, setPersonalFiles] = useState(null);
  // Structure of personal files
  const [, setStructure] = useState(null);

  // Current directory (null means root)
  const [currentNode, setCurrentNode] = useState(null);

  // Value of the new folder name
  const [newFolderName, setNewFolderName] = useState('');

  // Uploading files from the REF_FILE input
  const uploadFiles = () => {
    if(REF_FILE.current.files && REF_FILE.current.files.length) {
      // Uploading files at the current node
      FileService.uploadFiles(REF_FILE.current.files, currentNode);
    }
  };

  // Create new folder
  const handleCreateFolderForm = e => {
    e.preventDefault();
    FileService.createFolder(currentNode, newFolderName);
  };

  useEffect(() => {
    if(computed.initialized && computed.user) {

      // Adding an observer. Each time a file is uploaded or a folder created
      FileService.addObserver(({ personalFiles, structure }) => {
        
        // Setting the new files and structure
        setPersonalFiles(personalFiles);
        setStructure(structure);

        // Resetting new folder name input
        setNewFolderName('');
      }, OBSERVER_KEY);
    }
  }, [computed, computed.user]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => {
      DataService.computed.unobserveComputedValues(OBSERVER_KEY);
      FileService.removeObserver(OBSERVER_KEY);
    }
  }, []);
  
  if(!computed.initialized) { return null; }

  if(!personalFiles) { return <Loader />; }

  // Get all child folders for the current node
  const CURRENT_NODE_FOLDERS = FileService.getFoldersForNode(currentNode);
  // Get all child files for the current node
  const CURRENT_NODE_FILES = FileService.getFilesForNode(currentNode);

  // Caomputing Quota for user files
  const USER_QUOTA = FileService.getQuota(personalFiles);

  /**
   * RENDER
   */
  // Rendering a folder, as well as its actions
  const renderFolder = (key, f) => <li key={key} className="Files-folder">
    <span onClick={() => setCurrentNode(key)}>
      <Icon source="fa" icon={faFolder} />
      {f.name}
    </span>
    <ActionList actions={FileService.getActionsForFolder(key)} isFlatten />
  </li>;

  // Rendering a file, as well as its actions
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

  // Render the breadcrumb
  const renderBreadCrumb = () => {
    // Current fetch node
    let fetchNode = currentNode;

    // Parts of the breadcrumb
    let breadcrumbParts = [];

    // While we're not at the root
    while(!!fetchNode) {
      // we push as first item the fetchNode
      breadcrumbParts.unshift({ title: FileService._structure[fetchNode].name, node: fetchNode });
      // then update the fetchNode as its parent
      fetchNode = FileService._structure[fetchNode].parent;
    }

    // Then we push the last part (must be the root as this stage)
    breadcrumbParts.unshift({ title: 'Root', node: null });

    // Render it
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
        {/* Completion bar for the user quota */}
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
