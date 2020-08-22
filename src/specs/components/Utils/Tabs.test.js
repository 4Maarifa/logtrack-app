import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Tabs from './../../../components/Utils/Tabs/Tabs';

// Mocking UtilsService to stop URL listening
jest.mock('./../../../services/utils.service');

const buildTabs = CALLBACKS => ({
  tab1: { name: () => 'Tab 1', content: CALLBACKS.tab1 },
  tab2: { name: () => 'Tab 2', content: CALLBACKS.tab2 },
  tab3: { name: () => 'Tab 3', content: CALLBACKS.tab3, disabled: true }
});

test('<Tabs />', async () => {

  // Build callback for each tab
  const CALLBACKS = {
    tab1: jest.fn().mockReturnValue('Content 1'),
    tab2: jest.fn().mockReturnValue('Content 2'),
    tab3: jest.fn()
  };

  const { container } = render(<Tabs default="tab1" tabs={buildTabs(CALLBACKS)} />);

  // Check if layout is not horizontal
  expect(container.firstChild).not.toHaveClass('Tabs--horizontal');

  // Verify that all tabs are present
  expect(screen.queryByText('Tab 1')).toBeInTheDocument();
  expect(screen.queryByText('Tab 2')).toBeInTheDocument();
  expect(screen.queryByText('Tab 3')).toBeInTheDocument();

  // Verify that only the default tab content is showing
  expect(screen.queryByText('Content 1')).toBeInTheDocument();
  expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

  // Verify that only the content fn from the default tab was called
  expect(CALLBACKS.tab1).toHaveBeenCalledTimes(1);
  expect(CALLBACKS.tab2).toHaveBeenCalledTimes(0);
  expect(CALLBACKS.tab3).toHaveBeenCalledTimes(0);

  // Control that the content function of tab2 has not been called yet
  expect(CALLBACKS.tab2).toHaveBeenCalledTimes(0);

  // Change tab to tab2
  fireEvent.click(screen.getByText('Tab 2'));

  // Control that the content function of tab2 has been called yet
  expect(CALLBACKS.tab2).toHaveBeenCalledTimes(1);

  // Verify that tab has changed
  expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  expect(screen.queryByText('Content 2')).toBeInTheDocument();

  // Trigger tab change to tab3, that is disabled
  fireEvent.click(screen.getByText('Tab 3'));

  // Check that its content function has not been called
  expect(CALLBACKS.tab3).toHaveBeenCalledTimes(0);

  // Check that we are still on tab 2
  expect(screen.queryByText('Content 2')).toBeInTheDocument();
});

test('<Tabs /> - horizontal', () => {

  // Build callback for each tab
  const CALLBACKS = {
    tab1: jest.fn().mockReturnValue('Content 1'),
    tab2: jest.fn().mockReturnValue('Content 2'),
    tab3: jest.fn()
  };

  const { container } = render(<Tabs isHorizontalLayout default="tab1" tabs={buildTabs(CALLBACKS)} />);

  // Check if layout is horizontal
  expect(container.firstChild).toHaveClass('Tabs--horizontal');

  // Verify that all tabs are present
  expect(screen.queryByText('Tab 1')).toBeInTheDocument();
  expect(screen.queryByText('Tab 2')).toBeInTheDocument();
  expect(screen.queryByText('Tab 3')).toBeInTheDocument();

  // Verify that only the default tab content is showing
  expect(screen.queryByText('Content 1')).toBeInTheDocument();
  expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

  // Verify that only the content fn from the default tab was called
  expect(CALLBACKS.tab1).toHaveBeenCalledTimes(1);
  expect(CALLBACKS.tab2).toHaveBeenCalledTimes(0);
  expect(CALLBACKS.tab3).toHaveBeenCalledTimes(0);

  // Control that the content function of tab2 has not been called yet
  expect(CALLBACKS.tab2).toHaveBeenCalledTimes(0);

  // Change tab to tab2
  fireEvent.click(screen.getByText('Tab 2'));

  // Control that the content function of tab2 has been called yet
  expect(CALLBACKS.tab2).toHaveBeenCalledTimes(1);

  // Verify that tab has changed
  expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  expect(screen.queryByText('Content 2')).toBeInTheDocument();

  // Trigger tab change to tab3, that is disabled
  fireEvent.click(screen.getByText('Tab 3'));

  // Check that its content function has not been called
  expect(CALLBACKS.tab3).toHaveBeenCalledTimes(0);

  // Check that we are still on tab 2
  expect(screen.queryByText('Content 2')).toBeInTheDocument();
});
