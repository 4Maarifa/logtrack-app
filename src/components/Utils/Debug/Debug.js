import React, { useState, useEffect } from 'react';
import { faInfoCircle, faCookieBite, faDesktop, faMobile, faMicrochip, 
  faMemory, faEthernet, faWifi, faBroadcastTower, faArrowsH, 
  faArrowsV, faBug} from '@fortawesome/pro-light-svg-icons';
import { faBluetooth } from '@fortawesome/free-brands-svg-icons';

import Icon from './../Icon/Icon';
import Tooltip from './../Tooltip/Tooltip';
import CompletionBar from './../CompletionBar/CompletionBar';

import UserAgentService from './../../../services/useragent.service';

// Print the connection icon from the connection type from https://wicg.github.io/netinfo/#connectiontype-enum
const connectionTypeIcon = connectionType => {
  switch(connectionType) {
    case 'ethernet':
      return <Icon source="fa" icon={faEthernet} />;
    case 'bluetooth':
      return <Icon source="fa" icon={faBluetooth} />;
    case 'wifi':
      return <Icon source="fa" icon={faWifi} />;
    case 'cellular':
      return <Icon source="fa" icon={faBroadcastTower} />;
    default:
      return null;
  }
};

/**
 * Component: Debug
 * Print details about a device configuration
 * It provides a convenient way for both debugging on the device or view the configuration of a remote device
 * 
 * Initial Data: Object | The result of UserAgentService.getAll() function /!\ Mandatory!
 * isLive: boolean | If true, will refresh live data from UserAgentService
 */
const Debug = ({ initialData, isLive }) => {

  // store the initial data
  const USER_AGENT_INFOS = initialData;

  // parse some info from the initial data
  const BROWSER_PARSED_INFOS = UserAgentService.parseBrowserInfos(initialData.browser.infos);
  const OS_INFOS = UserAgentService.parseOS(initialData.browser.infos);
  
  // boolean to trigger the browser tooltip
  const [isShowBrowserInfos, setShowBrowserInfos] = useState(false);

  // Live or not live memory usage
  // Initialized with recorded data, refreshed if isLive is true
  const [rtMemoryUsage, setRtMemoryUsage] = useState(USER_AGENT_INFOS.memory.usage);

  useEffect(() => {

    // If isLive and browser is compatible with memory usage
    if(isLive && USER_AGENT_INFOS.memory.usage !== 'Unknown Usage') {

      // refresh memory every second
      const INTERVAL_MEMORY = setInterval(() => setRtMemoryUsage(UserAgentService.getMemoryUsage()), 1000);
      return () => clearInterval(INTERVAL_MEMORY);
    }
  }, []);

  return <div className="tab-content tab-device">

    {/* User advice */}
    <div className="Element--full-width Element Element--tile">
      <div className="Element-content">
        <div className="Element-base">
          <Icon containerclassname="Element-icon" source="fa" icon={faBug} />
          <div className="Element-data">
            <span className="Element-title">
              This information is for confirmed users only!
            </span>
            <span className="sub">
              This information is gathered only when you send a support message to let us know about potential incompatibilities.
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* LogTrack version */}
    <h3>App</h3>
    <span>You're using LogTrack v{USER_AGENT_INFOS.appVersion}</span>

    {/* React version */}
    <h3>React App</h3>
    <span>You're using React {USER_AGENT_INFOS.reactVersion ? `v${USER_AGENT_INFOS.reactVersion}` : 'unknown version'}</span>

    {/* Browser info */}
    <h3>Browser</h3>
    <span className="tooltip-parent">
      You're browsing using <Icon source="fa" icon={BROWSER_PARSED_INFOS.icon} /> {BROWSER_PARSED_INFOS.name}, version {BROWSER_PARSED_INFOS.majorVersion}
      <span onMouseOver={() => setShowBrowserInfos(true)} onMouseOut={() => setShowBrowserInfos(false)}>
        <Icon source="fa" icon={faInfoCircle} />
      </span>
      <Tooltip show={isShowBrowserInfos} label={<span>Complete version: {USER_AGENT_INFOS.browser.infos.agent}</span>} />
    </span><br/>

    {/* Mobile or desktop version */}
    {USER_AGENT_INFOS.browser.isMobile ? <span> <Icon source="fa" icon={faMobile} /> Mobile Version </span> : 
      <span><Icon source="fa" icon={faDesktop} /> Desktop Version</span>}<br/>

    {/* Cookies */}
    <span><Icon source="fa" icon={faCookieBite} /> {USER_AGENT_INFOS.browser.isCookiesEnabled ? 'Cookies are enabled' : 'Cookies are not enabled'}</span>

    {/* Hardware */}
    <h3>Hardware</h3>
    <span><Icon source="fa" icon={faMicrochip} /> Processor: {USER_AGENT_INFOS.processor}</span><br/>
    <span><Icon source="fa" icon={faMemory} /> Memory: {USER_AGENT_INFOS.memory.amount}</span>

    {/* Memory usage */}
    {USER_AGENT_INFOS.memory.usage !== 'Unknown Usage' ? <div>
      <CompletionBar title="Heap Usage" details={`(${Math.floor(rtMemoryUsage.usedJSHeapSize)} MB / ${Math.floor(rtMemoryUsage.totalJSHeapSize)} MB) `} percentage={rtMemoryUsage.percentageUsedOfTotal * 100} />
      <CompletionBar title="Heap Limit" details={`(${Math.floor(rtMemoryUsage.totalJSHeapSize)} MB / ${Math.floor(rtMemoryUsage.jsHeapSizeLimit)} MB) `} percentage={rtMemoryUsage.percentageTotalOfLimit * 100} />
    </div> : null}

    {/* Browser plugins */}
    <h3>Plugins</h3>
    {USER_AGENT_INFOS.plugins.length === 0 ? <span>No Plugins</span> : 
      <ul> {USER_AGENT_INFOS.plugins.map(plugin => <li key={plugin}>{plugin}</li>)} </ul>}

    {/* Language */}
    <h3>Language</h3>
    <span>{USER_AGENT_INFOS.language.name} ({USER_AGENT_INFOS.language.iso})</span>

    {/* OS */}
    <h3>Operating System</h3>
    <span>You're using <Icon source="fa" icon={OS_INFOS.osIcon} /> {OS_INFOS.os}, version {OS_INFOS.osVersion}</span>

    {/* Connection */}
    <h3>Connection</h3>
    <span>{connectionTypeIcon(USER_AGENT_INFOS.connection.type)} {USER_AGENT_INFOS.connection.type}</span>

    {/* Screen */}
    <h3>Screen</h3>
    <span>{USER_AGENT_INFOS.screen.isTactile ? `Tactile Screen with ${USER_AGENT_INFOS.screen.nbTouchpoints} touchpoints` : 'Non-tactile screen'}</span><br/>
    <span>
      <Icon source="fa" icon={faArrowsV} /> Height<br/>
      Screen: {USER_AGENT_INFOS.screen.properties.height.screen}<br/>
      Available: {USER_AGENT_INFOS.screen.properties.height.available}<br/>
      Window Outer: {USER_AGENT_INFOS.screen.properties.height.outer}<br/>
      Window Inner: {USER_AGENT_INFOS.screen.properties.height.inner}<br/>
      
      <Icon source="fa" icon={faArrowsH} /> Width<br/>
      Screen: {USER_AGENT_INFOS.screen.properties.width.screen}<br/>
      Available: {USER_AGENT_INFOS.screen.properties.width.available}<br/>
      Window Outer: {USER_AGENT_INFOS.screen.properties.width.outer}<br/>
      Window Inner: {USER_AGENT_INFOS.screen.properties.width.inner}<br/>
    </span>
  </div>;
};

export default Debug;
