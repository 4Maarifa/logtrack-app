import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import FormDebounceInput from './../../../../components/Utils/FormElements/FormDebounceInput/FormDebounceInput';

test('<FormDebounceInput />', async () => {

  const TEXT_CHANGED_CALLBACK = jest.fn();

  const { container } = render(<form>
    <FormDebounceInput value="Input Value"
                        onValueChange={TEXT_CHANGED_CALLBACK}
                        inputRequired />
  </form>);

  // Control that input has correct value
  expect(container.querySelector('input.input').value).toBe('Input Value');

  // Control that the listener has not been called yet
  expect(TEXT_CHANGED_CALLBACK).toHaveBeenCalledTimes(0);

  // Check that form is valid
  expect(container.querySelector('form').checkValidity()).toBeTruthy();

  // Launch Timer
  const TIMER_START = +new Date();

  // Trigger an input value change
  fireEvent.change(container.querySelector('input.input'), { target: { value: '' } });

  // Control that the listener has not been called yet
  await waitFor(() => expect(TEXT_CHANGED_CALLBACK).toHaveBeenCalledTimes(1), { timeout: 5000 });

  // Stop Timer and compute difference
  const TIMER_STOP = +new Date();
  const TIMER_TIME = TIMER_STOP - TIMER_START;

  // Check for debounce time
  expect(TIMER_TIME).toBeGreaterThan(1000);
  expect(TIMER_TIME).toBeLessThan(1500);

  // Check that the new value has been returned through callback
  expect(TEXT_CHANGED_CALLBACK).toHaveBeenCalledWith('', undefined);
});

test('<FormDebounceInput /> - invalid', () => {

  const { container } = render(<form>
    <FormDebounceInput value=""
                        onValueChange={jest.fn()}
                        inputRequired />
  </form>);

  // Check that the form in invalid (there is no value)
  expect(container.querySelector('form').checkValidity()).toBeFalsy();
});
