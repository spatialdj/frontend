import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import App from './App';

test('Header text renders', () => {
  render(<App />);
  const textElement = screen.getByTestId('header-text');
  expect(textElement).toBeInTheDocument();
});

test('Header logo renders', () => {
  render(<App />);
  const imgElement = screen.getByAltText('Logo');
  expect(imgElement).toBeInTheDocument();
});
