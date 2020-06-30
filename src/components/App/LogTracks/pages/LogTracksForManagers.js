import React, { useState, useEffect } from 'react';
import { faMapPin } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../../services/data.service';
import UtilsService from './../../../../services/utils.service';
import ErrorService from './../../../../services/error.service';
import LogTrackService from './../../../../services/entities/logtrack.service';
import EmployeeService from '../../../../services/entities/employee.service';

import ExTable, { EXTABLE_VIEWS } from './../../../Utils/ExTable/ExTable';
import Icon from './../../../Utils/Icon/Icon';

import LogTrack, { logtracksExTableFSS } from './../../../Entities/LogTrack/LogTrack';

import { v4 as uuid } from 'uuid';

/**
 * component: LogTracksForManagers
 * Page of LogTracks component
 * Used by managers to monitor company's logtracks
 * 
 */
const LogTracksForManagers = ({ isEmbed }) => {
  
  // LogTracks
  const [logtracks, setLogtracks] = useState({});
  const [isLogtracksLoading, setLogtracksLoading] = useState(true);

  // Related employees
  const [employees, setEmployees] = useState({});

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());


  useEffect(() => {
    if(computed.initialized && computed.activeRole) {
      // Getting past logtracks
      LogTrackService.getEndedForCompanyIdPast24h(computed.activeRole.companyId)
        .then(logtracks => {

          // Getting all the related employees (by getting their ids from logtracks and removing duplicates)
          EmployeeService.getAllForIdList(UtilsService.removeDuplicateFromArray(Object.keys(logtracks).map(ltKey => logtracks[ltKey].employeeId)))
            .then(employees => {
              // Setting data
              setEmployees(employees);
              setLogtracks(logtracks);

              // Triggering end of load
              setLogtracksLoading(false);

            }).catch(ErrorService.manageError);
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
  const renderLogtrack = (itemId, itemData, mode) => (
    <LogTrack key={itemId}
              employee={{ [itemData.employeeId]: employees[itemData.employeeId] }}
              logtrack={{ [itemId]: itemData }}
              mode={mode} />
  );

  return <div className="LogTracks">
    {/* If the component is embed, only show the table */}
    {!isEmbed ? <h1>Last LogTracks for your company</h1> : 
          <Icon containerclassname="icon-overlay" source="fa" icon={faMapPin} />}

    {/* The table view is by default condensed when embed, otherwise default */}
    <ExTable key="logtracks"
              fss={logtracksExTableFSS}
              items={logtracks}
              defaultView={isEmbed ? EXTABLE_VIEWS.CONDENSED : null}
              renderItem={renderLogtrack}
              header={<span><Icon source="fa" icon={faMapPin} /> Company's past Logtracks</span>}
              loading={isLogtracksLoading} />
  </div>;
};

export default LogTracksForManagers;
