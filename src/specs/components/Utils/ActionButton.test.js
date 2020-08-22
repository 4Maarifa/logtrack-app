import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ActionButton from './../../../components/Utils/ActionButton/ActionButton';

const builtTestActions = callback => [
  { title: 'Action 1', icon: 'Icon', callback },
  { title: 'Action 2', icon: 'Icon', callback}
];

test('<ActionButton />', () => {

  const ACTION_CALLBACK = jest.fn();

  const { container } = render(<ActionButton icon="test" actions={builtTestActions(ACTION_CALLBACK)} />);

  expect(ACTION_CALLBACK).toHaveBeenCalledTimes(0);

  // Verify that button is present
  expect(screen.queryByText('test')).toBeInTheDocument();

  // Verify that ActionButton is not deployed
  expect(container.firstChild).not.toHaveClass('ActionButton--deployed');

  // Verify that actions are present (even if the button is not triggered)
  expect(screen.queryByText('Action 1')).toBeInTheDocument();
  expect(screen.queryByText('Action 2')).toBeInTheDocument();

  // Deploy button
  fireEvent.click(screen.getByText('test'));

  // Verify that ActionButton is deployed
  expect(container.firstChild).toHaveClass('ActionButton--deployed');

  // Click on action 1
  fireEvent.click(screen.getByText('Action 1'));

  // Verify that the callback has been called
  expect(ACTION_CALLBACK).toHaveBeenCalledTimes(1);

  // Click on action 2
  fireEvent.click(screen.getByText('Action 2'));

  // Verify that the callback has been called
  expect(ACTION_CALLBACK).toHaveBeenCalledTimes(2);
});
