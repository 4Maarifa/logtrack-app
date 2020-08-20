import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import FormInputFile from './../../../../components/Utils/FormElements/FormInputFile/FormInputFile';

const FILE_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

test('<FormInputFile />', () => {

  const FILE_CHANGED_CALLBACK = jest.fn();

  const { container } = render(<form>
    <FormInputFile value={{ file: new File(['IMAGE_DATA'], 'profile.jpg', { type: 'image/gif', }), url: FILE_URL }}
                    onValueChange={FILE_CHANGED_CALLBACK}
                    imagePreview
                    inputRequired />
  </form>);

  // Control that the image preview has correct value
  expect(container.querySelector('img')).toHaveAttribute('src', FILE_URL);

  // Check that form is valid
  expect(container.querySelector('form').checkValidity()).toBeTruthy();

  // Control that the listener has not been called yet
  expect(FILE_CHANGED_CALLBACK).toHaveBeenCalledTimes(0);

  // Trigger an input value change
  fireEvent.change(container.querySelector('input[type="file"]'), { target: { files: [] } });

  // Check that the new value has been returned through callback
  expect(FILE_CHANGED_CALLBACK).toHaveBeenCalledWith(null, undefined);
});

test('<FormInputFile /> - invalid', () => {

  const { container } = render(<form>
    <FormInputFile value={null}
                    onValueChange={jest.fn()}
                    imagePreview
                    inputRequired />
  </form>);

  // Check that form is invalid (no value)
  expect(container.querySelector('form').checkValidity()).toBeFalsy();
});
