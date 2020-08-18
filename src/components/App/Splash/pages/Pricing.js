import React from 'react';
import { faUserCheck } from '@fortawesome/pro-regular-svg-icons';

import Icon from './../../../Utils/Icon/Icon';

import { ECompanyPlan } from './../../../../classes/Company';

/**
 * Component: Pricing
 * Page of Splash component
 * 
 */
const Pricing = () => {
  return (
    <div className="Pricing">
      <h1>Pricing</h1>

      <div className="plan-selection">
        <div className="plan-selection-content">
          <div>
            <span className="plan-icon">
              <Icon source="fa" icon={faUserCheck} />
            </span>
            <h2 className="plan-name">Everything's free, apart from owning a company!</h2>
            <ul>
              <li>
                Signup, LogTracks, Role requests, Profile, Job applications, Personal Files...
              </li>
            </ul>
          </div>
        </div>
      </div>

      <h1>Company Plans</h1>
      
      <div className="plan-selection">
        <div className="plan-selection-content">
          {/* Printing all plan features */}
          {Object.keys(ECompanyPlan).map(planKey => <div key={planKey}>
            <span className="plan-icon">{ECompanyPlan[planKey].icon}</span>
            <h2 className="plan-name">{ECompanyPlan[planKey].name}</h2>
            <ul>
              {ECompanyPlan[planKey].attributes.map((attr, index) => <li key={index}>
                {attr}
              </li>)}
            </ul>
            <div className="plan-price">
              {ECompanyPlan[planKey].price}
            </div>
            {!ECompanyPlan[planKey].disabled && <span className="plan-info">No Credit Card required</span>}
          </div>)}
        </div>
        <span className="plan-selection-mentions">
          (1) Support by Phone is not available yet and will begin after early access<br/>
          (2) Activated during early access<br/>
          (3) If the user's device is compatible<br/>
          (4) After early access, you will have to choose your plan &amp; options before charges apply
        </span>
      </div>

    </div>
  );
};

export default Pricing;
