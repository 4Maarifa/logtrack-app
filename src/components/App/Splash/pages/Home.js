import React from 'react';
import { faChartPie, faPencil, faMapMarker, faRoute, faWrench, faPortrait, faWarehouseAlt,
  faUserTag, faHandshakeAlt, faFileInvoiceDollar, faTrafficCone, faCommentDots, faPalletAlt,
  faHands, faExclamationTriangle, faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';

import Icon from './../../../Utils/Icon/Icon';

// All functionalities of LogTrack that are presented on Home
const FUNCTIONALITIES = [
  { title: 'Plan.', icon: faPencil, description: 'Plan and dispatch your missions accross your workers.' },
  { title: 'Ship.', icon: faPalletAlt, description: 'From initial need to effective delivery and invoicing. No surpises.' },
  { title: 'Track.', icon: faMapMarker, description: 'Real-Time Location & Condition of your equipments and shipments.' },
  { title: 'Analyze.', icon: faChartPie, description: 'Automatic Statistics that meet your Performance Indicaors.' },
  { title: 'Follow Directions.', icon: faRoute, description: 'Complete integrated GPS.' },
  { title: 'Maintain & Repair.', icon: faWrench, description: 'Equipment Repair & Planned Maintenance.' },
  { title: 'Recruit.', icon: faPortrait, description: 'Create your job offers and recruit the perfect candidate.' },
  { title: 'Manage Warehouses.', icon: faWarehouseAlt, description: 'Avalable Loading Docks, Stock and Loading.' },
  { title: 'Role-based.', icon: faUserTag, description: 'Got multiple positions? Switch from one to the other with one click.' },
  { title: 'Contracts & Partners.', icon: faHandshakeAlt, description: 'Contracting has never been so simple! Propose your offer to the market.' },
  { title: 'Invoice Records.', icon: faFileInvoiceDollar, description: 'List your pas invoices and planned expenses.' },
  { title: 'Track Incidents.', icon: faTrafficCone, description: 'React fast to incidents.' },
  { title: 'Real-Time Alerts & Notifications.', icon: faExclamationTriangle, description: 'Be informed of delays and invoices.' },
  { title: 'Chat, EMails & Calendar Events.', icon: faCommentDots, description: 'Communicate effectively with other workers.' },
  { title: 'Insurance, Accounting, Mechanics.', icon: faHands, description: 'All your partners, on LogTrack.' }
];

/**
 * Component: Home
 * Page of Splash component
 */
const Home = () => {
  return (
    <div className="Home">
      <h1>Main Functionalities</h1>
      <div className="functionalities">

        {/* List of all functionalities, along with their icon and name */}
        {FUNCTIONALITIES.map((functionality, index) => (
          <div className="functionality" key={functionality.title}>
            <span className="icon-wrapper">
              <svg className="circle" viewBox="-10 -10 120 120" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50"/>
              </svg>
              <Icon source="fa" icon={functionality.icon} />
            </span>
            <span className="functionality-text">
              <h3>{functionality.title}</h3>
              <span>{functionality.description}</span>
            </span>
            {index < FUNCTIONALITIES.length - 1 ? <svg className="link" viewBox="-1 0 102 200" xmlns="http://www.w3.org/2000/svg">
              <path d={index % 2 === 0 ? 'M-3414-2097c0,100.115,100.269,100.115,100,200' : 'M-3314-2097c0,100.115-100.269,100.115-100,200'} transform="translate(3414 2097)" fill="none"/>
            </svg> : null}
          </div>
        ))}
        <span className="functionalities-advice">
          <Icon source="fa" icon={faInfoCircle} />
          Some functionalities may be limited / not available according to the selected plan. <Link to="/pricing">See Pricing.</Link>
        </span>
      </div>
    </div>
  );
};

export default Home;
