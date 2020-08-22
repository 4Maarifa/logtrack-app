import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Radio from './../../../../components/Utils/FormElements/Radio/Radio';

test('<Radio />', () => {

  const VALUE_CHANGED_CALLBACK = jest.fn();

  const { container } = render(<form>
    <Radio fieldName="radio1" value="radio1" inputName="radioGroup" onValueChange={VALUE_CHANGED_CALLBACK} inputRequired />
    <Radio fieldName="radio2" value="radio1" inputName="radioGroup" onValueChange={VALUE_CHANGED_CALLBACK} inputRequired />
    <Radio fieldName="radio3" value="radio1" inputName="radioGroup" inputDisabled onValueChange={VALUE_CHANGED_CALLBACK} inputRequired />
  </form>);

  // Check that only the radio 1 is checked
  expect(container.querySelector('.input-radio1 input[type="radio"]')).toBeChecked();
  expect(container.querySelector('.input-radio2 input[type="radio"]')).not.toBeChecked();
  expect(container.querySelector('.input-radio3 input[type="radio"]')).not.toBeChecked();

  // Check that callback was not called yet
  expect(VALUE_CHANGED_CALLBACK).toHaveBeenCalledTimes(0);

  // Trigger click on radio 2
  fireEvent.click(container.querySelector('.input-radio2 input[type="radio"]'));

  // Check that callback was called
  expect(VALUE_CHANGED_CALLBACK).toHaveBeenCalledTimes(1);
  expect(VALUE_CHANGED_CALLBACK).toHaveBeenCalledWith('radio2', 'radioGroup');

  // Check that form is valid
  expect(container.querySelector('form').checkValidity()).toBeTruthy();

  // Trigger click on radio 3
  fireEvent.click(container.querySelector('.input-radio3 input[type="radio"]'));

  // Check that callback was not called again (radio 3 is disabled)
  expect(VALUE_CHANGED_CALLBACK).toHaveBeenCalledTimes(1);
});

test('<Radio /> - invalid', () => {

  const { container } = render(<form>
    <Radio fieldName="radio1" value={null} inputName="radioGroup" onValueChange={jest.fn()} inputRequired />
  </form>);

  // Check that form is invalid
  expect(container.querySelector('form').checkValidity()).toBeFalsy();
});
