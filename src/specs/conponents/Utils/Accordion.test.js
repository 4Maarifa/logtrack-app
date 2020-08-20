import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Accordion from './../../../components/Utils/Accordion/Accordion';

const TEST_ITEMS = {
  id1: {
    name: () => 'Tab 1',
    content: () => <span>Content 1</span>
  },
  id2: {
    name: () => 'Tab 2',
    content: () => <span>Content 2</span>
  }
};

test('<Accordion />', () => {

  render(<Accordion items={TEST_ITEMS} default="id1" />);

  // Verify both tabs
  expect(screen.queryByText('Tab 1')).toBeInTheDocument();
  expect(screen.queryByText('Tab 2')).toBeInTheDocument();

  // Verif in default tab is really extended
  expect(screen.queryByText('Content 1')).toBeInTheDocument();
  expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

  // Click on tab 2
  fireEvent.click(screen.getByText('Tab 2'));

  // Verify if the tab 2 is really extended
  expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  expect(screen.queryByText('Content 2')).toBeInTheDocument();
});
