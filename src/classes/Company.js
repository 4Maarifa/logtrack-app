import React from 'react';
import { faInfinity, faEnvelope } from '@fortawesome/pro-regular-svg-icons';
import { faCircle, faTimesCircle, faCheckCircle } from '@fortawesome/pro-light-svg-icons';

import Icon from './../components/Utils/Icon/Icon';

import { ERole } from './Role';

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

/**
 * Enum: ECompanyPlan
 * Describes all available plans for companies
 * 
 * disabled: boolean | if plan can be selected or not
 * name: string | printable name of the plan
 * value: string | storable name of the plan
 * icon: HTMLElement or FA/IconDefinition | Printable icon of the plan, light
 * solidIcon: HTMLElement or FA/IconDefinition | Printable icon of the plan, solid
 */
export const ECompanyPlan = {

    // Basic plan
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

    // Standard Plan
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

    // Premium Plan
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
    },

    // Custom Plan
    CUSTOM: {
        disable: true,
        name: 'Custom',
        value: 'CUSTOM',
        icon: <span>C</span>,
        solidIcon: <span>C</span>,
        price: <div><span className="plan-price-amount">N/A</span></div>,
        attributes: [
            <span><Icon source="fa" icon={faEnvelope} title="Contact Us" /> Contact Us to set up a custom plan</span>
        ]
    }
};

/**
 * class: JobOffer
 * describes a job offer for a specified company
 * 
 * title: string | Title of the job offer
 * description: string | Description of the job offer
 * role: ERole | Specified role
 * companyId: string | Job Offer proposed by this company
 * creator: string | Creator of the job offer (employeeId)
 * creationIsoDate: string | Creation date, as iso string
 * status: EJobOfferStatus | Status of the job offer
 */
export class JobOffer {
    constructor(title, description, role, companyId, creator, creationIsoDate, status) {
        this.title = title;
        this.description = description;
        this.role = ERole[role];
        this.companyId = companyId;
        this.creator = creator;
        this.creationIsoDate = creationIsoDate;
        this.status = EJobOfferStatus[status];
    }
}

/**
 * Enum: EJobOfferStatus
 * Describes the status of a job offer
 * 
 */
export const EJobOfferStatus = {
    // Visible to everyone, the company is actively looking for candidates
    OPENED: 'OPENED',

    // TODO: Private

    // Closed, the company is selecting / has already selected the future employee
    CLOSED: 'CLOSED'
};

export default Company;
