import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ActionList from './../../../components/Utils/ActionList/ActionList';

const builtTestActions = callback => [
  { title: 'Action 1', icon: 'Icon', callback },
  { title: 'Action 2', icon: 'Icon', callback}
];

test('<ActionList />', () => {

  const ACTION_CALLBACK = jest.fn();

  const { container } = render(<ActionList actions={builtTestActions(ACTION_CALLBACK)} />);

  expect(ACTION_CALLBACK).toHaveBeenCalledTimes(0);

  // Verify that ActionList is not deployed
  expect(container.firstChild).not.toHaveClass('ActionList--deployed');

  // Verify that actions are present (even if the button is not triggered)
  expect(screen.queryByText('Action 1')).toBeInTheDocument();
  expect(screen.queryByText('Action 2')).toBeInTheDocument();

  // Deploy list
  fireEvent.click(screen.getByTestId('trigger'));

  // Verify that ActionList is deployed
  expect(container.firstChild).toHaveClass('ActionList--deployed');

  // Trigger action 1
  fireEvent.click(screen.getByText('Action 1'));

  // Verify that the callback has been called
  expect(ACTION_CALLBACK).toHaveBeenCalledTimes(1);
});
