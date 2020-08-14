import React from 'react';
import { faEnvelope, faPlusCircle } from '@fortawesome/pro-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';

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
            <span>5 Employees / 5 Equipments</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Custom Look</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> One company specialization<span className="plan-info">Along with your tools</span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Employee Roles<span className="plan-info">Drivers, Operators, Mechanics, Insurers, Accountants, Recruiters<br/>According to company's specializations</span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Contracting &amp; Invoicing<span className="plan-info">According to company's specializations</span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Limited 7/24 Support<span className="mention">(1)</span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Live Event Tracking</span>,
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
            <span>15 Employees / 20 Equipments</span>,
            <span><Icon source="fa" icon={faPlusCircle} /> Everything in the Basic Plan</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Multiple company specializations<span className="plan-info">Giving access to all related employee roles and contracts</span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Advanced Roles<span className="plan-info">Dispatchers, Observers</span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Full 7/24 Support<span className="mention">(1)</span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Live Analytics</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Position Tracking<span className="plan-info">via user's device<span className="mention">(3)</span></span></span>
        ]
    },

    // Premium Plan
    PREMIUM: {
        disabled: true,
        name: 'Premium',
        value: 'PREMIUM',
        icon: <span>P</span>,
        solidIcon: <span>P</span>,
        price: <div><span className="plan-price-amount">Not available yet</span></div>,
        attributes: [
            <span>50 Employees / 75 Equipments</span>,
            <span><Icon source="fa" icon={faPlusCircle} /> Everything in the Standard Plan</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Live Position Tracking<span className="plan-info">Via user's device<span className="mention">(3)</span></span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Cargo Monitoring<span className="plan-info">Temperature, Pression</span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Shipment Tracking Links<span className="plan-info">Generate tracking links for your customers!</span></span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Subcontracting</span>,
            <span><Icon containerclassname="included" source="fa" icon={faCheckCircle} /> Management Console</span>,
        ]
    },

    // Custom Plan
    CUSTOM: {
        disabled: true,
        name: 'Custom',
        value: 'CUSTOM',
        icon: <span>C</span>,
        solidIcon: <span>C</span>,
        price: <div><span className="plan-price-amount">Not available yet</span></div>,
        attributes: [
            <span>Have custom needs? Need specific functionalities?</span>,
            <Link to={`/contact`}>
                <Icon source="fa" icon={faEnvelope} title="Contact Us" />
                Contact us to set up a custom plan
            </Link>,
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
