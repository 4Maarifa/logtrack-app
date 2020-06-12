import React, { useEffect, useState } from 'react';
import { faPhoneAlt, faInfoCircle, faExclamationTriangle, faEnvelope, faUserHeadset } from '@fortawesome/pro-solid-svg-icons';

import DataService from './../../../../services/data.service';
import DateService from './../../../../services/date.service';
import ErrorService from './../../../../services/error.service';
import UserAgentService from './../../../../services/useragent.service';
import SupportService from './../../../../services/entities/support.service';

import Icon from './../../../Utils/Icon/Icon';
import ActionLink from './../../../Utils/ActionLink/ActionLink';

import { v4 as uuid } from 'uuid';
import FormTextarea from '../../../Utils/FormElements/FormTextarea/FormTextarea';

const SupportTab = () => {

  const [supportMessage, setSupportMessage] = useState('');
  const [supportMetadata, setSupportMetadata] = useState({});

  const OBSERVER_KEY = uuid();
  
  const [computed, setComputed] = useState(DataService.computed.getDefaultComputedValues());

  const handleSubmitSupport = event => {
    event.preventDefault();

    SupportService.createWithData(supportMessage, computed.user.uid, supportMetadata, UserAgentService.getAll())
      .then(() => {
        setSupportMessage('');
        ErrorService.success('Your message was received successfully!');
      })
      .catch(ErrorService.manageError);
  };

  useEffect(() => {
    if(computed.initialized) {
      setSupportMetadata({
        userId: computed.user.uid,
        userName: computed.employee.firstname + ' ' + computed.employee.lastname,
        userEmail: computed.user.email,
        activeRoleId: computed.employee.activeRoleId,
        activeRoleCompanyId: computed.activeRole ? computed.activeRole.companyId : null,
        activeRole: computed.activeRole ? computed.activeRole.role : null,
        date: DateService.getCurrentIsoDateString()
      });
    }
  }, [computed.initialized, computed.employee]);

  useEffect(() => {
    DataService.computed.observeComputedValues(setComputed, OBSERVER_KEY);
    return () => DataService.computed.unobserveComputedValues(OBSERVER_KEY);
  }, []);

  if(!computed.initialized) { return null; }

  return <div className="tab-content tab-support">
    <h2 className="profile-title">
      <Icon source="fa" icon={faPhoneAlt} />
      Reach Phone Support
    </h2>
    <span className="support-tel">
      <span className="support-tel-icon">
        <Icon source="fa" icon={faPhoneAlt} />
      </span>
      <a className="support-tel-number" href="tel:0800000000">
        0.800.00.00.00
      </a>
    </span>
    <span>Contact by phone will be available soon!</span>
    <details>
        <summary>
          <Icon source="fa" icon={faInfoCircle} />
          We might ask you some information
        </summary>
        <span className="support-message-warning">
          <Icon source="fa" icon={faExclamationTriangle} />
          This information is private. Communicate it only to the support!
        </span>
        {Object.keys(supportMetadata).map(metadataKey =>
          <span key={metadataKey}>{metadataKey} : {supportMetadata[metadataKey]}</span>
        )}
    </details>
    <h2 className="profile-title">
      <Icon source="fa" icon={faEnvelope} />
      Send us a message
    </h2>
    <form className="support-form" onSubmit={handleSubmitSupport}>

      <FormTextarea
        inputName="supportMessage"
        value={supportMessage}
        onValueChange={setSupportMessage}
        label={<span>
          <Icon source="fa" icon={faUserHeadset} />
          Your Message
        </span>}
        inputRequired />
      <details>
        <summary>
          <Icon source="fa" icon={faInfoCircle} />
          Some information will be automatically joined to your message
        </summary>
        <span className="support-message-warning">
          <Icon source="fa" icon={faExclamationTriangle} />
          This information is private. Communicate it only to the support!
        </span>
        {Object.keys(supportMetadata).map(metadataKey =>
          <span key={metadataKey}>{metadataKey} : {supportMetadata[metadataKey]}</span>
        )}
        <ActionLink url="/profile?tab=device" content={<span>+ Additional information about your browser and configuration.</span>} />
      </details>
      <div className="support-form-actions">
        <button>Send message</button>
      </div>
    </form>
  </div>;
};

export default SupportTab;
