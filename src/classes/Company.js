import React from 'react';
import { faInfinity } from '@fortawesome/pro-regular-svg-icons';
import { faCircle, faTimesCircle, faCheckCircle } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../components/Utils/Icon/Icon';

/**
 * class Company
 * This class represents the company
 * 
 * name: string | The name of the company
 * logoURL: string | The logo of the company
 * creator: string | The creator of the company (employeeId)
 * creationIsoString | The creation date, as iso string
 * color | The main color of the company => custom look
 * plan | The selected plan of the company
 */
class Company {
    constructor(name, logoURL, creator, creationIsoString, color, plan) {
        this.name = name;
        this.logoURL = logoURL;
        this.creator = creator;
        this.creationIsoString = creationIsoString;
        this.color = color;
        this.plan = plan;
    }
}

export const ECompanyPlan = {
    BASIC: {
        disabled: true,
        name: 'Basic',
        value: 'BASIC',
        icon: <span>B</span>,
        solidIcon: <span>B</span>,
        price: <div><span className="plan-price-amount">Free</span><span className="plan-info">Forever</span></div>,
        attributes: [
            <span>10 Employees / 25 Equipments</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Custom Look</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Limited 7/24 Support<span className="mention">(1)</span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Live Event Tracking</span>,
            <span><Icon containerclassname="not-included" source="fa" icon={faTimesCircle} /> Live Position Tracking</span>,
            <span><Icon containerclassname="not-included" source="fa" icon={faTimesCircle} /> Live Analytics</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Operation Contracts<span className="plan-info">Transportation, Maintenance</span></span>,
            <span><Icon containerclassname="not-included" source="fa" icon={faTimesCircle} /> Other Contracts<span className="plan-info">Insurance, Accounting</span></span>
        ]
    },
    STANDARD: {
        disabled: false,
        name: 'Standard',
        value: 'STANDARD',
        icon: <span>S</span>,
        solidIcon: <span>S</span>,
        price: <div>
            <span className="plan-price-amount">Free<span className="mention">(4)</span></span>
            <span className="plan-info">For a limited time</span>
        </div>,
        attributes: [
            <span><Icon source="fa" icon={faInfinity} title="No Limit" /> Employees / <Icon source="fa" icon={faInfinity} title="No Limit" /> Equipments</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Custom Look</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Full 7/24 Support<span className="mention">(1)</span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Live Event Tracking</span>,
            <span><Icon containerclassname="optional" source="fa" icon={faCircle} /> Live Position Tracking<span className="plan-info">Optional<span className="mention">(2)</span>, via user's device<span className="mention">(3)</span></span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Live Analytics</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Operation Contracts<span className="plan-info">Transportation, Maintenance</span></span>,
            <span><Icon containerclassname="not-included" source="fa" icon={faTimesCircle} /> Other Contracts<span className="mention">(2)</span><span className="plan-info">Insurance, Accounting</span></span>
        ]
    },
    PREMIUM: {
        disabled: true,
        name: 'Premium',
        value: 'PREMIUM',
        icon: <span>P</span>,
        solidIcon: <span>P</span>,
        price: <div><span className="plan-price-amount">N/A</span></div>,
        attributes: [
            <span><Icon source="fa" icon={faInfinity} title="No Limit" /> Employees / <Icon source="fa" icon={faInfinity} title="No Limit" /> Equipments</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Custom Look</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Full 7/24 Support<span className="mention">(1)</span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Live Event Tracking</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Live Position Tracking<span className="plan-info">Via user's device<span className="mention">(3)</span></span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Live Analytics</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Operation Contracts<span className="plan-info">Transportation, Maintenance</span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Other Contracts<span className="plan-info">Insurance, Accounting</span></span>
        ]
    }
};

export default Company;
