import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import UtilsService from './../../../services/utils.service';

import ExTable, { EXTABLE_VIEWS } from './../../../components/Utils/ExTable/ExTable';

const ITEMS = {
  item1: 'content 1',
  item2: 'content 2'
};

const FSS = {
  filter: {
    content1: {
      title: 'Filter to Content 1',
      apply: (_, itemData) => itemData === 'content 1'
    }
  },
  search: (_, itemData, searchTerm) => itemData.toLowerCase().includes(searchTerm.toLowerCase()),
  sort: {
    name: {
      title: 'Sort by name',
      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(ITEMS[key1], ITEMS[key2])
      )),
      default: true
    }
  }
};

const RENDER_ITEM = (_, itemData) => <span>{itemData}</span>;

test('<ExTable loading />', () => {

  // Render an ExTable that is loading
  render(<ExTable loading />);

  // Verify that ExTable is loading
  expect(screen.queryByTestId('loader')).toBeInTheDocument();
});

test('<ExTable />', () => {

  // Render an ExTable that is not loading
  const { container } = render(<ExTable header="header" items={ITEMS} renderItem={RENDER_ITEM} defaultView={EXTABLE_VIEWS.CONDENSED} fss={FSS} />);

  // Verify that ExTable is not loading anymore
  expect(screen.queryByTestId('loader')).not.toBeInTheDocument();

  // Verify that header is present
  expect(screen.queryByText('header')).toBeInTheDocument();

  // Verify default view of ExTable
  expect(container.firstChild).toHaveClass('ExTable--condensed');

  // Change view
  fireEvent.click(screen.getByTitle('Items'));

  // Verify that view has changed
  expect(container.firstChild).toHaveClass('ExTable--items');

  // Verify that both items are present
  expect(screen.queryByText('content 1')).toBeInTheDocument();
  expect(screen.queryByText('content 2')).toBeInTheDocument();

  // Verify that Filter and Sort are present
  expect(screen.queryByText('Filter to Content 1')).toBeInTheDocument();
  expect(screen.queryByText('Sort by name')).toBeInTheDocument();

  // Trigger search
  const SEARCH_INPUT = container.querySelector('.input-search input.input');
  fireEvent.change(SEARCH_INPUT, { target: { value: 'content 1' } });

  // Control that only item1 is present
  expect(screen.queryByText('content 1')).toBeInTheDocument();
  expect(screen.queryByText('content 2')).not.toBeInTheDocument();

  // Reset search input
  fireEvent.change(SEARCH_INPUT, { target: { value: '' } });

  // Re-control that both items are present
  expect(screen.queryByText('content 1')).toBeInTheDocument();
  expect(screen.queryByText('content 2')).toBeInTheDocument();

  // Check initial order
  const INITIAL_ORDER_ITEMS = container.firstChild.getElementsByClassName('Element');

  // Check that item 1 is before item 2
  expect(INITIAL_ORDER_ITEMS[0].firstChild.innerHTML).toBe('content 1');
  expect(INITIAL_ORDER_ITEMS[1].firstChild.innerHTML).toBe('content 2');

  // Inverse the order
  fireEvent.click(screen.getByTitle('Change Sorting Direction'));

  const ORDERED_ITEMS = container.firstChild.getElementsByClassName('Element');

  // Check that item 1 is after item 2
  expect(ORDERED_ITEMS[0].firstChild.innerHTML).toBe('content 2');
  expect(ORDERED_ITEMS[1].firstChild.innerHTML).toBe('content 1');

  // Get the select filter
  const SELECT_FILTER = screen.getByTitle('Change Filter');
  
  // Change filter to the content1 filter
  fireEvent.change(SELECT_FILTER, { target: { value: 'content1' } });
  
  // Verify that content2 is filtered and is not present
  expect(screen.queryByText('content 1')).toBeInTheDocument();
  expect(screen.queryByText('content 2')).not.toBeInTheDocument();
});
