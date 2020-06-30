import React from 'react';

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
        'what': {
          name: () => 'What is LogTrack?',
          content: () => <span>
            LogTrack is a Saas solution for Logistics Companies and their partners.
            It provides enhanced and in-depth functionalities to manage your company's fleet, employees, warehouses and more and offer comprehensive handling of incidents.
          </span>
        },
        'who': {
          name: () => 'Who are we?',
          content: () => <span>
            I'm Bertrand Choubert, and I entirely designed and developed LogTrack.
            I aim to give companies the resources and tools to improve their deily working life.
          </span>
        }
      }} />
    </div>
  );
};

export default FAQ;
