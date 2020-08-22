import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import UtilsService from './../../../services/utils.service';

import ActionLink from './../../../components/Utils/ActionLink/ActionLink';

let updateObserversFn = null;

beforeAll(() => {
  updateObserversFn = spyOn(UtilsService.url, 'updateObservers');
});

test('<ActionLink />', () => {
  const { container } = render(<ActionLink content="content" url="/" className="specificClass" />);

  // Verify that content is present
  expect(screen.queryByText('content')).toBeInTheDocument();

  // Verify that the class has been set
  expect(container.firstChild).toHaveClass('specificClass');

  // Verify the updateObservers function spy
  expect(updateObserversFn).toHaveBeenCalledTimes(0);

  // Click on the link
  fireEvent.click(screen.getByText('content'));

  // Verify that the updateObservers spy has been called
  expect(updateObserversFn).toHaveBeenCalledTimes(1);
});
