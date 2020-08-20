import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PageLink, { PageLinkType } from './../../../components/Utils/PageLink/PageLink';

import { ECompanyPlan } from './../../../classes/Company';

jest.mock('./../../../services/data.service');

const COMPANY = {
  name: 'Company',
  logoURL: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=',
  plan: ECompanyPlan.BASIC.value
};

const CONTRACT = {
  identification: 'Contract 1'
};

const EMPLOYEE = {
  profilePictureUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=',
  firstname: 'John',
  lastname: 'Doe'
};

const EQUIPMENT = {
  identification: 'Equipment 1'
};

const JOBOFFER = {
  title: 'Job Offer 1'
};

const WAREHOUSE = {
  name: 'Warehouse 1'
};

test('<PageLink /> - company', () => {
  const { container } = render(<Router>
    <PageLink type={PageLinkType.COMPANY} entityId="-1" entityData={COMPANY} />
  </Router>);

  // Check if company is printed
  expect(screen.queryByText(COMPANY.name)).toBeInTheDocument();

  // Verify that there is a link
  expect(container.querySelector('a')).toBeInTheDocument();

  // Verify that the link is pointing to the Company Page
  expect(container.firstChild).toHaveAttribute('href', '/company/-1');

  // Check if the picture is printed
  expect(container.firstChild.querySelector('img')).toHaveAttribute('src', COMPANY.logoURL);
});

test('<PageLink /> - company - noLink - white - noPhoto', () => {
  const { container } = render(<Router>
    <PageLink type={PageLinkType.COMPANY} entityId="-1" entityData={COMPANY} white noPhoto noLink />
  </Router>);

  // Check if company is printed
  expect(screen.queryByText(COMPANY.name)).toBeInTheDocument();

  // Verify that there is no link
  expect(container.querySelector('a')).not.toBeInTheDocument();

  // Verify that the PageLink is white
  expect(container.firstChild).toHaveClass('PageLink-white');

  // Verify that there is no picture
  expect(container.querySelector('img')).not.toBeInTheDocument();
});

test('<PageLink /> - contract', () => {
  const { container } = render(<Router>
    <PageLink type={PageLinkType.CONTRACT} entityId="-1" entityData={CONTRACT} />
  </Router>);

  // Check if contract is printed
  expect(screen.queryByText(CONTRACT.identification)).toBeInTheDocument();

  // Verify that there is a link
  expect(container.querySelector('a')).toBeInTheDocument();

  // Verify that the link is pointing to the Contract Page
  expect(container.firstChild).toHaveAttribute('href', '/contract/-1');  
});

test('<PageLink /> - employee', () => {
  const { container } = render(<Router>
    <PageLink type={PageLinkType.EMPLOYEE} entityId="---------------" entityData={EMPLOYEE} />
  </Router>);

  // Check if employee is printed
  expect(screen.queryByText(EMPLOYEE.firstname + ' ' + EMPLOYEE.lastname)).toBeInTheDocument();

  // Verify that there is a link
  expect(container.querySelector('a')).toBeInTheDocument();

  // Verify that the link is pointing to the Employee Page
  expect(container.firstChild).toHaveAttribute('href', '/employee/---------------');

  // Check if the picture is printed
  expect(container.firstChild.querySelector('img')).toHaveAttribute('src', EMPLOYEE.profilePictureUrl);

  // Verify that the 'YOU' badge is appearing (same user as the one that is connected in DataService)
  expect(screen.queryByText('you')).toBeInTheDocument();
});

test('<PageLink /> - equipment', () => {
  const { container } = render(<Router>
    <PageLink type={PageLinkType.EQUIPMENT} entityId="-1" entityData={EQUIPMENT} />
  </Router>);

  // Check if equipment is printed
  expect(screen.queryByText(EQUIPMENT.identification)).toBeInTheDocument();

  // Verify that there is a link
  expect(container.querySelector('a')).toBeInTheDocument();

  // Verify that the link is pointing to the Equipment Page
  expect(container.firstChild).toHaveAttribute('href', '/equipment/-1'); 
});

test('<PageLink /> - job offer', () => {
  const { container } = render(<Router>
    <PageLink type={PageLinkType.JOBOFFER} entityId="-1" entityData={JOBOFFER} />
  </Router>);

  // Check if job offer is printed
  expect(screen.queryByText(JOBOFFER.title)).toBeInTheDocument();

  // Verify that there is a link
  expect(container.querySelector('a')).toBeInTheDocument();

  // Verify that the link is pointing to the JobOffer Page
  expect(container.firstChild).toHaveAttribute('href', '/joboffer/-1'); 
});

test('<PageLink /> - warehouse', () => {
  const { container } = render(<Router>
    <PageLink type={PageLinkType.WAREHOUSE} entityId="-1" entityData={WAREHOUSE} />
  </Router>);

  // Check if warehouse is printed
  expect(screen.queryByText(WAREHOUSE.name)).toBeInTheDocument();

  // Verify that there is a link
  expect(container.querySelector('a')).toBeInTheDocument();

  // Verify that the link is pointing to the Warehouse Page
  expect(container.firstChild).toHaveAttribute('href', '/warehouse/-1'); 
});
