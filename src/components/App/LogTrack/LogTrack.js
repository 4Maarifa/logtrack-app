import React from 'react';
import { faPlus, faMapPin } from '@fortawesome/pro-solid-svg-icons';

import ActionButton from './../../Utils/ActionButton/ActionButton';
import Icon from './../../Utils/Icon/Icon';

import './LogTrack.scss';

const LogTrack = () => {
  return (
    <div className="LogTrack">
      LogTrack
      <ActionButton icon={<Icon source="fa" icon={faPlus} />} actions={[
        {title: 'Add a LogTrack', icon: <Icon source="fa" icon={faMapPin} />, link: `/logtrack-add`}
      ]} />
    </div>
  );
};

export default LogTrack;
