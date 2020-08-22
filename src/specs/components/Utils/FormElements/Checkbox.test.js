import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Checkbox from './../../../../components/Utils/FormElements/Checkbox/Checkbox';

test('<Checkbox />', () => {

  const CALLBACK = jest.fn();

  const { container } = render(<form>
    <Checkbox value={true} onValueChange={CALLBACK} label="Checkbox Label" inputRequired />
  </form>);

  // Check if label is present
  expect(screen.queryByText('Checkbox Label')).toBeInTheDocument();

  // Check if checkbox is checked
  expect(container.querySelector('input[type="checkbox"]')).toBeChecked();

  // Check that callback was not called yet
  expect(CALLBACK).toHaveBeenCalledTimes(0);

  // Trigger click to check the checkbox
  fireEvent.click(container.querySelector('input[type="checkbox"]'));

  // Check that callback was called
  expect(CALLBACK).toHaveBeenCalledTimes(1);
  expect(CALLBACK).toHaveBeenCalledWith(false, undefined);
  
  // Warning: the checkbox is still checked at the time, because we did not change the value parameter.

  // Verify that the form is valid, because the checkbox is both required and checked
  expect(container.querySelector('form').checkValidity()).toBeTruthy();
});

test('<Checkbox /> - invalid', () => {
  
  const { container } = render(<form>
    <Checkbox value={false} onValueChange={jest.fn()} label="Checkbox Label" inputRequired />
  </form>);

  // Check if checkbox is not checked
  expect(container.querySelector('input[type="checkbox"]')).not.toBeChecked();
    
  // Verify that the form is invalid, because the checkbox is both required and not checked
  expect(container.querySelector('form').checkValidity()).toBeFalsy();
});

test('<Checkbox /> - disabled - invalid', () => {

  const CALLBACK = jest.fn();

  const { container } = render(<form>
    <Checkbox value={false} onValueChange={CALLBACK} label="Checkbox Label" inputRequired inputDisabled />
  </form>);

  // Check if checkbox is not checked
  expect(container.querySelector('input[type="checkbox"]')).not.toBeChecked();

  // Check that callback was not called
  expect(CALLBACK).toHaveBeenCalledTimes(0);

  // Trigger click to check the checkbox
  fireEvent.click(container.querySelector('input[type="checkbox"]'));

  // Check that callback was still not called: the input is disabled!
  expect(CALLBACK).toHaveBeenCalledTimes(0);
    
  // Verify that the form is invalid, because the checkbox is both required and not checked
  expect(container.querySelector('form').checkValidity()).toBeFalsy();
});
