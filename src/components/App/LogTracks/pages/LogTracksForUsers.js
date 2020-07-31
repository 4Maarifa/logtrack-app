import React, { useState, useEffect, Fragment } from 'react';
import { faMapPin } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../../services/data.service';
import ErrorService from './../../../../services/error.service';
import ColorService from './../../../../services/color.service';
import LogTrackService from './../../../../services/entities/logtrack.service';
import CompanyService from './../../../../services/entities/company.service';

import Icon from './../../../Utils/Icon/Icon';
import ExTable, { EXTABLE_VIEWS } from './../../../Utils/ExTable/ExTable';
import LogTrackTimeline from './../../../Utils/LogTrackTimeline/LogTrackTimeline';

import LogTrackAdd from './../../../Forms/LogTrackAdd/LogTrackAdd';

import LogTrack, { logtracksExTableFSS } from './../../../Entities/LogTrack/LogTrack';

import { ELogTrackCategoryDetails, ELogTrackActivityDetails } from './../../../../classes/LogTrack';

import { v4 as uuid } from 'uuid';

/**
 * Component: LogTracksForUsers
 * Page of LogTracks component
 * Used by users to view their past logtracks as well as create new ones
 */
const LogTrackForUsers = ({ isEmbed }) => {
  
  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  // LogTracks data
  const [logtracks, setLogtracks] = useState({});
  const [isLogtracksLoading, setLogtracksLoading] = useState(true);

  // Saving here the company of the current LogTrack
  const [currentLogTrackCompany, setCurrentLogTrackCompany] = useState({});

  useEffect(() => {
    if(computed.initialized && computed.activeRole && computed.employee) {
      //Get all logtrakcs ended in the past 24h for this employee
      LogTrackService.getEndedForEmployeeIdAndCompanyIdPast24h(computed.user.uid, computed.activeRole.companyId)
        .then(logtracks => {
          // If the employee has a current LogTrack (not finished yet), add this to the data
          if(computed.employee.currentLogTrack) {
            const CURRENT_LOGTRACK_KEY = Object.keys(computed.employee.currentLogTrack)[0];
            logtracks[CURRENT_LOGTRACK_KEY] = computed.employee.currentLogTrack[CURRENT_LOGTRACK_KEY]; 
          }
          //Set data
          setLogtracks(logtracks);

          // Then trigger end of load
          setLogtracksLoading(false);
        })
        .catch(ErrorService.manageError);
      
      if(computed.employee && computed.activeRole && computed.employee.currentLogTrack) {
        // If employee has a current LogTrack, get the companyId
        const CURRENT_LOGTRACK_COMPANY_ID = computed.employee.currentLogTrack[Object.keys(computed.employee.currentLogTrack)[0]].companyId;

        // If it's the one he has an active role upon, set the currentLogTrack Company to it
        // TODO: Remove when CacheService will be developed
        if(CURRENT_LOGTRACK_COMPANY_ID === computed.activeRole.companyId) {
          setCurrentLogTrackCompany({ [computed.activeRole.companyId]: computed.activeRoleCompany });
        }
        else {
          // Otherwise, fetch it
          CompanyService.get(CURRENT_LOGTRACK_COMPANY_ID)
            .then(companyDoc => setCurrentLogTrackCompany({ [companyDoc.id]: companyDoc.data() }))
            .catch(ErrorService.manageError);
        }
      }
    }
  }, [computed.initialized, computed.activeRole, computed.employee]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  /**
   * RENDER
   */
  const renderLogtrack = (itemId, itemData, mode) => (
    <LogTrack key={itemId}
      logtrack={ {[itemId]: itemData} }
      mode={mode} />
  );

  return <div className="LogTracks">
    {/* If embed, hide the currentLogTrack, LogTrackAdd form and all titles */}
    {!isEmbed ? 
    <Fragment>
      {computed.employee.currentLogTrack ? 
        <Fragment>
          <h1>Your Current LogTrack</h1>
          <div className="Element Element--page" style={{
            backgroundColor: ColorService.getPaletteForColor(
              ELogTrackCategoryDetails[
                ELogTrackActivityDetails[
                  computed.employee.currentLogTrack[Object.keys(computed.employee.currentLogTrack)[0]].activity
                ].parent
              ].color).medium.color
          }}>
            <LogTrack logtrack={computed.employee.currentLogTrack} company={currentLogTrackCompany} isPage />
          </div>
        </Fragment> : <h1>No current LogTrack</h1>}

      <LogTrackAdd />
      <h1>Last Logtracks</h1>
      <LogTrackTimeline logtracks={logtracks}
                        isLoading={isLogtracksLoading} />
    </Fragment> : 
          <Icon containerclassname="icon-overlay" source="fa" icon={faMapPin} />}

    {/* If embed, just show this table
    View is condensed by default if embed */}
    <ExTable key="logtracks"
              fss={logtracksExTableFSS}
              defaultView={isEmbed ? EXTABLE_VIEWS.CONDENSED : null}
              items={logtracks}
              renderItem={renderLogtrack}
              header={<span><Icon source="fa" icon={faMapPin} /> Last Logtracks</span>}
              loading={isLogtracksLoading} />
  </div>;
};

export default LogTrackForUsers;
