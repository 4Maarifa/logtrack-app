import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { faQuestion, faEnvelope, faComment } from '@fortawesome/pro-light-svg-icons';

import { EContactCategories, EContactCategoryDetails } from './../../../Entities/Contact/Contact';

import Icon from './../../../Utils/Icon/Icon';
import FormInput from './../../../Utils/FormElements/FormInput/FormInput';
import FormTextarea from './../../../Utils/FormElements/FormTextarea/FormTextarea';

import ErrorService from './../../../../services/error.service';
import ContactService from './../../../../services/entities/contact.service';

const Contact = () => {

  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [contactId, setContactId] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    ContactService.createWithData(message, email, EContactCategories[category])
      .then(contactDoc => setContactId(contactDoc.id))
      .catch(ErrorService.manageError);
  };

  if(contactId) {
    ErrorService.success('Your message was sent successfully!');
    return <Redirect to={`/`} />;
  }

  return (
    <div className="Contact">
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>
        {/* Reason */}
        <div className="input-container">
          <span className="fake-label">
            <Icon source="fa" icon={faQuestion} />
            Reason
          </span>
          <select id="reason" value={category} onChange={e => setCategory(e.target.value)} required>
            <option value="" disabled>Choose a reason...</option>
            {Object.keys(EContactCategories).map(categoryKey => <option key={categoryKey} value={categoryKey}>{EContactCategoryDetails[categoryKey].title}</option>)}
          </select>
        </div>

        {/* Email */}
        <FormInput
          value={email}
          inputType="email"
          fieldName="email"
          label={
            <span>
              <Icon source="fa" icon={faEnvelope} />
              EMail
            </span>
          }
          inputRequired
          inputPattern=".{3,}"
          instructions={
            <span>
              Your email address
            </span>
          }
          onValueChange={setEmail} />

        {/* Message */}
        <FormTextarea
          value={message}
          fieldName="message"
          label={
            <span>
              <Icon source="fa" icon={faComment} />
              Your Message
            </span>
          }
          instructions={
            <span>
              Your message
            </span>
          }
          inputRequired
          onValueChange={setMessage} />

        <input type="submit" />
      </form>


    </div>
  );
};

export default Contact;
