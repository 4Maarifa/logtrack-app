import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import FormInput from './../../../../components/Utils/FormElements/FormInput/FormInput';

test('<FormInput />', () => {

  const TEXT_CHANGED_CALLBACK = jest.fn();

  const { container } = render(<form>
    <FormInput value="Input Value"
                onValueChange={TEXT_CHANGED_CALLBACK}
                inputRequired />
  </form>);

  // Control that input has correct value
  expect(container.querySelector('input.input').value).toBe('Input Value');

  // Control that the listener has not been called yet
  expect(TEXT_CHANGED_CALLBACK).toHaveBeenCalledTimes(0);

  // Check that form is valid
  expect(container.querySelector('form').checkValidity()).toBeTruthy();

  // Trigger an input value change
  fireEvent.change(container.querySelector('input.input'), { target: { value: '' } });

  // Check that the new value has been returned through callback
  expect(TEXT_CHANGED_CALLBACK).toHaveBeenCalledWith('', undefined);
});

test('<FormInput /> - invalid', () => {

  const { container } = render(<form>
    <FormInput value=""
                onValueChange={jest.fn()}
                inputRequired />
  </form>);

  // Check that the form in invalid (there is no value)
  expect(container.querySelector('form').checkValidity()).toBeFalsy();
});

test('<FormInput /> - disabled - invalid', () => {

  const { container } = render(<form>
    <FormInput value=""
                onValueChange={jest.fn()}
                inputDisabled
                inputRequired />
  </form>);

  // Check that the form in invalid (there is no value)
  expect(container.querySelector('form').checkValidity()).toBeFalsy();
});
