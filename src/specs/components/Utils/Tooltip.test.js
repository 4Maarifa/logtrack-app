import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Tooltip, { ETooltipPosition, ETooltipTrianglePosition } from './../../../components/Utils/Tooltip/Tooltip';

test('<Tooltip /> - hidden', () => {
  render(<Tooltip 
    tooltipPosition={ETooltipPosition.TOP}
    tooltipTrianglePosition={ETooltipTrianglePosition.END}
    label="Tooltip Label" />);

  // As the tooltip is not shown, expect the text to not appear
  expect(screen.queryByText('Tooltip Label')).not.toBeInTheDocument();
});

test('<Tooltip /> - shown', () => {
  const { container } = render(<Tooltip 
    tooltipPosition={ETooltipPosition.TOP}
    tooltipTrianglePosition={ETooltipTrianglePosition.END}
    label="Tooltip Label"
    show />);

  // As the tooltip is shown, expect the text to appear
  expect(screen.queryByText('Tooltip Label')).toBeInTheDocument();

  // Check for top position
  expect(container.querySelector('.Tooltip')).toHaveClass('tooltip-top');

  // Check for end triangle position
  expect(container.querySelector('.triangle')).toHaveClass('triangle-end');
});
