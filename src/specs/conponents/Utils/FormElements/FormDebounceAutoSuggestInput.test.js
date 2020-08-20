import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import FormDebounceAutoSuggestInput from './../../../../components/Utils/FormElements/FormDebounceAutoSuggestInput/FormDebounceAutoSuggestInput';

const POSSIBLE_ITEMS = {
  item1: { content: 'Item 1' },
  item2: { content: 'Item 2' }
};

test('<FormDebounceAutoSuggestInput /> - invalid', async () => {
  
  const TEXT_CHANGED_CALLBACK = jest.fn();
  const SELECTED_ITEM_CHANGED_CALLBACK = jest.fn();

  const { container } = render(<form>
    <FormDebounceAutoSuggestInput value="Search Value"
                                  possibleItems={POSSIBLE_ITEMS}
                                  inputRequired
                                  onValueChange={TEXT_CHANGED_CALLBACK}
                                  onSelectedItemChange={SELECTED_ITEM_CHANGED_CALLBACK} />
  </form>);
  
  // Control that the search value is present
  expect(container.querySelector('input.input').value).toBe('Search Value');

  // Control that the possible items list is deployed
  expect(container.querySelector('ul.items')).toBeInTheDocument();

  // Control that both items are present
  expect(screen.queryByText('Item 1')).toBeInTheDocument();
  expect(screen.queryByText('Item 2')).toBeInTheDocument();

  // Control that the Text changed listener was not called
  expect(TEXT_CHANGED_CALLBACK).toHaveBeenCalledTimes(0);

  // Launch timer
  const TIMER_START = +new Date();

  // Modify input value
  fireEvent.change(container.querySelector('input.input'), { target: { value: '' } });

  // Control that the search value listener was called
  await waitFor(() => expect(TEXT_CHANGED_CALLBACK).toHaveBeenCalledTimes(1), { timeout: 5000 });
  expect(TEXT_CHANGED_CALLBACK).toHaveBeenCalledWith('', undefined);

  // Stop timer
  const TIMER_STOP = +new Date();
  const TIMER_TIME = TIMER_STOP - TIMER_START;

  // Check for debounce time
  expect(TIMER_TIME).toBeGreaterThan(1000);
  expect(TIMER_TIME).toBeLessThan(1500);

  // Check that the form in invalid (there is no selected item)
  expect(container.querySelector('form').checkValidity()).toBeFalsy();
});

test('<FormDebounceAutoSuggestInput /> - valid', async () => {
  
  const TEXT_CHANGED_CALLBACK = jest.fn();
  const SELECTED_ITEM_CHANGED_CALLBACK = jest.fn();

  const { container } = render(<form>
    <FormDebounceAutoSuggestInput value="Search Value"
                                  possibleItems={POSSIBLE_ITEMS}
                                  inputRequired
                                  selectedItemKey="item1"
                                  selectedItem={POSSIBLE_ITEMS.item1}
                                  onValueChange={TEXT_CHANGED_CALLBACK}
                                  onSelectedItemChange={SELECTED_ITEM_CHANGED_CALLBACK} />
  </form>);
  
  // Check that the search value is not printed anymore
  expect(container.querySelector('input.input')).not.toBeInTheDocument();

  // Check that the possible items list is not printed anymore
  expect(container.querySelector('ul.items')).not.toBeInTheDocument();

  // Check that the selected item is printed, as well as the reset button
  expect(screen.queryByText('Item 1')).toBeInTheDocument();
  expect(container.querySelector('.selected-item span.action')).toBeInTheDocument();

  // Check that the form in valid
  expect(container.querySelector('form').checkValidity()).toBeTruthy();

  // Verify that listeners have not been called yet
  expect(TEXT_CHANGED_CALLBACK).toHaveBeenCalledTimes(0);
  expect(SELECTED_ITEM_CHANGED_CALLBACK).toHaveBeenCalledTimes(0);

  // Click on reset button
  fireEvent.click(container.querySelector('.selected-item span.action'));

  // Check that the reset button call both listeners
  expect(TEXT_CHANGED_CALLBACK).toHaveBeenCalledTimes(1);
  expect(TEXT_CHANGED_CALLBACK).toHaveBeenCalledWith('', undefined);

  expect(SELECTED_ITEM_CHANGED_CALLBACK).toHaveBeenCalledTimes(1);
  expect(SELECTED_ITEM_CHANGED_CALLBACK).toHaveBeenCalledWith('', undefined, null);
});
