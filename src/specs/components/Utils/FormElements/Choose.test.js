import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Choose from './../../../../components/Utils/FormElements/Choose/Choose';

const buildItems = CALLBACKS => ({
  item1: { content: CALLBACKS.item1 },
  item2: { content: CALLBACKS.item2 },
  item3: { content: CALLBACKS.item3, disabled: true },
  item4: { content: CALLBACKS.item4, color: '#4285F4' }
});

test('<Choose /> - single - vertical', () => {

  const CALLBACKS = {
    item1: jest.fn().mockReturnValue('Item 1'),
    item2: jest.fn().mockReturnValue('Item 2'),
    item3: jest.fn().mockReturnValue('Item 3'),
    item4: jest.fn().mockReturnValue('Item 4'),
  };

  const CHOOSE_CALLBACK = jest.fn();

  const { container } = render(<Choose items={buildItems(CALLBACKS)}
                                      isVertical
                                      selection="item1"
                                      onSelectionChange={CHOOSE_CALLBACK} />);

  // Verify that the layout is vertical
  expect(container.firstChild).toHaveClass('Choose--vertical');

  // Verify that all items are present
  expect(screen.queryByText('Item 1')).toBeInTheDocument();
  expect(screen.queryByText('Item 2')).toBeInTheDocument();
  expect(screen.queryByText('Item 3')).toBeInTheDocument();
  expect(screen.queryByText('Item 4')).toBeInTheDocument();

  // Verify that only Item 1 is selected
  expect(screen.getByText('Item 1')).toHaveClass('li--active');
  expect(screen.getByText('Item 2')).not.toHaveClass('li--active');
  expect(screen.getByText('Item 3')).not.toHaveClass('li--active');
  expect(screen.getByText('Item 4')).not.toHaveClass('li--active');

  // Control that change listener has not been called yet
  expect(CHOOSE_CALLBACK).toHaveBeenCalledTimes(0);

  // Click on item 2
  fireEvent.click(screen.getByText('Item 2'));

  // Control that change listener has been called
  expect(CHOOSE_CALLBACK).toHaveBeenCalledTimes(1);
  expect(CHOOSE_CALLBACK).toHaveBeenCalledWith('item2', undefined);
});

test('<Choose /> - multiple - valid', () => {

  const CALLBACKS = {
    item1: jest.fn().mockReturnValue('Item 1'),
    item2: jest.fn().mockReturnValue('Item 2'),
    item3: jest.fn().mockReturnValue('Item 3'),
    item4: jest.fn().mockReturnValue('Item 4'),
  };

  const CHOOSE_CALLBACK = jest.fn();

  const { container } = render(<form>
    <Choose items={buildItems(CALLBACKS)}
            multiple
            selection={[ 'item1', 'item3' ]}
            onSelectionChange={CHOOSE_CALLBACK}
            selectionRequired />
  </form>);

  // Verify that the layout is not vertical
  expect(container.firstChild).not.toHaveClass('Choose--vertical');

  // Verify that all items are present
  expect(screen.queryByText('Item 1')).toBeInTheDocument();
  expect(screen.queryByText('Item 2')).toBeInTheDocument();
  expect(screen.queryByText('Item 3')).toBeInTheDocument();
  expect(screen.queryByText('Item 4')).toBeInTheDocument();

  // Verify that both Item 1 and Item 3 are selected
  expect(screen.getByText('Item 1')).toHaveClass('li--active');
  expect(screen.getByText('Item 2')).not.toHaveClass('li--active');
  expect(screen.getByText('Item 3')).toHaveClass('li--active');
  expect(screen.getByText('Item 4')).not.toHaveClass('li--active');

  // Control that change listener has not been called yet
  expect(CHOOSE_CALLBACK).toHaveBeenCalledTimes(0);

  // Click on item 2
  fireEvent.click(screen.getByText('Item 2'));

  // Control that change listener has been called
  expect(CHOOSE_CALLBACK).toHaveBeenCalledTimes(1);
  expect(CHOOSE_CALLBACK).toHaveBeenCalledWith(['item1', 'item3', 'item2'], undefined);

  // Control that form is valid
  expect(container.querySelector('form').checkValidity()).toBeTruthy();
});

test('<Choose /> - single - invalid', () => {

  const CALLBACKS = {
    item1: jest.fn().mockReturnValue('Item 1'),
    item2: jest.fn().mockReturnValue('Item 2'),
    item3: jest.fn().mockReturnValue('Item 3'),
    item4: jest.fn().mockReturnValue('Item 4'),
  };

  const CHOOSE_CALLBACK = jest.fn();

  const { container } = render(<form>
      <Choose items={buildItems(CALLBACKS)}
            selection={null}
            onSelectionChange={CHOOSE_CALLBACK}
            selectionRequired />
    </form>);

  // Verify that the layout is vertical
  expect(container.firstChild).not.toHaveClass('Choose--vertical');

  // Verify that all items are present
  expect(screen.queryByText('Item 1')).toBeInTheDocument();
  expect(screen.queryByText('Item 2')).toBeInTheDocument();
  expect(screen.queryByText('Item 3')).toBeInTheDocument();
  expect(screen.queryByText('Item 4')).toBeInTheDocument();

  // Verify that only Item 1 is selected
  expect(screen.getByText('Item 1')).not.toHaveClass('li--active');
  expect(screen.getByText('Item 2')).not.toHaveClass('li--active');
  expect(screen.getByText('Item 3')).not.toHaveClass('li--active');
  expect(screen.getByText('Item 4')).not.toHaveClass('li--active');

  // Check that form is invalid (no value provided, but still required)
  expect(container.querySelector('form').checkValidity()).toBeFalsy();
});


