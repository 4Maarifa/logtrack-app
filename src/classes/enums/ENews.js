import React from 'react';
import { faUser, faSuitcase, faAward, faBuilding, faUserTag, faWarehouse, faTruck, faHandshakeAlt, faPortrait, faFolders, faCalendarAlt, faMap, faMapPin, faCog, faDownload, faDebug, faCode, faWrench, faTachometerFastest } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../components/Utils/Icon/Icon';

const ENews = Object.freeze({
  "v0.3.0": {
    name: 'LogTrack v0.3.0',
    content: () => <div>
      <span className="doc-with-icon">
        Welcome to the v0.3.0 of LogTrack!<br/>
        This new version focuses on performance issues and new small functionalities.
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faTachometerFastest} />
        <span>Boosted performance for all equipment models and brands. This permits to load even more equipment models in following updates without provoking heavy loads for new users.</span>
      </span>
    </div>
  },
  "v0.2.0": {
    name: 'LogTrack v0.2.0',
    content: () => <div>
      <span className="doc-with-icon">
        The v0.2.0 version of LogTrack resolves some bugs, and prevent some other bugs to happen.
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faTruck} />
        <span>This version incorporates 573 new equipment models, from 107 brands. Their parts, brand logos, picture and type were also integrated.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faDownload} />
        <span>All dependencies were updated for the best performance and security.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faDebug} />
        <span>Some bugs were resolved, that some flickering on the dashboard.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faTachometerFastest} />
        <span>Boosted performance and reliability of Tabs, Debug.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faWrench} />
        <span>Mechanics have now access to the Maintenance screen.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faCode} />
        <span>The end of the Developer Documentation redaction.</span>
      </span>
    </div>
  },
  "v0.1.0": {
    name: 'LogTrack v0.1.0',
    content: () => <div>
      <span className="doc-with-icon">
        Welcome to the first version of LogTrack... ever!<br/>
        LogTrack aims to help you in your daily life, empowering you with useful and effective tools.
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faUser} />
        <span>Users can now sign up, sign in, sign out. They can change their password when signed in, or request to change their password if lost.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faAward} />
        <span>Users can fill in their certificates and experience for their professional profile, as well as their current status and job search.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faSuitcase} />
        <span>Users can view job offers from companies.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faBuilding} />
        <span>Users can create new companies, as well as giving other roles in that company.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faUserTag} />
        <span>Users can have roles in companies, such as Managers, Recruiters, Mechanics, Drivers, Observers, Operators, Insurers, Accountants and Dispatchers.<br/>They can request roles from companies that may be accepted or declined by managers.<br/>Users can only have one role active at a time.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faWarehouse} />
        <span>Managers can view and create new warehouses. They can inform about warehouse specifications.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faTruck} />
        <span>Managers can create equipments (for the moment, only one equipment model is available).</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faHandshakeAlt} />
        <span>Managers can create and manage contracts. A contract is passed into two companies for a specific job (Transporation or Maintenance).</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faPortrait} />
        <span>Managers and Recruiters can create job offers.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faFolders} />
        <span>Users have their personal file space. A file viewer is available for certain file types.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faCog} />
        <span>Users can view their settings, account details, security and contact support via their profile.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faCalendarAlt} />
        <span>Users can create personal events.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faMap} />
        <span>Drivers have a map that tracks their location.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faMapPin} />
        <span>Mechanic and Drivers can log their daily life as LogTracks.<br/>This permits their managers to view and analyse their job.</span>
      </span>
      <span className="doc-with-icon">
        <Icon source="fa" icon={faCode} />
        <span>The start of a Developer Documentation.</span>
      </span>
    </div>
  }
});

export default ENews;
