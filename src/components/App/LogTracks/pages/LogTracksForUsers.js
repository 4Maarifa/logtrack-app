import React, { useState, useEffect, Fragment } from 'react';
import { faMapPin } from '@fortawesome/pro-solid-svg-icons';

import DataService from '../../../../services/data.service';
import ErrorService from '../../../../services/error.service';
import ColorService from '../../../../services/color.service';
import LogTrackService from '../../../../services/entities/logtrack.service';

import Icon from '../../../Utils/Icon/Icon';
import ExTable from '../../../Utils/ExTable/ExTable';
import LogTrackTimeline from '../../../Utils/LogTrackTimeline/LogTrackTimeline';

import LogTrackAdd from '../../../Forms/LogTrackAdd/LogTrackAdd';

import LogTrack, { logtracksExTableFSS } from '../../../Entities/LogTrack/LogTrack';

import { LogTrackCategoryDetails, LogTrackActivityDetails } from '../../../../classes/LogTrack';

import { v4 as uuid } from 'uuid';

const LogTrackForUsers = ({ isEmbed }) => {
  
  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const [logtracks, setLogtracks] = useState({});
  const [isLogtracksLoading, setLogtracksLoading] = useState(true);

  useEffect(() => {
    if(computed.initialized && computed.activeRole) {
      LogTrackService.getEndedForEmployeeIdPast24h(computed.user.uid)
        .then(logtracks => {
          if(computed.employee.currentLogTrack) {
            const CURRENT_LOGTRACK_KEY = Object.keys(computed.employee.currentLogTrack)[0];
            logtracks[CURRENT_LOGTRACK_KEY] = computed.employee.currentLogTrack[CURRENT_LOGTRACK_KEY]; 
          }
          setLogtracks(logtracks);
          setLogtracksLoading(false);
        })
        .catch(ErrorService.manageError);
    }
  }, [computed.initialized, computed.activeRole]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderLogtrack = (itemId, itemData) => (
    <LogTrack key={itemId}
      logtrack={ {[itemId]: itemData} } />
  );

  return <div className="LogTracks">    
    {!isEmbed ? 
    <Fragment>
      {computed.employee.currentLogTrack ? 
        <Fragment>
          <h1>Your Current LogTrack</h1>
          <div className="Element Element--page" style={{
            backgroundColor: ColorService.getPaletteForColor(
              LogTrackCategoryDetails[
                LogTrackActivityDetails[
                  computed.employee.currentLogTrack[Object.keys(computed.employee.currentLogTrack)[0]].activity
                ].parent
              ].color).medium.color
          }}>
            <LogTrack logtrack={computed.employee.currentLogTrack} isPage />
          </div>
        </Fragment> : <h1>No current LogTrack</h1>}

      <LogTrackAdd />
      <h1>Last Logtracks</h1>
      <LogTrackTimeline logtracks={logtracks}
                        isLoading={isLogtracksLoading} />
    </Fragment> : null}

    <ExTable key="logtracks"
                fss={logtracksExTableFSS}
                items={logtracks}
                renderItem={renderLogtrack}
                header={<span><Icon source="fa" icon={faMapPin} /> Your Logtracks</span>}
                loading={isLogtracksLoading} />
  </div>;
};

export default LogTrackForUsers;
