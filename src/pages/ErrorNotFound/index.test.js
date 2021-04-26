import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../test-utils';
import ErrorNotFound from './index';

test('Error not found page renders', () => {
  render(<ErrorNotFound />);
  const textElement = screen.getByText(/Page not found/i);
  expect(textElement).toBeInTheDocument();
});
