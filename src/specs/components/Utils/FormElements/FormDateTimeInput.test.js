import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import FormDateTimeInput from './../../../../components/Utils/FormElements/FormDateTimeInput/FormDateTimeInput';

test('<FormDateTimeInput />', () => {

  const DATE_CHANGED_CALLBACK = jest.fn();

  const DATE = new Date(2020, 1, 1, 15, 0, 0);
  const DATE_2 = new Date(2020, 1, 1, 17, 0, 0);

  const { container } = render(<FormDateTimeInput value={DATE}
                                                  onValueChange={DATE_CHANGED_CALLBACK} />);

  // Check input value
  expect(container.querySelector('input[name="datetime"]').value).toBe('2020-02-01T15:00');

  // Check that callback has not been called yet
  expect(DATE_CHANGED_CALLBACK).toHaveBeenCalledTimes(0);

  // Change date value
  fireEvent.change(container.querySelector('input[name="datetime"]'), { target: { value: '2020-02-01T17:00' }});

  // Check that callback has been called
  expect(DATE_CHANGED_CALLBACK).toHaveBeenCalledTimes(1);
  expect(DATE_CHANGED_CALLBACK).toHaveBeenCalledWith(DATE_2);

});
