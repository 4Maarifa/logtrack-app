import React, { Fragment } from 'react';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { faPuzzlePiece, faExchangeAlt } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../../Utils/Icon/Icon';
import ActionLink from './../../../Utils/ActionLink/ActionLink';

const DevDocRootTab = () => {
  
  return <div className="DevDocRootTab">
    <div className="root-head">Welcome to the Dev Documentation!</div>
    <ActionLink content={<Fragment>
      <Icon source="custom" icon="LogTrack" />
      <div>
        <h3>Identity</h3>
        <Icon source="fa" icon={faArrowRight} />
      </div>
    </Fragment>} url={'?tab=identity'} className="root-identity" />
    <ActionLink content={<Fragment>
      <Icon source="fa" icon={faPuzzlePiece} />
      <div>
        <h3>Components</h3>
        <Icon source="fa" icon={faArrowRight} />
      </div>
    </Fragment>} url={'?tab=components'} className="root-components" />
    <ActionLink content={<Fragment>
      <Icon source="fa" icon={faExchangeAlt} />
      <div>
        <h3>Services</h3>
        <Icon source="fa" icon={faArrowRight} />
      </div>
    </Fragment>} url={'?tab=services'} className="root-services" />
  </div>;
}

export default DevDocRootTab;
