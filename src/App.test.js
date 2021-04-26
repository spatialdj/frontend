import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import App from './App';

test('Renders homepage', () => {
  render(<App />);
  const textElement = screen.getByText(/Spatial.dj/i);
  expect(textElement).toBeInTheDocument();
});
