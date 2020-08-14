import React from 'react';
import { Link } from 'react-router-dom';

import UserAgentService from './../../../../services/useragent.service';

/**
 * Component: Credits
 * Page of Splash component
 */
const Credits = () => {
  return (
    <div className="Credits">
      <h1>Credits</h1>
      <p>
        LogTrack is a project entirely designed and developed by Bertrand Choubert (<a href="https://chbe.fr" target="_blank" rel="noopener noreferrer">His website</a>).<br/>
        It's a Saas solution for every company directly or indirectly involved in Logistics: Shipping, Hauling, Maintenance, Repairs, Operator, Insurance, Accountance...
      </p>
      <p>
        Assets used in this project are either free-to-use (<a href="https://www.pexels.com/video/from-above-footage-of-vehicular-traffic-on-a-busy-street-intersection-in-the-city-at-night-3063475/" target="_blank" rel="noopener noreferrer">like the video on the homepage</a>), or used under license.
      </p>
      <p>
        This Saas solution is mainly developed using React and Firebase.<br/>
        Additional Fonts are: Font Awesome (under Pro License), Transportation-Font (developed by myself), and Nunito (from Google Fonts).<br/>
        I also used ApexCharts, OpenLayers (along with Nominatim), Moment, Toastr, UUID, and ColorThiefNode.
      </p>
      <p>
        LogTrack is now in version v{UserAgentService.getAppVersion()}, which bring you <Link to="/changelog">the most advanced functionalities yet</Link>.
      </p>
    </div>
  );
};

export default Credits;
