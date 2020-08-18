import React from 'react';
import { Link } from 'react-router-dom';

import Accordion from './../../../Utils/Accordion/Accordion';

/**
 * Component: FAQ
 * Page of Splash component
 * 
 * TODO: FAQ
 */
const FAQ = () => {

  return (
    <div className="FAQ">
      <h1>FAQ</h1>

      {/* Accordion to present questions */}
      <Accordion items={{
        what: {
          name: () => 'What is LogTrack?',
          content: () => <span>
            LogTrack is a Saas solution for Logistics Companies and their partners.<br/>
            It provides enhanced and in-depth functionalities to manage your company's fleet, employees, warehouses and more and offer comprehensive handling of incidents.
          </span>
        },
        how: {
          name: () => 'How LogTrack can help me and my company?',
          content: () => <span>
            LogTrack aims to provide up-to-date solutions for your daily problems and tasks. Contracting and invoicing with your partners, even if they're not on LogTrack, is very simple.<br/>
            We understand that you require specific tools and in-depth possibilities. Those are already on LogTrack.
          </span>
        },
        company: {
          name: () => 'Is LogTrack only for big companies?',
          content: () => <span>
            No, and that's even the inverse!<br/>
            Big companies have already some specific tools. For smaller companies, that often struggle to respond fast to indidents, LogTrack is the perfect solution!
          </span>
        },
        price: {
          name: () => 'Is it free?',
          content: () => <span>
            For small companies, LogTrack is and will always be free.<br/>
            For others, LogTrack is free throughout the early access. After that, you will be informed about plans and will have to choose your plan before charges apply.<br/>
            Head to <Link to={`/pricing`}>Pricing</Link> for more information.
          </span>
        },
        reach: {
          name: () => 'How can I reach to you?',
          content: () => <span>
            For Business inquiries, head to the <Link to={`/contact`}>'Contact Us'</Link> section.<br/>
            If you have trouble to signin or signup, head also to the <Link to={`/contact`}>'Contact Us'</Link> section.<br/>
            Otherwise, reach us via <Link to={`/profile?tab=support`}>Profile {'>'} Support'</Link>.<br/>
            Our support is open 7/7 and will get back to you as fast as possible.
          </span>
        },
        who: {
          name: () => 'Who are we?',
          content: () => <span>
            I'm Bertrand Choubert, and I entirely designed and developed LogTrack.<br/>
            I aim to give companies the resources and tools to improve their daily working life.
          </span>
        }
      }} />
    </div>
  );
};

export default FAQ;
