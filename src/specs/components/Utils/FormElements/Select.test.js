import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Select from './../../../../components/Utils/FormElements/Select/Select';

const POSSIBLE_ITEMS = {
  item1: { content: 'Item 1' },
  item2: { content: 'Item 2' }
};

test('<Select /> - invalid', () => {

  const SELECTED_ITEM_CALLBACK = jest.fn();

  const { container } = render(<form>
    <Select possibleItems={POSSIBLE_ITEMS}
            inputRequired
            searchFn={(key, _, searchTerm) => !searchTerm || key === 'item1'}
            onSelectedItemChange={SELECTED_ITEM_CALLBACK} />
  </form>);

  // Check that form is not valid
  expect(container.querySelector('form').checkValidity()).toBeFalsy();

  // Control that the possible items list is not deployed
  expect(container.querySelector('ul.items')).not.toBeInTheDocument();

  // Focus on the select button (click does not focus the element)
  fireEvent.focus(screen.getByRole('button'));

  // Check that list is deployed
  expect(container.querySelector('ul.items')).toBeInTheDocument();

  // Check that both items are present
  expect(screen.queryByText('Item 1')).toBeInTheDocument();
  expect(screen.queryByText('Item 2')).toBeInTheDocument();

  // Enter search term to filter item 2
  fireEvent.change(container.querySelector('.input-search input.input'), { target: { value: 'test' } });

  // Check that only item1 is present
  expect(screen.queryByText('Item 1')).toBeInTheDocument();
  expect(screen.queryByText('Item 2')).not.toBeInTheDocument();

  // Remove search criteria
  fireEvent.change(container.querySelector('.input-search input.input'), { target: { value: '' } });

  // Check that both items are still present
  expect(screen.queryByText('Item 1')).toBeInTheDocument();
  expect(screen.queryByText('Item 2')).toBeInTheDocument();

  // Verify that callback has not been called yet
  expect(SELECTED_ITEM_CALLBACK).toHaveBeenCalledTimes(0);

  // Click on item 1
  fireEvent.click(screen.getByText('Item 1'));

  // Remove focus on select component
  fireEvent.blur(screen.getByRole('button'));

  // Control that the possible items list is not deployed
  waitFor(() => expect(container.querySelector('ul.items')).not.toBeInTheDocument());

  // Check that the callback was called with correct arguments
  expect(SELECTED_ITEM_CALLBACK).toHaveBeenCalledTimes(1);
  expect(SELECTED_ITEM_CALLBACK).toHaveBeenCalledWith('item1', undefined, POSSIBLE_ITEMS.item1);
});

test('<Select /> - valid', () => {

  const SELECTED_ITEM_CALLBACK = jest.fn();

  const { container } = render(<form>
    <Select possibleItems={POSSIBLE_ITEMS}
            selectedItemKey="item1"
            selectedItem={POSSIBLE_ITEMS.item1}
            inputRequired
            onSelectedItemChange={SELECTED_ITEM_CALLBACK} />
  </form>);

  // Check that the selected item is correctly printed
  expect(screen.queryByText('Item 1')).toBeInTheDocument();

  // Check that the form is valid
  expect(container.querySelector('form').checkValidity()).toBeTruthy();

  // Focus the select button to expand list
  fireEvent.focus(screen.getByRole('button'));

  // Check that list is deployed
  expect(container.querySelector('ul.items')).toBeInTheDocument();

  // Verify that the callback has not been called yet
  expect(SELECTED_ITEM_CALLBACK).toHaveBeenCalledTimes(0);

  // Click on item 2
  fireEvent.click(screen.getByText('Item 2'));
  
  // Remove focus on select component
  fireEvent.blur(screen.getByRole('button'));

  // Control that the possible items list is not deployed
  waitFor(() => expect(container.querySelector('ul.items')).not.toBeInTheDocument());

  // Check that the callback was called with correct arguments
  expect(SELECTED_ITEM_CALLBACK).toHaveBeenCalledTimes(1);
  expect(SELECTED_ITEM_CALLBACK).toHaveBeenCalledWith('item2', undefined, POSSIBLE_ITEMS.item2);
});
