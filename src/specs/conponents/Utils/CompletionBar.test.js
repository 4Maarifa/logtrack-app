import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CompletionBar from './../../../components/Utils/CompletionBar/CompletionBar';

test('<CompletionBar />', () => {

  render(<CompletionBar title="title" details="details" percentage="70" />);

  // Verify that the title is present
  expect(screen.queryByText('title')).toBeInTheDocument();

  // Verify details along with percentage
  expect(screen.queryByText('details - 70%')).toBeInTheDocument();

  // Verify that width of the bar reflects the percentage input
  expect(screen.queryByTestId('bar').style.width).toBe('70%');
});
