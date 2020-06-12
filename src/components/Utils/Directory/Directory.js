import React, { Fragment } from 'react';
import { faFolder } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../Icon/Icon';

import './Directory.scss';
import FileService from '../../../services/file.service';
import ActionList from '../ActionList/ActionList';

const Directory = ({ tree }) => {
  
  /**
   * RENDER
   */
  const renderFile = (file, level) => {
    const FILE_DETAILS = FileService.getDetailsForFile(file);
    return <span key={file.name} className="Directory-item Directory-file" style={{paddingLeft: level+'rem'}}>

      <span className="Directory-item-name">
        <Icon source="fa" icon={FILE_DETAILS.icon} />
        {file.name}
      </span>
      <ActionList actions={FileService.getActionsForFile(file, false)} isFlatten />
    </span>;
  };

  const renderDirectory = (dic, level) => <Fragment key={dic.name}>
    <span className="Directory-item Directory-dic" style={{paddingLeft: level+'rem'}}>
      <span className="Directory-item-name">
        <Icon source="fa" icon={faFolder} />
        <span>{dic.name}</span>
      </span>
      <ActionList actions={FileService.getActionsForDirectory(dic, false)} isFlatten />
    </span>
    {dic.children && dic.children.prefixes ? dic.children.prefixes.map(dic => renderDirectory(dic, level + 1)) : null}
    {dic.children && dic.children.items ? dic.children.items.map(file => renderFile(file, level + 1)) : null}

  </Fragment>;

  return <div className="Directory">
    {renderDirectory(tree, 0)}
  </div>;
};


export default Directory;
