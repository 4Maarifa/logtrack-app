import React, { useState, useEffect } from 'react';
import { faMapPin } from '@fortawesome/pro-light-svg-icons';

import DataService from './../../../../services/data.service';
import ErrorService from './../../../../services/error.service';
import LogTrackService from './../../../../services/entities/logtrack.service';
import EmployeeService from '../../../../services/entities/employee.service';

import ExTable from './../../../Utils/ExTable/ExTable';
import Icon from './../../../Utils/Icon/Icon';

import LogTrack, { logtracksExTableFSS } from './../../../Entities/LogTrack/LogTrack';

import { v4 as uuid } from 'uuid';

const LogTracksForManagers = ({ isEmbed }) => {
  
  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const [logtracks, setLogtracks] = useState({});
  const [isLogtracksLoading, setLogtracksLoading] = useState(true);
  const [employees, setEmployees] = useState({});

  useEffect(() => {
    if(computed.initialized && computed.activeRole) {
      LogTrackService.getEndedForCompanyIdPast24h(computed.activeRole.companyId)
        .then(logtracks => {
          EmployeeService.getAllForIdList(Object.keys(logtracks).map(ltKey => logtracks[ltKey].employeeId))
            .then(employees => {
              setEmployees(employees);
              setLogtracks(logtracks);
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
  const renderLogtrack = (itemId, itemData) => (
    <LogTrack key={itemId}
              employee={{ [itemData.employeeId]: employees[itemData.employeeId] }}
              logtrack={ {[itemId]: itemData} } />
  );

  return <div className="LogTracks">
    {!isEmbed ? <h1>Last LogTracks for your company</h1> : 
          <Icon containerclassname="icon-overlay" source="fa" icon={faMapPin} />}

    <ExTable key="logtracks"
                fss={logtracksExTableFSS}
                items={logtracks}
                renderItem={renderLogtrack}
                header={<span><Icon source="fa" icon={faMapPin} /> Company's Logtracks</span>}
                loading={isLogtracksLoading} />
  </div>;
};

export default LogTracksForManagers;
