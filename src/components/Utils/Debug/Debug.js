import React, { useState, useEffect } from 'react';
import { faInfoCircle, faCookieBite, faDesktop, faMobile, faMicrochip, 
  faMemory, faEthernet, faWifi, faBroadcastTower, faArrowsH, faArrowsV, faBug} from '@fortawesome/pro-solid-svg-icons';
import { faBluetooth } from '@fortawesome/free-brands-svg-icons';

import Icon from '../Icon/Icon';
import Tooltip from '../Tooltip/Tooltip';

import UserAgentService from '../../../services/useragent.service';
import CompletionBar from '../CompletionBar/CompletionBar';

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

const Debug = ({ initialData, isLive }) => {
  let userAgentInfos = initialData;
  let browserParsedInfos = UserAgentService.parseBrowserInfos(initialData.browser.infos);
  let osInfos = UserAgentService.parseOS(initialData.browser.infos);
  
  const [isShowBrowserInfos, setShowBrowserInfos] = useState(false);

  const [rtMemoryUsage, setRtMemoryUsage] = useState(userAgentInfos.memory.usage);

  useEffect(() => {
    if(isLive && userAgentInfos.memory.usage !== 'Unknown Usage') {
      let interval = setInterval(() => setRtMemoryUsage(UserAgentService.getMemoryUsage()), 1000);
      return () => clearInterval(interval);
    }
  }, []);

  return <div className="tab-content tab-device">
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
    <h3>App</h3>
    <span>You're using LogTrack v{userAgentInfos.appVersion}</span>

    <h3>Browser</h3>
    <span className="tooltip-parent">
      You're browsing using <Icon source="fa" icon={browserParsedInfos.icon} /> {browserParsedInfos.name}, version {browserParsedInfos.majorVersion}
      <span onMouseOver={() => setShowBrowserInfos(true)} onMouseOut={() => setShowBrowserInfos(false)}>
        <Icon source="fa" icon={faInfoCircle} />
      </span>
      <Tooltip show={isShowBrowserInfos} label={<span>Complete version: {userAgentInfos.browser.infos.agent}</span>} />
    </span><br/>
    {userAgentInfos.browser.isMobile ? <span> <Icon source="fa" icon={faMobile} /> Mobile Version </span> : 
      <span><Icon source="fa" icon={faDesktop} /> Desktop Version</span>}<br/>
    <span><Icon source="fa" icon={faCookieBite} /> {userAgentInfos.browser.isCookiesEnabled ? 'Cookies are enabled' : 'Cookies are not enabled'}</span>

    <h3>Hardware</h3>
    <span><Icon source="fa" icon={faMicrochip} /> Processor: {userAgentInfos.processor}</span><br/>
    <span><Icon source="fa" icon={faMemory} /> Memory: {userAgentInfos.memory.amount}</span>

    {userAgentInfos.memory.usage !== 'Unknown Usage' ? <div>
      <CompletionBar title="Heap Usage" details={`(${Math.floor(rtMemoryUsage.usedJSHeapSize)} MB / ${Math.floor(rtMemoryUsage.totalJSHeapSize)} MB) `} percentage={rtMemoryUsage.percentageUsedOfTotal * 100} />
      <CompletionBar title="Heap Limit" details={`(${Math.floor(rtMemoryUsage.totalJSHeapSize)} MB / ${Math.floor(rtMemoryUsage.jsHeapSizeLimit)} MB) `} percentage={rtMemoryUsage.percentageTotalOfLimit * 100} />
    </div> : null}

    <h3>Plugins</h3>
    {userAgentInfos.plugins.length === 0 ? <span>No Plugins</span> : 
      <ul> {userAgentInfos.plugins.map(plugin => <li key={plugin}>{plugin}</li>)} </ul>}

    <h3>Language</h3>
    <span>{userAgentInfos.language.name} ({userAgentInfos.language.iso})</span>

    <h3>Operating System</h3>
    <span>You're using <Icon source="fa" icon={osInfos.osIcon} /> {osInfos.os}, version {osInfos.osVersion}</span>

    <h3>Connection</h3>
    <span>{connectionTypeIcon(userAgentInfos.connection.type)} {userAgentInfos.connection.type}</span>

    <h3>Screen</h3>
    <span>{userAgentInfos.screen.isTactile ? `Tactile Screen with ${userAgentInfos.screen.nbTouchpoints} touchpoints` : 'Non-tactile screen'}</span><br/>
    <span>
      <Icon source="fa" icon={faArrowsV} /> Height<br/>
      Screen: {userAgentInfos.screen.properties.height.screen}<br/>
      Available: {userAgentInfos.screen.properties.height.available}<br/>
      Window Outer: {userAgentInfos.screen.properties.height.outer}<br/>
      Window Inner: {userAgentInfos.screen.properties.height.inner}<br/>
      
      <Icon source="fa" icon={faArrowsH} /> Width<br/>
      Screen: {userAgentInfos.screen.properties.width.screen}<br/>
      Available: {userAgentInfos.screen.properties.width.available}<br/>
      Window Outer: {userAgentInfos.screen.properties.width.outer}<br/>
      Window Inner: {userAgentInfos.screen.properties.width.inner}<br/>
    </span>
  </div>;
};

export default Debug;
