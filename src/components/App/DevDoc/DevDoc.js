import React from 'react';
import { Link } from 'react-router-dom';
import { faHome, faShapes, faExchange } from '@fortawesome/pro-light-svg-icons';
import { faHome as faHomeSolid, faShapes as faShapesSolid, faExchange as faExchangeSolid,
        faExternalLink } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../Utils/Icon/Icon';
import Tabs from './../../Utils/Tabs/Tabs';

import DevDocRootTab from './tabs/DevDocRootTab';
import DevDocIdentityTab from './tabs/DevDocIdentityTab.js';
import DevDocComponentsTab from './tabs/DevDocComponentsTab';
import DevDocServicesTab from './tabs/DevDocServicesTab';

import './DevDoc.scss';

const DevDoc = () => {

  return <div className="DevDoc">
    <h1>Dev Documentation</h1>

    <Tabs default="root" isHorizontalLayout tabs={{
      root: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faHomeSolid : faHome} />
          <span>Home</span>
        </span>,
        content: () => <DevDocRootTab />
      },
      identity: {
        name: () => <span>
          <Icon source="custom" icon="LogTrack" />
          <span>Identity</span>
        </span>,
        content: () => <DevDocIdentityTab />
      },
      components: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faShapesSolid : faShapes} />
          <span>Components</span>
        </span>,
        content: () => <DevDocComponentsTab />
      },
      services: {
        name: ({ isActive }) => <span>
          <Icon source="fa" containerclassname="rotate-90" icon={isActive ? faExchangeSolid : faExchange} />
          <span>Services</span>
        </span>,
        content: () => <DevDocServicesTab />
      },
      clearfix: {
        clearfix: true
      },
      goToApp: {
        name: ({ isActive }) => <Link className={isActive ? '' : 'whiteLink'} to={'/'} target="_blank">
          <Icon source="fa" icon={faExternalLink} />
          <span>Go to app</span>
        </Link>,
        content: () => <span>
          If the redirection didn't work, <a target="_blank" href="/">click here</a>.
        </span>
      }
    }} />
  </div>
};

export default DevDoc;
