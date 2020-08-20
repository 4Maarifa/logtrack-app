import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Range from '../../../../components/Utils/FormElements/Range/Range';

test('<Range />', () => {

  const VALUE_CHANGED_CALLBACK = jest.fn();

  const { container } = render(<Range value="50" min="0" max="100" step="10" onChange={VALUE_CHANGED_CALLBACK} />);

  // Check that value is printed correctly
  expect(container.querySelector('.Range-value')).toHaveAttribute('data-value', '50');

  // Check that min and max are printed correctly
  expect(screen.queryByText('0')).toBeInTheDocument();
  expect(screen.queryByText('100')).toBeInTheDocument();

  // Check that callback was not called yet
  expect(VALUE_CHANGED_CALLBACK).toHaveBeenCalledTimes(0);

  // Trigger change of input range
  fireEvent.change(container.querySelector('input[type="range"]'), { target: { value: 60 } });

  // Check that callback was called with new value
  expect(VALUE_CHANGED_CALLBACK).toHaveBeenCalledTimes(1);
  expect(VALUE_CHANGED_CALLBACK).toHaveBeenCalledWith('60', undefined);
});
