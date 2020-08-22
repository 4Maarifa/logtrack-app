import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Switch from './../../../../components/Utils/FormElements/Switch/Switch';

test('<Switch />', () => {

  const VALUE_CHANGED_CALLBACK = jest.fn();

  const { container } = render(<Switch value={true} onChange={VALUE_CHANGED_CALLBACK} />);

  // Check that the switch display a true value
  expect(container.querySelector('input[type="checkbox"]')).toBeChecked();

  // Check that the callback has not been called yet
  expect(VALUE_CHANGED_CALLBACK).toBeCalledTimes(0);

  // Trigger a click
  fireEvent.click(container.querySelector('label.Switch-indicator'));

  // Check that the callback was called with correct values
  expect(VALUE_CHANGED_CALLBACK).toBeCalledTimes(1);
  expect(VALUE_CHANGED_CALLBACK).toBeCalledWith(false, undefined);
});
